// Cliente para interactuar con Etherscan API V2 (Base blockchain)
// Migración: Basescan APIs → Etherscan API V2 (unificado multichain)

import { BASE_CONFIG } from '../constants/config';
import { FailedTransaction } from '../types/ghost';

/**
 * Obtiene transacciones fallidas aleatorias de Base usando Etherscan API V2
 * API V2 permite acceder a múltiples chains (incluyendo Base) con una sola key
 */
export async function getRandomFailedTransactions(
  count: number = 1
): Promise<FailedTransaction[]> {
  const maxAttempts = 5; // Intentar hasta 5 veces con diferentes rangos

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`\n🔍 Attempt ${attempt}/${maxAttempts} - Searching for failed transactions...`);

    try {
      // Estrategia 1: Obtener el número de bloque actual
      const latestBlockResponse = await fetch(
        `${BASE_CONFIG.ETHERSCAN_API_URL}?chainid=${BASE_CONFIG.CHAIN_ID}&module=proxy&action=eth_blockNumber&apikey=${BASE_CONFIG.ETHERSCAN_API_KEY}`
      );
      const latestBlockData = await latestBlockResponse.json();

      // Si no podemos obtener el bloque actual, usar un bloque reciente conocido
      let latestBlock: number;
      if (!latestBlockData.result) {
        console.log('Could not get latest block, using fallback block number');
        latestBlock = 22000000;
      } else {
        latestBlock = parseInt(latestBlockData.result, 16);
      }

      // ALTA ALEATORIEDAD: Variamos el rango de búsqueda cada vez
      // Aumentamos el rango para encontrar más transacciones
      const blockRange = Math.floor(Math.random() * 300000) + 100000; // 100k-400k bloques

      // Offset aleatorio que aumenta con cada intento para explorar diferentes épocas
      const maxOffset = Math.min(2000000, latestBlock - blockRange - 1000);
      const randomOffset = Math.floor(Math.random() * Math.max(0, maxOffset)) + (attempt - 1) * 200000;

      const endBlock = latestBlock - randomOffset;
      const startBlock = Math.max(0, endBlock - blockRange);

      console.log('Random search range:', { startBlock, endBlock, range: blockRange, latestBlock });

      // Estrategia 2: Pool expandido de direcciones de alta actividad
      // Incluye los contratos más activos de Base (DEXs, bridges, tokens)
      const highActivityContracts = [
        // DEXs (máxima actividad y txs fallidas)
        '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43', // Aerodrome Router (DEX #1 en Base)
        '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24', // UniswapV3 Router en Base

        // Tokens principales (alta actividad)
        '0x4200000000000000000000000000000000000006', // WETH
        '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC
        '0x940181a94A35A4569E4529A3CDfB74e38FD98631', // AERO token

        // Protocolos DeFi
        '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', // DeFi Protocol
        '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', // BaseName Service
      ];

      // ALEATORIEDAD: Mezclar el orden de búsqueda cada vez
      const shuffledAddresses = [...highActivityContracts].sort(() => Math.random() - 0.5);

      // Aumentar número de direcciones con cada intento
      const numAddresses = Math.min(2 + attempt, shuffledAddresses.length);
      const addressesToSearch = shuffledAddresses.slice(0, numAddresses);

      let allTransactions = [];

      // Buscar en paralelo en las direcciones seleccionadas
      const searchPromises = addressesToSearch.map(async (address) => {
        // Page aleatorio (explorar diferentes rangos de transacciones)
        const randomPage = 1 + Math.floor(Math.random() * 5);

        console.log(`  → Searching ${address.slice(0, 10)}... (page ${randomPage})`);

        try {
          const response = await fetch(
            `${BASE_CONFIG.ETHERSCAN_API_URL}?chainid=${BASE_CONFIG.CHAIN_ID}&module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${randomPage}&offset=1000&sort=desc&apikey=${BASE_CONFIG.ETHERSCAN_API_KEY}`
          );
          const data = await response.json();

          if (data.status === '1' && Array.isArray(data.result)) {
            return data.result;
          }
          return [];
        } catch (error) {
          console.error(`Error searching ${address}:`, error);
          return [];
        }
      });

      // Esperar todas las búsquedas en paralelo
      const results = await Promise.all(searchPromises);

      // Combinar todos los resultados
      allTransactions = results.flat();

      console.log(`  📊 Total transactions retrieved: ${allTransactions.length}`);

      // Filtrar solo las fallidas
      const failedTxs = allTransactions.filter(
        (tx: any) => tx.isError === '1' || tx.txreceipt_status === '0'
      );

      console.log(`  ✓ Found ${failedTxs.length} FAILED transactions!`);

      // Si encontramos transacciones fallidas, retornarlas
      if (failedTxs.length > 0) {
        // Tomar una muestra aleatoria grande
        const sampleSize = Math.min(failedTxs.length, Math.max(count * 20, 50));
        const randomSample = failedTxs.length > sampleSize
          ? failedTxs.sort(() => Math.random() - 0.5).slice(0, sampleSize)
          : failedTxs;

        console.log(`  🎯 Returning ${count} random failed transactions from pool of ${randomSample.length}`);
        return selectRandomTransactions(randomSample, count);
      }

      // Si no encontramos nada, continuar al siguiente intento
      console.log(`  ❌ No failed transactions in this range, trying different blocks...`);

    } catch (error) {
      console.error(`  ⚠️ Error in attempt ${attempt}:`, error);
      // Continuar al siguiente intento
    }
  }

  // Si después de todos los intentos no encontramos nada, lanzar error
  throw new Error('No failed transactions found after multiple attempts. Please try again.');
}

/**
 * Selecciona transacciones aleatorias de un array
 */
function selectRandomTransactions(transactions: any[], count: number): FailedTransaction[] {
  const shuffled = [...transactions].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  return selected.map((tx: any) => ({
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: tx.value,
    gasUsed: tx.gasUsed,
    timestamp: tx.timeStamp,
    isError: tx.isError,
    txreceipt_status: tx.txreceipt_status,
    errorMessage: tx.errCode || 'Unknown error',
    // Campos adicionales para características
    blockNumber: tx.blockNumber,
    nonce: tx.nonce,
    gas: tx.gas,
    gasPrice: tx.gasPrice,
    input: tx.input,
    methodId: tx.methodId,
    functionName: tx.functionName,
    confirmations: tx.confirmations,
    cumulativeGasUsed: tx.cumulativeGasUsed,
  }));
}

