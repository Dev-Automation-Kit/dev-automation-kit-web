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
     PRÉVIA INTERATIVA DOS TEMAS OFICIAIS E DO ROADMAP
     ========================================================================= */
  const themeButtons = Array.from(document.querySelectorAll('.theme-switch-btn'));
  const themePreview = document.getElementById('theme-preview-card');
  const themeTitle = document.getElementById('theme-preview-title');
  const themeHeading = document.getElementById('theme-preview-heading');
  const themeDescription = document.getElementById('theme-preview-desc');
  const themeStatus = document.getElementById('theme-badge-label');
  const themeTag = document.getElementById('theme-tag-element');
  const themeConfig = {
    'dark-glass': {
      className: 'theme-dark-glass',
      title: 'Dev Automation Kit — [Dark Glass Mode]',
      heading: 'Diagnóstico em Andamento',
      description: 'O estilo Dark Glass oferece contraste ideal para programar em ambientes com baixa luminosidade, reduzindo a fadiga visual com camadas translúcidas e destaques azuis e roxos.',
      status: 'Dark Glass UI',
      tag: 'Engine v0.1.3-alpha'
    },
    light: {
      className: 'theme-light',
      title: 'Dev Automation Kit — [Light Mode]',
      heading: 'Clareza em cada diagnóstico',
      description: 'Light oferece superfícies claras e alto contraste para analisar projetos em ambientes iluminados.',
      status: 'Light UI',
      tag: 'Engine v0.1.3-alpha'
    },
    aero: {
      className: 'theme-aero',
      title: 'Dev Automation Kit — [Windows Aero Glass]',
      heading: 'Otimizador de Desempenho & Tokens',
      description: 'Inspirado na icônica era Frutiger Aero do Windows 7: transparências cristalinas, brilhos especulares, reflexos aquáticos e a sensação nostálgica e polida de software desktop clássico.',
      status: 'Frutiger Aero · Em breve',
      tag: 'Aero Glass 2007-2012',
      roadmap: true
    },
    cyber: {
      className: 'theme-cyberpunk',
      title: 'DEV_AUTOMATION_KIT // [CYBER_NEON_v0.1.3-alpha]',
      heading: 'SYSTEM_DIAGNOSTICS_ACTIVE',
      description: 'Paleta agressiva de alto contraste com ciano elétrico e magenta neon, linhas de varredura CRT e visual utilitário terminal de ficção científica.',
      status: 'CYBERPUNK HUD · Em desenvolvimento',
      tag: 'KERNEL://SYNAPSE_v9',
      roadmap: true
    }
  };

  if (themePreview && themeButtons.length) {
    const themeClasses = Object.values(themeConfig).map(theme => theme.className);

    function selectTheme(button) {
      const theme = themeConfig[button.getAttribute('data-theme')];
      if (!theme) return;

      themeButtons.forEach(tab => {
        const selected = tab === button;
        tab.classList.toggle('active', selected);
        tab.setAttribute('aria-selected', String(selected));
        tab.setAttribute('tabindex', selected ? '0' : '-1');
      });
      themePreview.classList.remove(...themeClasses);
      themePreview.classList.add(theme.className);
      themePreview.setAttribute('aria-labelledby', button.id);
      if (themeTitle) themeTitle.textContent = theme.title;
      if (themeHeading) themeHeading.textContent = theme.heading;
      if (themeDescription) themeDescription.textContent = theme.description;
      if (themeTag) themeTag.textContent = theme.tag;
      if (themeStatus) {
        themeStatus.textContent = theme.status;
        themeStatus.classList.toggle('is-roadmap', Boolean(theme.roadmap));
      }
    }

    themeButtons.forEach((button, index) => {
      button.addEventListener('click', () => selectTheme(button));
      button.addEventListener('keydown', event => {
        let nextIndex;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % themeButtons.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + themeButtons.length) % themeButtons.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = themeButtons.length - 1;
        else return;
        event.preventDefault();
        selectTheme(themeButtons[nextIndex]);
        themeButtons[nextIndex].focus();
      });
    });

    selectTheme(themeButtons.find(button => button.classList.contains('active')) || themeButtons[0]);
  }

  /* =========================================================================
     2. MODAL DE DOWNLOAD & DOAÇÃO (WINRAR / ITCH.IO STYLE)
     ========================================================================= */
  const downloadModal = document.getElementById('download-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalSelectedFile = document.getElementById('modal-selected-file');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const btnModalSupport = document.getElementById('btn-modal-support');
  const btnModalFreeDownload = document.getElementById('btn-modal-free-download');
  const modalContentNormal = document.getElementById('modal-content-normal');
  const modalContentThankyou = document.getElementById('modal-content-thankyou');

  const defaultTargetFile = 'https://github.com/AlanClimaco/dev-automation-kit-web/releases/download/v0.1.3-alpha/DevAutomationKit-Setup-0.1.3-alpha.exe';
  let currentTargetFile = defaultTargetFile;
  let modalOpener = null;
  let thankyouTimeout = null;

  function openModal(fileName) {
    clearTimeout(thankyouTimeout);
    thankyouTimeout = null;
    modalOpener = document.activeElement;
    currentTargetFile = fileName || defaultTargetFile;
    if (modalSelectedFile) {
      modalSelectedFile.textContent = currentTargetFile.split('/').pop();
    }

    if (modalContentNormal) modalContentNormal.hidden = false;
    if (modalContentThankyou) modalContentThankyou.hidden = true;
    if (btnModalSupport) btnModalSupport.disabled = false;

    if (downloadModal) {
      downloadModal.classList.remove('inactive');
      downloadModal.classList.add('active');
      downloadModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const modalDialog = downloadModal.querySelector('.modal-dialog');
      if (modalDialog) modalDialog.scrollTop = 0;
      if (closeModalBtn) closeModalBtn.focus();
    }
  }

  function closeModal() {
    clearTimeout(thankyouTimeout);
    thankyouTimeout = null;
    if (downloadModal) {
      downloadModal.classList.remove('active');
      downloadModal.classList.add('inactive');
      document.body.style.overflow = '';
      if (modalOpener) modalOpener.focus();
      downloadModal.setAttribute('aria-hidden', 'true');
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-download-target') || defaultTargetFile;
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
    if (e.key === 'Tab' && downloadModal && downloadModal.classList.contains('active')) {
      const focusable = Array.from(downloadModal.querySelectorAll('button, input, a[href]'))
        .filter(element => element.getClientRects().length && !element.disabled);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
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
     3. COPIAR CHAVE PIX & TOAST NOTIFICATION
     ========================================================================= */
  const copyPixBtn = document.getElementById('copy-pix-btn');
  const pixKeyInput = document.getElementById('pix-key-input');
  const copyPixText = document.getElementById('copy-pix-text');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  const pixCode = '00020101021126580014br.gov.bcb.pix013676f14e3c-6148-4c4a-a053-9847c7ad69365204000053039865802BR5917ALAN DO N CLIMACO6011NOVA MAMORE62070503***6304A8F1';
  let toastTimeout;

  if (pixKeyInput) pixKeyInput.value = pixCode;

  function showToast(message, duration = 3200, icon = 'check') {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    if (toastIcon) {
      const iconElement = document.createElement('i');
      iconElement.setAttribute('data-lucide', icon);
      iconElement.className = 'w-3.5 h-3.5';
      toastIcon.replaceChildren(iconElement);
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  if (copyPixBtn && pixKeyInput) {
    copyPixBtn.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard || !window.isSecureContext) {
          throw new Error('Clipboard API indisponível');
        }
        await navigator.clipboard.writeText(pixCode);

        if (copyPixText) copyPixText.textContent = 'Copiado!';
        copyPixBtn.classList.add('bg-[#2ea043]/20', 'text-[#3fb950]', 'border-[#2ea043]/40');
        showToast('Chave Pix copiada com sucesso! Obrigado pelo café', 3200, 'coffee');

        setTimeout(() => {
          if (copyPixText) copyPixText.textContent = 'Copiar Chave Pix';
          copyPixBtn.classList.remove('bg-[#2ea043]/20', 'text-[#3fb950]', 'border-[#2ea043]/40');
        }, 2200);

      } catch (err) {
        pixKeyInput.focus();
        pixKeyInput.select();
        showToast('Selecione e copie manualmente o código Pix.', 3200, 'circle-alert');
      }
    });
  }

  /* =========================================================================
     4. DOWNLOAD DOS BINÁRIOS & APOIO OPCIONAL
     ========================================================================= */
  function triggerDownload(fileName) {
    if (!fileName) return;

    const downloadName = fileName.split('/').pop();
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = fileName;
    downloadAnchor.setAttribute('download', downloadName);
    downloadAnchor.hidden = true;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);

    showToast(`Iniciando download de ${downloadName}...`, 3200, 'download');
  }

  if (btnModalFreeDownload) {
    btnModalFreeDownload.addEventListener('click', () => {
      triggerDownload(currentTargetFile);
      closeModal();
    });
  }

  if (btnModalSupport) {
    btnModalSupport.addEventListener('click', () => {
      if (btnModalSupport.disabled) return;
      btnModalSupport.disabled = true;
      if (modalContentNormal && modalContentThankyou) {
        modalContentNormal.hidden = true;
        modalContentThankyou.hidden = false;
        modalContentThankyou.focus();
      }
      triggerDownload(currentTargetFile);
      thankyouTimeout = setTimeout(closeModal, 2000);
    });
  }

  /* =========================================================================
     5. FORMULÁRIO DE CONTATO / FEEDBACK (FORMSPREE AJAX + STATUS MODAL)
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
      if (submitBtn && submitBtn.disabled) return;

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

        const response = await fetch('https://formspree.io/f/mdeavpvg', {
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
