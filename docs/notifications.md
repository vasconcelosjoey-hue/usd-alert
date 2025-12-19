# Estratégia de Notificações 🔔

Definição de UX e implementação técnica para os alertas do USD Alert.

## 1. UI/UX: Configuração de Alertas

Recomendamos uma tela dedicada ou modal "Configurar Alerta" com duas abas:

### Aba "Por Limite" (Price Alert)
- **Input de Valor**: Campo numérico para o usuário digitar o valor alvo (ex: `5.50`).
- **Condição**: Toggle ou Select "Acima de" / "Abaixo de".
- **Ação**: Botão "Salvar Alerta".
- *Feedback*: Toast confirmando "Alerta criado para USD > 5.50".

### Aba "Agendado" (Scheduled)
- **Presets**: Botões rápidos: `09:00`, `13:00`, `18:00`.
- **Custom**: Input `type="time"` para escolha livre.
- **Lista**: Mostrar lista de horários ativos com opção de remover.

## 2. Persistência de Preferências

### A) LocalStorage (Simples/Local)
Salvar as preferências no navegador do usuário.
```json
{
  "alerts": [
    { "type": "price", "condition": "above", "value": 5.80, "active": true },
    { "type": "time", "value": "09:00", "active": true }
  ],
  "fcmToken": "..."
}
```
*Prós*: Sem backend, privacidade total.
*Contras*: Se limpar dados do navegador, perde configs. Push agendado é difícil sem backend.

### B) Firestore (Recomendado para Push Real)
Salvar token + preferências no banco.
Collection `users`:
```json
{
  "fcmToken": "token_xyz...",
  "priceAlerts": [{ "target": 5.80, "condition": "above" }],
  "scheduleAlerts": ["09:00", "18:00"],
  "lastQuoteSeen": 5.75
}
```

## 3. Disparo de Notificações

### Cenário 1: Sem Backend (Apenas Local)
O app precisa estar **ABERTO** (ou minimizado em alguns browsers desktop) para monitorar.
- **Implementação**: `setInterval` a cada 60s, busca cotação, compara com `localStorage`, dispara `new Notification()`.
- **Limitação**: Não funciona se fechar a aba/app no celular.

### Cenário 2: Com Backend Gratuito (Recomendado)

Para enviar notificações com o app **FECHADO** (requisito crítico de mobile), precisamos de um "gatilho" externo.

**Solução: GitHub Actions (Cron) + Script Node**
1. **GitHub Actions**: Workflow rodando a cada 15 ou 30 min (limitação do schedule gratuito).
2. **Script**:
   - Busca cotação atual.
   - Lê todos os usuários do Firestore.
   - Filtra quem deve receber alerta.
   - Usa `firebase-admin` para enviar Push Multicast (lote até 500 tokens).

**Fluxo Alternativo (Horário Fixo)**:
- Cron roda exatamente em horários chave (09, 13, 18).
- Envia push de "Relatório do Dólar" para **todos** os inscritos no tópico `daily_updates` (mais barato e eficiente que filtrar usuários um a um).

## Recomendação Final para MVP
1. Comece com **Notificações Locais** (Enquanto app aberto) para validar a UI.
2. Evolua para **Push via Tópico** (Ex: Usuário se inscreve para receber "Dólar diário"). Use GitHub Action para disparar para o tópico `all_users` em horários fixos. É a solução mais simples que funciona no plano Spark (Free).
