import { API_SEND_MAIL_ENDPOINT } from '../variables.js';
import { API_BASE_URL } from '../variables.js';

export async function sendMailRequest() {
    document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
        };

        const response = await fetch(API_BASE_URL + API_SEND_MAIL_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Error:", response.status, text);
            document.getElementById("response").style.color = "red";
            document.getElementById("response").textContent = `Ошибка: ${response.status} ${text}`;

            return;
        }

        const result = await response.json();
        document.getElementById("response").textContent = result.message;
        document.getElementById("response").style.color = "green";
        e.target.reset();
    });
};