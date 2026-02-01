
/* ===================================
   Vanta.js Background Animation for Pillars Health
   =================================== */
(function () {
    'use strict';

    // === EARLY BAILOUT - Zero cost on mobile/reduced motion ===
    var isMobile = window.innerWidth <= 749;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    // === CONFIGURATION ===
    var SCRIPTS = {
        three: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
        vanta: 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.cells.min.js'
    };

    var THEMES = {
        essentials: { backgroundColor: 0xF5EAEA, color1: 0xA40011, color2: 0xFF9693 },
        longevity: { backgroundColor: 0xD7EDAF, color1: 0x8C0000, color2: 0xF29B45 }
    };

    // === STATE ===
    var vantaEffect = null;
    var currentTheme = 'essentials';
    var isVisible = true;
    var loadPromise = null;

    // === ULTRA-FAST SCRIPT LOADER ===
    function injectScript(src) {
        return new Promise(function (resolve, reject) {
            // Check if already loaded
            if (src.indexOf('three') > -1 && window.THREE) return resolve();
            if (src.indexOf('vanta') > -1 && window.VANTA) return resolve();

            var script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.crossOrigin = 'anonymous';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // === PARALLEL PREFETCH + SEQUENTIAL EXECUTION ===
    function loadAllScripts() {
        if (loadPromise) return loadPromise;

        loadPromise = injectScript(SCRIPTS.three)
            .then(function () { return injectScript(SCRIPTS.vanta); })
            .catch(function (e) {
                console.warn('[Vanta] Script load failed:', e);
                loadPromise = null;
            });

        return loadPromise;
    }

    // === OPTIMIZED VANTA INITIALIZATION ===
    function initVanta() {
        var container = document.getElementById('pillars-vanta-bg');
        var section = document.getElementById('pillars-health-section');

        if (!container || !window.VANTA || !window.THREE) {
            console.warn('[Vanta] Missing dependencies');
            return;
        }

        currentTheme = section && section.dataset.activeProduct || 'essentials';
        var theme = THEMES[currentTheme];

        try {
            // Create effect with performance-optimized settings
            vantaEffect = VANTA.CELLS({
                el: container,
                THREE: THREE,
                // Disable all input handling for max performance
                mouseControls: false,
                touchControls: false,
                gyroControls: false,
                // Optimized rendering
                minHeight: 200,
                minWidth: 200,
                scale: 0.7,
                size: 0.4,
                speed: 0.8,
                // Theme colors
                backgroundColor: theme.backgroundColor,
                color1: theme.color1,
                color2: theme.color2
            });

            // === CRITICAL PERFORMANCE OPTIMIZATIONS ===
            if (vantaEffect.renderer) {
                vantaEffect.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                vantaEffect.renderer.powerPreference = 'high-performance';
            }

            // === VISIBILITY-BASED RENDERING ===
            var visObserver = new IntersectionObserver(function (entries) {
                isVisible = entries[0].isIntersecting;
                toggleRendering();
            }, { threshold: 0 });
            visObserver.observe(section);

            // Pause on tab switch
            document.addEventListener('visibilitychange', toggleRendering);

            // === INSTANT FADE IN ===
            container.style.opacity = '1';

        } catch (e) {
            console.warn('[Vanta] Init failed:', e);
        }
    }

    // === RENDERING CONTROL ===
    function toggleRendering() {
        if (!vantaEffect || !vantaEffect.renderer) return;

        if (isVisible && !document.hidden) {
            vantaEffect.renderer.setAnimationLoop(vantaEffect.onUpdate.bind(vantaEffect));
        } else {
            vantaEffect.renderer.setAnimationLoop(null);
        }
    }

    // === THEME SWITCHING ===
    window.__vantaSwitchTheme = function (theme) {
        if (!vantaEffect || currentTheme === theme || !THEMES[theme]) return;
        currentTheme = theme;
        try {
            vantaEffect.setOptions(THEMES[theme]);
        } catch (e) { }
    };

    // === INTERSECTION OBSERVER SETUP ===
    function setup() {
        var section = document.getElementById('pillars-health-section');
        if (!section) return;

        var observer = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                observer.disconnect();
                loadAllScripts().then(initVanta);
            }
        }, {
            rootMargin: '500px 0px',
            threshold: 0
        });

        observer.observe(section);
    }

    // === IMMEDIATE SETUP ===
    if (document.getElementById('pillars-health-section')) {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }

})();
