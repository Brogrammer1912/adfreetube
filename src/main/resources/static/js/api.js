// This file handles API requests to fetch video data and comments.

// API functions that will be used by other components
function getVideos() {
    return fetchVideos();
}

function getVideoById(id) {
    return fetchVideoById(id);
}

function getComments(videoId) {
    return fetchComments(videoId);
}

function searchForVideos(query) {
    return searchVideos(query);
}