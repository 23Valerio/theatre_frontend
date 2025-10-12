import { fetchGetApiEndpointData } from "./get_api_server_data";
import { createAdminsShowsGallery } from "./create_admin_shows_gallery.js";
import { createAdminsImageGallery } from "./create_admin_image_gallery.js";
import { getTickets } from "./get_show_tickets_request.js"; 
import { createAdminsTicketsGallery } from "./create_admins_tickets_gallery.js";
import { API_GALLERY_ENDPOINT, API_SHOWS_ENDPOINT, API_SLIDER_ENDPOINT, API_BASE_URL } from "../variables";


export function initAdminPage() {
    localStorage.removeItem('token'); // delete the token
    localStorage.removeItem('user'); // delete the username 
    localStorage.removeItem('email'); // delete the email

    const links = document.querySelectorAll('.admin-navigation a');
    const template = {
            slider: slider,
            shows: shows,
            gallery: gallery,
            tickets: tickets,
    }

    const loginPopup = document.querySelector('.login-popup-container');
    loginPopup.style.display = 'flex';
    links.forEach(link => {
        link.style.pointerEvents = 'none';
    });
    
    document.addEventListener('adminLoggedIn', () => {
        loginPopup.style.display = 'none'; // сховати попап
        links.forEach(link => {
            link.style.pointerEvents = 'auto';

        });
    });

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = document.querySelector('.view');
                if (!view) return;
                
                const viewName = link.getAttribute('data-view');
                document.getElementById('view').innerHTML = '';    
                template[viewName]();
                links.forEach(l => {
                    l.classList.remove('active-link');
                });
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
    createAdminsShowsGallery(shows_data)
}

export async function gallery() {
    const container = document.getElementById('view');
    container.innerHTML = '';
    const gallery_data = await fetchGetApiEndpointData(API_BASE_URL + API_GALLERY_ENDPOINT);
    createAdminsImageGallery(gallery_data, API_BASE_URL + API_GALLERY_ENDPOINT);
}

export async function tickets() {
    const container = document.getElementById('view');
    container.innerHTML = '';
    const token = localStorage.getItem('token');
    const tickets_data = await getTickets(token);
    createAdminsTicketsGallery(tickets_data);
}