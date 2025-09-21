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

    // Create cherry blossom petals for relevant pages
    document.querySelectorAll('.petals-container').forEach(container => {
        const parentId = container.closest('.page').id;
        let numberOfPetals = 0;

        if (parentId === 'landing-page') {
            numberOfPetals = 30;
        } else if (parentId === 'message-page' || parentId === 'philosophy-page') {
            numberOfPetals = 2;
        }

        if (numberOfPetals > 0) {
            for (let i = 0; i < numberOfPetals; i++) {
                const petal = document.createElement('div');
                petal.classList.add('petal');
                
                const size = Math.random() * 15 + 25; // Further increased size
                const duration = Math.random() * 15 + 20;
                const initialX = Math.random() * 100;
                const delay = Math.random() * 15;

                petal.style.width = `${size}px`;
                petal.style.height = `${size}px`; // Adjusted for new shape
                petal.style.left = `${initialX}vw`;
                petal.style.animationDuration = `${duration}s`;
                petal.style.animationDelay = `${delay}s`;

                // Add lilac-colored petals (rarely)
                if (Math.random() < 0.07) {
                    petal.classList.add('lilac');
                }
                
                container.appendChild(petal);
            }
        }

        // Only add the scroll interaction to the landing page container
        if (parentId === 'landing-page') {
            let currentY = 0;
            const maxWobble = 25;

            window.addEventListener('wheel', (e) => {
                currentY += e.deltaY > 0 ? -4 : 4;
                currentY = Math.max(-maxWobble, Math.min(maxWobble, currentY));
                container.style.transform = `translateY(${currentY}px)`;
            }, { passive: true });

            setInterval(() => {
                if (Math.abs(currentY) < 0.5) {
                    currentY = 0;
                } else {
                    currentY *= 0.96;
                }
                container.style.transform = `translateY(${currentY}px)`;
            }, 50);
        }
    });
});