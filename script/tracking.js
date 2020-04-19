let timeStats = {
  startTime : "",
  markers : [],
  endTime : ""
}

let oldSelected;

let DateTime = luxon.DateTime;

class Tasks {
  constructor(tasks) {
    this.tasks = tasks;
  }

  getTaskList () {
    return this.tasks.sort();
  }

  addTask (taskString) {
    this.tasks.push(taskString);
  }

  addTasks (taskStrings) {
    for (let value of taskStrings) {
      this.tasks.push(value);
    }
  }

  removeTask (taskString) {
    this.tasks.splice(this.tasks.indexOf(taskString), 1);
  }

  clearTasks () {
    this.tasks = [];
  }

  static saveToLocalStorage (tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks.getTaskList()));
  }

  static loadFromLocalStorage () {
    return JSON.parse(localStorage.getItem('tasks'));
  }
}

let currentTasks;

// Handle for the page being loaded
window.addEventListener('load', () => {

  currentTasks = new Tasks(Tasks.loadFromLocalStorage());
  if (currentTasks.tasks === null) {
    currentTasks = new Tasks([
      "Accepting Notes",
      "Chase Medical Records",
      "Diabetic Eyes",
      "Franking",
      "GMS3's",
      "GP-GP Transfers",
      "Gynae Coding",
      "Lunch",
      "Materinity Referrals",
      "Meeting",
      "Milk",
      "Military Spreadsheet",
      "NASO Reports",
      "Smears",
      "Summarising"
    ]);
  }

  timeStats.startTime = DateTime.local();

  pushNewMarker("Started Work!");
  updateScreen();
  setInterval(updateScreen, 1000);

  let pauseButton = document.querySelector("#pausebutton");
  pauseButton.onclick = handlePause;

  let unpauseButton = document.querySelector("#unpausebutton");
  unpauseButton.onclick = handleUnpause;

  regenerateTasks();
});

// Stop the user accidentally navigating away from the site
window.onbeforeunload = function () {
  return "";
}


function handlePause (e) {
  pushNewMarker("Pause");
  let modal = document.querySelector("#pausemenu");
  modal.style.display = "block";
}

function handleUnpause (e) {
  pushNewMarker("Unpause");
  let modal = document.querySelector("#pausemenu");
  modal.style.display = "none";
}

function updateScreen () {
  title = document.querySelector('#timeStatistics');
  title.textContent = `You clocked in at ${timeStats.startTime.toFormat("HH:mm")} on ${timeStats.startTime.weekdayLong}`;

  let actionlog = document.querySelector("#actionlog");
  actionlog.innerHTML = "";

  for (let i = 0; i < timeStats.markers.length; i++) {
    let newAction = document.createElement("li");

    newAction.textContent = `${timeStats.markers[i].message} @ ${timeStats.markers[i].time.toFormat("HH:mm")}`;

    actionlog.appendChild(newAction);
  }
}

/**
 * Generates all of the preset tasks on the Windowz
 */
function regenerateTasks () {
  let parent = document.querySelector("#items");
  parent.innerHTML = "";

  for (let task of currentTasks.getTaskList()) {
    let newContainer = document.createElement("div");
    let newText = document.createElement("p");
    let newDelete = document.createElement("p");

    newText.textContent = task;
    newDelete.textContent = '🗑️';
    newDelete.dataset.messageContent = task;

    newContainer.classList.add("listing");
    
    newText.classList.add("btn");
    newText.classList.add("btn-primary");
    newText.classList.add("text");

    newText.onclick = itemClicked;
    
    newDelete.classList.add("btn");
    newDelete.classList.add("btn-danger");
    newDelete.classList.add("waste");

    newDelete.onclick = deleteElement;

    newContainer.appendChild(newDelete);
    newContainer.appendChild(newText);
    parent.appendChild(newContainer);
  }

  let newTask = document.createElement('button');
  newTask.textContent = 'New Element ➕';
  newTask.onclick = createElement;
  newTask.classList.add('btn', 'btn-info', 'fillx');
  parent.appendChild(newTask);
}

function createElement () {
  let modal = document.querySelector("#hiddenadd");
  modal.style.display = "block";
}

function closeModal () {
  let modal = document.querySelector("#hiddenadd");
  modal.style.display = "none";
}

function deleteElement (e) {
  currentTasks.removeTask(e.target.dataset.messageContent);
  regenerateTasks();
  Tasks.saveToLocalStorage(currentTasks);
}

function submitTaskModal (e) {
  let inputTask = document.querySelector("#newtask");
  currentTasks.addTask(inputTask.value);
  closeModal();
  regenerateTasks();  
  Tasks.saveToLocalStorage(currentTasks);
}

/**
 * Handle for the one of the items on the list has been clicked
 * @param {*} e 
 */
function itemClicked (e) {
  if (oldSelected !== undefined) {
    oldSelected.target.classList = [];
    oldSelected.target.classList.add('text');
    oldSelected.target.classList.add('btn');
    oldSelected.target.classList.add('btn-primary');
  }
  
  pushNewMarker(e.target.textContent);
  e.target.classList = [];
  e.target.classList.add('text');
  e.target.classList.add('btn');
  e.target.classList.add('btn-success');
  oldSelected = e;
}

function pushNewMarker (description) {
  timeStats.markers.push({
    time : DateTime.local(),
    message : description
  });
}

function clockOut() {
  pushNewMarker("Clocked out...");
  writeLocalWorkToStorage();

  window.removeEventListener('onbeforeunload', (function () {
    return "";
  }));

  // Navigate to the overview screen
  window.location.replace("overview.html");
}
 
/**
 * Writes the timeStats object to localStorage
 */
function writeLocalWorkToStorage () {
  localStorage.setItem('day', JSON.stringify(timeStats));
}