import { userLoginRequest } from './user_login_request.js'
import { userRegisterRequest } from './user_register_request.js'
import { loadContent } from '../main.js'


export async function loginButton() {
    const login_button = document.getElementById('login');
    const login_popup = document.querySelector('.login-popup-container');
    const register_popup = document.querySelector('.register-popup-container');
    const register_button = document.getElementById('register');
    const login_cancel_button = document.getElementById('login-close-modal');
    const register_cancel_button = document.getElementById('register-close-modal');
    const profile_button = document.getElementById('profile');

    login_button.addEventListener('click', (e) => {
        e.preventDefault();
        login_popup.style.display = 'flex';
        register_popup.style.display = 'none';
        if (login_button.innerHTML === 'Выйти') {
            logout();
            login_button.innerHTML = 'Войти';
        }
    });

    login_cancel_button.addEventListener('click', (e) => {
        login_popup.style.display = 'none';
    });

    register_button.addEventListener('click', (e) => {
        e.preventDefault();
        register_popup.style.display = 'flex';
        login_popup.style.display = "none";
    });

    register_cancel_button.addEventListener('click', (e) => {
        register_popup.style.display = 'none';
    }); 

    const login_form_button = document.getElementById('login-button');
    login_form_button.addEventListener('click', async (e) => {
        e.preventDefault();
        const data_login = document.querySelector('.login-popup-container');
        const user = data_login.querySelector('#login-username').value;
        const password = data_login.querySelector('#login-password').value;
        
        data_login.querySelectorAll(".error").forEach(el => el.remove());    
        const result = await userLoginRequest(user, password);
        const username = result?.data?.user;
        if (username === 'admin' && result.success) {
            console.log('Admin logged in');
            document.dispatchEvent(new Event('adminLoggedIn'));
        }

        if (!result.success) {
 
           // check for errors
            for (const field in result.errors) {
                const input = data_login.querySelector(`input[name='login-${field}']`);
        
            if (input) {
                const errorEl = document.createElement("div");
                errorEl.classList.add("error");
                errorEl.style.color = "red";
                errorEl.textContent = result.errors[field][0];
                input.insertAdjacentElement("afterend", errorEl);
            } else if (field === "non_field_errors") {
                // Якщо це загальна помилка — додати в кінець форми
                const errorEl = document.createElement("div");
                errorEl.classList.add("error");
                errorEl.style.color = "red";
                errorEl.textContent = result.errors[field][0];
                data_login.querySelector(".login-container").appendChild(errorEl);
                }
            }
            return;
        }
            login_popup.style.display = 'none';
            login_button.innerHTML = 'Выйти';
            register_button.style.display = "none";
            profile_button.style.fontWeight = "bolder"
            profile_button.innerHTML = user;
            profile_button.style.display = "inline-block";

    }); 

    const register_form_button = document.getElementById('register-button');
    register_form_button.addEventListener('click', async (e) => {
        e.preventDefault();
        const data_register = document.querySelector('.register-popup-container');
        const user = data_register.querySelector('#register-username').value;
        const password = data_register.querySelector('#register-password').value;
        const email = data_register.querySelector('#register-email').value;

        data_register.querySelectorAll(".error").forEach(el => el.remove());

        const result = await userRegisterRequest(user, password, email);

        if (!result.success) {
            for (const field in result.errors) {
                const input = document.querySelector(`input[name='register-${field}']`);
                if (input) {
                    const errorEl = document.createElement("div");
                    errorEl.classList.add("error");
                    errorEl.style.color = "red";
                    errorEl.textContent = result.errors[field][0];
                    input.insertAdjacentElement("afterend", errorEl);
                }
            }
        return;
  }
    const input = document.querySelector(`input[name='register-email']`);
    const succes_message = document.createElement("div");
    succes_message.style.color = "green";
    succes_message.textContent = "Регистрация успешна";
    input.insertAdjacentElement("afterend", succes_message);
    setTimeout(function() {
        // register popup will disappear after 2 sec
        register_popup.style.display = "none";
        }, 2000);
  });

    profile_button.addEventListener('click', async (e) => {
        e.preventDefault();
        loadContent("/userprofile");
    });
};

export function logout() {
    localStorage.removeItem('token'); // delete the token
    localStorage.removeItem('user'); // delete the username 
    localStorage.removeItem('email'); // delete the email
    window.location.href = "/";
}