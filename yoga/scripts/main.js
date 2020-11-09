$(document).ready(function(){

    /*
    появление меню по нажатию на кнопку "меню"
     */

    $('.header__menu-button').on('click', function () {
        $('.menu').fadeIn(400);
    });

    /*
    закрытие меню и модальных окон по нажатию на крестик или пункт меню
    */

    $('.close, .menu__link').on('click', function () {
        $('.menu').removeClass('menu__mobile').fadeOut(400);
        $('.trial__modal').fadeOut(600);
    });

    /*
    скролл к секции из меню
     */

    $('.menu__link').on( 'click', function(){
        let el = $(this);
        let dest = el.attr('href'); // получаем направление
        if(dest !== undefined && dest !== '') { // проверяем существование
            $('html').animate({
                    scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
                }, 500 // скорость прокрутки
            );
        }
        return false;
    });

    /*
    табы абонементы
     */

    $('.tickets__descr').not(':first').hide();

    $('.tickets__duration .tickets__duration-item').on('click', function (e) {
        event.preventDefault();
            $('.tickets__duration .tickets__duration-item').removeClass("tickets__duration-item--active").eq($(this).index()).addClass("tickets__duration-item--active");
            $(".tickets__descr").hide().eq($(this).index()).fadeIn();
        }).eq(0).addClass("tickets__duration-item--active");


    /*
    табы команда
     */

    $('.team__biography').not(':nth-child(1)').hide();

    $('.team-about__more-link').on('click', function (e) {
        event.preventDefault();
        $('.team-about__item').removeClass("team-about__item--active");
        $(this).parents('.team-about__item').addClass("team-about__item--active");
        $(this).parents('.team-about__container').children('.team__biographys').children(".team__biography").hide().eq($(this).parents('.team-about__item').index()).fadeIn();
    }).eq(0).addClass("team-about__item--active");


    /*
    триалка
     */

    $('.first-screen__trial, .descr__submit, .menu__trial, .tickets__descr-buy, .courses__all-button').on('click', function () {
        event.preventDefault();
        $('.menu').hide().removeClass('menu__mobile');
        $('.courses__all'). hide();
        $('.trial__modal-heading').html('Записаться на занятие');
        $('.overlay').fadeIn(400);
        $('.trial__modal').fadeIn(600);
        $('#course').val('Пробное занятие');
    });

    /*
    триалка из раздела курсы подставление выбранного направления
     */

    $('.descr__submit').on('click', function () {
        let course = $(this).parents('.courses__item').children('.courses__unit').children('.descr').children('.descr__heading').html();
        $('#course').val(course);
    });

    /*
    покупка абонемента
     */

    $('.tickets__descr-buy').on('click', function () {
        $('.trial__modal-heading').html('Купить абонемент');

        let heading = $(this).parents('.tickets__descr-item').children('.tickets__descr-heading').html();
        heading = heading[0].toLowerCase() + heading.slice(1);
        let time = $(this).parents('.tickets__descr-item').children('.tickets__descr-time').html();
        let duration = $('.tickets__duration-item--active').children('.tickets__duration-link').html();
        time = time.replace(/&nbsp;/g, ' ');
        $('#course').val('Абонемент ' + heading + ' на ' + duration + '. ' + time)
    });


    $('.close, .overlay').on('click',function () {
        $('.overlay').fadeOut(400);
        $('.trial__modal').fadeOut(600);
        $('.footer__trial-form-input').css('border-color', '#8e80a9');
    });

    /*
    отправка формы + валидация
     */

    $('.submit').on('click', function () {
        event.preventDefault();
        let name = $(this).parent('.footer__trial-form').children('label').children('.footer__trial-form-input')[0];
        let phone = $(this).parent().children('label').children('.footer__trial-form-input')[1];
        let nameValue = $(name).val();
        let phoneValue = $(phone).val();
        let valid = validate_form();


        function validate_form () {
            return !((nameValue === "") || (phoneValue === ""));
        }

        if (valid) {

            $('.trial__modal').fadeOut(600);
            $('.trial__modal-input').css('border-color', '#8e80a9').val('');
            $('.trial__success').fadeIn(400).delay(1500).fadeOut(600, function () {
                $('.overlay').fadeOut(400);
            });

        } else  {

            if ((nameValue !== "")) {
                $(name).css('border-color', '#8e80a9');
            } else {
                $(name).css('border-color', 'red');
            }

            if ((phoneValue !== "")) {
                $(phone).css('border-color', '#8e80a9');
            } else {
                $(phone).css('border-color', 'red');
            }
        }

        //сброс формы
        $('form').trigger('reset');

    });

    /*
    центровка элемента
     */

    $.fn.center = function() {
        this.css({
            'position': 'fixed',
            'left': '50%',
            'top': '50%'
        });
        this.css({
            'margin-left': -this.outerWidth() / 2 + 'px',
            'margin-top': -this.outerHeight() / 2 + 'px'
        });

        return this;
    };

    $('.courses__all').center();
    $('.trial__modal').center();
    $('.trial__success').center();


    /*
    слайдер отзывы
     */

    let slides = $(".feedback__slider .feedback__slides").children(".feedback__slide"); // Получаем массив всех слайдов
    let width = $(".feedback__slider .feedback__slides").width(); // Получаем ширину видимой области
    let i = slides.length/2; // Получаем количество слайдов
    let offset = i * width; // Задаем начальное смещение и ширину всех слайдов
    i=i-2; // уменьшаем кол-во слайдов на два ( для проверки в будущем )

    let h = 1;
    $('.feedback__controls--count').html(h + '/' + (i + 1) );
    $(".feedback__controls-button--prev").prop('disabled', 'true');

    if ($(window).width() > 970) {
        let i = slides.length/2; // Получаем количество слайдов
        let offset = i * width; // Задаем начальное смещение и ширину всех слайдов
        i=i-2; // уменьшаем кол-во слайдов на два ( для проверки в будущем )
    }


    $(".feedback__slider .feedback__slides").css('width',offset); // Задаем блоку со слайдами ширину всех слайдов

    offset = 0; // Обнуляем смещение, так как показывается начала 1 слайд
    $(".feedback__controls-button--next").click(function(){	// Событие клика на кнопку "следующий слайд"
        if (offset < width * i) {	// Проверяем, дошли ли мы до конца
            offset += width; // Увеличиваем смещение до следующего слайда
            $(".feedback__slider .feedback__slides").css("transform","translate3d(-"+offset+"px, 0px, 0px)"); // Смещаем блок со слайдами к следующему
        }

        /*
           счетчик страниц слайдера отзывы на увеличение
       */

        $(".feedback__controls-button--prev").removeAttr('disabled');

        h++;

        if (h >= (i + 1)) {
            $(".feedback__controls-button--next").prop('disabled', 'true');
        } else {
            $(".feedback__controls-button--next").removeAttr('disabled');
        }

        $('.feedback__controls--count').html(h + '/' + (i + 1) );


    });


    $(".feedback__controls-button--prev").click(function(){	// Событие клика на кнопку "предыдущий слайд"
        if (offset > 0) { // Проверяем, дошли ли мы до конца
            offset -= width; // Уменьшаем смещение до предыдущего слайда
            $(".feedback__slider .feedback__slides").css("transform","translate3d(-"+offset+"px, 0px, 0px)"); // Смещаем блок со слайдами к предыдущему
        }

        /*
            счетчик страниц слайдера отзывы на уменьшение
        */

        $(".feedback__controls-button--next").removeAttr('disabled');

        h--;

        if (h <= 1) {
            $(".feedback__controls-button--prev").prop('disabled', 'true');
        } else {
            $(".feedback__controls-button--prev").removeAttr('disabled');
        }

        $('.feedback__controls--count').html(h + '/' + (i + 1) );
    });

    /*
    слайдер команда
     */

    let slides__team = $(".team__slider .team__slides").children(".team__slide"); // Получаем массив всех слайдов
    let width__team = $(".team__slider .team__slides").width(); // Получаем ширину видимой области

    if ($(window).width() < 451) {
        width__team = 370;
    }

    if ($(window).width() < 400) {
        width__team = 340;
    }

    if ($(window).width() < 370) {
        width__team = 350;
    }

    let k = slides__team.length; // Получаем количество слайдов
    let offset__team = k * width__team; // Задаем начальное смещение и ширину всех слайдов
    k--; // уменьшаем кол-во слайдов на один ( для проверки в будущем )
    let j = 1;
    $('.team-about__controls--count').html(j + '/' + (k + 1) );
    $(".team-about__controls--prev").prop('disabled', 'true');

    $(".team__slider .team__slides").css('width', offset__team); // Задаем блоку со слайдами ширину всех слайдов

    offset__team = 0; // Обнуляем смещение, так как показывается начала 1 слайд
    $("body .team__slider .team-about__controls--next").click(function(){	// Событие клика на кнопку "следующий слайд"
        if (offset__team < width__team * k) {	// Проверяем, дошли ли мы до конца
            offset__team += width__team; // Увеличиваем смещение до следующего слайда
            $(".team__slider .team__slides").css("transform","translate3d(-"+offset__team+"px, 0px, 0px)"); // Смещаем блок со слайдами к следующему
        }

        /*
            счетчик страниц слайдера команды на увеличение
        */

        $(".team-about__controls--prev").removeAttr('disabled');

        j++;

        if (j >= (k + 1)) {
            $(".team-about__controls--next").prop('disabled', 'true');
        } else {
            $(".team-about__controls--next").removeAttr('disabled');
        }

        $('.team-about__controls--count').html(j + '/' + (k + 1) );

    });


    $("body .team__slider .team-about__controls--prev").click(function(){	// Событие клика на кнопку "предыдущий слайд"
        if (offset__team > 0) { // Проверяем, дошли ли мы до конца
            offset__team -= width__team; // Уменьшаем смещение до предыдущего слайда
            $(".team__slider .team__slides").css("transform","translate3d(-"+offset__team+"px, 0px, 0px)"); // Смещаем блок со слайдами к предыдущему
        }

        /*
            счетчик страниц слайдера команды на уменьшение
        */

        $(".team-about__controls--next").removeAttr('disabled');

        j--;

        if (j <= 1) {
            $(".team-about__controls--prev").prop('disabled', 'true');
        } else {
            $(".team-about__controls--prev").removeAttr('disabled');
        }

        $('.team-about__controls--count').html(j + '/' + (k + 1) );
    });


    /*
    работа с медиа
     */

    /*
    направления
     */

    $(window).resize(function () {
        if($(window).width() < 681){
            $('.courses__item').eq(0).removeClass('courses__item--vertical');
            $('.courses__unit').removeClass('courses__unit--vertical');
        }
        if($(window).width() > 681) {
            $('.courses__item').eq(0).addClass('courses__item--vertical');
            $('.courses__unit').eq(0).addClass('courses__unit--vertical');
        }

        if($(window).width() < 400){
            $('.courses__unit').addClass('courses__unit--vertical');
        }
        if($(window).width() > 400 && $(window).width() < 681) {
            $('.courses__unit').removeClass('courses__unit--vertical');
        }
    });

    if($(window).width() < 681){
        $('.courses__item').eq(0).removeClass('courses__item--vertical');
        $('.courses__unit').removeClass('courses__unit--vertical');
    }
    if($(window).width() > 681) {
        $('.courses__item').eq(0).addClass('courses__item--vertical');
        $('.courses__unit').eq(0).addClass('courses__unit--vertical');
    }

    if($(window).width() < 400){
        $('.courses__unit').addClass('courses__unit--vertical');
    }
    if($(window).width() > 400 && $(window).width() < 681) {
        $('.courses__unit').removeClass('courses__unit--vertical');
    }

    /*
    команда
     */

    $(window).resize(function () {
        if($(window).width() < 681){
            $('.team-about__item').not(':nth-child(1)').hide();
        }

        if($(window).width() > 681){
            $('.team-about__item').show();
        }
    });


    if($(window).width() < 681){
        $('.team-about__item').not(':nth-child(1)').hide();
    }

    if($(window).width() > 681){
        $('.team-about__item').show();
    }


    //маска телефона

    $('.phone').mask('+7 (999) 999-99-99');

    setTimeout(function () {
        document.body.className = "";
    }, 500);


});