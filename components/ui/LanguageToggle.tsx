'use client';

import { useLanguage } from '@/lib/i18n/context/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
      <div className="relative group">
        {/* Botón principal compacto */}
        <button
          onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
          className="relative bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-2 py-1.5 sm:px-3 sm:py-2 rounded-md sm:rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 border border-purple-400/50 backdrop-blur-sm"
          aria-label={t.accessibility.changeLanguage}
        >
          {/* Icono y texto compacto */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-sm sm:text-base">🌐</span>
            <span className="font-mono text-xs sm:text-sm uppercase tracking-wide">
              {language === 'es' ? 'ES' : 'EN'}
            </span>
          </div>
        </button>

        {/* Tooltip (solo desktop) */}
        <div className="hidden sm:block absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded border border-purple-400/30 whitespace-nowrap">
            {language === 'es' ? 'Cambiar a EN' : 'Switch to ES'}
          </div>
        </div>
      </div>
    </div>
  );
}
