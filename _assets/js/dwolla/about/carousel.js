(function (dwolla) {
    'use strict';

    function initFlickyPlugin() {
        $('#js-flickity-plugin').flickity({
            pageDots: false,
            arrowShape: 'M 36,50 L 61.02,20.81 L 64,23.59 L 41.36,50 L 64,76.41 L 61.02,79.19 Z',
            watchCSS: true
        });
    }

    function addListeners() {
        $('.benefits-carousel nav button').on('click', dwolla.about.carousel.navClickHand);
        $('#js-flickity-plugin').on('cellSelect', dwolla.about.carousel.updateCarouselHand);
        $(window).on('resize', dwolla.about.carousel.resizeHand);
    }

    dwolla.namespace('about.carousel', {

        plugin: null,

        init: function () {
            dwolla.about.carousel.plugin = $('#js-flickity-plugin');

            if (dwolla.about.carousel.plugin.length > 0) {
                initFlickyPlugin();
                addListeners();

                dwolla.about.carousel.setNavSelectedState();
            }
        },

        setNavSelectedState: function () {
            var buttons = $('.benefits-carousel nav button'),
                index = dwolla.about.carousel.plugin.data('flickity').selectedIndex,
                targ = $(buttons[index]);

            dwolla.about.carousel.updateNavIcons(buttons, targ);
            dwolla.about.carousel.updateArrow(targ);
        },

        updateNavIcons: function (buttons, targ) {
            var i = buttons.length - 1;
            while (i >= 0) {
                $(buttons[i]).attr('class', $(buttons[i]).attr('data-js-icon') + '-black');
                i -= 1;
            }
            targ.attr('class', targ.attr('data-js-icon') + ' is-selected');
        },

        updateArrow: function (targ) {
            if (targ[0]) {
                $('.js-carousel-arrow').css('left', $(targ).position().left);
            }
        },

        navClickHand: function () {
            dwolla.util.googleAnalytics.trackEvent('about', 'carousel', $(this).html());
            $('#js-flickity-plugin').flickity('select', $(this).index());
        },

        updateCarouselHand: function () {
            dwolla.about.carousel.setNavSelectedState();
        },

        resizeHand: function () {
            dwolla.about.carousel.updateArrow($('.benefits-carousel nav button.is-selected'));
        }
    });

    $(dwolla.about.carousel.init);
}(dwolla));