var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* 兑换结果页面
*/
var ExchangeResultPanel = (function (_super) {
    __extends(ExchangeResultPanel, _super);
    /**
    *1:成功 2:失败 3:赏银不足
    */
    function ExchangeResultPanel(type, id) {
        _super.call(this);
        this._id = 0;
        this._id = id;
        this.createView(type);
    }
    ExchangeResultPanel.prototype.createView = function (type) {
        this["type" + type]();
        ViewManager.instance.putToCenter(this);
    };
    ExchangeResultPanel.prototype.type1 = function () {
        this.addChild(Texture.create("exchange_success_png"));
    };
    ExchangeResultPanel.prototype.type2 = function () {
        this.addChild(Texture.create("exchange_fail_png"));
    };
    ExchangeResultPanel.prototype.type3 = function () {
        this.addChild(Texture.create("bun_panel_png"));
    };
    return ExchangeResultPanel;
})(AView);
ExchangeResultPanel.prototype.__class__ = "ExchangeResultPanel";
//# sourceMappingURL=ExchangeResultPanel.js.map