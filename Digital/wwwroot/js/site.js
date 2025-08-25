var CURRENT_LANGUAGE;

$(document).ready(function () {
    //Expand parent menu of sub menu
    $('a.menu-link.active').closest(".menu-item.menu-accordion").addClass("show");

    CURRENT_LANGUAGE = GetCurrentLang();
});

Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
}

Date.prototype.addSeconds = function (s) {
    this.setSeconds(this.getSeconds() + s);
    return this;
}

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return n;
}

function GetCurrentLang() {
    const obj = [];
    KTCookie.get(".AspNetCore.Culture").split("|").forEach((pair) => {
        const [key, value] = pair.split("=");
        obj[key] = value;
    });

    return obj;
}