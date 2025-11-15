// Templates de historias para cada tipo de fantasma

import { GhostType } from '../types/ghost';

export const STORY_TEMPLATES: Record<GhostType, string[]> = {
  out_of_gas: [
    'Corrí tan rápido que me quedé sin aliento... {gasUsed} de energía consumida, pero no fue suficiente.',
    'El camino era largo, pero mi fuerza se agotó a medio camino. Solo quedó el eco de {gasUsed} de esfuerzo.',
    'Intenté alcanzar mi destino, pero el universo me detuvo. {gasUsed} fue todo lo que pude dar.',
  ],

  insufficient_balance: [
    'Mis bolsillos estaban vacíos cuando más los necesitaba. Soñaba con {value} ETH, pero solo tenía sombras.',
    'Hace {age} días, intenté un último movimiento... {value} ETH era todo lo que quedaba.',
    'La pobreza me alcanzó en el peor momento. {value} ETH no fueron suficientes para mi última voluntad.',
  ],

  reverted: [
    'El universo rechazó mi existencia. Cada intento fue en vano.',
    'Las reglas del mundo me lo impidieron. Fui reversado al olvido.',
    'Intenté existir, pero las leyes cósmicas me borraron de la realidad.',
  ],

  abandoned_wallet: [
    'Hace {age} días, mi dueño me dejó atrás. {value} ETH esperan en el vacío.',
    'Nadie ha vuelto en {age} días. Solo quedo yo y {value} ETH olvidados.',
    'El silencio lleva {age} días. ¿Volverá alguien por estos {value} ETH?',
  ],

  failed_swap: [
    'Quería intercambiar mi destino, pero el mercado me rechazó.',
    'El swap que nunca fue. {gasUsed} de esperanza quemada.',
    'Intenté cambiar, pero las tasas me condenaron al fracaso.',
  ],

  failed_nft_mint: [
    'Iba a ser único, iba a ser arte... pero nunca nací.',
    'El mint que nunca ocurrió. Un NFT fantasma que jamás existió.',
    'Soñé con ser coleccionado, pero me quedé en el limbo digital.',
  ],
};

export const GHOST_NAMES = {
  prefixes: [
    'El Olvidado',
    'La Sombra',
    'El Errante',
    'La Perdida',
    'El Caído',
    'La Abandonada',
    'El Reverso',
    'La Silenciosa',
    'El Vacío',
    'La Eco',
  ],
  suffixes: [
    'de Base',
    'del Bloque {block}',
    'sin Gas',
    'sin Hogar',
    'del Pasado',
    'Eterno',
    'Olvidado',
    'sin Retorno',
  ],
};
