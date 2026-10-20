/**
 * Dev Automation Kit - Interactive Script (ES6+)
 * Alinhado ao Design System Oficial do Projeto
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização segura e defensiva de ícones Lucide
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  window.addEventListener('load', () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });

  /* =========================================================================
     1. NAVEGAÇÃO MOBILE & HEADER
     ========================================================================= */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  const mainHeader = document.getElementById('main-header');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  window.addEventListener('scroll', () => {
    if (mainHeader) mainHeader.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* =========================================================================
     2. ABAS DO MOCKUP DESKTOP (CONTEXTO IA VS DIAGNÓSTICOS)
     ========================================================================= */
  const heroTabContexto = document.getElementById('hero-tab-contexto');
  const heroTabDiagnosticos = document.getElementById('hero-tab-diagnosticos');
  const heroPanelContexto = document.getElementById('hero-panel-contexto');
  const heroPanelDiagnosticos = document.getElementById('hero-panel-diagnosticos');

  if (heroTabContexto && heroTabDiagnosticos && heroPanelContexto && heroPanelDiagnosticos) {
    heroTabContexto.addEventListener('click', () => {
      heroTabContexto.classList.add('active');
      heroTabDiagnosticos.classList.remove('active');
      heroPanelContexto.classList.remove('hidden');
      heroPanelDiagnosticos.classList.add('hidden');
    });

    heroTabDiagnosticos.addEventListener('click', () => {
      heroTabDiagnosticos.classList.add('active');
      heroTabContexto.classList.remove('active');
      heroPanelDiagnosticos.classList.remove('hidden');
      heroPanelContexto.classList.add('hidden');
    });
  }

  /* =========================================================================
     3. SIMULAÇÃO DE GERAÇÃO DE CONTEXTO NO HERO
     ========================================================================= */
  const mockBtnGerar = document.getElementById('mock-btn-gerar');
  const mockResultBanner = document.getElementById('mock-result-banner');
  const mockBtnCopiar = document.getElementById('mock-btn-copiar');
  const mockBtnExplorador = document.getElementById('mock-btn-explorador');

  if (mockBtnGerar && mockResultBanner) {
    mockBtnGerar.addEventListener('click', () => {
      mockBtnGerar.classList.add('opacity-75');
      showToast('Compilando arquivos selecionados em gerados/... ⚡');

      setTimeout(() => {
        mockBtnGerar.classList.remove('opacity-75');
        mockResultBanner.classList.remove('hidden');
        showToast('Contexto compilado com sucesso! Pronto para colar.');
      }, 600);
    });
  }

  if (mockBtnCopiar) {
    mockBtnCopiar.addEventListener('click', async () => {
      const sampleExport = `// DEV AUTOMATION KIT - CONTEXTO GERADO (ecommerce-core-ts)
// Total de Arquivos: 14 | Tokens: ~35.700
// Gerado localmente com SafeGuard Ativo.
=====================================================
[ARQUIVO: src/index.ts]
...
[ARQUIVO: src/services/auth.ts]
...
[ARQUIVO: src/services/payment.ts]
...`;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(sampleExport);
        }
        showToast('Contexto compilado copiado para a Área de Transferência! 📋');
      } catch (err) {
        showToast('Contexto preparado para cópia.');
      }
    });
  }

  if (mockBtnExplorador) {
    mockBtnExplorador.addEventListener('click', () => {
      showToast('Abrindo pasta nativa: gerados/ecommerce-core-ts/ 📁');
    });
  }

  /* =========================================================================
     4. ÁRVORE DE ARQUIVOS INTERATIVA (CÁLCULO DINÂMICO DE TOKENS)
     ========================================================================= */
  const treeCheckboxes = document.querySelectorAll('#sobre input[type="checkbox"]');
  const mockFilesCount = document.getElementById('mock-files-count');
  const mockBytesSize = document.getElementById('mock-bytes-size');
  const mockTokensCount = document.getElementById('mock-tokens-count');

  if (treeCheckboxes.length > 0) {
    treeCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const checkedCount = Array.from(treeCheckboxes).filter(cb => cb.checked).length;
        if (mockFilesCount) mockFilesCount.textContent = checkedCount;

        // Atualização proporcional de métricas
        const baseBytes = checkedCount * 10.2;
        const baseTokens = Math.round(checkedCount * 2550);
        
        if (mockBytesSize) mockBytesSize.textContent = `${baseBytes.toFixed(1)} KB`;
        if (mockTokensCount) mockTokensCount.textContent = `~${baseTokens.toLocaleString('pt-BR')}`;
      });
    });
  }

  /* =========================================================================
     5. SELETOR DE TEMAS INTERATIVO (#temas)
     ========================================================================= */
  const themeButtons = document.querySelectorAll('.theme-switch-btn');
  const themeCard = document.getElementById('theme-preview-card');
  const themePreviewTitle = document.getElementById('theme-preview-title');
  const themeBadgeLabel = document.getElementById('theme-badge-label');
  const themePreviewHeading = document.getElementById('theme-preview-heading');
  const themePreviewDesc = document.getElementById('theme-preview-desc');
  const themeTagElement = document.getElementById('theme-tag-element');

  const themeConfig = {
    'dark-glass': {
      className: 'theme-dark-glass',
      title: 'Dev Automation Kit — [Dark Glass Mode]',
      badge: 'Dark Glass UI',
      heading: 'Diagnóstico em Andamento',
      tag: 'Engine v1.0.1',
      desc: 'O estilo Dark Glass oferece contraste ideal para programar em ambientes com baixa luminosidade, reduzindo a fadiga visual com camadas translúcidas e destaques azuis e roxos.'
    },
    'aero': {
      className: 'theme-aero',
      title: 'Dev Automation Kit — [Windows Aero Glass]',
      badge: 'Frutiger Aero',
      heading: 'Otimizador de Desempenho & Tokens',
      tag: 'Aero Glass 2007-2012',
      desc: 'Inspirado na icônica era Frutiger Aero do Windows 7: transparências cristalinas, brilhos especulares, reflexos aquáticos e a sensação nostálgica e polida de software desktop clássico.'
    },
    'cyberpunk': {
      className: 'theme-cyberpunk',
      title: 'DEV_AUTOMATION_KIT // [CYBER_NEON_v1.0.1]',
      badge: 'CYBERPUNK HUD',
      heading: 'SYSTEM_DIAGNOSTICS_ACTIVE',
      tag: 'KERNEL://SYNAPSE_v9',
      desc: 'Paleta agressiva de alto contraste com ciano elétrico e magenta neon, linhas de varredura CRT e visual utilitário terminal de ficção científica.'
    }
  };

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.getAttribute('data-theme');
      if (!themeConfig[selectedTheme] || !themeCard) return;

      themeButtons.forEach(b => {
        b.classList.remove('active', 'bg-[#21262d]', 'text-[#f0f6fc]', 'border', 'border-[#58a6ff]');
        b.classList.add('text-[#8b949e]');
      });

      btn.classList.add('active', 'bg-[#21262d]', 'text-[#f0f6fc]', 'border', 'border-[#58a6ff]');
      btn.classList.remove('text-[#8b949e]');

      themeCard.className = `theme-container ${themeConfig[selectedTheme].className} rounded-xl overflow-hidden transition-all duration-300 p-1`;

      if (themePreviewTitle) themePreviewTitle.textContent = themeConfig[selectedTheme].title;
      if (themeBadgeLabel) themeBadgeLabel.textContent = themeConfig[selectedTheme].badge;
      if (themePreviewHeading) themePreviewHeading.textContent = themeConfig[selectedTheme].heading;
      if (themePreviewDesc) themePreviewDesc.textContent = themeConfig[selectedTheme].desc;
      if (themeTagElement) themeTagElement.textContent = themeConfig[selectedTheme].tag;

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });
  });

  /* =========================================================================
     6. MODAL DE DOWNLOAD & DOAÇÃO (WINRAR / ITCH.IO STYLE)
     ========================================================================= */
  const downloadModal = document.getElementById('download-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalSelectedFile = document.getElementById('modal-selected-file');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const btnModalSupport = document.getElementById('btn-modal-support');
  const btnModalFreeDownload = document.getElementById('btn-modal-free-download');
  const modalContentNormal = document.getElementById('modal-content-normal');
  const modalContentThankyou = document.getElementById('modal-content-thankyou');
  const btnThankyouClose = document.getElementById('btn-thankyou-close');

  let currentTargetFile = 'DevAutomationKit-Setup-1.0.1.exe';

  function openModal(fileName) {
    currentTargetFile = fileName || 'DevAutomationKit-Setup-1.0.1.exe';
    if (modalSelectedFile) {
      modalSelectedFile.textContent = currentTargetFile;
    }

    if (modalContentNormal && modalContentThankyou) {
      modalContentNormal.classList.remove('hidden');
      modalContentThankyou.classList.add('hidden');
    }

    if (downloadModal) {
      downloadModal.classList.remove('inactive');
      downloadModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (downloadModal) {
      downloadModal.classList.remove('active');
      downloadModal.classList.add('inactive');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-download-target') || 'DevAutomationKit-Setup-1.0.1.exe';
      openModal(target);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (downloadModal) {
    downloadModal.addEventListener('click', (e) => {
      if (e.target === downloadModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (downloadModal && downloadModal.classList.contains('active')) {
        closeModal();
      }
      if (modalStatus && modalStatus.classList.contains('show')) {
        hideStatusModal();
      }
    }
  });

  /* =========================================================================
     7. COPIAR CHAVE PIX & TOAST NOTIFICATION
     ========================================================================= */
  const copyPixBtn = document.getElementById('copy-pix-btn');
  const pixKeyInput = document.getElementById('pix-key-input');
  const copyPixText = document.getElementById('copy-pix-text');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message, duration = 3200) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  if (copyPixBtn && pixKeyInput) {
    copyPixBtn.addEventListener('click', async () => {
      const textToCopy = pixKeyInput.value;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          pixKeyInput.select();
          document.execCommand('copy');
        }

        if (copyPixText) copyPixText.textContent = 'Copiado!';
        copyPixBtn.classList.add('bg-[#2ea043]/20', 'text-[#3fb950]', 'border-[#2ea043]/40');
        showToast('Chave Pix copiada para a área de transferência! 🚀');

        setTimeout(() => {
          if (copyPixText) copyPixText.textContent = 'Copiar';
          copyPixBtn.classList.remove('bg-[#2ea043]/20', 'text-[#3fb950]', 'border-[#2ea043]/40');
        }, 2200);

      } catch (err) {
        showToast('Selecione e copie manualmente o código Pix.');
      }
    });
  }

  /* =========================================================================
     8. DISPARAR DOWNLOAD REAL
     ========================================================================= */
  function triggerDownload(fileName) {
    const sampleContent = `Dev Automation Kit v1.0.1
=====================================================
Pacote Selecionado: ${fileName}
Data: ${new Date().toLocaleString('pt-BR')}

Este arquivo é informativo e não contém o aplicativo.

Para documentação oficial e novidades do projeto, acesse:
https://github.com/AlanClimaco/dev-automation-kit-web
=====================================================
Obrigado por utilizar o Dev Automation Kit!`;

    const blob = new Blob([sampleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = fileName.endsWith('.txt') ? fileName : `${fileName}.info.txt`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
  }

  if (btnModalFreeDownload) {
    btnModalFreeDownload.addEventListener('click', () => {
      closeModal();
      showToast(`Gerando arquivo informativo para ${currentTargetFile}...`);
      triggerDownload(currentTargetFile);
    });
  }

  if (btnModalSupport) {
    btnModalSupport.addEventListener('click', () => {
      if (modalContentNormal && modalContentThankyou) {
        modalContentNormal.classList.add('hidden');
        modalContentThankyou.classList.remove('hidden');
      }

      showToast('Obrigado de coração pelo apoio ao projeto! ❤️');

      setTimeout(() => {
        triggerDownload(currentTargetFile);
      }, 1500);
    });
  }

  if (btnThankyouClose) {
    btnThankyouClose.addEventListener('click', closeModal);
  }

  /* =========================================================================
     9. FORMULÁRIO DE CONTATO / FEEDBACK (FORMSPREE AJAX + STATUS MODAL)
     ========================================================================= */
  const contactForm = document.getElementById('form-contato');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalStatus = document.getElementById('modal-status');
  const modalClose = document.getElementById('modal-close');
  const modalMessage = document.getElementById('modal-message');
  let modalTimeout = null;

  function showStatusModal(message, type = 'success') {
    if (!modalStatus || !modalBackdrop || !modalMessage) return;

    if (modalTimeout) {
      clearTimeout(modalTimeout);
      modalTimeout = null;
    }

    modalMessage.textContent = message;
    modalStatus.classList.remove('success', 'error');
    modalStatus.classList.add(type);
    modalBackdrop.classList.add('show');
    modalStatus.classList.add('show');

    modalTimeout = setTimeout(() => {
      hideStatusModal();
    }, 3500);
  }

  function hideStatusModal() {
    if (!modalStatus || !modalBackdrop) return;
    if (modalTimeout) {
      clearTimeout(modalTimeout);
      modalTimeout = null;
    }
    modalBackdrop.classList.remove('show');
    modalStatus.classList.remove('show');
  }

  if (modalClose) {
    modalClose.addEventListener('click', hideStatusModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', hideStatusModal);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const btnSpan = submitBtn ? submitBtn.querySelector('span') : null;

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Validação defensiva dos campos
      if (!name) {
        showStatusModal('Por favor, preencha o seu nome.', 'error');
        if (nameInput) nameInput.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showStatusModal('Por favor, informe um endereço de e-mail válido.', 'error');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!message) {
        showStatusModal('Por favor, escreva uma mensagem antes de enviar.', 'error');
        if (messageInput) messageInput.focus();
        return;
      }

      const originalBtnText = btnSpan ? btnSpan.textContent : 'Enviar Mensagem';
      if (btnSpan) btnSpan.textContent = 'Enviando...';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
      }

      try {
        const formData = new FormData(contactForm);

        const response = await fetch('https://formspree.io/f/mrbljora', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showStatusModal(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso!`, 'success');
          contactForm.reset();
        } else {
          const data = await response.json().catch(() => null);
          const errorMsg = data && data.errors && data.errors.length > 0 
            ? data.errors.map(err => err.message).join(', ') 
            : 'Houve um erro ao enviar. Tente novamente mais tarde.';
          showStatusModal(errorMsg, 'error');
        }
      } catch (err) {
        showStatusModal('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.', 'error');
      } finally {
        if (btnSpan) btnSpan.textContent = originalBtnText;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        }
      }
    });
  }

  // Cada grupo acompanha apenas os destinos locais existentes na página.
  function setupScrollSpy(selector) {
    const links = Array.from(document.querySelectorAll(selector)).filter(link => {
      const href = link.getAttribute('href');
      return href && href.startsWith('#') && document.getElementById(href.slice(1));
    });
    if (!links.length) return;
    const sections = [...new Set(links.map(link => document.getElementById(link.getAttribute('href').slice(1))))];
    function update() {
      const marker = window.scrollY + 130;
      let current = sections[0];
      sections.forEach(section => {
        if (section.getBoundingClientRect().top + window.scrollY <= marker) current = section;
      });
      links.forEach(link => {
        if (link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('hashchange', update);
    update();
  }
  setupScrollSpy('[data-section-link]');
  setupScrollSpy('[data-toc-link]');

  const toc = document.querySelector('.docs-toc');
  if (toc && window.matchMedia('(max-width: 700px)').matches) toc.open = false;

  document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.closest('.docs-code-container')?.querySelector('code');
      if (!code) return;
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(code.textContent);
        showToast('Código copiado para a área de transferência.');
      } catch (err) {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        showToast('Texto selecionado. Copie usando Ctrl+C ou o menu do navegador.', 5000);
      }
    });
  });
});
