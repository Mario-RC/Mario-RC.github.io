
function mostrarMenuMobile(e) {
	e.preventDefault();
	mobileMenu.classList.toggle('is-visible')
}

var mobileMenu = document.querySelector('.mobile-menu')
var triggerMenu = document.querySelectorAll('.trigger-menu')

for( var t of triggerMenu){
	t.addEventListener('click', mostrarMenuMobile)
}

function toggleDark() {
	var element = document.body;
	element.classList.toggle("dark-mode");
}

function toggleIcon(x) {
	x.classList.toggle("fa-sun");
}

// TIMER //
//var focusTime = document.getElementById("focusTime").value;
//var restTime = document.getElementById("restTime").value;

let timeLimit = document.getElementById("focusTime").value*60;
let timeLeft = timeLimit;
let timePassed = 0;
let timerInterval = null;
let onTimesUpFlag = 0;
let audioCounter = 3;

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = timeLimit/4;
const ALERT_THRESHOLD = timeLimit/8;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};
let remainingPathColor = COLOR_CODES.info.color;

var popupAudioPlayer = document.getElementById('times-up-audio');
var startBtn = document.getElementById('start');
var pauseBtn = document.getElementById('pause');
var stopBtn = document.getElementById('stop');

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

document.getElementById("timerClock").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / timeLimit;
  return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function setRemainingPathColor(timeLeft, timeLimit) {
  const { info, warning, alert } = COLOR_CODES;
  thresholdAlert = timeLimit/8;
  thresholdWarning = timeLimit/4;
  //if (timeLeft <= alert.threshold) {
  if (timeLeft <= thresholdAlert) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  //} else if (timeLeft <= warning.threshold) {
  } else if (timeLeft <= thresholdWarning) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  } else {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(alert.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(info.color);
  }
}

const onTimesUpAudio = function() {
  popupAudioPlayer.play();
  audioCounter--;
  if (audioCounter === 0) {
    popupAudioPlayer.currentTime = 0;
    popupAudioPlayer.loop = false;   
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function printTimer(timeLeft, timeLimit) {
  document.getElementById("base-timer-label").innerHTML = formatTime(
    timeLeft
  );
  setCircleDasharray();
  setRemainingPathColor(timeLeft, timeLimit);
}

function calculateTimeLeft(timeLimit, timePassed) {
  return timeLeft = timeLimit - timePassed;
}

function startTimer() {
  timeLimit = document.getElementById("focusTime").value*60;
  timerInterval = setInterval(() => {

    timeLeft = calculateTimeLeft(timeLimit, timePassed)
    printTimer(timeLeft, timeLimit);
    timePassed = timePassed += 1;

    stopBtn.addEventListener("click", function (event) {
      timePassed = 0;
      timeLimit = document.getElementById("focusTime").value*60;
      timeLeft = calculateTimeLeft(timeLimit, timePassed);
      printTimer(timeLeft, timeLimit);
      pauseTimer();
    });
    
    pauseBtn.addEventListener("click", function (event) {
      pauseTimer();
    });
    
    if (timeLeft === 0) {
      timePassed = 0;
      if (onTimesUpFlag === 0) {
        timeLimit = document.getElementById("restTime").value*60;
        onTimesUpFlag = 1;
      }
      else {
        timeLimit = document.getElementById("focusTime").value*60;
        onTimesUpFlag = 0;
      }
      onTimesUpAudio();
    }

  }, 1000);
}

startBtn.addEventListener("click", function (event) {
  startTimer();
});
