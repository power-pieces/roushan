var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Block = (function (_super) {
    __extends(Block, _super);
    function Block() {
        _super.call(this);
        this.body = null;
        this.createView();
    }
    Block.prototype.createView = function () {
        //this.anchorX = this.anchorY = 0.5;
        this.setState((Math.random() * 9) >> 0);
    };
    Block.prototype.setState = function (state) {
        this.removeChildren();
        var block = Util.createBitmapByName("b" + state + "_png");
        this.addChild(block);
        block.anchorX = block.anchorY = 0.5;
    };
    return Block;
})(egret.Sprite);
Block.prototype.__class__ = "Block";
//# sourceMappingURL=Block.js.map