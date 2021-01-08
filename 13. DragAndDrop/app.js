let base = document.querySelector('.base');
const premiereCase = document.getElementById('premiere-case');
const boxes = document.querySelectorAll('.case');
const destroy = document.querySelector('.destroy');
const allCases = [];
const choix = [];
let photoEnEcours;

for (let i = 0; i < boxes.length; i++) {
    allCases.push(boxes[i]);
}
allCases.push(destroy);

let indexPhoto = 1;

base.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
photoEnEcours = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;

function nvBase() {
    // On crée une nouvelle div avec les même attributs que la base
    const newBase = document.createElement('div');
    newBase.setAttribute('class', 'base');
    newBase.setAttribute('draggable', 'true');
    // Incrémentation de l'index de la photo à afficher
    indexPhoto++;
    // On génère la nouvelle photo
    newBase.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
    // On actualise la photo en cours
    photoEnEcours = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
    // On place la photo dans la case de sélection
    premiereCase.appendChild(newBase);
    // On remplace la base actuelle (base = image n-1) par la nouvelle (newBase = image n)
    base = newBase;
}

for (const vide of allCases) {
    // dragover : quand on survol un élément avec un autre qu'on est en train de déplacer (n'importe quel moment)
    vide.addEventListener('dragover', dragOver);
    // dragenter : quand on rentre dans l'espace d'un élément (s'enclenche la 1ère fois qu'on rentre dans l'élément concerné)
    vide.addEventListener('dragenter', dragEnter);
    // Quand on lâche l'élément
    vide.addEventListener('drop', dragDrop);
}

function dragDrop(e) {
    if (this.id === "premiere-case") {
        return;
    }
    // destroy
    if (this.id === "destroy") {
        base.remove();
        nvBase();
        return
    }

    // Verrouillage
    this.removeEventListener('dragover', dragOver);
    // dragenter : quand on rentre dans l'espace d'un élément (s'enclenche la 1ère fois qu'on rentre dans l'élément concerné)
    this.removeEventListener('dragenter', dragEnter);
    // Quand on lâche l'élément
    this.removeEventListener('drop', dragDrop);

    // L'image qu'on a prise (base) est déplacée dans l'élément où on l'a drop
    this.appendChild(base);
    // On supprime l'attribut draggable de l'image qu'on a placée
    this.childNodes[0].setAttribute('draggable', false);
    nvBase();
    // On ajoute la photo en cours au tableau
    choix.push(photoEnEcours);
    // Si on a placé 3 images, affichage d'un message
    if (choix.length === 3) {
        setTimeout(() => {
            alert('Sélection terminée !');
        }, 200);
    }
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}