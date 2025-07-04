const map = document.getElementById("map");
const clear = document.getElementById("clear");
const toggleTheme = document.getElementById("toggleTheme");

const dots = [];

map.addEventListener("click", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    let dotNext = dots.find(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.sqrt(dx * dx + dy * dy) < 30;
    });
if (dotNext) {
    dotNext.intensity++;
    const newSize = 20 + dotNext.intensity * 5;
    dotNext.el.style.width = `${newSize}px`;
    dotNext.el.style.height = `${newSize}px`;
    dotNext.el.style.left = `${dotNext.x - newSize / 2}px`;
    dotNext.el.style.top = `${dotNext.y - newSize / 2}px`;
    dotNext.el.style.background = `rgba(255, 0, 0, ${Math.min(0.4 + dotNext.intensity * 0.1, 1)})`;
} else {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.style.left = `${x - 10}px`;
    dot.style.top = `${y - 10}px`;
    map.appendChild(dot);
    dots.push({ x, y, el: dot, intensity: 1 });
}
});

clear.addEventListener("click", () => {
    map.innerHTML = "";
    dots.length = 0;
});

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleTheme.textContent = document.body.classList.contains("dark") ? "Light" : "Dark";
});