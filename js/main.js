//  This program is licensed under the MIT License.
//  Copyright 2016, aike (@aike1000)

var player;

window.onload = function() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var ctx = new AudioContext();

    player = new Player(ctx, 'sound/apan.mp3');

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

    var angle = 0;
    setInterval(function() {
        angle += 0.005;
        setAngle(angle);
    })

    var sensor = new Sensor(function(a) {
//        setPan(a);
    });
};



