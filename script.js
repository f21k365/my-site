document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const pages = document.querySelectorAll('.page');

    function showPage(targetId) {
        // Update page active state
        pages.forEach(page => {
            page.classList.remove('active');
            if (`#${page.id}` === targetId) {
                page.classList.add('active');
            }
        });

        // Update nav active state
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });

        // Update URL hash
        if (window.location.hash !== targetId) {
            window.history.pushState(null, '', targetId);
        }
    }

    // Initial page load
    const initialPageId = window.location.hash || '#landing-page';
    showPage(initialPageId);

    // Navigation click handling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            showPage(targetId);
        });
    });

    // Allow navigating back and forth with browser buttons
    window.addEventListener('popstate', () => {
        const targetId = window.location.hash || '#landing-page';
        showPage(targetId);
    });

    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const closeBtn = document.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.style.display = 'flex';
                document.body.classList.add('lightbox-open');
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            document.body.classList.remove('lightbox-open');
        };

        // Close by clicking the close button or the background
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});