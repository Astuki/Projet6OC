let allData = []; // Store all data fetched from API

document.querySelector(".all").addEventListener("click", function () {
    filterSelection('all');
});
document.querySelector(".objets").addEventListener("click", function () {
    filterSelection('Objets');
});
document.querySelector(".appartments").addEventListener("click", function () {
    filterSelection('Appartements');
});
document.querySelector(".hotelsRestaurants").addEventListener("click", function () {
    filterSelection('Hotels & restaurants');
});

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
        console.error('Il y a un problème avec la récupération des données:', error);
    }); 





const token = localStorage.getItem('token');
const expectedTokenPrefix = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

/* Si mode édition ne load pas 1ère cause d'erreur possible le if */
if (token && token.startsWith(expectedTokenPrefix)) {
    function EditionModeEnabled() {
        const editionMode = document.querySelectorAll('.hidden');
        editionMode.forEach(element => {
            element.style.display = "flex";
        });
    }
    EditionModeEnabled();

    function hideButtons() {
        let buttons = document.querySelectorAll(".all, .objets, .appartments, .hotelsRestaurants")
        buttons.forEach(function (button) {
            button.style.display = "none";
        })
    }
    hideButtons();

    function Logout(){
        let logout = document.querySelector(".logout");
        logout.innerText = "logout";
        logout.style.color = "rgb(210, 80, 30)";
        
        logout.addEventListener("click", function() {
            localStorage.removeItem("token");

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 200)
        })
    }
    Logout();

    const linkToModify = document.querySelector("a.modifierChild");
    let asideModify = document.querySelector(".modify");
    linkToModify.addEventListener("click", function() {
        asideModify.style.display = "flex";
        renderImagesInModal();
    })  

    const modalAdd = document.querySelector(".modify2");
    const buttonShowModal = document.getElementById("showModal2")
    buttonShowModal.addEventListener("click", function () {
        modalAdd.style.display = "flex";
        asideModify.style.display = "none";
    })

    function leaveModal() {
        const closeModals = document.querySelectorAll(".closeModals");
        closeModals.forEach(function (xMark) {
            xMark.addEventListener("click", function () {
                let asideModify = document.querySelector(".modify");
                asideModify.style.display = "none";
                let asideModify2 = document.querySelector(".modify2");
                asideModify2.style.display = "none";
            });
        });
    }
    leaveModal();

    function switchModal() {
        const goBack = document.querySelector("i.fa-arrow-left");
        goBack.addEventListener("click", function () {
            let asideModify2 = document.querySelector(".modify2");
            asideModify2.style.display = "none";
            let asideModify = document.querySelector(".modify");
            asideModify.style.display = "flex";
        })
    }
    switchModal();  
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
        imageElement.style.maxHeight = '100px';
        imageElement.style.minHeight = "100px";

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash-can', 'fa-2xs', 'delete-icon');
        trashIcon.addEventListener('click', function () {
            deleteItem(item.id);
        });

        trashIcon.style.position = 'absolute';
        trashIcon.style.top = '5px';
        trashIcon.style.right = '5px';
        
        container.appendChild(imageElement);
        container.appendChild(trashIcon);

        modalGallery.appendChild(container);
    });
}

async function deleteItem(itemId) {
    const token = localStorage.getItem('token');
    const expectedTokenPrefix = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

    if (!token || !token.startsWith(expectedTokenPrefix)) {
        console.error('Token invalide ou manquant.');
        return;
    }

    // try-catch block to handle errors
    try {
        const response = await fetch(`http://localhost:5678/api/works/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Image Supprimée !')
            updateFrontend(itemId);
        } else if (response.status === 401) {
            alert('Unauthorized, Vous devez vous connecter !') 
        } else {
            alert('Erreur contacter le gérant du serveur ou le développeur ! ' `${response.status}`)
        }
    } catch (error) {
        alert('Erreur lors de la Supression:', error);
    }
}

// Step 2: Function to update the frontend
function updateFrontend(itemId) {
    // Find and remove the deleted item from allData
    allData = allData.filter(item => item.id !== itemId);

    // Re-render the gallery
    filterSelection('all');

    renderImagesInModal();
}


// This make the "Preview" effect
document.getElementById("image").addEventListener("change", function () {
    const previewContainer = document.getElementById("imagePreview");
    let previewImage = previewContainer.querySelector("img");

    if (this.files && this.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            if (!previewImage) {
                previewImage = document.createElement("img");
                previewContainer.innerHTML = ''; // Clear any previous content
                previewContainer.appendChild(previewImage);
            }

            previewImage.src = e.target.result;
        };

        reader.readAsDataURL(this.files[0]);

        const labelButton = document.querySelector(".button-styling");
        const smallText = document.querySelector(".small");

        smallText.style.display = "none";

        labelButton.style.opacity = "0";
        labelButton.style.position = "absolute";
        labelButton.style.height = "170px";
        labelButton.style.width = "125px";
        labelButton.style.padding = "0px";

        let previewedImage = document.querySelector(".image-preview");
        previewedImage.style.height = "175px"
    }
})

document.getElementById("addItemForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData();

    const token = localStorage.getItem('token');
    const expectedTokenPrefix = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

    if (!token || !token.startsWith(expectedTokenPrefix)) {
        console.error('Token non valide ou manquant.');
        return;
    }

    // Add the category data to the formData based on the selected option
    const selectedCategory = document.getElementById("category").value;
    formData.append("category", getCategoryID(selectedCategory)); 
    formData.append("title", document.getElementById("title").value);
    formData.append('image', document.getElementById("image").files[0]);

    clearErrorMessages();

    // Check for empty fields and display error messages
    if (!formData.get("category")) {
        displayErrorMessage("category", "Veuillez choisir une catégorie.");
    }
    if (!formData.get("title")) {
        displayErrorMessage("title", "Veuillez entrer un titre.");
    }
    const imageInput = document.getElementById("image");
    if (!imageInput.files || imageInput.files.length === 0) {
        let smallText = document.querySelector(".small");
        smallText.style.display = "none";
        displayErrorMessage("image", "Veuillez sélectionner une image.");
    }

    // If errors, stop form submission
    if (document.getElementsByClassName("error-message").length > 0) {
        return;
    }

    console.log([...formData.entries()]);
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            alert("L'ajout a été réussi !")
            let newObjectToAdd = await response.json();
            allData.push(newObjectToAdd);

            updateFrontend(); 
        } else if (response.status === 401) {
            console.error('Unauthorized. Connectez-vous.');
        } else {
            console.error(`L'ajout du projet n'a pas réussi, contacter le développeur ou gestionnaire du serveur ${response.status}`);
            const errorMessage = await response.text();
            console.error(`Server error message: ${errorMessage}`);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout, réessayer :", error);
    }
});

// Function to get the category ID based on the selected category name
function getCategoryID(categoryName) {
    switch (categoryName) {
        case 'Objets':
            return 1;
        case 'Appartements':
            return 2;
        case 'Hotels & restaurants':
            return 3;
        default:
            return null;
    }
}

function displayErrorMessage(fieldName, message) {
    const fieldElement = document.getElementById(fieldName);
    const errorMessageElement = document.createElement("p");
    errorMessageElement.className = "error-message";
    errorMessageElement.textContent = message;

    errorMessageElement.style.fontSize = "10px";
    errorMessageElement.style.position = "relative";
    // Insert the error message below the corresponding form field
    fieldElement.parentNode.insertBefore(errorMessageElement, fieldElement.nextSibling);
}

function clearErrorMessages() {
    const errorMessages = document.getElementsByClassName("error-message");
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].remove();
    }
}

