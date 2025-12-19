# Segurança e Privacidade 🔐

## 1. Variáveis de Ambiente e Segredos

- **NUNCA** commite o arquivo `.env` no Git. Ele está no `.gitignore`.
- As chaves `VITE_FIREBASE_...` expostas no frontend são, por natureza, visíveis para qualquer pessoa que inspecionar o código do site.
  - **Não entre em pânico**: O Firebase Client SDK é feito para isso.
  - **A Segurança Real**: Vem das **Regras de Segurança (Security Rules)** do Firestore e Storage, e das restrições de domínio das chaves de API.

## 2. API Key Restrictions (Google Cloud)
Como mencionado em `firebase-setup.md`, é CRUCIAL restringir a API Key no Google Cloud Console:
- Vá em [APIs & Services > Credentials](https://console.cloud.google.com/apis/credentials).
- Edite a chave usada pelo browser.
- **Application restrictions**: HTTP Referrers -> Adicione apenas seus domínios (`localhost`, `*.vercel.app`).
- **API restrictions**: Selecione apenas as APIs que o frontend usa (Firebase Installations, Cloud Messaging, Firestore MySQL).

## 3. Segurança do Firestore
Se formos salvar dados de usuários, o banco **não pode** estar em modo "Test Mode" (aberto para o mundo) para sempre.

**Regras Mínimas (firestore.rules)**:
```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Apenas permite escrita se o dado contém o token do próprio usuário
    // (Simplificado para MVP sem Auth real)
    match /users/{userId} {
      allow read, write: if true; // PERIGOSO! Use apenas em dev.
    }
    
    // IDEAL COM AUTH ANÔNIMA:
    // match /users/{userId} {
    //   allow read, write: if request.auth != null && request.auth.uid == userId;
    // }
  }
}
```
*Dica*: Use o Firebase Authentication (Modo Anônimo) para ter um UID seguro para cada visitante, sem precisar de login/senha.

## 4. LGPD e Privacidade
Tokens de notificação (FCM Tokens) podem ser considerados dados pessoais indiretos.
- **Consentimento**: Só peça permissão de notificação quando o usuário clicar em "Ativar Alertas". Não peça no load da página.
- **Transparência**: Informe que o token é usado apenas para enviar alertas do dólar.

---
**Checklist de Segurança Pre-Launch**
- [ ] `.env` está no `.gitignore`?
- [ ] API Key tem restrição de domínio no Google Cloud?
- [ ] Firestore Rules não estão como `allow read, write: if true` em produção? (Se usar banco)
