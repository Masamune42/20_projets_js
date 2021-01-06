const canvas = document.querySelector('canvas');
// On récupère toutes les méthodes pour créer nos éléments
const ctx = canvas.getContext('2d');
const affichageScore = document.querySelector('.score');

// Rayon de la balle, hauteur, largeur de la barre, nb colonnes, lignes de briques, largeur des briques, hauteur des briques
const rayonBalle = 10, barreHeight = 10, barreWidth = 75,
    nbCol = 8, nbRow = 5, largeurBrique = 75, hauteurBrique = 20;

// position en x, y de la balle, booléen de fin de partie
let x = canvas.width / 2, y = canvas.height - 30, fin = false;

// Position de la barre
barreX = (canvas.width - barreWidth) / 2;
// Vitesse de la balle dans les 2 directions
vitesseX = 5;
vitesseY = -5;
// Score du joueur
score = 0;

function dessineBalle() {
    // Début du dessin
    ctx.beginPath();
    // On dessine un cercle
    ctx.arc(x, y, rayonBalle, 0, Math.PI * 2);
    // Couleur du remplissage
    ctx.fillStyle = '#333';
    // Remplissage
    ctx.fill();
    ctx.closePath();
}

function dessineBarre() {
    ctx.beginPath();
    // On dessine un rectangle
    ctx.rect(barreX, canvas.height - barreHeight - 2, barreWidth, barreHeight);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// Tableau avec toutes les briques
const briques = [];
for (let i = 0; i < nbRow; i++) {
    briques[i] = [];
    for (let j = 0; j < nbCol; j++) {
        // Création d'un objet brique
        briques[i][j] = { x: 0, y: 0, statut: 1 };
    }
}

function dessineBriques() {
    for (let i = 0; i < nbRow; i++) {
        for (let j = 0; j < nbCol; j++) {
            if (briques[i][j].statut === 1) {
                // 75 * 8 + 10 * 8 + 35 = 750 (largeur totale du canvas)
                // 75 -> largeur de la brique, 10 -> décallage entre les briques, 35 -> nb de pixels restants à droite
                // 8 -> j
                let briqueX = (j * (largeurBrique + 10) + 35)
                let briqueY = (i * (hauteurBrique + 10) + 30)

                // On déclare les positions de chaque objet brique dans le tableau
                briques[i][j].x = briqueX;
                briques[i][j].y = briqueY;

                // On dessine chaque brique
                ctx.beginPath();
                ctx.rect(briqueX, briqueY, largeurBrique, hauteurBrique);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function dessine() {
    // Tant que la partie n'est pas finie, anime le jeu
    if (fin === false) {
        // On supprime tout dans le canvas == on rafraichit périodiquement avec chaque appel de requestAnimationFrame() / Sinon laisse des traces de chaque passage de la barre + balle
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dessineBriques();
        dessineBalle();
        dessineBarre();
        // Détection de la collision de la balle avec les briques
        collisionDetection();

        // si la position de la balle + sa vitesse > largeur du canva - rayon de la balle == la balle touche le bord gauche ou droit
        if (x + vitesseX > canvas.width - rayonBalle || x + vitesseX < rayonBalle) {
            vitesseX = -vitesseX;
        }

        // si la position de la balle + sa vitesse > largeur du canva - rayon de la balle == la balle touche le bord gauche ou droit
        if (y + vitesseY < rayonBalle) {
            vitesseY = -vitesseY;
        }

        // Si la balle touche le bas avec la barre
        if (y + vitesseY > canvas.height - rayonBalle) {
            // SI la balle est dans l'intervalle de la barre
            if (x > barreX && x < barreX + barreWidth) {
                // La balle accélère à chaque fois qu'elle tape sur la barre
                vitesseX += 0.1;
                vitesseY += 0.1;
                // La balle est renvoyée
                vitesseY = -vitesseY;
            } else { // Sinon, fin de la partie
                fin = true;
                affichageScore.innerHTML = `Perdu ! <br> Clique sur le casse brique pour recommencer`;
            }
        }

        // On change la position de la balle suivant la vitesse
        x += vitesseX;
        y += vitesseY;
        // Appel la fonction 60 fois par seconde = illusion de mouvement
        requestAnimationFrame(dessine);
    }
}

dessine();

function collisionDetection() {
    for (let i = 0; i < nbRow; i++) {
        for (let j = 0; j < nbCol; j++) {
            // Position de chaque brique
            let b = briques[i][j];
            // Si la brique n'est pas détruite
            if (b.statut === 1) {
                // Si la balle touche une brique
                if (x > b.x && x < b.x + largeurBrique && y > b.y && y < b.y + hauteurBrique) {
                    vitesseY = -vitesseY;
                    b.statut = 0;

                    score++;
                    affichageScore.innerHTML = `Score : ${score}`;

                    // Si on a détruit toutes les briques
                    if (score === nbCol * nbRow) {
                        affichageScore.innerHTML = `Bravo! <br> Clique sur le casse-brique si tu veux recommencer`;
                        fin = true;
                    }
                }
            }
        }
    }
}

// Mouvement de la barre
document.addEventListener('mousemove', mouvementSouris);

function mouvementSouris(e) {
    let postXBarreCanvas = e.clientX - canvas.offsetLeft;
    // e.clientX = position en X de la gauche de l'écran jusqu'au curseur de la souris
    // canvas.offsetLeft = décalage par rapport à la gauche
    // Si on a 35px de "sécurité" pour pas que la barre sorte du canvas
    if (postXBarreCanvas > 35 && postXBarreCanvas < canvas.width - 35) {
        barreX = postXBarreCanvas - barreWidth / 2;
    }
}


// Recommencer la partie
canvas.addEventListener('click', () => {
    if (fin === true) {
        fin = false;
        document.location.reload();
    }
});