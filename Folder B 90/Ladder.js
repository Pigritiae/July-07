const btn = document.getElementById("addStep");
const stair = document.getElementById("stair");

let steps = 0;
const colors = [
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#92c27b0",
    "#f44336",
    "#3f51b5",
    "#00bcd4",
    "#e91e63"
];

btn.addEventListener("click", () => {
    const step = document.createElement("div");
    step.classList.add("step");

    const translateX = steps * 20;
    const translateY = -steps * 20;
    step.style.transform = `translate(${translateX}px, ${translateY}px)`;
    const color = colors[steps % colors.length];
    step.style.backgroundColor = color;

    stair.appendChild(step);
    steps++;
});