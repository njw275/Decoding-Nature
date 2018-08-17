

var ps;
var theta = 0;
var theta_vel = 0.5;
var numCircles = 0;
var premouseX = 0;
var prevmouseY = 0;
var reset = true;
var numParticles = 25;
var mode = 1;
var mouse;
var prevMouse;
var dir;
var tR = false;
var tL = false;
var bR = false;
var bL = false;
var mouseX;
var mouseY;

//for sin wave
var d = 16;
var t = 0;
var dt = 0.1;
var amp = 10;
var freq = .3;

var seconds;
var startTime;
var countdown = 20;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  setFrameRate(60);
  ps = new ParticleSystem(createVector(width/2, 50));
  for(var i=0;i<numParticles;i++){
    ps.addParticle(-1,-1);
  }
  startTime = millis()/1000 + countdown;

}

function draw() {
	background(0);
	push();
	translate(0,0);
	seconds = startTime - millis()/1000;
	seconds = Math.round(seconds);
	if (seconds < 0){
		seconds = "Score: " + numCircles;
		
	}else{
		seconds = seconds.toString();
	}

	textSize(24);
	text(seconds,15,25);
	textSize(12);
	var x = 0;
	var y = 0;
	mouse = createVector(mouseX,mouseY);
	prevMouse = createVector(premouseX,prevmouseY);

	dir = mouse.sub(prevMouse);
	dir = dir.normalize();

	pop();
	// console.log(dir.x);
	if(dir.x < 0 && dir.y < 0){
		bR = true;
		bL = false;
		tR = false;
		tL = false;
		x = 20;
		y = 20;
	}
	else if(dir.x < 0 && dir.y > 0){
		bR = false;
		bL = false;
		tR = false;
		tL = true;
		x = 20;
		y = -20;
	}
	else if(dir.x > 0 && dir.y < 0){
		bR = false;
		bL = true;
		tR = false;
		tL = false;
		x = -20;
		y = 20;
	}
	else{
		bR = false;
		bL = false;
		tR = true;
		tL = false;
		x = -20;
		y = -20;
	}

	fill(255);
	rect(0,(height/2)-50,20,60);

	ps.run();
	noStroke();
  	fill(255);
  	push();
  	translate(mouseX, mouseY);
  	var r = height * 0.1;

  	if (mouseX != premouseX && mouseY != prevmouseY){

  		for(var i=0;i<numCircles;i++){

    			fill(255);
			  	ellipse(x, y, 6, 6);
			  	if(bR){
			  		x+= 5; 
			  		y+= 5;
			  	}
			  	else if(bL){ 
			  		x-= 5; 
			  		y+= 5;
			  	}
			  	else if(tR){
			  		x-= 5; 
			  		y-= 5;
			  	}
			  	else{
			  		x+= 5; 
			  		y-= 5;
			  	}
		}
		
		
  	}
  	else{
  		
	  	for(var i=0;i<numCircles;i++){
		  	var x = r * cos(theta);
		  	var y = r * sin(theta);
		  	ellipse(x, y, 5, 5);
		  	theta += theta_vel;
		}
	}
	if (mode==2){
		if(bR){
			text(numCircles, -12,-12);
		}
		if(bL){
			text(numCircles, 12,-12);
		}
		if(tR){
			text(numCircles, 12,12);
		}
		if(tL){
			text(numCircles, -12,12);
		}
		pop();

	}


	if(mouseX > 0 && mouseX < 20 && mouseY > 130 && mouseY < 190){
		console.log("In box");
		numCircles = 0;
    	ps.move();
	}
	else{
		ps.stopMove();
	}



	if (frameCount % 60 == 0){
		premouseX = mouseX;
		prevmouseY = mouseY;
	}
}




function keyPressed(){
	if (key == 1){
		mode = 1;
	}
	else if (key == 2){
		mode = 2;
	}
}



