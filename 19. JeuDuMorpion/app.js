const info = document.querySelector('.info');
const cellules = document.querySelectorAll('.cell');

let verrouillage = true;
let joueurEnCours = "X";

info.innerHTML = `Au tour de ${joueurEnCours}`;

// Tableau indiquant les alignements de symboles gagnants
const alignementsGagnants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Tableau qui rassemble les coups joués
let partieEnCours = ["", "", "", "", "", "", "", "", ""];

cellules.forEach(cell => {
    cell.addEventListener('click', clicSurCase);
});

function clicSurCase(e) {
    // On récupère l'élément sur lequel on a cliqué
    const caseClique = e.target;
    // On récupère le data-index de la case
    const caseIndex = caseClique.getAttribute('data-index');

    // Si on clique sur une case qui n'est pas vide OU si la partie est verrouillée
    if (partieEnCours[caseIndex] !== "" || !verrouillage) {
        return;
    }
    // On remplie la case cliquée part le signe du joueur
    partieEnCours[caseIndex] = joueurEnCours;
    // On affiche le coup joué sur la case
    caseClique.innerHTML = joueurEnCours;

    validationResultat();
}

function validationResultat() {
    let finDePartie = false;

    for (let i = 0; i < alignementsGagnants.length; i++) {
        const checkWin = alignementsGagnants[i];

        // On récupère les 3 numéros de cases gagnantes
        let a = partieEnCours[checkWin[0]];
        let b = partieEnCours[checkWin[1]];
        let c = partieEnCours[checkWin[2]];

        // Si une des 3 cases est vide, on continue
        if(a === '' || b === '' || c === '') {
            continue;
        }
        // Si les 3 cases ont le même signe, fin de partie et on quitte la boucle
        if(a === b && b === c) {
            finDePartie = true;
            break;
        }
    }

    // Si fin de partie, on affiche le joueur qui a gagné, on verrouille le jeu et on quitte la fonction
    if(finDePartie) {
        info.innerText = `Le joueur ${joueurEnCours} a gagné !`;
        verrouillage = false;
        return;
    }

    // S'il n'y a pas de chaine de caractères vides dans partie en cours et qu'aucun joueur n'a gagné, match nul
    let matchNul = !partieEnCours.includes('');
    if(matchNul) {
        info.innerText = 'Match Nul';
        verrouillage = false;
        return;
    }

    ChangementDeJoueur();
}

// Fonction qui inverse le signe du joueur
function ChangementDeJoueur() {
    joueurEnCours = joueurEnCours === "X" ? "O" : "X";
    info.innerText = `Au tour de ${joueurEnCours}`;
}