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
    if (hour >= 5) {
        document.getElementById('greeting').innerHTML = "Good Evening, ";
    }
    else {
        document.getElementById('greeting').innerHTML = "Good Afternoon, ";
    }
}
else {
    document.getElementById('greeting').innerHTML = "Good Morning, ";
}

let button1 = document.getElementById("25_minute_button");
let button2 = document.getElementById("50_minute_button");
button1.onclick = function() {
    document.getElementById("label1").remove();
    document.getElementById("25_minute_button").remove();
    document.getElementById("50_minute_button").remove();
}

button2.onclick = function() {
    document.getElementById("label1").remove();
    document.getElementById("25_minute_button").remove();
    document.getElementById("50_minute_button").remove();
}

