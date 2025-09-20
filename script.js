document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a:not(.lang-switcher a)');
    const pages = document.querySelectorAll('.page');
    const langSwitchers = document.querySelectorAll('.lang-switcher a');

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);

        document.querySelectorAll('[lang]').forEach(el => {
            el.style.display = el.lang === lang ? '' : 'none';
        });

        langSwitchers.forEach(switcher => {
            switcher.classList.toggle('active', switcher.dataset.lang === lang);
        });
    }

    function showPage(targetId) {
        pages.forEach(page => {
            page.classList.toggle('active', `#${page.id}` === targetId);
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === targetId);
        });

        document.body.classList.toggle('gallery-active', targetId === '#main-page');

        if (window.location.hash !== targetId) {
            window.history.pushState(null, '', targetId);
        }
    }

    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(switcher.dataset.lang);
        });
    });

    const initialPageId = window.location.hash || '#landing-page';
    showPage(initialPageId);

    const savedLang = localStorage.getItem('lang') || 'ja';
    setLanguage(savedLang);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            showPage(targetId);
        });
    });

    window.addEventListener('popstate', () => {
        const targetId = window.location.hash || '#landing-page';
        showPage(targetId);
    });

    // Create cherry blossom petals with new logic
    const petalsContainer = document.querySelector('.petals-container');
    if (petalsContainer) {
        const numberOfPetals = 30;

        for (let i = 0; i < numberOfPetals; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            // 1. Vary petal sizes (subtler range)
            const size = Math.random() * 5 + 8; // 8px to 13px
            
            // 2. Slow down the fall speed
            const duration = Math.random() * 15 + 20; // 20s to 35s
            
            const initialX = Math.random() * 100;
            const delay = Math.random() * 15;

            petal.style.width = `${size}px`;
            petal.style.height = `${size * 0.7}px`;
            petal.style.left = `${initialX}vw`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;

            // 3. Add lilac-colored petals
            if (Math.random() < 0.07) { // Approx 2 petals out of 30
                petal.style.backgroundColor = '#C8A2C8'; // Lilac color
            }
            
            petalsContainer.appendChild(petal);
        }

        // 4. React to page scroll (mouse wheel)
        let currentY = 0;
        const maxWobble = 25; // Max pixels the container will move up/down

        window.addEventListener('wheel', (e) => {
            // Add a small vertical "wobble" based on scroll direction
            currentY += e.deltaY > 0 ? -4 : 4;
            currentY = Math.max(-maxWobble, Math.min(maxWobble, currentY)); // Clamp the value
            petalsContainer.style.transform = `translateY(${currentY}px)`;
        }, { passive: true });

        // Add a "friction" effect to slowly return to center
        setInterval(() => {
            if (Math.abs(currentY) < 0.5) {
                currentY = 0;
            } else {
                currentY *= 0.96; // Slowly decay the wobble effect
            }
            petalsContainer.style.transform = `translateY(${currentY}px)`;
        }, 50);
    }
});