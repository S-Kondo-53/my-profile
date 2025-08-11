// Navigation
function navigateHome() {
    window.location.href = '../index.html';
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Animations
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animated-element');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
});