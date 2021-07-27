var cv = [];
var ct = [];
let cvs = ["main"];
for (i = 0; i < cvs.length; i++) {
  cv[cvs[i]] = doc.create("canvas");
  cv[cvs[i]].id = "cv-" + cvs[i];
  cv[cvs[i]].initialize();
  cv[cvs[i]].w = data.canvas.h * data.canvas.ratio;
  cv[cvs[i]].h = data.canvas.h;
  cv[cvs[i]].setAttribute("oncontextmenu", "return(false);");
  doc.body.appendChild(cv[cvs[i]]);
  ct[cvs[i]] = cv[cvs[i]].getContext("2d");
  ct[cvs[i]].imageSmoothingEnabled = false;
}
ctx = ct.main;
canvas = cv.main;

var gameState = "start";
var global = {};
var balls = [];
global.start = Date.now();

class Ball {
  constructor(x, y, color, big) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.big = big;
  }
  draw() {
    let hsv = F.hex_hsv(data.balls.colors[this.color]);
    hsv.h += Date.now() / 500;
    ctx.fillStyle = F.hsv_hex(hsv);
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      data.balls.r,
      data.balls.r,
      0, 0, 2 * Math.PI
    );
    ctx.fill();

    if (!this.big) {
      ctx.fillStyle = data.colors.ball_inner;
      ctx.beginPath();
      ctx.ellipse(
        this.x,
        this.y,
        data.balls.r_inner * data.balls.r,
        data.balls.r_inner * data.balls.r,
        0, 0, 2 * Math.PI
      );
      ctx.fill();
    }
  }
}

function reset() {
  balls = [];
  for (i = 0; i < data.balls.amount * 2; i++) {
    balls.push(new Ball(
      F.randomFloat(data.balls.r, cv.main.w - data.balls.r),
      F.randomFloat(data.balls.r, cv.main.h - data.balls.r),
      i % data.balls.amount,
      i > data.balls.amount,
    ));
  }

  gameState = "play";
}

function render(mod) {
  hsv = F.hex_hsv(data.colors.table);
  hsv.h += (Date.now() - global.start) / 1000;
  ctx.fillCanvas(F.hsv_hex(hsv));

  for (i = 0; i < balls.length; i++) {
    balls[i].draw();
  }

  r = data.balls.r;
  for (i = 0; i < balls.length; i++) {
    angle = null;
    dist = 0;
    amount = 0;
    J: for (j = 0; j < balls.length; j++) {
      if (i === j) {
        continue;
      }
      if (
        balls[i].x - r <= balls[j].x + r
        && balls[i].x + r >= balls[j].x - r
        && balls[i].y - r <= balls[j].y + r
        && balls[i].y + r >= balls[j].y - r
      ) {
        x = balls[i].x - balls[j].x;
        y = balls[i].y - balls[j].y;
        // x = Math.abs(x);
        // y = Math.abs(y);
        dist = (
          x ** 2 +
          y ** 2
        ) ** 0.5;
        angle += Math.atan(x / y);
        if (x < y) {
          angle += Math.PI;
        }
        amount++;
        // break J;
      }
    }
    angle /= amount;
    dist = 70;
    if (dist < 10) {
      dist = 100;
      angle = i * (Math.PI * 2 / balls.length);
    }
    if (
      angle === null
      || !dist
      || !amount
    ) {
      angle = Date.now() / 2000 + i * (Math.PI * 2 / balls.length);
      dist = 30 + (i + balls.length / 2) * (70 / balls.length);
      // dist = r;
    }

    x = (r - dist) * Math.sin(angle);
    y = (r - dist) * Math.cos(angle);

    if (global.line) {
      hsv = F.hex_hsv(data.balls.colors[balls[i].color]);
      hsv.h += Date.now() / 500;
      hsv.s -= 30;
      hsv.v -= 30;
      ctx.strokeStyle = F.hsv_hex(hsv) + "80";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(
        balls[i].x,
        balls[i].y,
      );
      ctx.lineTo(
        balls[i].x + x,
        balls[i].y + y,
      );
      ctx.stroke();
    }

    if (amount && global.text) {
      ctx.fillStyle = balls[i].big ? "#FFF6" : "#0004";
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        amount,
        balls[i].x,
        balls[i].y,
      );
    }

    if (gameState == "play") {
      balls[i].x += x * mod * data.balls.speed;
      balls[i].y += y * mod * data.balls.speed;
    }
  }
}

function main() {
  update((Date.now() - then) / 1000);
  render((Date.now() - then) / 1000);
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  /* var keysDown = F.getKeyCodes(controls); */
  if (gameState == "play") {
    if (F.keyDown(82)) {
      if (global.once_restart) {
        global.once_restart = false;
        reset();
      }
    } else {
      global.once_restart = true;
    }

    for (i = 0; i < balls.length; i++) {
      balls[i].x = balls[i].x.setBorder(data.balls.r, cv.main.w - data.balls.r);
      balls[i].y = balls[i].y.setBorder(data.balls.r, cv.main.h - data.balls.r);
    }

    if (F.keyDown(77)) {
      if (global.once_line) {
        global.once_line = false;
        global.line = !global.line;
      }
    } else {
      global.once_line = true;
    }

    if (!data.balls.speed) {
      data.balls.speed = data.balls.def_speed;
    }

    if (F.keyDown(78)) {
      if (global.once_text) {
        global.once_text = false;
        global.text = !global.text;
      }
    } else {
      global.once_text = true;
    }

    if (F.keyDown(66)) {
      data.balls.speed += 10 * mod;
    } else {
      data.balls.speed -= 20 * mod;
    }

    data.balls.speed = data.balls.speed.setBorder(data.balls.def_speed, 20);
  }

  if (F.keyDown(86)) {
    if (global.once_pause) {
      global.once_pause = false;
      gameState = (gameState == "pause" ? "play" : "pause");
    }
  } else {
    global.once_pause = true;
  }
}

var then = Date.now();
reset();
main();