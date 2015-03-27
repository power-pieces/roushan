var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var IndexView = (function (_super) {
    __extends(IndexView, _super);
    function IndexView() {
        _super.call(this);
        this._hotZones = [
            new egret.Rectangle(0, 0, 628, 885),
            new egret.Rectangle(6, 900, 617, 92)
        ];
        this.createView();
    }
    IndexView.prototype.createView = function () {
        this.addChild(Texture.create("index_jpg"));
        this.touchEnabled = true;
    };

    IndexView.prototype.addListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };

    IndexView.prototype.removeListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };

    IndexView.prototype.touchBeginHandler = function (e) {
        console.log(e.localX, e.localY);
        for (var i = 0; i < this._hotZones.length; i++) {
            if (this._hotZones[i].contains(e.localX, e.localY)) {
                this.hotZoneActive(i);
                break;
            }
        }
    };

    IndexView.prototype.hotZoneActive = function (index) {
        switch (index) {
            case 0:
                console.log("进入游戏");
                this.loadData();
                break;
            case 1:
                console.log("下载");
                window.open(DataCenter.cfg.app_link);
                break;
        }
    };

    IndexView.prototype.loadData = function () {
        var params = {};
        params.name = DataCenter.name;
        params.headUrl = DataCenter.headUrl;

        NetManager.call("login", params, this.onLoadData, this);
    };

    IndexView.prototype.onLoadData = function (data, params) {
        DataCenter.reward = +data.reward;
        DataCenter.remain = +data.remain;
        NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.INTRO_VIEW));
    };
    return IndexView;
})(AView);
