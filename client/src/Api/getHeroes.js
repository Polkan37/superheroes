export const getHeroes = () => {
    const url = 'api/heroes';


    const data = fetch(url)
        .then(response => {
            console.log('response: ', response);
            return response.json();
        })
    return data

}