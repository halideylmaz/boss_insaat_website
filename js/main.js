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
        
        // Update projects with new language
        populateCompletedProjects();
        populateOngoingProjects();
        
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
    
    // Initialize projects lists
    initializeProjects();
    
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
// Project Tab Switching
// ============================================
function switchProjectTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.project-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.project-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}-projects`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// ============================================
// Initialize Projects Lists
// ============================================
function initializeProjects() {
    // Wait for translations to load
    setTimeout(() => {
        if (translations && translations[currentLanguage]) {
            populateCompletedProjects();
            populateOngoingProjects();
        } else {
            // Retry after a short delay
            setTimeout(initializeProjects, 500);
        }
    }, 100);
}

// ============================================
// Populate Completed Projects
// ============================================
function populateCompletedProjects() {
    const container = document.getElementById('completed-projects-list');
    const langData = translations[currentLanguage]?.projects;
    
    if (!langData || !langData.completed) return;
    
    container.innerHTML = '';
    
    for (let i = 1; i <= 10; i++) {
        const project = langData.completed[`project${i}`];
        if (!project) continue;
        
        const projectItem = document.createElement('div');
        projectItem.className = 'project-list-item';
        
        const statusClass = getStatusClass(project.status);
        
        projectItem.innerHTML = `
            <h4>${project.title}</h4>
            <div class="project-details-grid">
                <div class="project-detail-item">
                    <strong><i class="bi bi-building"></i> ${langData.client}:</strong>
                    <span>${project.client}</span>
                </div>
                <div class="project-detail-item">
                    <strong><i class="bi bi-geo-alt"></i> ${langData.location}:</strong>
                    <span>${project.location}</span>
                </div>
                <div class="project-detail-item">
                    <strong><i class="bi bi-calendar-check"></i> ${langData.awardDate}:</strong>
                    <span>${project.awardDate}</span>
                </div>
                <div class="project-detail-item">
                    <strong><i class="bi bi-calendar-event"></i> ${langData.completionDate}:</strong>
                    <span>${project.completionDate}</span>
                </div>
            </div>
            <span class="status-badge ${statusClass}">${project.status}</span>
        `;
        
        container.appendChild(projectItem);
    }
}

// ============================================
// Populate Ongoing Projects
// ============================================
function populateOngoingProjects() {
    const container = document.getElementById('ongoing-projects-list');
    const langData = translations[currentLanguage]?.projects;
    
    if (!langData || !langData.ongoing) return;
    
    container.innerHTML = '';
    
    for (let i = 1; i <= 10; i++) {
        const project = langData.ongoing[`project${i}`];
        if (!project) continue;
        
        const projectItem = document.createElement('div');
        projectItem.className = 'project-list-item';
        
        const statusClass = getStatusClass(project.status);
        const completionPercent = parseInt(project.completion) || 0;
        
        projectItem.innerHTML = `
            <h4>${project.title}</h4>
            ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
            <div class="project-details-grid">
                <div class="project-detail-item">
                    <strong><i class="bi bi-building"></i> ${langData.client}:</strong>
                    <span>${project.client}</span>
                </div>
                <div class="project-detail-item">
                    <strong><i class="bi bi-geo-alt"></i> ${langData.location}:</strong>
                    <span>${project.location}</span>
                </div>
                <div class="project-detail-item">
                    <strong><i class="bi bi-calendar-check"></i> ${langData.awardDate}:</strong>
                    <span>${project.awardDate}</span>
                </div>
            </div>
            <div class="progress-bar-container">
                <strong><i class="bi bi-bar-chart-fill"></i> ${langData.completion}:</strong>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${completionPercent}%">${project.completion}</div>
                </div>
            </div>
            <span class="status-badge ${statusClass}">${project.status}</span>
        `;
        
        container.appendChild(projectItem);
    }
}

// ============================================
// Get Status Badge Class
// ============================================
function getStatusClass(status) {
    if (!status) return 'status-ongoing';
    
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('completed') || statusLower.includes('tamamlandı')) {
        return 'status-completed';
    } else if (statusLower.includes('ongoing') || statusLower.includes('devam')) {
        return 'status-ongoing';
    } else if (statusLower.includes('suspended') || statusLower.includes('askı')) {
        return 'status-suspended';
    } else if (statusLower.includes('substantially') || statusLower.includes('büyük')) {
        return 'status-substantially';
    }
    
    return 'status-ongoing';
}


// ============================================
// Expose changeLanguage function globally
// ============================================
window.changeLanguage = changeLanguage;
window.switchProjectTab = switchProjectTab;


// ============================================
// Project Modal Gallery System
// ============================================

// Project data with image arrays and related project mapping
const projectData = {
    airport: {
        images: ['airport1.png', 'airport2.png', 'airport3.png'],
        completed: [1], // Project IDs related to airports (only project 1)
        ongoing: [] // No ongoing airport projects
    },
    hospital: {
        images: ['hospital1.png', 'hospital2.png', 'hospital3.png'],
        completed: [6, 7, 8, 9, 10], // Buildings: 6=Presidential Complex, 7=Christian Centre, 8=Presidential Library, 9=Hospital, 10=CBN Bank
        ongoing: [5, 7] // Buildings: 5=Christian Centre Rehab, 7=Osun Office (removed project 8)
    },
    road: {
        images: ['road1.png', 'road2.png', 'road3.png'],
        completed: [2, 3, 4, 5], // Roads/Infrastructure: 2=Abuja-Lokoja, 3=Oron Road, 4=Rigidi Bridge, 5=Nasarawa Road
        ongoing: [1, 2, 3, 4, 6, 10] // Roads/Infrastructure: 1=East-West, 2=Abuja-Lokoja, 3=Nassarawa-Loko, 4=Eket Bypass, 6=Omelema-Agada, 10=Itigidi Bridge
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
    const allProjects = translations[currentLanguage].projects;
    
    // Set modal title
    document.getElementById('projectModalTitle').textContent = langData.title;
    
    // Set type description
    document.getElementById('projectTypeDescription').textContent = langData.details;
    
    // Set photo caption
    document.getElementById('projectPhotoCaption').textContent = langData.photoCaption;
    
    // Load images
    loadProjectImages(project.images);
    
    // Populate completed projects
    const completedContainer = document.getElementById('modalCompletedProjects');
    completedContainer.innerHTML = '';
    
    if (project.completed && project.completed.length > 0) {
        project.completed.forEach(projectId => {
            const projectInfo = allProjects.completed[`project${projectId}`];
            if (projectInfo) {
                const projectItem = document.createElement('div');
                projectItem.className = 'modal-project-item';
                
                const statusClass = getStatusClass(projectInfo.status);
                
                projectItem.innerHTML = `
                    <h6>${projectInfo.title}</h6>
                    <div class="project-client">
                        <i class="bi bi-building"></i>
                        <span>${projectInfo.client}</span>
                    </div>
                    <span class="badge ${statusClass}">${projectInfo.status}</span>
                `;
                
                completedContainer.appendChild(projectItem);
            }
        });
    } else {
        completedContainer.innerHTML = `<p class="no-projects-message">${allProjects.noCompletedProjects}</p>`;
    }
    
    // Populate ongoing projects
    const ongoingContainer = document.getElementById('modalOngoingProjects');
    ongoingContainer.innerHTML = '';
    
    if (project.ongoing && project.ongoing.length > 0) {
        project.ongoing.forEach(projectId => {
            const projectInfo = allProjects.ongoing[`project${projectId}`];
            if (projectInfo) {
                const projectItem = document.createElement('div');
                projectItem.className = 'modal-project-item';
                
                const statusClass = getStatusClass(projectInfo.status);
                const completionPercent = parseInt(projectInfo.completion) || 0;
                
                projectItem.innerHTML = `
                    <h6>${projectInfo.title}</h6>
                    <div class="project-client">
                        <i class="bi bi-building"></i>
                        <span>${projectInfo.client}</span>
                    </div>
                    <div class="progress-bar-container mt-2">
                        <div class="progress-bar" style="height: 6px;">
                            <div class="progress-fill" style="width: ${completionPercent}%; height: 6px; font-size: 0; line-height: 0;"></div>
                        </div>
                        <small class="text-muted">${projectInfo.completion}</small>
                    </div>
                    <span class="badge ${statusClass}">${projectInfo.status}</span>
                `;
                
                ongoingContainer.appendChild(projectItem);
            }
        });
    } else {
        ongoingContainer.innerHTML = `<p class="no-projects-message">${allProjects.noOngoingProjects}</p>`;
    }
    
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

