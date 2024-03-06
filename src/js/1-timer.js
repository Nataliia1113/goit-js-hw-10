import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'https://cdn.jsdelivr.net/npm/izitoast@1/+esm';

const input = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const dataStart = document.querySelector('button[data-start]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = Date.now();

    const selectedDate = selectedDates[0];
    const difference = selectedDate - dateNow;

    if (difference < 0 && difference < 0) {
      iziToast.error({
        timeout: 5000,
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future',
      });

      userSelectedDate = 0;
      dataStart.classList.remove('activ');
      dataStart.removeEventListener('click', start);
    } else {
      dataStart.classList.add('activ');
      dataStart.addEventListener('click', start);
      userSelectedDate = difference;
    }
  },
};

flatpickr(input, options);

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

function addLeadingZero(value, callback) {
  const call = callback(value);
  if (userSelectedDate) {
    let days = call.days;
    days = String(days).padStart(2, 0);
    dataDays.textContent = days;

    let hours = call.hours;
    hours = String(hours).padStart(2, 0);
    dataHours.textContent = hours;

    let minutes = call.minutes;
    minutes = String(minutes).padStart(2, 0);
    dataMinutes.textContent = minutes;

    let seconds = call.seconds;
    seconds = String(seconds).padStart(2, 0);
    dataSeconds.textContent = seconds;
  }
}

function start() {
  dataStart.disabled = true;
  input.disabled = true;

  dataStart.classList.remove('activ');
  input.classList.add('disabled-hover');
  const interval = setInterval(() => {
    if (userSelectedDate < 0) {
      clearInterval(interval);
      input.disabled = false;
      dataStart.disabled = false;
    } else {
      addLeadingZero(userSelectedDate, convertMs);
      userSelectedDate -= 1000;
    }
  }, 1000);
}
