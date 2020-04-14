let timeStats = {
  startTime : "",
  markers : [],
  endTime : ""
}

let taskPresets = [
  "Summarising",
  "Calling",
  "Organsing",
  "Emailing"  
]

let oldSelected;

window.addEventListener('load', () => {
  timeStats.startTime = new Date();
  pushNewMarker("Started Work!");
  updateScreen();
  setInterval(updateScreen, 1000);
  regenerateTasks();
});

function updateScreen () {
  title = document.querySelector('#timeStatistics');
  title.textContent = `You clocked in at ${getTimeString(timeStats.startTime)} and have been working for ${getTimeString(new Date(new Date() - timeStats.startTime))}`;

  let actionlog = document.querySelector("#actionlog");
  let timelog = document.querySelector("#timelog");
  actionlog.innerHTML = "";
  timelog.innerHTML = "";

  for (let i = 0; i < timeStats.markers.length; i++) {
    let newAction = document.createElement("li");
    let newTime = document.createElement("li");

    newAction.textContent = timeStats.markers[i].message;
    newTime.textContent = getTimeString(timeStats.markers[i].time);

    actionlog.appendChild(newAction);
    timelog.appendChild(newTime);
  }
}

/**
 * Generates all of the preset tasks on the Windowz
 */
function regenerateTasks () {
  let parent = document.querySelector("#items");
  parent.innerHTML = "";

  for (let preset of taskPresets) {
    let newElement = document.createElement("li");
    newElement.textContent = preset;
    newElement.classList.add("btn");
    newElement.classList.add("btn-primary");
    newElement.addEventListener("click", itemClicked)
    parent.appendChild(newElement);
  }
}

/**
 * Handle for the one of the items on the list has been clicked
 * @param {*} e 
 */
function itemClicked (e) {
  if (oldSelected !== undefined) {
    oldSelected.target.classList = [];
    oldSelected.target.classList.add('btn');
    oldSelected.target.classList.add('btn-primary');
  }
  
  pushNewMarker(e.target.textContent);
  updateLog();
  e.target.classList = [];
  e.target.classList.add('btn');
  e.target.classList.add('btn-success');
  oldSelected = e;
}

function getTimeString (date=new Date()) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function subtractTimes (time1, time2) {
  time1.setDate(time1.getDate() - time2);
  return time1;
}

function updateLog () {
  for (let value of timeStats.markers) {
    console.log(`${value.message} @ ${value.time}`);
  }
}

function pushNewMarker (description) {
  timeStats.markers.push({
    time : new Date(),
    message : description
  });
}