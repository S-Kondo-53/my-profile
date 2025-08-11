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

// Activity Page specific functionality
class AliveActivityApp {
    constructor() {
        this.activeSection = 0;
        this.contentRefs = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.startInitialAnimations();
    }

    setupEventListeners() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.scrollToSection(index);
            });
        });
        
        // Content sections
        const contentSections = document.querySelectorAll('.content-section');
        this.contentRefs = Array.from(contentSections);
    }

    setupNavigation() {
        this.updateActiveNavigation();
    }

    setupScrollAnimations() {
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
    }

    handleScroll() {
        const scrollPosition = window.scrollY + 200;
        
        this.contentRefs.forEach((ref, index) => {
            if (ref) {
                const { offsetTop, offsetHeight } = ref;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    if (this.activeSection !== index) {
                        this.activeSection = index;
                        this.updateActiveNavigation();
                    }
                }
            }
        });
    }

    updateActiveNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.classList.toggle('active', index === this.activeSection);
        });
    }

    scrollToSection(index) {
        const element = this.contentRefs[index];
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.offsetTop - headerHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    startInitialAnimations() {
        // Header animation
        const header = document.querySelector('.header-alive');
        header.style.animation = 'slideDown 0.6s ease-out';
        
        // Hero animations
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            heroContent.style.animation = 'fadeInUp 1s ease-out';
        }, 300);
        
        // Sidebar animation
        setTimeout(() => {
            const sidebar = document.querySelector('.sidebar-nav');
            sidebar.style.animation = 'slideInLeft 0.8s ease-out';
        }, 500);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AliveActivityApp();
});