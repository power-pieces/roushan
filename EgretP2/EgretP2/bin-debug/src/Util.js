var Util = (function () {
    function Util() {
    }
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    */
    Util.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Util.stage = null;
    return Util;
})();
Util.prototype.__class__ = "Util";
//# sourceMappingURL=Util.js.map