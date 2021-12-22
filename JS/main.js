//window.addEventListener('load', main);
window.addEventListener('DOMContentLoaded', main);
window.addEventListener('resize', bigScreen);

function main() {
    loadFromLS()
    const calendar = new Calendar();

    addEventListeners();
    addTodoToList(calendar.date);
    startClock();

    let form = document.querySelector('form');
    form.addEventListener('submit', (e) => { calendar.updateTodoCount(); e.preventDefault(); });

}