# 💰 GUÍA DE INTEGRACIÓN DE WALLET - FARCASTER MINI APPS

**Proyecto:** Transaction Séance
**Fecha:** 2025-11-15
**Stack:** Wagmi + Farcaster Mini App Connector + Base

---

## 📋 RESUMEN

Farcaster Mini Apps permite conectar wallets directamente desde la app sin popups externos. El usuario puede firmar transacciones y enviar transacciones por lotes (EIP-5792) directamente desde Farcaster.

**Ventajas:**
- ✅ Sin popups de wallet externos
- ✅ Experiencia fluida dentro de Farcaster
- ✅ Soporte para transacciones por lotes
- ✅ Compatible con múltiples chains (Base, Ethereum, etc.)
- ✅ Integración nativa con el SDK de Farcaster

---

## 🔧 INSTALACIÓN

### Dependencias Necesarias:

```bash
npm install wagmi viem @tanstack/react-query @farcaster/miniapp-wagmi-connector
```

### Versiones Recomendadas:

```json
{
  "wagmi": "^2.0.0",
  "viem": "^2.39.0",
  "@tanstack/react-query": "^5.0.0",
  "@farcaster/miniapp-wagmi-connector": "latest"
}
```

---

## 🏗️ IMPLEMENTACIÓN PASO A PASO

### Paso 1: Configurar Wagmi Provider

Crear `lib/wagmi/config.ts`:

```typescript
import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';

export const config = createConfig({
  chains: [base, baseSepolia], // Puedes agregar más chains
  connectors: [
    farcasterMiniApp(), // Conector especial de Farcaster
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

// Declarar tipos para TypeScript
declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
```

### Paso 2: Envolver la App con Providers

Modificar `app/layout.tsx`:

```typescript
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/lib/wagmi/config';

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
```

### Paso 3: Crear Componente de Conexión

Crear `components/wallet/ConnectWallet.tsx`:

```typescript
'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useEffect } from 'react';

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // Auto-conectar si el usuario ya autorizó
  useEffect(() => {
    if (!isConnected && connectors.length > 0) {
      // Farcaster Mini App solo tiene un conector
      connect({ connector: connectors[0] });
    }
  }, [isConnected, connectors, connect]);

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3 bg-green-600/20 border border-green-500 rounded-lg px-4 py-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <div>
          <p className="text-xs text-gray-400">Wallet conectada</p>
          <p className="font-mono text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        <button
          onClick={() => disconnect()}
          className="ml-auto text-xs text-red-400 hover:text-red-300"
        >
          Desconectar
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all"
    >
      🔗 Conectar Wallet
    </button>
  );
}
```

### Paso 4: Enviar Transacciones

Crear `hooks/useTransaction.ts`:

```typescript
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

export function useTransaction() {
  const { writeContract, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const sendTransaction = async (to: string, value: string) => {
    writeContract({
      address: to as `0x${string}`,
      abi: [], // ABI del contrato
      functionName: 'transfer', // Función a llamar
      args: [to, parseEther(value)],
    });
  };

  return {
    sendTransaction,
    isLoading,
    isSuccess,
    hash,
  };
}
```

### Paso 5: Transacciones por Lotes (EIP-5792)

Una de las features más poderosas - enviar múltiples transacciones en una sola firma:

```typescript
import { useSendCalls } from 'wagmi/experimental';

export function useBatchTransactions() {
  const { sendCalls, data: callsId } = useSendCalls();

  const sendBatch = async () => {
    sendCalls({
      calls: [
        {
          to: '0x...',
          data: '0x...', // Encoded function call
          value: parseEther('0.01'),
        },
        {
          to: '0x...',
          data: '0x...',
          value: parseEther('0.02'),
        },
      ],
    });
  };

  return { sendBatch, callsId };
}
```

---

## 🎯 EJEMPLO COMPLETO PARA TRANSACTION SÉANCE

### Caso de Uso: "Adoptar Fantasma" con Mint de NFT

Crear `components/ghost/AdoptGhost.tsx`:

```typescript
'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { Ghost } from '@/lib/types/ghost';

interface AdoptGhostProps {
  ghost: Ghost;
}

export function AdoptGhost({ ghost }: AdoptGhostProps) {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleAdopt = async () => {
    if (!isConnected) {
      alert('Primero conecta tu wallet');
      return;
    }

    // Ejemplo: mint NFT del fantasma
    writeContract({
      address: '0xYourNFTContractAddress', // Tu contrato
      abi: [
        {
          name: 'mint',
          type: 'function',
          stateMutability: 'payable',
          inputs: [
            { name: 'ghostId', type: 'string' },
            { name: 'metadata', type: 'string' },
          ],
          outputs: [],
        },
      ],
      functionName: 'mint',
      args: [ghost.txData.hash, JSON.stringify(ghost)],
      value: parseEther('0.001'), // Precio del mint
    });
  };

  if (!isConnected) {
    return (
      <p className="text-gray-400 text-sm">
        Conecta tu wallet para adoptar este fantasma
      </p>
    );
  }

  if (isPending) {
    return (
      <button
        disabled
        className="bg-gray-700 text-white px-6 py-3 rounded-lg cursor-not-allowed"
      >
        🔄 Mintando...
      </button>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-green-600/20 border border-green-500 rounded-lg p-4">
        <p className="text-green-400 font-semibold">
          ✅ ¡Fantasma adoptado exitosamente!
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={handleAdopt}
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
    >
      👻 Adoptar Fantasma (0.001 ETH)
    </button>
  );
}
```

### Integrar en `components/ghost/GhostCard.tsx`:

