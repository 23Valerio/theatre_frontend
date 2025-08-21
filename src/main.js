import './scss/style.scss'
import { gallery_images } from './variables.js';
import { createGallery } from './scripts/about.js';
import { createHome } from './scripts/home.js';
import { createProgram } from './scripts/program.js';
import { theatre_shows } from './variables.js';

async function loadContent(route) {
  const app = document.getElementById('app');
  let content;

  switch (route) {
    case 'home':
      app.innerHTML = '';
      createHome(app);
      break;
    case 'contacts':
      content = await (await fetch('/src/components/contacts.html')).text();
      app.innerHTML = content; 
      break;
    case 'about':
      content = await (await fetch('/src/components/about.html')).text();
      app.innerHTML = content; 
      const gallery = document.getElementById('gallery');
      createGallery(gallery, gallery_images)
      break;
    case 'program':
      app.innerHTML = '';
      createProgram(app, theatre_shows);
      break;
    case 'partners':
      content = await (await fetch('/src/components/partners.html')).text();
      app.innerHTML = content; 
      break;  
    default:
      content = createHome();
      app.innerHTML = '';
      app.appendChild(content);
  }
}

// Обработка кликов по ссылкам
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('data-route')) {
    e.preventDefault(); // Предотвращаем стандартное поведение ссылки
    const route = e.target.getAttribute('data-route');
    loadContent(route);
    history.pushState({ route }, '', `#${route}`); // Обновляем URL без перезагрузки
  }
});

// Обработка изменения URL (назад/вперед в браузере)
window.addEventListener('popstate', () => {
  const hash = window.location.hash.slice(1) || 'home';
  loadContent(hash);
});

// Инициализация при загрузке страницы
window.addEventListener('load', () => {
  loadContent(window.location.hash.slice(1) || 'home');
});

