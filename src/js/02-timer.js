// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const scoreboardEl = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const startButtonEl = document.querySelector('[data-start]');
startButtonEl.disabled = true;
let intervalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];
    console.log(chosenDate);
    if (chosenDate < options.defaultDate)
      alert('Please choose a date in the future');
    else {
      startButtonEl.disabled = false;
      startButtonEl.addEventListener('click', () => onStartButton(chosenDate), {
        once: true,
      });
    }
  },
};

flatpickr('input#datetime-picker', options);

function onStartButton(chosenDate) {
  intervalID = setInterval(() => showRemainingTime(chosenDate), 1000);
}

function showRemainingTime(date) {
  let delta = date - new Date();
  if (delta < 0) {
    clearInterval(intervalID);
    delta = 0;
  }
  const out = convertMs(delta);
  castToScreen(out);
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

function addLeadingZero(number) {
  return number.toString().padStart(2, '0');
}

function castToScreen(data) {
  scoreboardEl.days.textContent = data.days;
  scoreboardEl.hours.textContent = data.hours;
  scoreboardEl.minutes.textContent = data.minutes;
  scoreboardEl.seconds.textContent = data.seconds;
}
