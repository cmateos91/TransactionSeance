'use client';

// Tarjeta que muestra los datos de la transacción fallida

import { Ghost } from '@/lib/types/ghost';
import { useLanguage } from '@/lib/i18n/context/LanguageContext';
import { InfoModal } from './InfoModal';
import { GhostAvatar } from './GhostAvatar';
import { useState, useEffect } from 'react';

interface GhostCardProps {
  ghost: Ghost;
}

export function GhostCard({ ghost }: GhostCardProps) {
  const { t } = useLanguage();
  const [modalSection, setModalSection] = useState<'basic' | 'transaction' | 'advanced' | 'cosmic' | null>(null);
  const [showAvatar, setShowAvatar] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  // Resetear el estado del avatar cuando cambia el fantasma
  useEffect(() => {
    setShowAvatar(false);
    setIsRevealing(false);
  }, [ghost.txData.hash]); // Cuando cambia el hash (nuevo fantasma), resetear

  // Manejar la revelación épica con suspenso
  const handleRevealClick = () => {
    if (showAvatar) {
      // Si ya está revelado, solo ocultar
      setShowAvatar(false);
    } else {
      // Iniciar la secuencia de revelación
      setIsRevealing(true);

      // Después de 2.5 segundos, revelar el avatar
      setTimeout(() => {
        setShowAvatar(true);
        setIsRevealing(false);
      }, 2500);
    }
  };

  const ageText = ghost.attributes.age === 1
    ? `hace 1 ${t.attributes.days.slice(0, -1)}` // Quitar la 's' para singular
    : `hace ${ghost.attributes.age} ${t.attributes.days}`;

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 sm:p-6 bg-white w-full max-w-2xl mx-auto touch-manipulation">
      {/* Ghost Name */}
      <div className="mb-4 pb-4 border-b-2 border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">{ghost.name}</h2>
        <p className="text-center text-sm text-gray-500 mt-1 capitalize">{ghost.type.replace(/_/g, ' ')}</p>
      </div>

      {/* Avatar Section */}
      <div className="mb-4">
        <div className="flex justify-center mb-3">
          <button
            onClick={handleRevealClick}
            disabled={isRevealing}
            className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {showAvatar ? t.page.hideFace : t.page.revealFace}
          </button>
        </div>

        {/* Animación de revelación épica */}
        {isRevealing && (
          <div className="relative flex justify-center items-center" style={{ height: 256 }}>
            {/* Círculo pulsante de energía */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="reveal-pulse rounded-full" style={{
                width: 200,
                height: 200,
                background: `radial-gradient(circle, ${ghost.attributes.aura}80, ${ghost.attributes.aura}20, transparent)`,
              }} />
            </div>

            {/* Partículas flotantes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="reveal-particle" style={{
                width: 8,
                height: 8,
                background: ghost.attributes.aura,
                top: '30%',
                left: '30%'
              }} />
              <div className="reveal-particle animation-delay-500" style={{
                width: 6,
                height: 6,
                background: ghost.attributes.aura,
                top: '70%',
                left: '60%'
              }} />
              <div className="reveal-particle animation-delay-1000" style={{
                width: 10,
                height: 10,
                background: ghost.attributes.aura,
                top: '50%',
                left: '80%'
              }} />
            </div>

            {/* Texto de carga */}
            <div className="z-10 text-center">
              <div className="text-2xl font-bold text-gray-800 mb-2 reveal-text">
                {t.page.loadingSubtitle}
              </div>
              <div className="flex justify-center gap-1">
                <div className="reveal-dot" style={{ animationDelay: '0s' }} />
                <div className="reveal-dot" style={{ animationDelay: '0.2s' }} />
                <div className="reveal-dot" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        {/* Avatar revelado */}
        {showAvatar && !isRevealing && (
          <div className="animate-reveal-face">
            <GhostAvatar ghost={ghost} size={256} />
          </div>
        )}
      </div>

      {/* Transaction Hash */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">{t.technical.transactionHash}</h3>
        <a
          href={`https://basescan.org/tx/${ghost.txData.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline break-all text-sm"
        >
          {ghost.txData.hash}
        </a>
      </div>

      {/* Transaction Data Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <DataField label={t.technical.fromAddress} value={ghost.txData.from} link={`https://basescan.org/address/${ghost.txData.from}`} />
        <DataField label={t.technical.blockNumber} value={ghost.txData.blockNumber} />
        <DataField label={t.technical.value} value={`${parseFloat(ghost.attributes.value).toFixed(6)} ETH`} />
        <DataField label={t.technical.gasUsed} value={ghost.txData.gasUsed} />
        <DataField label={t.technical.gasPrice} value={`${(parseInt(ghost.txData.gasPrice) / 1e9).toFixed(2)} Gwei`} />
        <DataField label={t.technical.nonce} value={ghost.txData.nonce} />
        <DataField label={t.technical.age} value={ageText} />
        <DataField label={t.technical.error} value={ghost.txData.error} highlight />
      </div>

      {/* Basic Attributes */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">{t.technical.basicAttributes}</h3>
          <button
            onClick={() => setModalSection('basic')}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t.accessibility.information}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <AttributeBadge label={t.technical.sadness} value={ghost.attributes.sadness} max={10} />
          <AttributeBadge label={t.technical.power} value={ghost.attributes.power} />
          <AttributeBadge label={t.technical.generation} value={ghost.attributes.generation} text />
          <AttributeBadge label={t.technical.attempts} value={ghost.attributes.attempts} text />
        </div>
      </div>

      {/* Transaction Attributes */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">{t.technical.transactionAttributes}</h3>
          <button
            onClick={() => setModalSection('transaction')}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t.accessibility.information}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <AttributeBadge label={t.technical.complexity} value={ghost.attributes.complexity} />
          <AttributeBadge label={t.technical.urgency} value={ghost.attributes.urgency} />
          <AttributeBadge label={t.technical.density} value={ghost.attributes.density} />
          <AttributeBadge label={t.technical.magnitude} value={ghost.attributes.magnitude} />
        </div>
      </div>

      {/* Advanced Attributes */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">{t.technical.advancedAttributes}</h3>
          <button
            onClick={() => setModalSection('advanced')}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t.accessibility.information}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <AttributeBadge label={t.technical.entropy} value={ghost.attributes.entropy} />
          <AttributeBadge label={t.technical.volatility} value={ghost.attributes.volatility} />
          <AttributeBadge label={t.technical.frequency} value={ghost.attributes.frequency} />
          <AttributeBadge label={t.technical.resonance} value={ghost.attributes.resonance} />
          <AttributeBadge label={t.technical.echo} value={ghost.attributes.echo} />
          <AttributeBadge label={t.technical.stability} value={ghost.attributes.stability} />
          <AttributeBadge label={t.technical.chaos} value={ghost.attributes.chaos} />
          <AttributeBadge label={t.technical.harmony} value={ghost.attributes.harmony} />
          <AttributeBadge label={t.technical.velocity} value={ghost.attributes.velocity} />
          <AttributeBadge label={t.technical.weight} value={ghost.attributes.weight} />
          <AttributeBadge label={t.technical.temperature} value={ghost.attributes.temperature} />
          <AttributeBadge label={t.technical.essence} value={ghost.attributes.essence} />
        </div>
      </div>

      {/* Cosmic Attributes */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">{t.technical.cosmicAttributes}</h3>
          <button
            onClick={() => setModalSection('cosmic')}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={t.accessibility.information}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <AttributeBadge label={t.technical.phase} value={ghost.attributes.phase} text />
          <AttributeBadge label={t.technical.alignment} value={ghost.attributes.alignment} text />
          <AttributeBadge label={t.technical.constellation} value={ghost.attributes.constellation} text />
          <AttributeBadge label={t.technical.dimension} value={ghost.attributes.dimension} text />
          <AttributeBadge label={t.technical.signature} value={ghost.attributes.signature} text />
          <div className="bg-gray-100 rounded px-2 py-1">
            <div className="text-gray-500 text-xs">{t.technical.aura}</div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border border-gray-300"
                style={{ backgroundColor: ghost.attributes.aura }}
              />
              <span className="font-mono text-xs text-gray-900">{ghost.attributes.aura}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Function Name if available */}
      {ghost.txData.functionName && (
        <div className="mt-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">{t.technical.functionCalled}</h3>
          <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-900 break-all block overflow-wrap-anywhere">{ghost.txData.functionName}</code>
        </div>
      )}

      {/* Info Modal */}
      {modalSection && (
        <InfoModal
          isOpen={modalSection !== null}
          onClose={() => setModalSection(null)}
          section={modalSection}
        />
      )}
    </div>
  );
}

function DataField({ label, value, link, highlight }: { label: string; value: string; link?: string; highlight?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-gray-500 font-medium mb-0.5">{label}</dt>
      <dd className={`font-mono text-xs ${highlight ? 'text-red-600 font-semibold' : 'text-gray-900'} ${link ? '' : 'break-all'}`}>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline break-all">
            {value}
          </a>
        ) : value}
      </dd>
    </div>
  );
}

function AttributeBadge({ label, value, text, max }: { label: string; value: number | string; text?: boolean; max?: number }) {
  const maxValue = max || 100;
  return (
    <div className="bg-gray-100 rounded px-2 py-1">
      <div className="text-gray-500 text-xs">{label}</div>
      <div className="font-semibold text-gray-900">{text ? value : `${value}/${maxValue}`}</div>
    </div>
  );
}

// Componente para mostrar atributos como barras
function AttributeBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const percentage = (value / max) * 100;

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold">{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
