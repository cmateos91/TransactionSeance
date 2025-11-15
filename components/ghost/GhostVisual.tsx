// Componente visual del fantasma (SVG generativo)

import { Ghost } from '@/lib/types/ghost';

interface GhostVisualProps {
  ghost: Ghost;
  size?: number;
}

export function GhostVisual({ ghost, size = 200 }: GhostVisualProps) {
  const { color, pattern } = ghost.visual;

  // Generar formas basadas en el patrón
  const renderPattern = () => {
    switch (pattern) {
      case 'wisp':
        return <WispPattern color={color} />;
      case 'smoke':
        return <SmokePattern color={color} />;
      case 'shadow':
        return <ShadowPattern color={color} />;
      case 'mist':
        return <MistPattern color={color} />;
      case 'echo':
        return <EchoPattern color={color} />;
      default:
        return <WispPattern color={color} />;
    }
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="animate-float"
      >
        {renderPattern()}
      </svg>
    </div>
  );
}

// Patrón "Wisp" - forma etérea flotante
function WispPattern({ color }: { color: string }) {
  return (
    <g>
      <ellipse
        cx="100"
        cy="100"
        rx="60"
        ry="80"
        fill={color}
        opacity="0.3"
        filter="blur(10px)"
      />
      <ellipse
        cx="100"
        cy="90"
        rx="40"
        ry="60"
        fill={color}
        opacity="0.5"
      />
      <circle cx="85" cy="80" r="8" fill="#fff" opacity="0.8" />
      <circle cx="115" cy="80" r="8" fill="#fff" opacity="0.8" />
    </g>
  );
}

// Patrón "Smoke" - humo ascendente
function SmokePattern({ color }: { color: string }) {
  return (
    <g>
      <path
        d="M100 150 Q80 120, 90 90 Q85 60, 100 40"
        stroke={color}
        strokeWidth="20"
        fill="none"
        opacity="0.4"
        filter="blur(8px)"
      />
      <path
        d="M100 150 Q120 120, 110 90 Q115 60, 100 40"
        stroke={color}
        strokeWidth="20"
        fill="none"
        opacity="0.4"
        filter="blur(8px)"
      />
      <circle cx="100" cy="40" r="25" fill={color} opacity="0.6" />
    </g>
  );
}

// Patrón "Shadow" - silueta oscura
function ShadowPattern({ color }: { color: string }) {
  return (
    <g>
      <ellipse
        cx="100"
        cy="140"
        rx="70"
        ry="30"
        fill={color}
        opacity="0.2"
      />
      <rect
        x="70"
        y="60"
        width="60"
        height="80"
        rx="30"
        fill={color}
        opacity="0.7"
      />
      <circle cx="90" cy="75" r="5" fill="#000" opacity="0.5" />
      <circle cx="110" cy="75" r="5" fill="#000" opacity="0.5" />
    </g>
  );
}

// Patrón "Mist" - niebla dispersa
function MistPattern({ color }: { color: string }) {
  return (
    <g>
      <circle cx="100" cy="100" r="70" fill={color} opacity="0.2" filter="blur(15px)" />
      <circle cx="80" cy="90" r="40" fill={color} opacity="0.3" filter="blur(10px)" />
      <circle cx="120" cy="110" r="40" fill={color} opacity="0.3" filter="blur(10px)" />
      <circle cx="100" cy="85" r="30" fill={color} opacity="0.5" />
    </g>
  );
}

// Patrón "Echo" - ondas concéntricas
function EchoPattern({ color }: { color: string }) {
  return (
    <g>
      <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="2" fill="none" opacity="0.3" />
      <circle cx="100" cy="100" r="50" stroke={color} strokeWidth="3" fill="none" opacity="0.5" />
      <circle cx="100" cy="100" r="30" stroke={color} strokeWidth="4" fill="none" opacity="0.7" />
      <circle cx="100" cy="100" r="15" fill={color} opacity="0.9" />
    </g>
  );
}
