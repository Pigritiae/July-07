const colors = [
    {name: 'red', value: 'red'},
    {name: 'blue', value: 'blue'},
    {name: 'green', value: 'green'},
    {name: 'yellow', value: 'yellow'},
    {name: 'purple', value: 'purple'},
    {name: 'orange', value: 'orange'},
    {name: 'pink', value: 'pink'},
    {name: 'brown', value: 'brown'},
    {name: 'grey', value: 'grey'},
    {name: 'black', value: 'black'},
    {name: 'white', value: 'white'},
    {name: 'cyan', value: 'cyan'},
    {name: 'magenta', value: 'magenta'},
    {name: 'gold', value: 'gold'},
    {name: 'silver', value: 'silver'}
];

const targetColor = document.getElementById('target-color');
const balls = document.getElementById('balls');
const message = document.getElementById('message');
const pointsEl = document.getElementById('points');

let rightColor = '';
let points = 0;
let blocked = false;

function newRound() {
    message.textContent = '';
    balls.innerHTML = '';
    blocked = false;

    const mixedColors =
    [...colors].sort(() => 0.5 - Math.random()).slice(0, 6);
    const target = mixedColors
    [Math.floor(Math.random() * mixedColors.length)];
    targetColor.textContent = target.name;
    rightColor = target.value;

    mixedColors.forEach(color => {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.backgroundColor = color.value;
        ball.onclick = () => {
            if (!blocked) verifyAnswer(color.value);
        };
        balls.appendChild(ball);
    });
}
function verifyAnswer(clickedColor) {
    blocked = true;
    if (clickedColor === rightColor) {
        message.textContent = 'Correct!';
        message.style.color = 'green';
        points++;
    } else {
        message.textContent = 'Incorrect!';
        message.style.color = 'red';
        points = Math.max(0, points - 1);
    }
    pointsEl.textContent = `Points: ${points}`;
    setTimeout(() => {
        newRound();
    }, 1500);
}
newRound();