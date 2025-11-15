'use client';

import { useState, useEffect } from 'react';
import { Ghost } from '@/lib/types/ghost';
import { GhostCard } from '@/components/ghost/GhostCard';
import { useLanguage } from '@/lib/i18n/context/LanguageContext';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { StarryBackground } from '@/components/ui/StarryBackground';
import { sdk } from '@farcaster/miniapp-sdk';
import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt, useConnectorClient } from 'wagmi';
import { parseEther, getAddress } from 'viem';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

// Dirección de treasury para recibir fees (desde variables de entorno)
const TREASURY_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_ADDRESS as `0x${string}`;
const INVOCATION_FEE = process.env.NEXT_PUBLIC_INVOCATION_FEE as string;

export default function Home() {
  const [ghost, setGhost] = useState<Ghost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freeMode, setFreeMode] = useState(false); // Modo gratis para testing
  const [mounted, setMounted] = useState(false); // Para evitar hidratación
  const { t, language } = useLanguage();

  // MiniKit hook para detectar el contexto (Base App o Farcaster)
  const { context, isMiniAppReady, setMiniAppReady } = useMiniKit();

  // Wagmi hooks para wallet
  const { address, isConnected, connector } = useAccount();
  const { data: connectorClient } = useConnectorClient();
  const { sendTransaction, data: txHash, isPending: isSendingTx, error: txError } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Marcar como montado (evitar hidratación)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Inicializar MiniKit (marca la app como lista y oculta splash screen)
  useEffect(() => {
    if (!isMiniAppReady) {
      setMiniAppReady();
    }
  }, [isMiniAppReady, setMiniAppReady]);

  // Log MiniKit context for debugging
  useEffect(() => {
    console.log('[MiniKit] Context:', {
      context,
      isMiniAppReady,
      isConnected,
      address,
    });
  }, [context, isMiniAppReady, isConnected, address]);

  const invokeGhost = async () => {
    setLoading(true);
    setError(null);

    // Si está en modo gratis, invocar directamente
    if (freeMode) {
      try {
        const response = await fetch(`/api/ghost?lang=${language}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || t.errors.invokeGhost);
        }

        setGhost(data.ghost);
      } catch (err) {
        setError(err instanceof Error ? err.message : t.errors.unknown);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Modo con fee: verificar wallet conectada
    if (!isConnected) {
      setError(t.wallet.connectFirst);
      setLoading(false);
      return;
    }

    // Verificar que el connector y connectorClient estén listos
    if (!connector || !connectorClient) {
      console.error('[InvokeGhost] Connector or connectorClient not ready', { connector, connectorClient });
      setError('Wallet no está completamente conectada. Intenta reconectar.');
      setLoading(false);
      return;
    }

    try {
      console.log('[InvokeGhost] Sending transaction', {
        to: TREASURY_ADDRESS,
        value: INVOCATION_FEE,
        connector: connector?.name,
        connectorClient: !!connectorClient,
      });

      // Enviar fee configurado en variables de entorno
      sendTransaction({
        to: TREASURY_ADDRESS,
        value: parseEther(INVOCATION_FEE),
      });

      // Esperar confirmación de la transacción
      // La UI mostrará el estado de confirmación
    } catch (err) {
      console.error('[InvokeGhost] Transaction error:', err);
      setError(err instanceof Error ? err.message : t.wallet.sendFeeError);
      setLoading(false);
    }
  };

  // Efecto para manejar errores de transacción
  useEffect(() => {
    if (txError) {
      setError(txError.message || t.wallet.transactionError);
      setLoading(false);
    }
  }, [txError, t.wallet.transactionError]);

  // Efecto para invocar fantasma después de confirmar transacción
  useEffect(() => {
    const fetchGhost = async () => {
      if (isConfirmed) {
        try {
          const response = await fetch(`/api/ghost?lang=${language}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || t.errors.invokeGhost);
          }

          setGhost(data.ghost);
        } catch (err) {
          setError(err instanceof Error ? err.message : t.errors.unknown);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGhost();
  }, [isConfirmed, language]);

  return (
    <main className="min-h-screen relative text-white p-3 sm:p-4 pb-safe overflow-hidden">
      {/* Fondo de estrellas animado */}
      <StarryBackground />

      {/* Contenido con z-index superior */}
      <div className="relative z-10">
        {/* Selector de idioma */}
        <LanguageToggle />

      <div className="max-w-2xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
        {/* Header - optimizado móvil */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent px-2">
            {t.page.title}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg px-4">
            {t.page.subtitle}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2 px-4">
            {t.page.tagline}
          </p>
        </div>

        {/* Wallet Connection y modo gratis */}
        <div className="mb-6 sm:mb-8 px-4 space-y-4">
          <div className="flex justify-center">
            <ConnectWallet />
          </div>

          {/* Toggle modo gratis - Permite a los usuarios elegir entre gratis o pagar fee */}
          <div className="flex justify-center items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={freeMode}
                onChange={(e) => setFreeMode(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-gray-300">
                {t.wallet.freeMode}
              </span>
            </label>
          </div>
        </div>

        {/* Botón de invocar - optimizado móvil */}
        {!ghost && (
          <div className="text-center px-4">
            <button
              onClick={invokeGhost}
              disabled={!mounted || loading || isSendingTx || isConfirming || (!isConnected && !freeMode)}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-lg sm:text-xl transition-all transform active:scale-95 hover:scale-105 disabled:scale-100 shadow-lg w-full sm:w-auto touch-manipulation min-h-[60px]"
            >
              {isSendingTx ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t.wallet.confirmingPayment}</span>
                </span>
              ) : isConfirming ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t.wallet.waitingConfirmation}</span>
                </span>
              ) : loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t.page.invoking}</span>
                </span>
              ) : (
                <span className="flex flex-col items-center gap-1">
                  <span>{t.page.invokeButton}</span>
                  {!freeMode && <span className="text-xs opacity-75">{INVOCATION_FEE} ETH</span>}
                  {freeMode && <span className="text-xs opacity-75 text-green-300">{t.wallet.free}</span>}
                </span>
              )}
            </button>

            {error && (
              <p className="text-red-400 mt-4 text-sm">{t.errors.prefix} {error}</p>
            )}

            {mounted && !isConnected && !freeMode && (
              <p className="text-yellow-400 mt-4 text-sm">
                {t.wallet.connectOrFree}
              </p>
            )}
          </div>
        )}

        {/* Loader mientras invoca fantasma */}
        {(loading || isSendingTx || isConfirming) && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-8 text-center max-w-sm w-full border-2 border-blue-500 shadow-xl">
              <svg className="animate-spin h-16 w-16 text-blue-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-xl font-semibold text-white">
                {isSendingTx ? t.wallet.confirmingPayment : isConfirming ? t.wallet.waitingConfirmation : t.page.invoking}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {isSendingTx ? t.wallet.acceptTransaction : isConfirming ? t.wallet.waitingBlockchain : t.page.loadingSubtitle}
              </p>
            </div>
          </div>
        )}

        {/* Mostrar fantasma - optimizado móvil */}
        {ghost && (
          <div className="space-y-4 sm:space-y-6 px-2">
            <GhostCard ghost={ghost} />

            {/* Botones de acción - stack en móvil, fila en desktop */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <button
                onClick={invokeGhost}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all touch-manipulation active:scale-95 w-full sm:w-auto flex items-center justify-center gap-2 min-h-[48px]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{t.page.invoking}</span>
                  </>
                ) : (
                  t.page.invokeAnother
                )}
              </button>
              <button
                onClick={() => {
                  alert(t.page.alerts.collectionSoon);
                }}
                className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all touch-manipulation active:scale-95 w-full sm:w-auto"
              >
                {t.page.adoptSpirit}
              </button>
            </div>

            {/* Compartir - optimizado para móvil */}
            <div className="text-center px-4">
              <button
                onClick={() => {
                  const text = t.page.alerts.shareText(
                    ghost.name,
                    ghost.story.slice(0, 100),
                    t.rarity[ghost.rarity].toUpperCase()
                  );
                  navigator.clipboard.writeText(text);
                  alert(t.page.alerts.copied);
                }}
                className="text-purple-400 hover:text-purple-300 active:text-purple-200 underline text-sm touch-manipulation py-2"
              >
                {t.page.shareStory}
              </button>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm px-4">
          <p>{t.page.footer.info}</p>
          <p className="mt-2">{t.page.footer.version}</p>
        </div>
      </div>
      </div>
    </main>
  );
}
