/**
PONG in p5js
Author Name: Jaden Thompson

Creating a 2 player PONG game using p5js
*/

"use strict";

let ball;
let player1;
let player2;
let player1Score = 0;
let player2Score = 0;

function setup() {
    createCanvas(600, 400);
    ball = new Ball();
    player1 = new Paddle(5, height/2, 1);
    player2 = new Paddle(575, height/2, 2);
}

function draw() {
    background(0);
  
    player1.update();
    player1.show();
    player2.update();
    player2.show();
  
    ball.update();
    ball.show();
    ball.checkPaddle(player1);
    ball.checkPaddle(player2);
  
    if (ball.x < 0) {
        player2Score++;
        ball.reset();
        player1.reset();
        player2.reset();
    } else if (ball.x > width) {
        player1Score++;
        ball.reset();
        player1.reset();
        player2.reset();
    }
  
    textSize(32);
    text(player1Score, width/2 - 50, 50);
    text(player2Score, width/2 + 50, 50);
  
    if (player1Score === 10) {
        textSize(64);
        text("Player 1 wins!", width/2 - 200, height/2);
        noLoop();
    } else if (player2Score === 10) {
        textSize(64);
        text("Player 2 wins!", width/2 - 200, height/2);
        noLoop();
    }
}

class Paddle {
    constructor(x, y, player) {
      this.x = x;
      this.y = y;
      this.id = player;
      this.width = 20;
      this.height = 100;
      this.speed = 10;
    }
  
    update() {
        if (this.id == 1) {
            if (keyIsDown(87)) {
                this.y -= this.speed;
            } 
                
            else if (keyIsDown(83)) {
                this.y += this.speed;
            }
        }
    
        else if (this.id == 2) {
            if (keyIsDown(38)) {
                this.y -= this.speed;
            } 
                
            else if (keyIsDown(40)) {
                this.y += this.speed;
            }
        }
        this.y = constrain(this.y, 0, height - 100);
    }
  
    show() {
      fill(255);
      rect(this.x, this.y, this.width, this.height);
    }

    reset() {
        this.y = height/2;
    }
  }

class Ball {
    constructor() {
      this.x = width/2;
      this.y = height/2;
      this.size = 20;
      this.xSpeed = 5;
      this.ySpeed = 5;
    }
  
    update() {
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      
      if (this.y < 0 || this.y > height) {
        this.ySpeed *= -1;
      }
    }
  
    show() {
      fill(255);
      ellipse(this.x, this.y, this.size, this.size);
    }
  
    checkPaddle(paddle) {
      if (this.x - this.size/2 < paddle.x + paddle.width/2 &&
          this.x + this.size/2 > paddle.x - paddle.width/2 &&
          this.y - this.size/2 < paddle.y + paddle.height/2 &&
          this.y + this.size/2 > paddle.y - paddle.height/2) {
        this.xSpeed *= -1;
      }
    }

    reset() {
        this.x = width/2;
        this.y = height/2;
    }
}