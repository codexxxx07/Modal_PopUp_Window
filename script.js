(function () {
  'use strict';

  const elements = {
    openModalBtn: document.getElementById('openModalBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    overlay: document.getElementById('overlay'),
    modal: document.getElementById('modal'),
    contactForm: document.getElementById('contactForm'),
    nameInput: document.getElementById('name'),
    emailInput: document.getElementById('email'),
    messageInput: document.getElementById('message'),
    messageOverlay: document.getElementById('messageOverlay'),
    messageBox: document.getElementById('messageBox'),
    messageText: document.getElementById('messageText'),
    messageOkBtn: document.getElementById('messageOkBtn'),
    themeToggle: document.getElementById('themeToggle'),
    themeToggleIcon: document.getElementById('themeToggleIcon')
  };

  let isAnimating = false;
  let isMessageAnimating = false;
  let isSubmitting = false;
  let messageOnClose = null;

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showMessage(message, onClose) {
    if (!elements.messageOverlay || !elements.messageBox || !elements.messageText || isMessageAnimating) {
      return;
    }

    messageOnClose = typeof onClose === 'function' ? onClose : null;
    elements.messageText.textContent = message;

    isMessageAnimating = true;
    elements.messageOverlay.classList.remove('hidden');
    elements.messageOverlay.classList.add('flex');

    elements.messageOverlay.classList.add('overlay-enter');
    elements.messageBox.classList.add('modal-enter');

    requestAnimationFrame(() => {
      if (!elements.messageOverlay || !elements.messageBox) return;

      elements.messageOverlay.classList.remove('overlay-enter');
      elements.messageOverlay.classList.add('overlay-enter-active');
      elements.messageBox.classList.remove('modal-enter');
      elements.messageBox.classList.add('modal-enter-active');

      setTimeout(() => {
        if (!elements.messageOverlay || !elements.messageBox) return;
        elements.messageOverlay.classList.remove('overlay-enter-active');
        elements.messageBox.classList.remove('modal-enter-active');
        isMessageAnimating = false;
      }, 300);
    });
  }

  function closeMessage() {
    if (!elements.messageOverlay || !elements.messageBox || isMessageAnimating) return;

    isMessageAnimating = true;

    elements.messageOverlay.classList.add('overlay-exit');
    elements.messageBox.classList.add('modal-exit');

    requestAnimationFrame(() => {
      if (!elements.messageOverlay || !elements.messageBox) return;

      elements.messageOverlay.classList.remove('overlay-exit');
      elements.messageOverlay.classList.add('overlay-exit-active');
      elements.messageBox.classList.remove('modal-exit');
      elements.messageBox.classList.add('modal-exit-active');

      setTimeout(() => {
        if (!elements.messageOverlay || !elements.messageBox) return;
        elements.messageOverlay.classList.remove('overlay-exit-active');
        elements.messageBox.classList.remove('modal-exit-active');
        elements.messageOverlay.classList.add('hidden');
        elements.messageOverlay.classList.remove('flex');

        const callback = messageOnClose;
        messageOnClose = null;
        isMessageAnimating = false;

        if (callback) callback();
      }, 300);
    });
  }

  function validateForm() {
    const name = elements.nameInput?.value.trim() || '';
    const email = elements.emailInput?.value.trim() || '';
    const message = elements.messageInput?.value.trim() || '';

    if (!name || !email || !validateEmail(email) || !message) {
      showMessage('Please fill all required fields');
      return false;
    }

    return true;
  }

  function openModal() {
    if (!elements.overlay || !elements.modal || isAnimating) return;

    isAnimating = true;
    document.body.style.overflow = 'hidden';
    elements.overlay.classList.remove('hidden');
    elements.overlay.classList.add('flex');

    elements.overlay.classList.add('overlay-enter');
    elements.modal.classList.add('modal-enter');

    requestAnimationFrame(() => {
      if (!elements.overlay || !elements.modal) return;

      elements.overlay.classList.remove('overlay-enter');
      elements.overlay.classList.add('overlay-enter-active');
      elements.modal.classList.remove('modal-enter');
      elements.modal.classList.add('modal-enter-active');

      setTimeout(() => {
        if (!elements.overlay || !elements.modal) return;
        elements.overlay.classList.remove('overlay-enter-active');
        elements.modal.classList.remove('modal-enter-active');
        isAnimating = false;
      }, 300);
    });
  }

  function closeModal() {
    if (!elements.overlay || !elements.modal || isAnimating) return;

    isAnimating = true;

    elements.overlay.classList.add('overlay-exit');
    elements.modal.classList.add('modal-exit');

    requestAnimationFrame(() => {
      if (!elements.overlay || !elements.modal) return;

      elements.overlay.classList.remove('overlay-exit');
      elements.overlay.classList.add('overlay-exit-active');
      elements.modal.classList.remove('modal-exit');
      elements.modal.classList.add('modal-exit-active');

      setTimeout(() => {
        if (!elements.overlay || !elements.modal) return;
        elements.overlay.classList.remove('overlay-exit-active');
        elements.modal.classList.remove('modal-exit-active');
        elements.overlay.classList.add('hidden');
        elements.overlay.classList.remove('flex');
        document.body.style.overflow = '';
        isAnimating = false;
      }, 300);
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (isSubmitting || !validateForm()) return;

    isSubmitting = true;

    elements.contactForm?.reset();

    showMessage('Thank you for your message!', () => {
      closeModal();
      setTimeout(() => {
        isSubmitting = false;
      }, 300);
    });
  }

  function initThemeToggle() {
    const root = document.documentElement;

    root.classList.remove('dark');

    if (elements.themeToggleIcon) {
      elements.themeToggleIcon.textContent = '🌙';
    }

    if (!elements.themeToggle) return;

    elements.themeToggle.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      if (elements.themeToggleIcon) {
        elements.themeToggleIcon.textContent = isDark ? '☀️' : '🌙';
      }
    });
  }

  function init() {
    initThemeToggle();

    if (elements.openModalBtn) {
      elements.openModalBtn.addEventListener('click', openModal);
    }

    if (elements.closeModalBtn) {
      elements.closeModalBtn.addEventListener('click', closeModal);
    }

    if (elements.overlay) {
      elements.overlay.addEventListener('click', (e) => {
        if (e.target === elements.overlay) {
          closeModal();
        }
      });
    }

    if (elements.messageOkBtn) {
      elements.messageOkBtn.addEventListener('click', closeMessage);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;

      if (elements.messageOverlay && !elements.messageOverlay.classList.contains('hidden')) {
        closeMessage();
        return;
      }

      if (elements.overlay && !elements.overlay.classList.contains('hidden')) {
        closeModal();
      }
    });

    if (elements.contactForm) {
      elements.contactForm.addEventListener('submit', handleFormSubmit);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
