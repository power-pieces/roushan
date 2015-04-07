class AudioDevice {

    private static _music: egret.Sound;

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
        var sound: egret.Sound = AudioDevice.getSound(name);
        sound.play();        
        return sound;
    }

    private static getSound(name: string): egret.Sound {
        var sound: egret.Sound = RES.getRes(name);
        return sound;
    }
}