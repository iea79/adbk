var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            } else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {
            /* For Newer Netscapes (6+) */
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Internet Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "IOS"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        {
            /* For Older Netscapes (4-) */
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS: [{
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ]

};

BrowserDetect.init();

// console.log("browser "+BrowserDetect.browser)
// console.log("version "+BrowserDetect.version)
// console.log("OS "+BrowserDetect.OS)

var browserName = BrowserDetect.browser.toLowerCase();
// var browserName = "it-" + BrowserDetect.browser.toLowerCase();

if (browserName) {
    if ('flex' in document.documentElement.style) {
        // Flexbox-совместимый браузер.
        document.documentElement.setAttribute('data-browser', 'flexible ' + browserName + '');
    } else {
        // Браузер без поддержки Flexbox, в том числе IE 9/10.
        document.documentElement.setAttribute('data-browser', 'not-flex ' + browserName + '');
    }
} else {
    if ('flex' in document.documentElement.style) {
        // Flexbox-совместимый браузер.
        document.documentElement.setAttribute('data-browser', 'flexible');
    } else {
        // Браузер без поддержки Flexbox, в том числе IE 9/10.
        document.documentElement.setAttribute('data-browser', 'not-flex');
    }
}

var hasWebP = (function() {
    var images = {
        basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
        lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
    };

    return function(feature) {
        var deferred = $.Deferred();

        $("<img>").on("load", function() {
            if (this.width === 2 && this.height === 1) {
                deferred.resolve();
            } else {
                deferred.reject();
            }
        }).on("error", function() {
            deferred.reject();
        }).attr("src", images[feature || "basic"]);

        return deferred.promise();
    }
})();

var add = function(msg) {
    console.log(msg);
};

hasWebP().then(function() {
    add("Basic WebP available");
}, function() {
    add("Basic WebP *not* available");
    $('html').addClass('noWebP');
    $('[style]').each(function(index, el) {
        var src = $(this).attr('style');
        src.replace('.webp', '.jpg');
        $(this).attr('style', src.replace('.webp', '.jpg'));
        console.log(src.replace('.webp', '.jpg'));
    });
});