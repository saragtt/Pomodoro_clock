//- button of length
const breakDecrement = document.getElementById("break-decrement");

const breakLength = document.getElementById("break-length");

breakDecrement.addEventListener("click", function () {
  let currentValue = Number(breakLength.textContent);

  breakLength.textContent = currentValue - 1;
  if (currentValue < 1) {
    breakLength.textContent = currentValue;
  }
});

//+ button of length
const breakIncrement = document.getElementById("break-increment");

breakIncrement.addEventListener("click", function () {
  let currentValue = Number(breakLength.textContent);

  breakLength.textContent = currentValue + 1;
});

// timer connection with the button
const timeLeft = document.getElementById("time-left");

//- button of session
const sessionDecrement = document.getElementById("session-decrement");

const sessionLength = document.getElementById("session-length");

sessionDecrement.addEventListener("click", function () {
  let currentValue = Number(sessionLength.textContent);

  sessionLength.textContent = currentValue - 1;

  if (currentValue < 1) {
    sessionLength.textContent = currentValue;
  }

  timeLeft.textContent = currentValue - 1 + ":00";
});

//+ button of session
const sessionIncrement = document.getElementById("session-increment");

sessionIncrement.addEventListener("click", function () {
  let currentValue = Number(sessionLength.textContent);

  sessionLength.textContent = currentValue + 1;

  timeLeft.textContent = currentValue + 1 + ":00";
});

// start button of timer
const startButton = document.getElementById("start_stop");

let currentTime = 25 * 60;

let timer;

let isSession = true;

const mainTitle = document.getElementById("main-title");

const alarm = document.getElementById("alarm");

startButton.addEventListener("click", function () {
  currentTime = Number(sessionLength.textContent) * 60;

  timer = setInterval(function () {
    currentTime--;

    if (currentTime <= 0) {
      alarm.play();

      if (isSession === true) {
        currentTime = Number(breakLength.textContent) * 60;

        isSession = false;

        mainTitle.textContent = "Time to take a break!";
      } else {
        currentTime = Number(sessionLength.textContent) * 60;

        isSession = true;

        mainTitle.textContent = "Let's start!";
      }
    }

    let minutes = Math.floor(currentTime / 60);

    let seconds = currentTime % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    timeLeft.textContent = minutes + ":" + seconds;
  }, 1000);
});

//reset button
const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", function () {
  clearInterval(timer);

  currentTime = 25 * 60;

  timeLeft.textContent = "25:00";
});
