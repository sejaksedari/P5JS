// [2.6 Mutual Attraction thenatureofcode.js]

class Mover {
  constructor(x, y, vx, vy, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0);
    this.mass = m;
    // let's assume the radius of every mover is proportional to the sqr of its mass * 2
    this.r = sqrt(this.mass) * 2;
  }
  
  applyForce(force) {
    // a = f / m, then assign the value to this.acc that has 0,0 vector value previously
    let a = p5.Vector.div(force, this.mass);
    this.acc.add(a);
  }
  
  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    // mapped distanceSq value 
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let G = 0.2;
    // gravitational force formula
    let strength = (G * (this.mass * mover.mass)) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }
  
  update() {
    // update position using acceleration value and reset it every single frame to have constant a
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0,0);
  }
  
  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 10);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
  
  // bounce() {
  //   if (this.pos.x > width - this.r || this.pos.x < 0 + this.r) {
  //     this.vel.x = -1 * this.vel.x;
  //   }
  //   if (this.pos.y > (height - this.r) || this.pos.y < 0 + this.r ) {
  //     this.vel.y = -1 * this.vel.y;
  //   }
  // }
  
}