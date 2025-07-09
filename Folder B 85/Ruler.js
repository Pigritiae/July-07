const ruler = document.getElementById("ruler");
const marker = document.getElementById("marker");
const info = document.getElementById("info");

for (let i = 0; i <= window.innerWidth; i += 10) {
    const mark = document.createElement("div");
    if (i % 50 === 0) {
        mark.style.height = "40px";
        mark.textContent = i;
    }
    ruler.appendChild(mark);
}
document.addEventListener("mousemove", (e) => {
    marker.style.left = e.clientX + "px";
    info.textContent = `${e.clientX}px`;

    if (e.clientX > window.innerWidth - 60) {
        info.style.left = "-60px";
    } else {
        info.style.left = "5px";
    }
});