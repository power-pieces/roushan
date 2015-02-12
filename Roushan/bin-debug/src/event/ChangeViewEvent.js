var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Owen on 2015/2/12.
 */
var ChangeViewEvent = (function (_super) {
    __extends(ChangeViewEvent, _super);
    function ChangeViewEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    ChangeViewEvent.CHANGE_VIEW = "CHANGE_VIEW";
    return ChangeViewEvent;
})(egret.Event);
ChangeViewEvent.prototype.__class__ = "ChangeViewEvent";
