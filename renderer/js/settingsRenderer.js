const minimizeBtn = document.getElementById('minimizeBtn');
const closeBtn = document.getElementById('closeBtn');
const maxResBtn = document.getElementById('maxResBtn');
let isLeftMenuActive = false;
const mySideBar = document.getElementById('mySideBar');
let isModeButtonActive = true;
minimizeBtn.addEventListener('click', ()=> {
    window.electronAPI.minimize();
});

closeBtn.addEventListener('click', ()=> {
    window.electronAPI.close();
});

maxResBtn.addEventListener('click', ()=> {
    window.electronAPI.maximizeRestore();
});

function changeMaxResBtn(isMaximizedApp) {
    if (isMaximizedApp) {
        maxResBtn.title = 'Restore';
        maxResBtn.classList.remove('maximizeBtn');
        maxResBtn.classList.add('restoreBtn');
        const fontAwesomeIcon = document.getElementById('fontIconMaxResBtn');
        fontAwesomeIcon.classList.remove('fa-square');
        fontAwesomeIcon.classList.remove('fa-xl');
        fontAwesomeIcon.classList.toggle('fa-window-restore');
        fontAwesomeIcon.classList.toggle('fa-xl');
    }
    else {
        maxResBtn.title = 'Maximize';
        maxResBtn.classList.remove('restoreBtn');
        maxResBtn.classList.add('maximizeBtn');
        const fontAwesomeIcon = document.getElementById('fontIconMaxResBtn');
        fontAwesomeIcon.classList.toggle('fa-square');
        fontAwesomeIcon.classList.remove('fa-window-restore');
    }
}

window.electronAPI.isMaximized(() => {
    changeMaxResBtn(true);
})

window.electronAPI.isRestored(() => {
    changeMaxResBtn(false);
})

// TOGGLE BUTTON
// Expand and Retract
const showHideMenus = document.getElementById('showHideMenus');
document.getElementById('showHideMenus')?.addEventListener('click', ()=> {
    if(isLeftMenuActive) {
        isLeftMenuActive = false;
        mySideBar.style.display = 'none';
    }
    else {
        mySideBar.style.width = '30%';
        mySideBar.style.display = 'inline';
        isLeftMenuActive = true;
    }
})

const modeButton = document.getElementById('modeButton');
const fontIconModeButton = document.getElementById('fontIconModeBtn');

document.getElementById('modeButton')?.addEventListener('click', ()=> {
    // Light mode
    if(isModeButtonActive) {
        isModeButtonActive = false;
        fontIconModeButton.classList.remove('fa-toggle-on');
        fontIconModeButton.classList.add('fa-toggle-off');
        toggleMode();

    }
    // Dark mode
    else {
        isModeButtonActive = true;
        fontIconModeButton.classList.remove('fa-toggle-off');
        fontIconModeButton.classList.add('fa-toggle-on');
        toggleMode();
    }
})


function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const topBar = document.getElementById('topBar');
    topBar.classList.toggle('dark-mode');
    const toggleButton = document.getElementById('showHideMenus');
    toggleButton.classList.toggle('dark-mode');
    const titleBarBtns = document.getElementsByClassName('topBtn');
    for (let i = 0; i < titleBarBtns.length; i++) {
        titleBarBtns[i].classList.toggle("dark-mode");
    }

    const leftMenu = document.getElementById('mySideBar');
    leftMenu.classList.toggle('dark-mode');

    const sidebarButtons = document.getElementsByClassName('sidebarButtons');
    for (let i = 0; i < sidebarButtons.length; i++) {
        sidebarButtons[i].classList.toggle("dark-mode");
    }
}



