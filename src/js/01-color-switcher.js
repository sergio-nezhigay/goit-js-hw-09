const startButtonEl = document.querySelector('[data-start]');
const stopButtonEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

startButtonEl.addEventListener('click', onStartClick);
styleButtonsAsRunning(false);

function onStartClick() {
  const intervalID = setInterval(() => {
    changeBodyBgcolor(getRandomHexColor());
  }, 1000);
  stopButtonEl.addEventListener(
    'click',
    () => {
      clearInterval(intervalID);
      styleButtonsAsRunning(false);
    },
    { once: true }
  );
  styleButtonsAsRunning(true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyBgcolor(color) {
  bodyEl.style.backgroundColor = color;
}

function styleButtonsAsRunning(isRunning) {
  startButtonEl.disabled = isRunning;
  stopButtonEl.disabled = !isRunning;
}
