import { sendRegisterTicketRequest } from './send_post_ticket_request';

export async function buyTicketButton(show_id, name, place, date) {
    const buyPopupContainer = document.getElementById('buy-popup-container');
    const close_button = document.getElementById('buy-popup-close-modal');
    buyPopupContainer.style.display = 'flex';
    
    const showInfo = document.getElementById('buy-ticket-show-info');
    showInfo.textContent = '';

    const showName = document.createElement('h5');
    showName.textContent = name;

    const showPlace = document.createElement('p');
    showPlace.textContent = place + "     " + date;

    showInfo.appendChild(showName);
    showInfo.appendChild(showPlace);

        
    const localUser = localStorage.getItem('user');
    const localUserEmail = localStorage.getItem('email');

    if (localUser) {
        document.getElementById('buyer-name').value = localUser;
        document.getElementById('buyer-email').value = localUserEmail;
    }

    close_button.addEventListener('click', (e) => {
        buyPopupContainer.style.display = 'none';
    }); 

    const confirm_button = document.getElementById('buy-ticket-button');
    const succes_message = document.createElement("div");
    confirm_button.insertAdjacentElement("afterend", succes_message);
    confirm_button.addEventListener('click', async (e) => {
        e.preventDefault();
        const userName = buyPopupContainer.querySelector('#buyer-name').value;
        const email = buyPopupContainer.querySelector('#buyer-email').value;
        const phone = buyPopupContainer.querySelector('#buyer-phone').value;
        const token = localStorage.getItem('token');
        const result = await sendRegisterTicketRequest(show_id, userName, email, phone, token);

        
        if (!result.success) {
            for (const field in result.errors) {
                succes_message.textContent = "";
                succes_message.style.color = "red";
                succes_message.textContent = "Заполните все поля"; 
            }
        return;
  } else {
        succes_message.textContent = "";
        succes_message.style.color = "green";
        succes_message.textContent = "Резервация успешна";
  }


    

    }); 

};