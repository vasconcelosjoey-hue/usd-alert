# Widget na Tela Inicial 📲

Este documento esclarece as limitações e possibilidades de criar widgets para o USD Alert.

## A Realidade do PWA

**PWA (Progressive Web App) NÃO tem suporte a Widget nativo no Android (hoje).**
Ao instalar um PWA, você ganha um ícone na tela inicial que abre o site em tela cheia. Você **não** consegue criar aqueles "cards" de cotação que ficam atualizando direto na home screen sem abrir o app, como apps nativos (Itaú, Binance, etc) fazem.

## Alternativas para "Efeito Widget"

### 1. App Shortcuts (Atalhos do App)
Podemos definir `shortcuts` no `manifest.json`. Quando o usuário segura o ícone do app, aparece um menu rápido.
*Exemplo*: "Ver Dólar Agora".
*Resultado*: Abre o app já na tela de cotação.

### 2. Notificação Persistente (Gambiarra)
Alguns apps mantêm uma notificação fixa na barra de status com a cotação.
*Problema*: Em PWA Web, isso requer um Service Worker rodando constantemente, o que o Android mata agressivamente para economizar bateria. Não é confiável.

### 3. TWA (Trusted Web Activity) - A Solução "Real"
Para ter um Widget de verdade, você precisa empacotar seu PWA dentro de um app Android nativo leve.
- **Ferramenta**: [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) ou Capacitor.
- **Como funciona**: Gera um `.apk` que carrega seu site.
- **Vantagem**: Você pode escrever código Java/Kotlin apenas para o Widget, e ele abre seu PWA ao ser clicado.
- **Desvantagem**: Precisa publicar na Play Store (custo $25 USD único) ou distribuir o APK.

## Recomendação para o USD Alert
Foque na experiência **PWA padrão** primeiro.
O usuário clica no ícone -> App abre instantaneamente (devido ao cache) -> Mostra o dólar.
É quase tão rápido quanto um widget.

Se o Widget for **indispensável**:
Documente como "Fase 4" do roadmap: converter o projeto para usar **Capacitor**. O Capacitor permite criar código nativo (Java/Swift) para widgets enquanto mantém o resto do app em React.
