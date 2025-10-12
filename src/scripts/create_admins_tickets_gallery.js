export function createAdminsTicketsGallery(data) {
    const view = document.getElementById('view');
    view.innerHTML = '';
    
    const label_select = document.createElement('label');
    label_select.textContent = 'Выберите спектакль: ';
    label_select.classList = "add-file-input";
    label_select.htmlFor = 'show_select';

    const show_select = document.createElement('select');
    show_select.id = 'show_select';
    view.appendChild(label_select);

    const defaultOption = document.createElement('option');
    defaultOption.textContent = '--- Выберите спектакль ---';
    defaultOption.value = '';       
    defaultOption.selected = true;
    defaultOption.disabled = true;
    show_select.appendChild(defaultOption);

    data.forEach(show => {
        const option = document.createElement('option');
        option.value = show.id;
        option.textContent = `${show.show_name} — ${new Date(show.show_date).toLocaleString()}`;
        show_select.appendChild(option);    
    });
    view.appendChild(show_select);

    const tickets_container = document.createElement('div');
    tickets_container.classList = 'ticket-container';
    view.appendChild(tickets_container);

    show_select.addEventListener('change', (e) => {
        const show_id = e.target.value;
        tickets_container.innerHTML = '';
        const selectedShow = data.find(show => show.id == show_id);
        
        if (selectedShow.tickets.length === 0) {
            console.log("НЕМАЄ КУПЛЕНИХ БІЛЕТІВ ");
            tickets_container.innerHTML = '<p>Нету купленых бителов для этого представленя.</p>';
        } else {
            const tickets_table = document.createElement('div');
            tickets_table.classList = "tickets-table";
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const header_row = document.createElement('tr');

            const headers = [ '№ билета', 'Имя', 'Электронная почта', 'Телефон', 'Куплено'];

            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                header_row.appendChild(th);
            });
        
            thead.appendChild(header_row);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            table.appendChild(tbody);

            tickets_table.appendChild(table);
            tickets_container.appendChild(tickets_table);

            selectedShow.tickets.forEach(ticket => {
                const row = document.createElement('tr');
                const td_id = document.createElement('td');
                td_id.textContent = ticket.id || '---';
                row.appendChild(td_id);
                
                const td_name = document.createElement('td');
                td_name.textContent = ticket.buyer_name || '---';
                row.appendChild(td_name);

                const td_email = document.createElement('td');
                td_email.textContent = ticket.buyer_email || '---';
                row.appendChild(td_email);

                const td_phone = document.createElement('td');
                td_phone.textContent = ticket.buyer_phone || '---';
                row.appendChild(td_phone);

                const td_bought = document.createElement('td');
                const date = new Date(ticket.created_at);
                const buyed_at = date.toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                td_bought.textContent = buyed_at || '---';
                row.appendChild(td_bought);

                tbody.appendChild(row);
            });
        };
    });

};