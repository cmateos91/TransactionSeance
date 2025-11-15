# 🚀 Guía de Deployment - Transaction Séance

## Prerequisitos

- [ ] Cuenta en Vercel
- [ ] Repositorio en GitHub
- [ ] Farcaster account
- [ ] Dominio personalizado (opcional pero recomendado)

## 1. Deploy en Vercel

### Opción A: Desde GitHub

1. **Subir código a GitHub:**
```bash
git init
git add .
git commit -m "feat: initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/transaction-seance.git
git push -u origin main
```

2. **Importar en Vercel:**
   - Ve a https://vercel.com
   - Click "Add New Project"
   - Selecciona tu repositorio
   - Framework: Next.js (auto-detectado)
   - Click "Deploy"

### Opción B: Usando Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 2. Configurar Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

### Variables Requeridas

```bash
# API Configuration
NEXT_PUBLIC_ETHERSCAN_API_KEY=tu_api_key_aqui

# Blockchain Configuration
NEXT_PUBLIC_BASE_CHAIN_ID=8453
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org

# Wallet & Fee Configuration
NEXT_PUBLIC_TREASURY_ADDRESS=0xe93f5c92319959b75E4e564E185c7Ab1893bb07D
NEXT_PUBLIC_INVOCATION_FEE=0.0001

# Application URL (actualizar después del primer deploy)
NEXT_PUBLIC_BASE_URL=https://transaction-seance.vercel.app
```

### Importante:
- Marca todas como **Production, Preview, Development**
- Después del primer deploy, actualiza `NEXT_PUBLIC_BASE_URL` con tu URL real
- Haz un **Redeploy** después de actualizar variables

## 3. Configurar Dominio Personalizado (Opcional)

1. Ve a Vercel Dashboard → Settings → Domains
2. Añade tu dominio personalizado
3. Configura DNS según instrucciones de Vercel
4. Actualiza `NEXT_PUBLIC_BASE_URL` con tu dominio

## 4. Registrar como Farcaster Mini App

### A. Crear Manifest

El manifest se genera automáticamente en `/.well-known/farcaster.json`

Verifica que esté accesible en:
```
https://tu-app.vercel.app/.well-known/farcaster.json
```

### B. Firmar el Manifest (Requerido para producción)

Para que Farcaster muestre tu Mini App, necesitas:

1. **Generar manifest signature:**
```bash
# Instalar herramienta de firma
npm install -g @farcaster/frame

# Firmar manifest
frame sign https://tu-app.vercel.app/.well-known/farcaster.json
```

2. **Actualizar metadata con signature:**
   - Añade el campo `signature` al manifest
   - Redeploy

### C. Registrar en Warpcast

1. Ve a https://warpcast.com/~/developers/miniapps
2. Click "Register Mini App"
3. Introduce tu URL: `https://tu-app.vercel.app`
4. Verifica que el manifest esté firmado
5. Submit para revisión

## 5. Verificación Post-Deploy

### Checklist de Funcionamiento

- [ ] App carga correctamente en producción
- [ ] Variables de entorno están configuradas
- [ ] Wallet connection funciona
- [ ] Transacciones se procesan correctamente
- [ ] Fantasmas se generan sin errores
- [ ] Manifest es accesible
- [ ] Internacionalización funciona (ES/EN)
- [ ] Responsive en móvil y desktop

### Testing en Farcaster

1. **Usando Farcaster Debugger:**
   - Ve a https://warpcast.com/~/developers/frames
   - Introduce tu URL
   - Verifica que carga correctamente

2. **En Warpcast Mobile:**
   - Comparte tu URL en un cast
   - Abre desde la app móvil
   - Verifica funcionalidad completa

## 6. Monitoreo y Mantenimiento

### Analytics

Vercel proporciona analytics automáticos:
- Visitas
- Errores
- Performance

### Logs

Ver logs en tiempo real:
```bash
vercel logs tu-proyecto-url
```

O en Vercel Dashboard → Deployments → Logs

### Actualizaciones

Para actualizar:
```bash
# Hacer cambios en código
git add .
git commit -m "feat: nueva funcionalidad"
git push

# Vercel auto-deployará
```

## 7. Seguridad en Producción

### ⚠️ Importante

- [ ] Revisar que no hay API keys expuestas en el código cliente
- [ ] Verificar que `.env.local` NO está en git (revisar `.gitignore`)
- [ ] Confirmar que treasury address es la correcta
- [ ] Probar fee con una transacción real pequeña primero
- [ ] Rate limiting configurado si es necesario
- [ ] CORS configurado correctamente

### Variables Sensibles

Las variables `NEXT_PUBLIC_*` son **visibles en el cliente**. Esto está bien para:
- API keys de solo lectura (Etherscan)
- Configuraciones públicas
- Treasury address (es pública en blockchain)

## 8. Troubleshooting

### Error: "Manifest not found"
- Verifica que `/.well-known/farcaster.json` es accesible
- Revisa Next.js routing para archivos estáticos

### Error: "Environment variables not loaded"
- Redeploy después de cambiar variables
- Verifica que están marcadas para Production

### Error: "Wallet not connecting"
- Verifica que estás usando HTTPS en producción
- Confirma configuración de Wagmi
- Revisa que `NEXT_PUBLIC_BASE_URL` es correcto

### Transactions fallan
- Verifica treasury address con checksum correcto
- Confirma que estás en la red correcta (Base mainnet)
- Revisa que el fee es razonable

## 9. Optimizaciones Post-Launch

### Performance
- Habilitar Vercel Edge Functions si es necesario
- Configurar caché para assets estáticos
- Optimizar imágenes

### SEO
- Añadir meta tags apropiados
- Configurar sitemap si es necesario
- Open Graph images optimizadas

### Monitoreo
- Configurar alertas en Vercel
- Implementar error tracking (Sentry)
- Analytics de uso

## 10. Recursos Útiles

- [Vercel Documentation](https://vercel.com/docs)
- [Farcaster Mini Apps Docs](https://docs.farcaster.xyz/developers/frames/v2)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Wagmi Documentation](https://wagmi.sh)

## Soporte

Si encuentras problemas:
1. Revisa logs en Vercel
2. Verifica variables de entorno
3. Prueba en local primero
4. Revisa documentación de Farcaster

---

**🎉 ¡Listo!** Tu Mini App debería estar funcionando en producción.
