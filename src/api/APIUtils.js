export async function fetchReleasesJSON() {
    const response = await fetch(`https://desafio-it-server.herokuapp.com/lancamentos`)
    const releases = await response.json();

    return releases;
};

export async function fetchCategoriesJSON() {
    const response = await fetch(`https://desafio-it-server.herokuapp.com/categorias`)
    const categories = await response.json();

    return categories;
};