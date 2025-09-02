function slider() {
    console.log('slider function');
    
    return '<h2>Slider Content</h2>';
}

function shows() {
    console.log('shows function');
}

function gallery() {
    console.log('gallery function');
}

function tickets() {
    console.log('tickets function');
}

export function initAdminPage() {

        const links = document.querySelectorAll('.admin-navigation a');
        
        const tmp = {
            slider: slider(),
            shows: shows(),
            gallery: gallery(),
            tickets: tickets(),
        }

        console.log('admin page clicked');


        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = document.querySelector('.view');
                if (!view) return;

                
                const viewName = link.getAttribute('data-view');
             
                view.innerHTML = tmp[viewName];

                links.forEach(l => l.classList.remove('active-link'));
                link.classList.add('active-link');

            });
        });



};