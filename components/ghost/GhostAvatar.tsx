'use client';

import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { Ghost } from '@/lib/types/ghost';

interface GhostAvatarProps {
  ghost: Ghost;
  size?: number;
}

/**
 * Componente que genera un avatar único basado en los atributos del fantasma
 * Usa DiceBear con el estilo Lorelei y mapea los atributos del fantasma a características visuales
 */
export function GhostAvatar({ ghost, size = 256 }: GhostAvatarProps) {
  const avatarSvg = useMemo(() => {
    const attrs = ghost.attributes;

    // Crear un seed único combinando el hash con múltiples atributos
    // Esto hace que cada fantasma tenga un punto de partida muy diferente
    const uniqueSeed = `${ghost.txData.hash}-${attrs.power}-${attrs.sadness}-${attrs.chaos}-${attrs.entropy}`;

    // Probabilidades dinámicas basadas en atributos y rareza
    const glassesProbability = ghost.rarity === 'legendary' ? 100 :
                               ghost.rarity === 'epic' ? 80 :
                               ghost.rarity === 'rare' ? 60 :
                               (attrs.complexity > 60 ? 40 : 15);

    const earringsProbability = attrs.essence > 70 ? 90 :
                                attrs.essence > 40 ? 60 : 20;

    const beardProbability = attrs.power > 75 ? 80 :
                             attrs.power > 50 ? 50 : 10;

    const frecklesProbability = attrs.temperature > 70 ? 70 :
                                attrs.temperature > 40 ? 40 : 10;

    // IMPORTANTE: Dejar que DiceBear haga la randomización automática
    // Solo controlamos colores y probabilidades, no características específicas
    const avatar = createAvatar(lorelei, {
      seed: uniqueSeed, // Seed único para máxima variedad
      size,

      // Solo controlar probabilidades, NO características específicas
      glassesProbability,
      earringsProbability,
      beardProbability,
      frecklesProbability,

      // Dejar que DiceBear elija el resto automáticamente basado en el seed
      // NO especificar hair, eyes, mouth, eyebrows, nose
      // Esto permite MUCHA más variedad natural

      backgroundColor: [ghost.attributes.aura],
      radius: 10,
      scale: 90,
    });

    // Retornar el SVG como string directamente
    return avatar.toString();
  }, [ghost, size]);

  return (
    <div className="flex justify-center">
      <div
        className="rounded-lg border-2 border-gray-300 shadow-lg ghost-face-filter"
        style={{
          width: size,
          height: size,
          boxShadow: `0 0 30px ${ghost.attributes.aura}80, 0 0 60px ${ghost.attributes.aura}40`,
          // Filtros para efecto fantasmal
          filter: 'grayscale(40%) contrast(1.2) brightness(0.95)',
          opacity: 0.92,
        }}
        dangerouslySetInnerHTML={{ __html: avatarSvg }}
      />
    </div>
  );
}
