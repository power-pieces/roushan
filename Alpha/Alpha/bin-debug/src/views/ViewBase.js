/**
 * Created by Owen on 2015/2/12.
 */
/*
 * 界面基类
 */
var ViewBase = (function (_super) {
    __extends(ViewBase, _super);
    function ViewBase() {
        _super.call(this);
    }
    var __egretProto__ = ViewBase.prototype;
    __egretProto__.addListeners = function () {
    };
    __egretProto__.removeListeners = function () {
    };
    return ViewBase;
})(egret.DisplayObjectContainer);
ViewBase.prototype.__class__ = "ViewBase";
//# sourceMappingURL=ViewBase.js.map