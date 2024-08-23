const gallery = document.querySelector('.gallery');
const filtres = document.querySelector('.filtres');

async function getWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}

async function showWorks() {
    const works = await getWorks();
    gallery.innerHTML = ''; // Vider la galerie avant de l'afficher à nouveau

    works.forEach(work => {
        // Création des balises HTML
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        
        // Intégration des données de l'API
        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;
        img.id = work.categoryId;

        // Attribution des balises HTML dans la galerie
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

async function showCategories() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();

    // Création du bouton "Tous"
    const buttonAll = document.createElement('button');
    buttonAll.id = "0";
    buttonAll.textContent = 'Tous';
    filtres.appendChild(buttonAll);

    categories.forEach(categorie => {
        const button = document.createElement('button');

        button.textContent = categorie.name;
        button.setAttribute('data-id', categorie.id);
        button.id = categorie.id; // Ajoute l'id ici pour que le code fonctionne

        button.addEventListener('click', (e) => {
            const btnId = e.target.id;
            filterWorksByCategory(btnId);
        });

        filtres.appendChild(button);
    });

    // Ajoute l'événement au bouton "Tous"
    buttonAll.addEventListener('click', () => {
        showWorks();
    });
}

async function filterWorksByCategory(categoryId) {
    const works = await getWorks();
    gallery.innerHTML = ''; // Vider la galerie avant de l'afficher à nouveau

    const filteredWorks = works.filter(work => work.categoryId == categoryId);
    filteredWorks.forEach(work => {
        createImage(work);
    });
}

function createImage(work) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}

async function init() {
    await showWorks();
    await showCategories();
}

init();