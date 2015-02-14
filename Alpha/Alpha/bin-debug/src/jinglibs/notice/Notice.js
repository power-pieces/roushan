var Notice = (function () {
    function Notice(type) {
        this._type = type;
    }
    Object.defineProperty(Notice.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return Notice;
})();
Notice.prototype.__class__ = "Notice";
//# sourceMappingURL=Notice.js.map