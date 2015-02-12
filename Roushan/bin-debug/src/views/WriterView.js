var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* 写字
*/
var WriterView = (function (_super) {
    __extends(WriterView, _super);
    function WriterView() {
        _super.call(this);
        this.createView();
        this.touchEnabled = true;
        this.addListeners();
    }
    WriterView.prototype.createView = function () {
        this._btnSubmit = Util.createBitmapByName("submit_png");
        this._btnClear = Util.createBitmapByName("clear_png");
        this._btnChangeColor = Util.createBitmapByName("change_color_png");
        this._colorChoose = Util.createBitmapByName("color_choose_png");
        this._bg = Util.createBitmapByName(DataCenter.selectedId + "_png");
        this.addChild(this._bg);
        this._bg.y = (Util.stage.stageHeight - this._bg.height) >> 1;
        var rect = new egret.Rectangle(this._bg.x, this._bg.y, this._bg.width, this._bg.height);
        var padding = 50;
        rect.x += padding;
        rect.y += padding;
        rect.bottom -= padding * 2;
        rect.right -= padding * 2;
        this._paper = new Paper(rect.width, rect.height);
        this.addChild(this._paper);
        this._paper.x = rect.x;
        this._paper.y = rect.y;
        this.addChild(this._btnClear);
        this._btnClear.y = this._bg.y + this._bg.height + 0;
        this._btnClear.x = (Util.stage.stageWidth - this._btnClear.width) >> 1;
        this._btnClear.touchEnabled = true;
        this.addChild(this._btnSubmit);
        this._btnSubmit.y = this._bg.y + this._bg.height + 0;
        this._btnSubmit.x = this._btnClear.x + this._btnClear.width + 20;
        this._btnSubmit.touchEnabled = true;
        this.addChild(this._btnChangeColor);
        this._btnChangeColor.y = this._bg.y + this._bg.height + 0;
        this._btnChangeColor.x = this._btnClear.x - this._btnChangeColor.width - 20;
        this._btnChangeColor.touchEnabled = true;
        var tf = new egret.TextField();
        tf.text = "在空白处手写,然后点击上传并共享";
        tf.bold = true;
        tf.textColor = 0;
        tf.x = (Util.stage.stageWidth - tf.width) >> 1;
        tf.y = this._btnClear.y + this._btnClear.height + 30;
        this.addChild(tf);
        //this.addChild(this._colorChoose);
        this._colorChoose.y = this._btnChangeColor.y - this._colorChoose.height;
        this._colorChoose.x = this._btnChangeColor.x;
        this._colorChoose.touchEnabled = true;
        this._shape = new egret.Shape();
        this._shape.x = this._btnChangeColor.x + 10;
        this._shape.y = this._btnChangeColor.y + 10;
        this.addChild(this._shape);
        this.shapeColor(0);
    };
    WriterView.prototype.shapeColor = function (color) {
        var g = this._shape.graphics;
        g.beginFill(color, 1);
        g.drawRect(0, 0, 30, 30);
        g.endFill();
    };
    WriterView.prototype.addListeners = function () {
        this._btnSubmit.addEventListener(egret.TouchEvent.TOUCH_TAP, this._btnSubmit_touchTapHandler, this);
        this._btnClear.addEventListener(egret.TouchEvent.TOUCH_TAP, this._btnClear_touchTapHandler, this);
        this._btnChangeColor.addEventListener(egret.TouchEvent.TOUCH_TAP, this._btnChangeColor_touchTapHandler, this);
        this._colorChoose.addEventListener(egret.TouchEvent.TOUCH_TAP, this._colorChoose_touchTapHandler, this);
    };
    WriterView.prototype.removeListeners = function () {
        this._btnSubmit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._btnSubmit_touchTapHandler, this);
        this._btnClear.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._btnChangeColor_touchTapHandler, this);
        this._btnChangeColor.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._btnChangeColor_touchTapHandler, this);
        this._colorChoose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._colorChoose_touchTapHandler, this);
    };
    WriterView.prototype._btnSubmit_touchTapHandler = function (e) {
        this.addChild(new TipView("share_png", true));
        //提交数据
        var out = {};
        out.type = "submit";
        out.data = this._paper.getData();
        out.id = DataCenter.selectedId;
        out.openid = DataCenter.openId;
        //创建POST请求
        var url = DataCenter.server + "server/save.php";
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this._submit_completeHandler, this);
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        var values = new egret.URLVariables("info=" + JSON.stringify(out));
        request.data = values;
        loader.load(request);
    };
    WriterView.prototype._submit_completeHandler = function (e) {
        var loader = e.target;
        var json = loader.data;
        var result = JSON.parse(json);
        if (0 == result.error) {
            alert("上传成功");
            var linkid = result.linkid;
            window["setTimeLine"](linkid);
            window["setAppMessage"](linkid);
        }
        else {
            alert("提交失败！请刷新重试");
        }
    };
    WriterView.prototype._btnClear_touchTapHandler = function (e) {
        this._paper.clear();
    };
    WriterView.prototype._btnChangeColor_touchTapHandler = function (e) {
        //换颜色
        this.addChild(this._colorChoose);
    };
    WriterView.prototype._colorChoose_touchTapHandler = function (e) {
        //选择颜色
        this.removeChild(this._colorChoose);
        var posY = e.localY >> 0;
        var colorSize = this._colorChoose.height / 5;
        var colorIndex = (posY / colorSize) >> 0;
        var colors = [0x00FF00, 0xFFFF00, 0x0066FF, 0x000000, 0xFF0000];
        var color = colors[colorIndex];
        this.shapeColor(color);
        this._paper.setColor(color);
    };
    return WriterView;
})(egret.Sprite);
WriterView.prototype.__class__ = "WriterView";
