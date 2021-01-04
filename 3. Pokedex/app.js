let allPokemon = [];
let tableauFin = [];

const searchInput = document.querySelector('.recherche-poke input');
const listePoke = document.querySelector('.liste-poke');
const chargement = document.querySelector('.loader');

// Ajout perso
const NB_TOTAL_POKEMON = 386;
const NB_AFFICHE_BASE = 21;

// Tableau des couleurs par type
const types = {
    grass: '#78c850',
    ground: '#E2BF65',
    dragon: '#6F35FC',
    fire: '#F58271',
    electric: '#F7D02C',
    fairy: '#D685AD',
    poison: '#966DA3',
    bug: '#B3F594',
    water: '#6390F0',
    normal: '#D9D5D8',
    psychic: '#F95587',
    flying: '#A98FF3',
    fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6',
    steel: '#5A8EA2',
    dark: '#5A5465'
};

function fetchPokemonBase() {
    // Appel de l'API pour récupérer les 251 1ers Pokémons
    fetch("https://pokeapi.co/api/v2/pokemon?limit=" + NB_TOTAL_POKEMON)
        .then(reponse => reponse.json())
        .then((allPoke) => {
            allPoke.results.forEach((pokemon) => {
                fetchPokemonComplet(pokemon);
            })
        })
}
fetchPokemonBase();

// Fonction qui récupère les informations complètes d'un Pokémon
function fetchPokemonComplet(pokemon) {
    let objPokemonFull = {};
    let url = pokemon.url;
    // let nameP = pokemon.name;

    // On fetch chaque Pokémon pour récupérer ses informations complètes
    fetch(url)
        .then(reponse => reponse.json())
        .then((pokeData) => {
            // On crée la propriété pic dans notre objet
            objPokemonFull.pic = pokeData.sprites.front_default;
            // Type du Pokémon
            objPokemonFull.type = pokeData.types[0].type.name;
            if (pokeData.types[1] !== undefined) {
                objPokemonFull.type2 = pokeData.types[1].type.name;
            }
            // ID du Pokémon
            objPokemonFull.id = pokeData.id;
            // On recherche le Pokemon avec son id
            // De base : recherche avec son nom => nameP
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${objPokemonFull.id}`)
                .then(reponse => reponse.json())
                .then((pokeData) => {
                    // On rempli la propriété name avec le nom français
                    if (pokeData.id == 214) // Exception pour Scarhino
                        objPokemonFull.name = pokeData.names[0].name;
                    else
                        objPokemonFull.name = pokeData.names[4].name;
                    // On rempli le tableau des Pokémon avec les informations de celui qu'on a récupéré
                    allPokemon.push(objPokemonFull);

                    // Quand on a chargé tous nos Pokémon
                    if (allPokemon.length === NB_TOTAL_POKEMON) {
                        // On trie le tableau
                        tableauFin = allPokemon.sort((a, b) => {
                            return a.id - b.id;
                        })
                            .slice(0, NB_AFFICHE_BASE);

                        createCard(tableauFin);
                        // On masque les points de chargement
                        chargement.style.display = "none";
                    }
                });
        });
}

// Création des cartes
function createCard(arr) {
    for (let i = 0; i < arr.length; i++) {
        // On crée un élément de liste
        const carte = document.createElement('li');
        // On récupère la couleur par type du Pokémon
        let couleur = types[arr[i].type];
        // On applique la couleur de fond à la carte du Pokémon
        if (arr[i].type2 == undefined) {
            carte.style.background = couleur;
        }
        else {
            console.log(arr[i].type2);
            carte.style.background = `linear-gradient(180deg, ${types[arr[i].type]}, ${types[arr[i].type2]})`;
        }
        // On crée un titre h5 pour le nom du Pokémon
        const txtCarte = document.createElement('h5');
        txtCarte.innerText = arr[i].name;
        const idCarte = document.createElement('p');
        idCarte.innerText = `ID# ${arr[i].id}`;
        const imgCarte = document.createElement('img');
        imgCarte.src = arr[i].pic;

        // On rajoute tous les éléments dans la carte
        carte.appendChild(imgCarte);
        carte.appendChild(txtCarte);
        carte.appendChild(idCarte);
        // On rajoute l'élément de liste dans la ul
        listePoke.appendChild(carte);
    }
}

// Scroll Infini
window.addEventListener('scroll', () => {
    // scrollTop: Ce qu'on a scrollé depuis le top
    // scrollHeight: Hauteur total de notre site
    // clientHeight: Hauteur de la fenêtre, partie visible
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 20) {
        addPoke(6);
    }
})

let index = NB_AFFICHE_BASE;

function addPoke(nb) {
    if (index > NB_TOTAL_POKEMON) {
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nb);

    createCard(arrToAdd);
    index += nb;
}

// Recherche
// Dynamique
searchInput.addEventListener('keyup', recherche);
// Avec bouton submit
// const formRecherche = document.querySelector('form');
// formRecherche.addEventListener('submit', (e) => {
//     e.preventDefault();
//     recherche();
// })

function recherche() {
    if (index < NB_TOTAL_POKEMON) {
        // Quand on fait une recherche on veut afficher tous les Pokémon d'abord avant de faire la recherche, donc on les ajoute
        addPoke(NB_TOTAL_POKEMON - NB_AFFICHE_BASE);
    }

    let filter, allLi, titleValue, allTitles;
    // On effectue la recherche en majuscule
    filter = searchInput.value.toUpperCase();
    // On sélectionne tous les éléments de liste (Pokémon)
    allLi = document.querySelectorAll('li');
    // On sélectionne tous les h5 (noms de Pokémons)
    allTitles = document.querySelectorAll('li > h5');

    // Pour chaque Pokémon
    for (let i = 0; i < allLi.length; i++) {
        // On récupère le nom du Pokémon au même indice
        titleValue = allTitles[i].innerText;
        // Si la recherche fait partie du nom du Pokémon, display flex (sert à réafficher les Pokémons masqués durant la dernière recherche)
        if (titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";
        } else { // Sinon, on masque le Pokémon
            allLi[i].style.display = "none";
        }
    }
}

// Animation Input
searchInput.addEventListener('input', function (e) {
    if (e.target.value !== "") {
        e.target.parentNode.classList.add('active-input');
    } else if (e.target.value === "") {
        e.target.parentNode.classList.remove('active-input');
    }
})