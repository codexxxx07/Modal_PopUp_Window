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
    messageInput: document.getElementById('message')
  };

  let isAnimating = false;
  let isSubmitting = false;

  function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateForm() {
    const name = elements.nameInput?.value.trim() || '';
    const email = elements.emailInput?.value.trim() || '';
    const message = elements.messageInput?.value.trim() || '';

    if (!name) {
      alert('Please enter your name.');
      elements.nameInput?.focus();
      return false;
    }

    if (!email) {
      alert('Please enter your email.');
      elements.emailInput?.focus();
      return false;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      elements.emailInput?.focus();
      return false;
    }

    if (!message) {
      alert('Please enter your message.');
      elements.messageInput?.focus();
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

    const sanitizedName = sanitizeInput(elements.nameInput?.value);
    const sanitizedEmail = sanitizeInput(elements.emailInput?.value);
    const sanitizedMessage = sanitizeInput(elements.messageInput?.value);

    alert('Thank you for your message!');

    elements.contactForm?.reset();
    closeModal();

    setTimeout(() => {
      isSubmitting = false;
    }, 1000);
  }

  function init() {
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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.overlay && !elements.overlay.classList.contains('hidden')) {
        closeModal();
      }
    });

    if (elements.contactForm) {
      elements.contactForm.addEventListener('submit', handleFormSubmit);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
