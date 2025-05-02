// This file initializes the application and sets up event listeners for theme switching and video interactions.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Ad-Free Tube application initialized!');

    // Check if there's a video ID in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('video');

    if (videoId) {
        // If video ID exists in URL, load that video
        getVideoById(videoId).then(videoData => {
            if (videoData) {
                playVideo(videoData);
            }
        }).catch(error => {
            console.error('Error loading video:', error);
        });
    }

    // Add a welcome message that will show temporarily
    const main = document.querySelector('.main-content');

    const welcomeAlert = document.createElement('div');
    welcomeAlert.className = 'alert alert-info alert-dismissible fade show mt-4';
    welcomeAlert.role = 'alert';
    welcomeAlert.innerHTML = `
        <h4 class="alert-heading">Welcome to Ad-Free Tube!</h4>
        <p>This is a demonstration version with mock data. Try searching for terms like "JavaScript", "CSS", or "React" to see results.</p>
        <p>Click on any video to watch using YouTube's player without interruptions!</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert before the first child of main
    main.insertBefore(welcomeAlert, main.firstChild);

    // Auto dismiss after 10 seconds
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(welcomeAlert);
        bsAlert.close();
    }, 10000);
});