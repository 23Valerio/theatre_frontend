function sliderImagesHtml(list_of_images) {
   let slider_html = '';
   for (let i = 0; i < list_of_images.length; i++) {
      slider_html += `
         <div class="carousel__item">
            <img src="${list_of_images[i]}" alt="tresk image">
         </div>`;
   }
   return slider_html;
}

export function createSlider(slider_images) {
   const slider = document.createElement('div');
   slider.className = 'body-carousel';
   slider.innerHTML = `
      <div class="carousel">
         ${sliderImagesHtml(slider_images)}
      </div>
      <div class="carousel__btns">
         <button class="carousel__btn" id="leftBtn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
               <path fill="currentColor" fill-rule="evenodd" d="m15 4l2 2l-6 6l6 6l-2 2l-8-8z"/>
            </svg>
         </button>
         <button class="carousel__btn" id="rightBtn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
               <path fill="currentColor" fill-rule="evenodd" d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"/>
            </svg>
         </button>
      </div>
   `;

   const carousel = slider.querySelector('.carousel');
   const carousel_clases = [
      'carousel__item--left-end',
      'carousel__item--left',
      'carousel__item--main',
      'carousel__item--right',
      'carousel__item--right-end'
   ];

   let index_array = [];
   for (let i = 0; i < slider_images.length; i++) {
      index_array.push(i);
   }

   let isAnimating = false;

function updateClasses() {
   if (isAnimating) return;
   isAnimating = true;

   const children = carousel.children;

   // Додаємо клас анімації
   for (let i = 0; i < children.length; i++) {
      children[i].classList.add('carousel__item--animating');
   }

   // Прибираємо всі позиційні класи
   for (let i = 0; i < children.length; i++) {
      carousel_clases.forEach(c => children[i].classList.remove(c));
   }

   // Додаємо нові класи
   for (let i = 0; i < carousel_clases.length; i++) {
      if (index_array[i] !== undefined) {
         children[index_array[i]].classList.add(carousel_clases[i]);
      }
   }

   // Видаляємо клас анімації після завершення
   setTimeout(() => {
      for (let i = 0; i < children.length; i++) {
         children[i].classList.remove('carousel__item--animating');
      }
      isAnimating = false;
   }, 1200);
}

   function disableClicks() {
      slider.querySelectorAll('.carousel__btn').forEach(btn => {
         btn.disabled = true;
      });
      setTimeout(() => {
         slider.querySelectorAll('.carousel__btn').forEach(btn => {
            btn.disabled = false;
         });
      }, 1200);
   }

   // Стартова ініціалізація
   setTimeout(() => {
      updateClasses();
   }, 100);

   const leftBtn = slider.querySelector('#leftBtn');
   const rightBtn = slider.querySelector('#rightBtn');

   rightBtn.addEventListener('click', function () {
      if (this.disabled || isAnimating) return;
      index_array.push(index_array.shift()); // зсув вправо
      updateClasses();
      disableClicks();
   });

   leftBtn.addEventListener('click', function () {
      if (this.disabled || isAnimating) return;
      index_array.unshift(index_array.pop()); // зсув вліво
      updateClasses();
      disableClicks();
   });

   return slider;
}