const inputsCouleur = document.querySelectorAll('.inp-couleur');
const inputRange = document.querySelector('.inp-range');
const btns = document.querySelectorAll('button');
const fond = document.body;
const containerCouleurs = document.querySelector('.container-couleurs');
const span = document.querySelector('span');
const btnRandom = document.querySelector('.random');

// Init
let valCouleurs = ['#BA5370', '#F4E2D8'];
let inclinaison = 45;
let index = 3;
// On place les valeurs des couleurs dans les inputs
inputsCouleur[0].value = valCouleurs[0];
inputsCouleur[1].value = valCouleurs[1];
inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];
fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;

// Inclinaison
inputRange.addEventListener('input', (e) => {
    inclinaison = e.target.value * 3.6;
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
});

// Rajout / Suppression
btns.forEach(btn => {
    btn.addEventListener('click', rajouteEnleve);
});

function rajouteEnleve(e) {
    // On affiche pas le texte d'indication
    span.innerText = '';
    // On sélectionne tous les inputs de couleur
    const allInputs = document.querySelectorAll('.inp-couleur');
    // On crée un code hexadécimal à 8 caractères au hasard
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    if (e.target.className === "plus") {
        // On ne peut pas créer plus de 8 inputs
        if (allInputs.length > 8) {
            return;
        }

        // On crée un nouvel input avec les mêmes attributs que les autres
        const nvCouleur = document.createElement('input');
        nvCouleur.setAttribute('class', 'inp-couleur');
        nvCouleur.setAttribute('data-index', index);
        nvCouleur.setAttribute('maxlength', 7);
        // Nouvelle couleur random
        nvCouleur.value = `#${randomColor.toUpperCase()}`;
        nvCouleur.style.background = `#${randomColor}`;
        containerCouleurs.appendChild(nvCouleur);
        // On ajoute bien la nouvelle couleur au tableau des couleurs
        valCouleurs.push(`#${randomColor.toUpperCase()}`);
        // On update le background
        fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
        // Ajout d'un index
        index++;
    } else if (e.target.className === "moins") {
        // On ne peut retirer la dernière couleur que si on en a PLUS de 2
        if (valCouleurs.length === 2) {
            span.innerText = 'Il faut au moins 2 couleurs !';
        } else {
            // On retire la dernière valeur entrée dans le tableau
            valCouleurs.pop();
            // On retire le dernier input
            allInputs[allInputs.length - 1].remove();
            index--;
            fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
        }
    }

    // Maj des inputs
    allInputs.forEach(inp => {
        inp.addEventListener('input', MAJCOLORS);
    });
}

// Inputs par défaut
inputsCouleur.forEach(inp => {
    inp.addEventListener('input', MAJCOLORS);
});

// Bouton random
btnRandom.addEventListener('click', () => {
    // Récupération des inputs actuels
    const inputs = document.querySelectorAll('.inp-couleur');
    // Pour chaque input existant, génération d'une couleur au hasard
    for (i = 0; i < valCouleurs.length; i++) {
        valCouleurs[i] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        inputs[i].value = valCouleurs[i].toUpperCase();
        inputs[i].style.background = valCouleurs[i].toUpperCase();
        fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
    }
});

function MAJCOLORS(e) {
    let indexEnCours = e.target.getAttribute('data-index');
    e.target.value = e.target.value.toUpperCase();
    // On change la couleur suivant l'indice de son code dans le tableau
    valCouleurs[indexEnCours - 1] = e.target.value;
    // MAJ de la couleur
    e.target.style.background = valCouleurs[indexEnCours - 1];
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
}