```typescript
import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { AdoptGhost } from '@/components/ghost/AdoptGhost';

export function GhostCard({ ghost }: GhostCardProps) {
  return (
    <div className="border-2 border-gray-300 rounded-lg p-6">
      {/* ... contenido existente ... */}

      {/* Sección de wallet */}
      <div className="mt-6 space-y-4">
        <ConnectWallet />
        <AdoptGhost ghost={ghost} />
      </div>
    </div>
  );
}
```

---

## 🔍 CARACTERÍSTICAS AVANZADAS

### 1. Leer Balance

```typescript
import { useBalance } from 'wagmi';

export function WalletBalance() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <p>
      Balance: {balance?.formatted} {balance?.symbol}
    </p>
  );
}
```

### 2. Cambiar de Chain

```typescript
import { useSwitchChain } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

export function ChainSwitcher() {
  const { switchChain } = useSwitchChain();

  return (
    <div className="flex gap-2">
      <button onClick={() => switchChain({ chainId: base.id })}>
        Base Mainnet
      </button>
      <button onClick={() => switchChain({ chainId: baseSepolia.id })}>
        Base Sepolia
      </button>
    </div>
  );
}
```

### 3. Leer datos de Contrato

```typescript
import { useReadContract } from 'wagmi';

export function GhostOwner({ tokenId }: { tokenId: string }) {
  const { data: owner } = useReadContract({
    address: '0xYourNFTContract',
    abi: [
      {
        name: 'ownerOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        outputs: [{ name: '', type: 'address' }],
      },
    ],
    functionName: 'ownerOf',
    args: [BigInt(tokenId)],
  });

  return <p>Owner: {owner}</p>;
}
```

### 4. Firmar Mensajes

```typescript
import { useSignMessage } from 'wagmi';

export function SignMessage() {
  const { signMessage, data: signature } = useSignMessage();

  const handleSign = () => {
    signMessage({
      message: 'Adopto este fantasma de Transaction Séance',
    });
  };

  return (
    <div>
      <button onClick={handleSign}>Firmar Mensaje</button>
      {signature && <p>Firma: {signature}</p>}
    </div>
  );
}
```

---

## 📦 EJEMPLO: CONTRATO NFT SIMPLE

Contrato en Solidity para mintear fantasmas:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TransactionSeanceGhosts is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    uint256 public constant MINT_PRICE = 0.001 ether;

    mapping(uint256 => string) private _ghostMetadata;

    constructor() ERC721("Transaction Seance Ghost", "GHOST") {}

    function mint(string memory ghostId, string memory metadata)
        public
        payable
        returns (uint256)
    {
        require(msg.value >= MINT_PRICE, "Insufficient payment");

        uint256 tokenId = _tokenIdCounter++;
        _safeMint(msg.sender, tokenId);
        _ghostMetadata[tokenId] = metadata;

        return tokenId;
    }

    function getGhostMetadata(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return _ghostMetadata[tokenId];
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
```

---

## 🚀 DESPLIEGUE DE CONTRATO

### En Base Sepolia (Testnet):

```bash
# 1. Instalar Hardhat/Foundry
npm install --save-dev hardhat @nomiclabs/hardhat-ethers

# 2. Desplegar
npx hardhat run scripts/deploy.js --network base-sepolia

# 3. Verificar en BaseScan
npx hardhat verify --network base-sepolia <CONTRACT_ADDRESS>
```

### En Base Mainnet:

```bash
npx hardhat run scripts/deploy.js --network base-mainnet
```

---

## ⚙️ CONFIGURACIÓN COMPLETA DEL PROYECTO

### `package.json` final:

```json
{
  "dependencies": {
    "@dicebear/collection": "^9.2.4",
    "@dicebear/core": "^9.2.4",
    "@farcaster/miniapp-sdk": "latest",
    "@farcaster/miniapp-wagmi-connector": "latest",
    "@tanstack/react-query": "^5.0.0",
    "next": "16.0.3",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "viem": "^2.39.0",
    "wagmi": "^2.0.0"
  }
}
```

---

## 🎯 PRÓXIMOS PASOS PARA TRANSACTION SÉANCE

### Fase 1: Setup Básico
1. ✅ Instalar dependencias de Wagmi
2. ✅ Configurar provider en layout
3. ✅ Crear componente ConnectWallet
4. ✅ Probar conexión en Preview Tool

### Fase 2: Funcionalidad NFT
5. Desplegar contrato en Base Sepolia
6. Implementar mint de fantasmas
7. Mostrar fantasmas adoptados por usuario
8. Agregar galería de colección

### Fase 3: Features Avanzadas
9. Implementar trading/marketplace
10. Sistema de rareza on-chain
11. Rewards por adoptar fantasmas
12. Leaderboard de coleccionistas

---

## 📚 RECURSOS

- **Wagmi Docs:** https://wagmi.sh/
- **Viem Docs:** https://viem.sh/
- **Farcaster Wallet Docs:** https://miniapps.farcaster.xyz/guides/wallets
- **Base Docs:** https://docs.base.org/
- **OpenZeppelin:** https://docs.openzeppelin.com/contracts/

---

## 🐛 TROUBLESHOOTING

### Error: "Connector not found"
**Solución:** Asegúrate de que `farcasterMiniApp()` esté en el array de connectors

### Error: "Chain not configured"
**Solución:** Agrega la chain a `chains` y `transports` en la config

### Transacción no se confirma
**Solución:** Usa `useWaitForTransactionReceipt` para esperar confirmación

### Usuario no puede firmar
**Solución:** Verifica que la wallet esté conectada con `useAccount().isConnected`

---

**Generado:** 2025-11-15
**Estado:** Guía completa
**Siguiente:** Implementar y desplegar contrato NFT
