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

    (function($) {
        wowAnimation();
        $('.nav-link').click(function() {
            if ($(this).attr('data-id') && $('#' + $(this).attr('data-id')).length > 0) {
                $('html, body').animate({
                    scrollTop: $('#' + $(this).attr('data-id')).offset().top
                }, 1000);
            }
        });
        $('#download_link').click(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'GET',
                url: 'https://static.itch.io/lib/jquery-ui-timepicker-addon.min.js',
                timeout: 1500,
                cache: false,
                complete: function (data) {
                    if (data.status === 200) {
                        $('#download_link1')[0].click();
                    } else {
                        $('#download_link2')[0].click();
                    }
                }
            });
        });
    })(jQuery);


}());