export function createHeader() {
      const header = document.createElement('header');
      header.innerHTML = `
         <div class="container">
            <img class="logo" src="/Logo_Tresk.svg">   
            <button class="burger" aria-label="Toggle menu">
               <span></span><span></span><span></span>
            </button>

            <nav class="main-nav">
               <ul>
               <li><a href="#">Программа</a></li>
               <li><a href="#">О нас</a></li>
               <li><a href="#">Билеты</a></li>
               <li><a href="#">Контакты</a></li>
               <li><a href="#">Партнеры</a></li>
               </ul>
            </nav>

            <a href="#" class="btn">Войти</a>
         </div>
      `;
      header.className = 'site-header'

      document.addEventListener('DOMContentLoaded', () => {
         const burger = document.querySelector('.burger');
         const nav = document.querySelector('.main-nav');
       
         burger.addEventListener('click', () => {
           nav.classList.toggle('open');
         });
       });

   return header;
}



