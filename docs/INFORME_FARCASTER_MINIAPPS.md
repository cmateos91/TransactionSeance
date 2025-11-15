# INFORME COMPLETO: ANÁLISIS DE DOCUMENTACIÓN OFICIAL DE FARCASTER MINI APPS

**Fecha de análisis:** 2025-11-15
**Proyecto:** Transaction Séance
**Documentación analizada:** https://miniapps.farcaster.xyz/

---

## 1. RESUMEN EJECUTIVO

Farcaster Mini Apps es una plataforma para crear aplicaciones web interactivas (HTML, CSS, JavaScript) que se ejecutan dentro de clientes Farcaster. La arquitectura descentralizada elimina OAuth tradicional usando firmas criptográficas del usuario, datos replicados en Snapchain, y delegación de claves.

**Hallazgo crítico**: El proyecto "Transaction Séance" usa tecnología **OBSOLETA** de Farcaster Frames v1. Necesita migración completa a Mini Apps con el SDK correcto y estructura de metadata actualizada.

---

## 2. SECCIONES PRINCIPALES DE LA DOCUMENTACIÓN

### 2.1 Getting Started
- **Requisitos**: Node.js 22.11.0+ (versiones anteriores NO compatibles)
- **Setup**: CLI oficial `npm create @farcaster/mini-app` o instalación manual del SDK
- **SDK correcto**: `@farcaster/miniapp-sdk` (antes llamado `@farcaster/frame-sdk`)

### 2.2 Guides (Guías)
- Loading your app (carga e inicialización)
- Sharing your app (metadata para compartir)
- Publishing your app (proceso de publicación)
- App Discovery (descubrimiento en búsqueda)
- Ethereum/Solana wallets (integración de billeteras)
- Authentication (autenticación de usuarios)
- Notifications (notificaciones push)
- Domain migration (migración de dominios)
- Universal Links y Share Extensions

### 2.3 SDK Reference
- Context (información del usuario/sesión)
- Quick Auth (autenticación simplificada)
- Actions (ready, haptics, navigation, wallet)
- Events y compatibilidad
- Changelog (actualizaciones recientes)

---

## 3. INFORMACIÓN TÉCNICA CRÍTICA

### 3.1 Manifest (/.well-known/farcaster.json)

**OBLIGATORIO** para cada Mini App. Estructura:

```json
{
  "miniapp": {
    "version": "1",
    "name": "Nombre App (max 32 caracteres)",
    "iconUrl": "https://dominio.com/icon.png",
    "homeUrl": "https://dominio.com",
    "description": "Descripción (max 170 caracteres)",
    "splashImageUrl": "https://dominio.com/splash.png",
    "splashBackgroundColor": "#1a0b2e",
    "webhookUrl": "https://dominio.com/webhook"
  },
  "accountAssociation": {
    // Firma criptográfica del dominio (generar en herramienta oficial)
  }
}
```

**Requisitos de imágenes**:
- `iconUrl`: 1024x1024px PNG
- `splashImageUrl`: Pantalla de carga mientras se inicia la app

**Ubicación**: Debe estar accesible en `https://tudominio.com/.well-known/farcaster.json`

**Opciones**:
1. Self-hosted: alojar el archivo directamente
2. Hosted manifest: usar servicio de Farcaster con redirect

### 3.2 Embed Metadata (Meta Tags para Compartir)

**DIFERENTE del manifest**. Se coloca en `<head>` de cada página compartible:

```html
<meta name="fc:miniapp" content='{"version":"1","image":"https://dominio.com/og.png","button":{"title":"Abrir App","action":{"type":"launch_miniapp","url":"https://dominio.com","name":"Nombre App","splashImageUrl":"https://dominio.com/splash.png","splashBackgroundColor":"#1a0b2e"}}}' />

<!-- Para compatibilidad con apps antiguas -->
<meta name="fc:frame" content='...' />
```

