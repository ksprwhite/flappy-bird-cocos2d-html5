var LAYER_TAGS = {
    background : 1,
    gameplay : 2,
    gamestatus : 3,
    gameover : 4
};

var GameMenuScene = cc.Scene.extend({
    onEnter : function () {
        
        this._super();
        
        var background = new BackgroundLayer();
        var menu = new gameMenuLayer();
        
        this.addChild(background, 0);
        this.addChild(menu, 1);
    } 
});

var GameScene = cc.Scene.extend({
    
    status : 'waiting',    
    layers : {
        background : null,
        gamePlay : null,
        gameStatus : null
    },
    
    onEnter : function () {
        
        this._super();
        
        this.layers.background = new BackgroundLayer();
        this.layers.gameStatus = new GameStatusLayer();
        this.layers.gamePlay = new GamePlayLayer(this);
        
        this.addChild(this.layers.background, 0, LAYER_TAGS.background);
        this.addChild(this.layers.gamePlay, 1, LAYER_TAGS.gameplay);
        this.addChild(this.layers.gameStatus, 2, LAYER_TAGS.gamestatus);
    }
});