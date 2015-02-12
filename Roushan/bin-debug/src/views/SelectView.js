var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* 星座选择页面
*/
var SelectView = (function (_super) {
    __extends(SelectView, _super);
    function SelectView() {
        _super.call(this);
        this._state = 0;
        this.createView();
    }
    SelectView.prototype.createView = function () {
        this._turntable = Util.createBitmapByName("turntable");
        this.addChild(this._turntable);
        this._turntable.anchorOffsetX = this._turntable.width / 2;
        this._turntable.anchorOffsetY = this._turntable.height / 2;
        this._turntable.x = Util.stage.stageWidth / 2;
        this._turntable.y = Util.stage.stageHeight / 2;
        this._point = Util.createBitmapByName("point");
        this.addChild(this._point);
        this._point.anchorOffsetX = this._point.width >> 1;
        this._point.anchorOffsetY = 110;
        this._point.x = Util.stage.stageWidth >> 1;
        this._point.y = Util.stage.stageHeight >> 1;
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        this.touchEnabled = true;
    };
    SelectView.prototype.dispose = function () {
        this.removeChildren();
        this._turntable = null;
        this._point = null;
    };
    SelectView.prototype.enterFrameHandler = function (e) {
        //this._turntable.rotation += 10;
    };
    SelectView.prototype.touchTapHandler = function (e) {
        this.touchEnabled = false;
        var dx = e.stageX - this._point.x;
        var dy = e.stageY - this._point.y;
        var r = Math.atan2(dy, dx) / Math.PI * 180;
        //this._point.rotation = ((r / 30) >> 0) * 30 + 105;
        var r = r + 90;
        r >>= 0;
        if (r < 0) {
            r += 360;
        }
        var selectId = (((r + 15) / 30) >> 0);
        if (12 == selectId) {
            selectId = 0;
        }
        DataCenter.selectedId = selectId;
        r = selectId * 30;
        this._turntable.rotation = 0;
        var checkOverFun = this.checkOver;
        var tween = egret.Tween.get(this._turntable);
        tween.to({ rotation: -r + (360 * 4) }, 5000, egret.Ease.circInOut);
        tween.call(function () {
            checkOverFun();
            //NoticeManager.sendNotice(new Notice("selected"));
        }, this, [selectId]);
        RES.getResAsync(DataCenter.selectedId + "_png", this.checkOver, this);
        this.requestData();
    };
    SelectView.prototype.requestData = function () {
        //创建POST请求
        var url = DataCenter.server + "server/load.php";
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onRequestData, this);
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.GET;
        var values = new egret.URLVariables("id=" + DataCenter.selectedId);
        request.data = values;
        loader.load(request);
    };
    SelectView.prototype.onRequestData = function (e) {
        var loader = e.target;
        var json = loader.data;
        DataCenter.datas = JSON.parse(json);
        this.checkOver();
    };
    SelectView.prototype.checkOver = function () {
        this._state++;
        if (3 == this._state) {
            NoticeManager.sendNotice(new Notice("selected"));
        }
    };
    return SelectView;
})(egret.Sprite);
SelectView.prototype.__class__ = "SelectView";
