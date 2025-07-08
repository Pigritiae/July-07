const ratings = document.querySelectorAll('.rating');
const messageEl = document.getElementById('message');
const sendBtn = document.getElementById("sendBtn");
let selectedRating = null;

ratings.forEach(rating => {
    rating.addEventListener('click', () => {
        ratings.forEach(e => e.classList.remove('selected'));
        rating.classList.add('selected');
        selectedRating = rating.getAttribute('data-rating');
        messageEl.textContent = `You selected ${selectedRating} out of 5. Click to Send`;
    });
});
sendBtn.addEventListener('click', () => {
    if (!selectedRating) {
        messageEl.textContent = 'Select a rating before sending';
        return;
    }
    messageEl.textContent = `Thank you for rating us ${selectedRating} out of 5`;
    sendBtn.disabled = true;
    ratings.forEach(e => e.style.pointerEvents = 'none');
});