function isLgWidth() {
    return $(window).width() >= TempApp.lgWidth;
}

function isMdWidth() {
    return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth;
}

function isSmWidth() {
    return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth;
}

function isXsWidth() {
    return $(window).width() < TempApp.smWidth;
}

function isIOS() {
    return TempApp.iOS();
}

function isTouch() {
    return TempApp.touchDevice();
}

function initFullPage() {
    isXsWidth() || (new fullpage(".main", {
        licenseKey: null,
        afterRender: function() {
            $(".nav__count span").text(this.index + 1);
        },
        onLeave: function(e, t, i) {
            switch ($(".nav__count span").text(t.index + 1), $(".nav__item").removeClass("active"), 
            $(".nav__item a[data-index=" + (t.index + 1) + "]").parent().addClass("active"), 
            t.index) {
              case 0:
              case 1:
              case 2:
              case 3:
                break;

              case 4:
                $(".ourWorkThumbs").slick("slickGoTo", 0);
            }
        }
    }), $('[href="#privacy"]').on("click", function() {
        $(this).closest(".modal").modal("hide");
    }), $(".modal").on("show.bs.modal", function() {
        $("body").hasClass("modal-open") || (fullpage_api.setAllowScrolling(!1), fullpage_api.setKeyboardScrolling(!1));
    }), $(".modal").on("hide.bs.modal", function() {
        $(".modal.in").length - 1 < 1 && (fullpage_api.setAllowScrolling(!0), fullpage_api.setKeyboardScrolling(!0));
    }));
}

function checkOnResize() {
    fontResize(), $(window).width();
}

function fontResize() {
    var e = $(window).width();
    if (isXsWidth()) t = e / 5; else var t = e / 19.05;
    $("body").css("fontSize", t + "%");
}

function formSubmit() {
    var r = {
        template: '<div class="form__message"></div>',
        message: function(e, t) {
            $(".form__message").addClass(e).html(t);
        },
        open: function(e) {
            $(".form__message").length < 1 && e.append(r.template);
        },
        close: function() {
            $(".form__message").remove();
        },
        modalShow: function(e) {
            $(".modal.in").modal("hide"), $("#success").modal("show"), $("#success .modal-message").html(e);
        }
    };
    $("[type=submit]").on("click", function(e) {
        e.preventDefault(), $("[name=subject]").val(TempApp.subject);
        var t = $(this).closest(".form"), i = t.attr("action"), n = t.serialize(), o = t.find("[required]");
        if (empty = 0, o.each(function() {
            "" == $(this).val() ? ($(this).addClass("invalid"), empty++) : ($(this).removeClass("invalid"), 
            $(this).addClass("valid"));
        }), 0 < empty) return r.open(t), r.message("error", "Не заполнены обязательные поля"), 
        setTimeout(function() {
            r.close();
        }, 5e3), !1;
        $.ajax({
            url: i,
            type: "POST",
            dataType: "html",
            data: n,
            success: function(e) {
                console.log(e), t.hasClass("formPresent") ? r.modalShow('Вы можете скачать нашу презентацию перейдя по ссылке <br><br><a href="ABDK_PR1.pdf" target="blank">Скачать презентацию</a>') : r.modalShow("Наши специалисты свяжутся с вами в ближайшее время");
            },
            error: function(e) {
                r.message("error", "Что-то пошло не так :( <br> Пожалуйста, отправьте форму повторно."), 
                console.log(e);
            }
        });
    }), $("[required]").on("blur", function() {
        "" != $(this).val() && $(this).removeClass("invalid");
    }), $(".form__privacy input").on("change", function(e) {
        e.preventDefault();
        var t = $(this).closest(".form").find(".btn");
        $(this).prop("checked") ? t.removeAttr("disabled") : t.attr("disabled", !0);
    });
}

