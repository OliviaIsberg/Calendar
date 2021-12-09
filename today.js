window.addEventListener('load', clock);

function clock() {
    startClock();
}

/**
* Keeps the time updated
*/
function startClock() {
    setInterval(renderClock, 1000);
}

/**
* Updates the page with current time and weekday
*/
function renderClock() {
    const currentDate = new Date();

    const weekdayElement = document.querySelector('.displayDay');
    weekdayElement.innerHTML = getWeekDay(currentDate);

    let today = new Date();
    let todaysDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    document.querySelector('.displayDate').innerHTML = `${todaysDate}`;

    const timeElement = document.querySelector('.displayTime');
    timeElement.innerHTML = getCurrentTime(currentDate);
}

/**
* Takes a date and returns current weekday
* @param {Date} currentDate
* @returns {String}
*/
function getWeekDay(currentDate) {
    const weekDay = currentDate.getDay();

    switch(weekDay) {
    case 0: return 'Söndag';
    case 1: return 'Måndag';
    case 2: return 'Tisdag';
    case 3: return 'Onsdag';
    case 4: return 'Torsdag';
    case 5: return 'Fredag';
    case 6: return 'Lördag';
}
}

/**
* Constructs the time string from a date, with seconds
* @param {Date} currentDate
* @returns {String}
*/
function getCurrentTime(currentDate) {
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();
if (hours < 10) {
hours = "0" + hours;
}
if (minutes < 10) {
minutes = "0" + minutes;
}
if (seconds < 10) {
seconds = "0" + seconds;
}
return hours + ":" + minutes + ":" + seconds;
}