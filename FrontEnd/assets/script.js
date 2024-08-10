const gallery = document.querySelector('.gallery');
const filtres = document.querySelector('.filtres');

const showWorks = async () => {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();

    works.forEach(work => {
        // Création des balises HTML
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        // Intégration des données de l'API
        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;
        // Attribution des balises HTML dans la galerie
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
    });
}

showWorks();

const showCategories = async () => {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();

    // Création du bouton "Tous"

    categories.forEach(categorie => {
        const button = document.createElement('button');

        button.textContent = categorie.name;
        button.setAttribute('data-id', categorie.id);

        filtres.appendChild(button);
        
    });
}

showCategories();