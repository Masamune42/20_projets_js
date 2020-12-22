const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let ajd = new Date();
let options = { weekday: 'long' };
let jourActuel = ajd.toLocaleDateString('fr-FR', options);

// On passe la 1ère lettre du jour actuel en majuscule
jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

// En 2 étapes :
// 1. slice : on récupère le tableau de la semaine en commençant par aujourd'hui
// 2. concat : On ajoute le tableau de la semaine jusqu'à aujourd'hui
// Résultat : On récupère le tableau avec une semaine entière à partir d'aujourdhui
let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));

// On exporte le tableau sur la semaine
export default tabJoursEnOrdre;