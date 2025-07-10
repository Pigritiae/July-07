const dimmer = document.getElementById("dimmer");
const screen = document.getElementById("screen");

dimmer.addEventListener("input", () =>{
    const value = dimmer.value;
    const opacity = 1 - value / 100;
    screen.style.opacity = opacity;
});