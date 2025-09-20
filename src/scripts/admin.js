import { fetchGetApiEndpointData } from "./get_api_server_data";
import { createAdminsShowsGallery } from "./create_admin_shows_gallery.js";
import { createAdminsImageGallery } from "./create_admin_image_gallery.js";
import { API_GALLERY_ENDPOINT, API_SHOWS_ENDPOINT, API_SLIDER_ENDPOINT, API_BASE_URL } from "../variables";


export function initAdminPage() {
        const links = document.querySelectorAll('.admin-navigation a');
        const template = {
            slider: slider,
            shows: shows,
            gallery: gallery,
            tickets: tickets,
        }
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = document.querySelector('.view');
                if (!view) return;
                
                const viewName = link.getAttribute('data-view');
                document.getElementById('view').innerHTML = '';    
                template[viewName]();
                links.forEach(l => l.classList.remove('active-link'));
                link.classList.add('active-link');
            });
        });
};

export async function slider() {
    const container = document.getElementById('view');
    container.innerHTML = '';
    const slider_data = await fetchGetApiEndpointData(API_BASE_URL + API_SLIDER_ENDPOINT);
    createAdminsImageGallery(slider_data, API_BASE_URL + API_SLIDER_ENDPOINT);
}

export async function shows() {
    const shows_data = await fetchGetApiEndpointData(API_BASE_URL + API_SHOWS_ENDPOINT);
    createAdminsShowsGallery(shows_data, API_BASE_URL + API_SHOWS_ENDPOINT)
}

export async function gallery() {
    const container = document.getElementById('view');
    container.innerHTML = '';
    const gallery_data = await fetchGetApiEndpointData(API_BASE_URL + API_GALLERY_ENDPOINT);
    createAdminsImageGallery(gallery_data, API_BASE_URL + API_GALLERY_ENDPOINT);
}

function tickets() {

    return '<h2>Tickets Content</h2>';
}