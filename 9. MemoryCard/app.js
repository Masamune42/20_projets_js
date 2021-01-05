const cartes = document.querySelectorAll('.carte');

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verrouillage = false;

cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
});

function retourneCarte() {
    // On n'exécute pas le code si on est en verrouillage (2 cartes tirées fausses)
    if (verrouillage) return;

    this.childNodes[1].classList.toggle('active');
    // Si on a pas retourné de carte, on va retourner celle sur laquelle on a cliqué
    // Condition exécutée 1 fois sur 2
    if (!carteRetournee) {
        carteRetournee = true;
        premiereCarte = this;
        return;
    }

    carteRetournee = false;
    secondeCarte = this;
    // On vérifie la correspondance entre les 2 cartes
    correspondance();
}

function correspondance() {
    // Si les cartes sont identiques, on retire l'eventlistener
    if (premiereCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr')) {
        premiereCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);
    } else {
        // On affichage les 2 cartes avant de les retourner au bout de 1,5s
        verrouillage = true;
        setTimeout(() => {
            premiereCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');
            verrouillage = false;
        }, 1500);
    }
}

function aleatoire() {
    cartes.forEach(carte => {
        // On génère des entiers entre 0 et 11
        let randomPos = Math.floor(Math.random() * 12);
        // On change l'ordre des cartes
        carte.style.order = randomPos;
    });
}

// On mélange les cartes
aleatoire();