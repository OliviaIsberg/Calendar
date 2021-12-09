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
console.log(todosByDay)