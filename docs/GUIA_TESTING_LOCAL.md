# 🧪 GUÍA DE TESTING LOCAL - TRANSACTION SÉANCE

**Fecha:** 2025-11-15
**Estado:** ✅ Todos los endpoints verificados y funcionando

---

## ✅ VERIFICACIÓN DE ENDPOINTS COMPLETADA

Todos los endpoints están funcionando correctamente:

### 1. Manifest ✅
```bash
curl https://a73fb404c583.ngrok-free.app/.well-known/farcaster.json
```
**Resultado:** JSON válido con estructura correcta de Mini App

### 2. OG Image ✅
```bash
curl -I https://a73fb404c583.ngrok-free.app/api/og
```
**Resultado:** HTTP 200 - Imagen 1200x800 (3:2)

### 3. Splash Screen ✅
```bash
curl -I https://a73fb404c583.ngrok-free.app/api/splash
```
**Resultado:** HTTP 200 - Imagen 1200x1600

### 4. App Icon ✅
```bash
curl -I https://a73fb404c583.ngrok-free.app/api/icon
```
**Resultado:** HTTP 200 - Imagen 1024x1024

### 5. Metadata fc:miniapp ✅
**Verificado en HTML:** Metadata correcta con JSON stringificado

---

## 📱 PASOS PARA PROBAR EN FARCASTER

### Paso 1: Activar Developer Mode

1. **Abre Farcaster** (app móvil o web)
   - iOS/Android: App "Farcaster"
   - Web: https://warpcast.com

2. **Ve a Settings → Developer Tools**
   - URL directa: https://farcaster.xyz/~/settings/developer-tools

3. **Activa "Developer Mode"**
   - Toggle ON el switch de Developer Mode
   - Esto te dará acceso a herramientas de testing

### Paso 2: Usar Mini App Preview Tool

**Opción A: Desde la App Móvil**
1. En Developer Tools, busca "Mini App Preview"
2. Pega la URL: `https://a73fb404c583.ngrok-free.app`
3. Tap en "Preview"

**Opción B: Desde Web**
1. Ve a: https://farcaster.xyz/~/developers/mini-apps
2. Busca "Preview Tool" o "Test Mini App"
3. Ingresa la URL: `https://a73fb404c583.ngrok-free.app`
4. Click en "Preview"

### Paso 3: Verificar que Funciona

**Lo que DEBERÍAS ver:**

1. ✅ **Splash Screen** (👻⛓️ con fondo morado oscuro)
2. ✅ **App se carga** sin pantalla infinita
3. ✅ **Botón "Invoke Spirit"** funcional
4. ✅ **Console log:** "Farcaster Mini App SDK initialized"

**Lo que NO deberías ver:**

- ❌ Pantalla de carga infinita
- ❌ Error de manifest
- ❌ Error de imagen
- ❌ Botón que no hace nada

### Paso 4: Probar el Embed Tool

Para verificar cómo se verá cuando compartas la app:

1. **Ve a Farcaster Embed Tool**
   - Busca en Developer Tools → "Embed Tool"
   - O prueba compartir la URL en un draft

2. **Pega la URL:**
   ```
   https://a73fb404c583.ngrok-free.app
   ```

3. **Verifica que aparezca:**
   - ✅ Imagen de preview (👻⛓️ Transaction Séance)
   - ✅ Título: "Transaction Séance"
   - ✅ Descripción: "Invoke the spirits..."
   - ✅ Botón: "🕯️ Invoke Spirit"

---

## 🐛 TROUBLESHOOTING

### Problema 1: Pantalla de carga infinita

**Causa:** `sdk.actions.ready()` no se llamó
**Solución:** ✅ Ya implementado en app/page.tsx:21

**Verificar:**
```bash
# Buscar en el código
grep -n "sdk.actions.ready" app/page.tsx
```

### Problema 2: No aparece en preview

**Posibles causas:**
1. ngrok bloqueado por firewall
2. Metadata incorrecta
3. URL no accesible

