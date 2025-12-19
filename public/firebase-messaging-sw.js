// Scripts do Firebase (importScripts é usado em SW pois não há módulos ES6 nativos completos em todos contextos)
// Versão do Firebase deve ser compatível (use a mesma major version 9 ou 10)
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Configuração idêntica ao .env (mas aqui deve ser HARDCODED ou passada via query params,
// pois SW não acessa process.env/import.meta.env facilmente sem build step complexo)
// RECOMENDAÇÃO: Para simplificar, hardcode as chaves públicas aqui.
// Elas são públicas de qualquer forma no bundle JS do site.
const firebaseConfig = {
    apiKey: "TODO_COPIAR_API_KEY_DO_DOTENV",
    authDomain: "TODO_COPIAR_AUTH_DOMAIN",
    projectId: "TODO_COPIAR_PROJECT_ID",
    storageBucket: "TODO_COPIAR_STORAGE_BUCKET",
    messagingSenderId: "TODO_COPIAR_MESSAGING_SENDER_ID",
    appId: "TODO_COPIAR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handler para notificações em background
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Notificação em background recebida:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/pwa-192x192.png' // Ícone do app
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
