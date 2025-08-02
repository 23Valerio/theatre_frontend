// import { slider_images } from '../variables.js';

function sliderImagesHtml(list_of_images) {
   let slider_html = '';
   for (let i = 0; i < list_of_images.length; i++) {
      slider_html += '\n<div class="carousel__item"> \n<img src="slider/' +
                     list_of_images[i] +
                     '" alt="tresk image">\n</div>'
    }
    return slider_html
}

export function createSlider(slider_images) {
   const slider = document.createElement('div');
   slider.innerHTML = `
      <div class="carousel">
         ${sliderImagesHtml(slider_images)}
      </div>
      <div class="carousel__btns">
         <button class="carousel__btn" id="leftBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m15 4l2 2l-6 6l6 6l-2 2l-8-8z"/></svg></button>
         <button class="carousel__btn" id="rightBtn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"/></svg></button>
      </div>
      `;
   slider.className = 'body-carousel';

   const carousel = slider.querySelector('.carousel');
   const carousel_clases = ['carousel__item--left-end', 
                            'carousel__item--left', 
                            'carousel__item--main', 
                            'carousel__item--right', 
                            'carousel__item--right-end'];
   if (carousel) {
      const children = carousel.children;
      children[0].classList.add('carousel__item--left-end');
      children[1].classList.add('carousel__item--left');
      children[2].classList.add('carousel__item--main');
      children[3].classList.add('carousel__item--right');
      children[4].classList.add('carousel__item--right-end');
   };

   const leftBtn = slider.querySelector('#leftBtn');
   const rightBtn = slider.querySelector('#rightBtn');
   let index_array = [];
   for (let i = 0; i < slider_images.length; i++) {
      index_array.push(i);
   }

   rightBtn.addEventListener('click', function () {
      const carousel = slider.querySelector('.carousel');
      const children = carousel.children;
      for (let i = 0; i < children.length; i++) {
         children[i].className = 'carousel__item';
      }
      let first_element = index_array.shift();
      index_array.push(first_element);
      for (let i = 0; i < index_array.length; i++) {
         children[index_array[i]].classList.add(carousel_clases[i]);
      }
   });

   leftBtn.addEventListener('click', function () {
      const carousel = slider.querySelector('.carousel');
      const children = carousel.children;
      for (let i = 0; i < children.length; i++) {
         children[i].className = 'carousel__item';
      }
      index_array.unshift(index_array.pop());
      console.log(index_array);
      for (let i = 0; i < index_array.length; i++) {
         children[index_array[i]].classList.add(carousel_clases[i]);
      }
   });

   return slider;
}