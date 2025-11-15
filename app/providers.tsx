'use client';

import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'wagmi/chains';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MiniKitProvider
      chain={base}
      rpcUrl="https://mainnet.base.org"
    >
      {children}
    </MiniKitProvider>
  );
}
