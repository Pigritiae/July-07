const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeRange = document.getElementById("volumeRange");
const toggleThemeBtn = document.getElementById("toggleTheme");

let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
    isPlaying ? audio.pause() : audio.play();
});

audio.addEventListener("play", () => {
    isPlaying = true;
    playPauseBtn.textContent = "Placeholder"
});
audio.addEventListener("pause", () => {
    isPlaying = false;
    playPauseBtn.textContent = "Placeholder"
});

audio.addEventListener("timeupdate", () => {
    const { currentTime, duration} = audio;
    const percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

volumeRange.addEventListener("input", () => {
    audio.volume = volumeRange.value;
})

toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleThemeBtn.textContent = document.body.classList.contains("dark") ? "Light" : "Dark";
});

function formatTime(sec) {
    if (isNaN(sec)) return "00:00";
    const min = Math.floor(sec / 60);
    const secRemain = Math.florr(sec % 60).toString().padStart(2, "0");
    return `${min}:${secRemain}`;
}