window.addEventListener('load', main);

function main() {
    const calendar = new Calendar();

    loadFromLS();
    addEventListeners();
    addtTodoToList();
    deleteTodoFromList();
    startClock();
}