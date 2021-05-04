// Gets canvas ready
canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = 512;
canvas.height = 512;
canvas.id = "canvas";
ctx = canvas.getContext("2d");

var gameState = "start";

// Defines common functions
function collide(r1, r2) {
  if (r1.x + r1.w > r2.x &&
    r1.x < r2.x + r2.w &&
    r2.y + r2.h > r1.y &&
    r2.y < r1.y + r1.h) {
    return(true);
  } else {
    return(false);
  }
};
function randInt(min, max) {
  return(Math.round(Math.random() * (max - min) + min));
}

// Background
bgImg = new Image();
bgImg.src = "img/bg/black.png";
pauseOverlay = new Image();
pauseOverlay.src = "img/bg/pause_screen.png";

//  Defines sprites
var food = {
  img: new Image(),
  w: 32,
  h: 32
}
food.img.src = "img/food/apple.png";
var snake = {
  speed: 100,
  segs: [
    {}
  ],
  w: 32,
  h: 32
}
snakePrevPos = [
  {}
]

// Renders canvas
function render() {
  // Draws images
  ctx.drawImage(bgImg, 0, 0);
  ctx.drawImage(food.img, food.x, food.y);
  ctx.drawImage(snake.segs[0].img, snake.segs[0].x, snake.segs[0].y);
  for (i = 1; i < snake.segs.length; i++) {
    ctx.drawImage(snake.segs[i].img, snake.segs[i].x, snake.segs[i].y);
  }
  if (gameState != "play") {
    // Darkens screen when not playing
    ctx.drawImage(pauseOverlay, 0, 0);
  }
  // Draws text for different game states
  if (gameState != "start" && gameState != "death") {
    ctx.fillStyle = "rgba(250, 250, 250)";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.font = "32px Cubic";
    ctx.fillText(score, 10, 25);
    if (gameState == "pause") {
      ctx.fillStyle = "rgba(250, 250, 250)";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.font = "32px Cubic";
      ctx.fillText("Game Paused", canvas.width / 2, canvas.height / 3);
    }
  } else if (gameState == "start") {
    ctx.fillStyle = "rgba(250, 250, 250)";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "48px Cubic";
    ctx.fillText("Snake", canvas.width / 2, canvas.height / 4);
    ctx.fillStyle = "rgba(220, 220, 220)";
    ctx.font = "24px Cubic";
    ctx.fillText("Press SPACE to start", canvas.width / 2, canvas.height / 1.4);
  } else if (gameState == "death") {
    ctx.fillStyle = "rgba(250, 250, 250)";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "48px Cubic";
    ctx.fillText("You DIED", canvas.width / 2, canvas.height / 4);
    ctx.font = "16px Cubic";
    ctx.fillText("Score: " + prevScore, canvas.width / 2, canvas.height / 2.6);
    ctx.fillText("High Score: " + parseInt(localStorage.getItem("snake.hScore")), canvas.width / 2, canvas.height / 2.2);
    ctx.fillStyle = "rgba(220, 220, 220)";
    ctx.font = "24px Cubic";
    ctx.fillText("Press SPACE to play again", canvas.width / 2, canvas.height / 1.4);
  }
}
var score = 0;
var prevScore
// Resets canvas and sprites
function reset() {
  dir = null;
  clearInterval(move);
  prevScore = score;
  // Changes highscore to 0 if it is null
  if (localStorage.getItem("snake.hScore") == null) {
    localStorage.setItem("snake.hScore", 0);
  }
  // Changes highscore to score if it is higher
  if (score > parseInt(localStorage.getItem("snake.hScore"))) {
    localStorage.setItem("snake.hScore", score);
  }
  score = 0;
  // Resets snake
  snake.segs = [{}];
  snake.segs[0].x = canvas.width / 2;
  snake.segs[0].y = canvas.height / 2;
  snake.segs[0].w = 32;
  snake.segs[0].h = 32;
  snake.segs[0].img = new Image();
  snake.segs[0].img.src = "img/snake/head.png";
  snakePrevPos.push({
    x: snake.segs[0].x,
    y: snake.segs[0].y
  })
  food_spawn();
}
// Runs everything
function main() {
  // Fancy stuff
  var now = Date.now();
  var delta = now - then;
  render();
  update(delta / 1000);
  then = now;
  requestAnimationFrame(main);
}
// Checks for collisions ect
function update(modifier) {
  if (collide(snake.segs[0], food)) {
    food_eat();
  }
  if (! collide(snake.segs[0], {
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height 
  })) {
    death();
  }
  if (gameState == "play") {
    for (i = 0; i < snake.segs.length; i++) {
      for (i2 = 0; i2 < snake.segs.length; i2++) {
        if (i != i2) {
          if (collide(snake.segs[i], snake.segs[i2])) {
            death();
          }
        }
      }
    }
  } else {
    clearInterval(move);
  }
}
// Checks for change in direction
dir = null;
var move;
var changeDirVal = true;
addEventListener("keydown", function (e) {
  if (changeDirVal == true) {
    if (gameState == "play") {
      // Changes direction if wasd or arrow keys are pressed
      if ([87, 38].includes(e.keyCode)) {
        dir = "-y";
      } else 
      if ([83, 40].includes(e.keyCode)) {
        dir = "+y";
      } else 
      if ([65, 37].includes(e.keyCode)) {
        dir = "-x";
      } else 
      if ([68, 39].includes(e.keyCode)) {
        dir = "+x";
      }
      changeDirVal = false;
      snake_move();
    }
  }
})
addEventListener("keyup", function (e) {
  changeDirVal = true;
})
var keysDown = {};
addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
  // Checks for pause/play
  if (e.keyCode == 27) {
    if (gameState == "play") {
      gameState = "pause";
    } else if (gameState == "pause") {
      gameState = "play";
      // Continues moving
      snake_move();
    }
    // Checks for start of play
  } else if (e.keyCode == 32) {
    if (gameState == "death" || gameState == "start") {
      gameState = "play";
    }
  }
})
addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
})

