import lightGallery from 'lightgallery';

export function createGallery(list_of_images) {
    const gallery = document.createElement('div');
    console.log(list_of_images);
    list_of_images.forEach(item => {
        
        const gallery_link = document.createElement('a');
        gallery_link.className = "gallery-link";
        gallery_link.href = '/gallery/' + item;

        const gallery_img = document.createElement('img');
        gallery_img.className = "gallery-img";
        gallery_img.src  = '/gallery/' + item;
        gallery_link.appendChild(gallery_img);

        gallery.appendChild(gallery_link);
        });

    lightGallery(document.querySelector('.about-gallery'))
    return gallery;
}





