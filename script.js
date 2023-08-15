const valueSlider = document.querySelector(".value-slider");
const numberOfBoxes = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
const gapBetweenBoxes = [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5];
const borderRadius = [0, 40, 35, 30, 25, 20, 20, 15, 15, 15, 10];
valueSlider.addEventListener('input', function (e) {
    console.log();
    createBoxes(e.target.value);
});

function createBoxes(numberOfBoxesInRow) {
    const totalBoxes = numberOfBoxes[numberOfBoxesInRow];
    const gapInBetween = gapBetweenBoxes[numberOfBoxesInRow];
    const borderRadiusOfBox = borderRadius[numberOfBoxesInRow];
    const mainContainerDiv = document.querySelector(".container");

    mainContainerDiv.innerHTML = "";
    mainContainerDiv.style.gap = `${gapInBetween}px`;

    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement("div");
        const wrapper = document.createElement("div");
        const overlay = document.createElement("div");

        wrapper.classList.add("wrapper");
        overlay.classList.add("overlay");
        box.classList.add("box");

        wrapper.style.width = `calc(100%/${numberOfBoxesInRow} - ${gapInBetween * (numberOfBoxesInRow - 1) / numberOfBoxesInRow}px)`;
        wrapper.style.borderRadius = `${borderRadiusOfBox}px`;
        overlay.style.opacity = 0;

        box.addEventListener("mouseover", changeColorOfBox);

        wrapper.appendChild(overlay);
        wrapper.appendChild(box);
        mainContainerDiv.appendChild(wrapper);
    }
}

function changeColorOfBox(e) {
    const redValue = Math.floor(Math.random() * 256);
    const greenValue = Math.floor(Math.random() * 256);
    const blueValue = Math.floor(Math.random() * 256);

    e.target.previousElementSibling.style.opacity = parseFloat(e.target.previousElementSibling.style.opacity) + 0.1;

    e.target.style.backgroundColor = `rgb(${redValue},${greenValue},${blueValue})`;
}

createBoxes(1);