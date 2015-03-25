class ShareView extends AView {
    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        this.addChild(Texture.create("share_jpg"));
        this.touchEnabled = true;
    }
}