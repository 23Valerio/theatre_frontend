import './scss/style.scss'
import { createHeader } from './components/header.js';
import { createSlider } from './components/slider.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.prepend(createSlider());
  app.prepend(createHeader());

  // app.append(createFooter());
});




