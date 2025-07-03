const word = [
    'JAVASCRIPT',
    'PROGRAMMING',
    'DEVELOPER',
    'COMPUTER',
    'ALGORHYTHM',
    'CODE',
    'FRONTEND',
    'BACKEND',
    'BROWSER',
    'DATABASE'
];

let secretWord = '';
let correctWords = [];
let wrongWords = [];
let remainingTries = 6;

const wordEl = document.getElementById('word');
const lettersEl = document.getElementById('letters'); // Corrected ID here
const triesEl = document.getElementById('tries');
const input = document.getElementById('input');
const message = document.getElementById('message');

const parts = [
    document.querySelector('.head'),
    document.querySelector('.torso'),
    document.querySelector('.left-arm'),
    document.querySelector('.right-arm'),
    document.querySelector('.left-leg'),
    document.querySelector('.right-leg'),
];

function sortWord() {
    const index = Math.floor(Math.random() * word.length);
    return word[index];
}

function beginGame() {
    secretWord = sortWord();
    correctWords = [];
    wrongWords = [];
    remainingTries = 6;
    input.disabled = false;
    message.textContent = '';
    updateScreen(); // Call updateScreen to initialize the display
}

function updateScreen() {
    // Display the secret word with underscores for unrevealed letters
    wordEl.textContent = secretWord
        .split('')
        .map(char => (correctWords.includes(char) ? char : '_'))
        .join(' '); // Added a space for better readability of underscores

    // Display the typed (incorrect) letters
    lettersEl.textContent = wrongWords.join(', '); // Corrected element here

    // Display remaining tries
    triesEl.textContent = remainingTries;

    // Show/hide body parts based on wrong guesses
    parts.forEach((part, index) => { // Renamed 'parts' to 'part' for clarity within the loop
        if (index < wrongWords.length) {
            part.style.display = 'block'; // Corrected style access
        } else {
            part.style.display = 'none'; // Ensure parts are hidden if not yet revealed
        }
    });

    // Check for win condition
    if (!wordEl.textContent.includes('_')) {
        message.textContent = 'You Won!';
        input.disabled = true;
    }

    // Check for lose condition
    if (remainingTries <= 0) {
        message.textContent = `You Lose! The word was "${secretWord}".`;
        input.disabled = true;
    }
}

input.addEventListener('input', () => {
    const char = input.value.toUpperCase(); // Renamed 'word' to 'char' as it's a single character
    input.value = ''; // Clear the input field

    // Validate input: ensure it's a single letter and hasn't been guessed before
    if (!char.match(/[A-Z]/) || char.length !== 1 ||
        correctWords.includes(char) || wrongWords.includes(char)) {
        return; // Ignore invalid input
    }

    // Check if the guessed letter is in the secret word
    if (secretWord.includes(char)) {
        correctWords.push(char);
    } else {
        wrongWords.push(char);
        remainingTries--;
    }
    updateScreen(); // Update the display after each guess
});

beginGame();
/* Código corrigido pela IA Gemini */