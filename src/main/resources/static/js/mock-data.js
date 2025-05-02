const MOCK_VIDEOS = [
    {
        id: 'vid001',
        title: 'Building a Modern JavaScript Application From Scratch',
        description: 'Learn how to create a complete JavaScript application using modern tools and frameworks. This tutorial covers everything from setup to deployment.',
        thumbnail: 'https://picsum.photos/id/1/640/360',
        videoId: 'PkZNo7MFNFg', // YouTube Video ID
        channelTitle: 'CodeMaster',
        channelAvatar: 'https://picsum.photos/id/433/40/40',
        views: 1456789,
        likes: 42500,
        duration: 1256, // seconds
        publishedAt: '2023-09-15T14:32:12Z'
    },
    {
        id: 'vid002',
        title: 'Responsive Web Design Techniques That Actually Work',
        description: 'Dive into responsive web design techniques that are proven to work across all device sizes. Master media queries, flexbox, and CSS Grid.',
        thumbnail: 'https://picsum.photos/id/20/640/360',
        videoId: 'srvUrASNj0s', // YouTube Video ID
        channelTitle: 'WebDevSimplified',
        channelAvatar: 'https://picsum.photos/id/338/40/40',
        views: 982340,
        likes: 35620,
        duration: 843, // seconds
        publishedAt: '2023-10-22T09:14:33Z'
    },
    {
        id: 'vid003',
        title: 'React vs Vue vs Angular - The Ultimate Comparison',
        description: 'Which frontend framework should you choose? This in-depth comparison covers performance, learning curve, job opportunities and more.',
        thumbnail: 'https://picsum.photos/id/3/640/360',
        videoId: 'u6TheSIBP4U', // YouTube Video ID
        channelTitle: 'JavaScript Mastery',
        channelAvatar: 'https://picsum.photos/id/339/40/40',
        views: 2345678,
        likes: 78900,
        duration: 1547, // seconds
        publishedAt: '2023-08-05T15:45:10Z'
    },
    {
        id: 'vid004',
        title: 'CSS Animations and Transitions: The Complete Guide',
        description: 'Learn everything about CSS animations and transitions with practical examples. Create engaging user interfaces that delight users.',
        thumbnail: 'https://picsum.photos/id/4/640/360',
        videoId: '8kK-cA99SA0', // YouTube Video ID
        channelTitle: 'CSS Wizard',
        channelAvatar: 'https://picsum.photos/id/342/40/40',
        views: 876540,
        likes: 32450,
        duration: 1120, // seconds
        publishedAt: '2023-11-12T10:23:45Z'
    },
    {
        id: 'vid005',
        title: 'JavaScript Async/Await - Explained with Real Examples',
        description: 'Master asynchronous JavaScript with a deep dive into async/await patterns. We cover best practices and common mistakes to avoid.',
        thumbnail: 'https://picsum.photos/id/5/640/360',
        videoId: 'V_Kr9OSfDeU', // YouTube Video ID
        channelTitle: 'Async Master',
        channelAvatar: 'https://picsum.photos/id/342/40/40',
        views: 1234560,
        likes: 45670,
        duration: 924, // seconds
        publishedAt: '2023-07-28T16:52:37Z'
    },
    {
        id: 'vid006',
        title: 'Bootstrap 5 Full Crash Course - Build 3 Projects',
        description: 'Learn Bootstrap 5 from scratch by building three complete projects. Perfect for beginners who want to master this popular CSS framework.',
        thumbnail: 'https://picsum.photos/id/6/640/360',
        videoId: 'Jyvffr3aCp0', // YouTube Video ID
        channelTitle: 'BootstrapBuddy',
        channelAvatar: 'https://picsum.photos/id/342/40/40',
        views: 987650,
        likes: 28900,
        duration: 3620, // seconds
        publishedAt: '2023-10-05T08:12:44Z'
    },
    {
        id: 'vid007',
        title: 'Full Stack Development Roadmap 2023',
        description: 'A complete roadmap for becoming a full stack developer in 2023. We cover frontend, backend, databases, DevOps and more.',
        thumbnail: 'https://picsum.photos/id/7/640/360',
        videoId: 'QqZm65kZ0kE', // YouTube Video ID
        channelTitle: 'Dev Roadmaps',
        channelAvatar: 'https://picsum.photos/id/342/40/40',
        views: 1876500,
        likes: 67890,
        duration: 1856, // seconds
        publishedAt: '2023-01-15T11:32:09Z'
    },
    {
        id: 'vid008',
        title: 'TypeScript for JavaScript Developers - Full Tutorial',
        description: 'Learn TypeScript from the ground up in this comprehensive guide for JavaScript developers. Includes interfaces, generics, and advanced types.',
        thumbnail: 'https://picsum.photos/id/8/640/360',
        videoId: '30LWjhZzg50', // YouTube Video ID
        channelTitle: 'TypeTutor',
        channelAvatar: 'https://picsum.photos/id/342/40/40',
        views: 765430,
        likes: 23450,
        duration: 2750, // seconds
        publishedAt: '2023-09-03T14:27:44Z'
    }
];

