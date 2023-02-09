/*
Particles With Personality - "Needs a bit of help to get going"
Author Name: Jaden Thompson
*/

"use strict";
let particleSystem;

/*
Description of setup()
Creating the canvas and initializing the particle system
*/
function setup() {
    createCanvas(windowWidth + 50, windowHeight + 50);
    particleSystem = new ParticleSystem();
}

/*
Description of draw()
Clearing the beginning of the draw (Makes the blendMode work properly)
Setting the background color 
Updating and displaying the particle system
*/
function draw() {
    clear();
    background(0);
    blendMode(ADD); //Gives the particles a slight blur without causing too much performance loss
    particleSystem.update();
    particleSystem.display();
}

function mousePressed() {
  //Creating 100 particles on the screen using a for loop
    for (let i = 0; i <= 100; i++) {
      particleSystem.addParticle();
    }
}

/*
Particle Class:
Variables: position, speed, life, color, and size
Move function: constantly giving the particles a slight jiggle and lowering the lifespan
Display function: Drawing the particles as an ellipse and slowing fading the alpha overtime
*/
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
      this.life -= 2;
    }
  
    display() {
      noStroke();
      fill(this.color[0], this.color[1], this.color[2], this.life);
      ellipse(this.x, this.y, this.size, this.size);
    }
  }

/*
Spark Class (Extension of the Particle Class):
Variables: super position takes the x, y from the original particle class, and thresh hold to determine the mouse position to the spark
*/
  
  class Spark extends Particle {
    constructor(x, y) {
      super(x, y);
      this.thresh = 50;
    }

    //Update function: pulling move() and display() from the parental class
    //Also calls it's own private function called check() to determine the mouse position
    update() {
      this.move();
      this.display();
      this.check();
    }

    //Check function: two conditionals using dist to check the distance between the particle and the mouse
    //If the mouse is within the thresh hold it lowers the green and blue values, increases the lifespan, and increases the size if it is under 150
    //If the mouse is outside the thresh hold it slowly raises the green and blue values and decreases the lifespan
    check() {
      if (dist(this.x, this.y, mouseX, mouseY) <= this.thresh) {
        this.color[1] = this.color[1] -= 5;
        this.color[2] = this.color[2] -= 5;
        this.life = this.life += 50;
        if (this.size <= 150) {
          this.size = this.size += 5;
        }
        if (this.speed <= 2) {
          this.speed = this.speed + 0.5;
        }
      } else if (dist(this.x, this.y, mouseX, mouseY) >= this.thresh) {
        this.color[1] = this.color[1] += 0.05;
        this.color[2] = this.color[2] += 0.05;
        if (this.size > 10 && this.size <= 150) {
          this.size = this.size -= 5;
        }
      }
    }
  }

/*
Particle System Class:
Variable: array to hold all the particles
Basically the thing that controls all of the particles
*/
  class ParticleSystem {
    constructor() {
      this.particles = [];
    }

    //Pushing a new spark particle 
    addParticle(x, y) {
      this.particles.push(new Spark(x, y));
    }
  
    //Looping through the particle array and updating each particle
    //If the life of the particle is less than or equal to 0 it removes it from the array
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

    //Looping through the array and displaying for each particle
    display() {
      for (let p of this.particles) {
        p.display();
      }
    }
  }