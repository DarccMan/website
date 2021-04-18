var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var paddles;
var ball;
var gameState = "start";
var global = {};

function reset() {
  paddles = [];
  for (i = 0; i < 2; i++) {
    paddles.push({
      x: i ? canvas.width - data.paddle.w : 0,
      y: (canvas.height - data.paddle.h) / 2,
      w: data.paddle.w,
      h: data.paddle.h,
      v: 0,
    });
  }

  ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: data.ball.r,
    a: 3,
    v: data.ball.v,
  };

  gameState = "play";
}

function render() {
  ctx.fillCanvas();

  ctx.fillStyle = data.paddle.color;
  for (i = 0; i < paddles.length; i++) {
    ctx.fillRoundRect(
      paddles[i].x,
      paddles[i].y,
      paddles[i].w,
      paddles[i].h,
      data.paddle.r,
    );
  }

  ctx.fillStyle = data.ball.color;
  ctx.beginPath();
  ctx.ellipse(
    ball.x,
    ball.y,
    ball.r,
    ball.r,
    0, 0, 2 * Math.PI
  );
  ctx.fill();

  ctx.strokeStyle = "lime";
  ctx.beginPath();
  ctx.moveTo(
    ball.x,
    ball.y,
  );
  ctx.lineTo(
    ball.x + (ball.v * Math.sin((2 - ball.a) * Math.PI / 2)),
    ball.y + (ball.v * Math.cos((2 - ball.a) * Math.PI / 2)),
  );
  ctx.stroke();

  ctx.strokeStyle = "cyan";
  ctx.beginPath();
  for (i = 0; i < 1; i++) {
    lx = ball.x - (ball.y * Math.tan((2 + 4 - ball.a) * Math.PI / 2));
    ctx.moveTo(
      lx,
      0,
    );
    h = 100;
    // continue;
    ctx.lineTo(
      // h * Math.sin((2 + 4 - ball.a) * Math.PI / 2),
      // h * Math.cos((2 + 4 - ball.a) * Math.PI / 2),
      0,
      canvas.height,
    );
  }
  ctx.stroke();

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.ellipse(
    20,
    ball.y + (ball.v * Math.cos((2 - ball.a) * Math.PI / 2)),
    // ball.y + (Math.tan((2 - ball.a) * Math.PI / 2) / (ball.x)),
    10,
    10,
    0, 0, 2 * Math.PI
  );
  ctx.fill();
}

function main() {
  render();
  update((Date.now() - then) / 1000);
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  if (gameState == "play") {
    // ball.a = parseInt(doc.id("a").value) / 25;
    switch (F.bool_bin(keysDown.paddle_up, keysDown.paddle_down)) {
      case "01": {
        paddles[1].v += data.paddle.va * mod;
      }; break;
      case "10": {
        paddles[1].v -= data.paddle.va * mod;
      }; break;
      case "11": case "00": {
        paddles[1].v = Math.sign(paddles[1].v) * (Math.abs(paddles[1].v) - data.paddle.vd * mod);
        if (Math.abs(paddles[1].v) < 0.2) {
          paddles[1].v = 0;
        }
      }; break;
    }
    for (i = 0; i < 2; i++) {
      paddles[i].v = Math.max(- data.paddle.vt, Math.min(data.paddle.vt, paddles[i].v));
    }

    paddles[1].y += paddles[1].v;

    if (ball.a == 1) {
      // ball.a = 1.5;
    }

    cx = ball.v * Math.sin((2 - ball.a) * Math.PI / 2) * mod;
    cy = ball.v * Math.cos((2 - ball.a) * Math.PI / 2) * mod;

    ball.x += cx;
    ball.y += cy;

    ballHit = {
      x: ball.x - ball.r,
      y: ball.y - ball.r,
      w: ball.r * 2,
      h: ball.r * 2,
    };
    if (F.collide(paddles[1], ballHit)) {
      ball.a = 3 - getHeight(1);
      ball.x -= paddles[1].x - ball.x;
    }
    if (F.collide(paddles[0], ballHit)) {
      ball.a = 1;
    }

    if (global.bounceVal) {
      if (ball.y < 0) {
        // console.log(ball.a);
        // ball.a = 2 - ball.a;
        ball.a = 2 + 4 - ball.a;
        ball.y += ball.r;
        global.bounceVal = false;
      } else if (ball.y >= canvas.height) {
        ball.a = 2 - ball.a;
        ball.y -= ball.r;
        global.bounceVal = false;
      }
    } else {
      if (
        ball.x > canvas.height * 0.5
        && ball.x < canvas.height * 1.5
      ) {
        global.bounceVal = true;
      }
    }

    ball.a = Math.abs(ball.a % 4);

    if (ball.x < 0) {
      reset();
    } else if (ball.x >= canvas.width) {
      reset();
    }

    // paddles[0].y = ball.y - paddles[0].h / 2;
    if (ball.a > 2) {
      paddles[0].y = ball.y - (ball.v * Math.cos((2 - ball.a) * Math.PI / 2) * mod);
      paddles[0].y -= paddles[0].h / 2;
    }

    for (i = 0; i < 2; i++) {
      if (paddles[i].y < 0) {
        paddles[i].y = 0;
      } else if (paddles[i].y + paddles[i].h >= canvas.height) {
        paddles[i].y = canvas.height - paddles[i].h;
      }
    }
  }
}

var then = Date.now();
reset();
main();

function getHeight(number) {
  return (Math.min(paddles[number].h / 2 + ball.r, Math.max(- paddles[number].h / 2 - ball.r, ball.y - (paddles[number].y + paddles[number].h / 2))) / (paddles[number].h / 2 + ball.r));
}