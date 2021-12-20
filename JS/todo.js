function addEventListeners() {
    let form = document.querySelector('form');
    form.addEventListener('submit', inputFieldToDoList);
    form.addEventListener('submit', addTodo);


}

function inputFieldToDoList(e) {
    let textInput = document.getElementById('addTodoInputText');
    e.preventDefault();
}

function toggleForm() {
    const form = document.getElementsByClassName('formForTodo')[0];
    form.classList.toggle('hide');


}

/**
 * Convert a Date object to a string 'yyyy-mm-dd'
 * @param {Date} date
 * @returns {string}
 */
function dateToString(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
}

//funktionen som skapar list-elementet.
function addTodoToList(date) {
    const key = dateToString(date);

    // Hämta UL från html,
    const ulTodo = document.getElementById('todoULDOM');
    ulTodo.innerHTML = "";

    if (!todos.hasOwnProperty(key)) {
        return;
    }

    // loopa igenom arrayen med "todo" objekten
    for (const todo of todos[key]) {

        //skapar ett list-element ("Li") för varje  objekt "todo" ur arrayen todos och skriver ut "title" ur objektet i DOMen. samt
        // lägger till en knapp som har funktion on click.
        const liTodo = document.createElement("li");
        liTodo.setAttribute('key', todo.key);

        const title = document.createElement('span');
        title.classList.add('title');
        title.innerText = todo.title;


        const removeButton = document.createElement('button')
        removeButton.className = "fas fa-trash-alt"
        // removeButton.innerText = 'X'
        removeButton.classList.add('deleteTodo')
        removeButton.addEventListener('click', deleteTodoFromList)

        liTodo.append(title, removeButton);
        liTodo.className = "list-item";

        let changeNamnOnToDo = document.createElement('button');
        changeNamnOnToDo.className = 'changeToDo';
        changeNamnOnToDo.addEventListener('click', editTodo);

        liTodo.appendChild(changeNamnOnToDo);
        changeNamnOnToDo.className = "fas fa-edit";
        //changeNamnOnToDo.innerText = 'Ändra';

        // lägg till li-elementet i UL'en
        ulTodo.append(liTodo);
    }
}

/**
 * Edit the title of a todo item
 * @param {Event} editButtonEvent
 */
function editTodo(editButtonEvent) {
    // Find the parent li element to the edit button
    const todoLi = editButtonEvent.target.parentElement;
    // Find the title element of the li item
    const titleSpan = todoLi.querySelector('span.title');
    // Hide the title element
    titleSpan.style.visibility = 'hidden';
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
        titleSpan.style.visibility = 'visible';

        // Find and update the value of the todo in the todos object
        const dateString = document.getElementById('date').value;
        const index = todos[dateString].findIndex(item => item.key === todoLi.getAttribute('key'));
        todos[dateString][index].title = changeToDoInputField.value;

        // Update localStorage
        saveToLs(todos);
        // Remove the input field
        changeToDoInputField.remove();
    });
}

/**
 * Changes the title of the todos when the button "ändra" is pressed
 */
function changeToDoWhenButtonPress() {
    const listItem = document.querySelector('.list-item');
    if (!listItem) {
        return;
    }

    addTodoToList();
}

/**
 * Save content to Localstorage
 */
function saveToLs(keyvalue) {
    localStorage.setItem('todo', JSON.stringify(keyvalue));
}

/**
 * Get content from Localstorage
 */
function loadFromLS() {
    const todoStr = localStorage.getItem('todo');
    if (todoStr) {
        todos = JSON.parse(todoStr);
    }
}

function addTodo() {
    let todo = document.getElementById('addTodoInputText');
    if (todo.value.trim() === '') {
        return;
    }

    let dateStr = document.getElementById('date').value;
    let date = new Date(dateStr);
    if (!todos.hasOwnProperty(dateStr)) {
        todos[dateStr] = [];
    }

    todos[dateStr].push({ title: todo.value.trim(), key: generateKey() });

    saveToLs(todos);

    addTodoToList(date);
    todo.value = '';
}

/**
 * Generate a random key
 * @returns {string}
 */
function generateKey() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
}

// en funktion som tar bort "todo" från listan samt tar bort onjektet från arrayen. från arrayen.
function deleteTodoFromList(event) {
    let todo = event.target.parentNode;
    const dateString = document.getElementById('date').value;
    const index = todos[dateString].findIndex(item => item.key === todo.getAttribute('key'));
    todos[dateString].splice(index, 1);
    saveToLs(todos);
    todo.remove();
}

function getNumberOfTodos(date) {
    const key = dateToString(date);

    return todos.hasOwnProperty(key) ? todos[key].length : 0;
}



let todos = {};

