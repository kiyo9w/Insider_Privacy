// Theme handling
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check system preference on first load or use local storage
    const savedTheme = localStorage.getItem('insider-theme');
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Defaults to dark based on HTML attribute, but we can check system preference
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (prefersLight) {
            htmlElement.setAttribute('data-theme', 'light');
        }
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add a subtle brief animation scale to the toggle to mimic app haptics/scale
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            htmlElement.setAttribute('data-theme', newTheme);
            themeToggle.style.transform = 'scale(1)';
            localStorage.setItem('insider-theme', newTheme);
        }, 150);
    });

    // Smooth scroll for internal links if we add TOC later
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
