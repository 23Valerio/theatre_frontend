import { deleteRequestByID } from './delete_request_by_ID.js';
import { changeShowViewByID } from './change_show_view_by_id.js';
import { shows } from "./admin.js";
import { sendPostDataShow } from "./send_post_show.js";
import { fetchGetApiEndpointData } from './get_api_server_data.js';
import { API_BASE_URL, API_FUTURE_SHOWS_ENDPOINT, API_SHOWS_ENDPOINT } from '../variables.js';

export function createAdminsShowsGallery(data) {
    const view = document.getElementById('view');
    view.innerHTML = '';
    const filter_header = document.createElement('div');
    filter_header.classList.add('filter-header');
    filter_header.appendChild(showFilters())
    view.appendChild(filter_header);

    const add_button = document.createElement('button');
    add_button.textContent = 'Добавить новое шоу';
    add_button.classList.add('show-delete-btn');
    add_button.type = 'button';
    add_button.addEventListener('click', async () => {
        const admin_shows_container = document.getElementById('add-new-show-card');
        if (admin_shows_container.style.display === 'none') {
            admin_shows_container.style.display = 'flex';
            add_button.textContent = 'Закрыть форму добавления';
            return;
        } else {
            admin_shows_container.style.display = 'none';
            add_button.textContent = 'Добавить новое шоу';
        }
    });
    filter_header.appendChild(add_button);
    const shows_container = document.createElement('div');
    shows_container.classList.add('admin-shows-container');
    view.appendChild(shows_container);
    createListOfSows(data);
}


function createNewShowCard() {
    const show_card = document.createElement('div');
    show_card.classList.add('admin-show-card');
    show_card.id = 'add-new-show-card';
    show_card.style.display = 'none';
    const show_item = document.createElement('div');
    show_item.classList.add('admin-show-item');
    show_card.appendChild(show_item);

    const info_container = document.createElement('form');
        info_container.classList.add('admin-info-container');

        const pre_name = document.createElement('label');
        pre_name.textContent = 'Название: ';
        const name = document.createElement('input');
        name.id = 'name';
        name.classList.add('add-show-input');
        name.placeholder = "Название представления";
        name.required = true;
        pre_name.appendChild(name);
        info_container.appendChild(pre_name);

        const pre_description = document.createElement('label');
        pre_description.textContent = 'Описание: ';
        pre_description.style.verticalAlign = 'top';
        const description = document.createElement('textarea');
        description.rows = "3";
        description.style.width = "100%";
        description.maxLength = "1000";
        description.id = 'description';
        description.classList.add('add-show-input');
        description.placeholder = "Описание предстваления";
        description.required = true;
        pre_description.appendChild(description);
        info_container.appendChild(pre_description);

        const pre_place = document.createElement('label');
        pre_place.textContent = 'Место: ';
        const place = document.createElement('input');
        place.id = 'place';
        place.classList.add('add-show-input');
        place.placeholder = "Место представления";
        place.required = true;
        pre_place.appendChild(place);
        info_container.appendChild(pre_place);

        const pre_date = document.createElement('label');
        pre_date.textContent = 'Дата и время: ';
        const show_date = document.createElement('input');
        show_date.id = 'date';
        show_date.classList.add('add-show-input');
        show_date.type = 'datetime-local';
        show_date.required = true;
 
        pre_date.appendChild(show_date);
        info_container.appendChild(pre_date);

        const pre_image = document.createElement('label');
        pre_image.textContent = 'Изображение: ';
        const image = document.createElement('input');
        image.id = 'image';
        image.type = 'file';
        image.accept = 'image/*';
        pre_image.appendChild(image);
        info_container.appendChild(pre_image);

        show_item.appendChild(info_container);
        show_card.appendChild(show_item);

        const confirm_btn = document.createElement('button');
        confirm_btn.textContent = 'Создать новое представление';
        confirm_btn.classList.add('delete-btn', 'green-hower');

        confirm_btn.type = 'submit';
        confirm_btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const new_show_data = collectData(info_container);
            const new_image_file = info_container.querySelector('#image');
            await sendPostDataShow(API_BASE_URL + API_SHOWS_ENDPOINT, new_show_data, token, new_image_file.files[0]);
            await shows();
        });
        
        info_container.appendChild(confirm_btn);

    return show_card;
}


function collectData(show_card) {
    return {
        name: show_card.querySelector('#name').value,
        description: show_card.querySelector('#description').value,
        place: show_card.querySelector('#place').value,
        date: new Date(show_card.querySelector('#date').value).toISOString(),
    };
}

function showFilters() {
    const filters_container = document.createElement('div');
    filters_container.classList.add('filters-container');

    // checkbox for all shows
    const filter_all_shows = document.createElement('input');
    filter_all_shows.type = 'checkbox';
    filter_all_shows.id = 'all-shows';
    filter_all_shows.checked = true;
    filters_container.appendChild(filter_all_shows);

    const label_all_shows = document.createElement('label');
    label_all_shows.htmlFor = 'all-shows';
    label_all_shows.textContent = 'Показать все шоу';
    filters_container.appendChild(label_all_shows);

    // checkbox for all shows
    const filter_future_shows = document.createElement('input');
    filter_future_shows.type = 'checkbox';
    filter_future_shows.id = 'future-shows';
    filter_future_shows.checked = false;
    filters_container.appendChild(filter_future_shows);

    const label_future_shows = document.createElement('label');
    label_future_shows.htmlFor = 'future-shows';
    label_future_shows.textContent = 'Показать только будущие шоу';
    filters_container.appendChild(label_future_shows);

    function toggleCheckboxes(active_checkbox, non_active_checkbox) {
        if (active_checkbox.checked) {
            non_active_checkbox.checked = false;
        } else {
            active_checkbox.checked = true;
        }  
    };

    filter_all_shows.addEventListener('change', async () => {
        toggleCheckboxes(filter_all_shows, filter_future_shows);
        const new_data = await fetchGetApiEndpointData(API_BASE_URL + API_SHOWS_ENDPOINT);
        createListOfSows(new_data);
    });

    filter_future_shows.addEventListener('change', async () => {
        toggleCheckboxes(filter_future_shows, filter_all_shows);
        const new_data = await fetchGetApiEndpointData(API_BASE_URL + API_FUTURE_SHOWS_ENDPOINT);
        createListOfSows(new_data);
    });

    return filters_container;
};

function createListOfSows(data) {
    const container = document.querySelector('.admin-shows-container');
    container.innerHTML = '';
    container.appendChild(createNewShowCard());

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
        change_btn.name = item.id + '_change';
        buttons_container.appendChild(change_btn);
        change_btn.addEventListener('click', () => {
            image_container.remove();
            changeShowViewByID(change_btn.id, item);
        });

        const delete_btn = document.createElement('button');
        delete_btn.textContent = 'Удалить';
        delete_btn.classList.add('show-delete-btn');
        delete_btn.classList.add('red-hower');
        delete_btn.id = item.id;
        delete_btn.name = item.id + '_delete';
        buttons_container.appendChild(delete_btn);
        delete_btn.addEventListener('click', () => {
            const token = localStorage.getItem('token');
            const del_container = delete_btn.closest('.admin-show-card');
            del_container.remove();
            deleteRequestByID(API_BASE_URL + API_SHOWS_ENDPOINT, token, delete_btn.id);
        });
        
        container.appendChild(show_card);
    });
};