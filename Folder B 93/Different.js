const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
let score = 0;
let size = 2;

function generateBaseColor() {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return {r,g,b};
}
function colorForCSS({ r, g, b}) {
    return `rgb(${r}, ${g}, ${b})`;
}
function playRound() {
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.maxWidth = `${size * 75}px`;

    const baseColor = generateBaseColor();
    const baseCSSColor = colorForCSS(baseColor);
    const difference = Math.max(5, 60 - score);

    const differentColor = {
        r: Math.min(baseColor.r + difference, 255),
        g: Math.min(baseColor.g + difference, 255),
        b: Math.min(baseColor.b + difference, 255),
    };
    const differentCSSColor = colorForCSS(differentColor);

    const total = size * size;
    const rightIndex = Math.floor(Math.random() * total);

    for (let i = 0; i < total; i++) {
        const square = document.createElement("div");
        square.className = "square";
        square.style.backgroundColor = i === rightIndex ? differentCSSColor : baseCSSColor;

        square.addEventListener("click", () => {
            if (i === rightIndex) {
                score ++;
                if (score % 3 === 0) size++;
            } else {
                score = 0;
                size = 2;
            }
            scoreDisplay.textContent = score;
            playRound();
        });
        grid.appendChild(square);
    }
}

playRound();

