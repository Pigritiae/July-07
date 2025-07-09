/* consts Estavam todos com .createElement antes da correção */
const playArea = document.getElementById("play-area");
const startBtn = document.getElementById("start");
const answerDiv = document.getElementById("answer");
const inputAnswer = document.querySelector("inputAnswer");
const sendBtn = document.getElementById("send");
const result = document.getElementById("result");
let totalSquares = 0;

function generateSquares() {
    playArea.innerHTML = '';
    totalSquares = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.left = Math.random() * 270 + 'px';
        square.style.top = Math.random() * 270 + 'px';
        playArea.appendChild(square);
    }
}
startBtn.addEventListener('click', () => {
    answerDiv.style.display = 'none';
    result.textContent = '';
    inputAnswer.value = ''; /* Modificação Adicionada pela IA */
    generateSquares();
    startBtn.disabled = true;
    setTimeout(() => {
        playArea.innerHTML = '';
        answerDiv.style.display = 'block';
        inputAnswer.focus();
    }, 3000);
});
sendBtn.addEventListener('click', () => {
    const value = parseInt(inputAnswer.value);
    if (isNaN(value)) return;
    if (value === totalSquares) {
        result.textContent = 'Correct! Congratulations!';
        result.style.color = 'lightgreen';
    } else {
        result.textContent = `Wrong! It was ${totalSquares}.`;
        result.style.color = 'tomato';
    }
    startBtn.disabled = false;
});
/* Modificação Adicionada pela IA */
document.addEventListener('DOMContentLoaded', () => {
    answerDiv.style.display = 'none';
    result.textContent = 'Click "Start" to play!';
    result.style.color = 'white';
});
/* Código Corrigido pela IA Gemini */