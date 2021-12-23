/**
 * Constructs a new Clock object
 * 
 * @class Clock
 * @classdesc Self-contained Clock object
 * 
 * @property {Date} currentDate - date representing the selected date
 * @this Clock
 */
function Clock() {
    this.currentDate = new Date();

    this.render();
    setInterval(() => { this.render(); }, 1000);
}

/**
* Updates the page with current time and weekday
*/
Clock.prototype.render = function () {
    const weekdayElement = document.querySelector('.displayTodaysWeekday');
    weekdayElement.innerHTML = this.getWeekDay();

    const todaysDate = this.currentDate.getFullYear() + '-' + (this.currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + this.currentDate.getDate().toString().padStart(2, '0');
    document.querySelector('.displayTodaysDate').innerText = `${todaysDate}`;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeElement = document.querySelector('.displayCurrentTime');

    timeElement.innerHTML = hours + ":" + minutes + ":" + seconds;
}

/**
* Returns current weekday
* @returns {String}
*/
Clock.prototype.getWeekDay = function () {
    const weekDay = this.currentDate.getDay();

    switch (weekDay) {
        case 0: return 'Måndag';
        case 1: return 'Tisdag';
        case 2: return 'Onsdag';
        case 3: return 'Torsdag';
        case 4: return 'Fredag';
        case 5: return 'Lördag';
        case 6: return 'Söndag';
    }
}

/**
* Sets the current date
* @param {Date} currentDate
*/
Clock.prototype.setDate = function (currentDate) {
    this.currentDate = currentDate;
    this.render();
}