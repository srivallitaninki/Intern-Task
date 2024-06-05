// script.js

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 100);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 100);
        startStopBtn.textContent = 'Stop';
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    startTime = null;
    elapsedTime = 0;
    display.textContent = '00:00:00.0';
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const li = document.createElement('li');
    li.textContent = lapTime;
    lapsList.appendChild(li);
});
