# Hướng dẫn kiểm tra Mega Menu Hover

## Đã thực hiện

Đã thêm CSS hover effect vào file `css/styles.css` để hiển thị mega menu khi hover vào link "Shop".

## CSS đã thêm

```css
/* Hover effect để hiển thị mega menu */
.js .custom_mega_menu_top_only_new:hover .mega-menu__content,
.js .custom_mega_menu_top_only_new .mega-menu:hover .mega-menu__content,
.js .custom_mega_menu_top_only_new .mega-menu .mega-menu__content:hover {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
    pointer-events: auto !important;
    z-index: 999 !important;
    background: #fff !important;
}
```

## Cách kiểm tra

### Phương pháp 1: Kiểm tra trực tiếp
1. Mở file `index.html` trong trình duyệt
2. Di chuột vào link "Shop" ở header
3. Mega menu sẽ trượt xuống và hiển thị

### Phương pháp 2: Sử dụng file test
1. Mở file `test-mega-menu.html` trong trình duyệt
2. File này chứa cấu trúc đơn giản hóa để dễ debug

## Cách hoạt động

CSS selector có các thành phần:
- `.js` - class được thêm vào body khi JavaScript active
- `.custom_mega_menu_top_only_new` - container của menu item
- `:hover` - pseudo-class khi hover vào element
- `.mega-menu__content` - contentnội dung mega menu

Khi hover vào bất kỳ thành phần nào trong container `.custom_mega_menu_top_only_new` (bao gồm link "Shop"), mega menu sẽ hiển thị với các thuộc tính:
- `opacity: 1` - làm menu hiển thị rõ
- `visibility: visible` - làm menu có thể nhìn thấy
- `transform: translateY(0)` - đưa menu về vị trí ban đầu
- `pointer-events: auto` - cho phép tương tác với menu
- `z-index: 999` - đảm bảo menu hiển thị trên các element khác
- `background: #fff` - nền trắng để dễ nhìn thấy

## Nếu vẫn không hoạt động

### Kiểm tra DevTools
1. Nhấn F12 để mở DevTools
2. Click vào tab "Elements"
3. Hover vào link "Shop"
4. Kiểm tra xem element `.mega-menu__content` có đang được applied CSS không
5. Trong tab "Styles", kiểm tra xem CSS hover có xuất hiện không

### Kiểm tra các vấn đề phổ biến
- Đảm bảo file `styles.css` đã được load đúng cách
- Kiểm tra xem có CSS nào khác đang override không
- Xác nhận class `js` có trên thẻ `<body>` không
- Kiểm tra xem có JavaScript nào đang block hover không

## Lưu ý

Mega menu được set `position: fixed` với `top: 36px`, nghĩa là nó sẽ hiển thị cách top của viewport 36px khi hover.
