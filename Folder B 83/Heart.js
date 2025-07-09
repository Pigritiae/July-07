const heart = document.getElementById("heart");
const toggleBtn = document.getElementById("toggleBtn");

let beating = false;

toggleBtn.addEventListener("click", () => {
    beating = !beating;
    heart.classList.toggle("beat", beating);
    toggleBtn.textContent = beating ? "Stop Beating" : "Start Beating";
});