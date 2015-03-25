class ExchangeView extends AView {

    private _bg: egret.Bitmap;

    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        var bg: egret.Bitmap = Texture.create("exchange_jpg");
        bg.touchEnabled = true;
        this._bg = bg;
        var scrollView: egret.ScrollView = new egret.ScrollView(bg);
        this.addChild(scrollView);
        scrollView.height = ViewManager.stage.stageHeight;

        
        this.touchEnabled = true;
        this.touchChildren = true;
    }

    public addListeners(): void {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    public removeListeners(): void {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    private touchBeginHandler(e: egret.TouchEvent): void {
        console.log(e.localX >> 0, e.localY >> 0);
    }
}