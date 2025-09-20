import { sendPatchDataShow } from "./send_patch_show.js";
import { sendPatchImage } from "./send_patch_image.js";
import { API_BASE_URL, API_SHOWS_ENDPOINT } from "../variables.js";

function collectData(show_card) {
    return {
        name: show_card.querySelector('#name').value,
        description: show_card.querySelector('#description').value,
        place: show_card.querySelector('#place').value,
        date: new Date(show_card.querySelector('#date').value).toISOString(),
    };
}

export function changeShowViewByID(id, show_data) {
    const show_card = document.querySelector(`button[id='${id}']`).closest('.admin-show-card');
    const change_btn = show_card.querySelector(`button[name='${id}_change']`);
    change_btn.disabled = true;
    const inputs = show_card.querySelectorAll('input');
    inputs.forEach(input => {
        input.readOnly = false;
        input.style.border = '1px solid #f0a420';
        input.style.backgroundColor = '#fff';
        input.style.padding = '2px';
    });

    const date_input = show_card.querySelector('#date');
    date_input.type = 'datetime-local';
    console.log("Date" + show_data.date);
    date_input.value = show_data.date.slice(0,16);

    const pre_image = document.createElement('label');
    pre_image.textContent = 'Изображение: ' + show_data.image.split('/').pop();
    const image = document.createElement('input');
    image.id = 'image';
    image.type = 'file';
    image.accept = 'image/*';
    pre_image.appendChild(image);
    show_card.querySelector('.admin-info-container').appendChild(pre_image);

    const confirm_btn = document.createElement('button');
    confirm_btn.textContent = 'Подтвердить';
    confirm_btn.classList.add('show-delete-btn');
    confirm_btn.type = 'button';
    show_card.querySelector('.admin-info-container').appendChild(confirm_btn);
    confirm_btn.addEventListener('click', () => {
        const changed_show_data = collectData(show_card);
        sendPatchDataShow(API_BASE_URL + API_SHOWS_ENDPOINT, id, changed_show_data);

        const new_image_file = show_card.querySelector('#image');
        if (new_image_file.files.length > 0 && new_image_file) {
            sendPatchImage(API_BASE_URL + API_SHOWS_ENDPOINT, new_image_file.files[0], id);
        }
        shows();
    });
}