const APICALL = 'http://api.quotable.io/random';

const tempsAffichage = document.querySelector('.temps');
const scoreAffichage = document.querySelector('.score');

const phraseAEcrire = document.querySelector('.phraseAEcrire');
const phraseTest = document.querySelector('.phrase-test');

let temps = 60;
let score = 0;
let phrasePourScore;

tempsAffichage.innerText = `Temps : ${temps}`;

// Timer
let timer = setInterval(time, 1000);

// Compteur temps + score
function time() {
    temps--;
    tempsAffichage.innerText = `Temps : ${temps}`;
    scoreAffichage.innerText = `Score : ${score}`;
}

// Prendre une phrase de l'API

async function afficherNvPhrase() {
    const appel = await fetch(APICALL);
    const resultats = await appel.json();
    const phrase = resultats.content;

    phraseAEcrire.innerHTML = '';
    // On récupère la phrase, on place chaque lettre dans un tableau et on crée des span autour de chaque lettre
    phrase.split('').forEach(carac => {
        // On crée un élément span
        const caracSpan = document.createElement('span');
        // On écrit le caractère dans le span
        caracSpan.innerText = carac;
        // On affiche le caractère entourée du span
        phraseAEcrire.appendChild(caracSpan);
    });
    // Le score de la phrase = sa taille
    phrasePourScore = phrase.length;
    // On vide la phrase écrite à chaque nouvelle phrase générée
    phraseTest.value = null;
}

afficherNvPhrase();

phraseTest.addEventListener('input', () => {
    // On récupère tous les span de la phrase = chaque lettre de la phrase dans un tableau
    const tableauPhrase = phraseAEcrire.querySelectorAll('span');
    // On récupère la phrase écrite et on sépare chaque lettre dans un tableau
    const tableauTest = phraseTest.value.split('');

    let correct = true;
    // On récupère (valeur, index) pour vérifier chaque lettre de la phrase à écrire
    tableauPhrase.forEach((caracSpan, index) => {
        // On récupère la lettre que l'on a écrit à l'index indiqué
        const caractere = tableauTest[index];

        // Si le caractère n'a pas encore été écrit = vérification uniquement sur le nombre de caractères entrées
        if (caractere == null) {
            caracSpan.classList.remove('correct');
            caracSpan.classList.remove('incorrect');
            correct = false;
        }
        // Si la lettre que l'on a écrite et la même que celle à écrire
        else if (caractere === caracSpan.innerText) {
            caracSpan.classList.add('correct');
            caracSpan.classList.remove('incorrect');
        } else { // Sinon, si la lettre écrite n'est pas la bonne
            caracSpan.classList.remove('correct');
            caracSpan.classList.add('incorrect');
            correct = false;
        }
    });

    // Si on a pas rencontré de lettre fausse ou s'il ne manque pas de lettre, création d'une nouvelle phrase + affichage du score
    if(correct) {
        afficherNvPhrase();
        score += phrasePourScore;
    }
});