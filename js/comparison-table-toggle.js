/* ===================================
   Comparison Table Toggle: See More/See Less
   =================================== */
function initComparisonTableToggle() {
    const seeMoreBtn = document.getElementById('Index_object_table_column_see_more');

    if (!seeMoreBtn) return;

    let isExpanded = false;

    seeMoreBtn.addEventListener('click', function () {
        const hiddenItems = document.querySelectorAll('.Index_object_table_column_inneroverlay_innertable_innerright_innerloops_mainboxs_new.hide');

        if (!isExpanded) {
            // Hiện tất cả items
            hiddenItems.forEach(item => {
                item.style.display = 'flex';
            });
            seeMoreBtn.textContent = 'See Less';
            isExpanded = true;
        } else {
            // Ẩn các items
            hiddenItems.forEach(item => {
                item.style.display = 'none';
            });
            seeMoreBtn.textContent = 'See More';
            isExpanded = false;
        }
    });

    // Ẩn các items có class 'hide' ban đầu
    const hiddenItems = document.querySelectorAll('.Index_object_table_column_inneroverlay_innertable_innerright_innerloops_mainboxs_new.hide');
    hiddenItems.forEach(item => {
        item.style.display = 'none';
    });
}
