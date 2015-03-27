class ShareTipPanel extends AView {
    public constructor() {
        super();

        this.createView();

    }

    private createView(): void {
        this.addChild(Texture.create("share_png"));


    }

    public dispose(): void {
        super.dispose();       
    }
} 