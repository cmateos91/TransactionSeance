// Configuración del proyecto

export const BASE_CONFIG = {
  // Base Mainnet
  CHAIN_ID: 8453,
  RPC_URL: 'https://mainnet.base.org',

  // Etherscan API V2 (nuevo endpoint unificado para todas las chains)
  // Migración: Basescan APIs deprecados → Etherscan API V2
  ETHERSCAN_API_URL: 'https://api.etherscan.io/v2/api',

  // API Key de Etherscan V2 - Una sola key para todas las chains
  // Obtén tu API key gratis en: https://etherscan.io/myapikey
  ETHERSCAN_API_KEY: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || 'YourApiKeyToken',
} as const;

export const RARITY_THRESHOLDS = {
  // Basado en el valor de la transacción en ETH
  legendary: 1.0,    // > 1 ETH
  epic: 0.1,         // > 0.1 ETH
  rare: 0.01,        // > 0.01 ETH
  common: 0,         // resto
} as const;

export const RARITY_COLORS = {
  common: '#9CA3AF',      // gris
  rare: '#3B82F6',        // azul
  epic: '#A855F7',        // morado
  legendary: '#F59E0B',   // dorado
} as const;
