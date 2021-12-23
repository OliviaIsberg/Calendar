/**
 * TodoManager handles all actions related to the todo-lists
 * 
 * @class TodoManager
 * @classdesc Self-contained TodoManager object
 * 
 * @property {Object} todos - object containing all todo items
 * @property {Date} date - date representing the active date
 * @this TodoManager
 */
class TodoManager extends EventTarget {
    constructor() {
        super();


        this.todos = {};
        this.date = new Date();

        this.loadFromLS();
        this.addEventListeners();
    }
}

/**
 * Get content from Localstorage
 */
TodoManager.prototype.loadFromLS = function () {
    const todoStr = localStorage.getItem('todo');
    if (todoStr) {
        this.todos = JSON.parse(todoStr);
    }
}

/**
 * Save content to Localstorage
 */
TodoManager.prototype.saveToLs = function () {
    localStorage.setItem('todo', JSON.stringify(this.todos));
}

/**
 * AddEventListeners for input field for todo
 */
TodoManager.prototype.addEventListeners = function () {
    let form = document.querySelector('form');
    form.addEventListener('submit', (e) => { this.addTodo(); e.preventDefault(); });
    let calendarbutton = document.getElementById("calendarPhone")
    calendarbutton.addEventListener('click', TodoManager.toggleCalendar);
}

/**
 * Sets the active date
 */
TodoManager.prototype.setDate = function (date) {
    this.date = date;
}

/**
 * Adds todo with an key to identify the object
 */
TodoManager.prototype.addTodo = function () {
    let todo = document.getElementById('addTodoInputText');
    if (todo.value.trim() === '') {
        return;
    }

    let dateStr = TodoManager.dateToString(this.date);

    if (!this.todos.hasOwnProperty(dateStr)) {
        this.todos[dateStr] = [];
    }

    this.todos[dateStr].push({ title: todo.value.trim(), key: TodoManager.generateKey() });

    this.saveToLs();

    this.addTodoToList(this.date);

    todo.value = '';

    const event = new CustomEvent('todoadded');
    this.dispatchEvent(event);
}

TodoManager.toggleCalendar = function () {
    const calendar = document.getElementById('calendar');
    const buttonText = document.getElementById("calendarPhone");

    if (calendar.style.display != "block") {
        calendar.style.display = "block";
        buttonText.textContent = "Dölj kalender"
    } else {
        calendar.style.display = "none";
        buttonText.textContent = "Visa kalender"

    }
}

/**
 * Convert a Date object to a string 'yyyy-mm-dd'
 * @param {Date} date
 * @returns {string}
 */
TodoManager.dateToString = function (date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
}

/**
 * Creates li, buttons, span element
 * @param date
 */
TodoManager.prototype.addTodoToList = function (date) {
    const key = TodoManager.dateToString(date);

    // Hämta UL från html,
    const ulTodo = document.getElementById('todoULDOM');
    ulTodo.innerHTML = "";

    if (!this.todos.hasOwnProperty(key)) {
        return;
    }

    // loopa igenom arrayen med "todo" objekten
    for (const todo of this.todos[key]) {

        //skapar ett list-element ("Li") för varje  objekt "todo" ur arrayen todos och skriver ut "title" ur objektet i DOMen. samt
        // lägger till en knapp som har funktion on click.
        const liTodo = document.createElement("li");
        liTodo.setAttribute('key', todo.key);

        const title = document.createElement('span');
        title.classList.add('title');
        title.innerText = todo.title;


        const removeButton = document.createElement('button')

        // icon for remove todo
        removeButton.className = "fas fa-trash-alt"
        removeButton.classList.add('deleteTodo')
        removeButton.addEventListener('click', (e) => { this.deleteTodoFromList(e); })

        liTodo.append(title, removeButton);
        liTodo.className = "list-item";

        let changeNameOnToDo = document.createElement('button');
        changeNameOnToDo.className = 'changeToDo';
        changeNameOnToDo.addEventListener('click', (e) => { this.editTodo(e); });

        liTodo.appendChild(changeNameOnToDo);

        // icon for change a todo
        changeNameOnToDo.className = "fas fa-edit";

        // lägg till li-elementet i UL'en
        ulTodo.append(liTodo);
    }
}

/**
 * Edit the title of a todo item
 * @param {Event} editButtonEvent
 */
TodoManager.prototype.editTodo = function (editButtonEvent) {
    // Find the parent li element to the edit button
    const todoLi = editButtonEvent.target.parentElement;
    // Find the title element of the li item
    const titleSpan = todoLi.querySelector('span.title');
    // Hide the title element
    titleSpan.style.display = 'none';
    // Create an input field to change the title
    let changeToDoInputField = document.createElement('input');
    // Set the text of the input to the title
    changeToDoInputField.value = titleSpan.textContent;
    // Add the input field to the start of the li element
    todoLi.prepend(changeToDoInputField);
    // Focus the cursor on the input field
    changeToDoInputField.focus();

    // Add an event listener for when the input field is no longer selected
    changeToDoInputField.addEventListener('blur', () => {
        // Update the title to the value of the input field
        titleSpan.textContent = changeToDoInputField.value;
        // Show the title element
        titleSpan.style.display = 'inline';

        // Find and update the value of the todo in the todos object
        const dateString = TodoManager.dateToString(this.date);
        const index = this.todos[dateString].findIndex(item => item.key === todoLi.getAttribute('key'));
        this.todos[dateString][index].title = changeToDoInputField.value;

        // Update localStorage
        this.saveToLs();

        // Remove the input field
        changeToDoInputField.remove();
    });
}

/**
 * Generate a random key
 * @returns {string}
 */
TodoManager.generateKey = function () {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
}

/**
 * Deletes the todo from the todo list and localstorage
 * @param event
 */
TodoManager.prototype.deleteTodoFromList = function (event) {
    let todo = event.target.parentNode;
    const dateString = TodoManager.dateToString(this.date);
    const index = this.todos[dateString].findIndex(item => item.key === todo.getAttribute('key'));
    this.todos[dateString].splice(index, 1);
    this.saveToLs();
    todo.remove();

    const ev = new CustomEvent('tododeleted');
    this.dispatchEvent(ev);
}

/**
 * Get the number of todos to the calender
 * @param date
 * @returns {*|number}
 */
TodoManager.prototype.getNumberOfTodos = function (date) {
    const key = TodoManager.dateToString(date);

    return this.todos.hasOwnProperty(key) ? this.todos[key].length : 0;
}


function bigScreen() {
    const calendar = document.getElementById("calendar")
    if (window.matchMedia("(min-width: 630px)")) {
        calendar.style.display = null


    }
}