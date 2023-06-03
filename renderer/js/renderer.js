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
showHideMenus.addEventListener('click', ()=> {
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

modeButton.addEventListener('click', ()=> {
    if(isModeButtonActive) {
        isModeButtonActive = false;
        fontIconModeButton.classList.remove('fa-toggle-on');
        fontIconModeButton.classList.add('fa-toggle-off');
    }
    else {
        console.log('Before changing classList');
        console.log(fontIconModeButton.classList);
        isModeButtonActive = true;
        fontIconModeButton.classList.remove('fa-toggle-off');
        fontIconModeButton.classList.add('fa-toggle-on');
        console.log('After changing classList');
        console.log(fontIconModeButton.classList);

    }
})

window.onload = displayClock();
const minutes_in_seconds_25 = 1500;
const minutes_in_seconds_50 = 3000;
const minutes_in_seconds_5 = 300;
const minutes_in_seconds_10 = 600;
let date = new Date().toDateString();
document.getElementById('date').innerHTML = date;
let time = new Date().toLocaleTimeString();


function displayClock() {
    let time = new Date().toLocaleTimeString();
    document.getElementById('time').innerHTML = time;
    setTimeout(displayClock, 1000);
}

if (time.charAt(time.length-2) === 'P') {
    let hour = new Date().getHours();
    if (hour >= 16) {
        document.getElementById('greeting').innerHTML = "Good Evening, ";
    }
    else {
        document.getElementById('greeting').innerHTML = "Good Afternoon, ";
    }
}
else {
    document.getElementById('greeting').innerHTML = "Good Morning, ";
    $("#test").html("Hello, World!");
}

const button25Minutes = document.getElementById("25_minute_button");
const button50Minutes = document.getElementById("50_minute_button");

button25Minutes.onclick = ()=> {
    switchButtons();
    progress(minutes_in_seconds_25, minutes_in_seconds_25, $('#progressBar'));
}

button50Minutes.onclick = ()=> {
    switchButtons();
    progress(minutes_in_seconds_50, minutes_in_seconds_50, $('#progressBar'));
}

function progress(timeleft, timetotal, $element) {
    const progressBarWidth = timeleft * $element.width() / timetotal;
    let seconds = timeleft%60;
    const secondsAsString = seconds.toString();
    if(secondsAsString.length === 1) {
        seconds = '0' + seconds;
    }
    $element.find('div').animate({ width: progressBarWidth }, 300).html(Math.floor(timeleft/60) + ":" + seconds);

    if(timeleft > 0) {
        document.getElementById('stop_button').onclick = ()=> {
            setBackToMain();
            clearTimeout(timeoutId);
            return;
        };
        document.getElementById('pause_button').onclick = ()=> {
            document.getElementById("pause_button").style.display = 'none';
            document.getElementById("start_button").style.display = 'inline';
            clearTimeout(timeoutId);
            document.getElementById('start_button').onclick = ()=> {
                document.getElementById("start_button").style.display = 'none';
                document.getElementById("pause_button").style.display = 'inline';
                progress(timeleft, timetotal, $element);
            }
        };
        const timeoutId = setTimeout(()=> {
            progress(timeleft - 1, timetotal, $element);
        }, 1000);
    }
    else {
        let soundPlayer = new Audio("./sounds/alarm.mp3")
        soundPlayer.currentTime = 0;
        const intervalId = setInterval(()=> {
            soundPlayer.play();
        }, 500);
        if(timetotal === minutes_in_seconds_25) {
            studySessionEnded();
            document.getElementById('5_minute_break_button').style.display = 'inline';
            document.getElementById('number_of_minutes').style.display = 'inline';
            document.getElementById('number_of_minutes').innerText = " 25 minutes!";
            document.getElementById('5_minute_break_button').onclick = ()=> {
                soundPlayer.pause();
                clearInterval(intervalId);
                progress(minutes_in_seconds_5, minutes_in_seconds_5, $('#progressBar'));
                breakTime();
            }
            document.getElementById('done_studying_button').onclick = ()=> {
                soundPlayer.pause();
                clearInterval(intervalId);
                setBackToMain();
            }
        }
        // 10-minute break or 5-minute break ended
        else if(timetotal === minutes_in_seconds_10 || timetotal === minutes_in_seconds_5) {
            breakEnded();
            document.getElementById('study_again_button').onclick = ()=> {
                soundPlayer.pause();
                clearInterval(intervalId);
                setBackToMain();
            }
            document.getElementById('done_studying_button').onclick = ()=> {
                soundPlayer.pause();
                clearInterval(intervalId);
                setBackToMain();
            }
        }
        // We are in 50-minute study session
        else {
            studySessionEnded();
            document.getElementById('10_minute_break_button').style.display = 'inline';
            document.getElementById('number_of_minutes').style.display = 'inline';
            document.getElementById('number_of_minutes').innerText = " 50 minutes!";
            document.getElementById('10_minute_break_button').onclick = ()=> {
                soundPlayer.pause();
                clearInterval(intervalId);
                progress(minutes_in_seconds_10, minutes_in_seconds_10, $('#progressBar'));
                breakTime();
            }
            document.getElementById('done_studying_button').onclick = ()=> {
                soundPlayer.pause();
                clearInterval(intervalId);
                setBackToMain();
            }
        }
    }
}

function studySessionEnded() {
    document.getElementById('label2').style.display = "inline";
    document.getElementById('done_studying_button').style.display = 'inline';
    document.getElementById("progressBar").style.display = 'none';
    document.getElementById('pause_button').style.display = 'none';
    document.getElementById('stop_button').style.display = 'none';
}

function breakEnded() {
    document.getElementById('label2').style.display = "none";
    document.getElementById('label3').style.display = "inline";
    document.getElementById('study_again_button').style.display = 'inline';
    document.getElementById('done_studying_button').style.display = 'inline';
    document.getElementById('number_of_minutes').style.display = 'none';
    document.getElementById('stop_button').style.display = 'none';
    document.getElementById('pause_button').style.display = 'none';
    document.getElementById('progressBar').style.display = 'none';

}

function breakTime() {
    document.getElementById('progressBar').style.display = 'block';
    document.getElementById('5_minute_break_button').style.display = 'none';
    document.getElementById('10_minute_break_button').style.display = 'none';
    document.getElementById('label2').style.display = 'none';
    document.getElementById('number_of_minutes').style.display = 'none';
    document.getElementById('done_studying_button').style.display = 'none';
    document.getElementById('stop_button').style.display = 'inline';
    document.getElementById('pause_button').style.display = 'inline';
}

function switchButtons() {
    document.getElementById("spot1").style.display = 'none';
    document.getElementById("25_minute_button").style.display = 'none';
    document.getElementById("50_minute_button").style.display = 'none';
    document.getElementById("stop_button").style.display = 'inline';
    document.getElementById("pause_button").style.display = 'inline';
    document.getElementById("progressBar").style.display = 'block';
}

function setBackToMain() {
    document.getElementById("spot1").style.display = 'block';
    document.getElementById("25_minute_button").style.display = 'inline';
    document.getElementById("50_minute_button").style.display = 'inline';
    document.getElementById("stop_button").style.display = 'none';
    document.getElementById("pause_button").style.display = 'none';
    document.getElementById("progressBar").style.display = 'none';
    document.getElementById("start_button").style.display = 'none';
    document.getElementById("5_minute_break_button").style.display = 'none';
    document.getElementById("10_minute_break_button").style.display = 'none';
    document.getElementById("done_studying_button").style.display = 'none';
    document.getElementById("label2").style.display = 'none';
    document.getElementById('study_again_button').style.display = 'none';
    document.getElementById('label3').style.display = 'none';
}



