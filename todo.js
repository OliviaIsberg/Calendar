

let today = new Date();
let dat = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
document.querySelector('.displayDate').innerHTML = `${dat}`;
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
document.querySelector('.displayTime').innerHTML = `${time}`;