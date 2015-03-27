var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Role = (function (_super) {
    __extends(Role, _super);
    function Role(type) {
        if (typeof type === "undefined") { type = 2; }
        _super.call(this);
        this._type = 0;
        this._textures = [];
        this._isDie = false;
        this._bitmap = new egret.Bitmap();
        this._changeTime = 0;
        this._showIndex = -1;
        this._indexs = [0, 1, 2, 1];
        this._type = type;
        this.createView();
    }
    Object.defineProperty(Role.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });

    Role.prototype.createView = function () {
        var str = "";
        switch (this._type) {
            case 1:
                str = "real";
                break;
            case 2:
                str = "fake";
                break;
        }

        this._textures.push(Texture.createTexture(str + "_1_png"));
        this._textures.push(Texture.createTexture(str + "_2_png"));
        this._textures.push(Texture.createTexture(str + "_3_png"));
        this._textures.push(Texture.createTexture(str + "_die_png"));

        this.change();
        this._bitmap.anchorX = this._bitmap.anchorY = 0.5;
        this.addChild(this._bitmap);
    };

    Role.prototype.update = function () {
        if (this._isDie) {
            return;
        }
        var time = egret.getTimer();
        if (time >= this._changeTime) {
            this.change();
            this._changeTime = time + DataCenter.cfg.roleFPS;
        }
    };

    Role.prototype.change = function () {
        this._showIndex++;
        if (this._showIndex >= this._indexs.length) {
            this._showIndex = 0;
        }
        var index = this._indexs[this._showIndex];
        this._bitmap.texture = this._textures[index];
    };

    Role.prototype.die = function () {
        this._isDie = true;
        this._bitmap.texture = this._textures[3];

        switch (this._type) {
            case 1:
                DataCenter.killReal++;
                break;
            case 2:
                DataCenter.killFake++;
                break;
        }

        var fntRes = "green_fnt";
        var text = "+1";
        if (this._type == 1) {
            fntRes = "red_fnt";
            text = "-1";
        }

        var tf = new egret.BitmapText();
        tf.anchorX = tf.anchorY = 0.5;
        var font = RES.getRes(fntRes);
        tf.font = font;
        tf.text = text;
        tf.y = -(this._bitmap.height >> 1) - 50;
        this.addChild(tf);

        egret.Tween.get(this).to({ alpha: 0 }, 500).call(this.dispose, this);
    };

    Role.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        _super.prototype.dispose.call(this);
    };
    return Role;
})(AView);
