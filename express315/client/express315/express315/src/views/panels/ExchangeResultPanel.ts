/**
* 兑换结果页面
*/
class ExchangeResultPanel extends AView {

    private _id: number = 0;
    /**
    *1:成功 2:失败 3:赏银不足
    */
    public constructor(type:number, id:number) {
        super();
        this._id = id;
        this.createView(type);
    }

    private createView(type: number): void {
        this["type" + type]();
        ViewManager.instance.putToCenter(this);
    }

    private type1(): void {

        this.addChild(Texture.create("exchange_success_png"));
    }

    private type2(): void {

        this.addChild(Texture.create("exchange_fail_png"));
    }

    private type3(): void {

        this.addChild(Texture.create("bun_panel_png"));
    }
}