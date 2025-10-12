import { fetchGetApiEndpointData } from './get_api_server_data.js';
import { API_BASE_URL, API_FUTURE_SHOWS_ENDPOINT } from '../variables.js';
import { buyTicketButton } from './buy_ticket_button.js';

export async function createProgram(app) {
    const title = document.createElement('h2');
    title.textContent = 'Программа спектаклей';

    const programData = await fetchGetApiEndpointData(API_BASE_URL + API_FUTURE_SHOWS_ENDPOINT);
    app.appendChild(title);

    const programList = document.createElement('div');
    programList.className = 'program-list';

  
    programData.forEach(program => {
        const cardItem = document.createElement('div');
        cardItem.className = 'card-item';

        const image_container = document.createElement('div');
        image_container.className = 'image-container';

        const image = document.createElement('img');
        image.src = program.image;
        image.alt = program.name;
        image_container.appendChild(image);
        cardItem.appendChild(image_container);

        const card_info = document.createElement('div');
        card_info.className = 'card-info';
        cardItem.appendChild(card_info);

        const card_name = document.createElement('h3');
        card_name.textContent = program.name;

        const card_place = document.createElement('p');
        card_place.textContent = program.place;
        
        card_info.appendChild(card_name);
        

        const card_date = document.createElement('p');
        const date = new Date(program.date);
        const dateToStr = date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        card_date.textContent = dateToStr;
        card_info.appendChild(card_date);
        card_info.appendChild(card_place);

        const card_tickets = document.createElement('p');
        card_tickets.textContent = `Доступно билетов: ${program.tickets_count}`;
        card_info.appendChild(card_tickets);

        const cardInfoShow = document.createElement('p');
        cardInfoShow.textContent = program.description;
        card_info.appendChild(cardInfoShow);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Купить / Забронировать билет';
        buyButton.className = 'button';
        buyButton.addEventListener('click', (e) => {
            buyTicketButton(program.id, program.name, program.place, dateToStr);
        });
        buttonsContainer.appendChild(buyButton);
        card_info.appendChild(buttonsContainer);

        if (program.tickets_count === 0) {
            console.log('No tickets available');
            buyButton.disabled = true;
            buyButton.textContent = 'Билеты отсутствуют';
            buyButton.classList.add('disabled');
        }

        programList.appendChild(cardItem);
    });
    
    app.appendChild(programList);

    const buyPopupContainer = document.createElement('div');
    buyPopupContainer.classList = 'buy-popup-container';
    buyPopupContainer.id = 'buy-popup-container';
    buyPopupContainer.innerHTML = `
            <span class="close" id="buy-popup-close-modal">&times;</span>
            <p class="buy-popup-title">Резервация билета</p>
            <div class="buy-ticket-show-info" id="buy-ticket-show-info"></div>
            <form class="buy-ticket-popup">
                <div class="buy-ticket-container">
                    <label for="buyer-name">Имя</label>
                    <input type="text" placeholder="Ведите имя" id="buyer-name" name="buyer-name" required">

                    <label for="buyer-email">Электронная почта</label>
                    <input type="text" placeholder="Введите почту" id="buyer-email" name="buyer-email" required">

                    <label for="buyer-phone">Телефон</label>
                    <input type="tel" placeholder="Введите номер телефона" id="buyer-phone" name="buyer-phone" required">

                    <button type="submit" id="buy-ticket-button">Подтвердить</button>
                </div>
            </form> `;
    app.appendChild(buyPopupContainer)

}

