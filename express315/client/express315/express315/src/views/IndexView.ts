class IndexView extends AView
{
    private _hotZones: egret.Rectangle[] = [
        new egret.Rectangle(0, 0, 628, 885),
        new egret.Rectangle(6, 900, 617, 92),
    ];

    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        this.addChild(Texture.create("index_jpg"));
        this.touchEnabled = true;
    }

    public addListeners(): void {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    public removeListeners(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    private touchBeginHandler(e: egret.TouchEvent): void {
        console.log(e.localX, e.localY);
        for (var i: number = 0; i < this._hotZones.length; i++) {
            if (this._hotZones[i].contains(e.localX, e.localY)) {
                this.hotZoneActive(i);
                break;
            }
        }
    }

    private hotZoneActive(index: number): void {

        switch (index) {
            case 0:
                console.log("进入游戏");
                this.loadData();
                break;
            case 1:
                console.log("下载");
                break;
        }
    }

    private loadData(): void {

        //ViewManager.instance.showPanel(new RequestingPanel(),true,false);
        this.onLoadData();
    }

    private onLoadData(): void {
        NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.INTRO_VIEW));
    }
}