**Especificaciones de imagen**:
- Formatos: PNG (recomendado), JPG, GIF, WebP
- Aspect ratio: **3:2** (NO 1:1)
- Dimensiones: 600x400px mínimo, 3000x2000px máximo
- Tamaño: < 10MB
- URL: ≤ 1,024 caracteres

**Diferencia crítica**:
- **Manifest**: identidad de la app (1 por dominio)
- **Embed**: metadata social para compartir (1 por página compartible)

### 3.3 Inicialización del SDK

**MUY IMPORTANTE**: Sin esta llamada, los usuarios ven pantalla de carga infinita.

```javascript
import { sdk } from '@farcaster/miniapp-sdk'

// Después de que la app esté completamente cargada
await sdk.actions.ready()
```

En React con useEffect:

```javascript
useEffect(() => {
  const init = async () => {
    await sdk.actions.ready();
  };
  init();
}, []);
```

### 3.4 Context del Usuario

El SDK proporciona información del usuario sin autenticación:

```javascript
const context = sdk.context;

// Información disponible:
context.user.fid              // ID del usuario
context.user.username         // Nombre de usuario
context.user.displayName      // Nombre mostrado
context.user.pfpUrl          // Foto de perfil

context.location             // Cómo se abrió la app (cast, notification, launcher, etc.)
context.client.platformType  // "web" o "mobile"
context.client.safeAreaInsets // Márgenes de seguridad para móvil
```

### 3.5 Autenticación (Quick Auth)

**Recomendado** sobre implementación manual de Sign In with Farcaster:

```javascript
// Obtener token JWT automáticamente
const token = await sdk.quickAuth.getToken();

// O usar fetch automático con Bearer token
const response = await sdk.quickAuth.fetch('/api/endpoint');

// En el servidor: validar JWT
import { verifyJwt } from '@farcaster/quick-auth';
const { fid } = await verifyJwt(token);
```

**Optimización**: Agregar preconnect en HTML:
```html
<link rel="preconnect" href="https://auth.farcaster.xyz" />
```

### 3.6 Integración con Wallet Ethereum

```javascript
// Con Wagmi (recomendado)
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';

const config = createConfig({
  chains: [base],
  connectors: [farcasterMiniApp()]
});

// Conectar
const { connect, connectors } = useConnect();
connect({ connector: connectors[0] });

// Transacciones por lotes (EIP-5792)
const { sendCalls } = useSendCalls();
sendCalls({
  calls: [
    { to: '0x...', data: '...' },
    { to: '0x...', data: '...' }
  ]
});
```

---

## 4. COMPARACIÓN CON IMPLEMENTACIÓN ACTUAL

### 4.1 PROBLEMAS IDENTIFICADOS

| Aspecto | Implementación Actual | Documentación Oficial | Estado |
|---------|----------------------|----------------------|--------|
| **SDK** | `@farcaster/frame-sdk` | `@farcaster/miniapp-sdk` | ⚠️ Nombre antiguo (funciona pero desactualizado) |
| **Metadata** | `fc:frame` con sintaxis v1 | `fc:miniapp` con JSON stringificado | ❌ INCORRECTO |
| **Aspect Ratio** | `1:1` | `3:2` | ❌ INCORRECTO |
| **Manifest** | NO EXISTE | OBLIGATORIO en `/.well-known/farcaster.json` | ❌ FALTANTE |
| **sdk.actions.ready()** | NO IMPLEMENTADO | OBLIGATORIO | ❌ FALTANTE |
| **Estructura metadata** | Separada en múltiples meta tags | JSON stringificado en 1-2 tags | ❌ INCORRECTO |
| **Versión** | `vNext` | `"1"` (string) | ❌ INCORRECTO |
| **Button action** | `'post'` | `'launch_miniapp'` | ❌ INCORRECTO |

### 4.2 Análisis de Archivos Actuales

