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
            const titleElement = document.createElement('h2');
            titleElement.innerText = item.title;

            const imageElement = document.createElement('img');
            imageElement.src = item.imageUrl;
            imageElement.alt = item.title;

            container.appendChild(titleElement);
            container.appendChild(imageElement);
        });

    })
    .catch(error => {
        console.error('Il y a un problème avec la récupération ( fetch ) des données:', error);
    })