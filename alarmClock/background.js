chrome.alarms.onAlarm.addListener((a) => {
  console.log("Alarm! Alarm!", a);
  let url = chrome.runtime.getURL("audio.html");
  const params = new URLSearchParams(a.name);
  url += `?volume=${params.get("volume")}&src=${params.get(
    "src"
  )}&duration=${params.get("duration")}`;

  playSound(url);
  let countTimes = params.get("countTimes");
  if (countTimes == 1) {
    chrome.alarms.clear(a.name);
  } else {
    countTimes -= 1;
    params.set("countTimes", countTimes);
    chrome.alarms.create(params.toString(), {
      delayInMinutes: a.periodInMinutes,
      periodInMinutes: a.periodInMinutes,
    });
    chrome.alarms.clear(a.name);
  }
});

function playSound(url) {
  // this will play success.wav at half the volume and close the popup after a second
  //   url += "?volume=0.5&src=sounds\\ship.mp3&duration=1000";

  // console.log("AlarmName :>> ", AlarmName);

  chrome.windows.create({
    type: "popup",
    focused: false,
    top: 1,
    left: 1,
    height: 1,
    width: 1,
    url,
  });
}
