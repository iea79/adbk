/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

// @prepros-prepend browserDetect.js

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    subject: '',
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    touchDevice: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i);
    }
};

function isLgWidth() {
    return $(window).width() >= TempApp.lgWidth;
} // >= 1200
function isMdWidth() {
    return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth;
} //  >= 992 && < 1200
function isSmWidth() {
    return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth;
} // >= 768 && < 992
function isXsWidth() {
    return $(window).width() < TempApp.smWidth;
} // < 768
function isIOS() {
    return TempApp.iOS();
} // for iPhone iPad iPod
function isTouch() {
    return TempApp.touchDevice();
} // for touch device



$(document).ready(function() {

    if (isIOS()) {
        $(function() {
            $(document).on('touchend', 'a', $.noop)
        });
    }

    $('[type=tel]').mask("+9(999)999 99 99", {
        showMaskOnHover: false
    });

    $('.nav__item a').on('click', function(event) {
        event.preventDefault();
        $('.nav__item').removeClass('active');
        // $('.nav').removeClass('open');
        if (!isXsWidth()) {
            fullpage_api.moveTo($(this).data('index'));
        } else {
        	var scroll_el = $(this).attr('href');
        		if ($(scroll_el).length != 0) {
        		$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
                $('.nav').removeClass('open');
    		}
        }
    });

    $('.nav__toggle').on('click', function(event) {
        event.preventDefault();
        $(this).closest('.nav').toggleClass('open');
    });

    $('.profitNav__item').on('click', function() {
        var index = $(this).index();
        $('.profitNav__item').not($(this)).removeClass('active');
        $(this).addClass('active');
        $('.profitContent__item').removeClass('active');
        $('.profitContent__item').eq(index).addClass('active');
    });

    $('.nav').on('mouseleave', function() {
        $(this).removeClass('open');
    });


    $('.ourWorkDescr').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        fade: true,
        draggable: false,
        asNavFor: '.ourWorkThumbs'
    });
    $('.ourWorkView').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        // fade: true,
        draggable: false,
        asNavFor: '.ourWorkThumbs'
    });
    $('.ourWorkThumbs').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: false,
        asNavFor: '.ourWorkDescr, .ourWorkView',
        // dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true
    });

    $('[data-toggle="modal"]').on('click', function() {
        TempApp.subject = $(this).data('subject');
        // console.log(TempApp.subject);
    });

    formSubmit();

    checkOnResize();
    initFullPage();

});


function initFullPage() {
    if (!isXsWidth()) {
        new fullpage('.main', {
            licenseKey: null,
            afterRender: function() {
                $('.nav__count span').text(this.index + 1);
            },
            onLeave: function(origin, destination, direction) {
                $('.nav__count span').text(destination.index + 1);
                $('.nav__item').removeClass('active');
                $('.nav__item a[data-index=' + (destination.index + 1) + ']').parent().addClass('active');
                // console.log(destination.index + 1);

                switch (destination.index) {
                    case 0:
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        $('.ourWorkThumbs').slick('slickGoTo', 0);
                        break;
                    case 5:
                        break;
                    default:
                        break;

                }
            }
        });

        $('[href="#privacy"]').on('click', function() {
            $(this).closest('.modal').modal('hide');
        });

        $('.modal').on('show.bs.modal', function() {
            if (!$('body').hasClass('modal-open')) {
                fullpage_api.setAllowScrolling(false);
                fullpage_api.setKeyboardScrolling(false);
            }
        });

        $('.modal').on('hide.bs.modal', function() {
            if (($('.modal.in').length-1) < 1) {
                fullpage_api.setAllowScrolling(true);
                fullpage_api.setKeyboardScrolling(true);
            }
        });

    }
}

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (TempApp.resized == windowWidth) {
        return;
    }
    TempApp.resized = windowWidth;

    checkOnResize();

});

function checkOnResize() {
    fontResize();
    if ($(window).width() < 760) {
        // fullpage_api.destroy('all');
        // console.log('destroy');
    } else {
        // console.log('not destroy');
        // initFullPage();
        // fullpage_api.reBuild();
    }
}

function fontResize() {
    var windowWidth = $(window).width();
    if (!isXsWidth()) {
        var fontSize = windowWidth / 19.05;
    } else {
        var fontSize = windowWidth / 5;
    }
    $('body').css('fontSize', fontSize + '%');
}

// Простая проверка форм на заполненность и отправка аяксом
function formSubmit() {
    // var formMessage = '<div class="form__message"></div>';
    var formMessage = {
        template: '<div class="form__message"></div>',
        message: function(type, text) {
            $('.form__message')
                .addClass(type)
                .html(text);
        },
        open: function(form) {
            if ($('.form__message').length < 1) {
                form.append(formMessage.template);
            }
        },
        close: function() {
            $('.form__message').remove();
        },
        modalShow: function(text) {
            $('.modal.in').modal('hide');
            $('#success').modal('show');
            $('#success .modal-message').html(text);
        }
    };

    $("[type=submit]").on('click', function(e) {
        e.preventDefault();
        $('[name=subject]').val(TempApp.subject);
        var form = $(this).closest('.form');
        var url = form.attr('action');
        var form_data = form.serialize();
        var field = form.find('[required]');
        // console.log(form_data);

        empty = 0;

        field.each(function() {
            if ($(this).val() == "") {
                $(this).addClass('invalid');
                // return false;
                empty++;
            } else {
                $(this).removeClass('invalid');
                $(this).addClass('valid');
            }
        });

        if (empty > 0) {
            formMessage.open(form);
            formMessage.message('error', 'Не заполнены обязательные поля');
            // $('.form__message').addClass('error').text('Не заполнены обязательные поля');
            setTimeout(function () {
                formMessage.close();
            }, 5000);
            return false;
        } else {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "html",
                data: form_data,
                success: function(response) {
                    // $('#success').modal('show');
                    console.log(response);
                    if (form.hasClass('formPresent')) {
                        formMessage.modalShow('Вы можете скачать нашу презентацию перейдя по ссылке <br><br><a href="ABDK_PR1.pdf" target="blank">Скачать презентацию</a>');
                    } else {
                        formMessage.modalShow('Наши специалисты свяжутся с вами в ближайшее время');
                    }
                },
                error: function(response) {
                    // $('#success').modal('show');
                    // console.log('error');
                    formMessage.message('error', 'Что-то пошло не так :( <br> Пожалуйста, отправьте форму повторно.');
                    console.log(response);
                }
            });
        }

    });

    $('[required]').on('blur', function() {
        if ($(this).val() != '') {
            $(this).removeClass('invalid');
        }
    });

    $('.form__privacy input').on('change', function(event) {
        event.preventDefault();
        var btn = $(this).closest('.form').find('.btn');
        if ($(this).prop('checked')) {
            btn.removeAttr('disabled');
            // console.log('checked');
        } else {
            btn.attr('disabled', true);
        }
    });
}

$(window).on('load', function() {
    setTimeout(function() {
        $('.loader').fadeOut('400');
    }, 500);
    setTimeout(function() {
        $('.loader').remove();
    }, 900);
});
