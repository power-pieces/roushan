var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Boss = (function (_super) {
    __extends(Boss, _super);
    function Boss() {
        _super.call(this);
        this.p2Bodys = [];
        //移动速度
        this._velocity = 0;
        //左 -1 右 1
        this._dir = 1;
        this.createView();
    }
    Boss.prototype.createView = function () {
        this.leftWing = Util.createBitmapByName("r2_png");
        this.rightWing = Util.createBitmapByName("r3_png");
        this.body = Util.createBitmapByName("r1_png");
        this.addChild(this.leftWing);
        this.addChild(this.rightWing);
        this.addChild(this.body);
        this.body.anchorX = this.body.anchorY = 0.5;
        this.leftWing.anchorX = this.leftWing.anchorY = 0.5;
        this.rightWing.anchorX = this.rightWing.anchorY = 0.5;
        this.rightWing.x = 188;
        this.leftWing.x = -this.rightWing.x;
        this.leftWing.y = this.rightWing.y = -27;
        this.setState(1);
    };
    Boss.prototype.setState = function (state) {
        if (this.face) {
            this.removeChild(this.face);
        }
        this.face = Util.createBitmapByName("rf" + state + "_png");
        this.face.anchorX = this.face.anchorY = 0.5;
        this.addChild(this.face);
    };
    Boss.prototype.changeHP = function () {
    };
    //设置水平速度
    Boss.prototype.setVelocity = function (value) {
        this._velocity = value;
        this.updateMove();
    };
    //更新移动
    Boss.prototype.updateMove = function () {
        for (var i = 0; i < this.p2Bodys.length; i++) {
            this.p2Bodys[i].velocity[0] = this._velocity * this._dir;
        }
    };
    //改变移动方向
    Boss.prototype.changeDirection = function (dir) {
        if (this._dir == dir) {
            return;
        }
        this._dir = dir;
        this.updateMove();
    };
    return Boss;
})(egret.Sprite);
Boss.prototype.__class__ = "Boss";
//# sourceMappingURL=Boss.js.map