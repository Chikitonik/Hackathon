//// only addEventListener works in extension (not in html) ////
const alarmsList = document.getElementById("alarmsList");
addAllAlarmsToHTML();
// #region settings and load
// load from localStorage
// in
const countMinutes = document.getElementById("countMinutes");
let countMinutesValue = localStorage.getItem("countMinutesValue");
if (!countMinutesValue) countMinutesValue = 1;
countMinutes.value = countMinutesValue;
// every
const countPeriod = document.getElementById("countPeriod");
let countPeriodValue = localStorage.getItem("countPeriodValue");
if (!countPeriodValue) countPeriodValue = 1;
countPeriod.value = countPeriodValue;
// times
const timesPeriod = document.getElementById("timesPeriod");
let timesPeriodValue = localStorage.getItem("timesPeriodValue");
if (!timesPeriodValue) timesPeriodValue = 1;
timesPeriod.value = timesPeriodValue;
// volume
const volume = document.getElementById("volume");
let volumeValue = localStorage.getItem("volumeValue");
if (!volumeValue) volumeValue = volume.value / 10;
volume.value = volumeValue * 10;
volume.addEventListener("change", getVolume);
function getVolume() {
  volumeValue = volume.value / 10;
  localStorage.setItem("volumeValue", volumeValue);
}
// duration
const duration = document.getElementById("duration");
let durationValue = localStorage.getItem("durationValue");
if (!durationValue) durationValue = duration.value * 1000;
duration.value = durationValue / 1000;
duration.addEventListener("change", getDuration);
function getDuration() {
  durationValue = duration.value * 1000;
  localStorage.setItem("durationValue", durationValue);
}
// sound
const sound = document.getElementById("sound");
let soundSelected = localStorage.getItem("soundSelected");
if (!soundSelected) soundSelected = sound.value;
sound.value = soundSelected;
sound.addEventListener("change", getSound);
function getSound() {
  soundSelected = sound.value;
  localStorage.setItem("soundSelected", soundSelected);
}
// show
// show alert in
const showCountMinutesForm = document.getElementById("showCountMinutesForm");
const showCountMinutes = document.getElementById("showCountMinutes");
try {
  showCountMinutes.checked =
    localStorage.getItem("showCountMinutesCheck") === "true";
} catch {
  showCountMinutes.checked = true;
}
showCountMinutesCheck();
showCountMinutes.addEventListener("change", showCountMinutesCheck);
function showCountMinutesCheck() {
  showCountMinutes.checked
    ? (showCountMinutesForm.style.display = "block")
    : (showCountMinutesForm.style.display = "none");
  localStorage.setItem("showCountMinutesCheck", showCountMinutes.checked);
  console.log("localStorage :>> ", localStorage);
}
// show alert at
const showCertainTimeForm = document.getElementById("showCertainTimeForm");
const showCertainTime = document.getElementById("showCertainTime");
showCertainTime.checked =
  localStorage.getItem("showCertainTimeCheck") === "true";
