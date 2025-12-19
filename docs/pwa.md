# Configuração PWA (Progressive Web App) 📱

Este documento detalha as configurações necessárias para transformar o site React em um PWA instalável com suporte a notificações.

## 1. Vite PWA Plugin
Utilizamos o `vite-plugin-pwa`. Configure no `vite.config.ts`:

```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'USD Alert',
        short_name: 'USD Alert',
        description: 'Monitoramento de Dólar em Tempo Real',
        theme_color: '#10b981', // Ex: Emerald-500 do Tailwind
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      // Importante para não conflitar com Firebase Messaging SW
      devOptions: {
        enabled: true,
      }
    })
  ]
})
```

## 2. Service Workers: Evitando Conflitos

Temos dois Service Workers no projeto:
1. **Workbox SW (Gerado pelo Vite)**: Cuida do cache de arquivos (offline capability). O arquivo geralmente chama-se `sw.js` no build final.
2. **Firebase Messaging SW**: Cuida exclusivamente dos push notifications em background. **Obrigatório** nomear como `firebase-messaging-sw.js` na pasta `public/` para o Firebase SDK encontrar automaticamente.

**Estratégia:**
- Deixe o Vite PWA gerar o SW principal.
- Crie manualmente `public/firebase-messaging-sw.js` com a lógica de inicialização mínima do Firebase (veja snippets de implementação).

## 3. Validação no Chrome DevTools

1. Abra a aba **Application** (F12).
2. **Manifest**: Verifique se não há erros/avisos. Os campos `start_url`, `icons` e `display: standalone` são cruciais.
3. **Service Workers**:
    - Você deve ver o SW do Vite rodando.
    - O `firebase-messaging-sw` só aparecerá/ativará quando uma notificação chegar ou quando o token for solicitado.

## 4. Cache Strategy
O padrão `autoUpdate` do Vite PWA usa a estratégia "CacheFirst" para assets estáticos (JS, CSS) e "NetworkFirst" para HTML.
- **Assets**: Cacheia tudo no diretório `dist` (exceto `_redirects` ou arquivos ignorados).
- **API Requests**: Não são cacheadas pelo SW padrão. A cotação deve vir sempre da rede (fresh).

---
**Links Úteis:**
- [Vite PWA Plugin Guide](https://vite-pwa-org.netlify.app/guide/)
- [Web App Manifest](https://developer.chrome.com/docs/webapps/manifest/)
