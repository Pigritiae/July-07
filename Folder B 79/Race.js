const racer1 = document.getElementById('racer1');
const racer2 = document.getElementById('racer2');
const result = document.getElementById('result');

let pos1 = 0;
let pos2 = 0;
let racerActive = false;

function startRace() {
    if(racerActive) return;

    racerActive = true;
    pos1 = 0;
    pos2 = 0;
    racer1.style.left = '0px';
    racer2.style.left = '0px';
    result.textContent = '';

    const interval = setInterval(() => {
        pos1 += Math.random() * 10;
        pos2 += Math.random() * 10;
        racer1.style.left = `${pos1}px`;
        racer2.style.left = `${pos2}px`;

        if (pos1 >= 700 || pos2 >= 700) {
            clearInterval(interval);
            racerActive = false;
            if (pos1 > pos2) {
                result.textContent = "Racer 1 Won!";
            } else if (pos2 > pos1) {
                result.textContent = "Racer 2 Won!";
            } else {
                result.textContent = "Draw!";
            }
        }
    }, 100);
}