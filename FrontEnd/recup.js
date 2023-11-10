let allData = []; // Store all data fetched from API

// This function filters the items based on the category name
function filterSelection(category) {
    const container = document.querySelector("div.gallery");
    container.innerHTML = ''; // Clear the container before re-rendering "to not render multiple buttons"

    if (category === 'all') {
        allData.forEach(item => {
            renderGalleryItem(container, item);
        });
    } else {
        allData.forEach(item => {
            if (item.category.name === category) { // la value category is on the HTML
                renderGalleryItem(container, item);
            }
        });
    }
}

// Function to render the gallery item
function renderGalleryItem(container, item) {
    const figureElement = document.createElement('figure');

    const imageElement = document.createElement('img');
    imageElement.src = item.imageUrl;
    imageElement.alt = item.title;

    const figcaptionElement = document.createElement('figcaption');
    figcaptionElement.innerText = item.title;

    figcaptionElement.classList.add("projectText");

    container.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
}

// fetch & render logic
fetch('http://localhost:5678/api/works')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.')
        }
    })
    .then(data => {
        console.log(data);
        allData = data; // Store all data fetched from the API

        const container = document.querySelector("div.gallery");

        // make it so everything is displayed when my Website is loaded
        filterSelection('all');

    })
    .catch(error => {
        console.error('Il y a un problème avec la récupération ( fetch ) des données:', error);
    }); // erreur avec .catch à voir mentorat

// form login logic
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // from "piece auto Website" évite reload 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value

    console.log(email);
    console.log(password);

    // request to back for auth 
    fetch('http://localhost:5678/api/users/login',{ // 404 not found why ?
        method: 'POST', // send info de pièce auto
        headers:{ // exemple pièce auto, metadata de la requête
            'Content-Type': 'application/json', // indique contenu requête est en JSON
            'Authorization': 'Bearer' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4" // pris d'un autre site "commonly used fo auth" est utilisé pour vérifier identité (voir mentorat)
        },
        body: JSON.stringify({ // transforme JS -> JSON, données envoyés
            email: email, // valeur rentrées dans les champs var plus haut
            password: password // valeur rentrées dans les champs var plus haut
        })
    })
    .then(response => {
        if (response.ok) {
            // Si authentification bon renvoie sur index.html
            window.location.href = 'index.html';
        } else {
            // sinon display une alert avec un message erreur ( à changer surement en du HTML d'une couleur rouge )
            alert('email ou mot de passe incorrect. Réessayer');
        }
    })
    .catch(error => { // bonne pratique si erreur comme plus haut 
        console.error('Authentication error:', error);
    })
})