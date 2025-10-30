// ============================================
// BOSS İnşaat - Main JavaScript
// ============================================

// Global variables
let translations = {};
let currentLanguage = 'tr';

// ============================================
// Load translations
// ============================================
async function loadTranslations() {
    try {
        const response = await fetch('translations/translations.json');
        translations = await response.json();
        
        // Get language from localStorage or default to Turkish
        const savedLang = localStorage.getItem('preferredLanguage') || 'tr';
        changeLanguage(savedLang);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// ============================================
// Change Language Function
// ============================================
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Update current language display
    const langCodes = {
        'tr': 'TR',
        'en': 'EN',
        'it': 'IT',
        'ar': 'AR'
    };
    document.getElementById('currentLang').textContent = langCodes[lang];
    
    // Get all translatable elements
    const translatableElements = document.querySelectorAll('[data-translate], [data-translate-placeholder]');
    
    // Add animation class for quick transition
    translatableElements.forEach(element => {
        element.style.transition = 'opacity 0.15s ease-in-out';
        element.style.opacity = '0.3';
    });
    
    // Short delay for animation, then update content
    setTimeout(() => {
        // Set HTML lang and direction attributes
        document.documentElement.lang = lang;
        
        if (lang === 'ar') {
            document.body.setAttribute('dir', 'rtl');
        } else {
            document.body.removeAttribute('dir');
        }
        
        // Update all translatable elements
        updatePageContent(lang);
        
        // Fade back in
        setTimeout(() => {
            translatableElements.forEach(element => {
                element.style.opacity = '1';
            });
        }, 50);
        
    }, 150); // Quick but smooth
}

// ============================================
// Update Page Content
// ============================================
function updatePageContent(lang) {
    const langData = translations[lang];
    if (!langData) return;
    
    // Update elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const value = getNestedTranslation(langData, key);
        
        if (value) {
            element.textContent = value;
        }
    });
    
    // Update placeholder attributes
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const value = getNestedTranslation(langData, key);
        
        if (value) {
            element.placeholder = value;
        }
    });
}

// ============================================
// Get Nested Translation Value
// ============================================
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// ============================================
// Navbar Scroll Effect
// ============================================
function handleNavbarScroll() {
    const navbar = document.getElementById('mainNav');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ============================================
// Active Navigation Link
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Back to Top Button
// ============================================
function handleBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for language switcher or empty hrefs
            if (href === '#' || href === '') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Contact Form Handler
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Get form data
        const formData = new FormData(form);
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const subject = form.querySelectorAll('input[type="text"]')[1].value;
        const message = form.querySelector('textarea').value;
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Gönderiliyor...';
        
        try {
            // Here you would normally send the form data to a backend
            // For now, we'll simulate a successful submission
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            const successMsg = translations[currentLanguage].contact.form.success;
            formMessage.textContent = successMsg;
            formMessage.className = 'success';
            
            // Reset form
            form.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            
        } catch (error) {
            // Show error message
            const errorMsg = translations[currentLanguage].contact.form.error;
            formMessage.textContent = errorMsg;
            formMessage.className = 'error';
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            const sendText = translations[currentLanguage].contact.form.send;
            submitBtn.innerHTML = `<i class="bi bi-send"></i> ${sendText}`;
        }
    });
}

// ============================================
// Animate Elements on Scroll
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.service-card, .project-card, .equipment-card, .stat-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// Add Placeholder Images
// ============================================
function addPlaceholderImages() {
    // Add placeholder for about section image
    const aboutImg = document.querySelector('#about img');
    if (aboutImg && aboutImg.src.includes('about-placeholder.jpg')) {
        aboutImg.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800';
        aboutImg.alt = 'BOSS Construction About';
    }
    
    // Add placeholder for project images
    const projectImages = [
        'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600', // Airport
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600', // Hospital
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600'  // Road
    ];
    
    document.querySelectorAll('.project-image img').forEach((img, index) => {
        if (img.src.includes('airport-project.jpg') || 
            img.src.includes('hospital-project.jpg') || 
            img.src.includes('road-project.jpg')) {
            img.src = projectImages[index] || projectImages[0];
        }
    });
}

// ============================================
// Initialize Hero Section Background Parallax
// ============================================
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
}

// ============================================
// Lazy Load Images
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// Initialize All Functions on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Load translations and initialize language
    loadTranslations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize contact form
    initContactForm();
    
    // Add placeholder images
    addPlaceholderImages();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
        handleBackToTop();
    });
    
    // Initial call for navbar state
    handleNavbarScroll();
    
    console.log('BOSS İnşaat Website Loaded Successfully! 🏗️');
});

// ============================================
// Expose changeLanguage function globally
// ============================================
window.changeLanguage = changeLanguage;

// ============================================
// Project Modal Gallery System
// ============================================

// Project data with image arrays
const projectData = {
    airport: {
        images: ['airport1.png', 'airport2.png', 'airport3.png'],
        year: '2009'
    },
    hospital: {
        images: ['hospital1.png', 'hospital2.png', 'hospital3.png'],
        year: '2015'
    },
    road: {
        images: ['road1.png', 'road2.png', 'road3.png'],
        year: '2009'
    }
};

let currentProject = null;
let currentImageIndex = 0;

// Open project modal
function openProjectModal(projectType) {
    currentProject = projectType;
    currentImageIndex = 0;
    
    const project = projectData[projectType];
    const langData = translations[currentLanguage].projects[projectType];
    
    // Set modal title
    document.getElementById('projectModalTitle').textContent = langData.title;
    
    // Set project details
    document.getElementById('projectLocation').textContent = langData.location;
    document.getElementById('projectYear').textContent = project.year;
    document.getElementById('projectDescription').textContent = langData.description;
    document.getElementById('projectDetails').textContent = langData.details;
    
    // Load images
    loadProjectImages(project.images);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}

// Load project images into gallery
function loadProjectImages(images) {
    const mainImage = document.getElementById('projectMainImage');
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    const totalImagesSpan = document.getElementById('totalImages');
    
    // Set main image
    mainImage.src = `images/${images[0]}`;
    
    // Update counter
    document.getElementById('currentImageIndex').textContent = '1';
    totalImagesSpan.textContent = images.length;
    
    // Clear and create thumbnails
    thumbnailContainer.innerHTML = '';
    
    images.forEach((imageName, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.onclick = () => setProjectImage(index);
        
        const img = document.createElement('img');
        img.src = `images/${imageName}`;
        img.alt = `Thumbnail ${index + 1}`;
        
        thumbnail.appendChild(img);
        thumbnailContainer.appendChild(thumbnail);
    });
}

// Change project image (prev/next)
function changeProjectImage(direction) {
    const images = projectData[currentProject].images;
    currentImageIndex += direction;
    
    // Wrap around
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    
    setProjectImage(currentImageIndex);
}

// Set specific project image
function setProjectImage(index) {
    const images = projectData[currentProject].images;
    currentImageIndex = index;
    
    // Update main image
    document.getElementById('projectMainImage').src = `images/${images[index]}`;
    
    // Update counter
    document.getElementById('currentImageIndex').textContent = index + 1;
    
    // Update thumbnail active state
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Expose functions globally
window.openProjectModal = openProjectModal;
window.changeProjectImage = changeProjectImage;
window.setProjectImage = setProjectImage;

