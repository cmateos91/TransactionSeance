// Traducciones en Español

export const es = {
  // Página principal
  page: {
    title: 'Transaction Séance',
    subtitle: 'Invoca los espíritus de transacciones olvidadas en Base',
    tagline: 'Arqueología blockchain • Historias perdidas • Fantasmas digitales',
    invokeButton: '🕯️ Invocar Espíritu',
    invoking: 'Invocando...',
    loadingSubtitle: 'Contactando con el más allá...',
    invokeAnother: 'Invocar Otro',
    adoptSpirit: 'Adoptar Espíritu',
    shareStory: '📋 Compartir historia',
    revealFace: 'Revelar Rostro',
    hideFace: 'Ocultar Rostro',
    footer: {
      info: 'Cada fantasma es único y está basado en transacciones reales de Base',
      version: 'Versión 1.0 - MVP',
    },
    alerts: {
      collectionSoon: '¡Función de colección próximamente!',
      copied: '¡Copiado al portapapeles! Compártelo en redes.',
      shareText: (name: string, story: string, rarity: string) =>
        `Acabo de invocar a "${name}" en Transaction Séance!\n\n"${story}..."\n\nRareza: ${rarity}`,
    },
  },

  // Tipos de fantasmas
  ghostTypes: {
    out_of_gas: 'sin gas',
    insufficient_balance: 'saldo insuficiente',
    reverted: 'revertido',
    abandoned_wallet: 'wallet abandonada',
    failed_swap: 'swap fallido',
    failed_nft_mint: 'mint de NFT fallido',
  },

  // Rarezas
  rarity: {
    common: 'común',
    rare: 'raro',
    epic: 'épico',
    legendary: 'legendario',
  },

  // Atributos
  attributes: {
    sadness: 'Tristeza',
    power: 'Poder',
    age: 'Edad',
    value: 'Valor',
    days: 'días',
  },

  // Datos técnicos
  technical: {
    transactionHash: 'Hash de Transacción',
    fromAddress: 'Dirección de Origen',
    blockNumber: 'Número de Bloque',
    value: 'Valor',
    gasUsed: 'Gas Usado',
    gasPrice: 'Precio del Gas',
    nonce: 'Nonce',
    age: 'Antigüedad',
    error: 'Error',
    calculatedAttributes: 'Atributos Calculados',
    complexity: 'Complejidad',
    urgency: 'Urgencia',
    power: 'Poder',
    generation: 'Generación',
    functionCalled: 'Función Llamada',

    // Secciones de atributos
    basicAttributes: 'Atributos Básicos',
    transactionAttributes: 'Atributos de Transacción',
    advancedAttributes: 'Atributos Avanzados',
    cosmicAttributes: 'Atributos Cósmicos',

    // Atributos básicos
    sadness: 'Tristeza',

    // Atributos avanzados
    entropy: 'Entropía',
    resonance: 'Resonancia',
    density: 'Densidad',
    volatility: 'Volatilidad',
    magnitude: 'Magnitud',
    frequency: 'Frecuencia',
    phase: 'Fase Lunar',
    alignment: 'Alineación',
    signature: 'Firma',
    essence: 'Esencia',
    aura: 'Aura',
    dimension: 'Dimensión',
    constellation: 'Constelación',
    echo: 'Eco',
    stability: 'Estabilidad',
    chaos: 'Caos',
    harmony: 'Armonía',
    velocity: 'Velocidad',
    weight: 'Peso',
    temperature: 'Temperatura',
    attempts: 'Intentos',
  },

  // Historias (templates)
  stories: {
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
  },

  // Nombres de fantasmas
  ghostNames: {
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
  },

  // Descripciones de atributos para el modal
  attributeDescriptions: {
    // Básicos
    sadness: 'Calculado en base a la antigüedad y el valor perdido. Transacciones más antiguas con mayor valor = mayor tristeza.',
    power: 'Basado en el gas usado y el valor de la transacción. Mayor gas y valor = más poder.',
    generation: 'Ancient (>365 días), Old (>90 días), Recent (>7 días), Fresh (≤7 días).',
    attempts: 'Nonce de la transacción. Indica la experiencia del usuario (cuántas transacciones ha enviado).',

    // Transacción
    complexity: 'Basado en el tamaño del input data. Más bytes de datos = más complejidad.',
    urgency: 'Calculado del gas price. Mayor gas price = más urgencia/desesperación del usuario.',
    density: 'Ratio entre gas usado y gas límite. Indica qué tan cerca estuvo de completarse la transacción.',
    magnitude: 'Combinación logarítmica de valor y gas. Escala general de la importancia de la transacción.',

    // Avanzados
    entropy: 'Caos del hash. Cuenta caracteres únicos en el hash de la transacción.',
    volatility: 'Variación entre dígitos consecutivos del hash.',
    frequency: 'Patrón temporal basado en dígitos repetidos en el timestamp.',
    resonance: 'Patrón derivado de la suma de dígitos del número de bloque.',
    echo: 'Reverberación temporal - edad modulada por patrones del hash.',
    stability: 'Inverso de la densidad. Qué tan estable era la transacción.',
    chaos: 'Combinación de entropía y volatilidad.',
    harmony: 'Balance entre entropía, densidad y volatilidad.',
    velocity: 'Urgencia dividida por edad. Velocidad percibida de la transacción.',
    weight: 'Valor multiplicado por complejidad. Peso conceptual.',
    temperature: 'Igual a la urgencia. Qué tan caliente estaba la transacción.',
    essence: 'Suma numerológica reducida del hash (numerología blockchain).',

    // Cósmicos
    phase: 'Ciclo lunar blockchain basado en el número de bloque % 8. 8 fases lunares: New Moon, Waxing Crescent, First Quarter, Waxing Gibbous, Full Moon, Waning Gibbous, Last Quarter, Waning Crescent.',
    alignment: 'Suma del hash % 12. 12 alineaciones posibles: Chaos, Order, Neutral, Light, Dark, Fire, Water, Earth, Air, Void, Aether, Quantum.',
    constellation: 'Basada en número de bloque % 12. Los 12 signos del zodiaco: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces.',
    dimension: 'Suma del hash % 13 + 1. La dimensión espiritual del fantasma del 1 al 13.',
    signature: 'Primeros 4 dígitos hexadecimales del hash. Patrón único e irrepetible del fantasma.',
    aura: 'Color RGB único derivado de los primeros 6 caracteres del hash. Cada fantasma tiene su propio color de aura.',
  },

  // Textos del modal de información
  modal: {
    title: 'Información de Atributos',
    close: 'Cerrar',
  },
};

export type Translations = typeof es;
