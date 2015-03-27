var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RequestingPanel = (function (_super) {
    __extends(RequestingPanel, _super);
    function RequestingPanel() {
        _super.call(this);
        this.createView();
    }
    RequestingPanel.prototype.createView = function () {
        var tf = this._tf;
        tf = new egret.TextField();
        this.addChild(tf);

        tf.width = 480;
        tf.height = 100;
        tf.size = 40;
        tf.textAlign = "center";
        tf.stroke = 1;
        ViewManager.instance.putToCenter(this);

        tf.text = "网络通信中...";
    };
    return RequestingPanel;
})(AView);
//# sourceMappingURL=RequestingPanel.js.map
