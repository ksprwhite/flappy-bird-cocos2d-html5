var GameStatusLayer = cc.Layer.extend({
    score : 0,
    scoreLabel : null,
    
    ctor : function () {
        
        this._super();
        
        this.setGUI();
    },
    
    setGUI : function () {
        
        this.setScore();
        
        this.setInstructions();
    },
    
    setScore : function () {
        
        this.scoreLabel = null;
        
        cc.sys.localStorage.setItem("score", 0);
        
        this.scoreLabel = new cc.LabelBMFont("0", resources.FlappyBird_fnt);
        
        this.scoreLabel.setPositionX(cc.winSize.width / 2);
        this.scoreLabel.setPositionY(cc.winSize.height - 25);
        
        this.addChild(this.scoreLabel);
    },
    
    setInstructions : function (){
        
        this.getReadyLetter = new cc.Sprite(resources.Gui_png, new cc.Rect(0, 0, 196, 62));
        this.tapLetter = new cc.Sprite(resources.Gui_png, new cc.Rect(0, 116, 114, 98));
        
        this.getReadyLetter.setPosition(
            cc.winSize.width / 2,
            cc.winSize.height / 2 + 125
        );
        
        this.tapLetter.setPosition(
            cc.winSize.width / 2,
            cc.winSize.height / 2
        );
        
        this.addChild(this.getReadyLetter);
        this.addChild(this.tapLetter);
    },
    
    hideInstructions : function () {
        
        this.getReadyLetter.runAction(new cc.FadeTo(0.5, 0));
        this.tapLetter.runAction(new cc.FadeTo(0.5, 0));
    },
    
    getScore : function () {
    
        return parseInt(this.score);
    },
    
    updateScore : function (score) {
        
        if(typeof score == 'string')
        {
            var matches = score.match(/(\+|\-)([0-9]+)/);
            
            if( matches == null )
                score = 0;
            else 
            {
                var sign = matches[1],
                    number = matches[2];
                
                score = this.getScore() + parseInt(sign == '+' ? number : -number);
            }
        }
        
        this.score = parseInt(score);
        this.scoreLabel.setString(parseInt(this.score).toString());
        
        cc.sys.localStorage.setItem("score", this.score);
    }
});