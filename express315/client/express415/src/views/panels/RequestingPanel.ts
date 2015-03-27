class RequestingPanel extends AView {

    private _tf: egret.TextField;

    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        var tf: egret.TextField = this._tf;
        tf = new egret.TextField();
        this.addChild(tf);

        tf.width = 480;
        tf.height = 100;
        tf.size = 40;
        tf.textAlign = "center";
        tf.stroke = 1;
        ViewManager.instance.putToCenter(this);

        tf.text = "网络通信中...";
    }
}