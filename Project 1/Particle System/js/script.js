/*
Particles With Personality - "Needs a bit of help to get going"
Author Name: Jaden Thompson
*/

"use strict";
let particleSystem;

/*
Description of setup
*/
function setup() {
    createCanvas(windowWidth + 50, windowHeight + 50);
    particleSystem = new ParticleSystem();
}

/*
Description of draw()
*/
function draw() {
    clear();
    background(0);
    blendMode(ADD);
    particleSystem.update();
    particleSystem.display();
}

function mousePressed() {
    for (let i = 0; i <= 100; i++) {
      particleSystem.addParticle();
    }
}

class Particle {
    constructor() {
      this.x = random(width)
      this.y = random(height);
      this.speed = random(1, 1.5);
      this.life = random(500, 1000);
      this.color = [255, 255, 100];
      this.size = 10;
    }
  
    move() {
      this.x += random(-this.speed, this.speed);
      this.y += random(-this.speed, this.speed);
      this.life -= 1;
    }
  
    display() {
      noStroke();
      fill(this.color[0], this.color[1], this.color[2], this.life);
      ellipse(this.x, this.y, this.size, this.size);
    }
  }
  
  class Spark extends Particle {
    constructor(x, y) {
      super(x, y);
      this.thresh = 50;
    }
  
    update() {
      this.move();
      this.display();
      this.check();
    }

    check() {
      if (dist(this.x, this.y, mouseX, mouseY) <= this.thresh) {
        this.color[1] = this.color[1] -= 5;
        this.color[2] = this.color[2] -= 5;
        this.life = this.life += 50;
        if (this.size <= 250) {
          this.size = this.size += 5;
        }
      } else if (dist(this.x, this.y, mouseX, mouseY) >= this.thresh) {
        this.color[1] = this.color[1] += 0.05;
        this.color[2] = this.color[2] += 0.05;
        if (this.size >= 250) {
          this.size = this.size -= 2;
        }
      }
    }
  }

  class ParticleSystem {
    constructor() {
      this.particles = [];
    }
  
    addParticle(x, y) {
      this.particles.push(new Spark(x, y));
    }
  
    update() {
      for (let i = 0; i < this.particles.length; i++) {
        let p = this.particles[i];
        p.update();
  
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          i--;
        } 
      }
    }
  
    display() {
      for (let p of this.particles) {
        p.display();
      }
    }
  }