**package.json**:
```json
"@farcaster/frame-sdk": "^0.1.12"  // ⚠️ Usar @farcaster/miniapp-sdk
```

**app/layout.tsx** (líneas 26-34):
```tsx
other: {
  'fc:frame': 'vNext',  // ❌ Debe ser fc:miniapp con version: "1"
  'fc:frame:image': `${url}/api/og`,  // ❌ Sintaxis antigua
  'fc:frame:image:aspect_ratio': '1:1',  // ❌ Debe ser 3:2
  'fc:frame:button:1': '🕯️ Invoke Spirit',  // ❌ Sintaxis antigua
  'fc:frame:button:1:action': 'post',  // ❌ Debe ser launch_miniapp
  'fc:frame:post_url': `${url}/api/frame`,  // ❌ No aplicable a Mini Apps
}
```

**app/api/og/route.tsx** (líneas 68-69):
```tsx
width: 1200,
height: 1200,  // ❌ Aspect ratio 1:1, debe ser 3:2 (1200x800)
```

**FALTANTE**:
- Archivo `/.well-known/farcaster.json` (manifest)
- Inicialización `sdk.actions.ready()` en la app
- Implementación del SDK en el frontend
- Integración con wallet (si se requiere)

---

## 5. LISTA DE CORRECCIONES/MEJORAS NECESARIAS

### 5.1 CRÍTICAS (Bloquean funcionalidad)

1. **Crear manifest en `/.well-known/farcaster.json`**
   - Registrar dominio en https://farcaster.xyz/~/developers/mini-apps/manifest
   - Generar `accountAssociation` con firma criptográfica
   - Definir metadata completa (nombre, iconos, splash screen, etc.)

2. **Actualizar metadata en `app/layout.tsx`**
   ```tsx
   other: {
     'fc:miniapp': JSON.stringify({
       version: "1",
       image: `${url}/api/og`,
       button: {
         title: "🕯️ Invoke Spirit",
         action: {
           type: "launch_miniapp",
           url: url,
           name: "Transaction Séance",
           splashImageUrl: `${url}/splash.png`,
           splashBackgroundColor: "#1a0b2e"
         }
       }
     }),
     'fc:frame': '...'  // Mantener para compatibilidad
   }
   ```

3. **Corregir aspect ratio de OG image a 3:2**
   ```tsx
   // app/api/og/route.tsx
   width: 1200,
   height: 800,  // 3:2 ratio
   ```

4. **Implementar inicialización del SDK**
   ```tsx
   // app/page.tsx - agregar useEffect
   import { sdk } from '@farcaster/miniapp-sdk';

   useEffect(() => {
     sdk.actions.ready().catch(console.error);
   }, []);
   ```

5. **Actualizar package.json**
   ```json
   "@farcaster/miniapp-sdk": "latest"
   ```

### 5.2 IMPORTANTES (Mejoran experiencia)

6. **Crear splash screen personalizado**
   - Imagen 1200x1600px o similar
   - Color de fondo `#1a0b2e` (ya usado en el diseño)

7. **Crear app icon 1024x1024px**
   - Para el manifest y listado en tienda

8. **Configurar safe area insets para móvil**
   ```tsx
   const { client } = sdk.context;
   <div style={{
     marginTop: client.safeAreaInsets.top,
     marginBottom: client.safeAreaInsets.bottom,
   }}>
   ```

9. **Agregar detección de Mini App context**
   ```tsx
   if (sdk.context.location.type === 'cast_embed') {
     // Mostrado desde un cast
   }
   ```

### 5.3 OPCIONALES (Funcionalidades adicionales)

10. **Implementar Quick Auth para autenticación**
11. **Agregar integración con wallet Ethereum**
12. **Configurar webhooks para notificaciones**
13. **Implementar share extension**
14. **Agregar soporte para Universal Links**

---

## 6. PROCESO DE TESTING Y PUBLICACIÓN

### 6.1 Testing Local

