(() => {
    const introKey = 'damnresize-intro-shown';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    try {
        if (sessionStorage.getItem(introKey)) return;
        sessionStorage.setItem(introKey, 'true');
    } catch (error) {
        console.warn('Could not store the intro animation preference for this tab:', error);
    }

    const introStyles = document.createElement('style');
    introStyles.textContent = `
        html.site-intro-pending::before,
        html.site-intro-pending::after {
            position: fixed;
            inset: 0;
            z-index: 2147483000;
            pointer-events: none;
            content: "";
            animation: site-intro-curtain 2s ease both;
        }
        html.site-intro-pending::before {
            background:
                radial-gradient(ellipse at center, rgb(49 46 129 / 0.34), transparent 42%),
                #080d1b;
        }
        html.site-intro-pending::after {
            background-image:
                linear-gradient(90deg, #6366f1, #f59e0b),
                url("damnresize-v4-dark.svg");
            background-repeat: no-repeat;
            background-position: center calc(50% + 3rem), center;
            background-size: 5rem 2px, min(68vw, 19rem) auto;
            filter: drop-shadow(0 0 30px rgb(99 102 241 / 0.22));
            animation-name: site-intro-logo;
        }
        @keyframes site-intro-curtain {
            0%, 78% { opacity: 1; }
            100% { opacity: 0; visibility: hidden; }
        }
        @keyframes site-intro-logo {
            0% { opacity: 0; transform: scale(0.94); }
            18% { opacity: 1; transform: scale(1); }
            78% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.02); visibility: hidden; }
        }
    `;
    document.head.append(introStyles);
    document.documentElement.classList.add('site-intro-pending');

    window.setTimeout(() => {
        document.documentElement.classList.remove('site-intro-pending');
        introStyles.remove();
    }, 2000);
})();
