//  This program is licensed under the MIT License.
//  Copyright 2016, aike (@aike1000)

window.onload = function() {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();

    var player = new Player(ctx, 'sound/apan.mp3');
    var splitter = ctx.createChannelSplitter(2);
    var panL = ctx.createPanner();
    panL.panningModel = "HRTF";
    panL.setPosition(-1, 0, 0);
    var panR = ctx.createPanner();
    panR.panningModel = "HRTF";
    panR.setPosition(1, 0, 0);

    // player ----splitter
    //               ---- PanL ---- destination
    //               ---- PanR ---- destination
    player.connect(splitter);
    splitter.connect(panL, 0);
    splitter.connect(panR, 1);
    panL.connect(ctx.destination);
    panR.connect(ctx.destination);

    var setAngle = function(theta) {
        var sn = Math.sin(theta);
        var cs = Math.cos(theta);
        panL.setPosition(-cs, 0, sn);
        panR.setPosition(cs, 0, -sn);
    } 

    window.addEventListener("deviceorientation", function(e){
        if (e.alpha) {
            setAngle(e.alpha * Math.PI / 180);
        }
    });

    document.querySelector("#play")
        .addEventListener("mouseup",
            function() {
                player.toggle();
            });
};
