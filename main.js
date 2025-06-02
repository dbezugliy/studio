// Initialize the dot grid when the page loads
window.addEventListener('load', () => {
    new DotGrid();
});

// Optional: Add any other initialization code here
// For example, you could add smooth scrolling, lazy loading for videos, etc.

// Smooth scrolling for any anchor links (if you add navigation later)
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Optional: Add performance monitoring for the animation
if (window.performance && window.performance.mark) {
    window.addEventListener('load', () => {
        performance.mark('dotgrid-start');
    });
}