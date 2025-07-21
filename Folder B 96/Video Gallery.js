const videoPlayerContainer = document.querySelector('.video-player-container');
const video = document.querySelector('.main-video');
const playPauseButton = document.querySelector('.play-pause-button');
const progressBar = document.querySelector('.progress-bar');
const currentTimeDisplay = document.querySelector('.current-time');
const durationDisplay = document.querySelector('.duration');
const volumeButton = document.querySelector('.volume-button');
const volumeSlider = document.querySelector('.volume-slider');
const fullscreenButton = document.querySelector('.fullscreen-button');

// Função para formatar o tempo (minutos:segundos)
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// Carregar os metadados do vídeo para obter a duração
video.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(video.duration);
    progressBar.max = video.duration;
});

// Função para alternar entre play e pause
function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
        playPauseButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        `; // Ícone de pause
    } else {
        video.pause();
        playPauseButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14zm10-8l-6 4V7l6 4z"/>
            </svg>
        `; // Ícone de play
    }
}

// Atualizar a barra de progresso e o tempo atual
video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    progressBar.value = currentTime;
    currentTimeDisplay.textContent = formatTime(currentTime);
});

// Controlar a barra de progresso ao ser arrastada
progressBar.addEventListener('input', () => {
    video.currentTime = progressBar.value;
});

// Controlar o volume
volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
    if (video.volume === 0) {
        volumeButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zm-2.5 0c0 .35-.08.69-.21 1.01l1.22 1.22c.03-.17.06-.34.06-.53 0-1.38-.56-2.63-1.49-3.56v-2.05c1.97.9 3.31 2.27 3.31 4.59 0 2.32-1.34 3.69-3.31 4.59v-2.05c.93-.93 1.49-2.18 1.49-3.56 0-.19-.03-.36-.06-.53l-1.22 1.22c.13.32.21.66.21 1.01zm-4-6v2.17l-2-2V3h9v3.17l-2 2V6c-1.77 0-3.29 1.02-4.03 2.5L6 8.5c-.25-.07-.51-.12-.78-.12-1.66 0-3 1.34-3 3s1.34 3 3 3c.27 0 .53-.05.78-.12l3.5 3.5c.73-1.48 2.25-2.5 4.03-2.5v2.17l2 2V21h-9v-3.17l2-2V18c1.77 0 3.29-1.02 4.03-2.5l3.5-3.5c.25.07.51.12.78.12 1.66 0 3-1.34 3-3s-1.34-3-3-3c-.27 0-.53.05-.78.12l-3.5-3.5c-.73 1.48-2.25 2.5-4.03 2.5z"/>
            </svg>
        `; // Ícone de mudo
    } else if (video.volume < 0.5) {
        volumeButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
        `; // Ícone de volume baixo
    } else {
        volumeButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13 3c0-2.21-2.23-4-5-4s-5 1.79-5 4c0 2.21 2.23 4 5 4s5-1.79 5-4zm3 5h-2c-.83 0-1.5-.67-1.5-1.5v-9c0-.83.67-1.5 1.5-1.5h2c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5z"/>
            </svg>
        `; // Ícone de volume alto
    }
});

// Alternar tela cheia
fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        videoPlayerContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

// Atualizar o ícone de tela cheia ao entrar/sair do modo de tela cheia
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-5v5h5V8h-3v2h3z"/>
            </svg>
        `; // Exit fullscreen icon
    } else {
        fullscreenButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
        `; // Enter fullscreen icon
    }
});

// Add click event listeners
playPauseButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
// Function to load YouTube video
function loadYouTubeVideo(videoId) {
    // Create YouTube iframe
    const youtubeIframe = document.createElement('iframe');
    youtubeIframe.classList.add('main-video');
    youtubeIframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?enablejsapi=1`);
    youtubeIframe.setAttribute('frameborder', '0');
    youtubeIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    youtubeIframe.setAttribute('allowfullscreen', '');

    // Replace video element with YouTube iframe
    const oldVideo = document.querySelector('.main-video');
    oldVideo.parentNode.replaceChild(youtubeIframe, oldVideo);

    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize YouTube player when API is ready
    window.onYouTubeIframeAPIReady = function() {
        const player = new YT.Player(youtubeIframe, {
            events: {
                'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady
            }
        });
    }

    // Handle player state changes
    function onPlayerStateChange(event) {
        switch(event.data) {
            case YT.PlayerState.PLAYING:
                playPauseButton.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                `;
                break;
            case YT.PlayerState.PAUSED:
                playPauseButton.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14zm10-8l-6 4V7l6 4z"/>
                    </svg>
                `;
                break;
        }
    }

    // Update controls when player is ready
    function onPlayerReady(event) {
        // Update duration display
        const duration = event.target.getDuration();
        durationDisplay.textContent = formatTime(duration);
        progressBar.max = duration;

        // Update progress bar and time display
        setInterval(() => {
            const currentTime = event.target.getCurrentTime();
            progressBar.value = currentTime;
            currentTimeDisplay.textContent = formatTime(currentTime);
        }, 1000);
    }
}
/* Código Copiado do repositório de GitHub do usuário igormelol */