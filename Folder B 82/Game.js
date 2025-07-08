const game = document.getElementById("game");
const message = document.getElementById("message");
const levelEl = document.getElementById("level");
let current = 1;
let sequence = [];
let level = 1;
const maxNumbers = 20;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
function startGame() {
    const totalNumbers = Math.min(level + 3, maxNumbers);
    sequence = shuffle([...Array(totalNumbers).keys()].map(n => n + 1));
    current = 1;
    message.textContent = "";
    levelEl.textContent = `Level: ${level}`;
    game.innerHTML = "";

    sequence.forEach(num => {
        const btn = document.createElement("button");
        btn.textContent = num;
        btn.className = "number";
        btn.addEventListener("click", () => verifyClick(btn, num));
        game.appendChild(btn);
    });
}
function verifyClick(button, number) {
    if (number === current) {
        button.disabled = true;
        button.style.backgroundColor = "#28a745";
        current++;
        if (current > sequence.length) {
            message.textContent = "Congratulations! Next Level...";
            setTimeout(() => {
                level++;
                startGame();
            }, 1000);
        }
    } else {
        message.textContent = "Wrong! Restarting Level...";
        setTimeout(startGame, 1000);
    }
}
startGame();