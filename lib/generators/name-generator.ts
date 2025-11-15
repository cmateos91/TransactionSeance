// Sistema avanzado de generación de nombres de fantasmas
// Combina múltiples estrategias para crear miles de nombres únicos

import { FailedTransaction, GhostType } from '../types/ghost';

type Language = 'es' | 'en';

/**
 * Generador principal de nombres
 * Combina diferentes estrategias basadas en el hash de la transacción
 */
export function generateGhostName(
  tx: FailedTransaction,
  type: GhostType,
  lang: Language
): string {
  // Usar el hash para determinar qué estrategia de nombre usar
  const hashNum = parseInt(tx.hash.slice(2, 10), 16);
  const strategy = hashNum % 5; // 5 estrategias diferentes

  switch (strategy) {
    case 0:
      return generateClassicName(tx, type, lang);
    case 1:
      return generatePoeticName(tx, type, lang);
    case 2:
      return generateMythologicalName(tx, type, lang);
    case 3:
      return generateDescriptiveName(tx, type, lang);
    case 4:
      return generateCrypticName(tx, type, lang);
    default:
      return generateClassicName(tx, type, lang);
  }
}

/**
 * ESTRATEGIA 1: Nombres clásicos (Prefijo + Sufijo)
 */
function generateClassicName(
  tx: FailedTransaction,
  type: GhostType,
  lang: Language
): string {
  const hashNum = parseInt(tx.hash.slice(2, 10), 16);
  const blockNum = parseInt(tx.blockNumber || '0');

  const prefixes = lang === 'es' ? CLASSIC_PREFIXES_ES : CLASSIC_PREFIXES_EN;
  const suffixes = lang === 'es' ? CLASSIC_SUFFIXES_ES : CLASSIC_SUFFIXES_EN;

  const prefix = prefixes[hashNum % prefixes.length];
  const suffix = suffixes[(hashNum + blockNum) % suffixes.length];

  return `${prefix} ${suffix}`.replace('{block}', String(blockNum % 1000000));
}

/**
 * ESTRATEGIA 2: Nombres poéticos (Adjetivo + Sustantivo)
 */
function generatePoeticName(
  tx: FailedTransaction,
  type: GhostType,
  lang: Language
): string {
  const hashNum = parseInt(tx.hash.slice(2, 10), 16);
  const nonce = parseInt(tx.nonce || '0');

  const adjectives = lang === 'es' ? POETIC_ADJECTIVES_ES : POETIC_ADJECTIVES_EN;
  const nouns = lang === 'es' ? POETIC_NOUNS_ES : POETIC_NOUNS_EN;

  const adjective = adjectives[hashNum % adjectives.length];
  const noun = nouns[(hashNum + nonce) % nouns.length];

  return `${adjective} ${noun}`;
}

/**
 * ESTRATEGIA 3: Nombres mitológicos
 */
function generateMythologicalName(
  tx: FailedTransaction,
  type: GhostType,
  lang: Language
): string {
  const hashNum = parseInt(tx.hash.slice(2, 10), 16);
  const blockNum = parseInt(tx.blockNumber || '0');

  const titles = lang === 'es' ? MYTHOLOGICAL_TITLES_ES : MYTHOLOGICAL_TITLES_EN;
  const beings = lang === 'es' ? MYTHOLOGICAL_BEINGS_ES : MYTHOLOGICAL_BEINGS_EN;
  const realms = lang === 'es' ? MYTHOLOGICAL_REALMS_ES : MYTHOLOGICAL_REALMS_EN;

  const title = titles[hashNum % titles.length];
  const being = beings[(hashNum * 2) % beings.length];
  const realm = realms[blockNum % realms.length];

  return `${being} ${title} ${realm}`;
}

/**
 * ESTRATEGIA 4: Nombres descriptivos (basados en atributos)
 */
function generateDescriptiveName(
  tx: FailedTransaction,
  type: GhostType,
  lang: Language
): string {
  const hashNum = parseInt(tx.hash.slice(2, 10), 16);
  const valueInWei = parseInt(tx.value || '0');

  const descriptors =
    lang === 'es' ? DESCRIPTIVE_TERMS_ES : DESCRIPTIVE_TERMS_EN;
  const subjects = lang === 'es' ? DESCRIPTIVE_SUBJECTS_ES : DESCRIPTIVE_SUBJECTS_EN;

  const descriptor = descriptors[hashNum % descriptors.length];
  const subject = subjects[(hashNum + valueInWei) % subjects.length];

  return `${descriptor} ${subject}`;
}

