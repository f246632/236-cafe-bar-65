// ===================================
// Gallery & Lightbox Functionality
// Café Bar 65
// ===================================

(function() {
    'use strict';

    // ===================================
    // Gallery Configuration
    // ===================================

    const galleryImages = [
        {
            src: './images/optimized/cafe-1.jpg',
            caption: 'Café Bar 65 Exterior'
        },
        {
            src: './images/optimized/cafe-2.jpg',
            caption: 'Cozy Interior Atmosphere'
        },
        {
            src: './images/optimized/cafe-3.jpg',
            caption: 'Our Warm Fireplace'
        },
        {
            src: './images/optimized/cafe-4.jpg',
            caption: 'Delicious Food Selection'
        },
        {
            src: './images/optimized/cafe-5.jpg',
            caption: 'Specialty Coffee & Drinks'
        },
        {
            src: './images/optimized/cafe-6.jpg',
            caption: 'Perfect for Gatherings'
        },
        {
            src: './images/optimized/cafe-7.jpg',
            caption: 'Live Music Events'
        },
        {
            src: './images/optimized/cafe-8.jpg',
            caption: 'Fresh Baked Goods'
        },
        {
            src: './images/optimized/cafe-9.jpg',
            caption: 'Comfortable Seating'
        },
        {
            src: './images/optimized/cafe-10.jpg',
            caption: 'Community Hub'
        }
    ];

    // ===================================
    // Generate Gallery Grid
    // ===================================

    const galleryGrid = document.getElementById('galleryGrid');

    if (galleryGrid) {
        galleryImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-aos', 'fade-up');
            galleryItem.setAttribute('data-aos-delay', (index % 3) * 100);
            galleryItem.setAttribute('data-index', index);

            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}" loading="lazy">
                <div class="gallery-overlay">
                    <span class="gallery-caption">${image.caption}</span>
                </div>
            `;

            galleryGrid.appendChild(galleryItem);
        });
    }

    // ===================================
    // Lightbox Functionality
    // ===================================

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImageIndex = 0;

    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Update lightbox image
    function updateLightboxImage() {
        const image = galleryImages[currentImageIndex];
        lightboxImg.src = image.src;
        lightboxImg.alt = image.caption;
        lightboxCaption.textContent = image.caption;
    }

    // Navigate to previous image
    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }

    // Navigate to next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }

    // Event listeners for gallery items
    galleryGrid?.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const index = parseInt(galleryItem.getAttribute('data-index'));
            openLightbox(index);
        }
    });

    // Event listeners for lightbox controls
    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', showPreviousImage);
    lightboxNext?.addEventListener('click', showNextImage);

    // Close lightbox on background click
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Touch/Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - show next image
                showNextImage();
            } else {
                // Swiped right - show previous image
                showPreviousImage();
            }
        }
    }

    // ===================================
    // Image Preloading for Better UX
    // ===================================

    function preloadImages() {
        galleryImages.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });
    }

    // Preload images after page load
    if (document.readyState === 'complete') {
        preloadImages();
    } else {
        window.addEventListener('load', preloadImages);
    }

    // ===================================
    // Gallery Filter/Sort (Optional Enhancement)
    // ===================================

    // This section is prepared for future enhancements
    // You could add category filters like: Interior, Food, Events, etc.

    const galleryCategories = {
        all: galleryImages,
        interior: galleryImages.filter((_, i) => [1, 2, 5, 8].includes(i)),
        food: galleryImages.filter((_, i) => [3, 4, 7].includes(i)),
        events: galleryImages.filter((_, i) => [6, 9].includes(i))
    };

    // ===================================
    // Accessibility Enhancements
    // ===================================

    // Add ARIA labels
    if (lightbox) {
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image gallery lightbox');
    }

    // Focus management
    let lastFocusedElement;

    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        });
    }

    // Apply focus trap to lightbox
    if (lightbox) {
        trapFocus(lightbox);

        // Save last focused element before opening lightbox
        const originalOpenLightbox = openLightbox;
        openLightbox = function(index) {
            lastFocusedElement = document.activeElement;
            originalOpenLightbox(index);
            lightboxClose.focus();
        };

        // Restore focus when closing lightbox
        const originalCloseLightbox = closeLightbox;
        closeLightbox = function() {
            originalCloseLightbox();
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        };
    }

    // ===================================
    // Performance: Intersection Observer for Gallery
    // ===================================

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Observe gallery images after a short delay
        setTimeout(() => {
            document.querySelectorAll('.gallery-item img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }, 100);
    }

    // ===================================
    // Console Message
    // ===================================

    console.log('%c📸 Gallery loaded with ' + galleryImages.length + ' images',
                'color: #8B4513; font-weight: bold;');

})();
