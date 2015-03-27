/**
* 显示的基础类
*/
class AView extends egret.Sprite {

    public constructor() {
        super();
    }

    public onAddedToStage(): void {

    }    

    public addListeners(): void {
        
    }

    public removeListeners(): void {
        
    }

    public dispose(): void {
        this.removeListeners();
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
}
