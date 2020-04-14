window.addEventListener('load', start);

function start () {
  setInterval((() => {
    let timer = document.querySelector("#currentTimeString");
    let currentTime = new Date();
    timer.textContent = `Current Time is: ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
  }), 1000);
}