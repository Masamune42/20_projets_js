const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// On redéfini que les dimensions du canvas sont égales à celles de la fenêtre
ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight
let particuleTab;

class Particule {
    constructor(x, y, directionX, directionY, taille, couleur) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.taille = taille;
        this.couleur = couleur;
    }

    // Fonction pour dessiner les particules
    dessine() {
        // Début du dessin
        ctx.beginPath();
        // On trace le cercle de la particule
        ctx.arc(this.x, this.y, this.taille, 0, Math.PI * 2, false);
        // On donne la couleur et on rempli
        ctx.fillStyle = this.couleur;
        ctx.fill();
        // Fin du dessin
        ctx.closePath();
    }

    // Met à jour le dessin
    MAJ() {
        // Si la particule touche un bord gauche ou droit, on inverse la direction
        if (this.x + this.taille > canvas.width || this.x - this.taille < 0) {
            this.directionX = -this.directionX;
        }
        // Si la particule touche un bord haut ou bas, on inverse la direction
        if (this.y + this.taille > canvas.height || this.y - this.taille < 0) {
            this.directionY = -this.directionY;
        }

        // On bouge la particule sur les 2 axes
        this.x += this.directionX;
        this.y += this.directionY;

        // On affiche les particules
        this.dessine();
    }
}

// Fonction qui initialise toutes les particules à afficher
function init() {
    particuleTab = [];
    for (let i = 0; i < 100; i++) {
        // Taille de la particule
        let taille = (Math.random() + 0.01) * 20;
        // Position sur x : on enlève taille * 2 pour éviter que ça apparaisse sur les bordure
        let x = Math.random() * (window.innerWidth - taille * 2);
        // Position sur y
        let y = Math.random() * (window.innerHeight - taille * 2);
        // On défini la direction dans chaque axe
        // On retourne une valeur entre -0,2 et 0,2 pour la vitesse de déplacement
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let couleur = "white";

        // On ajoute la particule au tableau
        particuleTab.push(new Particule(x, y, directionX, directionY, taille, couleur));
    }
}

// Fonction qui anime les particules
function animation() {
    // Exécute cette fonction 60 fois / seconde
    requestAnimationFrame(animation);
    // Nettoie le rectangle (rafrachissement)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // On appel la fonction maj pour chaque particule
    for (let i = 0; i < particuleTab.length; i++) {
        particuleTab[i].MAJ();
    }
}

init();
animation();

function resize() {
    init();
    animation();
}

window.addEventListener('resize', () => {
    clearTimeout(doit);
    // QUand on resize, on va attendre 0,1s et on redimensionne les particules à la bonne taille
    doit = setTimeout(() => resize, 100);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})