//window.addEventListener('load', main);
window.addEventListener('DOMContentLoaded', main);
window.addEventListener('resize', bigScreen)
function main() {
    loadFromLS()
    const calendar = new Calendar();
    addEventListeners();
    addTodoToList(calendar.date);
    startClock();
    
}