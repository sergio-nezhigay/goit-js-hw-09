// Описаний в документації
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Get DOM elements

const scoreboardEl = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const startButtonEl = document.querySelector('[data-start]');

startButtonEl.addEventListener('click', onStartButtonClick);

let chosenDate = null;
let intervalID = null;

startButtonEl.disabled = true;
Notiflix.Notify.init({
  clickToClose: true,
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    [chosenDate] = selectedDates;
    if (chosenDate < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      fullCounterReset();
    } else {
      startButtonEl.disabled = false;
    }
  },
};

flatpickr('input#datetime-picker', options);

function onStartButtonClick() {
  startButtonEl.disabled = true;
  intervalID = setInterval(() => {
    intervalFunc();
  }, 1000);
}

// Function for calculating and refreshing remaining time

function fullCounterReset() {
  if (intervalID) {
    clearInterval(intervalID);
    intervalID = null;
  }
  startButtonEl.disabled = true;
  castToScreen(convertMs(0));
}

function intervalFunc() {
  let delta = chosenDate - new Date();
  if (delta < 0) {
    fullCounterReset();
  } else castToScreen(convertMs(delta));
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

// Add leading zeros to digits for time

function addLeadingZero(number) {
  return number.toString().padStart(2, '0');
}

// Show remaining time on screen

function castToScreen(data) {
  scoreboardEl.days.textContent = addLeadingZero(data.days);
  scoreboardEl.hours.textContent = addLeadingZero(data.hours);
  scoreboardEl.minutes.textContent = addLeadingZero(data.minutes);
  scoreboardEl.seconds.textContent = addLeadingZero(data.seconds);
}
