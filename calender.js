window.addEventListener('load', main);

const date = new Date();
console.log(date);

const year = date.getFullYear();
console.log(year);

const month = date.getMonth() + 1;
console.log(month);

const day = date.getDate();
console.log(day);

function main() {
    renderCalenders()
}

const renderCalenders = () => {
    date.setDate(1)

    const monthDays = document.querySelector('.daysOfTheMonth');

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
        ).getDate();
        console.log('last', lastDay);

    const prevDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDate();
        console.log(prevDay);

    const firstDayIndex = date.getDate();
        console.log(firstDayIndex);


    const lastDayIndex = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDay();
        console.log(lastDayIndex);

    const nextDays = 7 - lastDayIndex - 1;
        console.log(nextDays);

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

    document.querySelector('.displayMonth h2').innerHTML = months[date.getMonth()];
        
    let days = '';
        for (let i = 0; i < lastDay; i++) {
            const daysOfTheMonth = document.querySelector('.daysOfTheMonth');
            days = document.createElement('div');
            days.className = "days";
            daysOfTheMonth.appendChild(days);
            days.innerHTML = day;
        }

    document.querySelector('.prev').addEventListener('click', () => {
            date.setMonth(date.getMonth() - 1);
            renderCalenders();
        })
    document.querySelector('.next').addEventListener('click', () => {
            date.setMonth(date.getMonth() + 1);
            renderCalenders();
        })

}