//Name: Djama Kayad, Hamze
//File: main-finished.js
//Date: 04 April 2025
//This file is about creating a website for bouncing balls.

// set up canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// set canvas width and height to window dimensions
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// get the paragraph element to display ball count
const ballCount = document.querySelector("p");
let count = 25;

// function to generate random number between min and max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color string
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Base Shape class for common properties
class Shape {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball class extends Shape with additional properties and methods
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size , exists) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  // draw the ball on the canvas
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // update ball position and reverse velocity on canvas edge collision
  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // check for collision with other balls and change color on collision
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle class extends Shape to create a player-controlled object
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);   
    this.color = "white";
    this.size = 10;

    // set up keydown controls for movement
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });
  }

  // draw EvilCircle as a stroked circle
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.lineWidth = 3;
  }

  // keep EvilCircle within the canvas bounds
  checkBounds() {
    if (this.x + this.size >= width) {
      this.x = width - this.size; 
    }

    if (this.x - this.size <= 0) {
      this.x = this.size; 
    }

    if (this.y + this.size >= height) {
      this.y = height - this.size; 
    }

    if (this.y - this.size <= 0) {
      this.y = this.size; 
    }
  }

  // check collision with balls and remove them
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          count--;
          updateBallCount();
        }
      }
    }
  }
}

// array to hold all the balls
const balls = [];

// create 25 balls with random properties
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

// update the displayed ball count
function updateBallCount() {
  ballCount.textContent = `Balls count: ${count}`;
}

// create a new EvilCircle at a random position
const evilCircle = new EvilCircle(random(0 + 12, width - 12), random(0 + 12, height - 12));

// main loop to update the canvas on each frame
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

// start the animation loop
loop();
