import { userProfileRequest } from './user_profile_request.js'
import { loadContent } from '../main.js'

export async function initUserProfilePage() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.error('No token found in localStorage');
        return;
    }
    const profile = await userProfileRequest(token);

    if (profile.username === "admin") {
        loadContent('/admin');
    } else {
        
    const app = document.getElementById('app');
    app.innerHTML = '';
    const username = document.createElement('h2');
    username.innerHTML = profile.username;
    app.appendChild(username);

    const usermail = document.createElement('h3');
    usermail.innerHTML = profile.email;
    app.appendChild(usermail);

    const tickets_title = document.createElement('p');
    tickets_title.className = 'tickets-title';
    tickets_title.innerText = "Купленные былеты:";

    const purchased_tickets = document.createElement('div');
    purchased_tickets.className = 'purchased-tickets';
    purchased_tickets.appendChild(tickets_title);

    profile.tickets.forEach(show => {
        const show_card = document.createElement('div');
        show_card.className = "show-ticket";
        
        const show_name = document.createElement('p');
        show_name.textContent = show.show_name;
        show_name.className = 'tickets-show-name';
        show_card.appendChild(show_name);

        const show_date = document.createElement('p');
        const date = new Date(show.show_date);
        show_date.textContent = date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        show_date.className = 'tickets-show-date';
        show_card.appendChild(show_date);

        purchased_tickets.appendChild(show_card);
        });

    app.appendChild(purchased_tickets);
    }
};