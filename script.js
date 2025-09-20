document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a:not(.lang-switcher a)');
    const pages = document.querySelectorAll('.page');
    const langSwitchers = document.querySelectorAll('.lang-switcher a');

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        // Show/hide elements based on lang attribute
        document.querySelectorAll('[lang]').forEach(el => {
            if (el.lang === lang) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });

        // Update active class on switcher
        langSwitchers.forEach(switcher => {
            if (switcher.dataset.lang === lang) {
                switcher.classList.add('active');
            } else {
                switcher.classList.remove('active');
            }
        });
    }

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

    // Language switcher handling
    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(switcher.dataset.lang);
        });
    });

    // Initial page load
    const initialPageId = window.location.hash || '#landing-page';
    showPage(initialPageId);

    // Set initial language
    const savedLang = localStorage.getItem('lang') || 'ja';
    setLanguage(savedLang);

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

    // Create cherry blossom petals
    const petalsContainer = document.querySelector('.petals-container');
    const numberOfPetals = 30;

    for (let i = 0; i < numberOfPetals; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        const size = Math.random() * 10 + 5; // 5px to 15px
        const initialX = Math.random() * 100;
        const duration = Math.random() * 10 + 10; // 10s to 20s
        const delay = Math.random() * 10;

        petal.style.width = `${size}px`;
        petal.style.height = `${size * 0.7}px`;
        petal.style.left = `${initialX}vw`;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        
        petalsContainer.appendChild(petal);
    }
});