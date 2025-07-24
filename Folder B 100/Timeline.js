document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.querySelector('.timeline-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    const SCROLL_AMOUNT = 300;

    function updateScrollButtonVisibility() {
        // Check if content is wider than its container
        const hasScroll = timelineContainer.scrollWidth > timelineContainer.clientWidth;

        if (!hasScroll) {
            scrollLeftBtn.disabled = true;
            scrollRightBtn.disabled = true;
            scrollLeftBtn.style.opacity = '0.5';
            scrollRightBtn.style.opacity = '0.5';
            return;
        }

        // Disable left button if at the beginning of the scroll area
        if (timelineContainer.scrollLeft <= 0) {
            scrollLeftBtn.disabled = true;
            scrollLeftBtn.style.opacity = '0.5';
        } else {
            scrollLeftBtn.disabled = false;
            scrollLeftBtn.style.opacity = '1';
        }

        // Disable right button if at the end of the scroll area
        // We add a small tolerance (e.g., 1px) due to potential sub-pixel rendering differences
        if (timelineContainer.scrollLeft + timelineContainer.clientWidth >= timelineContainer.scrollWidth - 1) {
            scrollRightBtn.disabled = true;
            scrollRightBtn.style.opacity = '0.5';
        } else {
            scrollRightBtn.disabled = false;
            scrollRightBtn.style.opacity = '1';
        }
    }

    function scrollTimeline(direction) {
        timelineContainer.scrollBy({
            left: direction * SCROLL_AMOUNT, // Corrected 'left' typo and usage of direction
            behavior: 'smooth' // Corrected 'behaviour' typo
        });
        // The updateScrollButtonVisibility will be called by the 'scroll' event listener
        // that fires after the smooth scroll completes or during the scroll.
    }

    scrollLeftBtn.addEventListener('click', () => scrollTimeline(-1));
    scrollRightBtn.addEventListener('click', () => scrollTimeline(1));

    // Listen for scroll events on the container to update button visibility
    timelineContainer.addEventListener('scroll', updateScrollButtonVisibility);

    // Initial check for button visibility
    updateScrollButtonVisibility();

    // Update button visibility on window resize
    window.addEventListener('resize', updateScrollButtonVisibility);
});
/* Código Corrigido pela IA Gemini*/