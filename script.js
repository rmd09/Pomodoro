const button = document.getElementById("main-button");
const mainBlock = document.getElementById("main-block");
const workCheal = document.getElementById("work-cheal");
const time = document.getElementById("time");
const timeShablon = document.getElementById("time-shablon");
const section1 = document.getElementById("section1");

let isTimerSwitchedOn = false;
let timeValue = 1500; //Изначальное значение времени в секундах = 25 мин
let isWork = true; //Состояние таймера (работа/отдых)

button.addEventListener("click", () => {
    if (isTimerSwitchedOn) {
        isTimerSwitchedOn = false;
        SwitchOffTimer();
    }
    else {
        isTimerSwitchedOn = true;
        SwitchOnTimer();
    }
});

//Изменение стиля, таймер включён
function SwitchOnTimer() {
    timeShablon.style.display = "none";
    time.style.display = "block";

    button.disabled = true;
    button.style.border = "1px solid rgba(255, 255, 255, 0.35)";
    button.style.color = "rgba(255, 255, 255, 0.35)";
    button.style.transform = "none";
    setTimeout(() => {
        button.textContent = "Стоп"
        button.disabled = false;
    }, 500);

    mainBlock.style.border = "1px solid #fff";
    section1.style.borderBottom = "1px solid #fff";
    mainBlock.style.transform = "none";
    workCheal.style.color = "#FF4343";

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
    timeValue = 1500;
    isWork = true;
    UpdateTextTime()
    setValue();
}
function HelpMethod() {
    setTimeout(setValue, 985);
}
const setValue = () => {
    if (!isTimerSwitchedOn) return;

    UpdateTextTime()
    timeValue--;
    if (timeValue == -1)
    {
        if (isWork)
        {
            workCheal.style.color = "#43FF56";
            workCheal.textContent = "Отдых"
            timeValue = 300;
            HelpMethod();
        }
        else
        {
            workCheal.style.color = "#FF4343";
            workCheal.textContent = "Работа"
            timeValue = 1500;
            HelpMethod();
        }
        Alarm();
        isWork = !isWork;
        UpdateTextTime()
    }
    else
    {
        HelpMethod();
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
function Alarm() {
    let audio = new Audio("Alarm.mp3");
    if (audio) {
        audio.play();
    }
}