# USD Alert 💵

**Monitoramento de Dólar (USD/BRL) em Tempo Real com Alertas.**

Projeto PWA (Progressive Web App) desenvolvido para monitorar a cotação do dólar e notificar o usuário via Push Notifications (Firebase) quando limites ou horários específicos forem atingidos.

## 🚀 Funcionalidades

- **Cotação em Tempo Real**: Atualização automática da taxa USD/BRL.
- **PWA Instalável**: Funciona como app no Android (Adicionar à tela inicial).
- **Push Notifications**:
  - Alerta por limite (ex: Dólar acima de R$ 6,00).
  - Alerta agendado (ex: Cotação diária às 09:00, 13:00, 18:00).
- **Offline First**: Cache inteligente para carregar a interface mesmo sem internet.

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Estilização**: Tailwind CSS
- **PWA**: Vite PWA Plugin, Service Workers
- **Notificações**: Firebase Cloud Messaging (FCM) Web
- **Persistência**: LocalStorage (Preferências locais) + Firestore (Tokens FCM opcionais)
- **Deploy**: Vercel (CI/CD Automático)

## 🏃 Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/usd-alert.git
   cd usd-alert
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz (baseado no `.env.example`) e preencha suas credenciais do Firebase:
   ```env
   VITE_FIREBASE_API_KEY="seu_api_key"
   VITE_FIREBASE_AUTH_DOMAIN="seu_projeto.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="seu_projeto_id"
   VITE_FIREBASE_STORAGE_BUCKET="seu_projeto.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="seu_sender_id"
   VITE_FIREBASE_APP_ID="seu_app_id"
   VITE_FIREBASE_VAPID_KEY="sua_vapid_key_publica"
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:5173`.

   > **Nota do Studio/Antigravity**: O Service Worker de notificações geralmente não funciona em ambientes de preview/iframe sem HTTPS ou devido a restrições de porta. Teste em `localhost` direto ou via deploy.

## 📦 Como Deployar (Vercel)

O projeto está configurado para deploy contínuo no Vercel.

1. Conecte seu repositório no dashboard da Vercel.
2. Adicione as mesmas variáveis de ambiente do passo local nas configurações do projeto na Vercel (**Settings > Environment Variables**).
3. Faça um push para a branch `main`. A Vercel iniciará o build automaticamente.

## 📱 Como Instalar no Android

1. Acesse a URL do projeto (ex: `https://usd-alert.vercel.app`) no Chrome Android.
2. Toque no menu (três pontos) > **"Adicionar à tela inicial"** ou **"Instalar aplicativo"**.
3. O ícone aparecerá no seu launcher como um app nativo.

## 🔔 Como Testar Push Notifications

1. Abra o app instalado.
2. Aceite a permissão de notificações quando solicitado.
3. Configure um alerta (ex: "Enviar teste" ou defina um limite próximo).
4. **Para teste real**: Use o [Firebase Console > Messaging](https://console.firebase.google.com/) e envie uma mensagem de teste usando o token FCM gerado (impresso no console do navegador em modo dev).

## 🚑 Troubleshooting

- **Erro `missing API Key`**: Verifique se o arquivo `.env` existe e se as variáveis começam com `VITE_`. Reinicie o servidor (`npm run dev`) após alterar o .env.
- **Erro 403 em `firebaseinstallations`**: Sua API Key no Google Cloud Console pode ter restrições de HTTP Referrer bloqueando o localhost ou o domínio da Vercel. Adicione `http://localhost:5173` e `https://seu-app.vercel.app` nas permissões da chave.
- **Service Worker não registra**: Service Workers exigem **HTTPS** (exceto em localhost). Verifique se está acessando via `https://` no deploy.
- **Notificação não chega com app fechado**: No Android, aplicações Web (PWA) dependem do sistema operacional e prioridade de bateria. O Firebase Messaging SW deve estar corretamente configurado em `public/firebase-messaging-sw.js`.

---
**Links Úteis:**
- [Vite Env Vars](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase FCM Client](https://firebase.google.com/docs/cloud-messaging/js/client)
