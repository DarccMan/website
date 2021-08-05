var cv = [];
var ct = [];
let cvs = ["main"];
for (i = 0; i < cvs.length; i++) {
  cv[cvs[i]] = doc.create("canvas");
  cv[cvs[i]].id = "cv-" + cvs[i];
  cv[cvs[i]].setAttribute("oncontextmenu", "return(false);");
  doc.id("wrap").appendChild(cv[cvs[i]]);
  ct[cvs[i]] = cv[cvs[i]].getContext("2d");
  ct[cvs[i]].imageSmoothingEnabled = false;
}
doc.id("wrap").style.width = data.canvas.h * data.canvas.ratio + "px";
doc.id("wrap").style.height = data.canvas.h + "px";
var ctx = ct.main;
var canvas = cv.main;
checkScreenSize();

var gameState = "start";
var ball, holes, original, blocks;
var global = {};
var animate = {};
var mouse = {};

function reset() {
  ball = {
    x: 150,
    y: 100,
    vx: 0,
    vy: 0,
    r: Math.min(canvas.width, canvas.height) / 300 * data.ball.r,
  };
  original = {};
  original.holes = [
    {
      x: 300,
      y: 400,
    },
  ];
  original.blocks = [
    {
      x: 1,
      y: 3,
    },
    {
      x: 2,
      y: 3,
    },
    {
      x: 3,
      y: 3,
    },
    {
      x: 4,
      y: 3,
    },
    {
      x: 4,
      y: 2,
    },
    {
      x: 4,
      y: 1,
    },
    {
      x: 4,
      y: 0,
    },
    {
      x: 4,
      y: 6,
    },
    {
      x: 4,
      y: 7,
    },
    {
      x: 4,
      y: 8,
    },
    {
      x: 4,
      y: 9,
    },
    {
      x: 5,
      y: 6,
    },
    {
      x: 6,
      y: 6,
    },
    {
      x: 7,
      y: 6,
    },
    {
      x: 11,
      y: 2,
    },
    {
      x: 11,
      y: 3,
    },
    {
      x: 11,
      y: 4,
    },
    {
      x: 11,
      y: 5,
    },
  ];
  holes = original.holes;
  blocks = original.blocks;
  checkScreenSize();

  animate = {};
  gameState = "play";
}

