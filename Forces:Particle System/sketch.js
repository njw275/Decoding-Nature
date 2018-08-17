var w = window.innerWidth,
    h = window.innerHeight,
    maxRadius = Math.sqrt(w * w + h * h) / 2,
    eyeRadius = 40,
    reversed = false;
var particles;
p5.disableFriendlyErrors = true;


var m;
var att;
var Attractors = [];
var xpos;
var ypos;

var att3;

var setup = function setup() {
  createCanvas(w, h);
  frameRate(30);
  translate(w / 2, h / 2);
  noStroke();
  fill(color(0, 10, 45));
  rect(-w / 2, -h / 2, w, h);
  particles = new Array(4000).fill().map(function (x) {
    return new Particle();
  });

  // m = new Mover();

  xpos = 1000;
  ypos = 1000;

  // att3 = new Attractor(xpos,ypos);

};


var draw = function draw() {
  translate(w / 2, h / 2);
  fill(color(0, 10, 45, 20));
  rect(-w / 2, -h / 2, w, h);
  fill(color(255, 255, 255, 100));
  for (var i = 0, length = particles.length; i < length; i++) {
    particles[i].step();
    particles[i].render();
    if (!reversed && particles[i].velocity.z < eyeRadius * 1.5) particles[i].reset();else if (reversed && particles[i].velocity.z > maxRadius - 10) particles[i].reset();
  }


  // var force = att.calculateAttraction(m);
  // m.applyForce(force);
  // m.update();
  // m.display();


  // att3.display();
 
};





