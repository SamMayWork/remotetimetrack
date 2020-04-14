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

let DateTime = luxon.DateTime;

window.addEventListener('load', () => {
  timeStats.startTime = DateTime.local();
  pushNewMarker("Started Work!");
  updateScreen();
  setInterval(updateScreen, 1000);
  regenerateTasks();
});

function updateScreen () {
  title = document.querySelector('#timeStatistics');
  title.textContent = `You clocked in at ${timeStats.startTime.toFormat("HH:mm:ss")}`;

  let actionlog = document.querySelector("#actionlog");
  let timelog = document.querySelector("#timelog");
  actionlog.innerHTML = "";
  timelog.innerHTML = "";

  for (let i = 0; i < timeStats.markers.length; i++) {
    let newAction = document.createElement("li");
    let newTime = document.createElement("li");

    newAction.textContent = timeStats.markers[i].message;
    newTime.textContent = timeStats.markers[i].time.toFormat("HH:mm:ss");

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

function updateLog () {
  for (let value of timeStats.markers) {
    console.log(`${value.message} @ ${value.time}`);
  }
}

function pushNewMarker (description) {
  timeStats.markers.push({
    time : DateTime.local(),
    message : description
  });
}