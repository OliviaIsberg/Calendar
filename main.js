window.addEventListener('load', main);

function main() {
    const calendar = new Calendar();
    loadFromLS()

    addEventListeners();
    addtTodoToList(calendar.date);
    deleteTodoFromList();
    startClock();
    changeToDoWhenButtonPress();
}