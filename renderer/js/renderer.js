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
    document.getElementById("label1").remove();
    document.getElementById("25_minute_button").remove();
    document.getElementById("50_minute_button").remove();
    document.getElementById("progressBar").style.visibility = "visible";
    progress(10, 10, $('#progressBar'));
}

button50Minutes.onclick = function() {
    document.getElementById("label1").remove();
    document.getElementById("25_minute_button").remove();
    document.getElementById("50_minute_button").remove();
    document.getElementById("progressBar").style.visibility = "visible";
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
        setTimeout(function() {
            progress(timeleft - 1, timetotal, $element);
        }, 1000);
    }
    else {
        document.getElementById('alarm').play();
    }
};

function replaceProgressBar() {
    const timer = document.getElementById('progressBar');
    const breakQuestion = document.createElement('div');
}


