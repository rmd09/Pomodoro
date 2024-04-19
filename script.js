const button = document.getElementById("main-button");
const mainBlock = document.getElementById("main-block");
const workCheal = document.getElementById("work-cheal");
const time = document.getElementById("time");
const timeShablon = document.getElementById("time-shablon");
const section1 = document.getElementById("section1");

const audio = new Audio("Alarm.mp3");
const ONE_ITERATION = 1000;

let isTimerSwitchedOn = false;
let timeValue = 1500; //Изначальное значение времени в секундах (1500) = 25 мин
let isWork = true; //Состояние таймера (работа/отдых)
let isThisIterationFirst = true; //Флаг первой итерации

button.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;

    if (isTimerSwitchedOn) {
        SwitchOffTimer();
    }
    else {
        SwitchOnTimer();
    }
    isTimerSwitchedOn = !isTimerSwitchedOn;
});

function SwitchOnTimer() {
    //Изменение стиля, таймер включён
    timeShablon.style.display = "none";
    time.style.display = "block";

    button.disabled = true;
    button.style.border = "1px solid rgba(255, 255, 255, 0.35)";
    button.style.color = "rgba(255, 255, 255, 0.35)";
    button.style.transform = "none";
    mainBlock.style.border = "1px solid #fff";
    section1.style.borderBottom = "1px solid #fff";
    mainBlock.style.transform = "none";
    workCheal.style.color = "#FF4343";
    
    setTimeout(() => {      //Кнопка разблокируется только спустя полсекунды
        button.textContent = "Стоп";
        button.disabled = false;
    }, 500);
    ///////////

    Start();
}

//Изменение стиля, таймер выключен
function SwitchOffTimer() {
    timeShablon.style.display = "block";
    time.style.display = "none";

    button.disabled = true;
    workCheal.textContent = "Работа";
    button.style.border = "1px solid #fff";
    button.style.color = "#FFF";
    button.style.transform = "translateY(10px)";
    setTimeout(() => {
        button.textContent = "Старт"
        button.disabled = false;
    }, 500);

    mainBlock.style.border = "1px solid rgba(255, 255, 255, 0.35)";
    section1.style.borderBottom = "1px solid rgba(255, 255, 255, 0.35)";
    mainBlock.style.transform = "translateY(30px)";
    workCheal.style.color = "rgba(199, 205, 255, 0.35)";
}

function Start() {
    isThisIterationFirst = true;
    SwitchToWork();
}
async function SwitchToWork() {
    if (isThisIterationFirst)
        isThisIterationFirst = false;
    else 
        await Alarm();


    WorkStyle();
    timeValue = 1500;
    isWork = true;
    let interval = setInterval(() => {
        if (!isTimerSwitchedOn) {
            SwitchOffTimer();
            clearInterval(interval);
        }
        if (timeValue <= 0) {
            SwitchToRelax();
            clearInterval(interval);
        }
        else {
            timeValue--;
        }
        UpdateTextTime();
    }, ONE_ITERATION);
}
async function SwitchToRelax() {
    await Alarm();

    RelaxStyle();
    timeValue = 300;
    isWork = false;

    let interval = setInterval(() => {
        if (!isTimerSwitchedOn) {
            SwitchOffTimer();
            clearInterval(interval);
        }
        if (timeValue <= 0) {
            SwitchToWork();
            clearInterval(interval);
        }
        else {
            timeValue--;
        }
        UpdateTextTime();
    }, ONE_ITERATION);
}
//Начинается работа (текст становится красным)
function WorkStyle() {
    workCheal.style.color = "#FF4343";
    workCheal.textContent = "Работа";
    timeValue = 1500;
}

//Начинается отдых (текст становится зелёным)
function RelaxStyle() {
    workCheal.style.color = "#43FF56";
    workCheal.textContent = "Отдых";
    timeValue = 300;
}

function Alarm() {
    if (audio) {
        return new Promise((res) => {
            audio.play();
            audio.onended = res;
        })
    }
}
function UpdateTextTime() {
    if (timeValue % 60 < 10) {
        time.textContent = `${Math.floor(timeValue / 60)}:0${timeValue % 60}`;
    }
    else {
        time.textContent = `${Math.floor(timeValue / 60)}:${timeValue % 60}`;
    }
}
