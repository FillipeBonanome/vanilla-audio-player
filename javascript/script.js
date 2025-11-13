const themeSelectors = document.getElementsByClassName('theme-display');
const playerTheme = document.getElementById('player');
const playButton = document.getElementById('play-button');
const audio = document.getElementById('audio');
const songSpeed = document.getElementById('song-speed');
const timeNow = document.getElementById('time-now');
const timeEnd = document.getElementById('time-end');

let playState = false;
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
    playState == false ?
        audio.play() : audio.pause();
    playState = !playState;

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

//Atualizar o tempo da música todo segundo
updateAudioTime();
setInterval(updateAudioTime, 100);