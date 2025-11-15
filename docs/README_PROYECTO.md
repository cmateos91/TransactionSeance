# 🕯️ Transaction Séance

**Arqueología blockchain gamificada** - Invoca los espíritus de transacciones olvidadas en Base

## 📖 Concepto

Transaction Séance es un juego experimental que convierte la blockchain de Base en un cementerio de historias olvidadas. Cada transacción fallida se convierte en un "fantasma" único con su propia historia generada a partir de datos reales.

## ✨ Características (v1.0 MVP)

- ✅ **Invocación de fantasmas**: Genera espíritus únicos basados en transacciones fallidas reales
- ✅ **Historias generativas**: Cada fantasma tiene una historia única basada en sus datos
- ✅ **Sistema de rareza**: Common, Rare, Epic, Legendary
- ✅ **Visuales únicos**: Arte generativo SVG basado en el hash de la transacción
- ✅ **Atributos**: Tristeza, Poder, Edad, Valor
- ✅ **Compartir**: Copia la historia para compartir en redes sociales

## 🏗️ Arquitectura

```
transaction-seance/
├── app/
│   ├── api/
│   │   └── ghost/
│   │       └── route.ts          # API para obtener fantasmas
│   ├── page.tsx                  # Página principal
│   └── globals.css               # Estilos globales
├── components/
│   └── ghost/
│       ├── GhostCard.tsx         # Tarjeta del fantasma
│       └── GhostVisual.tsx       # Visualización SVG
├── lib/
│   ├── api/
│   │   └── basescan.ts           # Cliente Basescan API
│   ├── generators/
│   │   └── ghost-generator.ts    # Lógica de generación
│   ├── types/
│   │   └── ghost.ts              # Tipos TypeScript
│   ├── constants/
│   │   ├── config.ts             # Configuración
│   │   └── stories.ts            # Templates de historias
│   └── utils/
```

## 🚀 Cómo ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar API Key (OPCIONAL pero recomendado)
# Copia el archivo de ejemplo
cp .env.example .env.local

# Edita .env.local y pega tu API key de Basescan
# Ver SETUP_API.md para instrucciones detalladas

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir en navegador
http://localhost:3000
```

> **💡 Nota**: Sin API key usará datos mock. Para obtener datos reales de Base, sigue la guía en [SETUP_API.md](SETUP_API.md)

## 🎮 Cómo jugar

1. Haz click en **"🕯️ Invocar Espíritu"**
2. El juego buscará una transacción fallida en Base
3. Se generará un fantasma único con:
   - Nombre
   - Historia
   - Atributos (Tristeza, Poder, etc.)
   - Visual único
4. Puedes:
   - Invocar otro fantasma
   - Copiar la historia para compartir
   - (Próximamente) Adoptar fantasmas a tu colección

## 📊 Tipos de Fantasmas

### Por Error
- **Out of Gas**: Se quedó sin energía a medio camino
- **Insufficient Balance**: No tenía suficiente para completar
- **Reverted**: El universo rechazó su existencia
- **Failed Swap**: Intercambio fallido
- **Failed NFT Mint**: NFT que nunca nació
- **Abandoned Wallet**: Billetera olvidada

### Por Rareza
- **Common** (gris): < 0.01 ETH
- **Rare** (azul): 0.01 - 0.1 ETH
- **Epic** (morado): 0.1 - 1 ETH
- **Legendary** (dorado): > 1 ETH

## 🔮 Datos Reales vs Mock

Actualmente el juego usa **datos mock** para desarrollo. Para usar datos reales de Base:

1. Obtén una API key gratis en [basescan.org](https://basescan.org/apis)
2. Edita `lib/constants/config.ts`:
   ```typescript
   BASESCAN_API_KEY: 'TU_API_KEY_AQUI'
   ```

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 + React
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Blockchain**: Base L2 (Ethereum)
- **APIs**: Basescan API
- **Visuales**: SVG generativo

## 📋 Próximas Características (v2.0)

- [ ] Sistema de colección persistente (base de datos)
- [ ] Mintear fantasmas raros como NFTs
- [ ] Batalla de fantasmas
- [ ] Integración con Farcaster Frames
- [ ] Sistema de "revivir" transacciones
- [ ] Marketplace de fantasmas
- [ ] Historias generadas por IA

## 🎨 Patrones Visuales

Cada fantasma tiene uno de 5 patrones únicos:
- **Wisp**: Forma etérea flotante
- **Smoke**: Humo ascendente
- **Shadow**: Silueta oscura
- **Mist**: Niebla dispersa
- **Echo**: Ondas concéntricas

## 📝 Notas Técnicas

- Los fantasmas se generan de forma **determinista** basado en el hash de la transacción
- Mismo hash = mismo fantasma siempre
- Los datos de blockchain son públicos y verificables
- El sistema de rareza es justo (basado en valor real)

## 🤝 Contribuir

Este es un proyecto experimental. Ideas para contribuir:

1. Más templates de historias
2. Nuevos patrones visuales
3. Mejoras en el algoritmo de rareza
4. Integración con más L2s
5. Sistema de logros

## 📜 Licencia

MIT

## 🙏 Créditos

Creado con Claude Code
Base blockchain by Coinbase
Inspirado en la arqueología digital y las historias olvidadas

---

**¿Encontraste un bug?** Abre un issue
**¿Tienes una idea?** Las pull requests son bienvenidas

*"Cada transacción fallida es una historia esperando ser contada"* 👻
