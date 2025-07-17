import { slider_images } from '../variables.js';


function sliderImagesHtml(slider_images) {
   let slider_html = '';
   for (let i = 0; i < slider_images.length; i++) {
      slider_html += '\n<div class="carousel__item"> \n<img src="' +
                     slider_images[i] +
                     '" alt="tresk image">\n</div>'
    }
    return slider_html
}

export function createSlider() {
   const slider = document.createElement('div');
   slider.innerHTML = `
      <div class="carousel">
         ${sliderImagesHtml(slider_images)}
         <div class="carousel__btns">
            <button class="carousel__btn" id="leftBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m15 4l2 2l-6 6l6 6l-2 2l-8-8z"/></svg></button>
            <button class="carousel__btn" id="rightBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"/></svg></button>
         </div>
      </div>
      `;
   slider.className = 'body-carousel';

   const carousel = slider.querySelector('.carousel');
   
   if (carousel) {
      const children = carousel.children;
      children[0].classList.add('carousel__item--left');
      children[1].classList.add('carousel__item--main');
      children[2].classList.add('carousel__item--right');
   };

   const carouselItems = slider.querySelectorAll('.carousel__item');
   let currentItem = slider.querySelector('.carousel__item--main');
   const leftBtn = slider.querySelector('#leftBtn');
   const rightBtn = slider.querySelector('#rightBtn');

   rightBtn.addEventListener('click', function () {
      currentItem = slider.querySelector('.carousel__item--right');
      const leftItem = slider.querySelector('.carousel__item--main');

      carouselItems.forEach(item => {
         item.className = 'carousel__item';
      });

      currentItem.classList.add('carousel__item--main');
      leftItem.classList.add('carousel__item--left');

      const currentId = Array.from(carouselItems).indexOf(currentItem);
      const rightItem = currentId === carouselItems.length - 1 ? carouselItems[0] : carouselItems[currentId + 1];
      rightItem.classList.add('carousel__item--right');
   });

   leftBtn.addEventListener('click', function () {
      currentItem = slider.querySelector('.carousel__item--left');
      const rightItem = slider.querySelector('.carousel__item--main');

      carouselItems.forEach(item => {
         item.className = 'carousel__item';
      });

      currentItem.classList.add('carousel__item--main');
      rightItem.classList.add('carousel__item--right');

      const currentId = Array.from(carouselItems).indexOf(currentItem);
      const leftItem = currentId === 0 ? carouselItems[carouselItems.length - 1] : carouselItems[currentId - 1];
      leftItem.classList.add('carousel__item--left');
   });

   return slider;
}