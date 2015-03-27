class ReceiveShareView extends AView {

    public static self: ReceiveShareView;

    private _spr: egret.Sprite;
    private _bg: egret.Bitmap;

    private _hotZones: egret.Rectangle[] = [
        new egret.Rectangle(94, 561, 447, 108),
        new egret.Rectangle(96, 704, 447, 108)
    ];

    //175.310
    public constructor() {
        super();
        ReceiveShareView.self = this;
        this.createView();
    }

    private createView(): void {
        this._bg = Texture.create("receive_share_jpg");
        this._bg.touchEnabled = true;

        this._spr = new egret.Sprite();
        this._spr.addChild(this._bg);

        //this.addChild(this._spr);

        this.touchChildren = this.touchEnabled = true;


        var scrollView: egret.ScrollView = new egret.ScrollView(this._spr);
        scrollView.height = ViewManager.stage.stageHeight;
        this.addChild(scrollView);
        scrollView.stage = ViewManager.stage;

        this.updateContent();

        RES.getResByUrl(DataCenter.inviterHeadUrl,
            function (data: egret.Texture, url: string) {
                if (null != data) {
                    var pic: egret.Bitmap = new egret.Bitmap(data);
                    pic.anchorX = pic.anchorY = 0.5;
                    pic.x = 200;
                    pic.y = 333;
                    this._spr.addChild(pic);
                }
            }
            , this, "image");
    }

    private updateContent(): void {
        var tf: egret.TextField = new egret.TextField();
        tf.x = 108;
        tf.y = 410;
        tf.width = 439;
        tf.height = 109;
        tf.textAlign = egret.HorizontalAlign.LEFT;
        tf.lineSpacing = 10;
        tf.textFlow = <Array<egret.ITextElement>>[
            { text: "Duang~！" + DataCenter.inviterName + "击倒了", style: { "textColor": 0x745645, "size": "30", "bold": true } }
            , { text: DataCenter.inviterKill.toString(), style: { "textColor": 0xFF0000, "size": "30", "bold": true } }
            , { text: "个山寨品邮差，青天大老爷Ta一个赞！", style: { "textColor": 0x745645, "size": "30", "bold": true } }
            , { text: "" }
        ];
        this._spr.addChild(tf);



        var rewardTF = new egret.BitmapText();
        var font: any = RES.getRes("pink_fnt");
        rewardTF.font = font;
        rewardTF.text = "X" + DataCenter.reward;
        rewardTF.x = 380;
        rewardTF.y = 315;
        this._spr.addChild(rewardTF);
    }

    public addListeners(): void {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this._bg);
    }

    public removeListeners(): void {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this._bg);
    }

    private touchBeginHandler(e: egret.TouchEvent): void {
        var self: ReceiveShareView = ReceiveShareView.self;
        for (var i: number = 0; i < self._hotZones.length; i++) {
            if (self._hotZones[i].contains(e.localX, e.localY)) {
                self.hotZoneActive(i);
                break;
            }
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
    }

    private hotZoneActive(index: number): void {

        switch (index) {
            case 0:                
                NetManager.call("present", { targetId: DataCenter.inviter },this.onPresentResponse,this);                
                break;
            case 1:
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
                break;
        }
    }

    private onPresentResponse(data: any, params: any): void {

        var msg: string = "你不能重复赠送游戏机会给" + DataCenter.inviterName;
        if (data == true) {
            msg = "你赠送了" + DataCenter.inviterName + "1次游戏机会";
        }
        
        

        ViewManager.instance.showPanel(new MessagePanel(msg), true);
    }
}