// only addEventListener works in extension //
document.getElementById("setAlarm").addEventListener("click", setAlarm);
const alarmsList = document.getElementById("alarmsList");
const countMinutes = document.getElementById("countMinutes");
// Load alarmsList
alarmsList.innerHTML = localStorage.getItem("alarmsList");
for (let div of alarmsList.children) {
  div.addEventListener("click", alarmClear);
}

async function setAlarm(e) {
  e.preventDefault();
  const AlarmTimeString = new Date(
    new Date().getTime() + +countMinutes.value * 60000
  ).toLocaleTimeString();

  if (!document.getElementById(AlarmTimeString)) {
    if (+countMinutes.value < 1440) {
      let alarm = function () {
        chrome.alarms.create(AlarmTimeString, {
          delayInMinutes: +countMinutes.value, //Length of time in minutes after which the onAlarm event should fire.
          // periodInMinutes: 3, //If set, the onAlarm event should fire every periodInMinutes minutes
          //when://Time at which the alarm should fire, in milliseconds past the epoch (e.g. Date.now() + n).
        });
      };

      alarm();
      console.log("AlarmTimeString :>> ", AlarmTimeString);

      const div = document.createElement("div");
      div.textContent = AlarmTimeString;
      div.id = AlarmTimeString;
      div.addEventListener("click", alarmClear);
      const span = document.createElement("span");
      span.textContent = " delete";
      div.appendChild(span);
      alarmsList.appendChild(div);
      // Save alarmsList
      localStorage.setItem("alarmsList", alarmsList.innerHTML);
    } else {
      alert("Too much minutes!");
    }
  } else {
    alert("There is another alarm in this time!)");
  }
}

function alarmClear(e) {
  console.log("e :>> ", e);
  const AlarmTimeString = e.currentTarget.id;
  chrome.alarms.clear(AlarmTimeString);
  console.log("AlarmTimeString canceled :>> ", AlarmTimeString);
  document.getElementById(AlarmTimeString).remove();
  localStorage.setItem("alarmsList", alarmsList.innerHTML);
}
