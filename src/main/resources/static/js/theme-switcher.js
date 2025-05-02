// theme-switcher.js

document.addEventListener('DOMContentLoaded', () => {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const themeButton = document.getElementById('theme-switcher');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
    
    // Toggle between light and dark modes
    themeButton.addEventListener('click', () => {
        if (themeStylesheet.getAttribute('href').includes('light-theme')) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    });
    
    function enableDarkMode() {
        themeStylesheet.setAttribute('href', 'css/dark-theme.css');
        themeButton.innerHTML = '<i class="bi bi-sun-fill"></i>';
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
    
    function enableLightMode() {
        themeStylesheet.setAttribute('href', 'css/light-theme.css');
        themeButton.innerHTML = '<i class="bi bi-moon-fill"></i>';
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});