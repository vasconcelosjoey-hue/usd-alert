# Roadmap do Projeto 🗺️

Plano de evolução do USD Alert.

## Fase 0: Fundação Técnica ✅
- [x] Setup React + Vite + Tailwind.
- [x] Fetch de cotação USD/BRL (API Awesome ou similar).
- [x] UI Básica de exibição.
- [x] Deploy Vercel (CI/CD).

## Fase 1: PWA e Offline First (Foco Atual) 🚧
- [ ] Configurar Manifest e Ícones.
- [ ] Configurar Service Worker (Vite PWA).
- [ ] "Adicionar à Tela Inicial" funcionando no Android.
- [ ] App abre e mostra última cotação conhecida mesmo sem internet.

## Fase 2: Notificações Locais (In-App)
- [ ] UI de configuração (Input de valor limite).
- [ ] Salvar preferências no LocalStorage.
- [ ] Polling enquanto app aberto disparando `new Notification()`.

## Fase 3: Notificações Reais (Push)
- [ ] Configurar projeto Firebase e obter credenciais.
- [ ] Implementar `firebase-messaging-sw.js`.
- [ ] Lógica de obter FCM Token e salvar no Firestore (ou Log para teste).
- [ ] Script Backend (GitHub Actions ou Cron) para verificar cotação e disparar pushes.

## Fase 4: O "Widget"
- [ ] Adicionar App Shortcuts (Atalhos no ícone) como paliativo.
- [ ] (Futuro) Migrar para Capacitor se widget nativo for exigência de negócio.