**Requisitos**:
- Node.js 22.11.0+
- Servidor HTTPS (usar cloudflared para túnel)

**Pasos**:
1. Activar Developer Mode en Farcaster:
   - https://farcaster.xyz/~/settings/developer-tools
   - Activar "Developer Mode"

2. Exponer servidor local:
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```

3. Abrir URL del túnel en navegador PRIMERO (medida de seguridad)

4. Usar Mini App Preview Tool:
   - Acceder desde panel de desarrollador
   - Ingresar URL del túnel
   - Click en "Preview"

5. Usar Mini App Embed Tool para probar compartir:
   - Verificar que aparezca la imagen correcta
   - Verificar que el botón funcione

### 6.2 Debugging

**Herramientas oficiales**:
- **Mini App Preview Tool**: previsualización en tiempo real
- **Mini App Embed Tool**: validación de metadata social
- **Mini App Manifest Tool**: validación de manifest y generación de firma

**Problemas comunes**:
- **Pantalla de carga infinita**: No se llamó `sdk.actions.ready()`
- **No aparece en búsqueda**: Manifest incompleto, dominio no válido (ngrok/replit), imágenes sin headers correctos
- **Embed no se ve**: Aspect ratio incorrecto, imagen > 10MB, URL muy larga

### 6.3 Validación Pre-publicación

**Checklist**:
- [ ] Manifest accesible en `/.well-known/farcaster.json`
- [ ] Manifest tiene todos los campos requeridos
- [ ] `accountAssociation` firmado correctamente
- [ ] Dominio de producción (NO túnel)
- [ ] Metadata `fc:miniapp` correcta en todas las páginas compartibles
- [ ] Imágenes con aspect ratio 3:2
- [ ] Imágenes < 10MB y URLs < 1024 caracteres
- [ ] `sdk.actions.ready()` se llama después de cargar
- [ ] App funciona correctamente en preview tool
- [ ] Embed se ve correctamente en embed tool

### 6.4 Publicación

**Proceso**:
1. Desplegar a dominio de producción
2. Verificar manifest accesible públicamente
3. Registrar en https://farcaster.xyz/~/developers/mini-apps/manifest
   - Completar formulario con información del creador
   - Generar firma de dominio con la herramienta
   - Agregar `accountAssociation` al manifest
4. Verificar checkbox verde en la herramienta (confirmación de registro)
5. Esperar indexación diaria (puede tardar 24-48 horas)

**Requisitos para aparecer en búsqueda**:
- Registro completo con `accountAssociation` válido
- Dominio de producción (NO ngrok, replit.dev, localtunnel, etc.)
- Imágenes accesibles con headers HTTP correctos (`Content-Type: image/png`)
- Uso mínimo de la aplicación (aperturas, adiciones)
- Actividad reciente de usuarios
- `noindex: true` NO presente en manifest

### 6.5 Optimización de Descubrimiento

**Factores de ranking**:
- Número de aperturas de la app
- Usuarios que agregan la app a sus colecciones
- Engagement regular de usuarios
- Metadata precisa y completa
- Calidad de imágenes y descripción

**Mejores prácticas**:
- Descripción clara y concisa (max 170 caracteres)
- Categoría apropiada en manifest
- Tags relevantes
- Icono y splash screen de alta calidad
- Actualizar manifest con información precisa

---

## 7. CAMBIOS RECIENTES EN ESPECIFICACIONES (2025)

### Julio 2025
- **EIP-5792 Batch Transactions**: Soporte para agrupar múltiples transacciones en una confirmación

### Junio 2025
- **Quick Auth salió de beta** (v0.0.61): Gestión automática de tokens
- **Cast Share Extension** (v0.0.59): Recibir casts compartidos
- **Navegación y Haptics** (v0.0.56): APIs para control de navegación y retroalimentación táctil

### Cambios arquitectónicos importantes:
- Transición de "Frames" a "Mini Apps" en terminología
- Manifest obligatorio para todas las apps
- Deprecación gradual de sintaxis `fc:frame` antigua
- Hosted manifest service para facilitar actualizaciones

---

## 8. RECOMENDACIONES ESPECÍFICAS

### 8.1 Plan de Migración Sugerido

**Fase 1: Correcciones Críticas (1-2 días)**
1. Actualizar SDK a `@farcaster/miniapp-sdk`
2. Crear manifest en `/.well-known/farcaster.json`
3. Actualizar metadata a formato `fc:miniapp`
4. Corregir aspect ratio a 3:2
5. Implementar `sdk.actions.ready()`

**Fase 2: Assets (1 día)**
6. Crear splash screen 1200x1600px
7. Crear app icon 1024x1024px
8. Generar OG image 1200x800px (3:2)

**Fase 3: Testing (1-2 días)**
9. Configurar túnel con cloudflared
10. Probar en Preview Tool
11. Validar embed en Embed Tool
12. Verificar en dispositivos móviles

**Fase 4: Publicación (1 día)**
13. Desplegar a producción
14. Registrar manifest con firma
15. Verificar accesibilidad pública

**Fase 5: Mejoras (Opcional)**
16. Implementar Quick Auth
17. Integrar wallet Ethereum
18. Configurar notificaciones

### 8.2 Configuración Recomendada para Next.js

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: '/api/manifest'
      }
    ];
  }
};
```

