// Formulaire
const form = document.querySelector('.form-quizz');
// Tableau des résultats
let tableauResults = [];
// Bonnes réponses du quizz
const reponses = ['c', 'a', 'b', 'a', 'c'];
// Emojis à utiliser
const emojis = ['✔️', '✨', '👀', '😭', '👎'];
// Titre du résultat
const titreResultat = document.querySelector('.resultats h2');
// Note des réponses
const noteResultat = document.querySelector('.note');
// Phrase d'aide si toutes les réponses ne sont pas validées
const aideResultat = document.querySelector('.aide');
// Tous les blocs de questions
const toutesLesQuestions = document.querySelectorAll('.question-block');
// Tableau des résultats
let verifTableau = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Pour chaque input avec un nom q + [numéro question], on récupère la valeur valeur checked pour l'ajouter au tableau des résultats
    for (i = 1; i < 6; i++) {
        tableauResults.push(document.querySelector(`input[name="q${i}"]:checked`).value)
    }
    verifFunc(tableauResults);
    // Reset du tableau des résultats pour retenter sa chance
    tableauResults = [];
})

function verifFunc(tabResultats) {
    // Pour chaque case du tableau des résultats, on va vérifier sur les réponses sont bonnes (true) ou mauvaises (false)
    for (let a = 0; a < 5; a++) {
        if (tabResultats[a] === reponses[a]) {
            verifTableau.push(true);
        } else {
            verifTableau.push(false);
        }
    }

    // Affichage du résultat en bas de la page
    afficherResultats(verifTableau);
    // Coloration des blocs de réponses
    couleursFonction(verifTableau);
    // Reset du tableau des résultats pour retenter notre chance
    verifTableau = [];
}

function afficherResultats(tabCheck) {
    // On filtre le tableau de réponses en retirant toutes les valeurs à true et on récupère sa taille
    const nbDeFautes = tabCheck.filter(el => el !== true).length;
    // Suivant le nombre de fautes détectées on prépare du texte
    switch (nbDeFautes) {
        case 0:
            titreResultat.innerText = `✔️ Bravo, c'est un sans faute ! ✔️`
            aideResultat.innerText = ''
            noteResultat.innerText = '5/5'
            break;
        case 1:
            titreResultat.innerText = `✨ Vous y êtes presque ! ✨`
            aideResultat.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !'
            noteResultat.innerText = '4/5'
            break;
        case 2:
            titreResultat.innerText = `✨ Encore un effort ... 👀`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '3/5'
            break;
        case 3:
            titreResultat.innerText = `👀 Il reste quelques erreurs. 😭`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '2/5'
            break;
        case 4:
            titreResultat.innerText = `😭 Peux mieux faire ! 😭`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '1/5'
            break;
        case 5:
            titreResultat.innerText = `👎 Peux mieux faire ! 👎`
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !'
            noteResultat.innerText = '0/5'
            break;

        default:
            'Wops, cas innatendu.';
    }
}

function couleursFonction(tabValBool) {
    // Pour chaque question on vérifie si la réponse est bonne et on colore les bonnes / mauvaises réponses
    for (let j = 0; j < tabValBool.length; j++) {
        if (tabValBool[j] === true) {
            toutesLesQuestions[j].style.background = 'lightgreen';
        } else {
            toutesLesQuestions[j].style.background = '#FFB8B8';
            // Classe échec sur les mauvaises réponses pour faire bouger
            toutesLesQuestions[j].classList.add('echec');
            // On retire la classe échec pour pouvoir la réaffecter si la réponse est encore mauvaise
            setTimeout(() => {
                toutesLesQuestions[j].classList.remove('echec');
            }, 500);
        }
    }
}
// Quand on reclic sur un bloc de réponse, on retire la couleur de fond de réponses
toutesLesQuestions.forEach(item => {
    item.addEventListener('click', () => {
        item.style.background = "white";
    })
});