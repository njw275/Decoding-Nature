function Cell(x_, y_, w_) {
  this.x = x_;
  this.y = y_;
  this.w = w_;
  this.myNeighbors = 0;

  this.state = Math.floor(random(2));
    this.previous = this.state;

  this.savePrevious = function() {
    this.previous = this.state;
  };

  this.newState = function(s) {
    this.state = s;
  };

  this.display = function() {

    if (this.state == 1) fill(255,0,0);
    else if (this.state == 2) fill(255,0,0);

    else fill(255);
    stroke(0);
    rect(this.x, this.y, this.w, this.w);
    if (this.state == 3){
      fill(0);
      textSize(12);
      text(this.myNeighbors, this.x+5, this.y+10);
    }
    if (this.state == 4){
      fill(0);
      textSize(12);
      text('F', this.x+5, this.y+10);
    }
  };
}


