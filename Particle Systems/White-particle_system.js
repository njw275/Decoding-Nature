
var done = false;

var ParticleSystem = function(position) {
  if (mode==2){
	 this.origin = position.copy();
  }
	this.particles = [];

  this.addParticle = function(px,py) {
    if(px == -1){
      px = random(21,width);
    }
    if (py == -1){
      var py = random(0,height);
    }
  	this.particles.push(new Particle(px,py));
  };

  this.run = function() {
  	for (var i = this.particles.length-1; i >= 0; i--) {
      var p = this.particles[i];
      p.checkEdges();
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  };

  this.move = function() {
    if (!done){
      if(this.particles.length != numParticles){
        for(var i=0;i<(numParticles-this.particles.length);i++){
          this.addParticle();
        }


      }
      for (var i = this.particles.length-1; i >= 0; i--) {
        var p = this.particles[i];
        p.velocity = createVector(random(-1,1),random(-1,1));
      }
    }
    done = true;
    // reset = false;
  };

  this.stopMove = function() {
    done = false;
    for (var i = this.particles.length-1; i >= 0; i--) {
      var p = this.particles[i];
      p.velocity = createVector(0,0);
    }
  };




};