# Checklist Pronto para Commitar ✅

Antes de dar `git push` e ver o deploy rodar, verifique:

## 1. Arquivos Obrigatórios
- [ ] `.env` criado localmente com chaves do Firebase (não comitado).
- [ ] `public/firebase-messaging-sw.js` com a config do Firebase preenchida. (⚠️ Lembre-se: SW não lê .env, você precisa colar os valores lá).
- [ ] `public/manifest.json` e ícones (`pwa-192x192.png`, `pwa-512x512.png`) presentes na pasta public.

## 2. Configuração de Build
- [ ] `vite.config.ts` com o plugin `VitePWA` configurado corretamente.
- [ ] `tsconfig.json` incluindo tipos vite se necessário (geralmente ok por padrão).

## 3. Vercel
- [ ] Projeto criado na Vercel.
- [ ] Variáveis de ambiente configuradas no Dashboard da Vercel (Settings > Environment Variables).
- [ ] Domínios adicionados na "API Key Restriction" do Google Cloud (para evitar erro 403).

## 4. Teste Local
- [ ] `npm run dev`.
- [ ] Console do browser sem erros vermelhos graves.
- [ ] Aba "Application" > Manifest carregou ok?

---
🚀 **Tudo pronto? Commit e Push!**
```bash
git add .
git commit -m "docs: setup documentation and pwa configuration"
git push origin main
```
