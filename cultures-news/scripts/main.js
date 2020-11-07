$(function(){
    $('.owl-carousel--latest-news').each(function(){
        $(this).owlCarousel({
            items: 1,
            margin: 10,
            loop: false,
            nav: true,
            dots:true,

            navigation : false,
            navigationText : ["prev","next"],
            rewindNav : true,
            scrollPerPage : false,
        });
    });
});

$(function(){
    $('.owl-carousel--articles').each(function(){
        $(this).owlCarousel({
            items: 4,
            margin: 10,
            loop: false,
            nav: true,
            dots: false,

            navigation : false,
            navigationText : ["prev","next"],
            rewindNav : true,
            scrollPerPage : false,

            responsive:{ //Адаптивность. Кол-во выводимых элементов при определенной ширине.
                0:{
                    items:1,
                    dots: true,

                },
                640:{
                    items:2,
                    dots: true,

                },
                800:{
                    items:3,
                },
                1250:{
                    items:4
                },
            }
        });
    });
});


$(document).ready(function(){
    $('.reviews__list').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        dots: true,
        autoplay: false,

        responsive: [
            {
                breakpoint: 801,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
        ]
    });
});


//удалить ненужную рекламу

if ($(window).width() <= 965) {
    if ($('.main-content__right .events__list').children().length %2 === 1) {
        $('.main-content__right .events__list .event:last').hide();
    }
} else {
    if ($('.main-content__right .events__list').children().length %2 === 1) {
        $('.main-content__right .events__list .event:last').show();
    }
}

// уменьшаем большую новость

if ($(window).width() <= 500) {
    $('.all-news__list .news:first').removeClass('news--big');
} else {
    $('.all-news__list .news:first').addClass('news--big');
}


/*
    появление меню по нажатию на кнопку "меню"
     */

$('.menu__button').on('click', function () {
    $('.nav').addClass('mob--nav').fadeIn(400);
    $('.close').show();
    $('body').addClass('scroll-hidden');
});

/*
закрытие меню и модальных окон по нажатию на крестик или пункт меню
*/

$('.close, .nav__link').on('click', function () {
    $('.nav').removeClass('mob--nav').fadeOut(400);
    $('.close').hide();
    $('body').removeClass('scroll-hidden');
});

