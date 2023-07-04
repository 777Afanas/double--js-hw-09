

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
} 
let timerId = null;

const startClick = () => {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);     
    // refs.startBtn.setAttribute("disabled", "disabled");
    refs.startBtn.disabled = true;
}

refs.startBtn.addEventListener("click", startClick);

const stopClick = () => {
    clearInterval(timerId);
    // refs.startBtn.removeAttribute("disabled");
    refs.startBtn.disabled = false;
}

refs.stopBtn.addEventListener("click", stopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
