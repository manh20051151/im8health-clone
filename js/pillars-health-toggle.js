
/* ===================================
   Pillars Health Toggle: chuyển đổi giữa Essentials và Longevity
   =================================== */
function initPillarsHealthToggle() {
    const toggleButtons = document.querySelectorAll('.pillars-health__toggle-btn');

    if (!toggleButtons.length) return;

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productType = this.getAttribute('data-product');
            if (!productType) return;

            const toggleContainer = this.closest('.pillars-health__toggle');
            if (!toggleContainer) return;

            // Cập nhật trạng thái active cho các nút
            toggleButtons.forEach(btn => {
                btn.classList.remove('pillars-health__toggle-btn--active');
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');
            });

            this.classList.add('pillars-health__toggle-btn--active');
            this.setAttribute('aria-selected', 'true');
            this.setAttribute('tabindex', '0');

            // Cập nhật data-active của toggle container (nếu cần)
            toggleContainer.setAttribute('data-active', productType);

            // Tìm section cha
            const section = this.closest('.pillars-health');
            if (!section) return;

            // Thêm hoặc xóa class pillars-health--longevity
            if (productType === 'longevity') {
                section.classList.add('pillars-health--longevity');
            } else {
                section.classList.remove('pillars-health--longevity');
            }

            // Ẩn tất cả content, chỉ hiện content tương ứng
            const allContents = section.querySelectorAll('.pillars-health__content');
            allContents.forEach(content => {
                const contentType = content.getAttribute('data-content');
                if (contentType === productType) {
                    content.classList.add('pillars-health__content--active');
                    content.removeAttribute('hidden');
                } else {
                    content.classList.remove('pillars-health__content--active');
                    content.setAttribute('hidden', '');
                }
            });
        });
    });
}
