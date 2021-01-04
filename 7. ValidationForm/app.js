// Je récupère l'input du 1er enfant de la même portée des form-groupe
const inpUtilisateur = document.querySelector('.form-groupe:nth-child(1) input');
const inpMail = document.querySelector('.form-groupe:nth-child(2) input');
const inpMdp = document.querySelector('.form-groupe:nth-child(3) input');
const inpConfirm = document.querySelector('.form-groupe:nth-child(4) input');

const allImg = document.querySelectorAll('.icone-verif');
// span des messages d'erreur
const allSpan = document.querySelectorAll('span');
// Lignes représentant la force d'un mdp
const allLigne = document.querySelectorAll('.ligne div');

inpUtilisateur.addEventListener('input', (e) => {
    // On gère l'apparition du svg pour valider la taille du pseudo
    if (e.target.value.length >= 3) {
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/check.svg";
        allSpan[0].style.display = "none";
    } else {
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/error.svg";
        allSpan[0].style.display = "inline";
    }
});

inpMail.addEventListener('input', (e) => {
    const regexEmail = /\S+@\S+\.\S+/;
    if (e.target.value.search(regexEmail) === 0) {
        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/check.svg";
        allSpan[1].style.display = "none";
    } else if (e.target.value.search(regexEmail) === -1) {
        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/error.svg";
        allSpan[1].style.display = "inline";
    }
});

// Validation création du MDP
// On récupère la valeur actuelle de l'input du mdp
let valeurInp;
// Tous les caractères spéciaux = tous les caractères qui ne sont pas des lettre entre a et z + numéros
const specialCar = /[^a-zA-Z0-9]/;
const alphabet = /[a-z]/i;
const chiffres = /[0-9]/;
// Objet qui permet de valider les paramètres de validation du mdp : 1 symbole, 1 lettre et 1 chiffre
let objValidation = {
    symbole: 0,
    lettre: 0,
    chiffre: 0
};

inpMdp.addEventListener('input', (e) => {
    valeurInp = e.target.value;

    // Test à chaque modification du champ input
    if (valeurInp.search(specialCar) !== -1) {
        objValidation.symbole = 1;
    }
    if (valeurInp.search(alphabet) !== -1) {
        objValidation.lettre = 1;
    }
    if (valeurInp.search(chiffres) !== -1) {
        objValidation.chiffre = 1;
    }

    // Si on supprime un caractère
    if (e.inputType = 'deleteContentBackward') {
        if (valeurInp.search(specialCar) === -1) {
            objValidation.symbole = 0;
        }
        if (valeurInp.search(alphabet) === -1) {
            objValidation.lettre = 0;
        }
        if (valeurInp.search(chiffres) === -1) {
            objValidation.chiffre = 0;
        }
    }

    let testAll = 0;
    // Boucle for..in qui permet d'itérer à travers un objet
    for (const property in objValidation) {
        if (objValidation[property] > 0) {
            testAll++;
        }
    }
    // testAll = 3 si toutes les conditions remplies sur le mdp
    if (testAll < 3) {
        allImg[2].style.display = "inline";
        allImg[2].src = "ressources/error.svg";
        allSpan[2].style.display = "inline";
    } else {
        allImg[2].style.display = "inline";
        allImg[2].src = "ressources/check.svg";
        allSpan[2].style.display = "none";
    }

    // Force du mdp
    if (valeurInp.length <= 6 && valeurInp.length > 0) {
        // Faible
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'none';
        allLigne[2].style.display = 'none';
    } else if (valeurInp.length > 6 && valeurInp.length < 9) {
        // Moyen
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'block';
        allLigne[2].style.display = 'none';
    } else if (valeurInp.length > 9) {
        // Fort
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'block';
        allLigne[2].style.display = 'block';
    } else if (valeurInp.length === 0) {
        // Vide
        allLigne[0].style.display = 'none';
        allLigne[1].style.display = 'none';
        allLigne[2].style.display = 'none';
    }
});

// Confirmation du mdp
inpConfirm.addEventListener('input', (e) => {
    // Suivant l'input, on affiche le svg check / error
    if (e.target.value.length === 0) {
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.svg";
    }
    else if (e.target.value === valeurInp) {
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/check.svg";
    } else {
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.svg";
    }
})