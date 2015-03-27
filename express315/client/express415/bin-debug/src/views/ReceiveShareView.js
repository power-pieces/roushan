var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ReceiveShareView = (function (_super) {
    __extends(ReceiveShareView, _super);
    //175.310
    function ReceiveShareView() {
        _super.call(this);
        this._hotZones = [
            new egret.Rectangle(94, 561, 447, 108),
            new egret.Rectangle(96, 704, 447, 108)
        ];
        ReceiveShareView.self = this;
        this.createView();
    }
    ReceiveShareView.prototype.createView = function () {
        this._bg = Texture.create("receive_share_jpg");
        this._bg.touchEnabled = true;
        this._spr = new egret.Sprite();
        this._spr.addChild(this._bg);
        //this.addChild(this._spr);
        this.touchChildren = this.touchEnabled = true;
        var scrollView = new egret.ScrollView(this._spr);
        scrollView.height = ViewManager.stage.stageHeight;
        this.addChild(scrollView);
        scrollView.stage = ViewManager.stage;
        this.updateContent();
        RES.getResByUrl(DataCenter.inviterHeadUrl, function (data, url) {
            if (null != data) {
                var pic = new egret.Bitmap(data);
                pic.anchorX = pic.anchorY = 0.5;
                pic.x = 200;
                pic.y = 333;
                this._spr.addChild(pic);
            }
        }, this, "image");
        NetManager.call("getShareList", { reciverId: DataCenter.id }, this.onGetShareList, this);
    };
    ReceiveShareView.prototype.onGetShareList = function (data, params) {
        if (data.length > 10) {
            data.length = 10;
        }
        var posY = this._bg.height;
        for (var i = 0; i < data.length; i++) {
            //创建列表项
            var item = new ShareListItem(data[i]);
            item.x = 0;
            item.y = posY;
            this._spr.addChild(item);
            posY += item.height;
        }
    };
    ReceiveShareView.prototype.updateContent = function () {
        var tf = new egret.TextField();
        tf.x = 108;
        tf.y = 410;
        tf.width = 439;
        tf.height = 109;
        tf.textAlign = egret.HorizontalAlign.LEFT;
        tf.lineSpacing = 10;
        tf.textFlow = [
            { text: "Duang~！" + DataCenter.inviterName + "击倒了", style: { "textColor": 0x745645, "size": "30", "bold": true } },
            { text: DataCenter.inviterKill.toString(), style: { "textColor": 0xFF0000, "size": "30", "bold": true } },
            { text: "个山寨品邮差，青天大老爷Ta一个赞！", style: { "textColor": 0x745645, "size": "30", "bold": true } },
            { text: "" }
        ];
        this._spr.addChild(tf);
        var rewardTF = new egret.BitmapText();
        var font = RES.getRes("pink_fnt");
        rewardTF.font = font;
        rewardTF.text = "X" + DataCenter.reward;
        rewardTF.x = 380;
        rewardTF.y = 315;
        this._spr.addChild(rewardTF);
    };
    ReceiveShareView.prototype.addListeners = function () {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this._bg);
    };
    ReceiveShareView.prototype.removeListeners = function () {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this._bg);
    };
    ReceiveShareView.prototype.touchBeginHandler = function (e) {
        var self = ReceiveShareView.self;
        for (var i = 0; i < self._hotZones.length; i++) {
            if (self._hotZones[i].contains(e.localX, e.localY)) {
                self.hotZoneActive(i);
                break;
            }
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    ReceiveShareView.prototype.hotZoneActive = function (index) {
        switch (index) {
            case 0:
                var params = {};
                params.targetId = DataCenter.inviter;
                params.name = DataCenter.name;
                params.headUrl = DataCenter.headUrl;
                params.inviterName = DataCenter.inviterName;
                params.inviterHeadUrl = DataCenter.inviterHeadUrl;
                NetManager.call("present", params, this.onPresentResponse, this);
                break;
            case 1:
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
                break;
        }
    };
    ReceiveShareView.prototype.onPresentResponse = function (data, params) {
        var msg = "你不能重复赠送游戏机会给" + DataCenter.inviterName;
        if (data == true) {
            msg = "你赠送了" + DataCenter.inviterName + "1次游戏机会";
        }
        ViewManager.instance.showPanel(new MessagePanel(msg), true);
    };
    return ReceiveShareView;
})(AView);
ReceiveShareView.prototype.__class__ = "ReceiveShareView";
//# sourceMappingURL=ReceiveShareView.js.map