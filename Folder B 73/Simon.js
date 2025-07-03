const colors = ['green', 'red', 'yellow', 'blue'];
let sequence = [];
let player = [];
let level = 0;
let blocked = false;

const status = document.getElementById('status');
const levelEl = document.getElementById('level');

function startGame() {
    sequence = [];
    level = 0;
    player = [];
    nextRound();
}
function nextRound() {
    player = [];
    blocked = true;
    level++;
    levelEl.textContent = 'Level: ' + level;
    status.textContent = 'Wait...';

    const newColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(newColor);

    playSequence(sequence);
}
function playSequence(seq) {
    let i = 0;
    const interval = setInterval(() => {
        lightUp(seq[i]);
        i++;
        if (i >= seq.length) {
            clearInterval(interval);
            blocked = false;
            status.textContent = 'Your Turn';
        }
    }, 800);
}

function lightUp(color) {
    const el = document.getElementById(color);
    el.classList.add('active');
    setTimeout(() => el.classList.remove('active'), 400);
}
function click(color) {
    if (blocked) return;

    player.push(color);
    lightUp(color);
    const i = player.length - 1;
    if (player[i] !== sequence[i]) {
        status.textContent = 'Incorrect. Click at "Start" to try again';
        blocked = true;
        return;
    }
    if (player.length === sequence.length) {
        status.textContent = 'Correct';
        blocked = true;
        setTimeout(() => nextRound(), 1000);
    }
}

colors.forEach(color => {
    document.getElementById(color).addEventListener('click', () => click(color));
});