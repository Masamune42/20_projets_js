const container = document.querySelector('.grille');
const affichage = document.querySelector('h3');

let resultat = 0;
let toutesLesDivs;
let alienInvaders = [];
let tireurPosition = 229;
let direction = 1;
let width = 20;

function creationGrilleEtAliens() {
    let indexAttr = 0;

    for (let i = 0; i < 240; i++) {
        // A chaque fois qu'on crée un 1er bloc il aura data-left = true
        if (indexAttr === 0) {
            const bloc = document.createElement('div');
            bloc.setAttribute('data-left', 'true');
            container.appendChild(bloc);
            indexAttr++;
        } else if (indexAttr === 19) { // Le dernier bloc de la ligne est à data-right = true
            const bloc = document.createElement('div');
            bloc.setAttribute('data-right', 'true');
            container.appendChild(bloc);
            indexAttr = 0;
        }
        else {
            const bloc = document.createElement('div');
            container.appendChild(bloc);
            indexAttr++;
        }
    }

    // Position des aliens dans le tableau à partir de la case en haut à gauche (0) jusqu'à la dernière
    for (let i = 1; i < 53; i++) {
        // Si on se trouve sur la case 13, on va directemenet à la 21, idem 33 => 41
        if (i === 13) {
            i = 21;
            alienInvaders.push(i);
        } else if (i === 33) {
            i = 41;
            alienInvaders.push(i);
        } else {
            alienInvaders.push(i);
        }
    }
    // Il y aura donc des aliens de la case 1 à 12 + 21 à 32 + 41 à 52

    toutesLesDivs = document.querySelectorAll('.grille div');
    alienInvaders.forEach(invader => {
        toutesLesDivs[invader].classList.add('alien');
    });

    toutesLesDivs[tireurPosition].classList.add('tireur');
}

creationGrilleEtAliens();

// Déplacement avec les touches gauche et droite
function deplacerLeTireur(e) {
    toutesLesDivs[tireurPosition].classList.remove('tireur');
    if (e.keyCode === 37) {
        if (tireurPosition > 220) {
            tireurPosition--;
        }
    }
    if (e.keyCode === 39) {
        if (tireurPosition < 239) {
            tireurPosition++;
        }
    }

    toutesLesDivs[tireurPosition].classList.add('tireur');
}

document.addEventListener('keydown', deplacerLeTireur);

// bouger les aliens
let descendreRight = true;
let descendreLeft = true;

function bougerLesAliens() {
    for (let i = 0; i < alienInvaders.length; i++) {
        // Si on se trouve sur un bord droit, on descend
        if (toutesLesDivs[alienInvaders[i]].getAttribute('data-right') === 'true') {
            // On vérifie si on peut descendre à droite
            if (descendreRight) {
                // direction: 1 => on avance de 1 case, direction 20: on avance de 20 cases == on descend d'une ligne
                direction = 20;
                setTimeout(() => {
                    descendreRight = false;
                }, 20);
            }
            // Si on vient de descendre, on inverse la direction
            else if (descendreRight === false) {
                direction = -1;
            }
            descendreLeft = true;
            // Si on se trouve sur un bord gauche, on descend
        } else if (toutesLesDivs[alienInvaders[i]].getAttribute('data-left') === 'true') {
            // On vérifie si on peut descendre à gauche
            if (descendreLeft) {
                direction = 20;
                setTimeout(() => {
                    descendreLeft = false;
                }, 20);
            }
            // Si on vient de descendre, on inverse la direction
            else if (descendreLeft === false) {
                direction = 1;
            }
            descendreRight = true;
        }
    }

    // On retire tous les aliens
    for (let i = 0; i < alienInvaders.length; i++) {
        toutesLesDivs[alienInvaders[i]].classList.remove('alien');
    }
    // On avance tous les aliens dans la direction
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }
    // On affiche à nouveau tous les aliens
    for (let i = 0; i < alienInvaders.length; i++) {
        toutesLesDivs[alienInvaders[i]].classList.add('alien');
    }

    // Si un alien et un joueur se trouvent sur la même case
    if (toutesLesDivs[tireurPosition].classList.contains('alien', 'tireur')) {
        affichage.textContent = "Game Over";
        toutesLesDivs[tireurPosition].classList.add('boom');
        clearInterval(invaderId);
    }

    // Si un alien a touché le bas
    for (let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > toutesLesDivs.length - width) {
            affichage.textContent = 'Game Over';
            clearInterval(invaderId);
        }
        
    }
}

// On bouge les aliens toutes les 500ms
invaderId = setInterval(bougerLesAliens, 500);

// Le laser
function tirer(e) {
    let laserId;
    let laserEnCours = tireurPosition;

    function deplacementLaser() {
        toutesLesDivs[laserEnCours].classList.remove('laser');
        laserEnCours -= width;
        toutesLesDivs[laserEnCours].classList.add('laser');

        // Si notre laser touche un alien
        if (toutesLesDivs[laserEnCours].classList.contains('alien')) {
            // On retire le laser et l'alien
            toutesLesDivs[laserEnCours].classList.remove('laser');
            toutesLesDivs[laserEnCours].classList.remove('alien');
            // On ajoute un boom
            toutesLesDivs[laserEnCours].classList.add('boom');

            // On filtre le tableau des aliens : On retire la position de l'alien qui correspond à celui du laser
            alienInvaders = alienInvaders.filter(el => el !== laserEnCours);

            // On retire le boom après 250ms
            setTimeout(() => {
                toutesLesDivs[laserEnCours].classList.remove('boom');
            }, 250);
            // On arrête l'affichage du laser tiré
            clearInterval(laserId);

            // On incrémente le résultat
            resultat++;
            // Si on a tué tous les aliens, on affiche la phrase, sinon le score
            if (resultat === 36) {
                affichage.textContent = "Bravo ! c'est gagné";
                clearInterval(invaderId);
            } else {
                affichage.textContent = `Score : ${resultat}`;
            }
        }

        // SI le laser a atteint la 1ère ligne, on le supprime
        if (laserEnCours < width) {
            clearInterval(laserId);
            setTimeout(() => {
                toutesLesDivs[laserEnCours].classList.remove('laser');
            }, 100);
        }
    }

    if (e.keyCode === 32) {
        laserId = setInterval(() => {
            deplacementLaser();
        }, 100);
    }
}

document.addEventListener('keyup', tirer);