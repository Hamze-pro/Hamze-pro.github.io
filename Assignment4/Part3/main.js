//Name: Djama Kayad, Hamze
//File: main.js
//Date: 04 April 2025
//This file is about creating a website for bouncing balls.


// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Ball class to define properties and behaviors of each ball
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

// Draw the ball on the canvas
draw() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}


// Update ball position and bounce off edges
update() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX); // Reverse X velocity if hitting right edge
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX); // Reverse X velocity if hitting left edge
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY); // Reverse Y velocity if hitting bottom edge
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY); // Reverse Y velocity if hitting top edge
  }

  this.x += this.velX; // Move ball in X direction
  this.y += this.velY; // Move ball in Y direction
}

// Check for collision with other balls and change color on collision
collisionDetect() {
  for (const ball of balls) {
    if (this !== ball) {
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + ball.size) {
	// Change colors of both balls if they collide
        ball.color = this.color = randomRGB();
      }
    }
  }
}


}

// Create a test ball and draw it
const testBall = new Ball(50, 100, 4, 4, "blue", 10);

// Array to store multiple ball objects
testBall.draw();

const balls = [];

// Create 25 random balls with properties
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // Ensure balls are drawn away from canvas edges
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

// Animation loop function
function loop() {
  // Fill canvas with semi-transparent black for motion trail effect
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  // Update, draw, and check collisions for all balls
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

// Start the animation
loop();



