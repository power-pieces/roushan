class AudioDevice {

    private static _soundDic: any = {};
    private static _music: egret.Sound;
    private static _names: string[] = null;
    private static _stage: egret.Stage = null;

    /**
    * 在第一次捕获到点击事件时，预加载声音文件，用这个的好处是第一次准备好以后，可以在IOS或ANDROID中无点击事件时播放声音
    */
    public static prep(names: string[], stage: egret.Stage): void {
        if (stage != null && names != null) {
            this._names = names;
            this._stage = stage;
            this._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.prepTriggered, this);
        }
    }  

    private static prepTriggered(): void {

        this._stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.prepTriggered, this);

        var names: string[] = this._names;
        var count: number = names.length;
        for (var i: number = 0; i < names.length; i++) {
            var name: string = names[i];
            if (null == this._soundDic[name]) {
                var sound: egret.Sound = AudioDevice.getSound(name);
                sound.play();
                sound.pause();
                this._soundDic[name] = sound;
            }
        }        
    }
    
    

    /**
    * 播放BGM
    */
    public static playBGM(name: string): egret.Sound {
        var sound: egret.Sound = AudioDevice.getSound(name);
        sound.type = egret.Sound.MUSIC;
        sound.play(true);
        this._music = sound;
        return sound;
    }

    /**
    * 播放音效
    */
    public static playEffect(name: string): egret.Sound {
        var sound: egret.Sound = this._soundDic[name];
        if (null == sound) {
            sound = AudioDevice.getSound(name);
        }
        sound.play();        
        return sound;
    }

    private static getSound(name: string): egret.Sound {
        var sound: egret.Sound = RES.getRes(name);
        return sound;
    }
}