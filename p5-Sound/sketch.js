var sound;
var playing = false;
var start_time = -1;
var stop_time = -1;
var boomTime = false;
var revTime = false;
var c = 0;
var go = false;
var period = 120;
var amplitude = 100;


var d = 16;
var t = 0;
var dt;
var amp;
var freq;

var colorMax = 0;

var toRight = 0;
var pan = false;



var preload = function preload() {
  sound = loadSound("AcidRain.mp3"); 
};


var setup = function setup() {
  createCanvas(1000, 600);
};

var draw = function draw() {
  var x = amplitude * sin(TWO_PI * frameCount / period);



  if (mouseX > width*2/3){
    dt = 1.5;
  }
  else{
    dt = 0.1;
  }




  var color = amplitude * sin(TWO_PI * frameCount / period);
  if (color < colorMax){
    colorMax = color;
    console.log(colorMax);
  }

  if (sound.isPlaying()){
    var red = map(mouseX,0,width,153,225);
    var green = map(mouseX,0,width,0,50); //50
    var blue = map(mouseX,0,width,0,204); //204
  }
  else{
    var red = 139;
    var green = 0;
    var blue = 139;
  }

  console.log("Red: "+ red);
  background(red,green,blue);
  

  if (sound.isPlaying()){
    amp = map(mouseX, 0, width, 0, 100);
  }
  else{
    amp = 0;
  }

  freq = map(mouseX,0,height,.001,0.5);


  for (var i=0;i <width;i+=10){
    fill(0);
    ellipse(i,amp*sin(freq/6*(t+i))+height/2,d,d);
  }
  t += dt;

  speed = map(mouseX-20,0,width,0,2);

 
  console.log("Speed: "+speed);
  sound.rate(speed);
  if (pan){
    sound.pan(map(x,-100,100,-1,1));
  }
  else{
    sound.pan(map(toRight,-10,10,-1,1));
  }
  console.log("PAN: "+ toRight);
};


var mousePressed = function mousePressed(){


  if (playing){
    sound.play();
    
  }
  else{
    sound.pause();
    
  }
  playing = !playing;
  

};


var keyPressed = function keyPressed(){

  if (keyCode == RIGHT_ARROW){
    console.log("okay..");
    toRight++;
    if(toRight > 10){
      toRight = 10;
    }
  }

  if (keyCode == LEFT_ARROW){
    toRight--;
    if(toRight < -10){
      toRight = -10;
    }
  }

  if (key == ' '){
    if (pan){
      pan = false;
    }
    else{
      pan = true;
    }
  }
  
  

};









