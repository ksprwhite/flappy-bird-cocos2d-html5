var Floor = cc.Sprite.extend({
    
    ctor : function() {
        
        this._super(resources.Background_png, cc.rect(0, 1024, cc.winSize.width, 108));
        
        this.setPosition(this.width/2, this.height/2);
    },
    
    scroll : function(dt, speed) {
        
        var spriteRect = this.getTextureRect(),
            spritePos = spriteRect.x,
            spriteTexture = this.getTexture();
        
        if ( spriteTexture.width - spritePos <= cc.winSize.width )
            spriteRect.x = 0;
        else
            spriteRect.x += 1 * speed * dt;
        
        this.setTextureRect(spriteRect);
    }
});