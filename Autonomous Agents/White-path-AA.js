
function Path() {
  

  this.radius = 20;

  this.points = [];

  // Add a point to the path
  this.addPoint = function(x, y) {
    var point = createVector(x, y);
    this.points.push(point);
  };

  this.getStart = function() {
     return this.points[0];
  };

  this.getEnd = function() {
     return this.points[this.points.length-1];
  };



}