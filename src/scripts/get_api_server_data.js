import { API_BASE_URL } from '../variables.js';

export async function fetchGetApiEndpointData(api_endpoint) {
    try {
        const response = await fetch(api_endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
    return [];
}