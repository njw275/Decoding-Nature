"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var w = window.innerWidth,
    h = window.innerHeight,
    maxRadius = Math.sqrt(w * w + h * h) / 2,
    eyeRadius = 40,
    reversed = false;
var particles;
p5.disableFriendlyErrors = true;


var m;
var m2;
var att;
var Attractors = [];
var xpos;
var ypos;
var a;
var force;
var img;
var count;
var notCenter;
// var count = 0;
// var attCount;

var setup = function setup() {
  createCanvas(w, h);
  frameRate(30);
  translate(w / 2, h / 2);
  noStroke();
  // fill(color(0, 10, 45));
  fill(255,255,255);
  rect(-w / 2, -h / 2, w, h);
  particles = new Array(4000).fill().map(function (x) {
    return new Particle();
  });

  var img = loadImage("https://cdn0.iconfinder.com/data/icons/layout-and-location/24/Untitled-2-01-128.png");

  // m2 = new Mover();
  // m = new Mover(img);
  a = true;
  count = 0;
  notCenter = true;
  Attractors[0] = new Attractor(500,50);
  Attractors[1] = new Attractor(0,0);
  // A
};


var draw = function draw() {

  console.log(mouseY);

  translate(w / 2, h / 2);
  fill(color(0, 10, 45, 20));
  rect(-w / 2, -h / 2, w, h);
  fill(color(255, 255, 255, 100));
  for (var i = 0, length = particles.length; i < length; i++) {
    particles[i].step();
    particles[i].render(i);
    if (!reversed && particles[i].velocity.z < eyeRadius * 1.5) particles[i].reset();else if (reversed && particles[i].velocity.z > maxRadius - 10) particles[i].reset();
  }


  // if (m.position.x < Attractors[0].position.x+2.5 &&
  //     m.position.y > Attractors[0].position.y+2.5 && count == 0){

  //   Attractors[0].position.x = 200;
  //   Attractors[0].position.y = -200;
  //   count++;
  // }

  // if (m.position.x < 0 && m.position.y < 200 && m.position.y > 0 && count==1){
  //   Attractors[0].position.x = 200;
  //   Attractors[0].position.y = 200;
  //   count++;
  // }

  // if (m.position.x < 0 && m.position.y < 200 & m.position.y <= 0 && count==2){
  //   Attractors[0].position.x = 0;
  //   Attractors[0].position.y = 0;
  //   count++;
  // }

  // if (m.position.x > 0 && m.position.y < 0 && count == 3){
  //   Attractors[0].position.x = -500;
  //   Attractors[0].position.y = 150;
  //   count++;
  // }

  // if (m.position.x > 0 && m.position.y > 0 && count == 4){
  //   Attractors[0].position.x = -400;
  //   Attractors[0].position.y = -400;
  //   count++;
  // }

  // if (m.position.x < 25 && m.position.y > 0 && count == 5){
  //   Attractors[0].position.x = 950;
  //   Attractors[0].position.y = -450;
  // }
  // if (m.position.x < Attractors[1].position.x+2.5 && m.position.x > Attractors[1].position.x-2.5 &&
  //     m.position.y < Attractors[1].position.y+2.5 && m.position.y > Attractors[1].position.y-2.5 ){
  //   notCenter = false;
  // }

  // var force = Attractors[0].calculateAttraction(m);
  // m.applyForce(force);

  // if (notCenter){
  //   m.update();
  //   m.display();
  // }
  


};

var Particle = function () {
  function Particle() {
    _classCallCheck(this, Particle);

    this.position = getInitialPosition();
    this.acceleration = createVector(0, 0, 0);
    this.velocity = createVector(0, 0, 0);
  }

  _createClass(Particle, [{
    key: "step",
    value: function step() {
      var multiplier;
      if (mouseX > 610 && mouseX < 670 && mouseY > 270 && mouseY < 380){
        multiplier = 2;
      }
      else{
        multiplier = 1;
      }
      this.velocity = getVector(this.position.x, this.position.y).mult(multiplier);
      //mouse X && mouseY 1280 && 650 resp.
      this.position.add(this.velocity);
    }
  }, {
    key: "render",
    value: function render(i) {
      ellipse(this.position.x, this.position.y, 2, 2);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.position = getInitialPosition();
      this.acceleration.mult(0);
      this.velocity.mult(0);
    }
  }]);

  return Particle;
}();

var getInitialPosition = function getInitialPosition() {
  var a = Math.random() * 2 * Math.PI;
  var r = Math.random() * (maxRadius - 2 * eyeRadius) + 2 * eyeRadius;
  var c = polarToCartesian(a, r);
  return createVector(c.x, c.y, 0);
};

var getVector = function getVector(x, y) {
  var polar = cartesianToPolar(x, y);
  var a = polar.a;
  var r = polar.r;
  var a_offset = Math.max((r - eyeRadius) / (maxRadius - eyeRadius), 0) * Math.PI / 6 + Math.PI / 12;
  var vector_a = a + Math.PI / 2 + a_offset;
  if (reversed) vector_a -= Math.PI;
  var vector_r = (0.25 + (maxRadius - r) / (maxRadius - eyeRadius) * .75) * 5;
  var cartVector = polarToCartesian(vector_a, vector_r);
  return createVector(cartVector.x, cartVector.y, r);
};
var polarToCartesian = function polarToCartesian(a, r) {
  return { x: Math.cos(a) * r, y: Math.sin(a) * r };
};
var cartesianToPolar = function cartesianToPolar(x, y) {
  return { a: x < 0 ? Math.atan(y / x) + Math.PI : Math.atan(y / x), r: Math.sqrt(x * x + y * y) };
};