$(document).ready(function(){
    var checkout = false;
    //разделение чисел по разрядам
    $('.info__price').each(function(){
        var price = ($(this).text()).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        $(this).text(price);
    });

    $('.overlay-container').removeClass('overlay');

    //извлечь из локального хранилица информацию о содержимом корзины и его количестве
    $('.basket__items').html(localStorage.getItem('items'));
    $('.cart__counter').html(localStorage.getItem('counter'));
    $('.basket__total').html(localStorage.getItem('total'));

    //если в корзине есть элементы, сделать видимость корзины по hover, проставить галочки добавленным элементам
    if (localStorage.getItem('items') !== null) {
        //видимость корзины только по hover на кнопку корзины
        if($('.cart__counter').html() == 0) {
            $('.basket').removeClass('visible').addClass('hidden');
            $('.overlay-container').removeClass('overlay');

        } else {
            cardVisible();
        }

        $('.basket__item').each(function() {
            var id = $(this).attr('data-id');
            console.log(id);
            $('.card[data-id="' + id + '"]').find('.info__button--add').addClass('active');
        })
    }

    //если счетчик в storage пуст, то ставить 0
    if (localStorage.getItem('counter') == null){
        $('.cart__counter').html('0');
    }

    //если total уже существует, то не добавляем еще раз
    if (localStorage.getItem('items') !== null) {
        checkout = true;
    }

   basketHeight();

    $('.info__button--add').on('click',function (e) {
        e.preventDefault();
        var currentElement = $(e.currentTarget).parents('.card');

        //получить атрибут карточки и установить новый класс активности
        $(this).addClass('active');
        var id = ($(currentElement).attr('data-id'));

       //клонированние данных карточки товара. Присвоить атрибут id карточки из каталога id карточке из корзины
       var item = $('<article class="basket__item item"></article>').attr('data-id', id);
       var container = $('<div class="item__container"></div>');
       var item_img = $((currentElement).find('.card__img').clone()).addClass('item__img');
       var item_info = $('<div class="item__info"></div>');
       var item_category = $((currentElement).find('.info__category').clone()).addClass('item__info--link');
       var item_name = $((currentElement).find('.info__name').clone()).addClass('item__info--title');
       var item_price = $((currentElement).find('.info__price--actual').clone()).addClass('item__price');
       var item_del = $('<button class="item__del" aria-label="удалить из корзины">' +
           '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><g><g>' +
           '<path class="del__svg" fill="#989cb2" d="M4-.002h13a4 4 0 0 1 4 4v12.999a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-13A4 4 0 0 1 4-.' +
           '002zm11.847 8v-1.5h-.614a.877.877 0 0 0-.785-.518h-1.709V5.9c0-.822-.412-1.22-1.26-1.22H9.52c-.847 0-1.259.' +
           '398-1.259 1.22v.08H6.552a.877.877 0 0 0-.786.519h-.614v1.498h.84v7.957c0 .576.502 1.042 1.12 1.042h6.776c.617 ' +
           '0 1.12-.466 1.12-1.042V7.997zm-6.84 7.125h-.992V8.882h.992zm1.989 0h-.992V8.882h.992zm2.02 0h-1.024V8.882h1.023z"/></g></g></svg></button>');

        //добавляем на страницу карточки
        $('.basket__items').append(item);
        $(item).append(container);
        $(container).prepend(item_img, item_info, item_price, item_del);
        $(item_info).prepend(item_category, item_name);

        //формируем checkout зону корзины
        var total_order = $('<a class="total__order" href="#">Заказать товары</a>');
        var total_info = $('<div class="total__info">');
        var total_quantity = $('<span class="total__quantity"></span>');
        var total_amount = $('<span class="total__amount info__price info__price--actual"></span>');

        //добавить зону checkout корзины если ее еще нет
        if (!checkout) {
            $('.basket__total').append(total_order, total_info);
            $(total_info).prepend(total_quantity, total_amount);
            checkout = true;
        }

        cardVisible();

        basketHeight();

        //checkout зона видна, если корзина не пуста
       $('.basket__total').removeClass('hidden').addClass('visible');
       $('.overlay__container').removeClass('hidden');

        calculate();

        counter();

        addToStorage();
   });

   //удаление предметов из корзины
    $('.basket__container').on('click', '.item__del',function () {

        $(this).parents('.basket__item').remove();

        //при удалении элемента из корзины, снять галочку с такого же товара в каталоге
        var item_attr = ($(this).parents('.basket__item')).attr('data-id');

        ($('.card').each(function()  {
            var id = ($(this).attr('data-id'));
            if (id == item_attr) {
                $(this).find('.info__button--add').removeClass('active');
            }
        }));

        //если basket__items пустой, то удалять раздел checkout зоны и оверлей
        if ($('.basket__items').is(':empty')){
            $('.basket__total').removeClass('visible').addClass('hidden');
            $('.overlay__container').addClass('hidden');
        }

        calculate();

        counter();

        basketHeight();

        addToStorage();
    });
});

//склонение существительных
function getNoun(number, one, two, five) {
    var n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}

//сумма заказа
function calculate() {
    var sum = 0;

    $('.item__price').each(function() {
        var current_price =  $(this).text();
        current_price = current_price.replace(/\s+/g, '');
        sum += parseInt(current_price);
    });
    var sumStr = String(sum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    $('.total__amount').html(sumStr + ' p');
}

//счетчик количества товаров
function counter() {
    var count = $('.basket__item').length;
    $('.cart__counter').html(count);
    ($('.total__quantity').html((count) + ' ' + getNoun((count), 'товар', 'товара', 'товаров') + ' на сумму'));
}

//добавить в локальное хранилище информцию о содержимом корзины и его количестве
function addToStorage() {
    var cart_items = $('.basket__items').html();
    localStorage.setItem('items', cart_items);
    var cart_counter = $('.cart__counter').html();
    localStorage.setItem('counter', cart_counter);
    var cart_total = $('.basket__total').html();
    localStorage.setItem('total', cart_total);
}

//высота корзины
function basketHeight() {
    var item_height =  $('.basket__item').height();
    var count_item = $('.basket__item').length;

    if (count_item > 3) {
        $('.basket__items').css({
            'height': 4 * item_height + 'px',
            'overflow-y': 'scroll'
        })
    } else {
        $('.basket__items').css({
            'height': '',
            'overflow-y': 'none'
        })
    }
}

//видимость корзины только по hover на кнопку корзины
function cardVisible() {
    $('.header__cart').hover(function() {
        $('.basket').addClass('visible').removeClass('hidden');
        $('.overlay__container').addClass('overlay');
    }, function(){
        $('.basket').removeClass('visible').addClass('hidden');
        $('.overlay__container').removeClass('overlay');
    });
}