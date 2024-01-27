const button = document.getElementById("main-button");
const mainBlock = document.getElementById("main-block");
const workCheal = document.getElementById("work-cheal");
const time = document.getElementById("time");
const section1 = document.getElementById("section1");

button.onclick = () => {
    ToWorkState();
}

function ToWorkState() {
    button.style.border = "1px solid rgba(255, 255, 255, 0.35)";
    button.style.color = "rgba(255, 255, 255, 0.35)";
    button.style.transform = "none";
    setTimeout(() => {button.textContent = "Стоп"}, 1000);

    mainBlock.style.border = "1px solid #fff";
    section1.style.borderBottom = "1px solid #fff";
    mainBlock.style.transform = "none";
    workCheal.style.color = "#FF4343";
}