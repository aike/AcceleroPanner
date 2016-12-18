//  This program is licensed under the MIT License.
//  Copyright 2016, aike (@aike1000)
var Sensor = function(callback) {
	this.alpha = 0;
	this.beta = 0;
	this.gamma = 0;

	var self = this;
	window.addEventListener("deviceorientation", function(e){
		if (e.alpha) {
			self.setAngle(e.alpha, e.beta, e.gamma);
		}
	});

	this.angle = 0;
	this.callback = callback;
/*
	setInterval(function() {
		$('#param').knob('value', self.angle * 100)
	}, 50);
*/
}

Sensor.prototype.setAngle = function(alpha, beta, gamma) {
	document.querySelector("#x").textContent = alpha;
	document.querySelector("#y").textContent = beta;
	document.querySelector("#z").textContent = gamma;

/*
	var angle = (beta + 20) / 40;
	if (angle < 0.0)
		angle = 0.0;
	else if (angle > 1.0)
		angle = 1.0;

	this.angle = angle;
	if (this.callback)
		this.callback(this.alpha, this.beta, this.gamma);
*/
}