showCertainTimeCheck();
showCertainTime.addEventListener("change", showCertainTimeCheck);
function showCertainTimeCheck() {
  showCertainTime.checked
    ? (showCertainTimeForm.style.display = "block")
    : (showCertainTimeForm.style.display = "none");
  localStorage.setItem("showCertainTimeCheck", showCertainTime.checked);
}
// show alert per
const showPeriodForm = document.getElementById("showPeriodForm");
const showPeriod = document.getElementById("showPeriod");
showPeriod.checked = localStorage.getItem("showPeriodCheck") === "true";
showPeriodCheck();
showPeriod.addEventListener("change", showPeriodCheck);
function showPeriodCheck() {
  showPeriod.checked
    ? (showPeriodForm.style.display = "block")
    : (showPeriodForm.style.display = "none");
  localStorage.setItem("showPeriodCheck", showPeriod.checked);
}
// #endregion settings
// alarm name with data
function setAlarmName(AlarmTimeString, countTimes = 1) {
  const alarmName = new URLSearchParams();
  alarmName.append("time", new Date());
  alarmName.append("volume", volumeValue);
  alarmName.append("src", `sounds\\${soundSelected}`);
  alarmName.append("duration", durationValue);
  alarmName.append("countTimes", countTimes);
  // console.log("alarmName.toString() :>> ", alarmName.toString());
  return alarmName.toString();
}
// alarm countdown
document.getElementById("setAlarm").addEventListener("click", setAlarm);
async function setAlarm(e) {
  e.preventDefault();
  countMinutesValue = +countMinutes.value;
  localStorage.setItem("countMinutesValue", countMinutesValue);
  const AlarmTimeString = new Date(
    new Date().getTime() + countMinutesValue * 60000
  ).toLocaleTimeString("en-US", { hour12: false });
  const alarmName = setAlarmName(AlarmTimeString);
  chrome.alarms.create(alarmName, {
    delayInMinutes: countMinutesValue, //duration of time in minutes after which the onAlarm event should fire.
  });
  addAllAlarmsToHTML();
}
// alarm clear
function alarmClear(e) {
  const AlarmTimeString = e.currentTarget.id;
  chrome.alarms.clear(AlarmTimeString);
  document.getElementById(AlarmTimeString).remove();
}
// test
document.getElementById("test").addEventListener("click", () => {
  const alarmName = setAlarmName("test");
  chrome.alarms.create(alarmName, {
    when: Date.now(), // run without delay
  });
});
// setTimeAlarm
var certainTime;
document.getElementById("setTimeAlarm").addEventListener("click", setTimeAlarm);
function setTimeAlarm(e) {
  e.preventDefault();

  certainTime = document.getElementById("certainTime").value;
  let dt = new Date();
  dt.setHours(certainTime.split(":")[0]);
  dt.setMinutes(certainTime.split(":")[1]);
  dt.setSeconds(0);
  const alarmName = setAlarmName(certainTime);
  chrome.alarms.create(alarmName, {
    when: dt.getTime(), //Time at which the alarm should fire, in milliseconds past the epoch (e.g. Date.now() + n).
  });
  addAllAlarmsToHTML();
}
// setPeriodAlarm
document
  .getElementById("setPeriodAlarm")
  .addEventListener("click", setPeriodAlarm);
function setPeriodAlarm(e) {
  e.preventDefault();
  countPeriodValue = +countPeriod.value;
  timesPeriodValue = +timesPeriod.value;
  const alarmName = setAlarmName(
    `every ${countPeriodValue} min`,
    timesPeriodValue
  );
  chrome.alarms.create(alarmName, {
    delayInMinutes: countPeriodValue,
    periodInMinutes: countPeriodValue, //If set, the onAlarm event should fire every periodInMinutes minutes
  });
  addAllAlarmsToHTML();
  localStorage.setItem("countPeriodValue", countPeriodValue);
  localStorage.setItem("timesPeriodValue", timesPeriodValue);
}
// save alarms to alarmsList
async function addAllAlarmsToHTML() {
  alarmsList.innerHTML = "";

  const chromeAlarmsList = await chrome.alarms
    .getAll()
    .then((result) => {
      console.log("chromeAlarmsList :>> ", result);
      return result;
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
  for (let alarm of chromeAlarmsList) {
    const alarmName = new URLSearchParams(alarm.name);
    const alarmTime = new Date(alarm.scheduledTime);
    const div = document.createElement("div");
    if (alarm.periodInMinutes) {
      div.textContent = `${alarmTime.toLocaleTimeString("en-GB")} and every ${
        alarm.periodInMinutes
      } min, ${alarmName.get("countTimes")} times left`;
    } else {
      div.textContent = `${alarmTime.toLocaleTimeString("en-GB")}`;
    }

    div.id = alarm.name;
    div.addEventListener("click", alarmClear);
    alarmsList.appendChild(div);
  }
}
