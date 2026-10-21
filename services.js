// Modal functionality
const cards = document.querySelectorAll('.modern-card');
const modal = document.querySelector('.modern-modal');
const overlay = document.querySelector('.modern-modal-overlay');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalBadge = document.getElementById('modalBadge');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const imageCounter = document.getElementById('imageCounter');
const galleryDots = document.getElementById('galleryDots');
const searchInput = document.getElementById('searchInput');

let currentImages = [];
let currentIndex = 0;

// Set active filter based on current page
function setCurrentPageFilter() {
    const currentPage = window.location.pathname.split('/').pop();
    console.log('Current page detected:', currentPage);
    
    // Handle both with and without .html extension
    const filterMap = {
        'allbuilding': 'all',
        'allbuilding.html': 'all',
        'administrative': 'administrative',
        'administrative.html': 'administrative', 
        'academic': 'academic',
        'academic.html': 'academic',
        'laboratories': 'laboratories',
        'laboratories.html': 'laboratories',
        'sports': 'sports',
        'sports.html': 'sports',
        'services': 'services',
        'services.html': 'services',
        '': 'all' // Handle root or empty case
    };
    
    // Normalize the page name for comparison (remove .html if present)
    const normalizedPage = currentPage.toLowerCase();
    const currentFilter = filterMap[normalizedPage];
    
    console.log('Looking for filter:', normalizedPage, 'Found:', currentFilter);
    
    if (currentFilter) {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to current page's button
        const activeButton = document.querySelector(`[data-filter="${currentFilter}"]`);
        if (activeButton) {
            console.log('Setting active button for:', currentFilter);
            activeButton.classList.add('active');
        } else {
            console.log('Button not found for filter:', currentFilter);
        }
    } else {
        console.log('No filter mapping found for page:', currentPage);
        // Default to 'all' if no match found
        const allButton = document.querySelector('[data-filter="all"]');
        if (allButton) {
            allButton.classList.add('active');
        }
    }
}

// FIXED: Filter button functionality - NO DELAY
function setActiveFilter(clickedButton, pageUrl) {
    console.log('Navigating to:', pageUrl);
    
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    clickedButton.classList.add('active');
    
    // Check if we're on Netlify (no .html extension in current URL)
    const currentUrl = window.location.href;
    const isNetlify = !currentUrl.includes('.html');
    
    let finalUrl = pageUrl;
    
    // If on Netlify and pageUrl ends with .html, remove the extension
    if (isNetlify && pageUrl.endsWith('.html')) {
        finalUrl = pageUrl.replace('.html', '');
        console.log('Netlify detected, using URL:', finalUrl);
    }
    
    // Navigate IMMEDIATELY
    window.location.href = finalUrl;
}

// Open modal function
function openModal(card) {
    const title = card.getAttribute('data-title');
    const description = card.getAttribute('data-description');
    const images = card.getAttribute('data-images').split(',');
    const badgeType = card.querySelector('.card-badge').className.split(' ')[1];
    
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    currentImages = images;
    currentIndex = 0;
    
    // Update badge
    const badgeIcon = modalBadge.querySelector('i');
    const badgeText = modalBadge.querySelector('span');
    
    switch(badgeType) {
        case 'administrative':
            badgeIcon.className = 'bx bx-briefcase';
            badgeText.textContent = 'Administrative';
            break;
        case 'academic':
            badgeIcon.className = 'bx bx-book';
            badgeText.textContent = 'Academic';
            break;
        case 'laboratory':
            badgeIcon.className = 'bx bx-test-tube';
            badgeText.textContent = 'Laboratory';
            break;
        case 'sports':
            badgeIcon.className = 'bx bx-trophy';
            badgeText.textContent = 'Sports';
            break;
        case 'services':
            badgeIcon.className = 'bx bx-wrench';
            badgeText.textContent = 'Services';
            break;
    }
    
    updateGallery();
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModalFn() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Update gallery
function updateGallery() {
    modalImage.src = currentImages[currentIndex];
    modalImage.onerror = function() {
        this.src = 'School.jpg';
    };
    imageCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    
    // Update dots
    galleryDots.innerHTML = '';
    currentImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `gallery-dot ${index === currentIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateGallery();
        });
        galleryDots.appendChild(dot);
    });
}

// Event listeners
cards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
});

closeModal.addEventListener('click', closeModalFn);
overlay.addEventListener('click', closeModalFn);

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateGallery();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateGallery();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') closeModalFn();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
    }
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();
        const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
        card.style.display = isVisible ? 'block' : 'none';
    });
});

// Close modal function for external use
window.closeModal = closeModalFn;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setCurrentPageFilter();
});