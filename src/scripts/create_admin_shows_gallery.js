import { deleteRequestByID } from './delete_request_by_ID.js';
import { changeShowViewByID } from './change_show_view_by_id.js';

export function createAdminsShowsGallery(data, api_endpoint) {
    const view = document.getElementById('view');
    view.innerHTML = '';
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
            image_container.remove();
            deleteRequestByID(api_endpoint, delete_btn.id);
        });
        
        shows_container.appendChild(show_card);
        view.appendChild(shows_container);
    });
}