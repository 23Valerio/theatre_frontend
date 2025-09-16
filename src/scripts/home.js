import { createSlider } from './slider.js';
import { createShows } from './shows.js';
import { API_SLIDER_ENDPOINT, API_SHOWS_ENDPOINT } from '../variables.js';
import { parseDataForImages } from './parse_data_for_images.js';
import { fetchGetApiEndpointData } from './get_api_server_data.js';

export async function createHome(app) {
    
    const title_tresk = document.createElement('h1');
    title_tresk.textContent = "Молодой Пражский театр Треск!";
    
    const slider_data = await fetchGetApiEndpointData(API_SLIDER_ENDPOINT);
    const slider_images = await parseDataForImages(slider_data);

    const theatre_shows_data = await fetchGetApiEndpointData(API_SHOWS_ENDPOINT);

    app.appendChild(title_tresk);
    app.append(createSlider(slider_images));
    app.append(createShows(theatre_shows_data));
}