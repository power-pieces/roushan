var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MessagePanel = (function (_super) {
    __extends(MessagePanel, _super);
    function MessagePanel(content) {
        _super.call(this);
        this._tf = new egret.TextField();
        this.createView();
        this.setContent(content);
    }
    MessagePanel.prototype.createView = function () {
        this.addChild(Texture.create("bun_panel_png"));
        var tf = this._tf;
        this.addChild(tf);
        tf.x = 40;
        tf.y = 120;
        tf.width = 330;
        tf.height = 100;
        tf.size = 40;
        tf.textAlign = "center";
        tf.stroke = 1;
        ViewManager.instance.putToCenter(this);
    };
    MessagePanel.prototype.setContent = function (content) {
        this._tf.text = content;
    };
    return MessagePanel;
})(AView);
MessagePanel.prototype.__class__ = "MessagePanel";
//# sourceMappingURL=MessagePanel.js.map