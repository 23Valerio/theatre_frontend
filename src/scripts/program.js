export function createProgram(app, programData) {


    const title = document.createElement('h2');
    title.textContent = 'Программа спектаклей';
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
        card_date.textContent = date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        card_info.appendChild(card_date);
        card_info.appendChild(card_place);

        const card_tickets = document.createElement('p');
        card_tickets.textContent = `Доступно билетов: ${program.tickets_available}`;
        card_info.appendChild(card_tickets);


        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Купить билет';
        buyButton.className = 'button';
        buyButton.addEventListener('click', () => {});
        buttonsContainer.appendChild(buyButton);

        const reserveButton = document.createElement('button');
        reserveButton.textContent = 'Забронировать билет';
        reserveButton.className = 'button';
        reserveButton.addEventListener('click', () => {});
        buttonsContainer.appendChild(reserveButton);
        card_info.appendChild(buttonsContainer);

        if (program.tickets_available === '0') {
            buyButton.disabled = true;
            reserveButton.disabled = true;
            buyButton.textContent = 'Билеты отсутствуют';
            reserveButton.textContent = 'Билеты отсутствуют';
            buyButton.classList.add('disabled');
            reserveButton.classList.add('disabled');
        }

        programList.appendChild(cardItem);
    });
    
    app.appendChild(programList);
  

}