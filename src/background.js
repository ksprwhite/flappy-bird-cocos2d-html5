var BackgroundLayer = cc.LayerColor.extend({
    dayColors : {
        "day" : new cc.Color(78, 192, 202, 255),
        "night" : new cc.Color(78, 192, 202, 255)
    },
    day : null,
    land : null,
    
    ctor : function (day) {
        
        this._super();
        
        if(day)
            this.day = day;
        else
            this.setDay();
        
        this.setColor(this.getDayColor());
        
        this.addLand();
        
        return true;
    },
    
    addLand : function() {
        
        this.land = new cc.Sprite(
            resources.Background_png,
            cc.rect(0, (this.day == 'night' ? 512 : 0), cc.winSize.width, 512)
        );
        
        this.addChild(this.land, 0, 1);
        this.land.setPosition(this.land.width/2, this.land.height/2);
    },
    
    setDay : function(){
        
        var rand = parseInt(cc.rand() % 10);
        
        if(rand != 5)
            this.day = "day";
        else
            this.day = "night";
    },
    
    getDayColor : function() {
        return this.dayColors[this.day];
    }
});