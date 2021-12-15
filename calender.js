
function Calendar() {
    this.date = new Date();
    this.today = new Date(this.date);

    const dayContainer = document.querySelector('.days');

    // Create a reference to "this" calendar object for use in event listener
    const calendar = this;

    this.dateElements = new Array(42);
    for (let i = 0; i < this.dateElements.length; i++) {
        // Create div-element for each day of the month
        this.dateElements[i] = document.createElement('div');
        this.dateElements[i].className = 'day';

        // Sets the eventlistener for clicking on individual dates
        this.dateElements[i].addEventListener('click', function () { calendar.setDate(this.date) });

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

    this.render();
}

Calendar.prototype.render = function () {
    const month = new Date(this.date.getFullYear(), this.date.getMonth()); // Construct New date instance representing the first day of the current month
    const firstDayOfMonth = month.getDay() === 0 ? 6 : month.getDay() - 1; // Date.getDay but with 0-6 representing monday-sunday
    const daysInMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate(); // Gets the last date of the month
    const daysInPreviousMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate(); // Gets the last date of the previous month

    // Sets text and classes for the days belonging to the previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
        this.dateElements[i].firstChild.innerText = daysInPreviousMonth - firstDayOfMonth + 1 + i;
        this.dateElements[i].className = 'day prev-date';
        this.dateElements[i].getElementsByTagName('p')[1].innerText = '';
        this.dateElements[i].date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, daysInPreviousMonth - firstDayOfMonth + 1 + i);
    }

    // Sets text and class for the days belonging to the current month
    for (let i = 0; i < daysInMonth; i++) {
        this.dateElements[firstDayOfMonth + i].firstChild.innerText = i + 1;
        this.dateElements[firstDayOfMonth + i].className = 'day';
        this.dateElements[firstDayOfMonth + i].getElementsByTagName('p')[1].innerText = '';
        this.dateElements[firstDayOfMonth + i].date = new Date(this.date.getFullYear(), this.date.getMonth(), i + 1)
    }

    // Sets text and classes for the days belonging to the next month
    for (let i = 0; i < 42 - daysInMonth - firstDayOfMonth; i++) {
        this.dateElements[firstDayOfMonth + daysInMonth + i].firstChild.innerText = i + 1;
        this.dateElements[firstDayOfMonth + daysInMonth + i].className = 'day next-date';
        this.dateElements[firstDayOfMonth + daysInMonth + i].getElementsByTagName('p')[1].innerText = '';
        this.dateElements[firstDayOfMonth + daysInMonth + i].date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, i + 1)
    }


    // Highlight todays date and week day
    this.highlightToday();

    // Set the month header
    document.querySelector('.date h2').innerText = Calendar.Months[this.date.getMonth()];

    // Set the year header
    document.querySelector('.date p').innerText = this.date.getFullYear();
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
        todayCol.style.color = "lightblue";
    }
}


Calendar.prototype.setDate = function (date) {
    this.date = date;
    this.render();

    //showTodos(date);
}



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


