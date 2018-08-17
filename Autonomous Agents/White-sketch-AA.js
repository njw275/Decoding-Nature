
var debug = false;

// A path object (series of connected points)
var path;

// Two vehicles
var car1;
var car2;
var numSpots = 5;
var img;

function setup() {

  createCanvas(640, 360);
  newPath();
  img2 = loadImage("car2.png");
  img3 = loadImage("car3.png");
  img4 = loadImage("redcar.png");
  img5 = loadImage("ocar.png");
  img6 = loadImage("car6.png");

  car2 = new Vehicle(50, height, 2, 0.1);
}

function draw() {
  background(0);
  // Display the path
  noStroke();
  imageMode(CENTER);
  //path.display();
  for(var i=0;i<180;i+=30){
    if(i!=90){
      image(img3,145,115+i,35,20);
    }
  }
  for(var i=0;i<180;i+=30){
    if(i!=60){
      image(img3,345,115+i,35,20);
    }
  }

  for(var i=0;i<180;i+=30){
    if (i!=60){
      image(img3,600,115+i,35,20);
    }
  }
  image(img5,395,145,35,20);
  image(img5,210,205,35,20);
  image(img4,345,175,40,35);
  image(img4,145,115+90,40,35);
  image(img4,600,175,40,35);
  image(img4,395,115,40,35);
  image(img4,210,145,40,35);
  image(img4,400,235,40,35);
  image(img4,210,265,40,35);





  rectMode(CORNER);
  fill(0);
  rect(35,height/4,50,500);

  rectMode(CORNER);
  fill(0);
  rect(35,(height/4)-40,500,50);

  rectMode(CORNER);
  fill(0);
  rect(490,(height/4)-40,50,500);
    createSpots();

  if(!car2.doneFollowing){
 
    car2.follow(path);

    car2.run();
    
    car2.borders(path);
  }
  else{

    car2.maxspeed = 2;
    car2.maxforce = 0.03;

    if(400 < car2.position.x && car2.position.x < 401 && 263< car2.position.y && car2.position.y < 264){
      car2.img = img6;
      car2.arrive(car2.position);
     
    }
    else{
      car2.arrive(car2.parkingSpot);
    }
    car2.update();
    car2.display();
  }
  console.log("car x " + car2.position.x + " car y " + car2.position.y);

  
  
}

function newPath() {
  // A path is a series of connected points
  // A more sophisticated path might be a curve
  path = new Path();
  path.addPoint(50,height);
  path.addPoint(60,height/4);
  path.addPoint(50, height/4);
  path.addPoint(490,height/4);
  // path.addPoint(550, height/4);
  path.addPoint(505,height/3);
  // path.addPoint(500, height);
}

function keyPressed(){}

function mousePressed() {
  newPath();
}

function createSpots(){
    fill(255);
    stroke(255);
    line(310,250,430,250);
    line(310,280,430,280);
    for(var i=0;i<150;i+=30){
      line(310,220-i,430,220-i);
    }
    line(370,100,370,280);

    line(120,250,240,250);
    line(120,280,240,280);
    for(var i=0;i<150;i+=30){
      line(120,220-i,240,220-i);
    }
    line(180,100,180,280);
    

    line(575,250,width,250);
    line(575,280,width,280);
    for(var i=0;i<150;i+=30){
      line(575,220-i,width,220-i);
    }


  
}