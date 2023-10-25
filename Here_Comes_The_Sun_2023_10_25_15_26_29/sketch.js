// [2.6 Mutual Attraction thenatureofcode.js]

let movers = [];
let sun;

function setup() {
  createCanvas (400, 400);
  for (let i = 0; i < 50; i++) {
    let pos = p5.Vector.random2D();
    let vel = pos.copy();
    vel.setMag(random(3, 4));
    pos.setMag(random(100, 150));
    
    // rotate the velocity direction pi/2 rad or 90 degree (perpendicularly)
    // https://www.youtube.com/watch?v=GjbKsOkN1Oc&list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM&index=22&ab_channel=TheCodingTrain
    // Minute 15:28
    vel.rotate(PI / 2);
    
    let m = random(1,5);
    movers[i] = new Mover(pos.x + width/2 + 30, pos.y + height/2 + 30, vel.x, vel.y, m);
  }
  // sun = new Mover(width/2, height/2, 0, 0, 500);
  sun = new Mover(height/2 + 30, height/2 + 30, 0, 0, 400);
  // background(0);
}

function draw() {
  background (100, 0, 0, 50);
  // translate(width / 2, height / 2);
  
  fill(0, 50, 0, 100);
  rect(50, 50, 380);
  
  strokeWeight(0);
  fill(255);
  textSize(10);
  text('Tap Screen to Move the Sun', 50 , 16, 160, 80);
  
  // n-squared problem
  for (let mover of movers) {
    sun.attract(mover);
    for (let other of movers) {
      if (mover !== other) {
        mover.attract(other);
      }
    }
  }
  
  for (let mover of movers) {
    mover.update();
    // mover.bounce();
    mover.show();
  }
  
  if (mouseIsPressed) {
    sun.pos.x = mouseX;
    sun.pos.y = mouseY;
    fill(255, 255, 0);
    ellipse(mouseX,mouseY, 60);
    
    push();
  for (let diameter1 = 0; diameter1 <= 300; diameter1 += (380/8)) {
    linearGradient(
      0, 0, // Start point
      0, 400, // End point
      color(255, 0, 100, 2), // Start color
      color(255, 100, 50, 40) // End color
    );
    strokeWeight(0);
    ellipse(mouseX, mouseY, diameter1);
  }
  pop();
  }

  sun.show();
  
  //Outline
  push();
  shadow();
  noFill();
  stroke(255);
  strokeWeight(8);
  rect(0, 0, 400, 400);
  pop();
  
  //Title
  let text1 = 'Here Comes the Sun';
  strokeWeight(0);
  fill(255, 255, 255, 255);
  
  textSize(12);
  text(text1, 265, 15, 150, 80); // Text wraps within text box
  
  textSize(8);
  text("Beatles 1969", 330, 32, 70, 80); // Text wraps within text box
  
  // add credit
  push();
  let text2 = '@sejaksedari';
  // rotate(PI);
  strokeWeight(0);
  angleMode(DEGREES);
  rotate(90);
  textSize(8);
  fill(255, 255, 255, 255);
  text(text2, 15, -20, 100, 100); // Text wraps within text box
  pop();
}

function linearGradient(sX, sY, eX, eY, colorS, colorE){
  let gradient = drawingContext.createLinearGradient(
    sX, sY, eX, eY
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
  // drawingContext.strokeStyle = gradient;
}

function shadow(){
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = color(0, 100);
}

function keyPressed() {
  if (key == "R") {
    saveGif("HereComestheSun.gif", 5);
  }
}