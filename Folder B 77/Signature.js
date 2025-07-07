const canvas = document.getElementById('signature');
const ctx = canvas.getContext('2d');

let drawn = false;

canvas.addEventListener('mousedown', () => {
    drawn = true;
    ctx.beginPath();
});
canvas.addEventListener('mouseup', () => {
    drawn = false;
});
canvas.addEventListener('mouseleave', () => {
    drawn = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawn) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
});

function clearCanvas() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
}