import { fetchGetApiEndpointData } from "./get_api_server_data";
import { parseDataForImages } from "./parse_data_for_images.js";
import { deleteRequestByID } from "./delete_request_by_ID.js";
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

function createAdminsImageGallery(data, api_endpoint) {
    const gallery = document.getElementById('view');
    const image_gallery = document.createElement('div');

    image_gallery.classList.add('images');
    data.forEach(item => {
        const image_container = document.createElement('div');
        image_container.classList.add('image-container');
        
        const img = document.createElement('img');
        img.src = item.image;
        image_container.appendChild(img);
        const delete_btn = document.createElement('button');
        delete_btn.textContent = 'Удалить';
        delete_btn.classList.add('delete-btn');
        delete_btn.id = item.id;
        image_container.appendChild(delete_btn);
        delete_btn.addEventListener('click', () => {
            image_container.remove();
            deleteRequestByID(api_endpoint, delete_btn.id);
        });
        image_gallery.appendChild(image_container);
    });
    gallery.appendChild(image_gallery);
}

function changeShowViewByID(id, img_url) {
    const show_card = document.querySelector(`button[id='${id}']`).closest('.admin-show-card');
    const inputs = show_card.querySelectorAll('input');
    inputs.forEach(input => {
        input.readOnly = false;
        input.style.border = '1px solid #f0a420';
        input.style.backgroundColor = '#fff';
        input.style.padding = '2px';
    });

    const date_input = show_card.querySelector('#date');
    date_input.type = 'datetime_local';

    const pre_image = document.createElement('label');
    pre_image.textContent = 'Изображение: ' + img_url.split('/').pop();
    const image = document.createElement('input');
    image.id = 'image';
    image.type = 'file';
    image.accept = 'image/*';
    pre_image.appendChild(image);
    show_card.querySelector('.admin-info-container').appendChild(pre_image);

    const confirm_btn = document.createElement('button');
    confirm_btn.textContent = 'Подтвердить';
    confirm_btn.classList.add('show-delete-btn');
    show_card.querySelector('.admin-info-container').appendChild(confirm_btn);
    confirm_btn.addEventListener('click', () => {
        changeShowDataByID();
    });

}

function createAdminsShowsGallery(data, api_endpoint) {
    const view = document.getElementById('view');
    const shows_container = document.createElement('div');
    shows_container.classList.add('admin-shows-container');
    data.forEach(item => {
        const show_card = document.createElement('div');
        show_card.classList.add('admin-show-card');
        const show_item = document.createElement('div');
        show_item.classList.add('admin-show-item');

        const image_container = document.createElement('div');
        image_container.classList.add('admin-image-container');
        const img = document.createElement('img');
        img.src = item.image;
        image_container.appendChild(img);
        show_item.appendChild(image_container);

        const info_container = document.createElement('form');
        
        info_container.classList.add('admin-info-container');

        const pre_name = document.createElement('label');
        pre_name.textContent = 'Название: ';
        const name = document.createElement('input');
        name.value = item.name;
        name.id = 'name';
        name.readOnly = true;
        pre_name.appendChild(name);
        info_container.appendChild(pre_name);

        const pre_description = document.createElement('label');
        pre_description.textContent = 'Описание: ';
        const description = document.createElement('input');
        description.value = item.description;
        description.id = 'description';
        description.readOnly = true;
        pre_description.appendChild(description);
        info_container.appendChild(pre_description);

        const pre_place = document.createElement('label');
        pre_place.textContent = 'Место: ';
        const place = document.createElement('input');
        place.value = item.place;
        place.id = 'place';
        place.readOnly = true;
        pre_place.appendChild(place);
        info_container.appendChild(pre_place);

        const pre_date = document.createElement('label');
        pre_date.textContent = 'Дата и время: ';
        const show_date = document.createElement('input');
        show_date.id = 'date';
        show_date.readOnly = true;
        const date = new Date(item.date);
        show_date.value = date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        pre_date.appendChild(show_date);
        info_container.appendChild(pre_date);

        show_item.appendChild(info_container);
        show_card.appendChild(show_item);

        const buttons_container = document.createElement('div');
        buttons_container.classList.add('admin-buttons-container');
        show_card.appendChild(buttons_container);


        const change_btn = document.createElement('button');
        change_btn.textContent = 'Изменить';
        change_btn.classList.add('show-delete-btn');
        change_btn.id = item.id;
        buttons_container.appendChild(change_btn);
        change_btn.addEventListener('click', () => {
            image_container.remove();
            changeShowViewByID(change_btn.id, item.image);
        });

        const delete_btn = document.createElement('button');
        delete_btn.textContent = 'Удалить';
        delete_btn.classList.add('show-delete-btn');
        delete_btn.classList.add('red-hower');
        delete_btn.id = item.id;
        buttons_container.appendChild(delete_btn);
        delete_btn.addEventListener('click', () => {
            image_container.remove();
            deleteRequestByID(api_endpoint, delete_btn.id);
        });
        
        shows_container.appendChild(show_card);
        view.appendChild(shows_container);
    });
}




async function slider() {
    const slider_data = await fetchGetApiEndpointData(API_SLIDER_ENDPOINT);
    createAdminsImageGallery(slider_data, API_BASE_URL + API_SLIDER_ENDPOINT);
}

async function shows() {
    const shows_data = await fetchGetApiEndpointData(API_SHOWS_ENDPOINT);
    createAdminsShowsGallery(shows_data, API_BASE_URL + API_SHOWS_ENDPOINT)
}

async function gallery() {
    const gallery_data = await fetchGetApiEndpointData(API_GALLERY_ENDPOINT);
    createAdminsImageGallery(gallery_data, API_BASE_URL + API_GALLERY_ENDPOINT);
}

function tickets() {

    return '<h2>Tickets Content</h2>';
}