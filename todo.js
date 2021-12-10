window.addEventListener('load', mainToDo);

function mainToDo() {
    addEventListeners();
}

function addEventListeners() {
    let form = document.querySelector('form');
    form.addEventListener('submit', inputFieldToDoList);
    const toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', toggleForm)

}

function inputFieldToDoList(e) {
    let textInput = document.getElementById('text');
    console.log(textInput.value);
    e.preventDefault();
}

function toggleForm() {
    const form = document.getElementsByClassName('todo-box')[0];
    form.classList.toggle('hide')
    
    
}

function myFunction() {
    var x = document.getElementById("toggle-button");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
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