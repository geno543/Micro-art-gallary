// Sample artwork data
const artworks = [
    {
        imageUrl: './images/abstract1.jpg',
        title: 'Abstract Harmony',
        artist: 'Sarah Johnson',
        description: 'A vibrant exploration of color and form, creating a dynamic interplay of shapes and emotions.',
        category: 'abstract',
        year: '2023',
        likes: 0,
        thumbnailUrl: './images/abstract1-thumb.jpg'
    },
    {
        imageUrl: './images/abstract2.jpg',
        title: 'Chromatic Dreams',
        artist: 'Sarah Johnson',
        description: 'An explosion of colors that represents the complexity of human emotions and dreams.',
        category: 'abstract',
        year: '2023',
        likes: 0,
        thumbnailUrl: './images/abstract2-thumb.jpg'
    },
    {
        imageUrl: './images/abstract3.jpg',
        title: 'Geometric Symphony',
        artist: 'David Anderson',
        description: 'A harmonious arrangement of geometric shapes creating a mesmerizing visual rhythm.',
        category: 'abstract',
        year: '2023',
        likes: 0,
        thumbnailUrl: './images/abstract3-thumb.jpg'
    },
    {
        imageUrl: './images/modern1.jpg',
        title: 'Urban Dreams',
        artist: 'Michael Chen',
        description: 'A contemporary piece reflecting the energy and complexity of modern city life.',
        category: 'modern',
        year: '2023',
        likes: 0,
        thumbnailUrl: './images/modern1-thumb.jpg'
    },
    {
        imageUrl: './images/modern2.jpg',
        title: 'Metropolitan Pulse',
        artist: 'Michael Chen',
        description: 'Capturing the rhythmic heartbeat of urban life through bold strokes and vivid colors.',
        category: 'modern',
        year: '2023',
        likes: 0,
        thumbnailUrl: './images/modern2-thumb.jpg'
    },
    {
        imageUrl: './images/modern3.jpg',
        title: 'Future Nostalgia',
        artist: 'Lisa Wong',
        description: 'A fusion of retro elements with futuristic concepts, creating a timeless modern piece.',
        category: 'modern',
        year: '2023',
        likes: 0,
        thumbnailUrl: './images/modern3-thumb.jpg'
    },
    {
        imageUrl: './images/nature1.jpg',
        title: 'Nature\'s Whisper',
        artist: 'Emma Davis',
        description: 'An intimate portrayal of natural elements, capturing the delicate balance of ecosystem.',
        category: 'nature',
        year: '2022',
        likes: 0,
        thumbnailUrl: './images/nature1-thumb.jpg'
    },
    {
        imageUrl: './images/nature2.jpg',
        title: 'Forest Dreams',
        artist: 'Emma Davis',
        description: 'A mystical journey through an enchanted forest, where light dances through ancient trees.',
        category: 'nature',
        year: '2023',
        likes: 0,
        thumbnailUrl: './images/nature2-thumb.jpg'
    },
    {
        imageUrl: './images/nature3.jpg',
        title: 'Ocean\'s Soul',
        artist: 'Thomas Martinez',
        description: 'Diving deep into the mysteries of marine life, revealing the beauty beneath the waves.',
        category: 'nature',
        year: '2023',
        likes: 0,
        thumbnailUrl: './images/nature3-thumb.jpg'
    },
    {
        imageUrl: './images/digital1.jpg',
        title: 'Digital Frontier',
        artist: 'Alex Rivera',
        description: 'A fusion of traditional art and digital techniques, exploring the boundaries of modern creativity.',
        category: 'digital',
        year: '2023',
        likes: 0,
        thumbnailUrl: './images/digital1-thumb.jpg'
    },
    {
        imageUrl: './images/digital2.jpg',
        title: 'Cyber Dreams',
        artist: 'Alex Rivera',
        description: 'An exploration of the digital realm, where reality and virtuality merge into one.',
        category: 'digital',
        year: '2023',
        likes: 0,
        thumbnailUrl: './images/digital2-thumb.jpg'
    },
    {
        imageUrl: './images/digital3.jpg',
        title: 'Virtual Renaissance',
        artist: 'Maya Patel',
        description: 'A modern take on classical art themes, rendered through cutting-edge digital techniques.',
        category: 'digital',
        year: '2023',
        likes: 0,
        thumbnailUrl: './images/digital3-thumb.jpg'
    }
];

// DOM Elements
const gallery = document.getElementById('gallery');
const gridGallery = document.getElementById('gridGallery');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close-btn');
const searchInput = document.getElementById('searchInput');
const gridViewBtn = document.getElementById('gridViewBtn');
const slideViewBtn = document.getElementById('slideViewBtn');
const categoryBtns = document.querySelectorAll('.category-btn');

