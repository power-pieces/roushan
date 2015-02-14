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
    function BossHP(w, h) {
        _super.call(this);
        this.width = w;
        this.height = h;
        this.createView();
    }
    BossHP.prototype.createView = function () {
        this.update(DataCenter.cfg.bossHP);
    };
    BossHP.prototype.update = function (damage) {
        var posY = this.height * damage / DataCenter.cfg.bossHP;
        this.graphics.clear();
        this.graphics.beginFill(0xFF0000, 1);
        this.graphics.drawRect(0, posY, 10, Util.stage.stageHeight - posY);
        this.graphics.endFill();
    };
    return BossHP;
})(egret.Sprite);
BossHP.prototype.__class__ = "BossHP";
