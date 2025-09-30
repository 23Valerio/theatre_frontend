import { API_BASE_URL } from '../variables.js';
import { API_USER_LOGIN_ENDPOINT } from '../variables.js';

export async function userLoginRequest(user, pwd) {
    try {
        const response = await fetch(`${API_BASE_URL}${API_USER_LOGIN_ENDPOINT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user,
                password: pwd,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Login failed");
        }

        const data = await response.json();

        // якщо сервер повертає токен
        if (data.access) {
            localStorage.setItem("access_token", data.access);
        }
        if (data.refresh) {
            localStorage.setItem("refresh_token", data.refresh);
        }

        console.log("Login successful:", data);
        return data;


    } catch (error) {
        console.error("LOGIN ERROR", error.message);
    }    
}