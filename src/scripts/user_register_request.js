import { API_BASE_URL } from '../variables.js';
import { API_USER_REGISTER_ENDPOINT } from '../variables.js';

export async function userRegisterRequest(username, password, email) {
  try {
  const response = await fetch(API_BASE_URL + API_USER_REGISTER_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email }),
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