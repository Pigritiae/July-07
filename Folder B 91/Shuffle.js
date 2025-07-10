const values = 
['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const symbols = [
    '♥', 
    '♦', 
    '♣', 
    '♠'
    ];
const card = document.getElementById('card');
const newCard = document.getElementById('newCard');

newCard.addEventListener('click', () => {
    const value = values[Math.floor(Math.random() * values.length)];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const color = (symbol === '♥' || symbol === '♦') ? 'red' : 'black';

    card.querySelectorAll('.value').forEach(el => el.textContent = value);
    card.querySelectorAll('.symbol').forEach(el => el.textContent = symbol);
    card.querySelector('.center').textContent = symbol;
    card.querySelectorAll('.value, .symbol, .center').forEach(el => {
        el.style.color = color;
    });
});
