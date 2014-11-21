var GamePlayLayer = cc.Layer.extend({
    sprite : null,
    floor : null,
    bird : null,
    pipes : null,
    speed : cc.vertex2(150, 100),
    limitSpeed : cc.vertex2(250, 1000),
    
    ctor : function (scene) {
        
        this._super();
        
        this.statusLayer = scene.layers.gameStatus;
        this.scene = scene;
        
        this.floor = new Floor();
        this.bird = new Bird();
        this.pipes = new PipesLayer();
        
        this.addChild(this.pipes, 0);
        this.addChild(this.bird, 1);
        this.addChild(this.floor, 2);
        
        this.scheduleUpdate();
        
        this.bird.parent = this.pipes.parent = this;
        
        // debug bird bounds
        /*this.birdCollider = cc.DrawNode.create();
        this.addChild(this.draw, 2);        
        this.birdCollider.drawDot(
            cc.p(0, 0),
            this.bird.getBoundingCircle().r,
            cc.Color(0, 0, 0, 120)
        );*/
        
        return true;
    },
    
    update : function (dt) {
        
        // debug bird bounds
        /*this.birdCollider.setPosition(
            this.bird.getBoundingCircle().x,
            this.bird.getBoundingCircle().y
        );*/
        
        this.floor.scroll(dt, this.speed.x);
    },
    
    gameOver : function () {
        
        // play game over sound
        this.parent.schedule(function(){
            cc.audioEngine.playEffect(resources.Sfx_die_ogg);
        }, 0, 0, 0.2);
        
        // stop floor scroll animation
        this.unscheduleUpdate();
        
        // add game over layer to game scene
        this.parent.addChild(new GamOverLayer(), 3, LAYER_TAGS.gameover);
    },
    
    checkBirdCollision : function (rectObj, bird) {
        
        var circleDistance = new cc.Vertex2F();
        
        var rect = rectObj.getBoundingBox();
        var circle = bird.getBoundingCircle();
        
        circle.x = circle.x - circle.r * 2;
        rect.y = (rect.y - rect.height / 2) + rect.height;
        
        circleDistance.x = Math.abs(circle.x - rect.x);
        circleDistance.y = Math.abs(circle.y - rect.y);

        if (circleDistance.x > (rect.width/2 + circle.r))
            return false
            
        if (circleDistance.y > (rect.height/2 + circle.r))
            return false;

        if (circleDistance.x <= (rect.width/2))
            return true
            
        if (circleDistance.y <= (rect.height/2))
            return true;

        var cornerDistance_sq = (circleDistance.x - rect.width/2)^2 +
                             (circleDistance.y - rect.height/2)^2;

        return (cornerDistance_sq <= (circle.r^2));
    }
});