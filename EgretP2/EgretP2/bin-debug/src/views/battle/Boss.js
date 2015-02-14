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
        this._hp = 0;
        //移动速度
        this._velocity = 0;
        //左 -1 右 1
        this._dir = 1;
        this._state = 1;
        this.setHP(DataCenter.cfg.bossHP);
        this.createView();
    }
    Boss.prototype.setHP = function (v) {
        if (v < 0) {
            v = 0;
        }
        if (this._hp == v) {
            return;
        }
        var state = 0;
        var hpPer = v / DataCenter.cfg.bossHP;
        if (hpPer > 0.7) {
            state = 1;
        }
        else if (hpPer > 0.3) {
            state = 2;
        }
        else if (hpPer > 0) {
            state = 3;
        }
        else if (hpPer == 0) {
            state = 4;
        }
        this._state = state;
        //更新BOSS表情
        if (v < this._hp) {
            //血量减少,显示特殊效果
            this.setState(5);
            egret.setTimeout(function () {
                this.setState(this._state);
            }, this, 500);
        }
        else {
            this.setState(this._state);
        }
        this._hp = v;
    };
    Boss.prototype.getHP = function () {
        return this._hp;
    };
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
    Boss.prototype.getRect = function () {
        var bossRect = this.getBounds();
        bossRect.x += this.x;
        bossRect.y += this.y;
        return bossRect;
    };
    return Boss;
})(egret.Sprite);
Boss.prototype.__class__ = "Boss";
//# sourceMappingURL=Boss.js.map