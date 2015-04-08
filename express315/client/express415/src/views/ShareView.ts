class ShareView extends AView {

    public static self: ShareView;

    private _spr: egret.Sprite;
    private _bg: egret.Bitmap;
    private _jump: boolean = false;

    private _hotZones: egret.Rectangle[] = [
        new egret.Rectangle(100, 563, 440, 110)
    ];

    public constructor(args:any = null) {
        super();
        if (args) {
            this._jump = true;
        }
        ShareView.self = this;
        this.createView();
    }

    private createView(): void {        
        this._bg = Texture.create("share_jpg");
        this._bg.touchEnabled = true;

        this._spr = new egret.Sprite();
        this._spr.addChild(this._bg);

        //this.addChild(this._spr);

        this.touchChildren = this.touchEnabled = true;


        var scrollView: egret.ScrollView = new egret.ScrollView(this._spr);
        scrollView.height = ViewManager.stage.stageHeight;
        this.addChild(scrollView);
        scrollView.stage = ViewManager.stage;

        //this.updateContent();

        Extend.callReadyShare(DataCenter.killCount);
        NetManager.call("getShareList", { reciverId: DataCenter.id }, this.onGetShareList, this);
    }

    private onGetShareList(data: any, params: any): void {

        this.updateContent(data.length);

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

        if (false == this._jump) {
            ViewManager.instance.showPanel(new ShareTipPanel(), true, false);
        }
    }

    private updateContent(count:number): void {
        var tf = new egret.BitmapText();
        var font: any = RES.getRes("pink_58_b_fnt");
        tf.font = font;
        tf.text = "X" + count;
        tf.x = 316;
        tf.y = 465;
        //this.addChild(tf);
        this._spr.addChild(tf);
    }

    public addListeners(): void {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this._bg);
    }

    public removeListeners(): void {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this._bg);
    }

    private touchBeginHandler(e: egret.TouchEvent): void {
        var self: ShareView = ShareView.self;
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
                if (this._jump) {
                    NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.INDEX_VIEW));
                }
                else {
                    NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
                }
                break;
        }
    }
}