let currentIndex = 0;
let autoRotateInterval;
let filteredArtworks = [...artworks];
let currentView = 'slide';

// Initialize gallery
function initGallery() {
    updateGalleryView();
    startAutoRotate();
    updateGridView();
}

// Update gallery based on current view
function updateGalleryView() {
    gallery.innerHTML = '';
    filteredArtworks.forEach((artwork, index) => {
        const artworkDiv = document.createElement('div');
        artworkDiv.className = 'artwork';
        artworkDiv.innerHTML = `<img src="${artwork.imageUrl}" alt="${artwork.title}">`;
        gallery.appendChild(artworkDiv);
    });
    updateGalleryTransform();
}

function updateGridView() {
    gridGallery.innerHTML = '';
    filteredArtworks.forEach((artwork, index) => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerHTML = `
            <img src="${artwork.thumbnailUrl}" alt="${artwork.title}">
            <div class="grid-item-info">
                <h3>${artwork.title}</h3>
                <p>${artwork.artist}</p>
            </div>
        `;
        gridItem.addEventListener('click', () => showModal(index));
        gridGallery.appendChild(gridItem);
    });
}

// Navigation functions
function updateGalleryTransform() {
    gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function goToSlide(index) {
    currentIndex = index;
    updateGalleryTransform();
    resetAutoRotate();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % filteredArtworks.length;
    updateGalleryTransform();
    resetAutoRotate();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + filteredArtworks.length) % filteredArtworks.length;
    updateGalleryTransform();
    resetAutoRotate();
}

// Modal functions
function showModal(index) {
    const artwork = filteredArtworks[index];
    document.getElementById('modalImage').src = artwork.imageUrl;
    document.getElementById('artTitle').textContent = artwork.title;
    document.getElementById('artArtist').textContent = `By ${artwork.artist}`;
    document.getElementById('artDescription').textContent = artwork.description;
    document.getElementById('artCategory').textContent = artwork.category;
    document.getElementById('artYear').textContent = artwork.year;
    
    const likeBtn = document.getElementById('likeBtn');
    likeBtn.innerHTML = `
        <i class="${artwork.likes > 0 ? 'fas' : 'far'} fa-heart"></i>
        <span>${artwork.likes} ${artwork.likes === 1 ? 'Like' : 'Likes'}</span>
    `;
    
    modal.style.display = 'block';
    resetAutoRotate();
}

function closeModal() {
    modal.style.display = 'none';
    startAutoRotate();
}

// Auto-rotate functions
function startAutoRotate() {
    if (currentView === 'slide') {
        stopAutoRotate();
        autoRotateInterval = setInterval(nextSlide, 5000);
    }
}

function stopAutoRotate() {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
    }
}

function resetAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
}

// Search functionality
function filterArtworks() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    
    filteredArtworks = artworks.filter(artwork => {
        const matchesSearch = artwork.title.toLowerCase().includes(searchTerm) ||
                            artwork.artist.toLowerCase().includes(searchTerm) ||
                            artwork.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = activeCategory === 'all' || artwork.category === activeCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    currentIndex = 0;
    updateGalleryView();
    updateGridView();
}

// View toggle functions
function setView(view) {
    currentView = view;
    if (view === 'grid') {
        gallery.parentElement.style.display = 'none';
        gridGallery.style.display = 'grid';
        stopAutoRotate();
    } else {
        gallery.parentElement.style.display = 'block';
        gridGallery.style.display = 'none';
        startAutoRotate();
    }
}

// Like functionality
function toggleLike() {
    const artwork = filteredArtworks[currentIndex];
    const originalArtwork = artworks.find(art => art.title === artwork.title);
    originalArtwork.likes = originalArtwork.likes === 0 ? 1 : 0;
    showModal(currentIndex);
}

// Share functionality
function shareArtwork() {
    const artwork = filteredArtworks[currentIndex];
    if (navigator.share) {
        navigator.share({
            title: artwork.title,
            text: `Check out "${artwork.title}" by ${artwork.artist}`,
            url: window.location.href
        }).catch(console.error);
    } else {
        alert('Sharing is not supported on this browser');
    }
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
closeBtn.addEventListener('click', closeModal);
searchInput.addEventListener('input', filterArtworks);
gridViewBtn.addEventListener('click', () => setView('grid'));
slideViewBtn.addEventListener('click', () => setView('slide'));
document.getElementById('likeBtn').addEventListener('click', toggleLike);
document.querySelector('.share-btn').addEventListener('click', shareArtwork);

categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        filterArtworks();
    });
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            prevSlide();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
        case 'Escape':
            closeModal();
            break;
    }
});

// Initialize gallery
initGallery();
