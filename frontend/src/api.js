export const getData = async() => {
    const response = await fetch('https://api.harvardartmuseums.org/object?apikey=2e03838c-fa79-4d40-86c2-fe4d31385f01');
    const data = await response.json();
    return data;
};

// export const getImageData = async() => {
//     const response = await fetch('https://api.harvardartmuseums.org/image?apikey=2e03838c-fa79-4d40-86c2-fe4d31385f01');
//     const imageData = await response.json();
//     return imageData;
// };
