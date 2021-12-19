//window.addEventListener('load', main);
window.addEventListener('DOMContentLoaded', main);

function main() {
    loadFromLS()
    const calendar = new Calendar();
    addEventListeners();
    addTodoToList(calendar.date);
    startClock();
}