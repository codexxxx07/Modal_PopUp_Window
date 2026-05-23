const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const contactForm = document.getElementById('contactForm');
let isAnimating = false;

function openModal() {
  if (isAnimating) return;
  isAnimating = true;
  document.body.style.overflow = 'hidden';
  overlay.classList.remove('hidden');
  overlay.classList.add('flex');

  overlay.classList.add('overlay-enter');
  modal.classList.add('modal-enter');

  requestAnimationFrame(() => {
    overlay.classList.remove('overlay-enter');
    overlay.classList.add('overlay-enter-active');
    modal.classList.remove('modal-enter');
    modal.classList.add('modal-enter-active');

    setTimeout(() => {
      overlay.classList.remove('overlay-enter-active');
      modal.classList.remove('modal-enter-active');
      isAnimating = false;
    }, 300);
  });
}

function closeModal() {
  if (isAnimating) return;
  isAnimating = true;

  overlay.classList.add('overlay-exit');
  modal.classList.add('modal-exit');

  requestAnimationFrame(() => {
    overlay.classList.remove('overlay-exit');
    overlay.classList.add('overlay-exit-active');
    modal.classList.remove('modal-exit');
    modal.classList.add('modal-exit-active');

    setTimeout(() => {
      overlay.classList.remove('overlay-exit-active');
      modal.classList.remove('modal-exit-active');
      overlay.classList.add('hidden');
      overlay.classList.remove('flex');
      document.body.style.overflow = '';
      isAnimating = false;
    }, 300);
  });
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
    closeModal();
  }
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your message!');
  contactForm.reset();
  closeModal();
});
