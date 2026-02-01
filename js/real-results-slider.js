
/* ===================================
   Real Results Slider: Auto-scroll từ phải qua trái (Marquee style)
   =================================== */
function initRealResultsSlider() {
    const resultsSlider = document.querySelector('.Index_object_real_results_slider');

    if (!resultsSlider) {
        console.log('[Real Results Slider] Slider element not found');
        return;
    }

    // Delay để đảm bảo Swiper library đã load
    setTimeout(() => {
        // Kiểm tra xem Swiper đã được load chưa
        if (typeof Swiper === 'undefined') {
            console.warn('[Real Results Slider] Swiper library not found');
            return;
        }

        // Nếu slider đã được init, destroy nó trước
        if (resultsSlider.swiper) {
            console.log('[Real Results Slider] Destroying existing instance');
            resultsSlider.swiper.destroy(true, true);
        }

        // Khởi tạo Swiper với autoplay chạy liên tục (marquee effect)
        const swiperInstance = new Swiper(resultsSlider, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            loop: true,
            speed: 5000, // Tốc độ di chuyển (càng cao càng chậm)
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

        console.log('[Real Results Slider] Initialized with marquee autoplay', swiperInstance);
    }, 500);
}
