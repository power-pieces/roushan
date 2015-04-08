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
                    pic.width = pic.height = 96
                    pic.x = 200;
                    pic.y = 333;
                    this._spr.addChild(pic);

                    var picBorder: egret.Bitmap = Texture.create("border_96_png");
                    picBorder.anchorX = picBorder.anchorY = 0.5;
                    picBorder.x = 200;
                    picBorder.y = 333;
                    this._spr.addChild(picBorder);
                }
            }
            , this, "image");


        NetManager.call("getShareList", { reciverId: DataCenter.id }, this.onGetShareList, this);
    }

    private onGetShareList(data: any, params: any): void {     
        if (data.length > 10) {
            data.length = 10;
        }
        var posY: number = this._bg.height;
        for (var i: number = 0; i < data.length; i++) {
            //创建列表项
            var item: ShareListItem = new ShareListItem(data[i]);
            item.x = 0;
            item.y = posY;
            this._spr.addChild(item);
            posY += item.height;
        }
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
            , { text: DataCenter.inviterKill.toString(), style: { "textColor": 0xf471ac, "size": "30", "bold": true } }
            , { text: "个山寨品邮差，青天大老爷Ta一个赞！", style: { "textColor": 0x745645, "size": "30", "bold": true } }
            , { text: "" }
        ];
        this._spr.addChild(tf);



        var rewardTF = new egret.BitmapText();
        var font: any = RES.getRes("pink_58_b_fnt");
        rewardTF.font = font;
        rewardTF.text = "X" + DataCenter.reward;
        rewardTF.x = 380;
        rewardTF.y = 295;
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
        AudioDevice.playEffect("btn_click_mp3");
        switch (index) {
            case 0:                
                NetManager.statistic("送小伙伴包子按钮");
                var params: any = {};
                params.targetId = DataCenter.inviter;
                params.userName = DataCenter.userName;
                params.headUrl = DataCenter.headUrl;
                params.inviterName = DataCenter.inviterName;
                params.inviterHeadUrl = DataCenter.inviterHeadUrl;
                NetManager.call("present", params, this.onPresentResponse,this);                
                break;
            case 1:
                NetManager.statistic("我也要玩按钮");
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.INDEX_VIEW));
                break;
        }
    }

    private onPresentResponse(data: any, params: any): void {

        var msg: string = "你不能重复赠送游戏机会给" + DataCenter.inviterName;
        if (data == true) {
            msg = "你赠送了" + DataCenter.inviterName + "1次游戏机会";
        }
        
        

        ViewManager.instance.showPanel(new MessagePanel(msg, DataCenter.cfg.msg_delay), true);
    }
}