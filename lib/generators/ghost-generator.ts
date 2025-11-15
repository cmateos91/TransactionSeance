// Generador de fantasmas a partir de transacciones fallidas

import { Ghost, GhostType, GhostRarity, FailedTransaction } from '../types/ghost';
import { STORY_TEMPLATES, GHOST_NAMES } from '../constants/stories';
import { RARITY_THRESHOLDS, RARITY_COLORS } from '../constants/config';
import { formatEther } from 'viem';
import { es } from '../i18n/locales/es';
import { en } from '../i18n/locales/en';
import { generateGhostName } from './name-generator';

type Language = 'es' | 'en';

const translations = { es, en };

/**
 * Genera un fantasma completo a partir de una transacción fallida
 */
export function generateGhost(tx: FailedTransaction, lang: Language = 'es'): Ghost {
  const type = determineGhostType(tx);
  const rarity = calculateRarity(tx);
  const name = generateName(tx, type, lang);
  const story = generateStory(tx, type, lang);
  const visual = generateVisual(tx, rarity);
  const attributes = calculateAttributes(tx);

  return {
    id: tx.hash,
    name,
    type,
    rarity,
    story,
    attributes,
    visual,
    txData: {
      hash: tx.hash,
      from: tx.from,
      timestamp: parseInt(tx.timestamp),
      error: tx.errorMessage || 'Unknown',
      gasUsed: tx.gasUsed,
      blockNumber: tx.blockNumber || '0',
      nonce: tx.nonce || '0',
      gasPrice: tx.gasPrice || '0',
      input: tx.input || '0x',
      methodId: tx.methodId,
      functionName: tx.functionName,
    },
  };
}

/**
 * Determina el tipo de fantasma basado en el error
 */
function determineGhostType(tx: FailedTransaction): GhostType {
  const error = tx.errorMessage?.toLowerCase() || '';

  if (error.includes('gas')) return 'out_of_gas';
  if (error.includes('insufficient') || error.includes('balance'))
    return 'insufficient_balance';
  if (error.includes('revert')) return 'reverted';
  if (error.includes('swap')) return 'failed_swap';
  if (error.includes('mint') || error.includes('nft')) return 'failed_nft_mint';

  // Por defecto
  return 'reverted';
}

/**
 * Calcula la rareza basándose en el valor de la transacción
 */
function calculateRarity(tx: FailedTransaction): GhostRarity {
  const valueInEth = parseFloat(formatEther(BigInt(tx.value)));

  if (valueInEth >= RARITY_THRESHOLDS.legendary) return 'legendary';
  if (valueInEth >= RARITY_THRESHOLDS.epic) return 'epic';
  if (valueInEth >= RARITY_THRESHOLDS.rare) return 'rare';
  return 'common';
}

/**
 * Genera un nombre único para el fantasma usando el sistema avanzado
 * NOTA: Los nombres siempre se generan en inglés para mantener consistencia
 */
function generateName(tx: FailedTransaction, type: GhostType, lang: Language): string {
  return generateGhostName(tx, type, 'en');
}

/**
 * Genera la historia del fantasma
 */
function generateStory(tx: FailedTransaction, type: GhostType, lang: Language): string {
  const t = translations[lang];
  const templates = t.stories[type];
  const hashNum = parseInt(tx.hash.slice(2, 10), 16);
  const template = templates[hashNum % templates.length];

  // Calcular edad en días
  const now = Math.floor(Date.now() / 1000);
  const age = Math.floor((now - parseInt(tx.timestamp)) / (60 * 60 * 24));

  // Formatear valor
  const value = formatEther(BigInt(tx.value));

  return template
    .replace('{age}', String(age))
    .replace('{value}', value)
    .replace('{gasUsed}', tx.gasUsed);
}

/**
 * Genera los atributos numéricos del fantasma (SISTEMA COMPLEJO)
 */
