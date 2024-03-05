// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
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
///////////////////// radio style ///////////////////////

const rectFulfilled = document.querySelector('.rect-fulfilled');
const rectRejected = document.querySelector('.rect-rejected');
const rectFull = document.querySelector('.rect-ful');
const rectRej = document.querySelector('.rect-rej');
let checkedRadio = '';

form.addEventListener('click', clickradio);

function clickradio(event) {
  radioChecked.forEach(radio => {
    if (radio.checked) {
      if (radio.value === 'fulfilled') {
        clickFulfilled();
      } else if (radio.value === 'rejected') {
        clickFulRejected();
      }
    }
  });

  if (event.target.nodeName === 'BUTTON') {
    if (checkedRadio === '') {
      iziToast.warning({
        position: 'bottomLeft',
        message: 'Choose Fulfilled or Rejected',
      });
    }
  }
}

function clickFulfilled() {
  rectFulfilled.classList.replace('rect-non', 'rect-on');
  rectRejected.classList.replace('rect-on', 'rect-non');
  rectFull.classList.replace('rect', 'rect-blue');
  rectRej.classList.replace('rect-blue', 'rect');
  checkedRadio = 'on';
}

function clickFulRejected() {
  rectFulfilled.classList.replace('rect-on', 'rect-non');
  rectRejected.classList.replace('rect-non', 'rect-on');
  rectFull.classList.replace('rect-blue', 'rect');
  rectRej.classList.replace('rect', 'rect-blue');
  checkedRadio = 'on';
}
