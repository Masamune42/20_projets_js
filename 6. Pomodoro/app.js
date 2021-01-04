const affichageTravail = document.querySelector('.affichageT');
const affichagePause = document.querySelector('.affichageP');
const btnGo = document.querySelector('.b1');
const btnPause = document.querySelector('.b2');
const btnReset = document.querySelector('.b3');
const cycles = document.querySelector('h2');

// Vérification si on a déjà lancé le compteur
let checkInterval = false;
let tempsInitial = 1800; // 30min
let tempsDeRepos = 300; // 5min
// Vérification si on est en pause
let pause = false;
let nbDeCycles = 0;
cycles.innerText = `Nombre de cycles ${nbDeCycles}`;
// Pour les secondes, on vérifie si on est en dessous des dizaines : on rajoute un 0 (de 00 à 09), sinon affichage normal
affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
affichagePause.innerText = `${Math.trunc(tempsDeRepos / 60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;

btnGo.addEventListener('click', () => {
    // On lance le compteur si il n'y en a pas déjà un en cours
    if (checkInterval === false) {
        checkInterval = true;
        // On commence à décompter le temps de travail
        tempsInitial--;
        affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
        // Intervalle seconde par seconde
        let timer = setInterval(() => {
            // On ne fait rien si on est en pause à chaque fois
            // temps de travail
            if (pause === false && tempsInitial > 0) {
                tempsInitial--;
                affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
            }
            // Quand on a le temps de travail + de pause qui ont atteint 0, +1 cycle et reset du temps
            else if (pause === false && tempsDeRepos === 0 && tempsInitial === 0) {
                tempsInitial = 1800;
                tempsDeRepos = 300;
                nbDeCycles++;
                cycles.innerText = `Nombre de cycles ${nbDeCycles}`;
                affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
                affichagePause.innerText = `${Math.trunc(tempsDeRepos / 60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;

            }
            // Quand on a le temps de travail qui a atteint 0, début de la pause
            else if (pause === false && tempsInitial === 0) {
                tempsDeRepos--;
                affichagePause.innerText = `${Math.trunc(tempsDeRepos / 60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
            }
        }, 1000);

        // Bouton reset
        btnReset.addEventListener('click', () => {
            // On arrête l'interval de timer
            clearInterval(timer);
            // On indique que l'interval n'est plus lancé
            checkInterval = false;
            // Reset des temps + affichage
            tempsInitial = 1800;
            tempsDeRepos = 300;
            affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
            affichagePause.innerText = `${Math.trunc(tempsDeRepos / 60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
        })
    } else {
        // Si on clique pour lancer un timer déjà actif, rien ne se passe
        return;
    }
});

// Bouton de pause
btnPause.addEventListener('click', () => {
    // Affichage du texte suivant l'état
    if (pause === false) {
        btnPause.innerText = "Play";
    } else if (pause === true) {
        btnPause.innerText = "Pause";
    }
    // On toggle pause
    pause = !pause;
})