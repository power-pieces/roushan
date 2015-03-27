var Texture = (function () {
    function Texture() {
    }
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

    Texture.createMC = function (fileName, mcName) {
        var data = RES.getRes(fileName + "_json");
        var texture = RES.getRes(fileName + "_png");
        var factory = new egret.MovieClipDataFactory(data, texture);
        var mc = new egret.MovieClip(factory.generateMovieClipData(mcName));
        return mc;
    };

    Texture.createBitmapTF = function (fntName) {
        var tf = new egret.BitmapText();
        var font = RES.getRes(fntName);
        tf.font = font;
        return tf;
    };
    return Texture;
})();
