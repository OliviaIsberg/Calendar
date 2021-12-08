let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
document.querySelector('.displayDate').innerHTML = `${date}`;
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
document.querySelector('.displayTime').innerHTML = `${time}`;