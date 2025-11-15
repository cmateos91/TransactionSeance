import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    farcasterMiniApp(), // Conector especial de Farcaster Mini Apps
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true, // Habilitar SSR para evitar problemas de reconexión
});

// Declarar tipos para TypeScript
declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
