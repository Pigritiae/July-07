const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
const btn = document.getElementById("spin");
const prizes = [
    "1300 Lunacy",
    "10 PE-Boxes",
    "200 Nominable Crates",
    "1 ID Take-off Module",
    "100 EXP-V Training Tickets",
    "500 Thread"
];
let spinning = false;

btn.addEventListener("click", () => {
    if (spinning) return;
    spinning = true;
    result.textContent = "";
    const numPrizes = prizes.length;
    const sorted = Math.floor(Math.random() * numPrizes);
    const degreesBySection = 360 / numPrizes;
    const finalAngle = 360* 5 + (360 - sorted * degreesBySection - degreesBySection / 2);
    wheel.style.transform = `rotate(${finalAngle}deg)`;
    setTimeout(() => {
        result.textContent = `You Won: ${prizes[sorted]}!`;
    }, 4000);
});