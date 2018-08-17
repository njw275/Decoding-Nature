
var Particle = function(xpos,ypos) {
  this.acceleration = createVector(0, 0);
  // this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.velocity = createVector(0,0);
  // this.position = createVector(posx,posy);
  this.position = createVector(xpos,ypos);
  this.lifespan = 255.0;

  this.run = function() {
    this.update();
    this.display();
  };


  this.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

  };


  this.display = function() {

    fill(255);
    ellipse(this.position.x, this.position.y, 6, 6);

  };


  this.isDead = function(){
    if (mouseX > this.position.x-3 && mouseX < this.position.x+3 && mouseY > this.position.y-3 && mouseY < this.position.y+3) {


      
      if (seconds > 0){
        numCircles++;
        return true;
      }else{
        false;
      }

    } else {
      return false;
    }
  };

  this.checkEdges = function() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
    else if (this.position.y < 0) {
      this.velocity.y *= -1;
      this.position.y = 0;
    }


  };
};