```typescript
// app/api/manifest/route.ts
export async function GET() {
  const manifest = {
    miniapp: {
      version: "1",
      name: "Transaction Séance",
      iconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/icon.png`,
      homeUrl: process.env.NEXT_PUBLIC_BASE_URL,
      description: "Invoke the spirits of forgotten transactions on Base",
      splashImageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/splash.png`,
      splashBackgroundColor: "#1a0b2e",
    },
    accountAssociation: {
      // Generar con herramienta oficial
    }
  };

  return Response.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
```

### 8.3 Recursos Oficiales

**Documentación**:
- Principal: https://miniapps.farcaster.xyz/
- Para LLMs: https://miniapps.farcaster.xyz/llms-full.txt
- GitHub: https://github.com/farcasterxyz/miniapps
- Ejemplos: https://github.com/farcasterxyz/miniapps/tree/main/examples

**Herramientas**:
- Developer Tools: https://farcaster.xyz/~/settings/developer-tools
- Manifest Tool: https://farcaster.xyz/~/developers/mini-apps/manifest
- Rewards Program: https://farcaster.xyz/~/developers/rewards

**Paquetes NPM**:
- SDK: `@farcaster/miniapp-sdk`
- Wagmi Connector: `@farcaster/miniapp-wagmi-connector`
- Quick Auth: `@farcaster/quick-auth`
- Node Utilities: `@farcaster/miniapp-node`

---

## 9. CONCLUSIÓN

El proyecto "Transaction Séance" necesita una **migración completa** de Farcaster Frames v1 a Mini Apps. Los principales problemas son:

1. **Metadata obsoleta**: usando sintaxis `fc:frame` antigua
2. **Falta de manifest**: archivo obligatorio no existe
3. **Aspect ratio incorrecto**: 1:1 en vez de 3:2
4. **SDK no inicializado**: falta llamada a `sdk.actions.ready()`
5. **Estructura incorrecta**: metadata separada en vez de JSON stringificado

La buena noticia es que la aplicación tiene una base sólida y la migración es principalmente actualizar configuración y metadata, sin cambios mayores en la lógica de negocio.

**Prioridad inmediata**: Implementar las correcciones críticas de la Sección 5.1 antes de intentar publicar o compartir la aplicación, ya que actualmente no funcionará correctamente como Mini App en Farcaster.

---

**Generado:** 2025-11-15
**Versión del informe:** 1.0
**Próxima revisión:** Después de implementar correcciones críticas
