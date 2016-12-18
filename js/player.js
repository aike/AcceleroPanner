//  This program is licensed under the MIT License.
//  Copyright 2016, aike (@aike1000)
var Player = function(ctx, file) {
    this.playing = false;
	this.ctx = ctx;
	var self = this;
    this.loadwav(file, function(buf) { self.sample = buf; });
}

Player.prototype.loadwav = function(file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", file, true);
    xhr.responseType = "arraybuffer";
    var self = this;
    xhr.onload = function() {
        self.ctx.decodeAudioData(xhr.response,function(buf){
            callback(buf);
        }, function(){});
    };
    xhr.send();
}

Player.prototype.connect = function(next) {
    this.next = next;
}

Player.prototype.playsample = function(buf, tim) {
    this.src = this.ctx.createBufferSource();
    this.src.buffer = buf;
    this.src.connect(this.next);
    this.src.loop = true;
    this.src.start(tim);
}

Player.prototype.toggle = function() {
    if (this.playing)
        this.stop();
    else
        this.play();
}

Player.prototype.stop = function() {
    if (!this.playing)
        return;
    this.playing = false;
    this.src.stop(0);
}

Player.prototype.play = function() {
    if (this.playing)
        return;
    this.playing = true;
    this.playsample(this.sample, 0);
    var self = this;
}

