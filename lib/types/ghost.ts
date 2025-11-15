// Tipos para los "fantasmas" (transacciones fallidas)

export type GhostRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type GhostType =
  | 'out_of_gas'
  | 'insufficient_balance'
  | 'reverted'
  | 'abandoned_wallet'
  | 'failed_swap'
  | 'failed_nft_mint';

export interface Ghost {
  id: string;
  name: string;
  type: GhostType;
  rarity: GhostRarity;
  story: string;
  attributes: {
    // Atributos básicos
    sadness: number;      // 0-10
    age: number;          // días desde última tx
    value: string;        // ETH value
    power: number;        // 0-100

    // Atributos de transacción
    complexity: number;   // 0-100 (basado en tamaño del input)
    attempts: number;     // nonce - experiencia del usuario
    urgency: number;      // 0-100 (basado en gasPrice)
    generation: string;   // Época: "Ancient" | "Old" | "Recent" | "Fresh"

    // Atributos avanzados (hashes y derivados)
    entropy: number;      // 0-100 (caos del hash)
    resonance: number;    // 0-100 (patrón del bloque)
    density: number;      // 0-100 (ratio gas/gasUsed)
    volatility: number;   // 0-100 (variación en el hash)
    magnitude: number;    // 0-100 (combinación de factores)
    frequency: number;    // 0-100 (basado en timestamp patterns)
    phase: string;        // Ciclo lunar blockchain
    alignment: string;    // Alineación numérica del hash
    signature: string;    // Patrón único del hash (primeros dígitos)
    essence: number;      // 0-100 (suma reducida del hash)
    aura: string;         // Color único basado en hash
    dimension: number;    // 1-13 (dimensión del fantasma)
    constellation: string; // Constelación basada en datos
    echo: number;         // 0-100 (reverberación temporal)
    stability: number;    // 0-100 (qué tan "estable" era la tx)
    chaos: number;        // 0-100 (nivel de caos en los datos)
    harmony: number;      // 0-100 (balance entre atributos)
    velocity: number;     // 0-100 (velocidad percibida)
    weight: number;       // 0-100 (peso conceptual)
    temperature: number;  // 0-100 (caliente/frío basado en gas)
  };
  visual: {
    color: string;
    pattern: string;
    hash: string;
  };
  txData: {
    hash: string;
    from: string;
    timestamp: number;
    error: string;
    gasUsed: string;
    blockNumber: string;
    nonce: string;
    gasPrice: string;
    input: string;
    methodId?: string;
    functionName?: string;
  };
}

export interface FailedTransaction {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  gasUsed: string;
  timestamp: string;
  isError: string;
  txreceipt_status: string;
  errorMessage?: string;
  // Nuevos campos para características avanzadas
  blockNumber: string;
  nonce: string;
  gas: string;
  gasPrice: string;
  input: string;
  methodId?: string;
  functionName?: string;
  confirmations?: string;
  cumulativeGasUsed?: string;
}
