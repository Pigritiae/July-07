const modal = document.getElementById("videoModal");
const modalContent = document.getElementById(".modal-content");
const closeModal = document.getElementById("closeModal");
const toggleThemeBtn = document.getElementById("toggleTheme");

let currentIframe = null;
let originalParent = null;

document.querySelectorAll(".video-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
        const iframe = thumb.querySelector("iframe");
        if (iframe) {
            currentIframe = iframe;
            originalParent = thumb;

            modalContent.appendChild(iframe);
            const src = iframe.src;
            if (src.indexOf('autoplay=1') === -1) {
                iframe.src = src + (src.indexOf('?') > -1 ? '&' : '?') + 'autoplay=';
            }
            modal.style.display = "flex";
        } else {
            console.error ("No Iframe found for the Clicked Video-thumb.");
        }
    });
});
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    if (currentIframe) {
        currentIframe.src = currentIframe.src.replace ('&autoplay=1', '').replace('?autoplay=1', '');
        if (originalParent) {
            originalParent.appendChild(currentIframe);
        }
        currentIframe = null;
        originalParent = null
    }
});
modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
        if (currentIframe) {
            currentIframe.src = 
            currentIframe.src.replace('&autoplay=1', '').replace('?autoplay=1', '');
            if (originalParent) {
                originalParent.appendChild(currentIframe);
            }
            currentIframe = null;
            originalParent = null;
        }
    }
});
toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleThemeBtn.textContent = document.body.classList.contains("dark") ? "Light" : "Dark";
});