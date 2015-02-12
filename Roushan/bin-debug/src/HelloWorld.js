/**
 * Created by Owen on 2015/2/7.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HelloWorld = (function (_super) {
    __extends(HelloWorld, _super);
    function HelloWorld() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    HelloWorld.prototype.onAddToStage = function (event) {
        egret.Profiler.getInstance().run();
        console.log("Hello World");
        var s = new egret.Sprite();
        this.stage.addChild(s);
        var text = new egret.TextField();
        text.textColor = 0xff0000;
        text.text = 'Do you love me?';
        s.addChild(text);
    };
    return HelloWorld;
})(egret.DisplayObjectContainer);
HelloWorld.prototype.__class__ = "HelloWorld";
