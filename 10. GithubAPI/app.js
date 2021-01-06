const APICALL = "https://api.github.com/users/";
const affichage = document.querySelector('.affichage');
const form = document.querySelector('.form-github-recherche');
const inpRecherche = document.querySelector('.inp-recherche');

// async = asynchrone, on aura des attentes de réponses d'une requête faite sur une autre page qui va renvoyer des informations
async function dataGithub(utilisateur) {
    const reponse = await fetch(`${APICALL}${utilisateur}`);
    const data = await reponse.json();
    // On crée la carte et on l'affiche
    creationCarte(data);
}

// On recherche l'utilisateur par défaut
dataGithub("Masamune42");

function creationCarte(user) {
    const carteHTML = `
    <div class="carte">
        <img src="${user.avatar_url}" alt="icone avatar" class="avatar">
        <h2>${user.name}</h2>
        <ul class="cont-infos">
            <li class="followers">Followers : ${user.followers}</li>
            <li class="etoiles">Repos : ${user.public_repos}</li>
            <li class="bio">Bio : ${user.bio}</li>
        </ul>
    </div>
    `;
    // On affiche la carte qu'on a créée
    affichage.innerHTML = carteHTML;
}

// Recherche d'un user
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inpRecherche.value.length > 0) {
        dataGithub(inpRecherche.value);
        inpRecherche.value = "";
    }
})