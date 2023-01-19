/**
PONG in p5js
Author Name: Jaden Thompson

Creating a 2 player PONG game using p5js
*/

"use strict";

//Assigning variables for my ball and paddle classes 
//Player score initialized at 0
let ball;
let player1;
let player2;
let player1Score = 0;
let player2Score = 0;

//Creating the canvas, ball, and paddles with parameters 
function setup() {
    createCanvas(600, 400);
    ball = new Ball();
    player1 = new Paddle(5, height/2, 1);
    player2 = new Paddle(575, height/2, 2);
}

function draw() {
    background(0);
    noStroke();
    player1.update(); //Updating player 1's movement 
    player1.show(); //Displaying player 1 on screen
    player2.update(); //Updating player 2's movement
    player2.show(); //Displaying player 2 on screen
  
    ball.update(); //Updating the ball's position on screen
    ball.show(); //Displaying the ball on screen
    ball.checkPaddle(player1); //Checking the position of the ball to player 1 and providing an interaction 
    ball.checkPaddle(player2); //Checking the position of the ball to player 2 and providing an interaction
  
    if (ball.x < 0) { //If statement to check whether the ball has past the left side of the screen
        player2Score++; //Awarding a point to player 2
        ball.reset(); //Resetting the ball back to the middle after a point is awarded 
        player1.reset(); //Resetting player 1 back to it's original position
        player2.reset(); //Resetting player 2 back to it's original position
    } else if (ball.x > width) { //See above comments, player 1 
        player1Score++;
        ball.reset();
        player1.reset();
        player2.reset();
    }
  
    textSize(32); //Text to display score
    text(player1Score, width/2 - 50, 50); //Player 1 score
    text(player2Score, width/2 + 50, 50); //Player 2 score
  
    if (player1Score === 10) { //Win condition for player 1
        textSize(64);
        text("Player 1 wins!", width/2 - 200, height/2);
        noLoop(); //Ending the game after player 1 wins
    } else if (player2Score === 10) { //Win condition for player 2
        textSize(64);
        text("Player 2 wins!", width/2 - 200, height/2);
        noLoop(); //Ending the game after player 2 wins
    }
}

//<<Paddle Class>>
//
//Variables: x, y, id, width, height, speed;
class Paddle {
    constructor(x, y, player) {
      this.x = x;
      this.y = y;
      this.id = player;
      this.width = 20;
      this.height = 100;
      this.speed = 10;
    }
  
    update() { //Update function
        if (this.id == 1) { //Checking the id of the player 
            if (keyIsDown(87)) { //Conditional for 'W'
                this.y -= this.speed; //Updating the y based on the speed 
            } 
                
            else if (keyIsDown(83)) { //Conditional for 'S'
                this.y += this.speed; //Updating the y based on the speed 
            }
        }
    
        else if (this.id == 2) { //Checking the id of the player 
            if (keyIsDown(38)) { //Conditional for 'ARROW_UP'
                this.y -= this.speed; //Updating the y based on the speed 
            } 
                
            else if (keyIsDown(40)) { //Conditional for 'ARROW_DOWN'
                this.y += this.speed; //Updating the y based on the speed 
            }
        }
        this.y = constrain(this.y, 0, height - 100); //Constraining the paddles to stay on the screen
    }
  
    show() { //Displaying the paddles 
      fill(255); //Filled with white
      rect(this.x, this.y, this.width, this.height); //Creating the paddles based on the given parameters 
    }

    reset() { //Resetting the paddle back to the center of the screen
        this.y = height/2;
    }
  }

//<<Ball Class>>
//
//Variables: x, y, size, xSpeed, ySpeed;
class Ball {
    constructor() {
      this.x = width/2;
      this.y = height/2;
      this.size = 20;
      this.xSpeed = 5;
      this.ySpeed = 5;
    }
  
    update() { //Updating the ball's movement based on the speed
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      
      if (this.y < 0 || this.y > height) { //Reversing the speed of the ball if it collides with the borders
        this.ySpeed *= -1;
      }
    }
  
    show() { //Displaying the ball
      fill(255); //Filled with white
      ellipse(this.x, this.y, this.size, this.size); //Creating the ball with the position and size
    }

    //Checking the distance between the ball and the paddle then reversing the speed
    //Note: this detection is not the best and has some flaws, this was also present in my final project in 253
    checkPaddle(paddle) { 
      if (this.x - this.size/2 < paddle.x + paddle.width/2 &&
          this.x + this.size/2 > paddle.x - paddle.width/2 &&
          this.y - this.size/2 < paddle.y + paddle.height/2 &&
          this.y + this.size/2 > paddle.y - paddle.height/2) {
        this.xSpeed *= -1;
      }
    }

    reset() { //Resetting the ball back to the center of the screen
        this.x = width/2;
        this.y = height/2;
    }
}