var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

class Snake {
  constructor() {
    this.segs = [];

    this.dir = null;
    this.speed = data.snake.speed;

    this.add(
      (data.grid.x / 2).round(),
      (data.grid.y / 2).round(),
    );
  }
  add(x, y) {
    if (x == undefined) {
      x = this.segs[this.segs.length - 1].x;
    }
    if (y == undefined) {
      y = this.segs[this.segs.length - 1].y;
    }
    switch (this.dir) {
      case ("u"): {
        y++;
      }; break;
      case ("d"): {
        y--;
      }; break;
      case ("l"): {
        x--;
      }; break;
      case ("r"): {
        x++;
      }; break;
    }
    this.segs.push(new Snake.Segment(x, y));
  }
  start() {
    snake.move();
    this.stop();
    this.mover = setInterval(() => {
      this.move();
    }, this.speed);
  }
  stop() {
    clearInterval(this.mover);
  }
  move() {
    if (this.segs.length > 1) {
      this.segs.insert(1, this.segs[0]);
      this.segs = this.segs.s(0, -2);
    }
    switch (this.dir) {
      case ("u"): {
        this.segs[0].y -= 1;
      }; break;
      case ("d"): {
        this.segs[0].y += 1;
      }; break;
      case ("l"): {
        this.segs[0].x -= 1;
      }; break;
      case ("r"): {
        this.segs[0].x += 1;
      }; break;
    }
  }
  eat() {
    food = new Food();
    snake.add();
  }
  death() {
    reset();
  }
}
Snake.Segment = class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Food {
  constructor() {
    for (i = 0; i < 100; i++) {
      let val = true;
      var x = F.randomInt(0, data.grid.x - 1);
      var y = F.randomInt(0, data.grid.y - 1);
      if (
        snake.x == x
        && snake.y == y
      ) {
        val = false;
      }
      if (val) {
        break
      }
    }
    this.x = x;
    this.y = y;
  }
}

var gameState = "start";
var snake = null;
var food = null;

function reset() {
  snake = new Snake();
  food = new Food();

  gameState = "play";
}

function render() {
  ctx.fillCanvas(data.colors.grid_bg);

  ctx.strokeStyle = data.colors.grid_stroke;
  ctx.lineWidth = 3;
  for (x = 1; x < data.grid.x; x++) {
    ctx.beginPath();
    ctx.moveTo(
      x * (canvas.width / data.grid.x),
      0,
    );
    ctx.lineTo(
      x * (canvas.width / data.grid.x),
      canvas.height,
    );
    ctx.stroke();
  }
  for (y = 1; y < data.grid.y; y++) {
    ctx.beginPath();
    ctx.moveTo(
      0,
      y * (canvas.height / data.grid.y),
    );
    ctx.lineTo(
      canvas.width,
      y * (canvas.height / data.grid.y),
    );
    ctx.stroke();
  }

  ctx.fillStyle = data.colors.snake_fill;
  ctx.strokeStyle = data.colors.snake_stroke;
  ctx.lineWidth = 3;
  for (s = 0; s < snake.segs.length; s++) {
    ctx.fillRect(
      snake.segs[s].x * (canvas.width / data.grid.x),
      snake.segs[s].y * (canvas.width / data.grid.y),
      canvas.width / data.grid.x,
      canvas.height / data.grid.y,
    );
    ctx.strokeRect(
      snake.segs[s].x * (canvas.width / data.grid.x),
      snake.segs[s].y * (canvas.width / data.grid.y),
      canvas.width / data.grid.x,
      canvas.height / data.grid.y,
    );
  }

  ctx.fillStyle = data.colors.food_fill;
  ctx.strokeStyle = data.colors.food_stroke;
  ctx.fillRect(
    food.x * (canvas.width / data.grid.x),
    food.y * (canvas.width / data.grid.y),
    canvas.width / data.grid.x,
    canvas.height / data.grid.y,
  );
  ctx.strokeRect(
    food.x * (canvas.width / data.grid.x),
    food.y * (canvas.width / data.grid.y),
    canvas.width / data.grid.x,
    canvas.height / data.grid.y,
  );
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  if (gameState == "play") {
    dir = snake.dir;
    switch (F.bool_bin(keysDown.includes("player_up"), keysDown.includes("player_down"), keysDown.includes("player_left"), keysDown.includes("player_right"))) {
      case ("1000"): {
        snake.dir = "u";
      }; break;
      case ("0100"): {
        snake.dir = "d";
      }; break;
      case ("0010"): {
        snake.dir = "l";
      }; break;
      case ("0001"): {
        snake.dir = "r";
      }; break;
      default: {
        val = false;
      }
    }
    if (dir != snake.dir) {
      snake.start();
      snake.changeDirVal = false;
    }

    if (
      snake.segs[0].x == food.x
      && snake.segs[0].y == food.y
    ) {
      snake.eat();
    }

    if (
      snake.segs[0].x < 0
      || snake.segs[0].x >= data.grid.x
      || snake.segs[0].y < 0
      || snake.segs[0].y >= data.grid.y
    ) {
      snake.death();
    }

    return;
    for (s = 1; s < snake.segs.length; s++) {
      if (
        snake.segs[s].x == snake.segs[0].x
        && snake.segs[s].y == snake.segs[0].y
      ) {
        snake.death();
        break;
      }
    }
  }
}

// Remove once fnctjs updates
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

var then = Date.now();
reset();
main();