function calculateAttributes(tx: FailedTransaction) {
  const now = Math.floor(Date.now() / 1000);
  const age = Math.floor((now - parseInt(tx.timestamp)) / (60 * 60 * 24));
  const valueInEth = parseFloat(formatEther(BigInt(tx.value)));

  // ==================== ATRIBUTOS BÁSICOS ====================

  // Sadness: más antiguo y más valor perdido = más tristeza
  const sadness = Math.min(10, Math.floor((age / 100) * 5 + valueInEth * 50));

  // Power: basado en gas usado y valor
  const power = Math.min(
    100,
    Math.floor(parseInt(tx.gasUsed) / 1000 + valueInEth * 100)
  );

  // ==================== ATRIBUTOS DE TRANSACCIÓN ====================

  // Complexity: basado en tamaño del input data
  const inputLength = (tx.input || '0x').length - 2;
  const complexity = Math.min(100, Math.floor((inputLength / 10000) * 100));

  // Attempts: nonce del usuario (experiencia)
  const attempts = parseInt(tx.nonce || '0');

  // Urgency: basado en gas price
  const gasPrice = parseInt(tx.gasPrice || '0');
  const avgGasPrice = 1e9; // 1 Gwei promedio
  const urgency = Math.min(100, Math.floor((gasPrice / avgGasPrice) * 10));

  // Generation: basado en la antigüedad
  let generation: string;
  if (age > 365) generation = 'Ancient';
  else if (age > 90) generation = 'Old';
  else if (age > 7) generation = 'Recent';
  else generation = 'Fresh';

  // ==================== ATRIBUTOS AVANZADOS (HASH-BASED) ====================

  const hash = tx.hash.slice(2); // Quitar '0x'
  const blockNumber = parseInt(tx.blockNumber || '0');
  const gasUsed = parseInt(tx.gasUsed || '0');
  const gasLimit = parseInt(tx.gas || '0');

  // ENTROPY: Caos del hash - cuenta caracteres únicos y distribución
  const uniqueChars = new Set(hash.split('')).size;
  const entropy = Math.floor((uniqueChars / 16) * 100); // max 16 chars hex

  // RESONANCE: Patrón del número de bloque
  const blockDigits = blockNumber.toString().split('').map(Number);
  const blockSum = blockDigits.reduce((a, b) => a + b, 0);
  const resonance = (blockSum % 100);

  // DENSITY: Ratio entre gas usado y límite
  const density = gasLimit > 0 ? Math.min(100, Math.floor((gasUsed / gasLimit) * 100)) : 50;

  // VOLATILITY: Variación entre dígitos consecutivos del hash
  let volatilitySum = 0;
  for (let i = 0; i < hash.length - 1; i++) {
    const diff = Math.abs(parseInt(hash[i], 16) - parseInt(hash[i + 1], 16));
    volatilitySum += diff;
  }
  const volatility = Math.min(100, Math.floor((volatilitySum / hash.length) * 10));

  // MAGNITUDE: Combinación logarítmica de valor y gas
  const magnitude = Math.min(100, Math.floor(
    Math.log10(Math.max(1, valueInEth * 1000000000 + gasUsed)) * 10
  ));

  // FREQUENCY: Patrón temporal - dígitos repetidos en timestamp
  const timestampStr = tx.timestamp.toString();
  const timestampDigits = timestampStr.split('');
  const digitCounts = timestampDigits.reduce((acc: any, d) => {
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});
  const maxRepetition = Math.max(...Object.values(digitCounts) as number[]);
  const frequency = Math.min(100, maxRepetition * 20);

  // PHASE: Ciclo lunar blockchain (basado en bloque % 8)
  const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
                  'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
  const phase = phases[blockNumber % 8];

  // ALIGNMENT: Alineación numérica (suma de hash mod 12)
  const hashSum = hash.split('').reduce((sum, char) => sum + parseInt(char, 16), 0);
  const alignments = ['Chaos', 'Order', 'Neutral', 'Light', 'Dark', 'Fire',
                     'Water', 'Earth', 'Air', 'Void', 'Aether', 'Quantum'];
  const alignment = alignments[hashSum % 12];

  // SIGNATURE: Patrón único - primeros 4 dígitos del hash
  const signature = hash.slice(0, 4).toUpperCase();

  // ESSENCE: Suma reducida del hash (numerología)
  let essenceSum = hashSum;
  while (essenceSum > 100) {
    essenceSum = essenceSum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }
  const essence = essenceSum;

  // AURA: Color único basado en diferentes partes del hash
  const r = parseInt(hash.slice(0, 2), 16);
  const g = parseInt(hash.slice(2, 4), 16);
  const b = parseInt(hash.slice(4, 6), 16);
  const aura = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  // DIMENSION: 1-13 (basado en combinación de factores)
  const dimension = (hashSum % 13) + 1;

  // CONSTELLATION: Basada en posición del bloque
  const constellations = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                         'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const constellation = constellations[blockNumber % 12];

  // ECHO: Reverberación temporal - edad modulada por patterns
  const echo = Math.min(100, (age * (hashSum % 10)) % 100);

  // STABILITY: Qué tan cerca estuvo de completarse (gas usado vs estimado)
  const stability = 100 - density; // Inverso de density

  // CHAOS: Nivel de caos - combinación de entropy y volatility
  const chaos = Math.floor((entropy + volatility) / 2);

  // HARMONY: Balance entre todos los atributos
  const harmony = Math.floor((
    (100 - Math.abs(50 - entropy)) +
    (100 - Math.abs(50 - density)) +
    (100 - Math.abs(50 - volatility))
  ) / 3);

  // VELOCITY: Velocidad percibida (gas price / edad)
  const velocity = Math.min(100, Math.floor((urgency * 100) / Math.max(1, age)));

  // WEIGHT: Peso conceptual (valor * complejidad)
  const weight = Math.min(100, Math.floor((valueInEth * 1000 + complexity) / 2));

  // TEMPERATURE: Caliente/frío basado en gas price
  const temperature = Math.min(100, urgency);

  return {
    // Básicos
    sadness,
    age,
    value: formatEther(BigInt(tx.value)),
    power,

    // Transacción
    complexity,
    attempts,
    urgency,
    generation,

    // Avanzados
    entropy,
    resonance,
    density,
    volatility,
    magnitude,
    frequency,
    phase,
    alignment,
    signature,
    essence,
    aura,
    dimension,
    constellation,
    echo,
    stability,
    chaos,
    harmony,
    velocity,
    weight,
    temperature,
  };
}

/**
 * Genera la representación visual del fantasma
 */
function generateVisual(tx: FailedTransaction, rarity: GhostRarity) {
  const hashNum = parseInt(tx.hash.slice(2, 10), 16);

  // Color basado en rareza
  const color = RARITY_COLORS[rarity];

  // Patrón basado en el hash (determinista)
  const patterns = ['wisp', 'smoke', 'shadow', 'mist', 'echo'];
  const pattern = patterns[hashNum % patterns.length];

  return {
    color,
    pattern,
    hash: tx.hash,
  };
}
