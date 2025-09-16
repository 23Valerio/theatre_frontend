export async function parseDataForImages(data) {
    if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return [];
    }
    const list_of_images = data.map(item => item.image);
    return list_of_images;
}
