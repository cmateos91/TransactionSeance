// English translations

import { Translations } from './es';

export const en: Translations = {
  // Main page
  page: {
    title: 'Transaction Séance',
    subtitle: 'Invoke the spirits of forgotten transactions on Base',
    tagline: 'Blockchain archaeology • Lost stories • Digital ghosts',
    invokeButton: '🕯️ Invoke Spirit',
    invoking: 'Invoking...',
    loadingSubtitle: 'Contacting the beyond...',
    invokeAnother: 'Invoke Another',
    adoptSpirit: 'Adopt Spirit',
    shareStory: '📋 Share story',
    revealFace: 'Reveal Face',
    hideFace: 'Hide Face',
    footer: {
      info: 'Each ghost is unique and based on real Base transactions',
      version: 'Version 1.0 - MVP',
    },
    alerts: {
      collectionSoon: 'Collection feature coming soon!',
      copied: 'Copied to clipboard! Share it on social media.',
      shareText: (name: string, story: string, rarity: string) =>
        `I just invoked "${name}" in Transaction Séance!\n\n"${story}..."\n\nRarity: ${rarity}`,
    },
  },

  // Ghost types
  ghostTypes: {
    out_of_gas: 'out of gas',
    insufficient_balance: 'insufficient balance',
    reverted: 'reverted',
    abandoned_wallet: 'abandoned wallet',
    failed_swap: 'failed swap',
    failed_nft_mint: 'failed NFT mint',
  },

  // Rarities
  rarity: {
    common: 'common',
    rare: 'rare',
    epic: 'epic',
    legendary: 'legendary',
  },

  // Attributes
  attributes: {
    sadness: 'Sadness',
    power: 'Power',
    age: 'Age',
    value: 'Value',
    days: 'days',
  },

  // Technical data
  technical: {
    transactionHash: 'Transaction Hash',
    fromAddress: 'From Address',
    blockNumber: 'Block Number',
    value: 'Value',
    gasUsed: 'Gas Used',
    gasPrice: 'Gas Price',
    nonce: 'Nonce',
    age: 'Age',
    error: 'Error',
    calculatedAttributes: 'Calculated Attributes',
    complexity: 'Complexity',
    urgency: 'Urgency',
    power: 'Power',
    generation: 'Generation',
    functionCalled: 'Function Called',

    // Attribute sections
    basicAttributes: 'Basic Attributes',
    transactionAttributes: 'Transaction Attributes',
    advancedAttributes: 'Advanced Attributes',
    cosmicAttributes: 'Cosmic Attributes',

    // Basic attributes
    sadness: 'Sadness',

    // Advanced attributes
    entropy: 'Entropy',
    resonance: 'Resonance',
    density: 'Density',
    volatility: 'Volatility',
    magnitude: 'Magnitude',
    frequency: 'Frequency',
    phase: 'Lunar Phase',
    alignment: 'Alignment',
    signature: 'Signature',
    essence: 'Essence',
    aura: 'Aura',
    dimension: 'Dimension',
    constellation: 'Constellation',
    echo: 'Echo',
    stability: 'Stability',
    chaos: 'Chaos',
    harmony: 'Harmony',
    velocity: 'Velocity',
    weight: 'Weight',
    temperature: 'Temperature',
    attempts: 'Attempts',
  },

  // Stories (templates)
  stories: {
    out_of_gas: [
      'I ran so fast I ran out of breath... {gasUsed} energy consumed, but it wasn\'t enough.',
      'The road was long, but my strength gave out halfway. Only the echo of {gasUsed} effort remained.',
      'I tried to reach my destination, but the universe stopped me. {gasUsed} was all I could give.',
    ],
    insufficient_balance: [
      'My pockets were empty when I needed them most. I dreamed of {value} ETH, but had only shadows.',
      '{age} days ago, I tried one last move... {value} ETH was all that remained.',
      'Poverty caught up with me at the worst time. {value} ETH wasn\'t enough for my final wish.',
    ],
    reverted: [
      'The universe rejected my existence. Every attempt was in vain.',
      'The rules of the world prevented me. I was reversed into oblivion.',
      'I tried to exist, but cosmic laws erased me from reality.',
    ],
    abandoned_wallet: [
      '{age} days ago, my owner left me behind. {value} ETH wait in the void.',
      'No one has returned in {age} days. Just me and {value} ETH, forgotten.',
      'The silence has lasted {age} days. Will anyone come back for these {value} ETH?',
    ],
    failed_swap: [
      'I wanted to swap my destiny, but the market rejected me.',
      'The swap that never was. {gasUsed} of hope burned.',
      'I tried to change, but fees condemned me to failure.',
    ],
    failed_nft_mint: [
      'I was going to be unique, I was going to be art... but I was never born.',
      'The mint that never happened. A ghost NFT that never existed.',
      'I dreamed of being collected, but remained in digital limbo.',
    ],
  },

  // Ghost names
  ghostNames: {
    prefixes: [
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
    ],
    suffixes: [
      'of Base',
      'of Block {block}',
      'without Gas',
      'without Home',
      'of the Past',
      'Eternal',
      'Forgotten',
      'of No Return',
    ],
  },

  // Attribute descriptions for the modal
  attributeDescriptions: {
    // Basic
    sadness: 'Calculated based on age and lost value. Older transactions with higher value = greater sadness.',
    power: 'Based on gas used and transaction value. Higher gas and value = more power.',
    generation: 'Ancient (>365 days), Old (>90 days), Recent (>7 days), Fresh (≤7 days).',
    attempts: 'Transaction nonce. Indicates user experience (how many transactions they have sent).',

    // Transaction
    complexity: 'Based on input data size. More data bytes = more complexity.',
    urgency: 'Calculated from gas price. Higher gas price = more urgency/user desperation.',
    density: 'Ratio between gas used and gas limit. Indicates how close the transaction was to completion.',
    magnitude: 'Logarithmic combination of value and gas. Overall scale of transaction importance.',

    // Advanced
    entropy: 'Hash chaos. Counts unique characters in the transaction hash.',
    volatility: 'Variation between consecutive hash digits.',
    frequency: 'Temporal pattern based on repeated digits in the timestamp.',
    resonance: 'Pattern derived from the sum of block number digits.',
    echo: 'Temporal reverberation - age modulated by hash patterns.',
    stability: 'Inverse of density. How stable the transaction was.',
    chaos: 'Combination of entropy and volatility.',
    harmony: 'Balance between entropy, density, and volatility.',
    velocity: 'Urgency divided by age. Perceived transaction velocity.',
    weight: 'Value multiplied by complexity. Conceptual weight.',
    temperature: 'Same as urgency. How hot the transaction was.',
    essence: 'Reduced numerological sum of the hash (blockchain numerology).',

    // Cosmic
    phase: 'Blockchain lunar cycle based on block number % 8. 8 lunar phases: New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Last Quarter, Waning Crescent.',
    alignment: 'Hash sum % 12. 12 possible alignments: Chaos, Order, Neutral, Light, Dark, Fire, Water, Earth, Air, Void, Aether, Quantum.',
    constellation: 'Based on block number % 12. The 12 zodiac signs: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces.',
    dimension: 'Hash sum % 13 + 1. The spiritual dimension of the ghost from 1 to 13.',
    signature: 'First 4 hexadecimal digits of the hash. Unique and unrepeatable ghost pattern.',
    aura: 'Unique RGB color derived from the first 6 hash characters. Each ghost has its own aura color.',
  },

  // Info modal texts
  modal: {
    title: 'Attribute Information',
    close: 'Close',
  },
} as const;
