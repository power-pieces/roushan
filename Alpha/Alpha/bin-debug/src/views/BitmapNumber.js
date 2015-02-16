var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Owen on 2015/2/15.
 */
/*
 * 图片数字
 */
var BitmapNumber = (function (_super) {
    __extends(BitmapNumber, _super);
    function BitmapNumber() {
        _super.call(this);
        //数字图片数组
        this._numBits = [];
    }
    /*
     * 设置显示数值
     */
    BitmapNumber.prototype.setShowNumber = function (data) {
        this._showNumber = data;
        this.clearNumBits();
        this.showNumBits();
    };
    /*
     * 清理数字图片数组
     */
    BitmapNumber.prototype.clearNumBits = function () {
        if (this._numBits.length == 0) {
            return;
        }
        var len = this._numBits.length;
        var tempBit;
        while (len > 0) {
            len--;
            tempBit = this._numBits.pop();
            if (tempBit.parent != null) {
                tempBit.parent.removeChild(tempBit);
            }
        }
    };
    /*
     * 显示数字图片
     */
    BitmapNumber.prototype.showNumBits = function () {
        var geLevel = Util.getNumberByLevel(this._showNumber, 1);
        var geBit = Util.getNumPicByNum(geLevel);
        this.addChild(geBit);
        this._numBits.push(geBit);
        if (this._showNumber >= 10) {
            var shiLevel = Util.getNumberByLevel(this._showNumber, 2);
            var shiBit = Util.getNumPicByNum(shiLevel);
            this.addChild(shiBit);
            this._numBits.push(shiBit);
            geBit.x = shiBit.width;
        }
        if (this._showNumber >= 100) {
            var baiLevel = Util.getNumberByLevel(this._showNumber, 3);
            var baiBit = Util.getNumPicByNum(baiLevel);
            this.addChild(baiBit);
            this._numBits.push(baiBit);
            shiBit.x = baiBit.width;
            geBit.x = shiBit.x + shiBit.width;
        }
    };
    return BitmapNumber;
})(egret.Sprite);
BitmapNumber.prototype.__class__ = "BitmapNumber";
//# sourceMappingURL=BitmapNumber.js.map