/**
* BOSS的血条
*/
var BossHP = (function (_super) {
    __extends(BossHP, _super);
    function BossHP() {
        _super.call(this);
        this.createView();
    }
    var __egretProto__ = BossHP.prototype;
    __egretProto__.createView = function () {
        this._bg = Util.createBitmapByName("life_bg");
        this._life = Util.createBitmapByName("life");
        this.addChild(this._bg);
        this.addChild(this._life);
        var mask = new egret.Rectangle(0, 0, this._life.width, this._life.height);
        this._life.mask = mask;
    };
    __egretProto__.update = function (hp) {
        var per = 1 - (hp / DataCenter.cfg.bossHP);
        var mask = this._life.mask;
        mask.y = mask.height * per;
        this._life.mask = mask;
    };
    return BossHP;
})(egret.Sprite);
BossHP.prototype.__class__ = "BossHP";
//# sourceMappingURL=BossHP.js.map