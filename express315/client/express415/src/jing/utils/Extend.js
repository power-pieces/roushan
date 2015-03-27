var Extend = (function () {
    function Extend() {
    }
    Extend.callWindow = function (funName) {
        if (null == window[funName]) {
            return null;
        }
        var result = window[funName]();
        return result;
    };
    return Extend;
})();
