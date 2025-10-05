import { API_BASE_URL } from '../variables.js';
import { API_USER_LOGIN_ENDPOINT } from '../variables.js';

export async function userLoginRequest(user, pwd) {
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

        const data = await response.json();
        console.log(response.ok);
  if (!response.ok) {
    
    console.log("ERROR", data)
    return { success: false, errors: data };
  }
  // DELETE log !!!
  console.log("SUCCESS", data)
  localStorage.setItem('token', data.token);
  return { success: true, data };
}