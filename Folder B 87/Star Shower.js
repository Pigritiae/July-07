const sky = document.getElementById('sky');
const btn = document.getElementById('shoot');

btn.addEventListener('click', () => {
    const star = document.createElement('div');
    star.classList.add('star');

    const startX = Math.random() * window.innerWidth;
    star.style.left = `${startX}px`;
    star.style.top = `0px`;

    sky.appendChild(star);

    star.addEventListener('animationend', () => {
        star.remove();
    });
});