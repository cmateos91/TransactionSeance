# 🔑 Configuración de API Key de Basescan

Esta guía te ayudará a obtener y configurar tu API key de Basescan para obtener datos **reales** de transacciones fallidas en Base.

---

## 📋 **¿Por qué necesitas una API key?**

Actualmente, la app usa **datos mock** (ficticios) para demostración. Con una API key real de Basescan podrás:

✅ Invocar **transacciones fallidas reales** de Base
✅ Historias basadas en **datos blockchain verificables**
✅ Mayor variedad de fantasmas
✅ Experiencia completa del juego

**La API key es 100% GRATIS** y toma menos de 2 minutos obtenerla.

---

## 🚀 **Paso a Paso: Obtener API Key**

### **1️⃣ Registrarse en Basescan**

1. Ve a **https://basescan.org**
2. Click en **"Sign In"** (esquina superior derecha)
3. Click en **"Click to sign up"**
4. Completa el formulario:
   ```
   Username: [tu_nombre_usuario]
   Email: [tu_email]
   Password: [tu_contraseña]
   ```
5. **Verifica tu email** (revisa spam si no llega)

### **2️⃣ Generar API Key**

1. Inicia sesión en Basescan
2. Click en tu **username** (top-right) → **"API Keys"**
3. Click en el botón **"+ Add"**
4. Dale un nombre descriptivo:
   ```
   App Name: Transaction Séance Development
   ```
5. Click en **"Create New API Key"**
6. **¡COPIA LA KEY!** Se verá algo así:
   ```
   ABC123DEF456GHI789JKL012MNO345PQR678
   ```

### **3️⃣ Configurar en el Proyecto**

#### **Opción A: Variables de Entorno (Recomendada)** ✅

1. En la raíz del proyecto, abre el archivo **`.env.local`**
   ```bash
   # Si no existe, créalo
   touch .env.local
   ```

2. Pega tu API key:
   ```env
   NEXT_PUBLIC_BASESCAN_API_KEY=ABC123DEF456GHI789JKL012MNO345PQR678
   ```

3. Guarda el archivo

4. **Reinicia el servidor**:
   ```bash
   # Detén el servidor (Ctrl+C)
   # Vuelve a iniciarlo
   npm run dev
   ```

#### **Opción B: Hardcodeada (Solo para Testing)** ⚠️

**NO recomendado si vas a subir el código a GitHub**

1. Edita `lib/constants/config.ts`
2. Reemplaza directamente:
   ```typescript
   BASESCAN_API_KEY: 'ABC123DEF456GHI789JKL012MNO345PQR678',
   ```

---

## ✅ **Verificar que Funciona**

### **Prueba 1: Revisar la Consola**

1. Abre el proyecto en el navegador
2. Abre DevTools (F12) → pestaña **Console**
3. Invoca un fantasma
4. **NO deberías ver** errores de API

### **Prueba 2: Datos Reales**

Si todo está bien configurado, ahora verás:

- ✅ Transacciones fallidas **reales** de Base
- ✅ Hashes de transacción **verificables** en Basescan
- ✅ Timestamps y valores **reales**

Para verificar un fantasma:
1. Copia el hash de la transacción
2. Ve a: `https://basescan.org/tx/[hash]`
3. Deberías ver la transacción real

---

## 🔒 **Seguridad**

### **¿Es segura mi API key?**

✅ **Sí, es segura** porque:
- Es una API key de **solo lectura** (no puede hacer transacciones)
- Solo lee datos públicos de la blockchain
- Basescan permite ~5 llamadas por segundo gratis

### **¿Debo ocultarla?**

**En frontend (navegador):** No es crítico, pero es buena práctica
**En backend:** Siempre usa variables de entorno

El archivo `.env.local` está en `.gitignore`, así que **NO se subirá a GitHub**.

---

## 🐛 **Troubleshooting**

### **Error: "Invalid API Key"**

```
Solution:
1. Verifica que copiaste la key completa
2. Sin espacios al inicio/final
3. Formato: NEXT_PUBLIC_BASESCAN_API_KEY=tu_key_aqui
```

### **Error: "Rate limit exceeded"**

```
Causa: Más de 5 requests por segundo
Solution: Espera 1 segundo entre invocaciones
```

### **Sigue usando datos mock**

```bash
# Verifica que la variable está cargada
echo $NEXT_PUBLIC_BASESCAN_API_KEY

# Reinicia el servidor
npm run dev

# Si no funciona, revisa:
# 1. El nombre de la variable (debe ser EXACTO)
# 2. El archivo se llama .env.local (no .env)
# 3. Está en la raíz del proyecto
```

---

## 📊 **Límites de la API Gratis**

| Plan | Requests/segundo | Requests/día |
|------|------------------|--------------|
| Free | 5 req/s | 100,000 |

Para Transaction Séance esto es **MÁS que suficiente**.

---

## 🎯 **Próximos Pasos**

Una vez configurada la API key:

1. ✅ Los fantasmas serán **100% reales**
2. 🔄 Puedes implementar búsqueda por dirección específica
3. 📈 Agregar estadísticas de la blockchain
4. 🔍 Filtrar por tipo de error específico

---

## 📞 **¿Necesitas Ayuda?**

- **Documentación oficial**: https://docs.basescan.org/
- **Ejemplos de API**: https://basescan.org/apis
- **Rate limits**: https://docs.basescan.org/support/rate-limits

---

**¡Listo! Ahora tendrás fantasmas reales de la blockchain de Base** 👻⛓️