/**
 * ESTRATEGIA 5: Nombres crípticos (basados en el hash)
 */
function generateCrypticName(
  tx: FailedTransaction,
  type: GhostType,
  lang: Language
): string {
  const hash = tx.hash.slice(2);
  const hashNum = parseInt(hash.slice(0, 8), 16);

  const prefixes = lang === 'es' ? CRYPTIC_PREFIXES_ES : CRYPTIC_PREFIXES_EN;
  const cores = CRYPTIC_CORES; // Universales
  const suffixes = lang === 'es' ? CRYPTIC_SUFFIXES_ES : CRYPTIC_SUFFIXES_EN;

  const prefix = prefixes[hashNum % prefixes.length];
  const core = cores[(hashNum * 3) % cores.length];
  const suffix = suffixes[(hashNum * 7) % suffixes.length];

  // Generar código hexadecimal único del hash
  const code = hash.slice(0, 4).toUpperCase();

  return `${prefix}-${core}-${suffix} #${code}`;
}

// ============================================================================
// POOLS DE NOMBRES - ESPAÑOL
// ============================================================================

const CLASSIC_PREFIXES_ES = [
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
  'El Espectro',
  'La Fantasma',
  'El Susurro',
  'La Lamentación',
  'El Gemido',
  'La Penumbra',
  'El Desterrado',
  'La Exiliada',
  'El Fragmento',
  'La Ruina',
  'El Despojo',
  'La Ceniza',
  'El Resto',
  'La Huella',
  'El Vestigio',
  'La Reliquia',
  'El Recuerdo',
  'La Memoria',
  'El Olvido',
  'La Ausencia',
];

const CLASSIC_SUFFIXES_ES = [
  'de Base',
  'del Bloque {block}',
  'sin Gas',
  'sin Hogar',
  'del Pasado',
  'Eterno',
  'Olvidado',
  'sin Retorno',
  'de las Profundidades',
  'del Abismo',
  'de la Oscuridad',
  'del Limbo',
  'sin Nombre',
  'sin Destino',
  'de la Cadena',
  'del Void',
  'sin Esperanza',
  'Perdido',
  'Errante',
  'Solitario',
  'Abandonado',
  'Roto',
  'Fragmentado',
  'Disperso',
  'Desvanecido',
  'Consumido',
  'Agotado',
  'Derrotado',
  'Vencido',
  'Colapsado',
];

const POETIC_ADJECTIVES_ES = [
  'Melancólico',
  'Etéreo',
  'Sombrío',
  'Silente',
  'Fugaz',
  'Tenue',
  'Difuso',
  'Pálido',
  'Gélido',
  'Árido',
  'Desolado',
  'Nostálgico',
  'Pensativo',
  'Taciturno',
  'Lacónico',
  'Enigmático',
  'Críptico',
  'Hermético',
  'Oculto',
  'Velado',
  'Nebuloso',
  'Brumoso',
  'Espectral',
  'Fantasmal',
  'Translúcido',
  'Diáfano',
  'Inmaterial',
  'Incorpóreo',
  'Intangible',
  'Invisible',
];

const POETIC_NOUNS_ES = [
  'Suspiro',
  'Lamento',
  'Murmullo',
  'Susurro',
  'Gemido',
  'Sollozo',
  'Queja',
  'Clamor',
  'Eco',
  'Reflejo',
  'Espejismo',
  'Ilusión',
  'Fantasía',
  'Sueño',
  'Pesadilla',
  'Visión',
  'Aparición',
  'Presagio',
  'Augurio',
  'Presencia',
  'Esencia',
  'Alma',
  'Espíritu',
  'Ente',
  'Ser',
  'Existencia',
  'Vacío',
  'Nada',
  'Silencio',
  'Quietud',
];

const MYTHOLOGICAL_TITLES_ES = [
  'el Guardián',
  'el Centinela',
  'el Vigilante',
  'el Custodio',
  'el Protector',
  'el Defensor',
  'el Portador',
  'el Mensajero',
  'el Heraldo',
  'el Profeta',
  'el Vidente',
  'el Oráculo',
  'el Sabio',
  'el Ancestro',
  'el Primigenio',
  'el Antiguo',
  'el Eterno',
  'el Inmortal',
  'el Errante',
  'el Vagabundo',
];

