# 🔑 Configuración de Etherscan API V2

## ⚠️ **MIGRACIÓN IMPORTANTE**

**Basescan APIs fueron deprecados** y migrados a **Etherscan API V2**.

| Aspecto | Basescan (Viejo) | Etherscan V2 (Nuevo) |
|---------|------------------|----------------------|
| Estado | ❌ Deprecado | ✅ Activo |
| API Keys | Una por chain | **Una para todas** |
| Chains soportadas | Solo Base | **60+ chains** |
| Endpoint | basescan.org/api | etherscan.io/v2/api |
| Deadline | Mayo 31, 2025 | N/A |

---

## 🚀 **Obtener API Key (2 minutos)**

### **Paso 1: Registrarse en Etherscan**

1. Ve a **https://etherscan.io**
2. Click en **"Sign In"** → **"Click to sign up"**
3. Completa el registro:
   - Username
   - Email
   - Password
4. **Verifica tu email**

### **Paso 2: Generar API Key**

1. Inicia sesión
2. Click en tu **perfil** → **"API Keys"**
3. Click en **"+ Add"**
4. Nombre sugerido: `Transaction Séance - Base`
5. Click en **"Create New API Key"**
6. **Copia la key generada**

Ejemplo de key:
```
ABC123DEF456GHI789JKL012MNO345PQR678
```

---

## 🛠️ **Configurar en el Proyecto**

### **Opción Recomendada: Variables de Entorno**

1. Abre el archivo **`.env.local`** en la raíz del proyecto

2. Pega tu API key:
```env
NEXT_PUBLIC_ETHERSCAN_API_KEY=ABC123DEF456GHI789JKL012MNO345PQR678
```

3. Guarda el archivo

4. **Reinicia el servidor**:
```bash
# Ctrl+C para detener
npm run dev
```

---

## ✨ **Ventajas de Etherscan API V2**

### **🌍 Multichain con una sola key**

```javascript
// Base (Chain ID: 8453)
https://api.etherscan.io/v2/api?chainid=8453&...

// Ethereum (Chain ID: 1)
https://api.etherscan.io/v2/api?chainid=1&...

// Arbitrum (Chain ID: 42161)
https://api.etherscan.io/v2/api?chainid=42161&...

// Optimism (Chain ID: 10)
https://api.etherscan.io/v2/api?chainid=10&...
```

**Una sola API key funciona para TODAS** 🎉

### **📊 Límites (Plan Gratuito)**

- ✅ **100,000 requests/día**
- ✅ **5 requests/segundo**
- ✅ **60+ chains incluidas**

---

## ✅ **Verificar que Funciona**

### **Test 1: Revisar Consola**

1. Abre DevTools (F12) → Console
2. Invoca un fantasma
3. No deberías ver errores de API

### **Test 2: Datos Reales**

Si funciona correctamente:
- ✅ Verás transacciones **reales** de Base
- ✅ Hashes verificables en https://basescan.org
- ✅ Timestamps y valores reales

---

## 🔧 **Troubleshooting**

### **Error: "Invalid API Key"**

```bash
# Verifica:
1. Key copiada completa (sin espacios)
2. Nombre correcto: NEXT_PUBLIC_ETHERSCAN_API_KEY
3. Archivo: .env.local (en la raíz)
4. Reiniciaste el servidor
```

### **Error: "chainid parameter required"**

```
Solución: La API V2 requiere el chainid
Ya está configurado: 8453 para Base
```

### **Sigue usando datos mock**

```bash
# Verifica la variable
echo $NEXT_PUBLIC_ETHERSCAN_API_KEY

# Limpia y reinicia
rm -rf .next
npm run dev
```

---

## 📚 **Recursos Adicionales**

- **Docs oficiales**: https://docs.etherscan.io/v2-migration
- **Quickstart**: https://docs.etherscan.io/etherscan-v2/v2-quickstart
- **Rate limits**: https://docs.etherscan.io/support/rate-limits

---

## 🎯 **Siguientes Pasos**

Con la API configurada puedes:

1. ✅ Obtener fantasmas **reales** de Base
2. 🔍 Ver transacciones verificables en Basescan
3. 📈 Acceder a estadísticas reales
4. 🌐 Expandir a otras chains (Ethereum, Arbitrum, etc.)

---

**¡Listo para invocar fantasmas reales!** 👻⛓️✨
