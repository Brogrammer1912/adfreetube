// This file handles the search functionality with active/dynamic search results

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const videoPlayerContainer = document.getElementById('video-player-container');
    const videoSuggestions = document.getElementById('video-suggestions');
    const videosContainer = document.getElementById('videos-container');
    const video = document.getElementById('video');
    const videoTitle = document.getElementById('video-title');
    const videoViews = document.getElementById('video-views');
    const videoDate = document.getElementById('video-date');
    const videoDescription = document.getElementById('video-description');

    let searchTimeout;

    // Function to handle active/dynamic search
    const handleSearch = (query) => {
        if (query.length < 2) {
            searchResults.classList.add('d-none');
            return;
        }

        // Show loading indicator in search results
        searchResults.classList.remove('d-none');
        searchResults.innerHTML = '<div class="p-3 text-center">Loading results...</div>';

        // Clear previous timeout if it exists
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Set a small timeout to prevent making too many API calls while typing
        searchTimeout = setTimeout(async () => {
            try {
                // Use the mock search function
                const data = await searchForVideos(query);

                // Clear search results
                searchResults.innerHTML = '';

                if (data.length === 0) {
                    searchResults.innerHTML = '<div class="p-3 text-center">No results found</div>';
                    return;
                }

                // Populate search results
                data.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    resultItem.dataset.videoId = result.id;
                    resultItem.innerHTML = `
                        <img src="${result.thumbnail}" alt="${result.title}" class="search-result-thumbnail">
                        <div class="search-result-info">
                            <div class="search-result-title">${result.title}</div>
                            <div class="search-result-channel">${result.channelTitle}</div>
                        </div>
                    `;

                    // Add click event to result item
                    resultItem.addEventListener('click', () => {
                        playVideo(result);
                        searchResults.classList.add('d-none');
                        searchInput.value = result.title; // Update search input with selected video title
                    });

                    searchResults.appendChild(resultItem);
                });
            } catch (error) {
                console.error('Error searching videos:', error);
                searchResults.innerHTML = '<div class="p-3 text-center">Error searching videos</div>';
            }
        }, 500); // 500ms delay
    };

    // Function to play a video
    const playVideo = (videoData) => {
        // Get the YouTube player iframe
        const youtubePlayer = document.getElementById('youtube-player');

        // Update the iframe src with the YouTube embed URL
        // Add parameters for ad-free experience (rel=0 removes related videos at the end)
        youtubePlayer.src = `https://www.youtube.com/embed/${videoData.videoId}?autoplay=1&rel=0`;

        // Update video metadata
        videoTitle.textContent = videoData.title;
        videoViews.textContent = `${formatViews(videoData.views)} views`;
        videoDate.textContent = formatDate(videoData.publishedAt);
        videoDescription.textContent = videoData.description;

        // Show video player and hide suggestions
        videoPlayerContainer.classList.remove('d-none');

        // Add history state so browser back button works
        window.history.pushState({videoId: videoData.id}, videoData.title, `?video=${videoData.id}`);

        // Load comments for this video
        loadComments(videoData.id);

        // Scroll to top
        window.scrollTo(0, 0);
    };

    // Function to load comments for a video
    const loadComments = async (videoId) => {
        const commentsContainer = document.getElementById('comments-list');
        commentsContainer.innerHTML = '<div class="text-center p-3">Loading comments...</div>';

        try {
            const comments = await getComments(videoId);

            commentsContainer.innerHTML = '';

            if (comments.length === 0) {
                commentsContainer.innerHTML = '<div class="text-center p-3">No comments yet</div>';
                return;
            }

            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment-item';
                commentElement.innerHTML = `
                    <div class="d-flex">
                        <div class="flex-shrink-0">
                            <img src="${comment.authorAvatar}" alt="${comment.authorName}" class="rounded-circle" width="40" height="40">
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <div class="d-flex align-items-center mb-1">
                                <h6 class="comment-author mb-0">${comment.authorName}</h6>
                                <small class="comment-date ms-2">${formatDate(comment.createdAt)}</small>
                            </div>
                            <p class="mb-0">${comment.text}</p>
                            <div class="mt-2">
                                <button class="btn btn-sm btn-outline-secondary">
                                    <i class="bi bi-hand-thumbs-up"></i> ${comment.likes}
                                </button>
                                <button class="btn btn-sm btn-outline-secondary ms-2">Reply</button>
                            </div>
                        </div>
                    </div>
                `;
                commentsContainer.appendChild(commentElement);
            });
        } catch (error) {
            console.error('Error loading comments:', error);
            commentsContainer.innerHTML = '<div class="text-center p-3">Error loading comments</div>';
        }
    };

    // Function to load trending/suggested videos
    const loadSuggestedVideos = async () => {
        try {
            const videos = await getVideos();

            videosContainer.innerHTML = '';

            videos.forEach(video => {
                const videoCard = document.createElement('div');
                videoCard.className = 'col-12 col-sm-6 col-lg-4 col-xl-3';
                videoCard.innerHTML = `
                    <div class="video-card">
                        <div class="video-thumbnail">
                            <img src="${video.thumbnail}" alt="${video.title}" class="img-fluid w-100">
                            <span class="video-duration">${formatDuration(video.duration)}</span>
                        </div>
                        <h5 class="video-title">${video.title}</h5>
                        <div class="video-channel">${video.channelTitle}</div>
                        <div class="video-metadata">${formatViews(video.views)} views • ${formatDate(video.publishedAt)}</div>
                    </div>
                `;

                // Add click event to video card
                videoCard.addEventListener('click', () => {
                    playVideo(video);
                });

                videosContainer.appendChild(videoCard);
            });
        } catch (error) {
            console.error('Error loading suggested videos:', error);
            videosContainer.innerHTML = '<div class="col-12 text-center p-5">Error loading videos</div>';
        }
    };

    // Helper function to format views
    const formatViews = (views) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        } else if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        } else {
            return views.toString();
        }
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else if (diffDays < 30) {
            return `${Math.floor(diffDays / 7)} weeks ago`;
        } else if (diffDays < 365) {
            return `${Math.floor(diffDays / 30)} months ago`;
        } else {
            return `${Math.floor(diffDays / 365)} years ago`;
        }
    };

    // Helper function to format duration
    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
    };

    // Event listeners
    searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    searchButton.addEventListener('click', () => {
        handleSearch(searchInput.value);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchInput.value);
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchResults.contains(e.target) && e.target !== searchInput) {
            searchResults.classList.add('d-none');
        }
    });

    // Comment submission
    document.getElementById('comment-submit').addEventListener('click', () => {
        const commentInput = document.getElementById('comment-input');
        const commentText = commentInput.value.trim();

        if (commentText) {
            // Add a mock comment (in a real app, you would send this to your API)
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            commentElement.innerHTML = `
                <div class="d-flex">
                    <div class="flex-shrink-0">
                        <img src="https://picsum.photos/id/237/40/40" alt="You" class="rounded-circle" width="40" height="40">
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <div class="d-flex align-items-center mb-1">
                            <h6 class="comment-author mb-0">You</h6>
                            <small class="comment-date ms-2">Just now</small>
                        </div>
                        <p class="mb-0">${commentText}</p>
                        <div class="mt-2">
                            <button class="btn btn-sm btn-outline-secondary">
                                <i class="bi bi-hand-thumbs-up"></i> 0
                            </button>
                            <button class="btn btn-sm btn-outline-secondary ms-2">Reply</button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('comments-list').prepend(commentElement);
            commentInput.value = '';
        }
    });

    // Load initial suggested videos
    loadSuggestedVideos();
});