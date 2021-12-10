window.addEventListener('load', mainToDo);

function mainToDo() {
    addEventListeners();
}

function addEventListeners() {
    let form = document.querySelector('form');
    form.addEventListener('submit', inputFieldToDoList);

}

function inputFieldToDoList(e) {
    let textInput = document.getElementById('text');
    console.log(textInput.value);
    e.preventDefault();
}

const todos = [
    {
        title: 'baka en tårta',
        date: '2021-12-09',
    },
    {
        title: 'baka en tårta',
        date: '2021-12-09',
    },    
    {
        title: 'baka en tårta',
        date: '2021-12-10',
    }
];

const todosByDay = todos.filter((todo) => todo.date === "2021-12-10")