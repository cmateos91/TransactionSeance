'use client';

import { useLanguage } from '@/lib/i18n/context/LanguageContext';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: 'basic' | 'transaction' | 'advanced' | 'cosmic';
}

interface AttributeInfoProps {
  name: string;
  description: string;
}

function AttributeInfo({ name, description }: AttributeInfoProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
      <h4 className="font-semibold text-sm text-gray-900 mb-1">{name}</h4>
      <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export function InfoModal({ isOpen, onClose, section }: InfoModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const getContent = () => {
    switch (section) {
      case 'basic':
        return (
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">
              {t.technical.basicAttributes}
            </h3>

            <AttributeInfo
              name={`${t.technical.sadness} (0-10)`}
              description={t.attributeDescriptions.sadness}
            />

            <AttributeInfo
              name={`${t.technical.power} (0-100)`}
              description={t.attributeDescriptions.power}
            />

            <AttributeInfo
              name={t.technical.generation}
              description={t.attributeDescriptions.generation}
            />

            <AttributeInfo
              name={t.technical.attempts}
              description={t.attributeDescriptions.attempts}
            />
          </div>
        );

      case 'transaction':
        return (
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">
              {t.technical.transactionAttributes}
            </h3>

            <AttributeInfo
              name={`${t.technical.complexity} (0-100)`}
              description={t.attributeDescriptions.complexity}
            />

            <AttributeInfo
              name={`${t.technical.urgency} (0-100)`}
              description={t.attributeDescriptions.urgency}
            />

            <AttributeInfo
              name={`${t.technical.density} (0-100)`}
              description={t.attributeDescriptions.density}
            />

            <AttributeInfo
              name={`${t.technical.magnitude} (0-100)`}
              description={t.attributeDescriptions.magnitude}
            />
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">
              {t.technical.advancedAttributes}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <AttributeInfo
                name={`${t.technical.entropy} (0-100)`}
                description={t.attributeDescriptions.entropy}
              />

              <AttributeInfo
                name={`${t.technical.volatility} (0-100)`}
                description={t.attributeDescriptions.volatility}
              />

              <AttributeInfo
                name={`${t.technical.frequency} (0-100)`}
                description={t.attributeDescriptions.frequency}
              />

              <AttributeInfo
                name={`${t.technical.resonance} (0-100)`}
                description={t.attributeDescriptions.resonance}
              />

              <AttributeInfo
                name={`${t.technical.echo} (0-100)`}
                description={t.attributeDescriptions.echo}
              />

              <AttributeInfo
                name={`${t.technical.stability} (0-100)`}
                description={t.attributeDescriptions.stability}
              />

              <AttributeInfo
                name={`${t.technical.chaos} (0-100)`}
                description={t.attributeDescriptions.chaos}
              />

              <AttributeInfo
                name={`${t.technical.harmony} (0-100)`}
                description={t.attributeDescriptions.harmony}
              />

              <AttributeInfo
                name={`${t.technical.velocity} (0-100)`}
                description={t.attributeDescriptions.velocity}
              />

              <AttributeInfo
                name={`${t.technical.weight} (0-100)`}
                description={t.attributeDescriptions.weight}
              />

              <AttributeInfo
                name={`${t.technical.temperature} (0-100)`}
                description={t.attributeDescriptions.temperature}
              />

              <AttributeInfo
                name={`${t.technical.essence} (0-100)`}
                description={t.attributeDescriptions.essence}
              />
            </div>
          </div>
        );

      case 'cosmic':
        return (
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">
              {t.technical.cosmicAttributes}
            </h3>

            <AttributeInfo
              name={t.technical.phase}
              description={t.attributeDescriptions.phase}
            />

            <AttributeInfo
              name={t.technical.alignment}
              description={t.attributeDescriptions.alignment}
            />

            <AttributeInfo
              name={t.technical.constellation}
              description={t.attributeDescriptions.constellation}
            />

            <AttributeInfo
              name={`${t.technical.dimension} (1-13)`}
              description={t.attributeDescriptions.dimension}
            />

            <AttributeInfo
              name={t.technical.signature}
              description={t.attributeDescriptions.signature}
            />

            <AttributeInfo
              name={t.technical.aura}
              description={t.attributeDescriptions.aura}
            />
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black bg-opacity-50 touch-manipulation"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto border-2 border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-gray-300 p-3 sm:p-4 flex justify-between items-center z-10">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">{t.modal.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2"
            aria-label={t.modal.close}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {getContent()}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t-2 border-gray-300 p-3 sm:p-4 z-10">
          <button
            onClick={onClose}
            className="w-full bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors touch-manipulation min-h-[44px]"
          >
            {t.modal.close}
          </button>
        </div>
      </div>
    </div>
  );
}
