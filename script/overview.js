let DateTime = luxon.DateTime;

window.addEventListener('load', () => {
  let stats = JSON.parse(localStorage.getItem('day'));

  generateTableRows(stats);

  let time = document.querySelector('#timeOverview');
  time.textContent = `Overall, today you worked for ${(subtractTimes(new DateTime.local(), new DateTime.fromISO(stats.startTime))).toFormat("HH 'hours and' mm 'minutes'")}`;
});

function calculateWorkingTime (timeStats) {
  for (let makrer of timeStats.markers) {
    
  }
}

/**
 * Generates the table showing the overview of the day for the user
 */
function generateTableRows (timeStats) {
  let table = document.querySelector("#overview-table");

  for (let i = timeStats.markers.length - 1; i >= 0; i--) {
    let newRow = table.insertRow(0); 
    let message = newRow.insertCell(0);
    let timeStarted = newRow.insertCell(1);
    let duration = newRow.insertCell(2);
    
    let startedTime = new DateTime.fromISO(timeStats.markers[i].time);

    message.textContent = timeStats.markers[i].message;
    timeStarted.textContent = startedTime.toFormat("HH:mm");

    if (i > 0){
      const timeDifference = subtractTimes(startedTime, new DateTime.fromISO(timeStats.markers[i].time));
      duration.textContent = timeDifference.toFormat("HH 'hours and' MM 'minutes'");
    } else {
      duration.textContent = "";
    }
  }
} 

/**
 * Subtracts time2 from time1
 * @param {DateTime} time1 Time to minus from 
 * @param {DateTime} time2 Time to take away
 */
function subtractTimes (time1, time2) {
  let overall = time1;
  overall = overall.minus({hours:time2.hour, minutes:time2.minute});
  return overall;
}