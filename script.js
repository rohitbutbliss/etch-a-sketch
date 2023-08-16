const valueSlider = document.querySelector(".value-slider");
const colorSwitch = document.querySelector(".color-switch");
const rainbowModeSwitch = document.querySelector(".rainbow-mode-switch");
const darkenModeSwitch = document.querySelector(".darken-mode-switch");

let defaultColor = "#2b9348";
let rainbowModeSwitchValue = false;
let darkenModeSwitchValue = false;

valueSlider.addEventListener('input', function (e) {
    changeControlData('slider', e.target);
    createBoxes(e.target.value);
});

colorSwitch.addEventListener('input', function (e) {
    defaultColor = e.target.value;
});

rainbowModeSwitch.addEventListener('click', function (e) {
    turnTheSwitch('rainbow');
});

darkenModeSwitch.addEventListener('click', function () {
    turnTheSwitch('darken');
});

function turnTheSwitch(switchName) {
    if (switchName === 'rainbow') {
        if (!rainbowModeSwitchValue) {
            rainbowModeSwitch.innerText = 'On';
        }
        else {
            rainbowModeSwitch.innerText = 'Off';
        }
        rainbowModeSwitchValue = !rainbowModeSwitchValue;
    }
    else if (switchName === 'darken') {
        if (!darkenModeSwitchValue) {
            darkenModeSwitch.innerText = 'On';
        }
        else {
            darkenModeSwitch.innerText = 'Off';
        }
        darkenModeSwitchValue = !darkenModeSwitchValue;
    }
}


function changeControlData(controlName, eventTarget) {
    if (controlName === 'slider') {
        eventTarget.previousElementSibling.innerText = `${eventTarget.value}x${eventTarget.value}`;
    }
}

function createBoxes(numberOfBoxesInRow) {
    const totalBoxes = numberOfBoxesInRow ** 2;

    const mainContainerDiv = document.querySelector(".container");

    mainContainerDiv.innerHTML = "";

    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement("div");
        const wrapper = document.createElement("div");
        const overlay = document.createElement("div");

        wrapper.classList.add("wrapper");
        overlay.classList.add("overlay");
        box.classList.add("box");

        wrapper.style.width = `calc(100%/${numberOfBoxesInRow} - ${1 * (numberOfBoxesInRow - 1) / numberOfBoxesInRow}px`;
        overlay.style.opacity = 0;

        box.addEventListener("mouseover", changeColorOfBox);

        wrapper.appendChild(overlay);
        wrapper.appendChild(box);
        mainContainerDiv.appendChild(wrapper);
    }
}

function changeColorOfBox(e) {
    if (darkenModeSwitchValue)
        e.target.previousElementSibling.style.opacity = parseFloat(e.target.previousElementSibling.style.opacity) + 0.1;

    if (!rainbowModeSwitchValue) {
        e.target.style.backgroundColor = `${defaultColor}`;
        return;
    }
    const redValue = Math.floor(Math.random() * 256);
    const greenValue = Math.floor(Math.random() * 256);
    const blueValue = Math.floor(Math.random() * 256);



    e.target.style.backgroundColor = `rgb(${redValue},${greenValue},${blueValue})`;
}

createBoxes(1);