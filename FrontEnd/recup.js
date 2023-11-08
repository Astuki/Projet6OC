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

        const container = document.querySelector("div.gallery")

        data.forEach(item => {
            const figureElement = document.createElement('figure');

            const imageElement = document.createElement('img');
            imageElement.src = item.imageUrl;
            imageElement.alt = item.title;

            const figcaptionElement = document.createElement('figcaption');
            figcaptionElement.innerText = item.title;

            
            figcaptionElement.classList.add("projectText")

            container.appendChild(figureElement);
            figureElement.appendChild(imageElement)
            figureElement.appendChild(figcaptionElement);
        });

    })
    .catch(error => {
        console.error('Il y a un problème avec la récupération ( fetch ) des données:', error);
    })