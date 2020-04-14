window.addEventListener('load', start);

let DateTime = luxon.DateTime;

function start () {
  setInterval((() => {
    let timer = document.querySelector("#currentTimeString");
    timer.textContent = `Current Time: ${DateTime.local().toFormat("HH:mm:ss")}`;
  }), 1000);
}