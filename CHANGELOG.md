# Changelog - Transaction Séance

## v1.1 - Internacionalización y Optimización Móvil (2025-11-15)

### ✨ Nuevas Características

#### 🌐 Sistema de Internacionalización (i18n)
- **Soporte completo para Español e Inglés**
  - Detección automática del idioma del navegador
  - Persistencia de preferencia en localStorage
  - Cambio dinámico sin recargar la página

- **Traducciones implementadas**:
  - Interfaz completa de usuario
  - Historias de fantasmas (templates únicos por idioma)
  - Nombres de fantasmas
  - Tipos y rarezas
  - Atributos y datos técnicos

#### 🎨 Selector de Idioma Temático
- Diseño místico acorde con la temática del juego
- Animaciones suaves y efectos visuales
- Tooltip informativo
- Partículas flotantes en hover
- Totalmente responsive

### 📱 Optimizaciones para Móvil

#### Diseño Responsive
- **Breakpoints optimizados**: sm, md, lg
- **Touch targets**: Mínimo 44x44px para todos los botones
- **Tipografía responsive**: Escalado automático según tamaño de pantalla
- **Espaciado adaptativo**: Padding y márgenes ajustados para móvil

#### UX Móvil
- `touch-manipulation` para mejor respuesta táctil
- Desactivación del highlight de tap en webkit
- Botones apilados verticalmente en móvil
- Texto con break-words para evitar overflow
- Safe area para iPhones con notch

#### Performance
- Reducción de animaciones en `prefers-reduced-motion`
- Smooth scrolling solo cuando es apropiado
- Optimización de renders
- Lazy loading de componentes

### 🛠️ Mejoras Técnicas

#### Arquitectura i18n
```
lib/i18n/
├── locales/
│   ├── es.ts (Español)
│   └── en.ts (English)
└── context/
    └── LanguageContext.tsx (React Context)
```

#### Componentes Actualizados
- ✅ `app/page.tsx` - Página principal con traducciones
- ✅ `components/ghost/GhostCard.tsx` - Tarjeta responsive
- ✅ `components/ui/LanguageToggle.tsx` - Selector nuevo
- ✅ `lib/generators/ghost-generator.ts` - Soporte multiidioma
- ✅ `app/api/ghost/route.ts` - Query param para idioma
- ✅ `app/layout.tsx` - Provider y meta tags móvil

#### Meta Tags para Móvil
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
<meta name="theme-color" content="#1a0b2e" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

### 🎯 Características Específicas del Selector de Idioma

- **Posición**: Fixed top-right, z-index alto
- **Estados**:
  - Default: Gradiente purple → pink
  - Hover: Scale 1.05 + blur effect
  - Active: Scale 0.95
- **Indicadores visuales**:
  - Emoji 🌐
  - Código de idioma (ES/EN)
  - Línea de gradiente inferior
  - Tooltip con nombre completo del idioma

### 📊 Clases CSS Nuevas

```css
.touch-manipulation      // Touch optimizado
.pb-safe                // Safe area padding
.animation-delay-150    // Delay para animaciones
```

### 🔄 Flujo de Cambio de Idioma

1. Usuario hace click en `LanguageToggle`
2. Contexto actualiza el estado `language`
3. LocalStorage guarda la preferencia
4. Próximo `invokeGhost` usa el nuevo idioma
5. API genera fantasma con traducciones correctas
6. UI se actualiza reactivamente

### 🌍 Ejemplos de Traducciones

#### Español
```
"El Olvidado del Bloque 12345"
"Hace 120 días, intenté un último movimiento..."
Rareza: ÉPICO
```

#### English
```
"The Forgotten of Block 12345"
"120 days ago, I tried one last move..."
Rarity: EPIC
```

### 🚀 Cómo Usar

#### Cambiar idioma manualmente
```typescript
import { useLanguage } from '@/lib/i18n/context/LanguageContext';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <button onClick={() => setLanguage('en')}>
      {t.page.title}
    </button>
  );
}
```

#### Agregar nueva traducción
1. Edita `lib/i18n/locales/es.ts`
2. Agrega la clave con su valor
3. Copia la misma estructura en `en.ts`
4. TypeScript asegura consistencia

### 📝 Notas de Desarrollo

- Todas las traducciones son type-safe gracias a TypeScript
- El tipo `Translations` garantiza que ambos idiomas tengan las mismas claves
- Los templates de historias son específicos por idioma para mejor narrativa
- El generador de fantasmas ahora acepta parámetro `lang`

### 🐛 Correcciones

- Fixed: Layout shifts en mobile
- Fixed: Botones muy pequeños en touch
- Fixed: Texto cortado en nombres largos
- Fixed: Overflow en pantallas pequeñas

---

## v1.0 - Lanzamiento Inicial (2025-11-15)

### ✨ Características Iniciales
- Sistema de invocación de fantasmas
- 6 tipos de fantasmas diferentes
- 4 niveles de rareza
- 5 patrones visuales SVG
- Generación de historias basadas en datos reales
- Sistema de atributos (Tristeza, Poder, Edad, Valor)
- Compartir historias en redes sociales
- Datos mock para desarrollo

### 🎨 Diseño
- Dark mode por defecto
- Gradientes purple → pink
- Animaciones float para fantasmas
- Cards con bordes de rareza

### 🛠️ Stack Técnico
- Next.js 16 + React
- TypeScript
- Tailwind CSS
- Base L2 (Ethereum)
- Viem para formateo
- Basescan API (pendiente integración)
