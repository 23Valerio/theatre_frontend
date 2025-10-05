import { API_BASE_URL } from '../variables.js';
import { API_USER_PROFILE_ENDPOINT } from '../variables.js';

export async function userProfileRequest(token) {
    try {
        const response = await fetch(`${API_BASE_URL}${API_USER_PROFILE_ENDPOINT}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Помилка авторизації або отримання даних');
        }

        const data = await response.json();
        console.log('Дані користувача:', data);
        return data;
    } catch (error) {
        console.error('Помилка:', error);
        return null;
    }
}