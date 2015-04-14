﻿/**
* 结束面板菜单
*/
class ResultMenuPanel extends AView {

    private _hotZones: egret.Rectangle[] = [
        new egret.Rectangle(105, 38, 437, 115),
        new egret.Rectangle(102, 164, 453, 106)
    ];

    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        this.addChild(Texture.create("result_menu_png"));
        this.y = ViewManager.stage.stageHeight - this.height;

        var remainTF = new egret.BitmapText();
        remainTF.font = RES.getRes("white_40_b_fnt");
        remainTF.text = "x" + DataCenter.remain;
        remainTF.x = 430;
        remainTF.y = 74;
        this.addChild(remainTF);

        this.touchEnabled = true;
    }

    public onAddedToStage(): void {
        
    }   

    public addListeners(): void {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    public removeListeners(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    }

    private touchBeginHandler(e: egret.TouchEvent): void {
        var self: ResultMenuPanel = this;
        for (var i: number = 0; i < self._hotZones.length; i++) {
            if (self._hotZones[i].contains(e.localX, e.localY)) {
                self.hotZoneActive(i);
                break;
            }
        }
    }

    private hotZoneActive(index: number): void {
        AudioDevice.playEffect("btn_click_mp3");
        switch (index) {
            case 0:
                if (DataCenter.remain <= 0) {                    
                    return;
                }
                NetManager.statistic("再来一次按钮");
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.GAME_VIEW));
                break;
            case 1:
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.SHARE_VIEW));    
                         
                break;
        }

        
    }
}