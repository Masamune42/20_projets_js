// Liste d'affichage
const affichage = document.querySelector('.affichage');
// Boutons
const btns = document.querySelectorAll('button');
// Inputs
const inputs = document.querySelectorAll('input');
// Texte d'information
const infoTxt = document.querySelector('.info-txt');
// Booléen : si le cookie a déjà été créé
let dejaFait = false;

const today = new Date();
// On rajoute le temps en ms d'une semaine : 7 jours * 24h * 60min * 60s * 1000ms
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

// On transforme l'objet Date en string pour récupérer le jour
let day = ('0' + nextWeek).slice(9, 11);
// Le mois (commence à 0, donc +1)
let month = ('0' + (nextWeek.getMonth() + 1)).slice(-2);
let year = nextWeek.getFullYear();
// On place la date à J+7 dans l'input
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

btns.forEach(btn => {
    btn.addEventListener('click', btnAction);
});

function btnAction(e) {
    // Initialisation de l'objet
    let nvObj = {};

    inputs.forEach(input => {
        // On récupère chaque nom des inputs
        let attrName = input.getAttribute('name');
        // On prend la valeur des inputs sauf si date => valueAsDate
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        // On stock
        nvObj[attrName] = attrValeur;
    });

    // On récupère la valeur de l'attribut data-cookie
    let description = e.target.getAttribute('data-cookie');

    if (description === "creer") {
        creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);
    } else if (description === "toutAfficher") {
        listeCookies();
    }
}

function creerCookie(name, value, exp) {
    // Réiniatilisation du texte et de la liste d'affichage des cookies    
    infoTxt.innerText = "";
    affichage.innerHTML = "";

    // Si le cookie à un même nom
    let cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        cookie = cookie.trim();
        let formatCookie = cookie.split('=');
        console.log(formatCookie);
        // Si le nom du cookie existe déjà
        if (formatCookie[0] === encodeURIComponent(name)) {
            dejaFait = true;
        }
    })

    // Si le nom de cookie existe déjà => On le signale
    if (dejaFait) {
        infoTxt.innerText = "Un cookie possède déjà ce nom !";
        dejaFait = false;
        return;
    }

    // Si le cookie n'a pas de nom
    if (name.length === 0) {
        infoTxt.innerText = `Impossible de définir un cookie sans nom`;
        return;
    }
    // On crée le cookie : Encodage du nom et de la valeur (accents, espace...) + date expiration en format string
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;
    // On crée un li
    let info = document.createElement('li');
    // On écrit dans le li
    info.innerText = `Cookie ${name} créé.`;
    // Ajout du li au ul affichage
    affichage.appendChild(info);
    // Disparition du message de création au bout de 1,5s
    setTimeout(() => {
        info.remove();
    }, 1500);
}

function listeCookies() {
    let cookies = document.cookie.split(';');

    // Si aucun cookie
    if (cookies.join() === "") {
        infoTxt.innerText = "Pas de cookies à afficher";
        return;
    }

    cookies.forEach(cookie => {
        cookie = cookie.trim();
        let formatCookie = cookie.split('=');

        let item = document.createElement('li');

        infoTxt.innerText = "Cliquez sur un cookie dans la liste pour le supprimer";
        item.innerText = `Nom : ${decodeURIComponent(formatCookie[0])}, Valeur : ${decodeURIComponent(formatCookie[1])}`;

        affichage.appendChild(item);

        // Suppression cookie
        item.addEventListener('click', () => {
            // Redéfinition du cookie pour le supprimer
            document.cookie = `${formatCookie[0]}=;expires=${new Date(0)}`;
            item.innerText = `Cookie ${decodeURIComponent(formatCookie[0])} supprimé`;
            // Disparition du message au bout de 1s
            setTimeout(() => {
                item.remove();
            }, 1000);
        });
    });
}