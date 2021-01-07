const btnInscription = document.querySelector('.btn-inscription');
const btnConnexion = document.querySelector('.btn-connexion');
const deco = document.querySelector('.btn-deco');

const formIncription = document.querySelector('.form-inscription');
const emailInscription = document.querySelector('.email-inscription');
const mdpInscription = document.querySelector('.mdp-inscription');

const formConnexion = document.querySelector('.form-connexion');
const emailConnexion = document.querySelector('.email-connexion');
const mdpConnexion = document.querySelector('.mdp-connexion');

// Menu d'inscription
btnInscription.addEventListener('click', () => {
    if (formConnexion.classList.contains('apparition')) {
        formConnexion.classList.remove('apparition');
    }
    formIncription.classList.toggle('apparition');
});

// Menu de connexion
btnConnexion.addEventListener('click', () => {
    if (formIncription.classList.contains('apparition')) {
        formIncription.classList.remove('apparition');
    }
    formConnexion.classList.toggle('apparition');
});

// Connexion
formIncription.addEventListener('submit', (e) => {
    e.preventDefault();
    // Récupération email et mdp
    const mailValeur = emailInscription.value;
    const mdpInscriptionValeur = mdpInscription.value;

    // Authentification
    auth.createUserWithEmailAndPassword(mailValeur, mdpInscriptionValeur).
        then(cred => {
            console.log(cred);
            // Reset les input du formulaire
            formIncription.reset();
            formIncription.classList.toggle('apparition');
        });
});

// Connexion
formConnexion.addEventListener('submit', (e) => {
    e.preventDefault();
    const mailValeur = emailConnexion.value;
    const mdpConnexionValeur = mdpConnexion.value;

    // Connexion
    auth.signInWithEmailAndPassword(mailValeur, mdpConnexionValeur).
        then(cred => {
            console.log("connexion", cred.user);
            formConnexion.reset();
            formConnexion.classList.toggle('apparition');
        });
});

// Déconnexion
deco.addEventListener('click', (e) => {
    e.preventDefault();
    // Déconnexion
    auth.signOut().then(() => {
        console.log("Déconnecté");
    });
});

// Gérer le contenu
const h1 = document.querySelector('h1');
const info = document.querySelector('.info');
auth.onAuthStateChanged(utilisateur => {
    if(utilisateur) {
        info.innerText = "Voici le contenu privé !";
        h1.innerText = "Vous voilà de retour ! =)";
    } else {
        console.log("Déconnexion utilisateur");
        info.innerText = 'Contenu public !';
        h1.innerText = "Bienvenue, inscrivez-vous ou connectez-vous";
    }
})