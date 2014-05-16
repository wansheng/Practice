function now() {
    var d = new Date();
    return d.getFullYear() + '-' + format2Digits(d.getMonth() + 1) + '-' + format2Digits(d.getDate());
};
function format2Digits(int2Format) {
    var string2Format = int2Format.toString();
    if (string2Format.length == 1) {
        return "0" + string2Format;
    }
    return string2Format
};
function getGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
};