import { deleteRequestByID } from './delete_request_by_ID.js';
import { sendPatchImage } from './send_patch_image.js';
import { API_BASE_URL, API_GALLERY_ENDPOINT } from '../variables.js';
import { slider, gallery } from './admin.js';


export function createAdminsImageGallery(data, api_endpoint) {
    const gallery_container = document.getElementById('view');
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

    const add_image_container = document.createElement('div');
    add_image_container.classList.add('image-container');
    image_gallery.appendChild(add_image_container);

    const pre_image = document.createElement('label');
    pre_image.classList.add('add-file-input');
    pre_image.textContent = 'Добавить изображение: ';
    const image = document.createElement('input');
    image.id = 'image';
    image.type = 'file';
    image.accept = 'image/*';
    pre_image.appendChild(image);
    add_image_container.appendChild(pre_image);
    const add_btn = document.createElement('button');
    add_btn.style.display = 'none';
    add_btn.textContent = 'Добавить';
    add_btn.classList.add('delete-btn');
    add_btn.classList.add('green-hower');
    add_btn.type = 'button';
    image.addEventListener('change', () => {
        if (image.files.length > 0) {
            add_btn.style.display = 'block';
        }
    });
    add_btn.addEventListener('click', async () => {
        const new_image_file = add_image_container.querySelector('#image');
        if (new_image_file.files.length > 0 && new_image_file) {
            await sendPatchImage(api_endpoint, new_image_file.files[0]);
        };
        (api_endpoint === API_BASE_URL + API_GALLERY_ENDPOINT) ? gallery() : slider();
});
    add_image_container.appendChild(add_btn);
    gallery_container.appendChild(image_gallery);
};