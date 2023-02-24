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
    const chosenDate = selectedDates[0];
    if (chosenDate < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButtonEl.disabled = false;
      startButtonEl.addEventListener('click', () => onStartButton(chosenDate), {
        once: true,
      });
    }
  },
};

flatpickr('input#datetime-picker', options);

function onStartButton(chosenDate) {
  startButtonEl.disabled = true;
  const intervalID = setInterval(() => {
    intervalFunc(chosenDate, intervalID);
  }, 1000);
}

// Function for calculating and refreshing remaining time

function intervalFunc(chosenDate, intervalID) {
  let delta = chosenDate - new Date();
  if (delta < 0) {
    clearInterval(intervalID);
    delta = 0;
    startButtonEl.disabled = false;
  }
  castToScreen(convertMs(delta));
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

// Add leading zeros to digits for time

function addLeadingZero(number) {
  return number.toString().padStart(2, '0');
}

// Show remaining time on screen

function castToScreen(data) {
  scoreboardEl.days.textContent = data.days;
  scoreboardEl.hours.textContent = data.hours;
  scoreboardEl.minutes.textContent = data.minutes;
  scoreboardEl.seconds.textContent = data.seconds;
}
