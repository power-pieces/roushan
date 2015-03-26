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
        NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.SHARE_VIEW));
        
    }
} 