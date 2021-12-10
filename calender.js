window.addEventListener('load', main);

const date = new Date();


function main() {
    renderCalenders()
    addEventsListeners()
    AlldaysOfTheWeek()
}

const renderCalenders = () => {
    date.setDate(1)
    const monthDays = document.querySelector('.days');

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
        ).getDate();

    const prevLastDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDate();

    const firstDayIndex = date.getDay();


    const lastDayIndex = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
    const weekDays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];


    let today = new Date();
    let todayDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    document.querySelector('.date h2').innerHTML = months[date.getMonth()];
    document.querySelector('.date p').innerHTML =  todayDate;

   
        
    let days = '';
    
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class = 'prev-date day'>${prevLastDay - x + 1}</div>`;
        
    }
    for (let i = 1; i <= lastDay; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today day">${i}</div>`;
        } else {
        days += `<div class="day">${i}</div>`;
    }
    }
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date day">${j}</div>`;
        monthDays.innerHTML = days; 
    }
}

function addEventsListeners() {
    document.querySelector('.prev').addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalenders();
    });
    document.querySelector('.next').addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalenders();
    });


    const dayBoxes = document.querySelectorAll('.day');
    for (const dayBox of dayBoxes) {
        dayBox.addEventListener('click', () => {
            console.log("yes");
            let todoList = document.querySelector('.todo-list');
            todoList.classList.toggle('active');
        })
        
    }
}


function AlldaysOfTheWeek(){
let elements = document.getElementsByClassName("weekDays")[0].getElementsByTagName("div")


const dayToday = new Date();
let colorDays = elements[dayToday.getDay()];



colorDays.style.color = "pink"


}

