// theme-switcher.js
(function() {
    // Track if event listeners have been initialized
    let initialized = false;

    // Main initialization function
    function initializeThemeSwitcher() {
        const themeStylesheet = document.getElementById('theme-stylesheet');
        const themeButton = document.getElementById('theme-switcher');

        if (!themeStylesheet || !themeButton) return;

        // Set initial theme based on localStorage or system preference
        applyCurrentTheme();

        // Only add the event listener once
        if (!initialized) {
            themeButton.addEventListener('click', function() {
                toggleTheme();
            });
            initialized = true;
        }

        // Apply the current theme based on localStorage
        function applyCurrentTheme() {
            const savedTheme = localStorage.getItem('theme');
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

            if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
                enableDarkMode();
            } else {
                enableLightMode();
            }
        }

        // Toggle between themes
        function toggleTheme() {
            const currentTheme = localStorage.getItem('theme');
            if (currentTheme === 'light') {
                enableDarkMode();
            } else {
                enableLightMode();
            }
        }

        function enableDarkMode() {
            themeStylesheet.setAttribute('href', '/css/dark-theme.css');
            themeButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }

        function enableLightMode() {
            themeStylesheet.setAttribute('href', '/css/light-theme.css');
            themeButton.innerHTML = '<i class="bi bi-moon-fill"></i>';
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', initializeThemeSwitcher);

    // Initialize on browser navigation (back/forward)
    window.addEventListener('popstate', initializeThemeSwitcher);

    // Handle HTMX content swaps
    document.body.addEventListener('htmx:afterSwap', initializeThemeSwitcher);

    // Initialize immediately if page is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initializeThemeSwitcher();
    }
})();