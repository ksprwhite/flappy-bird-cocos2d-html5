var resources = {
    Background_png : "res/images/background.png",
    Gui_png : "res/images/gui.png",
    Entities_png : "res/images/entities.png",
    FlappyBird_fnt : "res/fonts/flappyBird.fnt",
    Sfx_swooshing_ogg : "res/sounds/sfx_swooshing.ogg",
    Sfx_wing_ogg : "res/sounds/sfx_wing.ogg",
    Sfx_hit_ogg : "res/sounds/sfx_hit.ogg",
    Sfx_point_ogg : "res/sounds/sfx_point.ogg",
    Sfx_die_ogg : "res/sounds/sfx_die.ogg"
};

var g_resources = [];

for (var i in resources) {
    g_resources.push(resources[i]);
}