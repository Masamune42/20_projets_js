const video = document.querySelector('.video');
const btnPausePlay = document.getElementById('play-pause');
const img = document.querySelector('#play-pause img');
const barreOrange = document.querySelector('.barre-orange');
const juice = document.querySelector('.juice')
const muteBtn = document.getElementById('mute');
const fullScreen = document.getElementById('fullscreen');
const volumeSlider = document.getElementById('volume-slider');

btnPausePlay.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);

// Affichage du bouton play / pause selon si la vidéo tourne ou pas
function togglePlayPause() {
    if (video.paused) {
        // On change l'image
        img.src = "ressources/pause.svg";
        // Play
        video.play();
    }
    else {
        // On change l'image
        img.src = "ressources/play.svg";
        // Pause
        video.pause();
    }
}

// la barre orange
// 'timeupdate' => A chaque fois que la vidéo est en cours
video.addEventListener('timeupdate', () => {
    // On calcule la différence entre le temps actue let le temps passé dans la vidéo
    let juicePos = video.currentTime / video.duration;

    // On affiche la barre orange en pourcentage du temps passé de la vidéo
    juice.style.width = juicePos * 100 + "%";

    // Si la vidéo est terminée, on affiche le bouton play
    if (video.ended) {
        img.src = "ressources/play.svg";
    }

})


// Volume

volumeSlider.addEventListener('change', () => {
    video.volume = volumeSlider.value / 100;
    console.log(video.volume)
})


// mute

muteBtn.addEventListener('click', () => {
    // On change l'état du mute de la vidéo suivant l'état actuel
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    else {
        video.muted = true;
        muteBtn.innerText = "Unmute";
    }

})

// Cliquer sur la barre orange

// On récupère les informations de la barre orange
// getBoundingClientRect() : permet de récupérer des dimensions et position sur un élément
let rect = barreOrange.getBoundingClientRect();
// On récupère la largeur de la barre orange
let largeur = rect.width;

barreOrange.addEventListener('click', (e) => {
    // On calcule la position en pixel de notre clic (de 0 à 800)
    let x = e.clientX - rect.left;
    // On calcule la largeur en pourcentage
    let widthPercent = ((x * 100 / largeur));
    console.log(widthPercent);

    // On récupère la durée totale de la vidéo
    let durationVideo = video.duration;

    // position en seconde par rapport au pourcentage
    video.currentTime = durationVideo * (widthPercent / 100);

})

window.addEventListener('resize', () => {
    let rect = barreOrange.getBoundingClientRect();
    let largeur = rect.width;
})

// Mode plein écran quand on clic sur les éléments
video.addEventListener('dblclick', () => {
    video.requestFullscreen();
})
fullScreen.addEventListener('click', () => {
    video.requestFullscreen();
})

