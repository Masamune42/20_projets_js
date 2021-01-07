const imgs = document.querySelectorAll('.cont-slides img');
const suivant = document.querySelector('.right');
const precedent = document.querySelector('.left');
const cercles = document.querySelectorAll('.cercle');
let index = 0;

suivant.addEventListener('click', slideSuivante);

function slideSuivante() {
    // Si on se trouve sur une image qui n'est pas la dernière, masque l'image actuelle et affiche la prochaine
    if (index < 2) {
        imgs[index].classList.remove('active');
        index++;
        imgs[index].classList.add('active');
    } else if (index === 2) { // Sinon (dernière image), cache l'actuelle et afficher la 1ère
        imgs[index].classList.remove('active');
        index = 0;
        imgs[index].classList.add('active');
    }

    // On vérifie pour chaque cercle si son data-clic = le numéro d'index de voulu et on a va coloré celui de l'image sélectionnée
    for (let i = 0; i < cercles.length; i++) {
        if (cercles[i].getAttribute('data-clic') - 1 === index) {
            cercles[i].classList.add('active-cercle');
        } else {
            cercles[i].classList.remove('active-cercle');
        }
    }
}

precedent.addEventListener('click', slidePrecedente);

function slidePrecedente() {
    // Même logique que pour les slides suivants
    if (index > 0) {
        imgs[index].classList.remove('active');
        index--;
        imgs[index].classList.add('active');
    } else if (index === 0) {
        imgs[index].classList.remove('active');
        index = 2;
        imgs[index].classList.add('active');
    }

    for (let i = 0; i < cercles.length; i++) {
        if (cercles[i].getAttribute('data-clic') - 1 === index) {
            cercles[i].classList.add('active-cercle');
        } else {
            cercles[i].classList.remove('active-cercle');
        }
    }
}

document.addEventListener('keydown', keyPressed);

// On gère les raccourcies claviers
function keyPressed(e) {
    // Touche de gauche
    if (e.keyCode === 37) {
        slidePrecedente();
    } else if (e.keyCode === 39) { // Touche de droite
        slideSuivante();
    }
}

// Cercles : colorisation + affichage des images
cercles.forEach(cercle => {
    cercle.addEventListener('click', function () {
        for (let i = 0; i < cercles.length; i++) {
            cercles[i].classList.remove('active-cercle');
        }
        this.classList.add('active-cercle');

        imgs[index].classList.remove('active');
        index = this.getAttribute('data-clic') - 1;
        imgs[index].classList.add('active');
    });
});