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
        this._currentDamage = -1;
        this.width = w;
        this.height = h;
        this.createView();
    }
    BossHP.prototype.createView = function () {
        this._shp = new egret.Shape();
        this._shp.graphics.beginFill(0xFF0000, 1);
        this._shp.graphics.drawRect(0, 0, 10, Util.stage.stageHeight);
        this._shp.graphics.endFill();
        this.addChild(this._shp);
        this._maskRec = new egret.Rectangle(0, 0, 10, Util.stage.stageHeight);
        this._shp.mask = this._maskRec;
    };
    BossHP.prototype.update = function (damage) {
        console.log("damage:" + damage);
        if (this._currentDamage == -1 || this._currentDamage != damage) {
            this._currentDamage = damage;
            var posY = this.height * damage / DataCenter.cfg.bossHP;
            //this._maskRec.y = Util.stage.stageHeight - posY;
            //this._maskRec.y = posY;
            var tw = egret.Tween.get(this._maskRec);
            tw.to({ y: posY }, 100);
        }
    };
    return BossHP;
})(egret.Sprite);
BossHP.prototype.__class__ = "BossHP";
//# sourceMappingURL=BossHP.js.map