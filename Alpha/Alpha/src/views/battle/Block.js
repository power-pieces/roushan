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
        this._icons = {
            1: DataCenter.cfg.carom,
            2: DataCenter.cfg.fall,
            3: DataCenter.cfg.drop,
            4: DataCenter.cfg.stop
        };
        this._body = null;
        this._state = 0;
        this._posUnchangedTime = 0;
        this._lastPostion = [0, 0];
        this._upBlock = 0;
        this.isDamaged = false;
        this.createView();
    }
    Block.prototype.getUpBlock = function () {
        return this._upBlock;
    };
    Block.prototype.isStop = function () {
        return this._state == Block.STATE_STOP ? true : false;
    };
    Block.prototype.createView = function () {
        this.setState(Block.STATE_FALL);
    };
    Block.prototype.setBody = function (body) {
        this._body = body;
        var pos = this.getPos();
        this._lastPostion[0] = pos[0];
        this._lastPostion[1] = pos[1];
    };
    Block.prototype.getBody = function () {
        return this._body;
    };
    Block.prototype.setUpBlock = function (count) {
        this._upBlock = count;
        if (this._state == Block.STATE_STOP) {
            var pngNames = this._icons[this._state];
            var imgName = pngNames[this._upBlock];
            this.changeImg(imgName);
        }
    };
    Block.prototype.getPos = function () {
        var posX = this.x >> 0;
        var posY = this.y >> 0;
        return [posX, posY];
    };
    Block.prototype.update = function () {
        this.getRect();
        var pos = this.getPos();
        var moveState = 0;
        var dy = pos[1] - this._lastPostion[1];
        var tolerance = DataCenter.cfg.tolerance;
        if (dy < -tolerance) {
            moveState = 2;
            this._lastPostion[0] = pos[0];
            this._lastPostion[1] = pos[1];
        }
        else if (dy > tolerance) {
            moveState = 1;
            this._lastPostion[0] = pos[0];
            this._lastPostion[1] = pos[1];
        }
        if (0 == moveState) {
            if (0 == this._posUnchangedTime) {
                this._posUnchangedTime = egret.getTimer();
            }
            else if (this._state != Block.STATE_STOP && egret.getTimer() - this._posUnchangedTime >= DataCenter.cfg.stopCheckInterval) {
                this.setState(Block.STATE_STOP);
            }
        }
        else if (2 == moveState) {
            this.setState(Block.STATE_CAROM);
        }
        else {
            if (this._state == Block.STATE_STOP) {
                this.setState(Block.STATE_DROP);
            }
            this._posUnchangedTime = 0;
        }
    };
    Block.prototype.setState = function (state) {
        if (this._state == state) {
            return;
        }
        this._state = state;
        var pngNames = this._icons[state];
        var imgName = "";
        if (state == Block.STATE_STOP) {
            imgName = pngNames[this._upBlock];
        }
        else {
            imgName = pngNames[(pngNames.length * Math.random()) >> 0];
        }
        this.changeImg(imgName);
    };
    Block.prototype.changeImg = function (name) {
        this.removeChildren();
        var block = Util.createBitmapByName(name);
        this.addChild(block);
        block.anchorX = block.anchorY = 0.5;
    };
    Block.prototype.getRect = function () {
        var x = this.x - this.width / 2;
        var y = this.y - this.height / 2;
        return new egret.Rectangle(x, y, this.width, this.height);
    };
    Block.STATE_CAROM = 1;
    Block.STATE_FALL = 2;
    Block.STATE_DROP = 3;
    Block.STATE_STOP = 4;
    return Block;
})(egret.Sprite);
