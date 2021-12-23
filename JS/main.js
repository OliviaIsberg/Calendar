window.addEventListener('DOMContentLoaded', main);
window.addEventListener('resize', bigScreen);

function main() {
    const calendar = new Calendar();
    const clock = new Clock();
    const todoManager = new TodoManager();

    todoManager.addTodoToList(calendar.date);

    /** Listens for the Calendar objects custom-event 'daterendered' and sets it's todo count */
    calendar.addEventListener('daterendered', function (e) {
        const numberOfTodos = todoManager.getNumberOfTodos(e.detail.date);
        calendar.setTodoCount(e.detail.date, numberOfTodos);
    });

    calendar.render();

    /** Listens for the Calendar objects custom-event 'datechanged' and updates the todo-list and clock with the selected date */
    calendar.addEventListener('datechanged', function (e) {
        todoManager.setDate(this.date);
        todoManager.addTodoToList(this.date);
        clock.setDate(this.date);
    });

    todoManager.addEventListener('todoadded', function () {
        const numberOfTodos = todoManager.getNumberOfTodos(todoManager.date);
        calendar.setTodoCount(todoManager.date, numberOfTodos);
    });

    todoManager.addEventListener('tododeleted', function () {
        const numberOfTodos = todoManager.getNumberOfTodos(todoManager.date);
        calendar.setTodoCount(todoManager.date, numberOfTodos);
    });
}