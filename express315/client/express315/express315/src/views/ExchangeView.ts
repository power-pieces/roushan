class ExchangeView extends AView {
    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        this.addChild(Texture.create("exchange_jpg"));
        this.touchEnabled = true;
    }
}