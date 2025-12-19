/// <reference types="vite/client" />

// Importe as funções que você precisa do SDKs que você precisa
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";
// import { getFirestore } from "firebase/firestore"; // Se for usar banco

// Configuração do Web App do Firebase
// Lembre-se de configurar as variáveis no .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// Inicializa Messaging
// Verifique se o navegador suporta SW antes de inicializar para evitar quebra no Server Side ou navegadores antigos
let messaging: Messaging | null = null;

try {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    messaging = getMessaging(app);
  }
} catch (error) {
  console.error("Erro ao inicializar Firebase Messaging:", error);
}

export const requestNotificationPermission = async () => {
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
      });
      console.log('FCM Token:', token);
      return token;
    } else {
      console.warn('Permissão de notificação negada.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao pegar token:', error);
    return null;
  }
};

export { app, messaging };
