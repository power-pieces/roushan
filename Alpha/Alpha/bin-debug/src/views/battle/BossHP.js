var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* BOSS的血条
*/
var BossHP = (function (_super) {
    __extends(BossHP, _super);
    function BossHP() {
        _super.call(this);
        this.createView();
    }
    BossHP.prototype.createView = function () {
        this._bg = Util.createBitmapByName("life_bg");
        this._life = Util.createBitmapByName("life");
        this.addChild(this._bg);
        this.addChild(this._life);
        var mask = new egret.Rectangle(0, 0, this._life.width, this._life.height);
        this._life.mask = mask;
    };
    BossHP.prototype.update = function (hp) {
        var per = 1 - (hp / DataCenter.cfg.bossHP);
        var mask = this._life.mask;
        mask.y = mask.height * per;
        this._life.mask = mask;
    };
    return BossHP;
})(egret.Sprite);
BossHP.prototype.__class__ = "BossHP";
//# sourceMappingURL=BossHP.js.map