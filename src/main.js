import './scss/style.scss'
import { createGallery } from './scripts/about.js';
import { createHome } from './scripts/home.js';
import { createProgram } from './scripts/program.js';
import { initAdminPage } from './scripts/admin.js';




async function loadContent(route) {
  const app = document.getElementById('app');
  let content;

    switch (route) {
    case '/':
    case '/home':
      app.innerHTML = '';
      createHome(app);
      break;

    case '/contacts':
      content = await (await fetch('/src/components/contacts.html')).text();
      app.innerHTML = content;
      break;

    case '/about':
      content = await (await fetch('/src/components/about.html')).text();
      app.innerHTML = content;
      createGallery();
      break;

    case '/program':
      app.innerHTML = '';
      createProgram(app);
      break;

    case '/partners':
      content = await (await fetch('/src/components/partners.html')).text();
      app.innerHTML = content;
      break;

    case '/admin':
      content = await (await fetch('/src/components/admin.html')).text();
      app.innerHTML = content;
      initAdminPage();
      break;

    default:
      app.innerHTML = '';
      createHome(app);
  }
}

// Обработка кликов по ссылкам
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('data-route')) {
    e.preventDefault(); // Предотвращаем стандартное поведение ссылки
    const route = e.target.getAttribute('data-route');
    history.pushState({}, '', route);    
    loadContent(route);
  }
});

// Обработка изменения URL (назад/вперед в браузере)
window.addEventListener('popstate', () => {
  loadContent(window.location.pathname || '/');
});

// Инициализация при загрузке страницы
window.addEventListener('load', () => {
  loadContent(window.location.pathname || '/');
});

