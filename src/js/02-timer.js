import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


let selectedDate = null;
let timerId = null;

const refs = {
  clockFace: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
      refs.startBtn.disabled = true;
      return;
    }

    refs.startBtn.disabled = false;
    selectedDate = selectedDates[0];
    return selectedDate;
  },
};

flatpickr(refs.clockFace, options);

const timer = {
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    timerId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = selectedDate - startTime;

      if (deltaTime == '00000000') {
        clearInterval(timerId);
        this.isActive = false;
      }

      const timeParts = convertMs(deltaTime);
      updateClockfase(timeParts);
    }, 1000);
  },

  // stop() {
  //   clearInterval(timerId);
  //   this.isActive = false;
  //   console.log(this.isActive);
  // },
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

function updateClockfase({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = `${days}`;
  refs.hoursField.textContent = `${hours}`;
  refs.minutesField.textContent = `${minutes}`;
  refs.secondsField.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
