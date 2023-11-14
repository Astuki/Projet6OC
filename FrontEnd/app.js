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





const token = localStorage.getItem('token');
const expectedTokenPrefix = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

/* Si mode édition ne load pas 1ère cause d'erreur possible le if */
if (token && token.startsWith(expectedTokenPrefix)) { /* Si existence & prefix = true */

    console.log('Token exists and seems to be correct, edition Mode Enabled.');
    function EditionModeEnabled() {
        const editionMode = document.querySelectorAll('.hidden');
        editionMode.forEach(element => {
            element.style.display = "flex";
        });
    }
    EditionModeEnabled();

    const linkToModify = document.querySelector("a.modifierChild")
    linkToModify.addEventListener("click", function() {
        let asideModify = document.querySelector(".modify");
        asideModify.style.display = "flex";
        renderImagesInModal();
    })  
}

function renderImagesInModal() {
    const modalGallery = document.querySelector(".modalGallery");
    modalGallery.innerHTML = ''; // Clear the modalGallery before re-render

    allData.forEach(item => {
        const container = document.createElement('div')
        container.style.position = 'relative';

        const imageElement = document.createElement('img');
        imageElement.src = item.imageUrl;
        imageElement.alt = '';
        imageElement.style.width = '70px';
        imageElement.style.height = 'auto';
        imageElement.style.maxHeight = '100px';

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('far', 'fa-trash-can', 'fa-xs', 'delete-icon');
        trashIcon.addEventListener('click', function () {
            console.log('delete item: ', item.title);
        });

        trashIcon.style.position = 'absolute';
        trashIcon.style.top = '5px';
        trashIcon.style.right = '5px';
        
        container.appendChild(imageElement);
        container.appendChild(trashIcon);

        modalGallery.appendChild(container);
    });
}

/* innerHTML HTML de la modal dans le JS */
/* 2 modals pour le modifier galerie */