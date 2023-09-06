// document.addEventListener("DOMContentLoaded", function () {})

chrome.action.setBadgeBackgroundColor({ color: "#b5daba" });
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
// alarmDescription
const alarmDescription = document.getElementById("alarmDescription");
alarmDescription.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();
  }
});
// show
// show alert in
const showCountMinutesForm = document.getElementById("showCountMinutesForm");
const showCountMinutes = document.getElementById("showCountMinutes");

if (localStorage.getItem("showCountMinutesCheck") === null)
  localStorage.setItem("showCountMinutesCheck", "true");
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
// show text
const showAlarmDescriptionForm = document.getElementById(
  "showAlarmDescriptionForm"
);
const showAlarmDescription = document.getElementById("showAlarmDescription");
showAlarmDescription.checked =
  localStorage.getItem("showAlarmDescriptionCheck") === "true";
showAlarmDescriptionCheck();
showAlarmDescription.addEventListener("change", showAlarmDescriptionCheck);
function showAlarmDescriptionCheck() {
  showAlarmDescription.checked
    ? (showAlarmDescriptionForm.style.display = "block")
    : (showAlarmDescriptionForm.style.display = "none");
  localStorage.setItem(
    "showAlarmDescriptionCheck",
    showAlarmDescription.checked
  );
}
// isPlaySound
const isPlaySound = document.getElementById("isPlaySound");
let isPlaySoundCheck = localStorage.getItem("isPlaySoundCheck");
if (isPlaySoundCheck === null) {
  isPlaySoundCheck = "true";
  isPlaySound.checked = isPlaySoundCheck === "true";
} else isPlaySound.checked = isPlaySoundCheck === "true";
isPlaySound.addEventListener("change", () => {
  // if notifications off, then not allow to off the sound too
  if (!isShowNotifications.checked) {
    isPlaySound.checked = true;
  } else {
    isPlaySoundCheck = isPlaySound.checked;
    localStorage.setItem("isPlaySoundCheck", isPlaySoundCheck);
  }
});
// isShowNotifications
const isShowNotifications = document.getElementById("isShowNotifications");
let isShowNotificationsCheck = localStorage.getItem("isShowNotificationsCheck");
isShowNotifications.checked = isShowNotificationsCheck;
if (isShowNotificationsCheck === null) {
  isShowNotificationsCheck = "true";
  isShowNotifications.checked = isShowNotificationsCheck === "true";
} else isShowNotifications.checked = isShowNotificationsCheck === "true";
isShowNotifications.addEventListener("change", () => {
  // if sound off, then not allow to off the notifications too
  if (!isPlaySound.checked) {
    isShowNotifications.checked = true;
  } else {
    isShowNotificationsCheck = isShowNotifications.checked;
    localStorage.setItem("isShowNotificationsCheck", isShowNotificationsCheck);
  }
});
// clear all alarms and saved data
document.getElementById("clearAllData").addEventListener("click", (e) => {
  e.preventDefault();
  alarmsList.innerHTML = "";
  chrome.alarms.clearAll();
  localStorage.clear();
  localStorage.setItem("showCountMinutesCheck", true);
  localStorage.setItem("isPlaySoundCheck", true);
  localStorage.setItem("isShowNotificationsCheck", true);
  location.reload();
});
// #endregion settings
// alarm name with data
function setAlarmName(countTimes = 1) {
  const alarmName = new URLSearchParams();
  alarmName.append("time", new Date().getTime());
  alarmName.append("volume", volumeValue);
  alarmName.append("src", `sounds\\${soundSelected}`);
  alarmName.append("duration", durationValue);
  alarmName.append("countTimes", countTimes);
  alarmName.append("description", alarmDescription.value);
  alarmName.append("isNotify", isShowNotifications.checked);
  alarmName.append("isSound", isPlaySound.checked);
  return alarmName.toString();
}
// alarm clear
async function alarmClear(e) {
  const AlarmTimeString = e.currentTarget.id;
  chrome.alarms.clear(AlarmTimeString);
  document.getElementById(AlarmTimeString).remove();
  const chromeAlarmsList = await getAlarmsList();
  chromeAlarmsList.length > 0
    ? chrome.action.setBadgeText({ text: `${chromeAlarmsList.length}` })
    : chrome.action.setBadgeText({ text: `` });
}
// test
document.getElementById("test").addEventListener("click", () => {
  const alarmName = setAlarmName();
  chrome.alarms.create(alarmName, {
    when: Date.now(), // run without delay
  });
});
// alarm countdown
document.getElementById("setAlarm").addEventListener(
  "click",
  // async
  (e) => {
    e.preventDefault();
    countMinutesValue = +countMinutes.value;
    localStorage.setItem("countMinutesValue", countMinutesValue);
    const alarmName = setAlarmName();
    chrome.alarms.create(alarmName, {
      delayInMinutes: countMinutesValue, //duration of time in minutes after which the onAlarm event should fire.
    });
    addAllAlarmsToHTML();
  }
);
// setTimeAlarm
var certainTime;
document.getElementById("setTimeAlarm").addEventListener(
  "click",
  // async
  (e) => {
    e.preventDefault();
    certainTime = document.getElementById("certainTime").value;
    let dt = new Date();
    dt.setHours(certainTime.split(":")[0]);
    dt.setMinutes(certainTime.split(":")[1]);
    dt.setSeconds(0);
    const alarmName = setAlarmName();
    try {
      chrome.alarms.create(alarmName, {
        when: dt.getTime(), //Time at which the alarm should fire, in milliseconds past the epoch (e.g. Date.now() + n).
      });
    } catch {}
    addAllAlarmsToHTML();
  }
);
// setPeriodAlarm
document.getElementById("setPeriodAlarm").addEventListener(
  "click",
  // async
  (e) => {
    e.preventDefault();
    countPeriodValue = +countPeriod.value;
    timesPeriodValue = +timesPeriod.value;
    const alarmName = setAlarmName(timesPeriodValue);
    chrome.alarms.create(alarmName, {
      delayInMinutes: countPeriodValue,
      periodInMinutes: countPeriodValue, //If set, the onAlarm event should fire every periodInMinutes minutes
    });
    addAllAlarmsToHTML();
    localStorage.setItem("countPeriodValue", countPeriodValue);
    localStorage.setItem("timesPeriodValue", timesPeriodValue);
  }
);
// save alarms to alarmsList
async function addAllAlarmsToHTML() {
  alarmsList.innerHTML = "";
  const chromeAlarmsList = await getAlarmsList();

  for (let alarm of chromeAlarmsList) {
    const alarmName = new URLSearchParams(alarm.name);
    const alarmTime = new Date(alarm.scheduledTime);
    const div = document.createElement("div");
    if (alarm.periodInMinutes) {
      div.textContent = `${alarmTime.toLocaleTimeString("en-GB")} ${
        alarm.periodInMinutes
      }/${alarmName.get("countTimes")} ${alarmName.get("description")}`;
    } else {
      div.textContent = `${alarmTime.toLocaleTimeString(
        "en-GB"
      )} ${alarmName.get("description")}`;
    }

    div.id = alarm.name;
    div.addEventListener("click", alarmClear);
    alarmsList.appendChild(div);
  }
  chromeAlarmsList.length > 0
    ? chrome.action.setBadgeText({ text: `${chromeAlarmsList.length}` })
    : chrome.action.setBadgeText({ text: `` });
}
// get alarm list
async function getAlarmsList() {
  return await chrome.alarms
    .getAll()
    .then((result) => {
      console.log("chromeAlarmsList :>> ", result);
      return result;
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
}
