var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShowView = (function (_super) {
    __extends(ShowView, _super);
    function ShowView() {
        _super.call(this);
        this._dataIndex = 0;
        this._beginX = 0;
        this._changed = true;
        this.createView();
        this.touchEnabled = true;
        this.addListeners();
    }
    ShowView.prototype.createView = function () {
        this._btnWatch = Util.createBitmapByName("watch_png");
        this._btnTry = Util.createBitmapByName("try_png");
        this._bg = Util.createBitmapByName(DataCenter.selectedId + "_png");
        this.addChild(this._bg);
        this._bg.y = (Util.stage.stageHeight - this._bg.height) >> 1;
        this.addChild(this._btnTry);
        this._btnTry.y = this._bg.y + this._bg.height + 0;
        this._btnTry.x = (Util.stage.stageWidth >> 1) + 10;
        this._btnTry.touchEnabled = true;
        this.addChild(this._btnWatch);
        this._btnWatch.y = this._bg.y + this._bg.height + 0;
        this._btnWatch.x = (Util.stage.stageWidth >> 1) - this._btnWatch.width - 10;
        this._btnWatch.touchEnabled = true;
        var tf = new egret.TextField();
        tf.text = "关注我们，看更多";
        tf.textColor = 0;
        tf.bold = true;
        var tf1 = new egret.TextField();
        tf1.text = "优秀作品";
        tf1.textColor = 0xFF0000;
        tf1.bold = true;
        this.addChild(tf);
        this.addChild(tf1);
        tf.y = this._btnWatch.y + this._btnWatch.height + 30;
        tf.x = 150;
        tf1.y = tf.y;
        tf1.x = tf.width + tf.x + 2;
        this.showData(0);
    };
    ShowView.prototype.createPaper = function () {
        var rect = new egret.Rectangle(this._bg.x, this._bg.y, this._bg.width, this._bg.height);
        var padding = 50;
        rect.x += padding;
        rect.y += padding;
        rect.bottom -= padding * 2;
        rect.right -= padding * 2;
        var paper = new Paper(rect.width, rect.height);
        this.addChild(paper);
        paper.x = rect.x;
        paper.y = rect.y;
        paper.touchEnabled = false;
        paper.enable = false;
        return paper;
    };
    ShowView.prototype.addListeners = function () {
        this._btnTry.addEventListener(egret.TouchEvent.TOUCH_TAP, this._btnTry_touchTapHandler, this);
        this._btnWatch.addEventListener(egret.TouchEvent.TOUCH_TAP, this._btnWatch_touchTapHandler, this);
        this._bg.touchEnabled = true;
        this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._bg_touchHandler, this);
        this._bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._bg_touchHandler, this);
        this._bg.addEventListener(egret.TouchEvent.TOUCH_END, this._bg_touchHandler, this);
    };
    ShowView.prototype.removeListeners = function () {
        this._btnTry.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._btnTry_touchTapHandler, this);
        this._btnWatch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._btnWatch_touchTapHandler, this);
        this._bg.touchEnabled = false;
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._bg_touchHandler, this);
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._bg_touchHandler, this);
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_END, this._bg_touchHandler, this);
    };
    ShowView.prototype._btnTry_touchTapHandler = function (e) {
        if (DataCenter.linkid > 0) {
            DataCenter.linkid = 0;
            NoticeManager.sendNotice(new Notice("newtry"));
        }
        else {
            NoticeManager.sendNotice(new Notice("try"));
        }
    };
    ShowView.prototype._btnWatch_touchTapHandler = function (e) {
        //alert("添加关注代码");
        this.addChild(new TipView("guanzhu_png"));
    };
    ShowView.prototype._bg_touchHandler = function (e) {
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this._changed = false;
                this._beginX = e.localX;
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                if (this._changed) {
                    return;
                }
                if (e.localX - this._beginX > 100) {
                    //向右划动
                    this.showData(this._dataIndex + 1);
                }
                else if (e.localX - this._beginX < -100) {
                    //向左划动
                    this.showData(this._dataIndex - 1);
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                this._changed = true;
                break;
        }
    };
    ShowView.prototype.showData = function (index) {
        this._changed = true;
        if (0 == DataCenter.datas.length) {
            return;
        }
        if (index < 0) {
            index = DataCenter.datas.length - 1;
        }
        else if (index >= DataCenter.datas.length) {
            index = 0;
        }
        this._dataIndex = index;
        var data = JSON.parse(DataCenter.datas[index].data);
        data = data.data;
        if (this._paper == null) {
            this._paper = this.createPaper();
            this._paper.setData(data);
        }
        else {
            var useTime = 300;
            //替换动画
            var newPaper = this.createPaper();
            newPaper.setData(data);
            newPaper.alpha = 0;
            var aT = egret.Tween.get(newPaper);
            aT.to({ alpha: 1 }, useTime);
            var bT = egret.Tween.get(this._paper);
            bT.to({ alpha: 0 }, useTime);
            setTimeout(function (newpaper) {
                this.removeChild(this._paper);
                this._paper = newpaper;
            }.bind(this), useTime, newPaper);
        }
    };
    return ShowView;
})(egret.Sprite);
ShowView.prototype.__class__ = "ShowView";
