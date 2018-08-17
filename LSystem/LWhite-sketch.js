// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var lsys;
var turtle;

function setup() {
  createCanvas(600, 600);
  
  // Create an empty ruleset
   // var ruleset = [];
   // // Fill with two rules (These are rules for the Sierpinksi Gasket Triangle)
   // ruleset[0] = new Rule('F',"F--F--F--G");
   // ruleset[1] = new Rule('G',"GG");
   // // Create LSystem with axiom and ruleset
   // lsys = new LSystem("F--F--F",ruleset);
   // turtle = new Turtle(lsys.getSentence(),width*2,TWO_PI/3);
   


   

  var ruleset = [];
  ruleset[0] = new Rule("G", "[F+F++F+F+G++G+G]+++G[++G-F-F--F-F-G][G+G]"); //S
  ruleset[1] = new Rule("F", "F+F-F+F--F++F"); //C
  lsys = new LSystem("FG", ruleset);
  turtle = new Turtle(lsys.getSentence(), 250, radians(90)); //S:150 45 C: 250 90
}

function draw() {
  background(51);
  fill(0);
  //text("Click mouse to generate", 10, height-10);

  translate(width/3, height/2);
  rotate(-PI/2);
  turtle.render();
}

var counter = 0;

function mousePressed() {
  if (counter < 5) {
    push();
    lsys.generate();
    //println(lsys.getSentence());
    turtle.setToDo(lsys.getSentence());
    turtle.changeLen(0.5);
    pop();
    //redraw();
    counter++;
  }
}