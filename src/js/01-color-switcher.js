

const startBtn = document.querySelector('[data-start');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

const startClick = () => {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);     
    startBtn.setAttribute("disabled", "disabled");
}

startBtn.addEventListener("click", startClick);

const stopClick = () => {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled");
}

stopBtn.addEventListener("click", stopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
