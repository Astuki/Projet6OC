let allData = []; // Store all data fetched from API

// This function filters the items based on the category name with the data / category fetched from backend
function filterSelection(category) {
    const container = document.querySelector(".gallery");
    container.innerHTML = ''; // Clear the container before re-render "to not render multiple buttons"

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

        // make it so everything is displayed when my Website is first loaded
        filterSelection('all');

    })
    .catch(error => {
        console.error('Il y a un problème avec la récupération ( fetch ) des données:', error);
    }); 



    /* Séparer la logique Form */
// form login logic
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // from "piece auto Website" évite reload 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value

    console.log(email);
    console.log(password);

    // request the back for auth 
    fetch('http://localhost:5678/api/users/login',{ 
        method: 'POST', 
        headers:{ 
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ 
            email: email, 
            password: password 
        })
    })
    .then(response => {
        if (response.ok) {
            const allInputs = document.querySelectorAll(".inputs");
            allInputs.forEach(input => {
                input.classList.remove("right");
                void input.offsetWidth; 
                input.classList.add("right");
            })
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800)

            return response.json();
            /*SI TOKEN est bon on affiche la première modal modifier */
        } else {
            const allInputs = document.querySelectorAll(".inputs");
            allInputs.forEach(input => {
                input.classList.remove("wrong");
                void input.offsetWidth; 
                input.classList.add("wrong");
            })
        }
    }).then(/* récupérer mon token avec une loginData = response.JSON()
     faire un .then utilisation locla Storage et d'un setItem pour enregistrer le ("Token", loginData.token)) */)
    .catch(error => { // bonne pratique si erreur comme plus haut 
        console.error('Authentication error:', error);
    })
})

/* innerHTML HTML de la modal dans le JS */
/* pas de modal pour le mode édition + apparition du bouton modifié */
/* 2 modals pour le modifier */