function render() {
  F.fillCanvas(ctx, color.bg);

  ctx.fillStyle = color.block_fill;
  ctx.strokeStyle = color.block_stroke;
  ctx.lineWidth = data.blocks.stroke;
  for (i = 0; i < blocks.length; i++) {
    F.fillRoundRect(
      ctx,
      blocks[i].x * ball.r * data.blocks.size,
      blocks[i].y * ball.r * data.blocks.size,
      ball.r * data.blocks.size,
      ball.r * data.blocks.size,
      data.blocks.round,
    );
    F.strokeRoundRect(
      ctx,
      blocks[i].x * ball.r * data.blocks.size,
      blocks[i].y * ball.r * data.blocks.size,
      ball.r * data.blocks.size,
      ball.r * data.blocks.size,
      data.blocks.round,
    );
  }

  ctx.fillStyle = color.hole;
  for (i = 0; i < holes.length; i++) {
    ctx.beginPath();
    ctx.ellipse(
      holes[i].x,
      holes[i].y,
      ball.r * data.holes.r,
      ball.r * data.holes.r,
      0, 0, 2 * Math.PI
    );
    ctx.fill();
  }

  ctx.fillStyle = color.ball;
  ctx.beginPath();
  amount = getAnimateState("hole");
  amountN = getAnimateState("hole", true);
  ctx.ellipse(
    ball.x + (animate.hole ? amount * animate.hole.x : 0),
    ball.y + (animate.hole ? amount * animate.hole.y : 0),
    ball.r * (animate.hole ? amountN : 1),
    ball.r * (animate.hole ? amountN : 1),
    0, 0, 2 * Math.PI,
  );
  ctx.fill();

  if (mouse.down && global.val_hit) {
    h = Math.round(mouse.dist * 0.3).toString(16);
    if (h.length < 2) {
      h = "0" + h;
    }
    if (h.length > 2) {
      h = "FF";
    }
    ctx.strokeStyle = "#101010" + h,
      ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(
      mouse.px || ball.x,
      mouse.py || ball.y,
    );
    ctx.lineTo(
      mouse.x,
      mouse.y,
    );
    ctx.stroke();
  }
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  /* var keysDown = F.getKeyCodes(controls); */
  if (global.sw || global.sh) {
    if (global.sw != screen.width || global.sh != screen.height) {
      checkScreenSize();
    }
  }
  global.sw = screen.width;
  global.sh = screen.height;
  if (gameState == "play") {
    var rect = canvas.getBoundingClientRect();
    mouse.x = F.touch.down ? F.touch.x : F.mouse.x;
    mouse.y = F.touch.down ? F.touch.y : F.mouse.y;
    mouse.x = Math.max(0, Math.min(canvas.width, (mouse.x - rect.left + 11) || ball.x));
    mouse.y = Math.max(0, Math.min(canvas.height, (mouse.y - rect.top + 11) || ball.y));
    mouse.dx = mouse.x - mouse.px;
    mouse.dy = mouse.y - mouse.py;
    mouse.tx = mouse.px - mouse.dx;
    mouse.ty = mouse.py - mouse.dy;
    mouse.dist = (
      mouse.dx ** 2 +
      mouse.dy ** 2
    ) ** 0.5;
    mouse.down = F.touch.down || F.buttonDown(0);
    global.val_hit = !(ball.vx || ball.vy);
    global.val_hit = true;
    if (mouse.down) {
      if (global.once_mouse && global.val_hit) {
        global.once_mouse = false;
        global.once_hit = true;
        mouse.px = mouse.x;
        mouse.py = mouse.y;
      }
    } else {
      global.once_mouse = true;
      if (global.once_hit) {
        global.once_hit = false;
        ball.vx = - mouse.dx;
        ball.vy = - mouse.dy;
      }
    }

    ball.vx = Math.max(- data.ball.terminal, Math.min(data.ball.terminal, ball.vx));
    ball.vy = Math.max(- data.ball.terminal, Math.min(data.ball.terminal, ball.vy));

    if (ball.vx > 0) {
      ball.vx -= data.ball.decceleration * mod;
    }
    if (ball.vx < 0) {
      ball.vx += data.ball.decceleration * mod;
    }
    if (Math.abs(ball.vx) < data.ball.min) {
      ball.vx = 0;
    }
    if (ball.vy > 0) {
      ball.vy -= data.ball.decceleration * mod;
    }
    if (ball.vy < 0) {
      ball.vy += data.ball.decceleration * mod;
    }
    if (Math.abs(ball.vy) < data.ball.min) {
      ball.vy = 0;
    }

    ball.x += ball.vx * mod * data.ball.speed;
    ball.y += ball.vy * mod * data.ball.speed;

    size = ball.r * data.blocks.size;
    for (i = 0; i < blocks.length; i++) {
      if (F.collide({
        x: blocks[i].x * size,
        y: blocks[i].y * size,
        w: size,
        h: size,
      }, ball, true)) {
        let {x, y} = ball;
        x -= blocks[i].x * size;
        y -= blocks[i].y * size;
        if (x + y < size && x - y < 0) {
          ball.vx = - Math.abs(ball.vx);
          ball.vx /= data.ball.friction;
        }
        if (x + y > size && x - y > 0) {
          ball.vx = Math.abs(ball.vx);
          ball.vx /= data.ball.friction;
        }
        if (x + y > size && x - y < 0) {
          ball.vy = Math.abs(ball.vy);
          ball.vy /= data.ball.friction;
        }
        if (x + y < size && x - y > 0) {
          ball.vy = - Math.abs(ball.vy);
          ball.vy /= data.ball.friction;
        }
        break;
      }
    }

    if (ball.x - ball.r < 0) {
      ball.vx = Math.abs(ball.vx);
      ball.vx /= data.ball.friction;
    }
    if (ball.x + ball.r > canvas.width) {
      ball.vx = - Math.abs(ball.vx);
      ball.vx /= data.ball.friction;
    }
    if (ball.y - ball.r < 0) {
      ball.vy = Math.abs(ball.vy);
      ball.vy /= data.ball.friction;
    }
    if (ball.y + ball.r > canvas.height) {
      ball.vy = - Math.abs(ball.vy);
      ball.vy /= data.ball.friction;
    }

    for (i = 0; i < holes.length; i++) {
      if (F.collide(ball, {r: ball.r * data.holes.r, ...holes[i]}, true, true)) {
        gameState = "hole";
        setAnimate("hole", reset, {
          x: holes[i].x - ball.x,
          y: holes[i].y - ball.y,
        });
        break;
      }
    }
  }

  if (F.keyDown(17)) {
    ball.x = mouse.x;
    ball.y = mouse.y;
    ball.vx = 0;
    ball.vy = 0;
  }
}

var then = Date.now();
reset();
main();

function setAnimate(name, stop, values) {
  animate[name] = {
    start: Date.now(),
    stop: setTimeout(stop, data.animate[name].duration),
    ...data.animate[name],
    ...values,
  };
}

function getAnimateState(name, reverse) {
  key = animate[name];
  if (!key) {
    return null;
  }
  return reverse ?
    Math.max(0, (key.duration - (Date.now() - key.start)) / key.duration) :
    (Date.now() - key.start) / key.duration;
}

function checkScreenSize() {
  if (screen.height > screen.width) {
    canvas.sideways = true;
    canvas.width = data.canvas.h;
    canvas.height = data.canvas.h * data.canvas.ratio;

    if (original) {
      blocks = [];
      for (i = 0; i < original.blocks.length; i++) {
        blocks.push({
          x: original.blocks[i].y,
          y: original.blocks[i].x,
        });
      }

      holes = [];
      for (i = 0; i < original.holes.length; i++) {
        holes.push({
          x: original.holes[i].y,
          y: original.holes[i].x,
        });
      }
    }
  } else {
    canvas.sideways = false;
    canvas.width = data.canvas.h * data.canvas.ratio;
    canvas.height = data.canvas.h;

    if (original) {
      blocks = original.blocks;
      holes = original.holes;
    }
  }
  document.querySelector("#wrap").style.width = canvas.width + "px";
  document.querySelector("#wrap").style.height = canvas.height + "px";
}
onresize = checkScreenSize;