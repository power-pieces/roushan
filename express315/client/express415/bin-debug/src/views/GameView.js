var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.call(this);
        this._roles = [];
        this._startTime = 0;
        this._realShowTime = 0;
        this._fakeShowTime = 0;
        this._killRealTF = null;
        this._killFakeTF = null;
        DataCenter.killFake = 0;
        DataCenter.killReal = 0;
        this.createView();
        this._startTime = egret.getTimer();
        this._realShowTime = this._fakeShowTime = this._startTime + 1000;
    }
    GameView.prototype.createView = function () {
        this.addChild(Texture.create("game_jpg"));
        this.touchEnabled = true;
        this._killRealTF = new egret.BitmapText();
        this._killRealTF.font = RES.getRes("red_fnt");
        this._killRealTF.x = 535;
        this._killRealTF.text = "0";
        this.addChild(this._killRealTF);
        this._killFakeTF = new egret.BitmapText();
        this._killFakeTF.font = RES.getRes("green_fnt");
        this._killFakeTF.x = 193;
        this._killFakeTF.text = "0";
        this.addChild(this._killFakeTF);
        this._killRealTF.y = this._killFakeTF.y = 55;
    };
    GameView.prototype.addListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    GameView.prototype.removeListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    GameView.prototype.touchBeginHandler = function (e) {
        var count = this._roles.length;
        while (--count > -1) {
            var role = this._roles[count];
            if (role.hitTestPoint(e.stageX, e.stageY, true)) {
                egret.Tween.removeTweens(role);
                role.die();
                this._roles.splice(count, 1);
            }
        }
    };
    GameView.prototype.enterFrameHandler = function (e) {
        for (var i = 0; i < this._roles.length; i++) {
            this._roles[i].update();
        }
        var now = egret.getTimer();
        var pastTime = now - this._startTime;
        if (now >= this._fakeShowTime) {
            this.createRole(2);
            if (pastTime < 10000) {
                this._fakeShowTime = now + DataCenter.cfg.fake_fre[0];
            }
            else if (pastTime < 20000) {
                this._fakeShowTime = now + DataCenter.cfg.fake_fre[1];
            }
            else {
                this._fakeShowTime = now + DataCenter.cfg.fake_fre[2];
            }
        }
        if (now >= this._realShowTime) {
            this.createRole(1);
            this._realShowTime = now + 5000;
        }
        if (DataCenter.killFake > 0) {
            this._killFakeTF.text = "+" + DataCenter.killFake;
        }
        if (DataCenter.killReal > 0) {
            this._killRealTF.text = "-" + DataCenter.killReal;
        }
    };
    GameView.prototype.createRole = function (type) {
        var role = new Role(type);
        var useTime = 0;
        if (1 == type) {
            role.x = DataCenter.cfg.real_point[0];
            role.y = DataCenter.cfg.real_point[1];
            useTime = DataCenter.cfg.real_use_min_time + Math.floor(Math.random() * (DataCenter.cfg.real_use_max_time - DataCenter.cfg.real_use_min_time));
        }
        else {
            var random = Math.floor(Math.random() * 3);
            role.x = DataCenter.cfg.fake_point[2 * random];
            role.y = DataCenter.cfg.fake_point[2 * random + 1];
            useTime = DataCenter.cfg.fake_use_min_time + Math.floor(Math.random() * (DataCenter.cfg.fake_use_max_time - DataCenter.cfg.fake_use_min_time));
        }
        this._roles.push(role);
        this.addChild(role);
        var gateX = DataCenter.cfg.gate_point[0];
        var gateY = DataCenter.cfg.gate_point[1];
        var tween = egret.Tween.get(role, { loop: false });
        tween.to({ x: gateX, y: gateY, scaleX: 0.5, scaleY: 0.5 }, useTime);
        tween.call(this.onReachGate, this, [role]);
    };
    GameView.prototype.onReachGate = function (params) {
        var role = params;
        var index = this._roles.indexOf(role);
        this._roles.splice(index, 1);
        role.dispose();
        if (2 == role.type) {
            this.gameOver();
        }
    };
    GameView.prototype.gameOver = function () {
        egret.Tween.removeAllTweens();
        NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.RESULT_VIEW));
    };
    return GameView;
})(AView);
GameView.prototype.__class__ = "GameView";
//# sourceMappingURL=GameView.js.map