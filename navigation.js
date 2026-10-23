(() => {
    const header = document.querySelector('body > header');
    if (!header) return;

    header.className = 'site-header';
    header.innerHTML = `
        <div class="site-nav-shell">
            <a href="/" class="site-logo" aria-label="DamnResize.in home">
                <img src="damnresize-v4-dark.svg" alt="DamnResize.in Logo">
            </a>
            <button class="site-nav-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="site-navigation">
                <svg class="site-nav-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke-width="2" stroke-linecap="round"></path></svg>
                <svg class="site-nav-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke-width="2" stroke-linecap="round"></path></svg>
            </button>
            <nav class="site-navigation" id="site-navigation" aria-label="Main navigation">
                <a href="/" data-nav-link>Home</a>
                <a href="/#tools" data-nav-link>All Tools</a>
                <a href="ImageGenerator.html" data-nav-link>AI Image Studio</a>
                <a href="document-scanner.html" data-nav-link class="site-nav-scan">
                    <span class="site-nav-item-icon icon-cyan" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5a1 1 0 0 1 1-1h2m10 0h2a1 1 0 0 1 1 1v2M4 17v2a1 1 0 0 0 1 1h2m10 0h2a1 1 0 0 0 1-1v-2"></path><path d="M7 9h10v7H7zM9 12h6m-6 2h4"></path></svg></span>
                    <span>Scan to PDF</span>
                </a>
                <div class="site-nav-dropdown" data-nav-group>
                    <button class="site-nav-trigger" type="button" aria-expanded="false">
                        <svg class="site-nav-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M8 10h.01M12 10h.01M16 10h.01"></path></svg>
                        Govt Exam Photo
                        <svg class="site-nav-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </button>
                    <div class="site-nav-menu site-nav-category-menu">
                        <a href="exams.html" data-nav-link><span class="site-nav-item-icon icon-indigo" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M8 10h.01M12 10h.01M16 10h.01"></path></svg></span>Govt Exam Photo</a>
                        <a href="AddText.html" data-nav-link><span class="site-nav-item-icon icon-pink" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10.5-10.5a2.12 2.12 0 0 0-4-4L4 16v4Z"></path><path d="m13.5 6.5 4 4M12 20h8"></path></svg></span>Add Text</a>
                    </div>
                </div>
                <div class="site-nav-dropdown" data-nav-group>
                    <button class="site-nav-trigger" type="button" aria-expanded="false">
                        <svg class="site-nav-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="2"></rect><rect x="13" y="3" width="8" height="8" rx="2"></rect><rect x="3" y="13" width="8" height="8" rx="2"></rect><rect x="13" y="13" width="8" height="8" rx="2"></rect></svg>
                        Image Tools
                        <svg class="site-nav-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </button>
                    <div class="site-nav-menu site-nav-image-menu">
                        <a href="resizer.html" data-nav-link><span class="site-nav-item-icon icon-indigo" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3M8 8 3 3m13 5 5-5M8 16l-5 5m13-5 5 5"></path></svg></span>Image Resizer</a>
                        <a href="crop.html" data-nav-link><span class="site-nav-item-icon icon-pink" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v12a3 3 0 0 0 3 3h12M3 6h12a3 3 0 0 1 3 3v12"></path></svg></span>Crop Image</a>
                        <a href="compress.html" data-nav-link><span class="site-nav-item-icon icon-emerald" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 3l6 6m12-6-6 6M8 21H5a2 2 0 0 1-2-2v-3m13 5h3a2 2 0 0 0 2-2v-3m-6-3 6 6m-12-6-6 6"></path></svg></span>Image Compressor</a>
                        <a href="convert.html" data-nav-link><span class="site-nav-item-icon icon-amber" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6m-8 3v7m-3-3 3 3 3-3"></path></svg></span>Format Converter</a>
                        <a href="utilities.html" data-nav-link><span class="site-nav-item-icon icon-blue" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 7 17 4a3 3 0 0 1 4 4l-3 3M10 17l-3 3a3 3 0 0 1-4-4l3-3m3-3 5-5m-3 11 5-5"></path><path d="m8 8 8 8"></path></svg></span>Utility Toolkit</a>
                        <a href="bulk.html" data-nav-link><span class="site-nav-item-icon icon-rose" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 10 5-10 5L2 7l10-5Z"></path><path d="m2 12 10 5 10-5M2 17l10 5 10-5"></path></svg></span>Bulk Processing</a>
                    </div>
                </div>
                <div class="site-nav-dropdown" data-nav-group>
                    <button class="site-nav-trigger" type="button" aria-expanded="false">
                        <svg class="site-nav-label-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke-width="1.7" stroke-linejoin="round"></path><path d="M14 3v5h5M8 15h8M8 18h6" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        PDF Tools
                        <svg class="site-nav-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </button>
                    <div class="site-nav-menu site-nav-pdf-menu">
                        <div>
                            <p>Convert to PDF</p>
                            <a href="jpg-to-pdf.html" data-nav-link><span class="site-nav-item-icon icon-amber" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="8.5" cy="9" r="1.5"></circle><path d="m21 15-5-5L5 20"></path></svg></span>JPG to PDF</a>
                            <a href="word-to-pdf.html" data-nav-link><span class="site-nav-item-icon icon-blue" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"></path><path d="M14 3v5h5M8 13h8M8 17h8"></path></svg></span>WORD to PDF</a>
                            <a href="ppt-to-pdf.html" data-nav-link><span class="site-nav-item-icon icon-orange" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M12 17v4m-4 0h8M8 13V9m4 4V6m4 7v-5"></path></svg></span>POWERPOINT to PDF</a>
                            <a href="excel-to-pdf.html" data-nav-link><span class="site-nav-item-icon icon-emerald" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M4 9h16M4 15h16M10 3v18M16 3v18"></path></svg></span>EXCEL to PDF</a>
                            <a href="html-to-pdf.html" data-nav-link><span class="site-nav-item-icon icon-yellow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18"></path></svg></span>HTML to PDF</a>
                        </div>
                        <div>
                            <p>Convert from PDF</p>
                            <a href="pdf-to-jpg.html" data-nav-link><span class="site-nav-item-icon icon-amber" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="8.5" cy="9" r="1.5"></circle><path d="m21 15-5-5L5 20"></path></svg></span>PDF to JPG</a>
                            <a href="pdf-to-word.html" data-nav-link><span class="site-nav-item-icon icon-blue" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"></path><path d="M14 3v5h5M8 13h8M8 17h8"></path></svg></span>PDF to WORD</a>
                            <a href="pdf-to-ppt.html" data-nav-link><span class="site-nav-item-icon icon-orange" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M12 17v4m-4 0h8M8 13V9m4 4V6m4 7v-5"></path></svg></span>PDF to POWERPOINT</a>
                            <a href="pdf-to-excel.html" data-nav-link><span class="site-nav-item-icon icon-emerald" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M4 9h16M4 15h16M10 3v18M16 3v18"></path></svg></span>PDF to EXCEL</a>
                            <a href="pdf-to-pdfa.html" data-nav-link><span class="site-nav-item-icon icon-indigo" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"></path><path d="m9 12 2 2 4-4"></path></svg></span>PDF to PDF/A</a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>`;
    header.style.visibility = 'visible';

    const updateActiveNavigation = () => {
        const currentUrl = new URL(window.location.href);
        let currentPath = currentUrl.pathname.toLowerCase().replace(/\/$/, '/index.html');
        if (currentPath.endsWith('/index.htm')) {
            currentPath = currentPath.slice(0, -'index.htm'.length) + 'index.html';
        }

        header.querySelectorAll('[data-nav-link]').forEach((link) => {
            const target = new URL(link.href, currentUrl);
            const samePage = target.pathname.toLowerCase() === currentPath;
            const isActive = target.hash
                ? samePage && target.hash === currentUrl.hash
                : samePage && !currentUrl.hash;

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        header.querySelectorAll('[data-nav-group]').forEach((group) => {
            const activeLink = group.querySelector('[data-nav-link][aria-current="page"]');
            const trigger = group.querySelector('.site-nav-trigger');
            if (activeLink) {
                trigger.setAttribute('aria-current', 'page');
            } else {
                trigger.removeAttribute('aria-current');
            }
        });
    };

    updateActiveNavigation();
    window.addEventListener('hashchange', updateActiveNavigation);

    const mobileNavigation = window.matchMedia('(max-width: 767px)');
    const menuToggle = header.querySelector('.site-nav-toggle');

    const setDropdownState = (group, isOpen) => {
        const trigger = group.querySelector('.site-nav-trigger');
        group.classList.toggle('is-open', isOpen);
        trigger.setAttribute('aria-expanded', String(isOpen));
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = header.classList.toggle('menu-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        if (!isOpen) {
            header.querySelectorAll('[data-nav-group].is-open').forEach((group) => setDropdownState(group, false));
        }
    });

    header.querySelectorAll('[data-nav-group] .site-nav-trigger').forEach((trigger) => {
        trigger.addEventListener('click', () => {
            if (!mobileNavigation.matches) return;
            const group = trigger.closest('[data-nav-group]');
            const isOpen = !group.classList.contains('is-open');
            header.querySelectorAll('[data-nav-group].is-open').forEach((openGroup) => {
                if (openGroup !== group) setDropdownState(openGroup, false);
            });
            setDropdownState(group, isOpen);
        });
    });

    header.querySelectorAll('.site-navigation a').forEach((link) => {
        link.addEventListener('click', () => {
            if (!mobileNavigation.matches) return;
            header.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });

    mobileNavigation.addEventListener('change', () => {
        header.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        header.querySelectorAll('[data-nav-group].is-open').forEach((group) => setDropdownState(group, false));
    });
})();

const navigationStyles = document.createElement('style');
navigationStyles.textContent = `
    .site-header {
        position: sticky;
        top: 0;
        z-index: 50;
        padding: 0.5rem 1.25rem;
        border-bottom: 1px solid #1e293b;
        background: rgba(15, 23, 42, 0.92);
        backdrop-filter: blur(12px);
    }
    .site-nav-shell {
        display: flex;
        width: 100%;
        max-width: 112rem;
        margin: 0 auto;
        align-items: center;
        justify-content: space-between;
        column-gap: 1rem;
    }
    .site-logo { display: flex; align-items: center; flex: 0 0 auto; }
    .site-logo img { display: block; width: auto; height: 3.5rem; object-fit: contain; }
    .site-nav-toggle {
        display: inline-flex;
        width: 2.5rem;
        height: 2.5rem;
        align-items: center;
        justify-content: center;
        border: 1px solid #334155;
        border-radius: 0.65rem;
        background: #0f172a;
        color: #cbd5e1;
        cursor: pointer;
    }
    .site-nav-toggle svg { width: 1.25rem; height: 1.25rem; }
    .site-nav-close-icon { display: none; }
    .menu-open .site-nav-menu-icon { display: none; }
    .menu-open .site-nav-close-icon { display: block; }
    .site-navigation {
        display: none;
        position: absolute;
        top: calc(100% + 0.5rem);
        left: 0;
        right: 0;
        max-height: calc(100vh - 5rem);
        overflow-y: auto;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        padding: 0.75rem;
        border: 1px solid #1e293b;
        border-radius: 0.9rem;
        background: #0f172a;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.35);
        color: #cbd5e1;
        font-size: 0.8rem;
        font-weight: 500;
    }
    .menu-open .site-navigation { display: flex; }
    .site-navigation > a,
    .site-nav-trigger {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        min-height: 2.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        color: inherit;
        background: transparent;
        border: 0;
        font: inherit;
        text-decoration: none;
        white-space: nowrap;
        transition: color 150ms ease, background-color 150ms ease;
    }
    .site-navigation > a:hover,
    .site-nav-dropdown:hover > .site-nav-trigger {
        color: #a5b4fc;
    }
    .site-navigation [aria-current="page"] {
        color: #a5b4fc;
        background: rgba(99, 102, 241, 0.12);
    }
    .site-nav-dropdown { position: relative; width: 100%; }
    .site-nav-trigger { cursor: pointer; text-align: left; }
    .site-nav-label-icon { width: 1rem; height: 1rem; margin-right: 0.35rem; flex: 0 0 auto; }
    .site-nav-chevron {
        width: 0.85rem;
        height: 0.85rem;
        margin-left: 0.1rem;
        flex: 0 0 auto;
        transition: transform 150ms ease;
    }
    .site-nav-dropdown:hover .site-nav-chevron { transform: rotate(180deg); }
    .site-nav-menu {
        position: static;
        z-index: 60;
        display: none;
        width: 100%;
        transform: none;
        grid-template-columns: minmax(0, 1fr);
        gap: 0.5rem;
        padding: 0 0.5rem 0.5rem 1rem;
        border: 1px solid #1e293b;
        border-radius: 1rem;
        background: #0f172a;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.35);
    }
    .site-nav-dropdown.is-open > .site-nav-menu { display: grid; }
    .site-nav-menu a {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        padding: 0.55rem;
        border-radius: 0.65rem;
        color: #cbd5e1;
        font-size: 0.75rem;
        line-height: 1.25rem;
        text-decoration: none;
        transition: color 150ms ease, background-color 150ms ease;
    }
    .site-nav-item-icon {
        display: inline-flex;
        width: 1.75rem;
        height: 1.75rem;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        border-radius: 0.55rem;
        font-size: 0.9rem;
        line-height: 1;
    }
    .site-nav-item-icon svg { width: 1rem; height: 1rem; }
    .site-nav-item-icon.icon-indigo { color: #818cf8; background: rgb(99 102 241 / 0.12); }
    .site-nav-item-icon.icon-pink { color: #f472b6; background: rgb(236 72 153 / 0.12); }
    .site-nav-item-icon.icon-emerald { color: #34d399; background: rgb(16 185 129 / 0.12); }
    .site-nav-item-icon.icon-amber { color: #fbbf24; background: rgb(245 158 11 / 0.12); }
    .site-nav-item-icon.icon-blue { color: #60a5fa; background: rgb(59 130 246 / 0.12); }
    .site-nav-item-icon.icon-rose { color: #fb7185; background: rgb(244 63 94 / 0.12); }
    .site-nav-item-icon.icon-cyan { color: #22d3ee; background: rgb(6 182 212 / 0.12); }
    .site-nav-item-icon.icon-orange { color: #fb923c; background: rgb(249 115 22 / 0.12); }
    .site-nav-item-icon.icon-yellow { color: #facc15; background: rgb(234 179 8 / 0.12); }
    .site-nav-scan {
        display: flex;
        align-items: center;
        gap: 0.45rem;
    }
    .site-nav-menu a:hover { color: #c7d2fe; background: #1e293b; }
    .site-nav-pdf-menu { gap: 0.75rem; padding: 0 0.5rem 0.5rem 1rem; }
    .site-nav-pdf-menu p {
        margin: 0 0 0.5rem;
        color: #a5b4fc;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }
    .site-nav-pdf-menu > div:nth-child(2) p { color: #c4b5fd; }
    @media (min-width: 768px) {
        .site-nav-shell { gap: 1.5rem; }
        .site-nav-toggle { display: none; }
        .site-navigation {
            position: static;
            display: flex;
            width: auto;
            flex: 1 1 auto;
            max-height: none;
            overflow: visible;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            gap: 0.15rem;
            margin-left: 0;
            transform: none;
            padding: 0;
            border: 0;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
            font-size: 0.875rem;
        }
        .site-navigation > a,
        .site-nav-trigger {
            width: auto;
            min-height: 1.8rem;
            padding: 0.2rem 0.4rem;
        }
        .site-nav-dropdown { width: auto; padding: 0.25rem 0; }
        .site-nav-dropdown:hover > .site-nav-menu { display: grid; }
        .site-nav-menu {
            position: absolute;
            top: 100%;
            left: 50%;
            width: min(90vw, 27.5rem);
            transform: translateX(-50%);
            grid-template-columns: repeat(2, minmax(0, 1fr));
            padding: 1rem;
        }
        .site-nav-pdf-menu { width: min(90vw, 34.375rem); gap: 1.25rem; padding: 1.5rem; }
    }
    .site-nav-scan:hover { color: #67e8f9; }
    @media (min-width: 768px) and (max-width: 1023px) {
        .site-nav-shell { gap: 0.75rem; }
        .site-navigation {
            flex: 1 1 0;
            min-width: 0;
            flex-wrap: wrap;
            row-gap: 0.1rem;
        }
    }
`;
document.head.append(navigationStyles);
