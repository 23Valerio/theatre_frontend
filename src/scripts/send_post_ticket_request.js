import { API_BASE_URL } from '../variables.js';
import { API_BUY_TICKET_ENDPOINT } from '../variables.js';

export async function sendRegisterTicketRequest(show, buyer_name, buyer_email, buyer_phone, token) {
    console.log("JSON --", JSON.stringify({show, buyer_name, buyer_email, buyer_phone }));
    try {
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = "Token " + token;


      const response = await fetch(API_BASE_URL + API_BUY_TICKET_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({show, buyer_name, buyer_email, buyer_phone }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, errors: data };
    }

    return { success: true, data };
    } catch (err) {
      console.error("Помилка запиту", err);
      return { success: false, errors: { general: ["Проблема з сервером."] } };
  }
}