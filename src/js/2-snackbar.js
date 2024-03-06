import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', addSubmit);

const radioChecked = document.querySelectorAll('input[name="state"]');

function addSubmit(event) {
  event.preventDefault();

  const input = document.querySelector('input[type="number"]');

  const delay = input.value;
  let fulfilledChecked;

  radioChecked.forEach(radio => {
    if (radio.checked) {
      fulfilledChecked = radio.value;
    }
  });

  createPromis(delay, fulfilledChecked);
}

function createPromis(delay, fulfilledChecked) {
  const getUserPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilledChecked === 'fulfilled') {
        resolve(delay);
      } else if (fulfilledChecked === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  getUserPromise
    .then(delay => {
      iziToast.success({
        timeout: 5000,
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        timeout: 5000,
        position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}
