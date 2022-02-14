export const getData = async() => {
    const response = await fetch(`https://api.harvardartmuseums.org/object?q=&size=20&page=1&apikey=2e03838c-fa79-4d40-86c2-fe4d31385f01`);
    const data = await response.json();
    return data;
};
