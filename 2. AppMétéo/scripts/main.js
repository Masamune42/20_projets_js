// On importe le tableau renvoyé par gestionTemps.js
import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';
// Clé d'API Open Weather
const CLEFAPI = '64ece616c8e5bd3297696304c20883c2';
let resultatsAPI;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
// On sélectionne chaque bloc d'heure
const heure = document.querySelectorAll('.heure-nom-prevision');
// On sélectionne chaque bloc de température pour chaque heure
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
// On sélectionne tous les blocs de nom des jours
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
// On sélectionne tous les blocs de température des jours
const tempsJoursDiv = document.querySelectorAll('.jour-prevision-temp');
// On sélectionne le bloc de l'icone du temps
const imageIcone = document.querySelector('.logo-meteo');
// On sélectionne le bloc de chargement
const chargementContainer = document.querySelector('.overlay-icone-chargement');

// On vérifie que le navigateur possède la géolocalisation
if (navigator.geolocation) {
    // Vérifie si on peut accéder à la géolocalisation (envoie une demande sur chrome)
    // position : position avec longitude, latitude, altitude
    navigator.geolocation.getCurrentPosition(position => { // Si on a accepté de partager notre position
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);
    }, () => { // Si on a refusé
        alert(`Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer !`)
    })
}


function AppelAPI(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
        // On résout la promesse
        .then((reponse) => {
            // On reçoit des données qu'on transforme au format JSON pour les manipuler
            return reponse.json()
        })
        // On récupère les données renvoyées par le 1er then
        .then((data) => {
            resultatsAPI = data;
            // On affiche le temps
            temps.innerText = resultatsAPI.current.weather[0].description;
            // On affiche la température
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
            localisation.innerText = resultatsAPI.timezone;

            // Les heures, par tranche de 3h, avec leur température
            let heureActuelle = new Date().getHours();

            for (let i = 0; i < heure.length; i++) {
                // Incrémenteur des heures par tranche de 3
                let heureIncr = heureActuelle + i * 3;
                if (heureIncr > 24) {
                    heure[i].innerText = `${heureIncr - 24} h`;
                } else if (heureIncr === 24) {
                    heure[i].innerText = `00 h`;
                } else {
                    heure[i].innerText = `${heureIncr} h`;
                }
            }

            // Températures par tranche de 3h
            for (let i = 0; i < tempPourH.length; i++) {
                tempPourH[i].innerText = `${Math.trunc(resultatsAPI.hourly[i * 3].temp)}°`;
            }

            // 3 1ères lettres des jours
            for (let i = 0; i < tabJoursEnOrdre.length; i++) {
                joursDiv[i].innerText = tabJoursEnOrdre[i].slice(0, 3);
            }

            // Température par jour
            for (let i = 0; i < 7; i++) {
                tempsJoursDiv[i].innerText = `${Math.trunc(resultatsAPI.daily[i + 1].temp.day)}°`;
            }

            // Icone dynamique
            // Si on est le jour: icone de jour, sinon nuit
            if (heureActuelle >= 6 && heureActuelle < 21) {
                imageIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
            } else {
                imageIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`;
            }

            // On ajoute la classe disparition au bloc de chargement pour la faire disparaitre au fur et à mesure
            chargementContainer.classList.add('disparition');
        })
}