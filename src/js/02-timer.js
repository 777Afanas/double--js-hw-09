import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const clockFace = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]')

startBtn.disabled = true;

// flatpickr(test, options);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0].getTime());
      console.log(options.defaultDate.getTime());

      if (selectedDates[0] < new Date()) {
        alert("Please choose a date in the future");
      }
      startBtn.disabled = false;

    },
};

flatpickr(clockFace, options);

const timer = {
  start() {

    setInterval(() => {

      const deltaTime = options.defaultDate - options.onClose;
      console.log(options.onClose(selectedDates[0]));

      const currentTime = Date.now();
      

      const { days, hours, minutes, seconds } = convertMs(currentTime);

      // console.log(`${days}:${hours}:${minutes}:${seconds}`);

    }, 1000);
  }
}
// timer.start();

startBtn.addEventListener('click', () => {
  timer.start();
})

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
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}