//window.addEventListener('load', main);
window.addEventListener('DOMContentLoaded', main);

function main() {
    const calendar = new Calendar();
    loadFromLS()

    addEventListeners();
    addtTodoToList(calendar.date);
    deleteTodoFromList();
    startClock();
    changeToDoWhenButtonPress();
}