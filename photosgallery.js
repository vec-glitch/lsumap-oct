// Sample photo data
const photos = [
    {
        id: 1,
        title: "Lorem",
        date: "Posted: Nov 1, 2025",
        description: "This is an example description of the place.",
        image: "Photos/Screenshot 2025-11-13 151807.png",
        tags: ["building", "administration"],
        category: "buildings"
    },
    {
        id: 2,
        title: "Lorem",
        date: "Posted: Nov 1, 2025",
        description: "This is an example description of the place.",
        image: "Photos/Screenshot 2025-11-13 151839.png",
        tags: ["building", "architecture"],
        category: "buildings"
    },
    {
        id: 3,
        title: "Lorem",
        date: "Posted: Nov 1, 2025",
        description: "This is an example description of the place.",
        image: "Photos/Screenshot 2025-11-13 151856.png",
        tags: ["technology", "lab"],
        category: "buildings"
    },
    {
        id: 4,
        title: "Lorem",
        date: "Posted: Nov 1, 2025",
        description: "This is an example description of the place.",
        image: "Photos/Screenshot 2025-11-13 151947.png",
        tags: ["library", "study"],
        category: "buildings"
    },
    {
        id: 5,
        title: "Lorem",
        date: "Posted: Nov 1, 2025",
        description: "This is an example description of the place..",
        image: "Photos/Screenshot 2025-11-13 152006.png",
        tags: ["study", "collaboration"],
        category: "campus"
    },
    {
        id: 6,
        title: "Lorem",
        date: "Posted: Nov 1, 2025",
        description: "This is an example description of the place.",
        image: "Photos/Screenshot 2025-11-13 152038.png",
        tags: ["nature", "outdoor"],
        category: "campus"
    },
    {
        id: 7,
        title: "Lorem",
        date: "Posted: Nov 1, 2025",
        description: "This is an example description of the place.",
        image: "Photos/Screenshot 2025-11-13 152051.png",
        tags: ["student life", "activities"],
        category: "campus"
    },
    {
        id: 8,
        title: "Lorem",
        date: "Posted: Nov 1, 2025",
        description: "This is an example description of the place.",
        image: "552620956_643970208557239_5210566450311857550_n.jpg",
        tags: ["sports", "fitness"],
        category: "campus"
    }
];

// DOM Elements
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.getElementById('closeModal');
const filterBtns = document.querySelectorAll('.filter-btn');
const viewBtns = document.querySelectorAll('.view-btn');
const searchInput = document.querySelector('.search-bar input');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentPhotoIndex = 0;
let filteredPhotos = [...photos];

// Initialize gallery
function initGallery() {
    renderGallery();
    setupEventListeners();
}

// Render gallery based on current filter
function renderGallery() {
    gallery.innerHTML = '';
    
    filteredPhotos.forEach((photo, index) => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.setAttribute('data-category', photo.category);
        photoCard.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}">
            <div class="card-hover">
                <h3 class="card-title">${photo.title}</h3>
                <p class="card-date"><i class='bx bx-calendar'></i> ${photo.date}</p>
                <div class="card-tags">
                    ${photo.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
                </div>
                <button class="view-details-btn" onclick="openModal(${index})">
                    <i class='bx bx-zoom-in'></i> View Details
                </button>
            </div>
        `;
        gallery.appendChild(photoCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterPhotos(filter);
            updateActiveFilter(btn);
        });
    });

    // View options
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            changeView(view);
            updateActiveView(btn);
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchPhotos(e.target.value);
    });

    // Modal navigation
    prevBtn.addEventListener('click', showPrevPhoto);
    nextBtn.addEventListener('click', showNextPhoto);

    // Close modal
    closeModal.addEventListener('click', closeModalFunc);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunc();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') closeModalFunc();
            if (e.key === 'ArrowLeft') showPrevPhoto();
            if (e.key === 'ArrowRight') showNextPhoto();
        }
    });
}

// Filter photos by category
function filterPhotos(category) {
    if (category === 'all') {
        filteredPhotos = [...photos];
    } else {
        filteredPhotos = photos.filter(photo => photo.category === category);
    }
    renderGallery();
}

// Update active filter button
function updateActiveFilter(activeBtn) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Change gallery view
function changeView(view) {
    gallery.className = 'gallery';
    if (view === 'masonry') {
        gallery.classList.add('masonry-view');
    }
}

// Update active view button
function updateActiveView(activeBtn) {
    viewBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Search photos
function searchPhotos(query) {
    const searchTerm = query.toLowerCase();
    filteredPhotos = photos.filter(photo => 
        photo.title.toLowerCase().includes(searchTerm) ||
        photo.description.toLowerCase().includes(searchTerm) ||
        photo.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    renderGallery();
}

// Open modal with photo details
function openModal(index) {
    currentPhotoIndex = index;
    const photo = filteredPhotos[index];
    
    modalImage.src = photo.image;
    modalTitle.textContent = photo.title;
    modalDate.textContent = photo.date;
    modalDesc.textContent = photo.description;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModalFunc() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show previous photo in modal
function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    openModal(currentPhotoIndex);
}

// Show next photo in modal
function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
    openModal(currentPhotoIndex);
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', initGallery);