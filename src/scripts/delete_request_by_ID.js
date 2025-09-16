export async function deleteRequestByID(api_endpoint, id) {
    try {
        const response = await fetch(`${api_endpoint}${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token b76b9425a198948c23407ce14fd242d11d35338d`
            },
        });
        console.log('Delete request sent to:', `${api_endpoint}${id}/`);
        console.log('Delete response status:', response.status);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }

}