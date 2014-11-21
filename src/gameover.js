var GamOverLayer = cc.Layer.extend({
    ctor : function() {
        
        this._super();
        
        this.hitOverlay();
        
        var seq = new cc.Sequence(
            cc.DelayTime.create(0.1),
            cc.callFunc(this.showGameOverLetter, this),
            cc.DelayTime.create(1.0),
            cc.callFunc(this.showFinalScore, this),
            cc.DelayTime.create(0.5),
            cc.callFunc(this.showMenuButtons, this)
        );
        
        this.runAction(seq);
    },
    
    hitOverlay : function () {
        
        var overlay = cc.LayerColor.create(
            new cc.Color(255, 255, 255, 200),
            cc.winSize.width,
            cc.winSize.height
        );
        
        cc.director.getRunningScene().addChild(overlay, 4);
        
        overlay.runAction(new cc.sequence(
            cc.fadeOut(0.2),
            cc.callFunc(function(target){
                target.removeChild(overlay);
            }, this)
        ));
    },
    
    showGameOverLetter : function () {
        
        this.gameOverLetter = new cc.Sprite(resources.Gui_png, new cc.Rect(0, 62, 204, 52));
        
        this.gameOverLetter.setPosition(
            cc.winSize.width / 2,
            cc.winSize.height / 2 + 125
        );
        
        this.addChild(this.gameOverLetter);
        
        this.gameOverLetter.runAction(new cc.Sequence(
            cc.fadeOut(0),
            cc.fadeIn(0.1),
            cc.moveBy(0.1, 0, -10)
        ));
    },
    
    showFinalScore : function () {
        
        cc.audioEngine.playEffect(resources.Sfx_swooshing_ogg);
        
        var scoreContainer = new cc.Sprite(resources.Gui_png, new cc.Rect(0, 302, 238, 126));
        
        scoreContainer.setPosition(
            cc.winSize.width / 2,
            cc.winSize.height / 2
        );
        
        this.addChild(scoreContainer);
        
        scoreContainer.runAction(new cc.Sequence(
            cc.fadeOut(0),
            cc.fadeIn(0.1),
            cc.moveBy(0.1, 0, -10),
            cc.callFunc(this.calcScore, scoreContainer, this)
        ));
    },
    
    calcScore : function(container, currentLayer) {
        //cc.sys.localStorage.removeItem("score"); cc.sys.localStorage.removeItem("bestScore"); cc.sys.localStorage.removeItem("lastBestScore");
        
        var totalScore = cc.sys.localStorage.getItem("score");
        var bestScore = cc.sys.localStorage.getItem("bestScore");
        var lastBestScore = cc.sys.localStorage.getItem("lastBestScore");
        var isNewRecord = false;
        
        totalScore = parseInt(totalScore);
        lastBestScore = lastBestScore ? parseInt(lastBestScore) : 0;
        
        if( !bestScore )
            cc.sys.localStorage.setItem("bestScore", totalScore);
        
        else if(totalScore > bestScore)
            cc.sys.localStorage.setItem("bestScore", totalScore);
        
        if(!bestScore && totalScore > 0)
            isNewRecord = true;
        
        bestScore = parseInt(cc.sys.localStorage.getItem("bestScore"));
        cc.sys.localStorage.setItem("lastBestScore", bestScore);
        
        if(bestScore > lastBestScore)
            isNewRecord = true;
        
        var scoreLabel = new cc.LabelBMFont("0", resources.FlappyBird_fnt, -1, cc.TEXT_ALIGNMENT_RIGHT);
        var bestScoreLabel = new cc.LabelBMFont(bestScore.toString(), resources.FlappyBird_fnt, -1, cc.TEXT_ALIGNMENT_RIGHT);
        var newLabel = new cc.Sprite(resources.Gui_png, new cc.Rect(127, 236, 32, 14));
        
        scoreLabel.setScale(0.5); scoreLabel.setAnchorPoint(0, 0);
        bestScoreLabel.setScale(0.5); bestScoreLabel.setAnchorPoint(0, 0);
        newLabel.setAnchorPoint(0, 0);
        
        scoreLabel.setPosition(
            211 - (scoreLabel.width - ((scoreLabel.width * 50)/100)),
            72
        );
        
        bestScoreLabel.setPosition(
            211 - (bestScoreLabel.width - ((bestScoreLabel.width * 50)/100)),
            32
        );
        
        var setCoinAction = new cc.callFunc(this.setCoin, container);
        var increase = 0;
        var delayTime = (0.5/totalScore);
        var delay = new cc.DelayTime(delayTime);
        var incrementSeq = new cc.Sequence(
            delay,
            cc.callFunc(function(layer){                
                
                scoreLabel.setString(increase.toString());
                
                scoreLabel.setPosition(
                    211 - (scoreLabel.width - ((scoreLabel.width * 50)/100)),
                    72
                );
                
                if(totalScore == increase) {
                    scoreLabel.stopAllActions();
                    currentLayer.addMedal(container, totalScore);
                    return;
                }
                
                increase++;
                
            }, this)
        );
        
        scoreLabel.runAction(new cc.RepeatForever(incrementSeq));
        
        newLabel.setPosition(
            bestScoreLabel.getPositionX() - newLabel.width - 12,
            bestScoreLabel.getPositionY() + newLabel.height + 6
        );
        
        container.addChild(scoreLabel);
        container.addChild(bestScoreLabel);
        
        if(isNewRecord)
            container.addChild(newLabel);
    },
    
    addMedal : function (container, score) {
        
        if( score < 10 )
            return;
        
        var medals = {
            platinum : [40, new cc.Rect(219, 4, 44, 44)],
            gold : [30, new cc.Rect(219, 50, 44, 44)],
            silver : [20, new cc.Rect(219, 96, 44, 44)],
            bronze : [10, new cc.Rect(219, 142, 44, 44)]
        };
        
        var medal = new cc.Sprite(resources.Gui_png);
        
        for(var k in medals)
        {
            if( score >= medals[k][0] ){
                medal.setTextureRect(medals[k][1]);
                break;
            }
        }
        
        medal.setPosition(
            medal.width / 2 + 31,
            medal.height / 2 + 38
        );
        
        medal.setOpacity(0);
        
        container.addChild(medal);
        
        medal.runAction(new cc.Sequence(
            cc.fadeIn(0.1)
        ));
        
        var shine = new cc.Sprite();
        shine.setAnchorPoint(0, 0);
        
        var shineFrames = [
            new cc.SpriteFrame.create(resources.Gui_png, new cc.Rect(208, 3, 10, 10)),
            new cc.SpriteFrame.create(resources.Gui_png, new cc.Rect(208, 13, 10, 10)),
            new cc.SpriteFrame.create(resources.Gui_png, new cc.Rect(208, 23, 10, 10))
        ];
        
        var animation = cc.Animation.create(shineFrames, 0.2),
            animateAction = cc.Animate.create(animation);
        
        var shineSeq = new cc.Sequence(
            animateAction,
            animateAction.reverse(),
            cc.callFunc(function(){
                var limits = new cc.p(medal.width, medal.height);
                var randX = (cc.rand() % limits.x);
                var randY = (cc.rand() % limits.y);
                
                shine.setPosition(randX, randY);
            })
        );
        
        shine.runAction(new cc.RepeatForever(shineSeq));
        
        medal.addChild(shine);
    },
    
    showMenuButtons : function () {
        
        var floor = this.parent.layers.gamePlay.floor;
        
        cc.audioEngine.playEffect(resources.Sfx_swooshing_ogg);
        
        var playBtnSprite = new cc.Sprite(resources.Gui_png, new cc.Rect(0, 436, 116, 70));
        var rankingBtnSprite = new cc.Sprite(resources.Gui_png, new cc.Rect(118, 436, 116, 70));
        
        this.playButton = new cc.MenuItemSprite(playBtnSprite, null, this.restartGame, this);
        this.rankingButton = new cc.MenuItemSprite(rankingBtnSprite, null, this.restartGame, this);
        
        this.rankingButton.setPositionX(this.rankingButton.width + 10)
        
        this.playButton.setEnabled(true);
        this.rankingButton.setEnabled(true);
        
        var menu = new cc.Menu(this.playButton, this.rankingButton);
        
        menu.setPosition(
            cc.winSize.width / 2 - this.playButton.width/2 - 5,
            floor.height + this.playButton.height/2 - 10
        );
        
        this.addChild(menu);
        
    },
    
    restartGame : function (target) {
        
        cc.audioEngine.playEffect(resources.Sfx_swooshing_ogg);
        
        var btnActiveSeq = new cc.Sequence(
            cc.moveBy(0.1, 0, -5),
            cc.moveBy(0.1, 0, 5)
        );
        
        target.runAction(btnActiveSeq);
        
        var newScene = cc.TransitionFade.create(1.5, new GameScene(), cc.color(0,0,0));
        cc.director.runScene(newScene);
    },
});