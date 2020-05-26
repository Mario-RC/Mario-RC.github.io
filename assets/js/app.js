
// MOBILE MENU //
function mostrarMenuMobile(mobile) {
	mobile.preventDefault();
	mobileMenu.classList.toggle('is-visible');
}

var mobileMenu = document.querySelector('.mobile-menu');
var triggerMenu = document.querySelectorAll('.trigger-menu');

for(var trigger of triggerMenu) {
	trigger.addEventListener('click', mostrarMenuMobile);
}


// DARK MODE //
function toggleDark() {
	var element = document.body;
	element.classList.toggle("dark-mode");
}

function toggleIcon(icon) {
	icon.classList.toggle("fa-sun");
}


// DROPDOWN LANGUAGE MENU //
var dropdown = document.getElementsByClassName("btn-language");
for(var tab = 0; tab < dropdown.length; tab++) {
  dropdown[tab].addEventListener("click", function() {
    var dropdownContent = this.nextElementSibling;
    if(dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}


// TIMER //
let InitialFocusTime = document.getElementById("focusTime").value*60;
let InitialRestTime = document.getElementById("restTime").value*60;
let InitialTechnique = document.getElementById("technique").value;
let FocusTime = document.getElementById("focusTime").value*60;
let RestTime = document.getElementById("restTime").value*60;
let Technique = document.getElementById("technique").value;
let timeLimit = FocusTime;
let timeLeft = timeLimit;
let timePassed = 0;
let timerInterval = null;
let onTimesUpChecks = 0;
let updateInitialTimerValueFlag = 0;
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
check1.className;
check2.className;
check3.className;
check4.className;
check1.style.display = 'inline-flex';
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

function displayIcon(Tecnique, timeLeft, timeLimit, onTimesUpFlag, onTimesUpChecks) {
  // onTimesUpFlag=1:focus, onTimesUpFlag=1:rest
  halfTimeLimit = Math.round(timeLimit/2);
  endTimeLimit = Math.round(timeLimit/8);
  // Checkmarks State Machine
  // Check 1 states
  if (onTimesUpChecks === 1) {
    if(onTimesUpFlag === 0) {
      if(timeLeft === timeLimit) {
        check1.className = "fas fa-hourglass-start";
        check1.style.display = "inline-flex";
      }
      else if(timeLeft === halfTimeLimit) {
        check1.className = "fas fa-hourglass-half";
      }
      else if(timeLeft === endTimeLimit) {
        check1.className = "fas fa-hourglass-end";
      }
    } else {
      check1.className = "far fa-check-circle";
    }
  }
  // Check 2 states
  else if (onTimesUpChecks === 2) {
    if(onTimesUpFlag === 0) {
      if(timeLeft === timeLimit) {
        check2.className = "fas fa-hourglass-start";
        check2.style.display = "inline-flex";
      }
      else if(timeLeft === halfTimeLimit) {
        check2.className = "fas fa-hourglass-half";
      }
      else if(timeLeft === endTimeLimit) {
        check2.className = "fas fa-hourglass-end";
      }
    } else {
      check2.className = "far fa-check-circle";
    }
  }
  // Check 3 states
  else if (onTimesUpChecks === 3) {
    if(onTimesUpFlag === 0) {
      if(timeLeft === timeLimit) {
        check3.className = "fas fa-hourglass-start";
        check3.style.display = "inline-flex";
      }
      else if(timeLeft === halfTimeLimit) {
        check3.className = "fas fa-hourglass-half";
      }
      else if(timeLeft === endTimeLimit) {
        check3.className = "fas fa-hourglass-end";
      }
    } else {
      check3.className = "far fa-check-circle";
    }
  }
  // Check 4 states
  else if (onTimesUpChecks === 4) {
    if(onTimesUpFlag === 0) {
      if(timeLeft === timeLimit) {
        check4.className = "fas fa-hourglass-start";
        check4.style.display = "inline-flex";
      }
      if(timeLeft === halfTimeLimit) {
        check4.className = "fas fa-hourglass-half";
      }
      else if(timeLeft === endTimeLimit) { 
        check4.className = "fas fa-hourglass-end";
      }
    } else {
      check4.className = "far fa-check-circle";
    }
  }
  else {
    // Restart checkmarks states
    if (Tecnique === "pomodoro") {
      check1.style.display = "inline-flex";
      check2.style.display = "none";
      check3.style.display = "none";
      check4.style.display = "none";
    } else { // No display checkmarks
      check1.style.display = "none";
      check2.style.display = "none";
      check3.style.display = "none";
      check4.style.display = "none";
    }
  }
}

function getTechniqueTimes() {
  Tecnique = document.getElementById("technique").value;
  FocusTime = document.getElementById("focusTime").value*60;
  RestTime = document.getElementById("restTime").value*60;
  return Tecnique, FocusTime, RestTime;
}

function startTimer() {
  if (updateInitialTimerValueFlag === 0) {
    updateInitialTimerValueFlag = 1;
    Tecnique = document.getElementById("technique").value;
    FocusTime = document.getElementById("focusTime").value*60;
    RestTime = document.getElementById("restTime").value*60;
    timeLimit = FocusTime; // Set initial timer time
    if (Tecnique === "pomodoro") {
      onTimesUpChecks = 1;
    }
  }
  startBtn.disabled = true;

  timerInterval = setInterval(() => {

    // Calculate time and print on timer
    timeLeft = calculateTimeLeft(timeLimit, timePassed)
    printTimer(timeLeft, timeLimit);
    timePassed = timePassed += 1;

    // Stop button
    stopBtn.addEventListener("click", function (event) {
      timePassed = 0;
      Tecnique, FocusTime, RestTime = getTechniqueTimes();
      timeLimit = FocusTime;
      timeLeft = calculateTimeLeft(timeLimit, timePassed);
      printTimer(timeLeft, timeLimit);
      onTimesUpFlag = 0;
      onTimesUpChecks = 0;
      displayIcon(Tecnique, timeLeft, timeLimit, onTimesUpFlag, onTimesUpChecks)
      startBtn.disabled = false;
      updateInitialTimerValueFlag = 0;
      pauseTimer();
    });
    
    // Pause button
    pauseBtn.addEventListener("click", function (event) {
      startBtn.disabled = false;
      pauseTimer();
    });
    
    // Timer state machine
    // End Timer
    if (timeLeft === 0) {
      // Restart timer count and play times up audio
      timePassed = 0;
      onTimesUpAudio();
      // Set focus time limit
      if (onTimesUpFlag === 1) {
        // Switch to rest time limit
        onTimesUpFlag = 0;
        // If 4 checkmarks, restart checkmarks count
        if (onTimesUpChecks === 4) {
          onTimesUpChecks = 0;
          displayIcon(Tecnique, timeLeft, timeLimit, onTimesUpFlag, onTimesUpChecks);
        }
        // Increase number of checkmarks
        onTimesUpChecks += 1;
        // Set focus time
        timeLimit = FocusTime;
      // Set rest time limit
      } else {
        // Switch to focus time limit
        onTimesUpFlag = 1;
        // If 4 checkmarks, set long rest time
        if (onTimesUpChecks === 4) {
          timeLimit = RestTime*5;
        // Set short rest time
        } else {
          timeLimit = RestTime;
        }
      }
    }
    displayIcon(Tecnique, timeLeft, timeLimit, onTimesUpFlag, onTimesUpChecks);

  }, 1000);
}

// Start Button
startBtn.addEventListener("click", function (event) {
  startTimer();
});

function displayTimerTimes() {
  InitialTecnique = document.getElementById("technique").value;
  InitialFocusTime = document.getElementById("focusTime");
  InitialRestTime = document.getElementById("restTime");
  if(InitialTecnique === "pomodoro") {
    InitialFocusTime.value = 25;
    InitialRestTime.value = 5;
  }
  else if(InitialTecnique === "rule 52/17") {
    InitialFocusTime.value = 52;
    InitialRestTime.value = 17;
  }
  else if(InitialTecnique === "ultradian") {
    InitialFocusTime.value = 90;
    InitialRestTime.value = 20;
  }
  // Display Updated Timer
  if(updateInitialTimerValueFlag === 0) {
    timeLimit = InitialFocusTime.value*60;
    timeLeft = timeLimit;
    printTimer(timeLeft, timeLimit);
    onTimesUpChecks = 0;
    displayIcon(InitialTecnique, timeLeft, timeLimit, onTimesUpFlag, onTimesUpChecks);
  }
}

function displayTechnique() {
  InitialFocusTime = document.getElementById("focusTime").value;
  InitialRestTime = document.getElementById("restTime").value;
  InitialTecnique = document.getElementById("technique");
  if(InitialFocusTime === "25" && InitialRestTime === "5") {
    InitialTecnique.value = "pomodoro";
  }
  else if(InitialFocusTime === "52" && InitialRestTime === "17") {
    InitialTecnique.value = "rule 52/17";
  }
  else if(InitialFocusTime === "90" && InitialRestTime === "20") {
    InitialTecnique.value = "ultradian";
  }
  else {
    InitialTecnique.value = "customize";
  }
  // Display Updated Timer
  if(updateInitialTimerValueFlag === 0) {
    timeLimit = InitialFocusTime*60;
    timeLeft = timeLimit;
    printTimer(timeLeft, timeLimit);
    onTimesUpChecks = 0;
    displayIcon(InitialTecnique.value, timeLeft, timeLimit, onTimesUpFlag, onTimesUpChecks);
  }
}
