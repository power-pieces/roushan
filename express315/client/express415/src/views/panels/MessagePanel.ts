class MessagePanel extends AView {
    private _tf: egret.TextField = new egret.TextField();
    
    public constructor(content:string) {
        super();
        
        this.createView();
        this.setContent(content);
    }

    private createView(): void {

        var tf: egret.TextField = this._tf;
        this.addChild(tf);

        tf.width = 640;
        tf.height = 200;
        tf.size = 40;
        tf.textAlign = "center";
        tf.stroke = 1;
        ViewManager.instance.putToCenter(this);

        
    }

    public setContent(content: string): void {
        this._tf.text = content;
    }
}