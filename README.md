# Dev Automation Kit — Landing Page Oficial

Landing page moderna, responsiva e estática para o software desktop **Dev Automation Kit**, construída com HTML5, Tailwind CSS e JavaScript puro (ES6+).

🌐 **Hospedagem:** GitHub Pages  
🎨 **Estilo:** Glassmorphic Dark UI com suporte a múltiplos temas visuais (Dark Glass, Windows 7 Aero, Cyberpunk)  
🛡️ **100% Local & Privado:** Zero dependências de backend ou servidores externos

---

## 🚀 Como Visualizar Localmente

Você não precisa de nenhum compilador ou instalador. Basta abrir o arquivo `index.html` diretamente em seu navegador preferido:

1. Dê um duplo clique no arquivo [`index.html`](index.html).
2. Ou inicie um servidor HTTP local simples (opcional):
   ```bash
   # Com Python:
   python -m http.server 8080

   # Com Node.js (npx):
   npx serve .
   ```
3. Acesse `http://localhost:8080` no navegador.

---

## 📁 Estrutura de Arquivos

```text
dev-automation-kit-web/
├── index.html     # Estrutura semântica HTML5, Tailwind via CDN, Lucide Icons
├── styles.css     # Efeitos de Glassmorphism, temas Aero/Cyberpunk e animações
├── script.js      # Modal estilo WinRAR/Itch.io, seletor de temas e cópia Pix
└── README.md      # Instruções de uso e deploy
```

---

## ⚙️ Principais Recursos da Página

- **Hero & Mockup de Aplicação:** Simulação de janela desktop com árvore de diretórios interativa e calculadora de tokens para Claude, GPT-4o e Gemini.
- **Grid de Funcionalidades:** Detalhamento técnico das 6 ferramentas centrais do kit (Gerador de Contexto, Bateria de 7 Diagnósticos, Clones AST, Validador .env, Auditor JS/TS e Dependências Fantasma).
- **Seletor de Temas Interativo:** Alternância instantânea entre *Dark Glass*, *Windows 7 / Frutiger Aero* e *Cyberpunk*.
- **Modal de Doação/Download (Estilo WinRAR / Itch.io):** Experiência colaborativa com QR Code Pix, botão "Copiar Chave", download gratuito direto e feedback visual.
- **Seção da Equipe:** Cards dedicados aos 3 desenvolvedores em parceria horizontal: Amizael, Alan Clímaco e Wernnon (Co-criadores / Desenvolvedores).
- **Totalmente Responsivo:** Otimizado para telas ultra-wide, laptops, tablets e smartphones.

---

## 🌐 Publicação no GitHub Pages

Para publicar no GitHub Pages:
1. Faça o commit e push dos arquivos para o branch `main` ou `master`:
   ```bash
   git add .
   git commit -m "feat: landing page completa do Dev Automation Kit"
   git push origin master
   ```
2. No GitHub, acesse **Settings** > **Pages**.
3. Em **Source**, selecione `Deploy from a branch` e aponte para `master` / `/ (root)`.
4. Salve. O site estará no ar em poucos segundos!
