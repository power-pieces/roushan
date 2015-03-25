class ReceiveShareView extends AView {
    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        this.addChild(Texture.create("receive_share_jpg"));
        this.touchEnabled = true;
    }
}