**Verificar:**
```bash
# 1. Verificar que ngrok está corriendo
curl https://a73fb404c583.ngrok-free.app

# 2. Verificar metadata
curl -s https://a73fb404c583.ngrok-free.app | grep fc:miniapp

# 3. Verificar manifest
curl https://a73fb404c583.ngrok-free.app/.well-known/farcaster.json
```

### Problema 3: Imagen no se ve

**Verificar aspect ratio:**
```bash
# Debe ser 3:2
grep "height:" app/api/og/route.tsx
# Debería mostrar: height: 800
```

### Problema 4: Error "ngrok warning"

**Causa:** Primera vez que accedes a URL de ngrok
**Solución:** Abre la URL en navegador PRIMERO, acepta el warning, LUEGO prueba en Farcaster

---

## 🔍 VERIFICACIONES ADICIONALES

### Verificar Console del Navegador

Si abres https://a73fb404c583.ngrok-free.app en Chrome/Firefox:

1. **Abre DevTools** (F12)
2. **Ve a Console**
3. **Deberías ver:**
   ```
   Farcaster Mini App SDK initialized
   ```

### Verificar Network Tab

En DevTools → Network:

1. **Busca:** requests a `/api/og`, `/api/splash`, `/api/icon`
2. **Verifica:** Status 200 para todos
3. **Verifica:** Content-Type: image/png

### Verificar Headers

En DevTools → Network → Selecciona la página principal:

1. **Response Headers** debe incluir:
   ```
   fc:miniapp: {...}
   fc:frame: vNext
   ```

---

## 📊 CHECKLIST DE TESTING

Antes de probar en Farcaster, verifica:

- [x] Servidor Next.js corriendo (localhost:3000)
- [x] ngrok exponiendo el servidor
- [x] Endpoint `/.well-known/farcaster.json` responde
- [x] Endpoint `/api/og` responde con imagen 3:2
- [x] Endpoint `/api/splash` responde con imagen
- [x] Endpoint `/api/icon` responde con imagen
- [x] Metadata `fc:miniapp` presente en HTML
- [x] `sdk.actions.ready()` llamado en código
- [ ] Developer Mode activado en Farcaster
- [ ] URL abierta en navegador (para aceptar warning de ngrok)
- [ ] Probado en Mini App Preview Tool
- [ ] Probado en Embed Tool

---

## 🎯 PRÓXIMOS PASOS DESPUÉS DE TESTING

### Si todo funciona ✅

1. **Tomar screenshots** de la app funcionando
2. **Documentar** cualquier bug o mejora
3. **Preparar** para despliegue a producción:
   - Elegir dominio (ej: transaction-seance.vercel.app)
   - Generar accountAssociation
   - Desplegar
   - Registrar en Farcaster

### Si hay problemas ❌

1. **Revisar console logs** en navegador
2. **Verificar network tab** para ver requests fallidos
3. **Comprobar** que ngrok no esté bloqueado
4. **Intentar** con otra URL de túnel (reiniciar ngrok)

---

## 📞 RECURSOS ÚTILES

- **Mini App Preview:** Dentro de Developer Tools en Farcaster
- **Embed Tool:** Dentro de Developer Tools en Farcaster
- **Developer Settings:** https://farcaster.xyz/~/settings/developer-tools
- **Documentación:** https://miniapps.farcaster.xyz/
- **Manifest Tool:** https://farcaster.xyz/~/developers/mini-apps/manifest

---

## 🔗 TU URL DE TESTING

**URL actual de ngrok:**
```
https://a73fb404c583.ngrok-free.app
```

**IMPORTANTE:**
- Esta URL cambiará si reinicias ngrok
- Debes abrir la URL en navegador primero (para aceptar warning)
- Para producción, usa un dominio permanente

**Para obtener nueva URL si ngrok se reinicia:**
```bash
# Ver logs de ngrok
# Busca línea: "started tunnel" obj=tunnels ... url=https://...
```

---

**Generado:** 2025-11-15
**Estado:** ✅ Listo para testing
**Próxima acción:** Activar Developer Mode y probar en Preview Tool
