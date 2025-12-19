# Configuração Firebase 🔥

Passo a passo para configurar o backend de notificações.

## 1. Criar Projeto no Console
1. Acesse [console.firebase.google.com](https://console.firebase.google.com/).
2. "Adicionar projeto" -> Nome: `usd-alert-prod`.
3. Google Analytics: Opcional (Recomendado desativar para simplificar LGPD se não for usar).
4. "Criar projeto".

## 2. Configurar Firebase Cloud Messaging (Web)
1. No menu lateral, clique na engrenagem ⚙️ (Visão geral do projeto) > **Configurações do projeto**.
2. Aba **Cloud Messaging**.
3. Em "Configuração da API Cloud Messaging (Legado)", certifique-se que está ativado ou olhe para "**API Firebase Cloud Messaging (V1)**" (recomendado).
4. Em **Configuração de Web Push**, clique em "Generate key pair" (Gerar par de chaves).
5. Copie a **Chave pública (Public key)**. Esta é a sua `VITE_FIREBASE_VAPID_KEY`.

## 3. Adicionar App Web
1. Na aba **Geral**, role até "Seus aplicativos" e clique no ícone **Web (</>)**.
2. Apelido: `USD Alert Web`.
3. Marque "Firebase Hosting" (Opcional, mas útil se quiser deployar lá. Como usamos Vercel, pode deixar desmarcado ou marcar e só não usar).
4. Copie o objeto `firebaseConfig` exibido. Ele mapeia para as variáveis de ambiente abaixo.

## 4. Variáveis de Ambiente (.env)

Crie/Preencha o arquivo `.env`:

```env
# Configurações do App (Geral > Seus aplicativos > SDK config)
VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="usd-alert-XYZ.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="usd-alert-XYZ"
VITE_FIREBASE_STORAGE_BUCKET="usd-alert-XYZ.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456..."
VITE_FIREBASE_APP_ID="1:123456...:web:..."

# Messaging (Cloud Messaging > Web Push > Key Pair)
VITE_FIREBASE_VAPID_KEY="BExyz..."
```

## 5. ⚠️ RESTRIÇÃO DE API KEY (IMPORTANTE)

Para evitar erros 403 / "Requests from this origin are not allowed" na chamada `installations`:

1. Vá para [Google Cloud Console > Credentials](https://console.cloud.google.com/apis/credentials).
2. Selecione o projeto `usd-alert`.
3. Localize a chave **"Browser key (auto created by Firebase)"** na lista. Clique para editar.
4. Em **"Restrições de aplicativo"**, se estiver selecionado "Referenciadores HTTP", adicione TODOS os domínios que você usa:
   - `http://localhost:5173/*` (Desenvolvimento)
   - `https://usd-alert.vercel.app/*` (Produção Vercel oficial)
   - `https://usd-alert-git-main-seu-user.vercel.app/*` (Previews, se quiser wildcard use `https://*.vercel.app/*` **mas cuidado com segurança**).
5. Salve. Pode demorar até 5 minutos para propagar.

---
**Links Úteis:**
- [Firebase Config Object](https://firebase.google.com/docs/web/learn-more#config-object)
- [FCM Web Setup](https://firebase.google.com/docs/cloud-messaging/js/client)
