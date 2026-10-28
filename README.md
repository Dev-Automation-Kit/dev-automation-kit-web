# Dev Automation Kit Web

Site oficial, vitrine de divulgação e portal de documentação do **Dev Automation Kit** (versão **v0.1.4f-alpha**).

---

## 🚀 O que é o Dev Automation Kit

O **Dev Automation Kit** é uma suíte de produtividade e diagnósticos locais desenvolvida para otimizar o fluxo de trabalho de desenvolvedores e times de engenharia na era do desenvolvimento assistido por Inteligência Artificial (como Claude, ChatGPT, Gemini e Cursor).

O software funciona como um aplicativo desktop multiplataforma (**Windows e Linux**) e como um motor CLI independente em Node.js puro, permitindo:

1. **Separação Estrutural & Otimização de Contexto para IA (`v0.1.4f-alpha`):**
   - **Divisão por Papel Técnico (`--by-role`):** Fracionamento inteligente do repositório em 9 categorias funcionais (*Render/UI, State, Queries, Types, Schemas, Routes, Controllers, Utils e Errors*).
   - **Otimização Extrema de Tokens (`--otimizar`):** Remoção cirúrgica de espaços redundantes, comentários e linhas vazias preservando sintaxes sensíveis a indentação (Python, YAML).
   - **Relatório de Mistura de Responsabilidades:** Detecção de acoplamento excessivo e geração de relatório analítico estrutural.
   - **Modos Tradicionais de Compilação:** `--single` (arquivo unificado), `--split` (partições balanceadas), `--by-folder` (módulos) e `--split-files` (quebra de arquivos gigantes).

2. **Baterias Customizadas Executáveis (`.devkit-battery`):**
   - **Formato Executável Nativo:** Arquivos de especificação `.devkit-battery` com associação direta no Windows e Linux.
   - **Aba Dedicada de Baterias:** Criação, exportação, importação e execução de suítes de testes personalizados pela interface gráfica.
   - **Modo Autônomo Compacto (*Standalone Mode*):** Execução ágil em janela ultra-compacta (850x440px) ao clicar duas vezes em um arquivo `.devkit-battery`.

3. **Gerenciamento Avançado de Workspaces & Provedores de IA:**
   - **Metadados de Workspace:** Modais dedicados para edição de apelidos, descrições e notas customizadas de repositórios.
   - **Auto-Abertura:** Opção para reabrir automaticamente o último projeto auditado ao iniciar.
   - **Chaves de IA com `safeStorage`:** Suporte a múltiplas chaves API nomeadas para Google Gemini e OpenAI criptografadas no disco com as credenciais nativas do SO.

4. **Diagnósticos Locais de Integridade de Código:**
   - Detector de código duplicado e clones AST (CPD).
   - Auditor estático de antipadrões JS/TS.
   - Validador comparativo de variáveis de ambiente (`.env` vs `.env.example`).
   - Auditor de dependências fantasma (`package.json` vs código).
   - Mapeador de consumo de armazenamento e verificador de links em documentações.

5. **Privacidade e Processamento 100% Local:**
   - Operação offline, zero telemetria e sanitização automática de chaves, certificados e arquivos `.env`.

---

## 🌐 Sobre este Repositório

Este repositório contém a interface web oficial e a central de documentação técnica do projeto (`dev-automation-kit-web`). Ele funciona de forma desacoplada do repositório core da aplicação desktop para garantir segurança, agilidade e servir como ponto público de acesso para:

- **Vitrine Institucional:** Apresentação dinâmica dos recursos e arquitetura do software.
- **Galeria Interativa de Temas:** Demonstração visual de estilos (Dark Glass, Light, Frutiger Aero e Cyberpunk).
- **Central de Downloads:** Distribuição direta de instaladores executáveis para Windows (`.exe` Setup e Portátil) e Linux (`.AppImage` e `.deb`).
- **Portal de Documentação Técnica:** Guias práticos de comandos CLI, especificações de arquitetura e FAQ.
- **Painel de Apoio Comunitário:** Mecanismo voluntário de colaboração via Pix com cópia assistida da chave.

---

## 🛠️ Comandos CLI em Destaque (v0.1.4f-alpha)

```bash
# Compilar contexto com separação por papéis funcionais e otimização profunda de tokens
node src/core/context/contexto-ia.mjs /caminho/do/projeto --by-role --otimizar

# Analisar mistura de responsabilidades e emitir relatório estrutural
node src/core/context/separador-estrutural.mjs contexto.txt --project-root=/caminho/do/projeto --output-dir=./gerados

# Executar detector de clones de código no repositório
node src/core/diagnostics/detectar-clones.mjs /caminho/do/projeto
```

---

## 👥 Equipe e Co-criadores

O **Dev Automation Kit** é um projeto independente desenvolvido colaborativamente em parceria horizontal por:

- **Alan Clímaco:** Co-criador / Desenvolvedor ([GitHub](https://github.com/AlanClimaco))
- **Amizael:** Co-criador / Desenvolvedor ([GitHub](https://github.com/Amizael))
- **Wernnon:** Co-criador / Desenvolvedor ([GitHub](https://github.com/wernnon))

---

## 📄 Licença

Distribuído sob a Licença MIT.
