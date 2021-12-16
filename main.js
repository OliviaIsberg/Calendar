window.addEventListener('load', main);

function main() {
    const calendar = new Calendar();

    addEventListeners();
    addtTodoToList(calendar.date);
    deleteTodoFromList();
    startClock();
    changeToDoWhenButtonPress();
}