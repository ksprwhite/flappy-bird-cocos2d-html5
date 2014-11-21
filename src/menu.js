var gameMenuLayer = cc.Layer.extend({
    ctor : function() {
        
        this._super();
        
        this.floor = new Floor();
        
        var logo = new cc.Sprite(resources.Gui_png, new cc.Rect(0, 252, 178, 48));
        
        logo.setPosition(
            cc.winSize.width / 2,
            cc.winSize.height / 2 + 100
        );
        
        var bird = new Bird(true);
        
        bird.setPosition(cc.winSize.width/2, bird.getPositionY() + 40);
        
        var playBtnSprite = new cc.Sprite(resources.Gui_png, new cc.Rect(0, 436, 116, 70));
        var rankingBtnSprite = new cc.Sprite(resources.Gui_png, new cc.Rect(118, 436, 116, 70));
        
        this.playButton = new cc.MenuItemSprite(playBtnSprite, null, this.play, this);
        this.rankingButton = new cc.MenuItemSprite(rankingBtnSprite, null, this.play, this);
        
        this.rankingButton.setPositionX(this.rankingButton.width + 10)
        
        this.playButton.setEnabled(true);
        this.rankingButton.setEnabled(true);
        
        var menu = new cc.Menu(this.playButton, this.rankingButton);
        
        menu.setPosition(
            cc.winSize.width / 2 - this.playButton.width/2 - 5,
            this.floor.height + this.playButton.height/2 - 10
        );
        
        this.addChild(logo);
        this.addChild(bird);
        this.addChild(menu);
        this.addChild(this.floor);
        
        this.scheduleUpdate();
    },
    
    play : function(target) {
        
        cc.audioEngine.playEffect(resources.Sfx_swooshing_ogg);
        
        var btnActiveSeq = new cc.Sequence(
            cc.moveBy(0.1, 0, -5),
            cc.moveBy(0.1, 0, 5)
        );
        
        target.runAction(btnActiveSeq);
        
        var newScene = cc.TransitionFade.create(1.5, new GameScene(), cc.color(0,0,0));
        
        cc.director.runScene(newScene);
    },
    
    update : function(dt) {
        
        this.floor.scroll(dt, 150);
    }
});