$(document).ready(function() {

    $('.header-menu-link').click(function(e) {
        $('html').toggleClass('header-menu-open');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('header .container').length == 0) {
            $('html').removeClass('header-menu-open');
        }
    });

    $.validator.addMethod('maskPhone',
        function(value, element) {
            if (value == '') {
                return true;
            }
            return /^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/.test(value);
        },
        'Не соответствует формату'
    );

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $(window).resize(function() {
        windowPosition();
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('click', '.catalogue-menu ul li a', function(e) {
        var curLi = $(this).parent();
        if (curLi.find('ul').length > 0) {
            curLi.toggleClass('open');
            e.preventDefault();
        }
    });

    $('.filter-block-title').click(function() {
        $(this).parents().filter('.filter-block').toggleClass('open');
    });

    $('.filter-block-slider').each(function() {
        var curSlider = $(this);
        var curRange = curSlider.find('.range')[0];
        noUiSlider.create(curRange, {
            start: [Number(curSlider.find('.filter-block-slider-value-from input').val()), Number(curSlider.find('.filter-block-slider-value-to input').val())],
            connect: true,
            range: {
                'min': Number(curSlider.find('.filter-block-slider-min').html()),
                'max': Number(curSlider.find('.filter-block-slider-max').html())
            },
            step: 1,
            format: wNumb({
                decimals: 0
            })
        });
        curRange.noUiSlider.on('update', function(values, handle) {
            curSlider.find('.form-input').eq(handle).find('input').val(values[handle]);
        });
    });

    $('.filter-reset input').click(function() {
        window.setTimeout(function() {
            $('.filter-block-slider').each(function() {
                var curSlider = $(this);
                curSlider.find('.range')[0].noUiSlider.set([Number(curSlider.find('.filter-block-slider-value-from input').val()), Number(curSlider.find('.filter-block-slider-value-to input').val())]);
            });
        }, 100);
    });

    $('.filter-block-slider .form-input input').keypress(function(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 43 || charCode > 57)) {
            return false;
        }
        return true;
    });

    $('.filter-block-slider-value-from input, .filter-block-slider-value-to input').change(function() {
        var curInput = $(this);
        var curValue = Number(curInput.val());
        var curSlider = curInput.parents().filter('.filter-block-slider');
        if (curValue < Number(curSlider.find('.filter-block-slider-min').html())) {
            curValue = Number(curSlider.find('.filter-block-slider-min').html());
        }
        if (curValue > Number(curSlider.find('.filter-block-slider-max').html())) {
            curValue = Number(curSlider.find('.filter-block-slider-max').html());
        }
        curInput.val(curValue);
        curSlider.find('.range')[0].noUiSlider.set([Number(curSlider.find('.filter-block-slider-value-from input').val()), Number(curSlider.find('.filter-block-slider-value-to input').val())]);
    });

    $('.catalogue-sort-current').click(function() {
        $('.catalogue-sort').toggleClass('open');
    });

    $('.catalogue-sort ul a').click(function(e) {
        var curLink = $(this);
        var curSort = curLink.data('value');
        console.log(curSort);
        $('.catalogue-sort-current span').html(curLink.html());
        $('.catalogue-sort').removeClass('open');
        $('.catalogue-sort ul li.active').removeClass('active');
        curLink.parent().addClass('active');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.catalogue-sort').length == 0) {
            $('.catalogue-sort').removeClass('open');
        }
    });

    $('.catalogue-item-compare-link').click(function(e) {
        $(this).toggleClass('active');
        e.preventDefault()
    });

    $('.catalogue-item-favourite-link').click(function(e) {
        $(this).toggleClass('active');
        e.preventDefault()
    });

    $('.catalogue-menu-mobile-link a').click(function(e) {
        $('html').toggleClass('catalogue-menu-mobile-open');
        e.preventDefault()
    });

    $('.catalogue-filter-mobile-link a').click(function(e) {
        $('html').toggleClass('catalogue-filter-mobile-open');
        e.preventDefault()
    });

    $('.slider-list').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    }).on('setPosition', function(slick) {
        var curSlide = $('.slider-list').slick('slickCurrentSlide') + 1;
        if (curSlide < 10) {
            curSlide = '0' + curSlide;
        }
        var countSlides = $('.slider-list .slick-dots li').length;
        if (countSlides < 10) {
            countSlides = '0' + countSlides;
        }

        $('.slider-current').html(curSlide);
        $('.slider-count').html(countSlides);
    });

    $('.slider-prev').click(function(e) {
        $('.slider-list .slick-prev').trigger('click');
        e.preventDefault();
    });

    $('.slider-next').click(function(e) {
        $('.slider-list .slick-next').trigger('click');
        e.preventDefault();
    });

    $('.main-popular .catalogue-list').slick({
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true
                }
            }
        ]
    }).on('setPosition', function(slick) {
        var curSlide = $('.main-popular .catalogue-list').slick('slickCurrentSlide') + 1;
        if (curSlide < 10) {
            curSlide = '0' + curSlide;
        }
        var countSlides = $('.main-popular .catalogue-item').length;
        if (countSlides < 10) {
            countSlides = '0' + countSlides;
        }

        $('.main-popular-current').html(curSlide);
        $('.main-popular-count').html(countSlides);
    });

    $('.main-popular-prev').click(function(e) {
        $('.main-popular .catalogue-list .slick-prev').trigger('click');
        e.preventDefault();
    });

    $('.main-popular-next').click(function(e) {
        $('.main-popular .catalogue-list .slick-next').trigger('click');
        e.preventDefault();
    });

    $('.main-blog-list-inner').slick({
        dots: false,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true
                }
            }
        ]
    });

    $('.main-blog-prev').click(function(e) {
        $('.main-blog-list-inner .slick-prev').trigger('click');
        e.preventDefault();
    });

    $('.main-blog-next').click(function(e) {
        $('.main-blog-list-inner .slick-next').trigger('click');
        e.preventDefault();
    });

    $('.product-favourite').click(function(e) {
        $(this).toggleClass('active');
        e.preventDefault();
    });

    $('.product-photo-list').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $('.product-photo-prev').click(function(e) {
        $('.product-photo-list .slick-prev').trigger('click');
        e.preventDefault();
    });

    $('.product-photo-next').click(function(e) {
        $('.product-photo-list .slick-next').trigger('click');
        e.preventDefault();
    });

    $('.product-tab-menu ul li a').click(function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length > 0) {
            $('html, body').animate({'scrollTop': curBlock.offset().top});
        }
        e.preventDefault();
    });

    $('.product-descr-big a, .product-descr-gallery-item a').fancybox({
        buttons : [
            'close'
        ],
        lang : 'ru',
        i18n : {
            'ru' : {
                CLOSE   : 'Закрыть',
                NEXT    : 'Вперед',
                PREV    : 'Назад'
            }
        }
    });

    $('.product-descr-gallery').slick({
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 2,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    $('.product-add').slick({
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 2,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true,
                    arrows: false
                }
            }
        ]
    });

    $('.product-other .catalogue-list').slick({
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true
                }
            }
        ]
    });

    $('.order-info-delivery-item').change(function() {
        var curIndex = $('.order-info-delivery-item input').index($('.order-info-delivery-item input:checked'));
        $('.order-info-delivery-tab').removeClass('active');
        $('.order-info-delivery-tab').eq(curIndex).addClass('active');
    });

    $('body').on('click', '.order-cart-item-count-field-inc', function(e) {
        var curField = $(this).parents().filter('.order-cart-item-count-field');
        var curValue = Number(curField.find('input').val());
        curValue++;
        curField.find('input').val(curValue);
        curField.find('.order-cart-item-count-field-value').html(curValue);
        recalcCart();
        e.preventDefault();
    });

    $('body').on('click', '.order-cart-item-count-field-dec', function(e) {
        var curField = $(this).parents().filter('.order-cart-item-count-field');
        var curValue = Number(curField.find('input').val());
        curValue--;
        if (curValue < 1) {
            curValue = 1;
        }
        curField.find('input').val(curValue);
        curField.find('.order-cart-item-count-field-value').html(curValue);
        recalcCart();
        e.preventDefault();
    });

    $('body').on('click', '.form-password-show', function(e) {
        var curInput = $(this).parent().find('input');
        if (curInput.attr('type') == 'password') {
            curInput.prop('type', 'text');
        } else {
            curInput.prop('type', 'password');
        }
        e.preventDefault();
    });

    $('.news-gallery').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>'
    });

    $('.blog-slider-list').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    }).on('setPosition', function(slick) {
        var curSlide = $('.blog-slider-list').slick('slickCurrentSlide') + 1;
        if (curSlide < 10) {
            curSlide = '0' + curSlide;
        }
        var countSlides = $('.blog-slider-list .slick-dots li').length;
        if (countSlides < 10) {
            countSlides = '0' + countSlides;
        }

        $('.blog-slider-current').html(curSlide);
        $('.blog-slider-count').html(countSlides);
    });

    $('.blog-slider-prev').click(function(e) {
        $('.blog-slider-list .slick-prev').trigger('click');
        e.preventDefault();
    });

    $('.blog-slider-next').click(function(e) {
        $('.blog-slider-list .slick-next').trigger('click');
        e.preventDefault();
    });

    $('.blog-gallery').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: false
    });

    $('.blog-other .blog-list').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true
                }
            }
        ]
    });

    $('.project-gallery-big').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true
    }).on('setPosition', function(slick) {
        var curSlide = $('.project-gallery-big').slick('slickCurrentSlide');
        $('.project-gallery-preview a').removeClass('active');
        $('.project-gallery-preview a').eq(curSlide).addClass('active');
    });

    $('.project-gallery-preview a').click(function(e) {
        var curIndex = $('.project-gallery-preview a').index($(this));
        $('.project-gallery-big').slick('slickGoTo', curIndex);
        e.preventDefault();
    });

    $('.project-map-point-icon').click(function() {
        var curPoint = $(this).parent();
        if (curPoint.hasClass('open')) {
            curPoint.removeClass('open');
        } else {
            $('.project-map-point.open').removeClass('open');
            curPoint.addClass('open');
        }
    });

    $('.project-map-window-close').click(function(e) {
        $('.project-map-point.open').removeClass('open');
        e.preventDefault();
    });

    if (!Modernizr.touchevents) {
        $('.project-map-container').draggable({
            axis: 'x',
            scroll: true,
            drag: function(event, ui) {
                if (ui.position.left >= 0) {
                    ui.position.left = 0;
                } else {
                    if ($('.project-map-container').width() + ui.position.left <= $('.project-map').width()) {
                        ui.position.left = $('.project-map').width() - $('.project-map-container').width();
                    }
                }
            }
        });
        $(window).on('resize', function() {
            $('.project-map-container').css({'left': 0});
        });
    } else {
        $('.project-map').addClass('touchable');
    }

});

