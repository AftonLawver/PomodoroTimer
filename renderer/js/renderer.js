window.onload = displayClock();

let date = new Date().toDateString();
document.getElementById('date').innerHTML = date;
let time = new Date().toLocaleTimeString();

function displayClock() {
    let time = new Date().toLocaleTimeString();
    document.getElementById('time').innerHTML = time;
    setTimeout(displayClock, 1000)
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
}

let button25Minutes = document.getElementById("25_minute_button");
let button50Minutes = document.getElementById("50_minute_button");
button25Minutes.onclick = function() {
    switchButtons()
    progress(10, 10, $('#progressBar'));
}

button50Minutes.onclick = function() {
    switchButtons();
    progress(3000, 3000, $('#progressBar'));
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
        document.getElementById('stop_button').onclick = function() {
            setBackToMain();
            clearTimeout(timeoutId);
            return;
        };
        document.getElementById('pause_button').onclick = function() {
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
        document.getElementById('alarm').play();

    }
};

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

}

class Timeout {
    constructor(callbackFunction, time) {
        this.time = time;
        this.callback = callbackFunction;
        this.run(); // It will be automatically invoked when the constructor is run
    }
    run() {
        this.startedTime = new Date().getTime();
        if (this.time > 0) {
            this.timeout = setTimeout(this.callback, this.time); // Timeout must be set if this.time is greater than 0
        }
    }
    pause() {
        let currentTime = new Date().getTime();
        this.time = this.time - (currentTime - this.startedTime); // The time that was given when initializing the timeout is subtracted from the amount of time spent
        clearTimeout(this.timeout);
    }
}




