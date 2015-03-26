/**
* 结束面板菜单
*/
class ResultMenuPanel extends AView {
    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        this.addChild(Texture.create("result_menu_png"));
        this.y = ViewManager.stage.stageHeight - this.height;
    }

    public onAddedToStage(): void {
        
    }   

}