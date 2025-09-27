import { sendPatchImage } from "./send_patch_image.js";

export async function sendPostDataShow(api_endpoint, load_data, image = null) {
     try {
        const response = await fetch(`${api_endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token b76b9425a198948c23407ce14fd242d11d35338d`,
            },
            body: JSON.stringify(load_data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Patch request successful. Response data:', responseData);
        if (image) {
            await sendPatchImage(api_endpoint, image, responseData.id);
        };
        
        
        return responseData;

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }        
}