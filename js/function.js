/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
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

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function() {
            $(document).on('touchend', 'a', $.noop)
        });
    }

    // Reset link whte attribute href="#"
    // $('[href*="#"]').click(function(event) {
    //     event.preventDefault();
    // });
    // Inputmask.js
    $('[name=tel]').mask("+9(999)999 99 99", {
        showMaskOnHover: false
    });

    formSubmit();

    // gridMatch();


    checkOnResize();
    $('.nav__item a').on('click', function(event) {
        event.preventDefault();
        $('.nav__item').removeClass('active');
        // $('.nav').removeClass('open');
        fullpage_api.moveTo($(this).data('index'));
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

});


if (!isXsWidth()) {
    new fullpage('.main', {
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
    // gridMatch();
    fontResize();
}

function gridMatch() {
    // $('[data-grid-match] .grid__item').matchHeight({
    //     byRow: true,
    // });
}

function fontResize() {
    var windowWidth = $(window).width();
    if (windowWidth >= 1200) {
        var fontSize = windowWidth / 19.05;
    } else if (windowWidth < 1200) {
        var fontSize = windowWidth / 5;
    }
    $('body').css('fontSize', fontSize + '%');
}

// Видео youtube для страницы
// $(function() {
//     if ($(".js_youtube")) {
//         $(".js_youtube").each(function() {
//             // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
//             $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

//             // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
//             $(this).append($('<img src="img/play.svg" alt="Play" class="video__play">'));

//         });

//         $('.video__play, .video__prev').on('click', function() {
//             // создаем iframe со включенной опцией autoplay
//             var videoId = $(this).closest('.js_youtube').attr('id');
//             var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";
//             if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

//             // Высота и ширина iframe должны быть такими же, как и у родительского блока
//             var iframe = $('<iframe/>', {
//                 'frameborder': '0',
//                 'src': iframe_url,
//                 'width': $(this).width(),
//                 'height': $(this).innerHeight()
//             })

//             // Заменяем миниатюру HTML5 плеером с YouTube
//             $(this).closest('.video__wrapper').append(iframe);

//         });
//     }

// });

// Деление чисел на разряды Например из строки 10000 получаем 10 000
// Использование: thousandSeparator(1000) или используем переменную.
// function thousandSeparator(str) {
//     var parts = (str + '').split('.'),
//         main = parts[0],
//         len = main.length,
//         output = '',
//         i = len - 1;

//     while(i >= 0) {
//         output = main.charAt(i) + output;
//         if ((len - i) % 3 === 0 && i > 0) {
//             output = ' ' + output;
//         }
//         --i;
//     }

//     if (parts.length > 1) {
//         output += '.' + parts[1];
//     }
//     return output;
// };


// Хак для яндекс карт втавленных через iframe
// Страуктура:
//<div class="map__wrap" id="map-wrap">
//  <iframe style="pointer-events: none;" src="https://yandex.ru/map-widget/v1/-/CBqXzGXSOB" width="1083" height="707" frameborder="0" allowfullscreen="true"></iframe>
//</div>
// Обязательное свойство в style которое и переключет скрипт
// document.addEventListener('click', function(e) {
//     var map = document.querySelector('#map-wrap iframe')
//     if(e.target.id === 'map-wrap') {
//         map.style.pointerEvents = 'all'
//     } else {
//         map.style.pointerEvents = 'none'
//     }
// })

// Простая проверка форм на заполненность и отправка аяксом
function formSubmit() {
    $("[type=submit]").on('click', function(e) {
        e.preventDefault();
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

        // console.log(empty);

        if (empty > 0) {
            return false;
        } else {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "html",
                data: form_data,
                success: function(response) {
                    // $('#success').modal('show');
                    // console.log('success');
                    console.log(response);
                    // console.log(data);
                    // document.location.href = "success.html";
                },
                error: function(response) {
                    // $('#success').modal('show');
                    // console.log('error');
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

var preloader = new GSPreloader({
    radius: 42,
    dotSize: 15,
    dotCount: 10,
    colors: ["#61AC27", "#555", "purple", "#FF6600"], //have as many or as few colors as you want.
    boxOpacity: 0.2,
    boxBorder: "1px solid #AAA",
    animationOffset: 1.8, //jump 1.8 seconds into the animation for a more active part of the spinning initially (just looks a bit better in my opinion)
});

//open the preloader
preloader.active(true);


$(window).on('load', function() {
    preloader.active(false);
    setTimeout(function() {
        $('.loader').fadeOut('400');
    }, 900);
    setTimeout(function() {
        $('.loader').remove();
    }, 1300);
});

//this is the whole preloader class/function
function GSPreloader(options) {
    options = options || {};
    var parent = options.parent || document.body,
        element = this.element = document.createElement("div"),
        radius = options.radius || 42,
        dotSize = options.dotSize || 15,
        animationOffset = options.animationOffset || 1.8, //jumps to a more active part of the animation initially (just looks cooler especially when the preloader isn't displayed for very long)
        createDot = function(rotation) {
            var dot = document.createElement("div");
            element.appendChild(dot);
            TweenLite.set(dot, {
                width: dotSize,
                height: dotSize,
                transformOrigin: (-radius + "px 0px"),
                x: radius,
                backgroundColor: colors[colors.length - 1],
                borderRadius: "50%",
                force3D: true,
                position: "absolute",
                rotation: rotation
            });
            dot.className = options.dotClass || "preloader-dot";
            return dot;
        },
        i = options.dotCount || 10,
        rotationIncrement = 360 / i,
        colors = options.colors || ["#61AC27", "black"],
        animation = new TimelineLite({
            paused: true
        }),
        dots = [],
        isActive = false,
        box = document.createElement("div"),
        tl, dot, closingAnimation, j;
    colors.push(colors.shift());

    //setup background box
    TweenLite.set(box, {
        width: radius * 2 + 70,
        height: radius * 2 + 70,
        // borderRadius: "14px",
        // backgroundColor: options.boxColor || "white",
        // border: options.boxBorder || "1px solid #AAA",
        position: "absolute",
        xPercent: -50,
        yPercent: -50,
        opacity: ((options.boxOpacity != null) ? options.boxOpacity : 0.3)
    });
    box.className = options.boxClass || "preloader-box";
    element.appendChild(box);

    parent.appendChild(element);
    TweenLite.set(element, {
        position: "fixed",
        top: "45%",
        left: "50%",
        perspective: 600,
        overflow: "visible",
        zIndex: 2000
    });
    animation.from(box, 0.1, {
        opacity: 0,
        scale: 0.1,
        ease: Power1.easeOut
    }, animationOffset);
    while (--i > -1) {
        dot = createDot(i * rotationIncrement);
        dots.unshift(dot);
        animation.from(dot, 0.1, {
            scale: 0.01,
            opacity: 0,
            ease: Power1.easeOut,
            immediateRender: true
        }, animationOffset);
        //tuck the repeating parts of the animation into a nested TimelineMax (the intro shouldn't be repeated)
        tl = new TimelineMax({
            repeat: -1,
            repeatDelay: 0.25
        });
        for (j = 0; j < colors.length; j++) {
            tl.to(dot, 2.5, {
                    rotation: "-=360",
                    ease: Power2.easeInOut
                }, j * 2.9)
                .to(dot, 1.2, {
                    skewX: "+=360",
                    backgroundColor: colors[j],
                    ease: Power2.easeInOut
                }, 1.6 + 2.9 * j);
        }
        //stagger its placement into the master timeline
        animation.add(tl, i * 0.07);
    }
    if (TweenLite.render) {
        TweenLite.render(); //trigger the from() tweens' lazy-rendering (otherwise it'd take one tick to render everything in the beginning state, thus things may flash on the screen for a moment initially). There are other ways around this, but TweenLite.render() is probably the simplest in this case.
    }

    //call preloader.active(true) to open the preloader, preloader.active(false) to close it, or preloader.active() to get the current state.
    this.active = function(show) {
        if (!arguments.length) {
            return isActive;
        }
        if (isActive != show) {
            isActive = show;
            if (closingAnimation) {
                closingAnimation.kill(); //in case the preloader is made active/inactive/active/inactive really fast and there's still a closing animation running, kill it.
            }
            if (isActive) {
                element.style.visibility = "visible";
                TweenLite.set([element, box], {
                    rotation: 0
                });
                animation.play(animationOffset);
            } else {
                closingAnimation = new TimelineLite();
                if (animation.time() < animationOffset + 0.3) {
                    animation.pause();
                    closingAnimation.to(element, 1, {
                        rotation: -360,
                        ease: Power1.easeInOut
                    }).to(box, 1, {
                        rotation: 360,
                        ease: Power1.easeInOut
                    }, 0);
                }
                closingAnimation.staggerTo(dots, 0.3, {
                    scale: 0.01,
                    opacity: 0,
                    ease: Power1.easeIn,
                    overwrite: false
                }, 0.05, 0).to(box, 0.4, {
                    opacity: 0,
                    scale: 0.2,
                    ease: Power2.easeIn,
                    overwrite: false
                }, 0).call(function() {
                    animation.pause();
                    closingAnimation = null;
                }).set(element, {
                    visibility: "hidden"
                });
            }
        }
        return this;
    };
}