const MOCK_COMMENTS = {
    'vid001': [
        {
            id: 'com001',
            authorName: 'Jessica Hayes',
            authorAvatar: 'https://picsum.photos/id/64/40/40',
            text: 'This tutorial helped me so much with my personal project! Finally understanding how to structure my application properly.',
            createdAt: '2023-10-12T15:34:12Z',
            likes: 245
        },
        {
            id: 'com002',
            authorName: 'Mark Thompson',
            authorAvatar: 'https://picsum.photos/id/65/40/40',
            text: 'Great explanation of webpack configuration. I was struggling with this for days!',
            createdAt: '2023-10-11T22:17:36Z',
            likes: 124
        },
        {
            id: 'com003',
            authorName: 'Sarah Johnson',
            authorAvatar: 'https://picsum.photos/id/66/40/40',
            text: 'Would love to see more tutorials on advanced JavaScript patterns. Keep up the great work!',
            createdAt: '2023-10-09T11:05:49Z',
            likes: 89
        }
    ],
    'vid002': [
        {
            id: 'com004',
            authorName: 'David Wilson',
            authorAvatar: 'https://picsum.photos/id/67/40/40',
            text: 'The section on CSS Grid was a game changer for me. Finally got my layouts working properly on all devices!',
            createdAt: '2023-10-24T09:23:15Z',
            likes: 178
        },
        {
            id: 'com005',
            authorName: 'Emily Clark',
            authorAvatar: 'https://picsum.photos/id/68/40/40',
            text: 'Ive been using these techniques on my client projects with great success. Thanks!',
            createdAt: '2023-10-23T16:42:31Z',
            likes: 97
        }
    ],
    'vid003': [
        {
            id: 'com006',
            authorName: 'Michael Brown',
            authorAvatar: 'https://picsum.photos/id/69/40/40',
            text: 'After watching this, I decided to go with React for our new project. The comparison was super helpful!',
            createdAt: '2023-08-12T14:19:23Z',
            likes: 321
        },
        {
            id: 'com007',
            authorName: 'Jennifer Moore',
            authorAvatar: 'https://picsum.photos/id/70/40/40',
            text: 'As someone whos used all three frameworks, I think this comparison is spot on. Great job!',
            createdAt: '2023-08-10T20:37:55Z',
            likes: 265
        },
        {
            id: 'com008',
            authorName: 'Robert Garcia',
            authorAvatar: 'https://picsum.photos/id/71/40/40',
            text: 'The performance benchmarks were really eye-opening. I hadnt realized Vue was that efficient!',
            createdAt: '2023-08-07T11:52:09Z',
            likes: 143
        }
    ]
};

// Simulate API calls
const API_BASE_URL = 'https://api.example.com/v1';

// Mock API functions
function fetchVideos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_VIDEOS);
        }, 800);  // Simulate network delay
    });
}

function fetchVideoById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const video = MOCK_VIDEOS.find(v => v.id === id);
            if (video) {
                resolve(video);
            } else {
                reject(new Error('Video not found'));
            }
        }, 500);
    });
}

function fetchComments(videoId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_COMMENTS[videoId] || []);
        }, 700);
    });
}

function searchVideos(query) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simple search implementation - case insensitive partial match on title or description
            const normalizedQuery = query.toLowerCase();
            const results = MOCK_VIDEOS.filter(video => 
                video.title.toLowerCase().includes(normalizedQuery) || 
                video.description.toLowerCase().includes(normalizedQuery)
            );
            resolve(results);
        }, 600);
    });
}

// Add this line around line 180 to make sure these functions are globally available
window.fetchVideos = fetchVideos;
window.fetchVideoById = fetchVideoById;
window.fetchComments = fetchComments;
window.searchVideos = searchVideos;