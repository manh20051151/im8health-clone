
/* ===================================
   Experts Slider: Auto-scroll từ phải qua trái (Marquee style)
   =================================== */
function initExpertsSlider() {
    const expertsSlider = document.querySelector('.Index_object_experts_list_slider');

    if (!expertsSlider) {
        console.log('[Experts Slider] Slider element not found');
        return;
    }

    // Delay để đảm bảo Swiper library đã load
    setTimeout(() => {
        // Kiểm tra xem Swiper đã được load chưa
        if (typeof Swiper === 'undefined') {
            console.warn('[Experts Slider] Swiper library not found');
            return;
        }

        // Nếu slider đã được init, destroy nó trước
        if (expertsSlider.swiper) {
            console.log('[Experts Slider] Destroying existing instance');
            expertsSlider.swiper.destroy(true, true);
        }

        // Khởi tạo Swiper với autoplay chạy liên tục (marquee effect)
        const swiperInstance = new Swiper(expertsSlider, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            loop: true,
            speed: 4000, // Tốc độ di chuyển (càng cao càng chậm)
            allowTouchMove: true,
            freeMode: true,
            autoplay: {
                delay: 0, // Chạy liên tục không dừng
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            },
            watchSlidesProgress: true,
            breakpoints: {
                320: { slidesPerView: 1.2, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 16 },
                990: { slidesPerView: 'auto', spaceBetween: 16 }
            },
            on: {
                init: function () {
                    this.wrapperEl.style.transitionTimingFunction = 'linear';
                }
            }
        });

        console.log('[Experts Slider] Initialized with marquee autoplay', swiperInstance);
    }, 500);
}
