export async function deleteRequestByID(api_endpoint, token, id) {
    try {
        const response = await fetch(`${api_endpoint}${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }

}