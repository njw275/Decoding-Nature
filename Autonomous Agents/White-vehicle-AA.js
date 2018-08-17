
function Vehicle(x,y,ms,mf) {
  this.position = createVector(x,y);
  this.acceleration = createVector(0,0);
  this.velocity = createVector(2,0);
  this.r = 4;
  this.maxspeed = ms || 4;
  this.maxforce = mf || 0.1;
  this.parkingSpot = createVector(400,height-(48*2));
  this.doneFollowing = false;
  this.img = loadImage("car.png");

  this.run = function() {
    this.update();
    this.display();
  };

  // This function implements Craig Reynolds' path following algorithm
  // http://www.red3d.com/cwr/steer/PathFollow.html
  this.follow = function(p) {


    var predict = this.velocity.copy();
    predict.normalize();
    predict.mult(50);
    var predictLoc = p5.Vector.add(this.position, predict);


    var normal = null;
    var target = null;
    var worldRecord = 1000000;  

    for (var i = 0; i < p.points.length-1; i++) {

      var a = p.points[i];
      var b = p.points[i+1];
      //println(b);

      // Get the normal point to that line
      var normalPoint = getNormalPoint(predictLoc, a, b);

      if (normalPoint.x < a.x || normalPoint.x > b.x) {

        normalPoint = b.copy();
      }

      // How far away are we from the path?
      var distance = p5.Vector.dist(predictLoc, normalPoint);
      
      if (distance < worldRecord) {
        worldRecord = distance;
        
        normal = normalPoint;

        var dir = p5.Vector.sub(b, a);
        dir.normalize();
        dir.mult(10);
        target = normalPoint.copy();
        target.add(dir);
      }
    }

    if (worldRecord > p.radius && target !== null) {
      this.seek(target);
    }

    if (debug) {
      stroke(255);
      fill(200);
      line(this.position.x, this.position.y, predictLoc.x, predictLoc.y);
      ellipse(predictLoc.x, predictLoc.y, 4, 4);

      
      stroke(255);
      fill(200);
      ellipse(normal.x, normal.y, 4, 4);

      line(predictLoc.x, predictLoc.y, normal.x, normal.y);
      if (worldRecord > p.radius) fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8, 8);
    }
  };


  this.applyForce = function(force) {

    this.acceleration.add(force);
  };

  this.seek = function(target) {
    var desired = p5.Vector.sub(target, this.position);  // A vector pointing from the position to the target

   
    if (desired.mag() === 0) return;

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force

    this.applyForce(steer);
  };

    // Method to update position
  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  };

  // Wraparound
  this.borders = function(p) {
    if (this.position.x > p.getEnd().x + this.r) {
      this.doneFollowing = true;
      console.log("ARRIVE");
      
    }
  };

  this.display = function() {

    var theta = this.velocity.heading() + PI/2;
    fill(127);
    stroke(255);
    strokeWeight(1);
    push();
    translate(this.position.x,this.position.y);
    rotate(theta);
    beginShape();
      imageMode(CENTER);
      image(this.img,0,0,20,35);
    endShape(CLOSE);
    pop();
  };

  this.arrive = function(target) {
    var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
    var d = desired.mag();
    // Scale with arbitrary damping within 100 pixels
    if (d < 100) {
      var m = map(d,0,100,0,this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    this.applyForce(steer);
  };

  var getNormalPoint = function(p, a, b) {
    // Vector from a to p
    var ap = p5.Vector.sub(p, a);
    // Vector from a to b
    var ab = p5.Vector.sub(b, a);
    ab.normalize(); // Normalize the line
    // Project vector "diff" onto line by using the dot product
    ab.mult(ap.dot(ab));
    var normalPoint = p5.Vector.add(a, ab);
    return normalPoint;
  };
}