function recalcCart() {
    var allSumm = 0;

    $('.order-cart-item').each(function() {
        var curItem = $(this);
        var curPrice = Number(curItem.data('price'));
        var curCount = Number(curItem.find('.order-cart-item-count-field-value').html());
        var curSumm = curPrice * curCount;
        curItem.find('.order-cart-item-summ span').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        allSumm += curSumm;
    });

    var couponDiscount = 0;
    if ($('.order-cart-item-pre-discount').length > 0) {
        couponDiscount = Number($('.order-cart-item-pre-discount').html().replace(/ /g, ''));
    }
    $('.order-cart-item-pre-summ').html(String(allSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    $('.order-cart-item-all-summ').html(String(allSumm - couponDiscount).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
}

function initForm(curForm) {
    curForm.find('input.maskPhone').mask('+7 (999) 999-99-99');

    curForm.validate({
        ignore: '',
        invalidHandler: function(form, validatorcalc) {
            validatorcalc.showErrors();
            checkErrors();
        },
        submitHandler: function(form) {
            if ($(form).hasClass('ajax-form')) {
                windowOpen($(form).attr('action'), $(form).serialize());
            } else {
                form.submit();
            }
        }
    });
}

function checkErrors() {
    $('.form-checkbox').each(function() {
        var curField = $(this);
        if (curField.find('input.error').length > 0) {
            curField.addClass('error');
        } else {
            curField.removeClass('error');
        }
        if (curField.find('input.valid').length > 0) {
            curField.addClass('valid');
        } else {
            curField.removeClass('valid');
        }
    });
}

function windowOpen(linkWindow, dataWindow, callbackWindow) {
    var curPadding = $('.wrapper').width();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    if ($('.window').length == 0) {
        $('body').append('<div class="window"><div class="window-loading"></div></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').remove();
        }
        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').one('load', function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window-container').removeClass('window-container-load');
            windowPosition();
        }

        if (typeof (callbackWindow) != 'undefined') {
            callbackWindow.call();
        }

        $('.window form').each(function() {
            initForm($(this));
        });
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 60) {
            $('.window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
    }
}

$(window).on('load resize', function() {

    $('.catalogue-list').each(function() {
        var curList = $(this);

        curList.find('.catalogue-item-header').css({'min-height': '0px'});

        curList.find('.catalogue-item-header').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.outerHeight();
            var curTop = curBlock.offset().top;

            curList.find('.catalogue-item-header').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });

        curList.find('.catalogue-item-inner').css({'min-height': '0px'});

        curList.find('.catalogue-item-inner').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.outerHeight();
            var curTop = curBlock.offset().top;

            curList.find('.catalogue-item-inner').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curBlock.css({'min-height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'min-height': curHeight + 'px'});
                    }
                }
            });
        });
    });

});