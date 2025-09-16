export async function sendPatchImage(api_endpoint, id, file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`${api_endpoint}${id}/`, {
            method: 'PATCH',
            body: formData
});

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}