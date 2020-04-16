let DateTime = luxon.DateTime;

window.addEventListener('load', () => {
  let stats = JSON.parse(localStorage.getItem('day'));
  let container = document.querySelector('#overview-container');
  
  for (let i = 0; i < stats.markers.length; i++) {
    let newL = document.createElement("li");
    if (i !== stats.markers.length -1) {
     newL.textContent = `Did "${stats.markers[i].message}" at ${new DateTime.fromISO(stats.markers[i].time).toFormat("HH:mm")} for ${(subtractTimes(new DateTime.fromISO(stats.markers[i+1].time), new DateTime.fromISO(stats.markers[i].time))).toFormat("HH:mm")}`;
    } else {
      newL.textContent = `Did "${stats.markers[i].message}" at ${new DateTime.fromISO(stats.markers[i].time).toFormat("HH:mm")}`;
    }

    container.appendChild(newL);
  }

  let time = document.querySelector('#timeOverview');
  time.textContent = `Overall, today you worked for ${(subtractTimes(new DateTime.local(), new DateTime.fromISO(stats.startTime))).toFormat("HH 'hours and' mm 'minutes'")}`;
});

function subtractTimes (time1, time2) {
  let overall = time1;
  overall = overall.minus({hours:time2.hour, minutes:time2.minute});
  return overall;
}