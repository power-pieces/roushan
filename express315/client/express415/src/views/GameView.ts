class GameView extends AView {

    private _roles: Role[] = [];
    private _startTime: number = 0;
    private _realShowTime: number = 0;
    private _fakeShowTime: number = 0;

    private _killRealTF:egret.BitmapText = null;
    private _killFakeTF: egret.BitmapText = null;

    public constructor() {
        super();
        DataCenter.killFake = 0;
        DataCenter.killReal = 0;
        this.createView();
        this._startTime = egret.getTimer();
        this._realShowTime = this._fakeShowTime = this._startTime + 1000;
    }

    private createView(): void {
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
    }

    public addListeners(): void {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }

    public removeListeners(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    }

    private touchBeginHandler(e: egret.TouchEvent): void {

        var count: number = this._roles.length;
        while (--count > -1) {
            var role: Role = this._roles[count];
            if (role.hitTestPoint(e.stageX, e.stageY, true)) {                
                egret.Tween.removeTweens(role);
                role.die();                
                this._roles.splice(count, 1);
            }
        }
    }

    private enterFrameHandler(e: egret.Event): void {

        for (var i: number = 0; i < this._roles.length; i++) {
            this._roles[i].update();
        }

        var now: number = egret.getTimer();
        var pastTime: number = now - this._startTime;
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
            this._killFakeTF.text = "+" + (DataCenter.killFake * DataCenter.cfg.fake_die_score);
        }

        if (DataCenter.killReal > 0) {
            this._killRealTF.text = (DataCenter.killReal * DataCenter.cfg.real_die_score).toString();
        }
    }

    private createRole(type: number): void {

        
        


        var role: Role = new Role(type);
        var useTime: number = 0;
        if (1 == type) {
            role.x = DataCenter.cfg.real_point[0];
            role.y = DataCenter.cfg.real_point[1];
            useTime = DataCenter.cfg.real_use_min_time + Math.floor(Math.random() * (DataCenter.cfg.real_use_max_time - DataCenter.cfg.real_use_min_time));
        }
        else {
            var random: number = Math.floor(Math.random() * 3);
            role.x = DataCenter.cfg.fake_point[2 * random];
            role.y = DataCenter.cfg.fake_point[2 * random + 1];
            useTime = DataCenter.cfg.fake_use_min_time + Math.floor(Math.random() * (DataCenter.cfg.fake_use_max_time - DataCenter.cfg.fake_use_min_time));
        }


        this._roles.push(role);
        this.addChild(role);
        

        var gateX: number = DataCenter.cfg.gate_point[0];
        var gateY: number = DataCenter.cfg.gate_point[1];

        var tween: egret.Tween = egret.Tween.get(role, { loop: false });
        tween.to({ x: gateX, y: gateY, scaleX: 0.5, scaleY: 0.5 }, useTime);
        tween.call(this.onReachGate, this, [role]);
    }

    private onReachGate(params:any): void {
        var role: Role = params;
        var index: number = this._roles.indexOf(role);
        this._roles.splice(index, 1);
        role.dispose();
        if (2 == role.type) {
            this.gameOver();
        }
    }

    private gameOver(): void {
        egret.Tween.removeAllTweens();
        this.removeListeners();
        var gameOver: egret.Bitmap = Texture.create("game_over_png");
        gameOver.anchorX = gameOver.anchorY = 0.5;
        this.addChild(gameOver);
        gameOver.x = ViewManager.stage.stageWidth >> 1;
        gameOver.y = 380;
        gameOver.scaleX = gameOver.scaleY = 0;
        egret.Tween.get(gameOver).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut).wait(1000).call(
            function () {
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.RESULT_VIEW));
            },this
            );        
    }
}