class Mask extends egret.Shape {
    public isLock: boolean;

    public constructor() {
        super();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    public init(): void {
        this.graphics.clear();
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    private touchBeginHandler(e: egret.TouchEvent): void {
        if (false == this.isLock) {
            ViewManager.instance.closePanel();
        }
    }


} 