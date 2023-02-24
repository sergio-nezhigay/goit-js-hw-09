import Notiflix from 'notiflix';

document.querySelector('.form').addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const { amount, delay, step } = e.currentTarget.elements;
  createPromises(+amount.value, +delay.value, +step.value);
}

function createPromises(amount, delay, step) {
  for (
    let currentPosition = 0, currentDelay = delay;
    currentPosition < amount;
    currentPosition++, currentDelay += step
  ) {
    createPromise(currentPosition, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay,
        });
      } else {
        reject({
          position,
          delay,
        });
      }
    }, delay);
  });
}