const MYTHOLOGICAL_BEINGS_ES = [
  'Espectro',
  'Ánima',
  'Revenant',
  'Wraith',
  'Shade',
  'Banshee',
  'Phantom',
  'Geist',
  'Umbra',
  'Nephilim',
  'Daemon',
  'Eidolon',
  'Lemure',
  'Larvae',
  'Manes',
  'Psych',
  'Ankou',
  'Draugr',
  'Nachzehrer',
  'Vetala',
];

const MYTHOLOGICAL_REALMS_ES = [
  'de las Sombras',
  'del Vacío',
  'del Abismo',
  'del Éter',
  'del Astral',
  'del Limbo',
  'del Purgatorio',
  'del Inframundo',
  'de los Perdidos',
  'de los Olvidados',
  'de la Niebla',
  'de la Penumbra',
  'del Crepúsculo',
  'del Ocaso',
  'de la Medianoche',
  'del Silencio',
  'del Olvido',
  'de la Eternidad',
  'del Tiempo',
  'del Espacio',
];

const DESCRIPTIVE_TERMS_ES = [
  'Transacción',
  'Código',
  'Programa',
  'Script',
  'Algoritmo',
  'Proceso',
  'Función',
  'Comando',
  'Instrucción',
  'Operación',
  'Bloque',
  'Nodo',
  'Hash',
  'Token',
  'Wallet',
  'Contract',
  'Estado',
  'Memoria',
  'Registro',
  'Señal',
];

const DESCRIPTIVE_SUBJECTS_ES = [
  'Corrupto',
  'Fallido',
  'Revertido',
  'Cancelado',
  'Rechazado',
  'Anulado',
  'Perdido',
  'Fragmentado',
  'Incompleto',
  'Truncado',
  'Dañado',
  'Roto',
  'Defectuoso',
  'Erróneo',
  'Inválido',
  'Obsoleto',
  'Abandonado',
  'Suspendido',
  'Congelado',
  'Bloqueado',
];

const CRYPTIC_PREFIXES_ES = [
  'TX',
  'BLK',
  'GAS',
  'ERR',
  'REV',
  'FAIL',
  'NULL',
  'VOID',
  'LOST',
  'DEAD',
];

const CRYPTIC_CORES = [
  'ALPHA',
  'BETA',
  'GAMMA',
  'DELTA',
  'EPSILON',
  'ZETA',
  'ETA',
  'THETA',
  'IOTA',
  'KAPPA',
  'LAMBDA',
  'MU',
  'NU',
  'XI',
  'OMICRON',
  'PI',
  'RHO',
  'SIGMA',
  'TAU',
  'UPSILON',
  'PHI',
  'CHI',
  'PSI',
  'OMEGA',
];

const CRYPTIC_SUFFIXES_ES = [
  'NULO',
  'PERDIDO',
  'CAÍDO',
  'ROTO',
  'MUERTO',
  'VACÍO',
  'OSCURO',
  'FANTASMA',
  'SOMBRA',
  'ECO',
];

// ============================================================================
// POOLS DE NOMBRES - INGLÉS
// ============================================================================

const CLASSIC_PREFIXES_EN = [
  'The Forgotten',
  'The Shadow',
  'The Wanderer',
  'The Lost',
  'The Fallen',
  'The Abandoned',
  'The Reversed',
  'The Silent',
  'The Void',
  'The Echo',
  'The Specter',
  'The Phantom',
  'The Whisper',
  'The Lament',
  'The Wail',
  'The Gloom',
  'The Banished',
  'The Exiled',
  'The Fragment',
  'The Ruin',
  'The Remnant',
  'The Ash',
  'The Remainder',
  'The Trace',
  'The Vestige',
  'The Relic',
  'The Memory',
  'The Remembrance',
  'The Oblivion',
  'The Absence',
];

const CLASSIC_SUFFIXES_EN = [
  'of Base',
  'of Block {block}',
  'without Gas',
  'without Home',
  'of the Past',
  'Eternal',
  'Forgotten',
  'of No Return',
  'of the Depths',
  'of the Abyss',
  'of Darkness',
  'of Limbo',
  'without Name',
  'without Fate',
  'of the Chain',
  'of the Void',
  'without Hope',
  'Lost',
  'Wandering',
  'Solitary',
  'Abandoned',
  'Broken',
  'Fragmented',
  'Scattered',
  'Faded',
  'Consumed',
  'Depleted',
  'Defeated',
  'Vanquished',
  'Collapsed',
];

