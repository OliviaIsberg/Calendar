function Calendar() {
    this.date = new Date();
    this.today = new Date(this.date);

    const dayContainer = document.querySelector('.allDaysContainer');

    // Create a reference to "this" calendar object for use in event listener
    const calendar = this;

    this.dateElements = new Array(42);
    for (let i = 0; i < this.dateElements.length; i++) {
        // Create div-element for each day of the month
        this.dateElements[i] = document.createElement('div');
        this.dateElements[i].className = 'eachDay';

        // Sets the eventlistener for clicking on individual dates
        this.dateElements[i].addEventListener('click', function () { calendar.setDate(this.date) });

        // Create p-element for date number
        let pDate = document.createElement('p');
        pDate.className = 'date';
        this.dateElements[i].appendChild(pDate);

        // Create p-element for holiday name
        let pHoliday = document.createElement('p');
        pHoliday.className = 'holiday-name';
        this.dateElements[i].appendChild(pHoliday);

        let pTodoCount = document.createElement('p');
        pTodoCount.className = 'todoCount';
        this.dateElements[i].appendChild(pTodoCount);

        // Append div to the container
        dayContainer.appendChild(this.dateElements[i]);
    }

    document.querySelector('.previousMonthAndYear').addEventListener('click', () => {
        this.date.setMonth(this.date.getMonth() - 1);
        this.render();
    });

    document.querySelector('.nextMonthAndYear').addEventListener('click', () => {
        this.date.setMonth(this.date.getMonth() + 1);
        this.render();
    });

    this.render();
}

Calendar.Months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
Calendar.Days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

Calendar.prototype.render = function () {
    const month = new Date(this.date.getFullYear(), this.date.getMonth()); // Construct New date instance representing the first day of the current month
    const firstDayOfMonth = month.getDay() === 0 ? 6 : month.getDay() - 1; // Date.getDay but with 0-6 representing monday-sunday
    const daysInMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate(); // Gets the last date of the month
    const daysInPreviousMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate(); // Gets the last date of the previous month

    // Sets text and classes for the days belonging to the previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
        this.dateElements[i].firstChild.innerText = daysInPreviousMonth - firstDayOfMonth + 1 + i;
        this.dateElements[i].className = 'eachDay previousMonthAndYear';
        this.dateElements[i].getElementsByTagName('p')[1].innerText = '';
        this.dateElements[i].date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, daysInPreviousMonth - firstDayOfMonth + 1 + i);
    }

    // Sets text and class for the days belonging to the current month
    for (let i = 0; i < daysInMonth; i++) {
        this.dateElements[firstDayOfMonth + i].firstChild.innerText = i + 1;
        this.dateElements[firstDayOfMonth + i].className = 'eachDay';
        this.dateElements[firstDayOfMonth + i].getElementsByTagName('p')[1].innerText = '';
        this.dateElements[firstDayOfMonth + i].date = new Date(this.date.getFullYear(), this.date.getMonth(), i + 1);

        let numberOfTodos = getNumberOfTodos(this.dateElements[firstDayOfMonth + i].date);
        this.dateElements[firstDayOfMonth + i].getElementsByClassName('todoCount')[0].innerText = numberOfTodos;

    }

    // Sets text and classes for the days belonging to the next month
    for (let i = 0; i < 42 - daysInMonth - firstDayOfMonth; i++) {
        this.dateElements[firstDayOfMonth + daysInMonth + i].firstChild.innerText = i + 1;
        this.dateElements[firstDayOfMonth + daysInMonth + i].className = 'eachDay nextMonthAndYear';
        this.dateElements[firstDayOfMonth + daysInMonth + i].getElementsByTagName('p')[1].innerText = '';
        this.dateElements[firstDayOfMonth + daysInMonth + i].date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, i + 1)
    }


    // Highlight todays date and week day
    this.highlightToday();

    // Set the month header
    document.getElementById('displayMonth').innerText = Calendar.Months[this.date.getMonth()];

    // Set the year header
    document.getElementById('displayYear').innerText = this.date.getFullYear();

    // Request and render holidays
    this.getHolidays();
}


Calendar.prototype.highlightToday = function () {
    const month = new Date(this.date.getFullYear(), this.date.getMonth()); // Construct New date instance representing the first day of the current month
    const firstDayOfMonth = month.getDay() === 0 ? 6 : month.getDay() - 1; // Date.getDay but with 0-6 representing monday-sunday

    let elements = document.getElementsByClassName('weekDays')[0].getElementsByTagName('div');

    // Remove text color from all weekdays
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.color = '';
    }

    // Highlight todays date and week day
    if (
        this.date.getFullYear() === this.today.getFullYear() &&
        this.date.getMonth() === this.today.getMonth()
    ) {
        this.dateElements[firstDayOfMonth + this.date.getDate() - 1].classList.add('today');

        let day = this.today.getDay() === 0 ? 6 : this.today.getDay() - 1;
        let todayCol = elements[day];
        todayCol.style.color = "darkcyan";
    }
}

Calendar.prototype.getHolidays = function () {
    // Constructs uri to request the "red" days and named holidays for the active month from sholiday.faboul.se
    const uri = 'https://sholiday.faboul.se/dagar/v2.1/' + this.date.getFullYear() + '/' + (this.date.getMonth() + 1).toString().padStart(2, '0');
    fetch(uri) // fetches the JSON-data from the uri above
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not fetch holidays from faboul.se');
            }

            return response.json();
        })
        .then(data => this.renderHolidays(data));
}

Calendar.prototype.renderHolidays = function (data) {
    const redDays = data.dagar.filter(day => day['röd dag'] === 'Ja'); // Filter out "red" days from the JSON response
    const holidays = data.dagar.filter(day => day.hasOwnProperty('helgdag')); // Filter out named holidays from the JSON response
    const month = new Date(this.date.getFullYear(), this.date.getMonth()); // Construct New date instance representing the first day of the current month
    const firstDayOfMonth = month.getDay() === 0 ? 6 : month.getDay() - 1; // Date.getDay but with 0-6 representing monday-sunday

    // Loop through the red days and set the class names of the corresponding divs
    for (let i = 0; i < redDays.length; i++) {
        let date = new Date(redDays[i].datum);
        this.dateElements[firstDayOfMonth + date.getDate() - 1].classList.add('holiday');
    }

    // Loop through the named holidays and populate the corresponding paragraph
    for (let i = 0; i < holidays.length; i++) {
        let date = new Date(holidays[i].datum);
        this.dateElements[firstDayOfMonth + date.getDate() - 1].getElementsByTagName('p')[1].innerText = holidays[i]['helgdag'];
    }
}

Calendar.prototype.setDate = function (date) {
    this.date = date;
    this.render();
    document.getElementById('date').value = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');

    addtTodoToList(date);

    //showTodos(date);
}