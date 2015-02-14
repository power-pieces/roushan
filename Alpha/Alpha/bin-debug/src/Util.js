var Util = (function () {
    function Util() {
    }
    /*
     * 获取舞台宽度
     */
    Util.getStageWidth = function () {
        return this.stage.width;
    };
    /*
     * 获取舞台高度
     */
    Util.getStageHeight = function () {
        return this.stage.height;
    };
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    */
    Util.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /*
     * 获取对应数位的值
     *
     */
    Util.getNumberByLevel = function (total, level) {
        var tempNum;
        var levelNum = 1;
        for (var i = 0; i < level; i++) {
            levelNum *= 10;
        }
        tempNum = Math.floor(total * 10 / levelNum);
        return tempNum % levelNum;
    };
    /*
     * 通过数值获取图片
     */
    Util.getNumPicByNum = function (num) {
        var picName = "number" + num;
        return Util.createBitmapByName(picName);
    };
    /*
     * 通过使用方块数量获取结束内容
     */
    Util.getResultContent = function (num) {
        var tempIndex = 0;
        if (num <= 10) {
            tempIndex = 0;
        }
        else if (num <= 20) {
            tempIndex = 1;
        }
        else if (num <= 30) {
            tempIndex = 2;
        }
        else if (num <= 40) {
            tempIndex = 3;
        }
        else {
            tempIndex = 4;
        }
        return DataCenter.cfg.resultContents[tempIndex];
    };
    Util.stage = null;
    return Util;
})();
Util.prototype.__class__ = "Util";
//# sourceMappingURL=Util.js.map