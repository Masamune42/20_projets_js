let allPokemon = [];
let tableauFin = [];

const searchInput = document.querySelector('.recherche-poke input');
const listePoke = document.querySelector('.liste-poke');

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
    fetch("https://pokeapi.co/api/v2/pokemon?limit=251")
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
    let nameP = pokemon.name;

    // On fetch chaque Pokémon pour récupérer ses informations complètes
    fetch(url)
        .then(reponse => reponse.json())
        .then((pokeData) => {
            // On crée la propriété pic dans notre objet
            objPokemonFull.pic = pokeData.sprites.front_default;
            // Type du Pokémon
            objPokemonFull.type = pokeData.types[0].type.name;
            // ID du Pokémon
            objPokemonFull.id = pokeData.id;

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
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
                    if (allPokemon.length === 251) {
                        // On trie le tableau
                        tableauFin = allPokemon.sort((a, b) => {
                            return a.id - b.id;
                        })
                            .slice(0, 21);

                        createCard(tableauFin);
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
        carte.style.background = couleur;
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

let index = 21;

function addPoke(nb) {
    if (index > 251) {
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
    if (index < 251) {
        // Quand on fait une recherche on veut afficher tous les Pokémon d'abord avant de faire la recherche, donc on les ajoute
        addPoke(230);
    }

    let filter, allLi, titleValue, allTitles;
    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    allTitles = document.querySelectorAll('li > h5');

    for (let i = 0; i < allLi.length; i++) {
        titleValue = allTitles[i].innerText;
        if(titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";
        } else {
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