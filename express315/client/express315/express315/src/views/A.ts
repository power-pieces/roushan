class A extends AView {
    public constructor() {
        super();
        this.initUI();
    } 

    private initUI(): void {
        var sky: egret.Bitmap = Texture.createBitmapByName("bgImage");
        this.addChild(sky);
        var stageW: number = ViewManager.stage.stageWidth;
        var stageH: number = ViewManager.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
    }

    public addListeners(): void {
       
    }

    public removeListeners(): void {
    }

} 