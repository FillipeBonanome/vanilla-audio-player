const themeSelectors = document.getElementsByClassName('theme-display');
const playerTheme = document.getElementById('player');
const playButton = document.getElementById('play-button');
const backButton = document.getElementById('back-button');
const fowardButton = document.getElementById('foward-button');
const audio = document.getElementById('audio');
const songSpeed = document.getElementById('song-speed');
const songName = document.getElementById('song-name');
const artistName = document.getElementById('artist-name');
const timeNow = document.getElementById('time-now');
const timeEnd = document.getElementById('time-end');
const audioProgress = document.getElementById('audio-progress');

const timeSkipAmount = 5;

const audioContext = new AudioContext();
const source = audioContext.createMediaElementSource(audio);
const volume = audioContext.createGain();
volume.gain.value = 0.1;

source.connect(volume).connect(audioContext.destination)

let playSpeed = [1.0, 1.25, 1.5, 1.75, 2.0, 0.5, 0.75]
let playSpeedState = 0;

//Atualiza o tema
function updateTheme(themeName) {
    playerTheme.className = 'player';
    playerTheme.classList.add(themeName);
}

//Cria eventos de click para todos os temas
for(i = 0; i < themeSelectors.length; i++) {
    let theme = themeSelectors[i];
    theme.addEventListener('click', () => {
        const classList = theme.classList;
        classList.forEach(function(name) {
            if(name != 'theme-display') {
                updateTheme(name);
            }
        })
    })
}

//Inicia e pausa a música
playButton.addEventListener('click', () => {
    audio.paused === true ? audio.play() : audio.pause();

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const playSVG = playButton.children[0];
    playSVG.classList.add('flash-white');

    setTimeout(() => {
        playSVG.classList.remove('flash-white');
    }, 100)

});

//Muda a velocidade da música
songSpeed.addEventListener('click', () => {
    playSpeedState++;
    playSpeedState = playSpeedState % playSpeed.length;
    audio.playbackRate = playSpeed[playSpeedState];
    songSpeed.textContent = `${playSpeed[playSpeedState]}x`;
});

//Converte tempo da música em minutos:segundos
function numberToTime(number) {
    if (typeof number !== 'number') {
        number = 0;
    }

    const seconds = String(Math.floor(number % 60)).padStart(2, '0');
    const minutes = String(Math.floor(number / 60)).padStart(2, '0');

    return `${minutes}:${seconds}`;
}

//Função para atualizar o tempo da música
function updateAudioTime() {
    timeNow.textContent = numberToTime(audio.currentTime);
    const duration = audio.duration;

    if (!isNaN(duration)) {
        timeEnd.textContent = numberToTime(duration);
    }
}

//Função para atualizar o nome da música TODO
function updateAudioName() {

}

//Atualiza a barra de progresso de acordo com a música
function updateAudioProgress() {
    const audioPercentage = audio.currentTime / audio.duration;
    audioProgress.value = audioPercentage;
}

//Adiciona um tempo no current time da música
function addAudioTime(value) {
    audio.currentTime = Math.max(Math.min(audio.duration, audio.currentTime + value), 0);
}

//Quando clicar pausar a música
audioProgress.addEventListener('mousedown', () => {
    audio.pause();
})

//Quando soltar o clique atualizar o tempo da música de acordo com a barra
audioProgress.addEventListener('mouseup', () => {
    audio.play();
    audio.currentTime = audio.duration * audioProgress.value;
})

backButton.addEventListener('click', () => {
    addAudioTime(-timeSkipAmount);
});

fowardButton.addEventListener('click', () => {
    addAudioTime(timeSkipAmount);
});


//Atualizar o tempo da música sempre que necessário
updateAudioTime();
updateAudioName();
audio.addEventListener('timeupdate', () => {
    updateAudioProgress();
    updateAudioTime();
});

