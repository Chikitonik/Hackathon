chrome.alarms.onAlarm.addListener((a) => {
  console.log("Alarm! Alarm!", a);
  playSound();
  // button del
  chrome.alarms.clear(a.name);
  console.log(document.getElementById(a.name));
  document.getElementById(a.name).remove();
  // save
  const alarmsList = document.getElementById("alarmsList");
  localStorage.setItem("alarmsList", alarmsList.innerHTML);
});

function playSound() {
  let url = chrome.runtime.getURL("audio.html");

  // this will play success.wav at half the volume and close the popup after a second
  //   url += "?volume=0.5&src=sounds\\boom.wav&length=1000";
  url += "?volume=0.8&src=sounds\\boom.wav&length=3000";

  chrome.windows.create({
    type: "popup",
    focused: true,
    top: 1,
    left: 1,
    height: 1,
    width: 1,
    url,
  });
}
