window.addEventListener('load', start);

let DateTime = luxon.DateTime;

function start () {
  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock () {
  let timer = document.querySelector('#currentTimeString');
  timer.textContent = `Current Time: ${DateTime.local().toFormat('HH:mm:ss')}`;   
}