
/* ===================================
   Pillars Health Navigation: click nav item → hiện panel tương ứng
   =================================== */
function initPillarsHealthNav() {
    const navItems = document.querySelectorAll('.pillars-health__nav-item');

    if (!navItems.length) return;

    navItems.forEach(navItem => {
        navItem.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const product = this.getAttribute('data-product');

            if (index === null || product === null) return;

            const sidebar = this.closest('.pillars-health__sidebar');
            if (!sidebar) return;

            // Cập nhật trạng thái active cho các navigation items
            navItems.forEach(item => {
                item.classList.remove('pillars-health__nav-item--active');
                item.setAttribute('aria-selected', 'false');
            });

            this.classList.add('pillars-health__nav-item--active');
            this.setAttribute('aria-selected', 'true');

            // Tìm panel container
            const interactive = this.closest('.pillars-health__interactive');
            if (!interactive) return;

            const panel = interactive.querySelector('.pillars-health__panel');
            if (!panel) return;

            // Ẩn tất cả panel content, chỉ hiện panel có data-panel-index và data-product trùng
            const allPanelContents = panel.querySelectorAll('.pillars-health__panel-content');
            allPanelContents.forEach(content => {
                const panelIndex = content.getAttribute('data-panel-index');
                const panelProduct = content.getAttribute('data-product');

                if (panelIndex === index && panelProduct === product) {
                    content.classList.add('pillars-health__panel-content--active');
                } else {
                    content.classList.remove('pillars-health__panel-content--active');
                }
            });
        });
    });
}
