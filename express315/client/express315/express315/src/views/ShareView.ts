﻿class ShareView extends AView {

    public static self: ShareView;

    private _spr: egret.Sprite;
    private _bg: egret.Bitmap;

    private _hotZones: egret.Rectangle[] = [
        new egret.Rectangle(100, 563, 440, 110)
    ];

    public constructor() {
        super();
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

        this.updateContent();

    }

    private updateContent(): void {
        var tf: egret.TextField = new egret.TextField();
        tf.x = 45;
        tf.y = 420;
        tf.width = 546;
        tf.height = 109;
        tf.textAlign = egret.HorizontalAlign.CENTER;
        tf.lineSpacing = 20;
        tf.textFlow = <Array<egret.ITextElement>>[
            { text: "呵呵呵人品好，获得朋友赠送\n", style: { "textColor": 0x666666, "size": "30", "bold":true } }
            , { text: "包子", style: { "textColor": 0x666666, "size": "40", "bold": true } }
            , { text: " x1", style: { "textColor": 0xFF0000, "size": "40", "bold": true } }
            , { text: "" }
        ];
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

        switch (index) {
            case 0:
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
                break;
        }
    }
}