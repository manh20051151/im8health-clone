/* ===================================
   IM8 Health - JavaScript Interactions
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initMobileMenu();
    initProductGallery();
    initPricingOptions();
    initProductTabs();
    initPillarsAccordion();
    initFaqAccordion();
    initMetaAccordion();
    initVideoPopups();
    initStaticReviewsSwiper();
    initStickyHeader();
    initScrollAnimations();
    initCountrySelector();
    initDetailsHover();
    initCounterAnimations();
});

/* ===================================
   Mobile Menu
   =================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ===================================
   Product Gallery
   =================================== */
function initProductGallery() {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (!mainImage || !thumbnails.length) return;

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');

            // Update main image with fade effect
            const newImageSrc = thumbnail.dataset.image;
            mainImage.style.opacity = '0';

            setTimeout(() => {
                mainImage.src = newImageSrc;
                mainImage.style.opacity = '1';
            }, 200);
        });
    });

    // Add smooth transition to main image
    mainImage.style.transition = 'opacity 0.3s ease';
}

/* ===================================
   Pricing Options
   =================================== */
function initPricingOptions() {
    const pricingOptions = document.querySelectorAll('input[name="pricing"]');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const btnPrice = addToCartBtn?.querySelector('.btn-price');

    if (!pricingOptions.length || !addToCartBtn) return;

    const prices = {
        'subscribe-90': '$89',
        'subscribe-60': '$95',
        'subscribe-30': '$99',
        'one-time': '$112'
    };

    pricingOptions.forEach(option => {
        option.addEventListener('change', () => {
            const selectedPrice = prices[option.value] || '$89';
            if (btnPrice) {
                btnPrice.textContent = selectedPrice;
            }
        });
    });

    // Add to cart animation
    addToCartBtn.addEventListener('click', () => {
        addToCartBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            addToCartBtn.style.transform = 'scale(1)';
        }, 150);

        // Update cart badge
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            const currentCount = parseInt(cartBadge.textContent) || 0;
            cartBadge.textContent = currentCount + 1;

            // Animate badge
            cartBadge.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartBadge.style.transform = 'scale(1)';
            }, 200);
        }

        // Show feedback
        showToast('Added to cart!');
    });
}

/* ===================================
   Product Tabs (Accordion)
   =================================== */
function initProductTabs() {
    const tabItems = document.querySelectorAll('.tab-item');

    tabItems.forEach(item => {
        const header = item.querySelector('.tab-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all tabs
            tabItems.forEach(tab => {
                tab.classList.remove('active');
                const icon = tab.querySelector('.tab-icon');
                if (icon) icon.textContent = '+';
            });

            // Toggle clicked tab
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.tab-icon');
                if (icon) icon.textContent = '−';
            }
        });
    });
}

/* ===================================
   5 Pillars Accordion
   =================================== */
function initPillarsAccordion() {
    const pillarItems = document.querySelectorAll('.pillar-item');

    pillarItems.forEach(item => {
        const header = item.querySelector('.pillar-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all pillars
            pillarItems.forEach(pillar => {
                pillar.classList.remove('active');
                const toggle = pillar.querySelector('.pillar-toggle');
                if (toggle) toggle.textContent = '+';
            });

            // Toggle clicked pillar
            if (!isActive) {
                item.classList.add('active');
                const toggle = item.querySelector('.pillar-toggle');
                if (toggle) toggle.textContent = '−';
            }
        });
    });
}

/* ===================================
   FAQ Accordion
   =================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQs
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // Toggle clicked FAQ
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ===================================
   Meta Accordion (Ingredients, Third-Party Tested, etc.)
   =================================== */
function initMetaAccordion() {
    const metaAccordion = document.querySelector('.meta_accordions_detail_mainloops_new .accordion');
    if (!metaAccordion) return;

    const items = metaAccordion.querySelectorAll('ul > li');
    items.forEach(li => {
        const question = li.querySelector('.question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isOpen = li.classList.contains('open');
            // Đóng tất cả các mục khác
            items.forEach(item => {
                item.classList.remove('open');
            });
            // Mở mục được click nếu trước đó đang đóng
            if (!isOpen) {
                li.classList.add('open');
            }
        });
    });
}

/* ===================================
   Video Popups (Ambassadors)
   =================================== */
function initVideoPopups() {
    const triggers = document.querySelectorAll('.people_popup_open');
    const overlay = document.querySelector('.people_popup_overlay_new');
    const popups = document.querySelectorAll('.meta_real_reviews_mainpopup_new');
    const closeButtons = document.querySelectorAll('.meta_real_reviews_mainclose_new');

    if (!triggers.length || !popups.length) return;

    function openPopup(videoId) {
        popups.forEach(function (popup) {
            popup.classList.remove('people_popup_visible');
        });
        const targetPopup = document.querySelector('.meta_real_reviews_mainpopup_new.' + videoId + '_open');
        if (targetPopup) {
            targetPopup.classList.add('people_popup_visible');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            var video = targetPopup.querySelector('video');
            if (video && video.getAttribute('video_url')) {
                video.src = video.getAttribute('video_url');
                video.play && video.play();
            }
        }
    }

    function closePopups() {
        popups.forEach(function (popup) {
            popup.classList.remove('people_popup_visible');
            var video = popup.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    triggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            var videoId = this.getAttribute('video_id');
            if (videoId) openPopup(videoId);
        });
    });

    closeButtons.forEach(function (btn) {
        btn.addEventListener('click', closePopups);
    });

    if (overlay) {
        overlay.addEventListener('click', closePopups);
    }
}

