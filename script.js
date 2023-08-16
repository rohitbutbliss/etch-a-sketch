const valueSlider = document.querySelector(".value-slider");
const colorSwitch = document.querySelector(".color-switch");
const rainbowModeSwitch = document.querySelector(".rainbow-mode-switch");
const darkenModeSwitch = document.querySelector(".darken-mode-switch");
const fillModeSwitch = document.querySelector(".fill-mode-switch");
const eraseModeSwitch = document.querySelector(".erase-mode-switch");

let defaultColor = "#2b9348";
let rainbowModeSwitchValue = false;
let darkenModeSwitchValue = false;
let fillModeSwitchValue = true;
let eraseModeSwitchValue = false;

valueSlider.addEventListener('input', function (e) {
    changeControlData('slider', e.target);
    createBoxes(e.target.value);
});

document.addEventListener('keypress', function (e) {
    if (e.key === 'f') {
        turnTheSwitch('fill');
        if (fillModeSwitchValue && eraseModeSwitchValue) turnTheSwitch('erase');
    }
    else if (e.key === 'd') turnTheSwitch('darken');
    else if (e.key === 'r') turnTheSwitch('rainbow');
    else if (e.key === 'e') {
        turnTheSwitch('erase');
        if (eraseModeSwitchValue && fillModeSwitchValue) turnTheSwitch('fill');
    }
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

fillModeSwitch.addEventListener('click', function (e) {
    turnTheSwitch('fill');
    if (fillModeSwitchValue && eraseModeSwitchValue) turnTheSwitch('erase');
});

eraseModeSwitch.addEventListener('click', function (e) {
    turnTheSwitch('erase');
    if (eraseModeSwitchValue && fillModeSwitchValue) turnTheSwitch('fill');
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
    else if (switchName === 'fill') {
        if (!fillModeSwitchValue) {
            fillModeSwitch.innerText = 'On';
        }
        else {
            fillModeSwitch.innerText = 'Off';
        }

        fillModeSwitchValue = !fillModeSwitchValue;
    }
    else if (switchName === 'erase') {
        if (!eraseModeSwitchValue) {
            eraseModeSwitch.innerText = 'On';
        }
        else {
            eraseModeSwitch.innerText = 'Off';
        }

        eraseModeSwitchValue = !eraseModeSwitchValue;
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
    if (eraseModeSwitchValue) {
        e.target.style.backgroundColor = "white";
        return;
    }
    if (!fillModeSwitchValue) return;

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