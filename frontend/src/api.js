export const getData = async(page) => {
    const response = await fetch(`https://api.harvardartmuseums.org/object?q=&hasimage=1&size=10&page=${page}&apikey=2e03838c-fa79-4d40-86c2-fe4d31385f01`);
    const data = await response.json();
    return data;
};
