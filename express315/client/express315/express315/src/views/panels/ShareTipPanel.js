var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShareTipPanel = (function (_super) {
    __extends(ShareTipPanel, _super);
    function ShareTipPanel() {
        _super.call(this);

        this.createView();
    }
    ShareTipPanel.prototype.createView = function () {
        this.addChild(Texture.create("share_png"));
    };

    ShareTipPanel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.SHARE_VIEW));
    };
    return ShareTipPanel;
})(AView);
