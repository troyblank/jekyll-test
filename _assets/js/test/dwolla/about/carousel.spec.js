describe('about carousel', function () {
    'use strict';

    //flickity mock
    $.fn.flickity = function () {
        return true;
    };

    $.fn.data = function () {
        return {selectedIndex: 0};
    };

    beforeEach(function () {
        var html = '<section class="benefits-carousel">';
        html += '<nav><button data-js-icon="icon-a">A</button><button data-js-icon="icon-b">B</button>';
        html += '<div class="benefits-carousel__arrow js-carousel-arrow"><span>Arrow</span></div>';
        html += '</section>';
        html += '<div id="js-flickity-plugin"></div>';
        $('html').html(html);
    });

    afterEach(function () {
        $('html').html('');
    });

    it('should be have a clickable nav', function () {
        var navClickHand = sinon.spy(dwolla.about.carousel, 'navClickHand');
        dwolla.about.carousel.init();

        $($('.benefits-carousel nav button')[0]).trigger('click');

        assert.equal(navClickHand.called, true);
    });

    it('should react to carousel change', function () {
        var updateCarouselHand = sinon.spy(dwolla.about.carousel, 'updateCarouselHand');
        dwolla.about.carousel.init();

        $('#js-flickity-plugin').trigger('cellSelect');

        assert.equal(updateCarouselHand.called, true);
    });

    it('should swap nav icons on active state', function () {
        var buttons = $('.benefits-carousel nav button');
        dwolla.about.carousel.updateNavIcons(buttons, $(buttons[1]));

        assert.equal($($('.benefits-carousel nav button')[0]).attr('class'), 'icon-a-black');
        assert.equal($($('.benefits-carousel nav button')[1]).attr('class'), 'icon-b is-selected');
    });

    it('should react to resize', function () {
        var resizeHand = sinon.spy(dwolla.about.carousel, 'resizeHand');
        dwolla.about.carousel.init();

        $(window).trigger('resize');

        assert.equal(resizeHand.called, true);
    });

});