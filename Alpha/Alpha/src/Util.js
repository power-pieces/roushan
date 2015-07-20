var Util = (function () {
    function Util() {
    }
    Util.getStageWidth = function () {
        return this.stage.stageWidth;
    };
    Util.getStageHeight = function () {
        return this.stage.stageHeight;
    };
    Util.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Util.getNumberByLevel = function (total, level) {
        var tempNum;
        var levelNum = 1;
        for (var i = 0; i < level; i++) {
            levelNum *= 10;
        }
        tempNum = Math.floor(total * 10 / levelNum);
        return tempNum % 10;
    };
    Util.getNumPicByNum = function (num) {
        var picName = "number" + num;
        return Util.createBitmapByName(picName);
    };
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
    Util.getUserID = function () {
        if (window["getMyOpenId"]) {
            var id = window["getMyOpenId"]();
            return id;
        }
        else {
            return "test";
        }
    };
    Util.setUserInfo = function (block, per) {
        if (window["setTimeLine"]) {
            window["setTimeLine"](block, per);
            window["setAppMessage"](block, per);
        }
    };
    Util.checkBlockPress = function (a, b) {
        var ra = a.getRect();
        var rb = b.getRect();
        if (ra.x <= rb.right && ra.right >= rb.x) {
            return true;
        }
        return false;
    };
    Util.stage = null;
    return Util;
})();
