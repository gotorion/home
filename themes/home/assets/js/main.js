(function () {
    "use strict";

    var root = document.documentElement;

    // ---- 配色切换 -----------------------------------------------------
    var themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            var next = root.dataset.theme === "light" ? "dark" : "light";
            root.dataset.theme = next;
            try {
                localStorage.setItem("theme", next);
            } catch (error) {
                /* 隐私模式下 localStorage 可能不可用，忽略即可 */
            }
        });
    }

    // ---- 移动端菜单 ---------------------------------------------------
    var header = document.getElementById("site-header");
    var menuToggle = document.getElementById("menu-toggle");
    var siteNav = document.getElementById("site-nav");

    function closeMenu() {
        if (!header || !menuToggle) {
            return;
        }
        header.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "打开菜单");
    }

    if (menuToggle && header) {
        menuToggle.addEventListener("click", function () {
            var open = header.classList.toggle("nav-open");
            menuToggle.setAttribute("aria-expanded", String(open));
            menuToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
        });
    }

    if (siteNav) {
        siteNav.addEventListener("click", function (event) {
            if (event.target.closest("a")) {
                closeMenu();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            closeMenu();
        }
    });

    // ---- 复制文章链接 -------------------------------------------------
    document.querySelectorAll(".copy-link").forEach(function (button) {
        button.addEventListener("click", function () {
            var url = button.dataset.copyUrl || window.location.href;
            var original = button.textContent.trim();

            navigator.clipboard.writeText(url).then(
                function () {
                    button.textContent = "已复制";
                    window.setTimeout(function () {
                        button.textContent = original;
                    }, 1600);
                },
                function () {
                    window.prompt("复制链接：", url);
                }
            );
        });
    });
})();