var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version", 
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function(e) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t].string, n = e[t].prop;
            if (this.versionSearchString = e[t].versionSearch || e[t].identity, i) {
                if (-1 != i.indexOf(e[t].subString)) return e[t].identity;
            } else if (n) return e[t].identity;
        }
    },
    searchVersion: function(e) {
        var t = e.indexOf(this.versionSearchString);
        if (-1 != t) return parseFloat(e.substring(t + this.versionSearchString.length + 1));
    },
    dataBrowser: [ {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Internet Explorer",
        versionSearch: "MSIE"
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "IOS"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    } ],
    dataOS: [ {
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    } ]
};

BrowserDetect.init();

var browserName = BrowserDetect.browser.toLowerCase();

browserName ? "flex" in document.documentElement.style ? document.documentElement.setAttribute("data-browser", "flexible " + browserName) : document.documentElement.setAttribute("data-browser", "not-flex " + browserName) : "flex" in document.documentElement.style ? document.documentElement.setAttribute("data-browser", "flexible") : document.documentElement.setAttribute("data-browser", "not-flex");

var hasWebP = function() {
    var i = {
        basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
        lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
    };
    return function(e) {
        var t = $.Deferred();
        return $("<img>").on("load", function() {
            2 === this.width && 1 === this.height ? t.resolve() : t.reject();
        }).on("error", function() {
            t.reject();
        }).attr("src", i[e || "basic"]), t.promise();
    };
}(), add = function(e) {
    console.log(e);
};

hasWebP().then(function() {
    add("Basic WebP available");
}, function() {
    add("Basic WebP *not* available"), $("html").addClass("noWebP"), $("[style]").each(function(e, t) {
        var i = $(this).attr("style");
        i.replace(".webp", ".jpg"), $(this).attr("style", i.replace(".webp", ".jpg")), console.log(i.replace(".webp", ".jpg"));
    });
});

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: !1,
    subject: "",
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    touchDevice: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i);
    }
};

$(document).ready(function() {
    isIOS() && $(function() {
        $(document).on("touchend", "a", $.noop);
    }), $("[type=tel]").mask("+9(999)999 99 99", {
        showMaskOnHover: !1
    }), $(".nav__item a").on("click", function(e) {
        if (e.preventDefault(), $(".nav__item").removeClass("active"), isXsWidth()) {
            var t = $(this).attr("href");
            0 != $(t).length && ($("html, body").animate({
                scrollTop: $(t).offset().top
            }, 500), $(".nav").removeClass("open"));
        } else fullpage_api.moveTo($(this).data("index"));
    }), $(".nav__toggle").on("click", function(e) {
        e.preventDefault(), $(this).closest(".nav").toggleClass("open");
    }), $(".profitNav__item").on("click", function() {
        var e = $(this).index();
        $(".profitNav__item").not($(this)).removeClass("active"), $(this).addClass("active"), 
        $(".profitContent__item").removeClass("active"), $(".profitContent__item").eq(e).addClass("active");
    }), $(".nav").on("mouseleave", function() {
        $(this).removeClass("open");
    }), $(".ourWorkDescr").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: !1,
        arrows: !1,
        fade: !0,
        draggable: !1,
        asNavFor: ".ourWorkThumbs"
    }), $(".ourWorkView").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: !1,
        arrows: !1,
        draggable: !1,
        asNavFor: ".ourWorkThumbs"
    }), $(".ourWorkThumbs").slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        variableWidth: !0,
        infinite: !1,
        asNavFor: ".ourWorkDescr, .ourWorkView",
        arrows: !1,
        centerMode: !1,
        focusOnSelect: !0
    }), $('[data-toggle="modal"]').on("click", function() {
        TempApp.subject = $(this).data("subject");
    }), formSubmit(), checkOnResize(), initFullPage();
}), $(window).resize(function(e) {
    var t = $(window).width();
    TempApp.resized != t && (TempApp.resized = t, checkOnResize());
}), $(window).on("load", function() {
    setTimeout(function() {
        $(".loader").fadeOut("400");
    }, 500), setTimeout(function() {
        $(".loader").remove();
    }, 900);
});