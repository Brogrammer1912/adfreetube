// This file contains additional functionality for the YouTube iframe player

document.addEventListener('DOMContentLoaded', () => {
    // YouTube iframe API is already loaded by the iframe,
    // so we just need to handle any additional functionality

    // Add key events for when the iframe is in focus
    document.addEventListener('keydown', (e) => {
        // Only apply shortcuts when video player is visible and not when typing in search or comments
        if (!document.getElementById('video-player-container').classList.contains('d-none') &&
            document.activeElement.tagName !== 'INPUT' &&
            document.activeElement.tagName !== 'TEXTAREA') {

            // Space key is handled by YouTube player automatically

            // You can add custom keyboard shortcuts if needed
            // For example, 'F' for fullscreen
            if (e.key.toLowerCase() === 'f') {
                const iframe = document.getElementById('youtube-player');
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else if (iframe) {
                    iframe.requestFullscreen();
                }
                e.preventDefault();
            }
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        const videoPlayerContainer = document.getElementById('video-player-container');
        const youtubePlayer = document.getElementById('youtube-player');

        if (e.state && e.state.videoId) {
            // If there's a video ID in the state, load that video
            getVideoById(e.state.videoId).then(videoData => {
                playVideo(videoData);
            });
        } else {
            // If no video ID in state, go back to home view
            youtubePlayer.src = '';
            videoPlayerContainer.classList.add('d-none');
        }
    });

    // Add event for closing video and returning to home
    document.addEventListener('click', (e) => {
        if (e.target.id === 'close-video-btn') {
            // Use history.back() instead of just hiding the player
            window.history.back();

            // The popstate event will handle cleanup, but add fallback
            // in case there's an issue with history
            setTimeout(() => {
                const videoPlayerContainer = document.getElementById('video-player-container');
                const youtubePlayer = document.getElementById('youtube-player');

                if (!videoPlayerContainer.classList.contains('d-none')) {
                    youtubePlayer.src = '';
                    videoPlayerContainer.classList.add('d-none');
                }
            }, 100);

            e.preventDefault();
        }
    });
});