// 1. Xử lý làm sạch URL (Xóa tham số ?m=1 của Blogger)
var uri = window.location.toString();
if (uri.indexOf("%3D1") > 0) window.history.replaceState({}, document.title, uri.substring(0, uri.indexOf("%3D1")));
if (uri.indexOf("%3D0") > 0) window.history.replaceState({}, document.title, uri.substring(0, uri.indexOf("%3D0")));
if (uri.indexOf("?m=1") > 0) window.history.replaceState({}, document.title, uri.substring(0, uri.indexOf("?m=1")));
if (uri.indexOf("?m=0") > 0) window.history.replaceState({}, document.title, uri.substring(0, uri.indexOf("?m=0")));

// 2. Hiệu ứng Accordion cho Menu Đa cấp (Mobile)
function arrow_animate(x) {
    x.classList.toggle("animate");
    var panel = x.previousElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        var parentMenu = panel.parentElement.closest('ul');
        if (parentMenu && parentMenu.style.maxHeight) {
            parentMenu.style.maxHeight = "2000px";
        }
    } 
}

// 3. Xử lý các sự kiện tương tác UI (Tìm kiếm, Menu, Popup, Cuộn trang)
window.addEventListener('DOMContentLoaded', function() {
    // Xử lý nút tìm kiếm
    $('.search-btn').click(function() {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open').addClass('close');
            $('.search-field').removeClass('hidden');
        } else {
            $(this).removeClass('close').addClass('open');
            $('.search-field').addClass('hidden');
        }
    });

    // Mở/Đóng Menu Mobile
    $('.ic-menu-bar').click(function() {
        if ($(this).hasClass('change')) {
            $(this).removeClass('change');
            $('#main_menu .center').removeClass('open');
            $('.overlay').addClass('hidden');
        } else {
            $(this).addClass('change');
            $('#main_menu .center').addClass('open');
            $('.overlay').removeClass('hidden');
        }
    });

    // Đóng menu khi click ra vùng tối
    $('.overlay, .post-product').click(function() {
        $('.ic-menu-bar').removeClass('change');
        $('#main_menu .center').removeClass('open');
        $('.overlay').addClass('hidden');
    });
    
    // Nút cuộn lên đầu trang
    $('.scroll_Top').click(function(){
        $('html, body').animate({scrollTop:0}, 1000);
    });
    
    // Popup form gửi Email
    $('.email-popup').click(function() {
        $('.btn-popup').addClass('is-visible');
    });
    $('.btn-popup-close').click(function() {
        $('.btn-popup').removeClass('is-visible');
    });
    $('#main_menu .menu li .arrow_back').click(function() {
        $('#main_menu .menu').addClass('invisible');
        $('.overlay').addClass('hidden');
    });
});

// 4. Trình điều khiển Giao diện tối (Dark Mode) có lưu Cache
window.addEventListener('DOMContentLoaded', function() {
    var darkModeBtn = document.getElementById('darkModeBtn');
    var body = document.body;
    if (!darkModeBtn) return;
    
    var dmIcon = darkModeBtn.querySelector('i');
    var dmText = darkModeBtn.querySelector('.dm-text');

    // Kiểm tra thiết lập cũ trong LocalStorage
    if (localStorage.getItem('theme_ngulieu') === 'dark') {
        body.classList.add('dark-mode');
        if(dmIcon) { dmIcon.classList.remove('fa-moon'); dmIcon.classList.add('fa-sun'); }
        if(dmText) { dmText.textContent = 'Giao diện sáng'; }
        darkModeBtn.style.color = '#e0e0e0';
    }

    // Xử lý sự kiện click chuyển đổi
    darkModeBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme_ngulieu', 'dark');
            if(dmIcon) { dmIcon.classList.remove('fa-moon'); dmIcon.classList.add('fa-sun'); }
            if(dmText) { dmText.textContent = 'Giao diện sáng'; }
            darkModeBtn.style.color = '#e0e0e0';
        } else {
            localStorage.setItem('theme_ngulieu', 'light');
            if(dmIcon) { dmIcon.classList.remove('fa-sun'); dmIcon.classList.add('fa-moon'); }
            if(dmText) { dmText.textContent = 'Giao diện tối'; }
            darkModeBtn.style.color = '#666';
        }
    });
});