

export function createShows(list_of_shows) {
    const shows = document.createElement('div');
    shows.className = 'shows';
    
    const title_tresk = document.createElement('p');
    title_tresk.className = "title";
    title_tresk.textContent = "Молодой Пражский театр Треск!";
    
    const program_tresk = document.createElement('p');
    program_tresk.className = "title";
    program_tresk.textContent = "Программа:";

    shows.appendChild(title_tresk);
    shows.appendChild(program_tresk);

    const container = document.createElement('div');
    container.className = 'show-grid';
    shows.appendChild(container);
    
    list_of_shows.forEach(show => {
        const show_card = document.createElement('div');
        show_card.className = "show-card";
        
        const show_img = document.createElement('img');
        show_img.className = "show-img";
        show_img.src  = show['image']


        const show_name = document.createElement('p');
        show_name.className = "show-name";
        show_name.textContent = show['name'];

        show_card.appendChild(show_img);
        show_card.appendChild(show_name);
        container.appendChild(show_card);
        });
    return shows;
};

