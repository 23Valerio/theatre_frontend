import { createSlider } from './slider.js';
import { createShows } from './shows.js';
import { theatre_shows } from '../variables.js';
import { slider_images } from '../variables.js';

export function createHome(app) {
    
    const title_tresk = document.createElement('h1');
    title_tresk.textContent = "Молодой Пражский театр Треск!";

    app.appendChild(title_tresk);
    app.append(createSlider(slider_images));
    app.append(createShows(theatre_shows));
}