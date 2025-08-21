export function createGallery(gallery, gallery_images) {
    const container = gallery;

    const popup_container = document.createElement('div');
    popup_container.classList.add('popup-container');  
    popup_container.id = 'popup-container';

    const popup_image = document.createElement('img');
    popup_image.classList.add('popup-image');
    popup_image.src = gallery_images[0]; 

    const popup_span = document.createElement('span');
    popup_span.textContent = 'X'; 

    popup_container.appendChild(popup_image);
    popup_container.appendChild(popup_span);
    container.appendChild(popup_container);

    const image_gallery = document.createElement('div');
    image_gallery.classList.add('image-gallery');

    gallery_images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        image_gallery.appendChild(img);
    });

    container.appendChild(image_gallery);
    container.classList.add('about-gallery');
    

    // Обработчик клика по изображению
    image_gallery.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            popup_image.src = e.target.src; 
            popup_container.style.display = 'flex';
        }
    });

    popup_span.addEventListener('click', () => {
        popup_container.style.display = 'none';
        });
    }



