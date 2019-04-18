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
    isXsWidth() || new fullpage(".main", {
        licenseKey: null,
        afterRender: function() {
            $(".nav__count span").text(this.index + 1);
        },
        onLeave: function(e, i, t) {
            switch ($(".nav__count span").text(i.index + 1), $(".nav__item").removeClass("active"), 
            $(".nav__item a[data-index=" + (i.index + 1) + "]").parent().addClass("active"), 
            i.index) {
              case 0:
              case 1:
              case 2:
              case 3:
                break;

              case 4:
                $(".ourWorkThumbs").slick("slickGoTo", 0);
            }
        }
    });
}

function checkOnResize() {
    fontResize(), $(window).width();
}

function fontResize() {
    var e = $(window).width();
    if (isXsWidth()) i = e / 5; else var i = e / 19.05;
    $("body").css("fontSize", i + "%");
}

function formSubmit() {
    $("[type=submit]").on("click", function(e) {
        e.preventDefault();
        var i = $(this).closest(".form"), t = i.attr("action"), n = i.serialize(), r = i.find("[required]");
        if (empty = 0, r.each(function() {
            "" == $(this).val() ? ($(this).addClass("invalid"), empty++) : ($(this).removeClass("invalid"), 
            $(this).addClass("valid"));
        }), 0 < empty) return !1;
        $.ajax({
            url: t,
            type: "POST",
            dataType: "html",
            data: n,
            success: function(e) {
                console.log(e);
            },
            error: function(e) {
                console.log(e);
            }
        });
    }), $("[required]").on("blur", function() {
        "" != $(this).val() && $(this).removeClass("invalid");
    }), $(".form__privacy input").on("change", function(e) {
        e.preventDefault();
        var i = $(this).closest(".form").find(".btn");
        $(this).prop("checked") ? i.removeAttr("disabled") : i.attr("disabled", !0);
    });
}

var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version", 
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function(e) {
        for (var i = 0; i < e.length; i++) {
            var t = e[i].string, n = e[i].prop;
            if (this.versionSearchString = e[i].versionSearch || e[i].identity, t) {
                if (-1 != t.indexOf(e[i].subString)) return e[i].identity;
            } else if (n) return e[i].identity;
        }
    },
    searchVersion: function(e) {
        var i = e.indexOf(this.versionSearchString);
        if (-1 != i) return parseFloat(e.substring(i + this.versionSearchString.length + 1));
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
    var t = {
        basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
        lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
    };
    return function(e) {
        var i = $.Deferred();
        return $("<img>").on("load", function() {
            2 === this.width && 1 === this.height ? i.resolve() : i.reject();
        }).on("error", function() {
            i.reject();
        }).attr("src", t[e || "basic"]), i.promise();
    };
}(), add = function(e) {
    console.log(e);
};

hasWebP().then(function() {
    add("Basic WebP available");
}, function() {
    add("Basic WebP *not* available"), $("html").addClass("noWebP"), $("[style]").each(function(e, i) {
        var t = $(this).attr("style");
        t.replace(".webp", ".jpg"), $(this).attr("style", t.replace(".webp", ".jpg")), console.log(t.replace(".webp", ".jpg"));
    });
});

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: !1,
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
        e.preventDefault(), $(".nav__item").removeClass("active"), fullpage_api.moveTo($(this).data("index"));
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
    }), formSubmit(), checkOnResize(), initFullPage();
}), $(window).resize(function(e) {
    var i = $(window).width();
    TempApp.resized != i && (TempApp.resized = i, checkOnResize());
}), $(window).on("load", function() {
    setTimeout(function() {
        $(".loader").fadeOut("400");
    }, 500), setTimeout(function() {
        $(".loader").remove();
    }, 900);
});