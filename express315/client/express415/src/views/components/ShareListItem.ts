class ShareListItem extends egret.Sprite {
    private _data: any;
    public constructor(data:any) {
        super();
        this._data = data;
        this.createView();
    }

    private createView(): void {
        this.graphics.beginFill(0xFFFAF4);
        this.graphics.drawRect(0, 0, 640, 100);
        this.graphics.endFill();



        RES.getResByUrl(this._data.sender_url,
            function (data: egret.Texture, url: string) {
                if (null != data) {
                    var pic: egret.Bitmap = new egret.Bitmap(data);
                    pic.anchorX = pic.anchorY = 0.5;
                    pic.width = pic.height = 64;
                    pic.x = 64;
                    pic.y = 54;
                    this.addChild(pic);

                    var picBorder: egret.Bitmap = Texture.create("border_64_png");
                    picBorder.anchorX = picBorder.anchorY = 0.5;
                    picBorder.x = 64;
                    picBorder.y = 54;
                    this.addChild(picBorder);
                }
            }
            , this, "image");

        var tf: egret.TextField = new egret.TextField();
        tf.x = 140;
        tf.y = 38;
        tf.width = 330;
        tf.height = 46;
        tf.textAlign = egret.HorizontalAlign.LEFT;
        tf.lineSpacing = 10;
        tf.textFlow = <Array<egret.ITextElement>>[
            { text: this._data.sender_name + "送了您", style: { "textColor": 0x745645, "size": "30", "bold": true } }
            , { text: "1", style: { "textColor": 0xf471ac, "size": "30", "bold": true } }
            , { text: "个包子", style: { "textColor": 0x745645, "size": "30", "bold": true } }
            , { text: "" }
        ];
        this.addChild(tf);        

        var timeTf: egret.TextField = new egret.TextField();
        timeTf.x = 520;
        timeTf.y = 40;
        timeTf.size = 20;
        //timeTf.stroke = 1;
        timeTf.width = 160;
        timeTf.height = 40;
        timeTf.textColor = 0x666666;
        timeTf.text = this._data.time;
        this.addChild(timeTf);

    }
} 