export function burgerHeader() {
  const burger = document.getElementById('burger-button');
  const nav = document.getElementById('main-nav');

  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.classList.toggle('close');
  });


  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.classList.remove('close');
    }
  });


  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      nav.classList.remove('open');
      burger.classList.remove('close');
    }
  });
}