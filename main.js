//const millisecondsIn25Minutes = 1500000;
const millisecondsIn25Minutes = 5000;
let timerTime = millisecondsIn25Minutes;

let state = 'ready';
let startButton = document.getElementById("start")
let pauseButton = document.getElementById("pause")
let resetButton = document.getElementById("reset")
let endTime;
let timeRemaining;
let currentTime = 0;
let interval;
let colorInterval;
var audio = new Audio('triangle.mp3');
let clock = document.getElementById('clock-h2');

function updateState(newState) {
    state = newState;
    if (state === "ready") {
        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = true;
        clearInterval(colorInterval);
        clearInterval(interval);
    } else if (state === 'counting') {
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
    } else if (state === 'blinking') {
        startButton.disabled = true;
        pauseButton.disabled = true;
        resetButton.disabled = false;
        let flashPurple = true;
        colorInterval = setInterval(() => {
            document.body.style.backgroundColor = flashPurple ? "purple" : "white";
            flashPurple = !flashPurple;
        }, 200);
        clearInterval(interval);
    } else if (state === 'stopped') {
        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = false;
        clearInterval(interval);
    }
}

function start() {
    updateState('counting');
    let startTime = Date.now();
    endTime = startTime + timerTime;
    tick();
}

function tick() {
    interval = setInterval(calculateTimeRemaining, 100);
}

function calculateTimeRemaining() {
    currentTime = Date.now();
    timeRemaining = endTime - currentTime;
    updateClock(timeRemaining);
}

function updateClock(timeRemaining) {
    if (timeRemaining >= 0) {
        let minutes = timeRemaining / 60000;
        let minutesWithoutSeconds = Math.trunc(minutes);
        let seconds = Math.trunc((minutes - minutesWithoutSeconds) * 60);
        if (seconds<10) {
            clock.textContent = minutesWithoutSeconds + ":0" + seconds;    
        } else {
            clock.textContent = minutesWithoutSeconds + ":" + seconds;
        }   
    }
    if (timeRemaining <= 0) {
        audio.play()
        updateState('blinking');  //toggle background color
    }
}

function pause() {
    updateState('stopped');
    timerTime = timeRemaining;
}

function reset() {  
    updateState('ready');
    timerTime = millisecondsIn25Minutes;
    clock.textContent = "25:00";
}
