var Notice = (function () {
    function Notice(type, data) {
        if (data === void 0) { data = null; }
        this._type = type;
        this._data = data;
    }
    Object.defineProperty(Notice.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Notice.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    //�л�����
    Notice.CHANGE_VIEW = "change_view";
    return Notice;
})();
Notice.prototype.__class__ = "Notice";
//# sourceMappingURL=Notice.js.map