export function createShows(list_of_shows) {
    const shows = document.createElement('div');
    shows.className = 'shows';
    
    const program_tresk = document.createElement('p');
    program_tresk.className = "title";
    program_tresk.textContent = "Программа:";

    shows.appendChild(program_tresk);

    const container = document.createElement('div');
    container.className = 'show-grid';
    shows.appendChild(container);
    
    list_of_shows.forEach(show => {
        const show_card = document.createElement('div');
        show_card.className = "show-card";
        
        const show_link = document.createElement('a');
        show_link.href = `/show/${show['id']}`;
        show_card.appendChild(show_link);

        const show_img = document.createElement('img');
        show_img.className = "show-img";
        show_img.src  = show['image']
        show_link.appendChild(show_img);

        container.appendChild(show_card);
        });
    return shows;
};

