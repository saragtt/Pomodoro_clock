const breakDecrement = document.getElementById("break-decrement");
const breakIncrement = document.getElementById("break-increment");
const breakLength = document.getElementById("break-length");

const sessionDecrement = document.getElementById("session-decrement");
const sessionIncrement = document.getElementById("session-increment");
const sessionLength = document.getElementById("session-length");

const timeLeft = document.getElementById("time-left");
const timerLabel = document.getElementById("timer-label");
const startButton = document.getElementById("start_stop");
const resetButton = document.getElementById("reset");
const mainTitle = document.getElementById("main-title");
const alarm = document.getElementById("alarm");

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteButton = document.getElementById("new-quote");

let currentTime = Number(sessionLength.textContent) * 60;
let timer = null;
let isSession = true;
let isRunning = false;

breakDecrement.addEventListener("click", function () {
  changeLength(breakLength, -1);
});

breakIncrement.addEventListener("click", function () {
  changeLength(breakLength, 1);
});

sessionDecrement.addEventListener("click", function () {
  changeLength(sessionLength, -1);
  updateSessionTime();
});

sessionIncrement.addEventListener("click", function () {
  changeLength(sessionLength, 1);
  updateSessionTime();
});

startButton.addEventListener("click", function () {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetButton.addEventListener("click", resetTimer);
newQuoteButton.addEventListener("click", getFocusQuote);

function changeLength(element, amount) {
  if (isRunning) {
    return;
  }

  let currentValue = Number(element.textContent);
  let newValue = currentValue + amount;

  if (newValue < 1) {
    newValue = 1;
  }

  if (newValue > 60) {
    newValue = 60;
  }

  element.textContent = newValue;
}

function updateSessionTime() {
  if (!isRunning && isSession) {
    currentTime = Number(sessionLength.textContent) * 60;
    displayTime();
  }
}

function startTimer() {
  isRunning = true;
  startButton.textContent = "Pause";
  getFocusQuote();

  timer = setInterval(function () {
    currentTime--;
    displayTime();

    if (currentTime <= 0) {
      changeMode();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  startButton.textContent = "Start";
  clearInterval(timer);
}

function resetTimer() {
  pauseTimer();
  isSession = true;
  currentTime = Number(sessionLength.textContent) * 60;
  timerLabel.textContent = "Session";
  mainTitle.textContent = "Ready to focus?";
  displayTime();
}

function changeMode() {
  alarm.play();
  isSession = !isSession;

  if (isSession) {
    currentTime = Number(sessionLength.textContent) * 60;
    timerLabel.textContent = "Session";
    mainTitle.textContent = "Ready for the next focus session?";
  } else {
    currentTime = Number(breakLength.textContent) * 60;
    timerLabel.textContent = "Break";
    mainTitle.textContent = "Time to take a break!";
  }

  displayTime();
}

function displayTime() {
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  timeLeft.textContent = minutes + ":" + seconds;
}

function getFocusQuote() {
  quoteText.textContent = "Loading quote...";
  quoteAuthor.textContent = "";

  fetch("https://dummyjson.com/quotes/random")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      quoteText.textContent = '"' + data.quote + '"';
      quoteAuthor.textContent = "- " + data.author;
    })
    .catch(function () {
      quoteText.textContent =
        '"Focus on being productive instead of busy."';
      quoteAuthor.textContent = "- Tim Ferriss";
    });
}

displayTime();
