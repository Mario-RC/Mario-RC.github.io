
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
let FocusTime = document.getElementById("focusTime").value*60;
let RestTime = document.getElementById("restTime").value*60;
let timeLimit = FocusTime;
let timeLeft = timeLimit;
let timePassed = 0;
let timerInterval = null;
let onTimesUpChecks = 0;
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

var startBtn = document.getElementById('start');
var pauseBtn = document.getElementById('pause');
var stopBtn = document.getElementById('stop');
var popupAudioPlayer = document.getElementById('times-up-audio');

var check1 = document.getElementById('check1');
var check2 = document.getElementById('check2');
var check3 = document.getElementById('check3');
var check4 = document.getElementById('check4');
check1.style.display = 'none';
check3.style.display = 'none';
check4.style.display = 'none';
check2.style.display = 'none';

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
document.getElementById("timerTab").innerHTML = formatTime(
  timeLeft
);

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
  document.getElementById("timerTab").innerHTML = formatTime(
    timeLeft
  );
}

function calculateTimeLeft(timeLimit, timePassed) {
  return timeLeft = timeLimit - timePassed;
}

function displayIcon(onTimesUpChecks) {
  if (onTimesUpChecks === 1) {
    check1.style.display = "inline-flex";
  }
  else if (onTimesUpChecks === 2) {
    check2.style.display = "inline-flex";
  }
  else if (onTimesUpChecks === 3) {
     check3.style.display = "inline-flex";
  }
  else if (onTimesUpChecks === 4) {
    check4.style.display = "inline-flex";
  }
  else {
    check1.style.display = "none";
    check2.style.display = "none";
    check3.style.display = "none";
    check4.style.display = "none";
  }
}

function startTimer() {
  FocusTime = document.getElementById("focusTime").value*60;
  RestTime = document.getElementById("restTime").value*60;
  timeLimit = FocusTime;
  startBtn.disabled = true;
  timerInterval = setInterval(() => {

    timeLeft = calculateTimeLeft(timeLimit, timePassed)
    printTimer(timeLeft, timeLimit);
    timePassed = timePassed += 1;

    stopBtn.addEventListener("click", function (event) {
      timePassed = 0;
      FocusTime = document.getElementById("focusTime").value*60;
      RestTime = document.getElementById("restTime").value*60;
      timeLimit = FocusTime;
      timeLeft = calculateTimeLeft(timeLimit, timePassed);
      printTimer(timeLeft, timeLimit);
      pauseTimer();
      onTimesUpFlag = 0;
      onTimesUpChecks = 0;
      displayIcon(onTimesUpChecks);
      startBtn.disabled = false;
    });
    
    pauseBtn.addEventListener("click", function (event) {
      pauseTimer();
      startBtn.disabled = false;
    });
    
    if (timeLeft === 0) {
      timePassed = 0;
      onTimesUpAudio();
      if (onTimesUpFlag === 1) {
        timeLimit = FocusTime;
        onTimesUpFlag = 0;
        if (onTimesUpChecks === 4) {
          onTimesUpChecks = 0;
        }
      } else {
        onTimesUpFlag = 1;
        onTimesUpChecks += 1;
        if (onTimesUpChecks === 4) {
          timeLimit = RestTime*5;
        } else {
          timeLimit = RestTime;
        }
      }
      displayIcon(onTimesUpChecks);
    }

  }, 1000);
}

startBtn.addEventListener("click", function (event) {
  startTimer();
});
