# Configuração Vercel 🚀

Guia para deploy e configuração do ambiente de produção.

## 1. Setup Inicial
1. Instale a [Vercel CLI](https://vercel.com/docs/cli) ou use o dashboard web.
2. Na raiz do projeto: `vercel` (siga os passos para criar/linkar projeto).
3. **Build Settings**: O Vite padrão já é detectado (`npm run build`, output `dist`).
   - Framework Preset: `Vite`

## 2. Variáveis de Ambiente (Environment Variables)

As variáveis definidas em `.env` localmente **NÃO** sobem automaticamente para a Vercel por segurança. Você deve configurá-las no painel.

### Método A: Dashboard Web
1. Vá em [vercel.com](https://vercel.com) > Seu Projeto > **Settings** > **Environment Variables**.
2. Adicione **uma por uma** (copie do seu `.env` local):
   `VITE_FIREBASE_API_KEY`, etc.
3. **IMPORTANTE**: Após adicionar variáveis, você deve fazer um **Redeploy** para que elas surtam efeito no build.
   - Vá em **Deployments** > Menu três pontos no último commit > **Redeploy**.

### Método B: Vercel CLI
```bash
vercel env add VITE_FIREBASE_API_KEY
# (cole o valor, selecione 'Production', 'Preview', 'Development')
# Repita para todas as vars
vercel pull # Opcional, para baixar para local
```

## 3. Checklist Pós-Deploy ✅

Após o deploy estar "Ready":

1. **HTTPS**: PWA e Service Workers exigem HTTPS. A Vercel fornece isso automaticamente.
2. **Manifest**: Abra o app no navegador. Vá em DevTools > Application > Manifest.
   - Verifique se não há erros de sintaxe ou imagens 404.
3. **Service Worker**: Vá em DevTools > Application > Service Workers.
   - Verifique se o Status é "Activated and is running".
4. **Logs de Erro**: Se a tela ficar branca ou features falharem:
   - Abra o Console do navegador.
   - Erros comuns: `process.env is not defined` (você esqueceu de usar `import.meta.env` no Vite) ou `FirebaseError: Missing API Key` (esqueceu de configurar as vars na Vercel).

---
**Links Úteis:**
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Vite Env Modes](https://vitejs.dev/guide/env-and-mode.html)
