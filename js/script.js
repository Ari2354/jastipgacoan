document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const htmlElement = document.documentElement; // Get the <html> element

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeButtonIcon(savedTheme);
    } else {
        // Default to light theme if no preference saved
        htmlElement.setAttribute('data-theme', 'light');
        updateThemeButtonIcon('light');
    }

    // Add click listener to the toggle button
    themeToggleButton.addEventListener('click', toggleTheme);

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Save preference
        updateThemeButtonIcon(newTheme);
    }

    function updateThemeButtonIcon(theme) {
        const icon = themeToggleButton.querySelector('i.bi');
        if (theme === 'dark') {
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-brightness-high-fill'); // Icon for light mode
        } else {
            icon.classList.remove('bi-brightness-high-fill');
            icon.classList.add('bi-moon-fill'); // Icon for dark mode
        }
    }

    // Optional: Add a class to navbar on scroll for better visibility
    const navbar = document.getElementById('main-navbar');
    let scrolled = false;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50 && !scrolled) { // Add 'scrolled' class after scrolling down 50px
            navbar.classList.add('scrolled');
            scrolled = true;
        } else if (window.scrollY <= 50 && scrolled) { // Remove 'scrolled' class when back at top
            navbar.classList.remove('scrolled');
            scrolled = false;
        }
    });
});