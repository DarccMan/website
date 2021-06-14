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
  doc.id("wrap").appendChild(cv[cvs[i]]);
  ct[cvs[i]] = cv[cvs[i]].getContext("2d");
  ct[cvs[i]].imageSmoothingEnabled = false;
}
doc.id("wrap").style.width = data.canvas.h * data.canvas.ratio + "px";
doc.id("wrap").style.height = data.canvas.h + "px";
ctx = ct.main;
canvas = cv.main;

var gameState = "start";
var global = {};
var balls = [];

class Ball {
  constructor(x, y, color, big) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.big = big;
  }
  draw() {
    ctx.fillStyle = data.balls.colors[this.color];
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
        data.balls.r_inner,
        data.balls.r_inner,
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
  ctx.fillCanvas(data.colors.table);

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
        break J;
      }
    }
    angle /= amount;
    dist = 70;
    if (dist < 10) {
      dist = 100;
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

    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
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
    balls[i].x += x * mod;
    balls[i].y += y * mod;
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
  }
}

var then = Date.now();
reset();
main();