const POETIC_ADJECTIVES_EN = [
  'Melancholic',
  'Ethereal',
  'Shadowy',
  'Silent',
  'Fleeting',
  'Faint',
  'Diffuse',
  'Pale',
  'Frigid',
  'Barren',
  'Desolate',
  'Nostalgic',
  'Pensive',
  'Taciturn',
  'Laconic',
  'Enigmatic',
  'Cryptic',
  'Hermetic',
  'Hidden',
  'Veiled',
  'Nebulous',
  'Misty',
  'Spectral',
  'Ghostly',
  'Translucent',
  'Diaphanous',
  'Immaterial',
  'Incorporeal',
  'Intangible',
  'Invisible',
];

const POETIC_NOUNS_EN = [
  'Sigh',
  'Lament',
  'Murmur',
  'Whisper',
  'Moan',
  'Sob',
  'Complaint',
  'Cry',
  'Echo',
  'Reflection',
  'Mirage',
  'Illusion',
  'Fantasy',
  'Dream',
  'Nightmare',
  'Vision',
  'Apparition',
  'Omen',
  'Augury',
  'Presence',
  'Essence',
  'Soul',
  'Spirit',
  'Entity',
  'Being',
  'Existence',
  'Void',
  'Nothing',
  'Silence',
  'Stillness',
];

const MYTHOLOGICAL_TITLES_EN = [
  'the Guardian',
  'the Sentinel',
  'the Watcher',
  'the Keeper',
  'the Protector',
  'the Defender',
  'the Bearer',
  'the Messenger',
  'the Herald',
  'the Prophet',
  'the Seer',
  'the Oracle',
  'the Sage',
  'the Ancestor',
  'the Primordial',
  'the Ancient',
  'the Eternal',
  'the Immortal',
  'the Wanderer',
  'the Vagrant',
];

const MYTHOLOGICAL_BEINGS_EN = [
  'Specter',
  'Anima',
  'Revenant',
  'Wraith',
  'Shade',
  'Banshee',
  'Phantom',
  'Geist',
  'Umbra',
  'Nephilim',
  'Daemon',
  'Eidolon',
  'Lemure',
  'Larvae',
  'Manes',
  'Psyche',
  'Ankou',
  'Draugr',
  'Nachzehrer',
  'Vetala',
];

const MYTHOLOGICAL_REALMS_EN = [
  'of Shadows',
  'of the Void',
  'of the Abyss',
  'of the Ether',
  'of the Astral',
  'of Limbo',
  'of Purgatory',
  'of the Underworld',
  'of the Lost',
  'of the Forgotten',
  'of Mist',
  'of Gloom',
  'of Twilight',
  'of Dusk',
  'of Midnight',
  'of Silence',
  'of Oblivion',
  'of Eternity',
  'of Time',
  'of Space',
];

const DESCRIPTIVE_TERMS_EN = [
  'Transaction',
  'Code',
  'Program',
  'Script',
  'Algorithm',
  'Process',
  'Function',
  'Command',
  'Instruction',
  'Operation',
  'Block',
  'Node',
  'Hash',
  'Token',
  'Wallet',
  'Contract',
  'State',
  'Memory',
  'Register',
  'Signal',
];

const DESCRIPTIVE_SUBJECTS_EN = [
  'Corrupted',
  'Failed',
  'Reverted',
  'Cancelled',
  'Rejected',
  'Nullified',
  'Lost',
  'Fragmented',
  'Incomplete',
  'Truncated',
  'Damaged',
  'Broken',
  'Defective',
  'Erroneous',
  'Invalid',
  'Obsolete',
  'Abandoned',
  'Suspended',
  'Frozen',
  'Blocked',
];

const CRYPTIC_PREFIXES_EN = [
  'TX',
  'BLK',
  'GAS',
  'ERR',
  'REV',
  'FAIL',
  'NULL',
  'VOID',
  'LOST',
  'DEAD',
];

const CRYPTIC_SUFFIXES_EN = [
  'NULL',
  'LOST',
  'FALLEN',
  'BROKEN',
  'DEAD',
  'EMPTY',
  'DARK',
  'GHOST',
  'SHADOW',
  'ECHO',
];