/* ===================================
   Static Reviews Swiper (10,000+ 5 Star - carousel chạy từ phải qua trái)
   =================================== */
function initStaticReviewsSwiper() {
    var el = document.querySelector('.static-reviews-swiper');
    if (!el) return;
    var wrapper = el.querySelector('.swiper-wrapper');
    if (!wrapper) return;
    var slides = wrapper.querySelectorAll('.swiper-slide');
    if (!slides.length) return;
    for (var i = 0; i < slides.length; i++) {
        wrapper.appendChild(slides[i].cloneNode(true));
    }
    el.classList.add('reviews-marquee');
}

/* ===================================
   Sticky Header
   =================================== */
function initStickyHeader() {
    const header = document.getElementById('header');
    const announcementBar = document.querySelector('.announcement-bar');

    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;

        // Add shadow when scrolled
        if (currentScrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Hide/show announcement bar on scroll
        if (announcementBar) {
            if (currentScrollY > 100) {
                announcementBar.style.transform = 'translateY(-100%)';
                announcementBar.style.position = 'fixed';
                announcementBar.style.top = '0';
                announcementBar.style.left = '0';
                announcementBar.style.right = '0';
                announcementBar.style.zIndex = '1001';
            } else {
                announcementBar.style.transform = 'translateY(0)';
                announcementBar.style.position = 'relative';
            }
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

/* ===================================
   Scroll Animations
   =================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.stat-card, .organ-card, .cellular-card, .testimonial-card, ' +
        '.expert-card, .expert-profile, .step-card, .pillar-item, .faq-item'
    );

    if (!animatedElements.length) return;

    // Add initial class
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });

    // Observe all elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/* ===================================
   Toast Notification
   =================================== */
function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
    `;

    // Add styles
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%) translateY(100px)',
        background: '#22c55e',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        zIndex: '9999',
        fontWeight: '500',
        fontSize: '14px',
        transition: 'transform 0.3s ease'
    });

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove after duration
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

/* ===================================
   Smooth Scroll for Anchor Links
   =================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerHeight = document.getElementById('header')?.offsetHeight || 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===================================
   Country Selector Dropdown
   =================================== */
function initCountrySelector() {
    const disclosureButton = document.querySelector('.disclosure__button');
    const disclosureList = document.querySelector('.disclosure__list-wrapper');
    const closeButton = document.querySelector('.country-selector__close-button');
    const overlay = document.querySelector('.country-selector__overlay');
    const countryLinks = document.querySelectorAll('.disclosure__item a');

    if (!disclosureButton || !disclosureList) return;

    // Toggle dropdown when clicking button
    disclosureButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = disclosureButton.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            closeCountrySelector();
        } else {
            openCountrySelector();
        }
    });

    // Close when clicking close button
    if (closeButton) {
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            closeCountrySelector();
        });
    }

    // Close when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            closeCountrySelector();
        });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!disclosureButton.contains(e.target) && !disclosureList.contains(e.target)) {
            closeCountrySelector();
        }
    });

    // Handle country selection
    countryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const countryCode = link.dataset.value;
            const countryName = link.querySelector('.country')?.textContent;
            const currency = link.querySelector('.localization-form__currency')?.textContent?.trim();

            // Update button text
            const buttonText = disclosureButton.querySelector('span');
            if (buttonText && currency) {
                buttonText.textContent = currency.split(' ')[0] + ' ';
            }

            // Update active state
            countryLinks.forEach(l => {
                l.removeAttribute('aria-current');
                const checkmark = l.querySelector('.icon-checkmark');
                if (checkmark) {
                    checkmark.parentElement.classList.add('visibility-hidden');
                }
            });

            link.setAttribute('aria-current', 'true');
            const checkmark = link.querySelector('.icon-checkmark');
            if (checkmark) {
                checkmark.parentElement.classList.remove('visibility-hidden');
            }

            console.log('Country changed to:', countryName, countryCode);
            closeCountrySelector();
        });
    });

    function openCountrySelector() {
        disclosureButton.setAttribute('aria-expanded', 'true');
        disclosureList.removeAttribute('hidden');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCountrySelector() {
        disclosureButton.setAttribute('aria-expanded', 'false');
        disclosureList.setAttribute('hidden', 'true');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ===================================
   Details Hover (Mega Menu)
   =================================== */
function initDetailsHover() {
    const details = document.querySelectorAll('details.mega-menu');

    details.forEach(detail => {
        detail.addEventListener('mouseenter', () => {
            detail.setAttribute('open', 'true');
            detail.setAttribute('aria-expanded', 'true');
        });

        detail.addEventListener('mouseleave', () => {
            detail.removeAttribute('open');
            detail.setAttribute('aria-expanded', 'false');
        });
    });
}

/* ===================================
   Counter Animations (Clinical Stats)
   =================================== */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.Index_tab_percent_studies_inneroverlay_innersides_innerleft_innerlists_innerloop_innerboxs_title_new h2 span');

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.textContent);
                const duration = 10000; // 2 seconds
                const startTime = performance.now();

                // Reset to 0 initially
                target.textContent = '0';

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function (easeOutExpo)
                    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                    const current = Math.floor(ease * endValue);
                    target.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        target.textContent = endValue; // Ensure final value is exact
                    }
                }

                requestAnimationFrame(update);
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}
