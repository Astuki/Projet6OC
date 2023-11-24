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

    function hideButtons() {
        let buttons = document.querySelectorAll(".all, .objects, .appartments, .hotelsRestaurants")
        buttons.forEach(function (button) {
            button.style.display = "none";
        })
    }
    hideButtons();

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
        const closeModals = document.querySelectorAll("#closeModals");
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
        imageElement.style.height = 'auto';
        imageElement.style.maxHeight = '100px';

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash-can', 'fa-2xs', 'delete-icon');
        trashIcon.addEventListener('click', function () {
            console.log('delete item: ', item.title);
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
        console.error('Invalid or missing token.');
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
            console.log('Item deleted successfully.');
            updateFrontend(itemId);
        } else if (response.status === 401) {
            console.error('Unauthorized. Please log in.');
            // Handle unauthorized access as needed
        } else {
            console.error(`Failed to delete item. Server responded with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting item:', error);
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
    }
})








document.getElementById("addItemForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(this);

    const token = localStorage.getItem('token');
    const expectedTokenPrefix = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

    if (!token || !token.startsWith(expectedTokenPrefix)) {
        console.error('Invalid or missing token.');
        return;
    }

    // Add the category data to the formData based on the selected option
    const selectedCategory = document.getElementById("category").value;
    formData.append("categoryId", getCategoryID(selectedCategory));
    formData.append("title", document.getElementById("title").value);

    // .files avec FormData pour prendre l'image
    
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            console.log('Item added successfully.');
            updateFrontend(); /* formData */
        } else if (response.status === 401) {
            console.error('Unauthorized. Please log in.');
        } else {
            console.error(`Failed to add item. Server responded with status ${response.status}`);
            const errorMessage = await response.text();
            console.error(`Server error message: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error adding item:', error);
    }
});

// Function to get the category ID based on the selected category name
function getCategoryID(categoryName) {
    switch (categoryName) {
        case 'objects':
            return 1;
        case 'appartments':
            return 2;
        case 'hotelsRestaurants':
            return 3;
        default:
            return null;
    }
}

// Why Adding doesn't Work FormData add image?
// Why GithubPages Doesn't work ?