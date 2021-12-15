
=======
function Calendar() {
    this.date = new Date();
    this.today = new Date(this.date);

    const dayContainer = document.querySelector('.days');

    this.dateElements = new Array(42);
    for (let i = 0; i < this.dateElements.length; i++) {
        // Create div-element for each day of the month
        this.dateElements[i] = document.createElement('div');
        this.dateElements[i].className = 'day';

        // Sets the eventlistener for clicking on individual dates
        this.dateElements[i].addEventListener('click', function () { });

        // Create p-element for date number
        let pDate = document.createElement('p');
        pDate.className = 'date';
        this.dateElements[i].appendChild(pDate);

        // Create p-element for holiday name
        let pHoliday = document.createElement('p');
        pHoliday.className = 'holiday-name'
        this.dateElements[i].appendChild(pHoliday);

        // Append div to the container
        dayContainer.appendChild(this.dateElements[i]);
    }
}
