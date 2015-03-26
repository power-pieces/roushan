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
        var tf = this._tf;
        this.addChild(tf);

        tf.width = 640;
        tf.height = 200;
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
