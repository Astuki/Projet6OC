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
    })
    .then( loginData => {
        localStorage.setItem("token", loginData.token);
        console.log(loginData.token); /* token = loginData.token et loginData = userId = 1 + token */
    })
    .catch(error => { 
        console.error('Authentication error:', error);
    })
})


/* récupérer mon token avec une loginData = response.JSON()
faire un .then utilisation locla Storage et d'un setItem pour enregistrer le ("Token", loginData.token)) */

/* innerHTML HTML de la modal dans le JS */
/* pas de modal pour le mode édition + apparition du bouton modifié */
/* 2 modals pour le modifier */