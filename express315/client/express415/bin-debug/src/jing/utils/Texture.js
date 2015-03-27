var Texture = (function () {
    function Texture() {
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Texture.create = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Texture.createTexture = function (name) {
        var texture = RES.getRes(name);
        return texture;
    };
    /*
    *   根据文件名和动画名称来生成MovieClip对象
    */
    Texture.createMC = function (fileName, mcName) {
        var data = RES.getRes(fileName + "_json");
        var texture = RES.getRes(fileName + "_png");
        var factory = new egret.MovieClipDataFactory(data, texture);
        var mc = new egret.MovieClip(factory.generateMovieClipData(mcName));
        return mc;
    };
    /**
    * 创建一个位图文本框
    */
    Texture.createBitmapTF = function (fntName) {
        var tf = new egret.BitmapText();
        var font = RES.getRes(fntName);
        tf.font = font;
        return tf;
    };
    return Texture;
})();
Texture.prototype.__class__ = "Texture";
//# sourceMappingURL=Texture.js.map