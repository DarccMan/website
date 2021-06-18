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
  doc.id("contain").appendChild(cv[cvs[i]]);
  ct[cvs[i]] = cv[cvs[i]].getContext("2d");
  ct[cvs[i]].imageSmoothingEnabled = false;
}
ctx = ct.main;
canvas = cv.main;
canvas.w = screen.width;
canvas.h = screen.height;

onkeydown = ((e) => {
  if (
    e.ctrlKey
    || e.metaKey
    || e.altKey
  ) {
    return;
  }
  if (data.fullscreen) {
    doc.body.requestFullscreen();
  }
});
onmousedown = ((e) => {
  if (data.fullscreen) {
    doc.body.requestFullscreen();
  }
});

var gameState = "start";
var global = {};
global.start = Date.now();
var sprites = [];

function reset() {
  sprites = [];
  for (i = 0; i < data.sprites.amount; i++) {
    sprites.push({
      x: F.randomFloat(data.sprites.r, canvas.w - data.sprites.r),
      y: F.randomFloat(data.sprites.r, canvas.h - data.sprites.r),
      color: colors.sprites[i],
      a: i * ((2 * Math.PI) / data.sprites.amount),
      d: F.randomFloat(2, 2),
    });
  }

  gameState = "play";
}

function render() {
  frame = Date.now() - global.start;
  if (gameState == "play") {
    hsv = {
      h: frame * data.bg.speed * 0.005,
      s: 50,
      v: 20,
    };
    ctx.fillCanvas(F.hsv_hex(hsv));

    for (i = 0; i < sprites.length; i++) {
      ctx.fillStyle = colors.stroke;
      ctx.beginPath();
      ctx.ellipse(
        sprites[i].x,
        sprites[i].y,
        data.sprites.r * data.sprites.stroke,
        data.sprites.r * data.sprites.stroke,
        0, 0, 2 * Math.PI,
      );
      ctx.fill();
      ctx.fillStyle = sprites[i].color;
      ctx.beginPath();
      ctx.ellipse(
        sprites[i].x,
        sprites[i].y,
        data.sprites.r,
        data.sprites.r,
        0, 0, 2 * Math.PI,
      );
      ctx.fill();

      if (global.lines) {
        let {a, d} = sprites[i];
        d *= 30;
        x = d * Math.cos(sprites[i].a);
        y = d * Math.sin(sprites[i].a);

        hsv = F.hex_hsv(sprites[i].color);
        hsv.s -= 50;
        hsv.v -= 20;
        ctx.strokeStyle = F.hsv_hex(hsv) + "80";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(
          sprites[i].x,
          sprites[i].y,
        );
        ctx.lineTo(
          sprites[i].x + x,
          sprites[i].y + y,
        );
        ctx.stroke();
      }
    }
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
  if (F.keyDown(86)) {
    if (global.once_pause) {
      global.once_pause = false;
      if (gameState == "pause") {
        gameState = "play";
        if (global.last_pause) {
          global.start += Date.now() - global.last_pause;
        }
      } else {
        gameState = "pause";
        global.last_pause = Date.now();
      }
    }
  } else {
    global.once_pause = true;
  }

  if (F.keyDown(82)) {
    if (global.once_reset) {
      global.once_reset = false;
      reset();
    }
  } else {
    global.once_reset = true;
  }

  if (!global.speed) {
    global.speed = data.sprites.speed;
  }
  if (F.keyDown(66)) {
    global.start -= 10000 * mod;
    global.speed += data.sprites.accel * mod;
  } else {
    global.speed -= data.sprites.accel * mod;
  }
  global.speed = global.speed.setBorder(data.sprites.speed, data.sprites.fast);

  if (F.keyDown(77)) {
    if (global.once_lines) {
      global.once_lines = false;
      global.lines = !global.lines;
    }
  } else {
    global.once_lines = true;
  }

  if (gameState == "play") {
    for (i = 0; i < sprites.length; i++) {
      if (sprites[i].collide) {
        sprites[i].a += data.sprites.rotate * mod * (((i + 2) * 0.3) / (Math.PI / 2 * sprites.length)) * global.speed / 30;
      }

      let {a, d} = sprites[i];
      d *= global.speed * mod;
      sprites[i].x += d * Math.cos(a);
      sprites[i].y += d * Math.sin(a);

      sprites[i].x = sprites[i].x.setBorder(data.sprites.r, canvas.w - data.sprites.r);
      sprites[i].y = sprites[i].y.setBorder(data.sprites.r, canvas.h - data.sprites.r);
    }

    for (i = 0; i < sprites.length; i++) {
      angle = null;
      for (j = 0; j < sprites.length; j++) {
        if (i === j) {
          continue;
        }

        dx = sprites[i].x - sprites[j].x;
        dy = sprites[i].y - sprites[j].y;
        dx = Math.abs(dx);
        dy = Math.abs(dy);
        if (Math.sqrt((dx ** 2) + (dy ** 2)) < data.sprites.r * 2) {
          angle = Math.atan(dx / dy) + Math.PI * 100;
        }
      }

      if (angle) {
        sprites[i].a = angle;
        sprites[i].collide = true;
      }
    }
  }
}

var then = Date.now();
reset();
main();