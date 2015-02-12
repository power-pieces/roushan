var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Paper = (function (_super) {
    __extends(Paper, _super);
    function Paper(width, height) {
        _super.call(this);
        this._lastP = new egret.Point(0, 0);
        this._color = 0;
        this._time = 0;
        //画线的间隔 ms
        this.draw_interval = 1000 / 60;
        this._lineWidth = 20;
        this._drawEnable = false;
        this._points = [];
        this.enable = true;
        this.minLineW = 5;
        this.maxLineW = 30;
        this.createView(width, height);
    }
    Paper.prototype.createView = function (width, height) {
        //this.graphics.beginFill(0x666666,0);
        //this.graphics.drawRect(0, 0, width, height);
        //this.graphics.endFill();
        this.width = width, this.height = height;
        this.addListeners();
        this.touchEnabled = true;
    };
    Paper.prototype.dispose = function () {
        this.removeListeners();
        this.graphics.clear();
    };
    Paper.prototype.addListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
    };
    Paper.prototype.removeListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
    };
    Paper.prototype.touchHandler = function (e) {
        if (false == this.enable) {
            return;
        }
        var tx = e.localX >> 0;
        var ty = e.localY >> 0;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._time = egret.getTimer();
                this._lastP.x = tx;
                this._lastP.y = ty;
                this.graphics.lineStyle(this._lineWidth, this._color, 1, true, "normal", "round", "round");
                this.graphics.moveTo(tx, ty);
                this._drawEnable = true;
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                var nowTime = egret.getTimer();
                if (this._drawEnable && nowTime - this._time >= this.draw_interval) {
                    this.drawLine(this._lastP.x, this._lastP.y, tx, ty);
                    this._lastP.x = tx;
                    this._lastP.y = ty;
                    this._time = nowTime;
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                this._drawEnable = false;
                break;
        }
    };
    Paper.prototype.clear = function () {
        this.graphics.clear();
        this.setColor(0);
        this._points = [];
    };
    Paper.prototype.getData = function () {
        return this._points;
    };
    Paper.prototype.setColor = function (color) {
        this._color = color;
        this._points.push([color]);
    };
    Paper.prototype.setData = function (points) {
        this.clear();
        if (null == points) {
            return;
        }
        for (var i = 0; i < points.length; i++) {
            var temp = points[i];
            if (temp.length == 1) {
                this.setColor(temp[0]);
            }
            else if (temp.length == 4) {
                this.drawLine(temp[0], temp[1], temp[2], temp[3]);
            }
        }
    };
    Paper.prototype.drawLine = function (startX, startY, endX, endY) {
        //计算画线亮点之间的距离
        var dx = endX - startX;
        var dy = endY - endX;
        var d = dx * dx + dy * dy;
        d = d / (500 * 500);
        if (d > 1) {
            d = 1;
        }
        d = 25 * (1 - d) + 5;
        d >>= 0;
        this.graphics.lineStyle(d, this._color, 1, true, "normal", "round", "round");
        this.graphics.moveTo(startX, startY);
        this.graphics.lineTo(endX, endY);
        this._points.push([startX, startY, endX, endY]);
    };
    return Paper;
})(egret.Sprite);
Paper.prototype.__class__ = "Paper";
