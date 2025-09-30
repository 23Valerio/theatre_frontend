import { userLoginRequest } from './user_login_request.js'

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
        const data_login = document.querySelector('.login-popup-container');
        const user = data_login.querySelector('#login-uname').value;
        const password = data_login.querySelector('#login-psw').value;
        console.log(user, password);
        
        try {
            const result = await userLoginRequest(user, password);
            login_popup.style.display = "none";
            register_button.style.display = "none";
            profile_button.style.display = "inline-block";
            profile_button.innerHTML = user;
            login_button.innerHTML = "Выйти";

        } catch (error) {
            alert("Login failed: " + error.message);
        }
        
    }); 


    const register_form_button = document.getElementById('register-button');
};


export function logout() {
  localStorage.removeItem("auth_token"); // видаляємо токен
  console.log("Logged out");
  window.location.href = "/";
}