// Mouse control
function getMousePos(evt) {
  // Gets mouse position
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
addEventListener("mousemove", function (evt) {
  var mousePos = getMousePos(evt);
  // If mouse is on canvas
  if (mousePos.x > 0 &&
    mousePos.x < canvas.width && 
    mousePos.x > 0 &&
    mousePos.x < canvas.width ) {
    // Get triangular quadrant mouse is on
    if (gameState == "play") {
      if (mousePos.x > mousePos.y &&
        mousePos.y < canvas.height / 2 && 
        mousePos.y < canvas.width - mousePos.x) {
        dir = "-y";
      } else if (mousePos.y > mousePos.x && 
        mousePos.x < canvas.width / 2 &&
        mousePos.x < canvas.width - mousePos.y) {
        dir = "-x";
      } else if (mousePos.y < mousePos.x &&
        mousePos.x > canvas.width / 2 &&
        mousePos.x > canvas.width - mousePos.y) {
        dir = "+x";
      } else if (mousePos.x < mousePos.y &&
        mousePos.y > canvas.height / 2 &&
        mousePos.y > canvas.width - mousePos.x) {
        dir = "+y";
      }
      snake_move();
    }
  }
}, false);
addEventListener("mousedown", function (e) {
  // Checks for start of play
  if (e.button == 0) {
    if (gameState == "death" || gameState == "start") {
      gameState = "play";
    }
  }
})

// Moves the snake in direction
function snake_move() {
  clearInterval(move);
  if (gameState == "play") {
    if (dir == "-y") {
      move = setInterval(() => {
        snake_follow();
        snake.segs[0].y -= snake.h;
      }, snake.speed);
    } else if (dir == "+y") {
      move = setInterval(() => {
        snake_follow();
        snake.segs[0].y += snake.h;
      }, snake.speed);
    } else if (dir == "-x") {
      move = setInterval(() => {
        snake_follow();
        snake.segs[0].x -= snake.w;
      }, snake.speed);
    } else if (dir == "+x") {
      move = setInterval(() => {
        snake_follow();
        snake.segs[0].x += snake.w;
      }, snake.speed);
    }
  }
}
// Moves other segments of snake
function snake_follow() {
  if (dir != null) {
    for (i = snake.segs.length - 1; i > 0; i--) {
      snake.segs[i].x = snake.segs[i - 1].x;
      snake.segs[i].y = snake.segs[i - 1].y;
    }
  }
}

// Increases score and resets food
function food_eat() {
  score++;
  snakeX = 0;
  snakeY = 0;
  if (dir == "-y") {
    snakeY = snake.h;
  } else if (dir == "+y") {
    snakeY = 0 - snake.h;
  } else if (dir == "-x") {
    snakeX = snake.w;
  } else if (dir == "+x") {
    snakeX = 0 - snake.w;
  } else {
    snakeY = snake.h
  }
  // Adds segment to snake
  snake.segs.push({
    img: new Image(),
    x: snake.segs[snake.segs.length - 1].x + snakeX,
    y: snake.segs[snake.segs.length - 1].y + snakeY,
    w: 32,
    h: 32
  })
  snake.segs[snake.segs.length - 1].img.src = "img/snake/segment.png";
  food_spawn();
}
// Checks if random spawn position is valid then spawns
function food_spawn() {
  var val = false;
  while (val == false) {
    val = true;
    foodX = ((randInt(1, (canvas.width / food.w))) * food.w);
    foodY = ((randInt(1, (canvas.height / food.h))) * food.w);
    // Checks if food is not touching snake
    for (i = 0; i < snake.segs.length; i++) {
      if (collide(snake.segs[i], {
        x: foodX,
        y: foodY,
        w: food.w,
        h: food.h
      })) {
        val = false;
      }
    }
    // Checks if food is inside canvas
    if (! collide({
      x: foodX,
      y: foodY,
      w: food.w,
      h: food.h
    }, {
      x: 0,
      y: 0,
      w: canvas.width,
      h: canvas.height
    })) {
      val = false;
    }
  }
  // Spawns food
  food.x = foodX;
  food.y = foodY;
}

// Death
function death() {
  gameState = "death";
  reset();
}

// More fancy stuff
var then = Date.now();
reset();
main();