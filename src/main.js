import './scss/style.scss'
import { createHeader } from './components/header.js';
import { createSlider } from './components/slider.js';
import { createShows } from './components/shows.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.prepend(createSlider());
  app.prepend(createHeader());
  app.append(createShows());
});




