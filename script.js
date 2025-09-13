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

        // Conditionally enable body scrolling for gallery
        if (targetId === '#main-page') {
            document.body.classList.add('gallery-active');
        } else {
            document.body.classList.remove('gallery-active');
        }

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
});