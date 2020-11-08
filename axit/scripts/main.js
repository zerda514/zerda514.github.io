$(function() {
    setTimeout(function () {
        document.body.className = "";
    }, 500);

    $('#trialForm').submit(function (e) {
        e.preventDefault();
        $('.overlay').fadeIn(1000);
        $('.success').fadeIn(1000).delay(1000).fadeOut(1000);
        setTimeout(function () {
            $('.overlay').fadeOut(1000).delay(2000);
        }, 3000);
        $("form#trialForm").trigger('reset');
    });


    $('.tab').not(':first').hide();

    $('.tabs__list .tabs__item').on('click', function (e) {
        e.preventDefault();
        $('.tabs__list .tabs__item').eq($(this).index());
        $(".tabs__content").hide().eq($(this).index()).fadeIn();
    });


    //центровка
    jQuery.fn.center = function () {
        this.css("position","absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
            $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
            $(window).scrollLeft()) + "px");
        return this;
    }

    $('.success').center();

    //меню
    $('.menu').on('click', function () {
        $('.nav__menu').addClass('nav__menu--mob');
        $('.close').fadeIn(400);
    });

    /*
    закрытие меню и модальных окон по нажатию на крестик или пункт меню
    */

    $('.close, .nav__link').on('click', function () {
        $('.nav__menu').removeClass('nav__menu--mob');
        $('.close').fadeOut(400);
    });
});
