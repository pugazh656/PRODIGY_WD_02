let startTime, interval;
let elapsedTime = 0;
let running = false;
let laps = [];

const display = document.getElementById("time");
const lapList = document.getElementById("lap-list");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function updateTime() {
  const now = Date.now();
  const time = elapsedTime + (now - startTime);
  display.textContent = formatTime(time);
}

function start() {
  if (!running) {
    startTime = Date.now();
    interval = setInterval(updateTime, 1000);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(interval);
    elapsedTime += Date.now() - startTime;
    running = false;
  }
}

function reset() {
  clearInterval(interval);
  elapsedTime = 0;
  running = false;
  laps = [];
  display.textContent = "00:00:00";
  lapList.innerHTML = "";
}

function recordLap() {
  if (running) {
    const lapTime = elapsedTime + (Date.now() - startTime);
    laps.push(lapTime);
    updateLapList();
  }
}

function updateLapList() {
  lapList.innerHTML = "";

  if (laps.length === 0) return;

  let fastest = Math.min(...laps);
  let slowest = Math.max(...laps);

  laps.forEach((lap, index) => {
    const li = document.createElement("li");
    li.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;

    if (lap === fastest && laps.length > 1) {
      li.classList.add("fastest");
    } else if (lap === slowest && laps.length > 1) {
      li.classList.add("slowest");
    }

    lapList.appendChild(li);
  });
}
