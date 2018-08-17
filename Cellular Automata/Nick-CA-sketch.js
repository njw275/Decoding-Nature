var gol;
var seconds;
var w = 16;
var col;
var row;
var once = true;
var playing = true;
var mode = "check";
var countDownDate;
var timeToCreateBombs = 25;

function setup() {

 countDownDate = new Date().getTime();
  createCanvas(640, 360);
  col = floor(width/16);
  row = floor(height/16);
  gol = new GOL(w,col,row);
  gol2 = new GOL(w,col,row);
  seconds = 0;
}

function draw() {
  background(255);
  if (seconds < timeToCreateBombs){
  	gol.generate();
  	gol.display();
  }
  else{
  	if(once){
  		gol.countNeighbors();
	  	gol2.hideGenerate();
		once = false;
	}
	if(playing){
 	 	gol2.display();
 	 	var x = setInterval(function() {
 	 		if(playing){

				  // Get todays date and time
				  var now = new Date().getTime();

				  // Find the distance between now an the count down date
				  var distance = now - countDownDate;

				  // Time calculations for days, hours, minutes and seconds
				  var realSeconds = Math.floor((distance % (1000 * 60)) / 1000) ;



			 	 // If the count 	down is finished, write some text 

			  		document.getElementById("timer").innerHTML = realSeconds;
			  		savedTime = realSeconds;
	  		}
	  	}, 1000);
	  	playing = gol2.checkGameOver();
	  	
  	}
  	else{
  		document.getElementById("timer").innerHTML = "Final Time: " + savedTime;
  		if(gol2.won){
  			document.getElementById("timer").innerHTML += " | You Win!";
  		}
  		gol.showRed();
  		// gol2.display();
  	}
  }
  
  seconds++;
  console.log("mode: " + mode)
}

function keyPressed(){
	if (key == 'F' || key == 'f'){
		mode = "flag";
	}
	else{
		mode = "check";
	}
}

// reset board when mouse is pressed
function mousePressed() {
	if (mode == "check"){
		print("X: " + mouseX + " y: " + mouseY);

	  if(gol.board[floor(mouseX/w)][floor(mouseY/w)].state == 1){
	  	gol2.board[floor(mouseX/w)][floor(mouseY/w)].state = 2;
	  	playing = false;
	  }
	  else{
	  	gol2.board[floor(mouseX/w)][floor(mouseY/w)].state = 3;
	  }
	}
	else{
		print("X: " + mouseX + " y: " + mouseY);


	  if(gol.board[floor(mouseX/w)][floor(mouseY/w)].state == 1){
	  	gol2.board[floor(mouseX/w)][floor(mouseY/w)].state = 4;
	  }
	  else{
	  	gol2.board[floor(mouseX/w)][floor(mouseY/w)].state = 4;
	  }
	}


}




