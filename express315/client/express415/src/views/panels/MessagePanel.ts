class MessagePanel extends AView {
    private _tf: egret.TextField = new egret.TextField();
    private _closeKey: number = -1;
    public constructor(content:string, closeDelay:number = 0) {
        super();
        if (closeDelay > 0) {
            this._closeKey = egret.setTimeout(ViewManager.instance.closePanel, ViewManager.instance, closeDelay);
        }
        this.createView();
        this.setContent(content);
    }

    private createView(): void {

        this.addChild(Texture.create("bun_panel_png"));

        var tf: egret.TextField = this._tf;
        this.addChild(tf);
        tf.x = 40;
        tf.y = 120;
        tf.width = 330;
        tf.height = 100;
        tf.size = 30;
        tf.textAlign = "center";
        tf.stroke = 1;
        ViewManager.instance.putToCenter(this);        
    }

    public setContent(content: string): void {
        this._tf.text = content;
    }

    public dispose(): void {
        if (this._closeKey != -1) {
            egret.clearTimeout(this._closeKey);
        }
        super.dispose();
    }
}