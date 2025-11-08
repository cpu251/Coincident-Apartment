;(function () {

    'use strict';

    function wowAnimation() {
        var wow = new WOW(
            {
                boxClass:     'wow',
                animateClass: 'animated',
                offset:       150,
                mobile:       false,
                callback:     function(box) {
                    // console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
                },
            }
        );
        wow.init();

        var wow2 = new WOW(
            {
                boxClass:     'wow2',
                animateClass: 'animated',
                offset:       -200,
                mobile:       false,
                callback:     function(box) {
                    // console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
                },
            }
        );
        wow2.init();
    }

    function langChange() {
        const langPrefKey = 'preferredLanguage';
        const currentPath = window.location.pathname;
        const isEnglishPage = currentPath.endsWith('index_en.html');
        const savedLang = localStorage.getItem(langPrefKey);

        // 如果没有记录语言偏好，则根据浏览器语言自动判断
        if (!savedLang) {
            const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
            if (browserLang.startsWith('en')) {
                localStorage.setItem(langPrefKey, 'en');
            } else {
                localStorage.setItem(langPrefKey, 'zh');
            }
        }

        // 重新获取偏好
        const lang = localStorage.getItem(langPrefKey);

        // 如果偏好是英语且当前不是英文页面，则跳转
        if (lang === 'en' && !isEnglishPage) {
            window.location.href = 'index_en.html';
            return;
        }

        // 如果偏好不是英语，但当前却在英文页面，则跳回中文页（可选）
        // 如果你不希望自动跳回，可以把这段删除
        if (lang !== 'en' && isEnglishPage) {
            window.location.href = '/';
            return;
        }
    }

    (function($) {
        wowAnimation();
        $('.nav-link').click(function() {
            if ($(this).attr('data-id') && $('#' + $(this).attr('data-id')).length > 0) {
                $('html, body').animate({
                    scrollTop: $('#' + $(this).attr('data-id')).offset().top
                }, 1000);
            }
        });
        $('body nav .lang a').click(function() {
            const langPrefKey = 'preferredLanguage';
            localStorage.setItem(langPrefKey, $(this).attr('data-lang'));
            langChange();
        });
        // $('#download_link').click(function(e) {
        //     e.preventDefault();
        //     $.ajax({
        //         type: 'GET',
        //         url: 'https://static.itch.io/lib/jquery-ui-timepicker-addon.min.js',
        //         timeout: 1500,
        //         cache: false,
        //         complete: function (data) {
        //             if (data.status === 200) {
        //                 $('#download_link1')[0].click();
        //             } else {
        //                 $('#download_link2')[0].click();
        //             }
        //         }
        //     });
        // });
        $.ajax({
            type: 'GET',
            url: 'https://static.itch.io/lib/jquery-ui-timepicker-addon.min.js',
            timeout: 1500,
            cache: false,
            complete: function (data) {
                if (data.status === 200) {
                    $('#download_link').attr('href', $('#download_link1').attr('href'));
                } else {
                    $('#download_link').attr('href', $('#download_link2').attr('href'));
                }
            }
        });
    })(jQuery);

    langChange();
}());