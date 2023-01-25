/*
Particles With Personality - "Needs a bit of help to get going"
Author Name: Jaden Thompson
*/

"use strict";
let system;

/*
Description of setup
*/
function setup() {
    createCanvas(500, 500);
    system = new ParticleSystem(createVector(width / 2, 50));
}

/*
Description of draw()
*/
function draw() {
    background(51);
    system.addParticle();
    system.run();
}

class Particle {
    constructor(position) {
        this.acceleration = createVector(0, 0.1);
        this.velocity = createVector(random(-1, 1), random(-1, 0));
        this.position = position.copy();
        this.lifespan = 255;
        this.state = 0;
    }

    run() {
        this.update();
        this.display();  
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2;
    }

    display() {
        stroke(200, this.lifespan);
        fill(127, this.lifespan);
        ellipse(this.position.x, this.position.y, 12, 12);
    }  

    isDead() {
        return this.lifespan < 0;
    }
}

class ParticleSystem {
    constructor(position) {
        this.origin = position.copy();
        this.particles = [];
    }
    
    addParticle() {
        this.particles.push(new Particle(this.origin));
    }

    run() {
        for (let i = this.particles.length-1; i >= 0; i--) {
            let p = this.particles[i];
            p.run();
            if (p.isDead()) {
              this.particles.splice(i, 1);
            }
        }
    }
}