let date = new Date().toDateString();
document.getElementById('date').innerHTML = date;

let time = new Date().toLocaleTimeString();
document.getElementById('time').innerHTML = time;


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