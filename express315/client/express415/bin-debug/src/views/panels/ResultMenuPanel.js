var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* 结束面板菜单
*/
var ResultMenuPanel = (function (_super) {
    __extends(ResultMenuPanel, _super);
    function ResultMenuPanel() {
        _super.call(this);
        this._hotZones = [
            new egret.Rectangle(105, 38, 437, 115),
            new egret.Rectangle(102, 164, 453, 106)
        ];
        this.createView();
    }
    ResultMenuPanel.prototype.createView = function () {
        this.addChild(Texture.create("result_menu_png"));
        this.y = ViewManager.stage.stageHeight - this.height;
        var remainTF = new egret.BitmapText();
        remainTF.font = RES.getRes("white_fnt");
        remainTF.text = "x" + DataCenter.remain;
        remainTF.x = 445;
        remainTF.y = 75;
        this.addChild(remainTF);
        this.touchEnabled = true;
    };
    ResultMenuPanel.prototype.onAddedToStage = function () {
    };
    ResultMenuPanel.prototype.addListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    ResultMenuPanel.prototype.removeListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    ResultMenuPanel.prototype.touchBeginHandler = function (e) {
        var self = this;
        for (var i = 0; i < self._hotZones.length; i++) {
            if (self._hotZones[i].contains(e.localX, e.localY)) {
                self.hotZoneActive(i);
                break;
            }
        }
    };
    ResultMenuPanel.prototype.hotZoneActive = function (index) {
        switch (index) {
            case 0:
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
                break;
            case 1:
                ViewManager.instance.showPanel(new ShareTipPanel(), true, false);
                break;
        }
    };
    return ResultMenuPanel;
})(AView);
ResultMenuPanel.prototype.__class__ = "ResultMenuPanel";
//# sourceMappingURL=ResultMenuPanel.js.map