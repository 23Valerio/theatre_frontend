export async function sendPatchDataShow(api_endpoint, id, loadData) {
     try {
        const response = await fetch(`${api_endpoint}${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token b76b9425a198948c23407ce14fd242d11d35338d`,
            },
            body: JSON.stringify(loadData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Patch request successful. Response data:', responseData);
        return responseData;

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }        
}