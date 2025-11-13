const themeSelectors = document.getElementsByClassName('theme-display');
const playerTheme = document.getElementById('player');


function updateTheme(themeName) {
    //Reseta a classe
    playerTheme.className = 'player';
    playerTheme.classList.add(themeName);
}

for(i = 0; i < themeSelectors.length; i++) {
    let theme = themeSelectors[i];
    theme.addEventListener('click', () => {
        const classList = theme.classList;
        classList.forEach(function(name, index) {
            if(name != 'theme-display') {
                updateTheme(name);
            }
        })
    })
}