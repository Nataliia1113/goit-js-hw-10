
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

// import cross from '../img/bi_x-octagon.svg';

let userSelectedDate;

const inputEl = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('[data-start]') 

startBtn.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d h:m',
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
        iziToast.error({
        title: '',
        message: 'Please choose a date in the future',
        class: 'popup-message',
        theme: 'dark',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        iconUrl: cross,
        position: 'topRight',
        pauseOnHover: true,
        timeout: 3000,
      });   
    } else {
      userSelectedDate = selectedDates[0]
      startBtn.disabled = false
    }
  },
};

flatpickr(inputEl, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return updateTimer(days, hours, minutes, seconds);
}

function updateTimer(days, hours, minutes, seconds) {
  const daysEl = document.querySelector('[data-days]')
  const hoursEl = document.querySelector('[data-hours]')
  const minutesEl = document.querySelector('[data-minutes]')
  const secondsEl = document.querySelector('[data-seconds]')
  
  daysEl.textContent = String(days).padStart(2, '0')
  hoursEl.textContent = String(hours).padStart(2, '0')
  minutesEl.textContent = String(minutes).padStart(2, '0')
  secondsEl.textContent = String(seconds).padStart(2, '0')
}


startBtn.addEventListener('click', () => {
    startBtn.disabled = true
    inputEl.disabled = true
    
    const interval = setInterval(() => {
      const currentTime = Date.now()
      const diff = userSelectedDate - currentTime
      convertMs(diff)
      if (diff < 1000) {
        inputEl.disabled = false
        clearInterval(interval)
      }      
     }, 1000)
})