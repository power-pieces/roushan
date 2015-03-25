class ResultView extends AView {
    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        this.addChild(Texture.create("result_bg_png"));
        this.touchEnabled = true;
    }
}