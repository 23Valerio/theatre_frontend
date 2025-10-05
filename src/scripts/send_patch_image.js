export async function sendPatchImage(api_endpoint, file, token, id = null) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const url = id ? `${api_endpoint}${id}/` : `${api_endpoint}`;
        const method = id ? 'PATCH' : 'POST';

        const response = await fetch(url, {
            method,
            body: formData,
            headers: {
                'Authorization': `Token ${token}`
            },
});

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}