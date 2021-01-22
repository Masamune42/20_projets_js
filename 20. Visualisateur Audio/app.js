const audioPlayer = document.querySelector('audio');

// On ne peut que faire des actions une fois que l'utilisateur a appuyé sur play
audioPlayer.addEventListener('play', () => {
    const contexteAudio = new AudioContext();
    // On crée une source à partir de notre source audio
    const src = contexteAudio.createMediaElementSource(audioPlayer);
    // Permet de faire des analyse de son
    const analyseur = contexteAudio.createAnalyser();

    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    src.connect(analyseur);
    // Connecte notre analyseur à notre sortie audio
    analyseur.connect(contexteAudio.destination);

    // Tansformation de Fourier rapide pour analyser le son
    analyseur.fftSize = 1024;

    const frequencesAudio = analyseur.frequencyBinCount;

    console.log(frequencesAudio);

    // On crée un tableau avec toutes les fréquences de son qui sont jouées
    const tableauFrequences = new Uint8Array(frequencesAudio);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const largeurBarre = (WIDTH / tableauFrequences.length) + 2;

    let hauteurBarre;
    let x;

    function retourneBarres() {
        requestAnimationFrame(retourneBarres);

        x = 0;
        // Retourne uen valeur entre 0 et 255 du tableau de fréquences
        analyseur.getByteFrequencyData(tableauFrequences);

        // On dessine le fond en noir
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < frequencesAudio; i++) {
            hauteurBarre = tableauFrequences[i];

            let r = 250;
            let g = 50;
            let b = i;

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, HEIGHT, largeurBarre, -hauteurBarre);

            x += largeurBarre + 1;
        }

    }
    retourneBarres();
})