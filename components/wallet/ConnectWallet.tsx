'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/context/LanguageContext';

export function ConnectWallet() {
  const { t } = useLanguage();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  // Evitar error de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Log wallet state
  useEffect(() => {
    console.log('[ConnectWallet] Wallet state:', { isConnected, address, mounted });
  }, [isConnected, address, mounted]);

  // Auto-conectar si el usuario ya autorizó
  useEffect(() => {
    if (mounted && !isConnected && connectors.length > 0) {
      console.log('[ConnectWallet] Attempting auto-connect...', {
        mounted,
        isConnected,
        connectorsCount: connectors.length
      });
      // Farcaster Mini App solo tiene un conector
      try {
        connect({ connector: connectors[0] });
        console.log('[ConnectWallet] Auto-connect initiated');
      } catch (err) {
        console.log('[ConnectWallet] Auto-connect failed:', err);
      }
    }
  }, [mounted, isConnected, connectors, connect]);

  // Mostrar placeholder durante SSR
  if (!mounted) {
    return (
      <button
        disabled
        className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg"
      >
        {t.wallet.loading}
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3 bg-green-600/20 border border-green-500 rounded-lg px-4 py-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <div>
          <p className="text-xs text-gray-400">{t.wallet.connected}</p>
          <p className="font-mono text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        <button
          onClick={() => disconnect()}
          className="ml-auto text-xs text-red-400 hover:text-red-300"
        >
          {t.wallet.disconnect}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all"
    >
      🔗 {t.wallet.connect}
    </button>
  );
}
