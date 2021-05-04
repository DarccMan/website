var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var joystick = {
  r: data.joystick.r,
  x: (data.joystick.r * (1 + data.joystick.outline)) + 20,
  y: (canvas.height) - ((data.joystick.r * (1 + data.joystick.outline)) + 20),
  thumb: {
    r: data.joystick.r * data.joystick.thumbSize,
    angle: 90,
    dist: 0,
  },
  down: false,
};
var player = {
  x: 0,
  y: 0,
  w: 8,
  h: 8,
  speed: data.speed,
};
var pixels = [];

function reset() {
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;

  for (x = 0; x < data.pixels.w; x++) {
    pixels[x] = [];
    for (y = 0; y < data.pixels.h; y++) {
      pixels[x][y] = null;
    }
  }

  gameState = "play";
}

function render() {
  ctx.fillCanvas(F.getColor(180));

  for (x = 0; x < pixels.length; x++) {
    for (y = 0; y < pixels[x].length; y++) {
      if (pixels[x][y]) {
        ctx.fillStyle = F.getColor(pixels[x][y]);
        ctx.fillRect(
          x * (canvas.width / pixels.length),
          y * (canvas.height / pixels[y].length),
          canvas.width / pixels.length,
          canvas.height / pixels[y].length,
        );
      }
    }
  }

  ctx.fillStyle = F.getColor([100, 100, 100]);
  ctx.beginPath();
  ctx.ellipse(
    joystick.x,
    joystick.y,
    joystick.r * (1 + data.joystick.outline),
    joystick.r * (1 + data.joystick.outline),
    0, 0, 2 * Math.PI
  );
  ctx.fill();
  ctx.fillStyle = F.getColor([90, 90, 90]);
  ctx.beginPath();
  ctx.ellipse(
    joystick.x,
    joystick.y,
    joystick.r,
    joystick.r,
    0, 0, 2 * Math.PI
  );
  ctx.fill();

  ctx.fillStyle = F.getColor([80, 80, 80]);
  ctx.beginPath();
  c = F.getCoords(
    joystick.x,
    joystick.y,
    0 - (joystick.r / 4),
    (joystick.thumb.angle - 90) + 40,
  );
  ctx.moveTo(
    c.x,
    c.y,
  );
  c = F.getCoords(
    joystick.x,
    joystick.y,
    0 - (joystick.r / 4),
    (joystick.thumb.angle - 90) - 40,
  );
  ctx.lineTo(
    c.x,
    c.y,
  );
  c = F.getCoords(
    joystick.x,
    joystick.y,
    (joystick.r * (joystick.thumb.dist / 2)) * 1.3,
    (joystick.thumb.angle - 90) + 35,
  );
  ctx.lineTo(
    c.x,
    c.y,
  );
  c = F.getCoords(
    joystick.x,
    joystick.y,
    (joystick.r * (joystick.thumb.dist / 2)) * 1.3,
    (joystick.thumb.angle - 90) - 35,
  );
  ctx.lineTo(
    c.x,
    c.y,
  );
  ctx.fill();

  ctx.fillStyle = F.getColor([120, 120, 120]);
  c = F.getCoords(
    joystick.x,
    joystick.y,
    (joystick.r * (joystick.thumb.dist / 2)),
    joystick.thumb.angle - 90,
  );
  ctx.beginPath();
  ctx.ellipse(
    c.x,
    c.y,
    joystick.thumb.r,
    joystick.thumb.r,
    0, 0, 2 * Math.PI
  );
  ctx.fill();

  ctx.fillStyle = "blue";
  ctx.fillRect(
    player.x,
    player.y,
    player.w,
    player.h,
  );

  ctx.strokeStyle = F.getColor([255, 0, 0, 0.3]);
  ctx.lineWidth = 3;
  c = F.getCoords(
    player.x + (player.w / 2),
    player.y + (player.h / 2),
    (joystick.r * (joystick.thumb.dist / 2)) * data.speed,
    joystick.thumb.angle - 90,
  );
  ctx.beginPath();
  ctx.moveTo(
    player.x + (player.w / 2),
    player.y + (player.h / 2),
  );
  ctx.lineTo(
    c.x,
    c.y,
  );
  ctx.stroke();
}

function main() {
  var now = Date.now();
  var delta = now - then;
  render();
  update(delta / 1000);
  then = now;
  requestAnimationFrame(main);
}
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  if (gameState == "play") {
    if (
      !joystick.down
      && joystick.thumb.dist > 0
    ) {
      joystick.thumb.dist -= data.joystick.returnSpeed * mod;
    }
    if (!joystick.down) {
      if (
        F.buttonDown(0)
        && F.collide({
          x: F.mouse.x,
          y: F.mouse.y,
          w: 1,
          h: 1,
        }, {
          x: joystick.x,
          y: joystick.y,
          r: joystick.r,
        }, true)
      ) {
        joystick.down = true;
      }
    } else {
      if (!F.buttonDown(0)) {
        joystick.down = false;
      }
    }
    if (
      F.buttonDown(0)
      && joystick.down
    ) {
      joystick.thumb.angle = F.getAngle(
        F.mouse.x,
        F.mouse.y,
        joystick.x,
        joystick.y,
        true,
      );
      joystick.thumb.dist = (((
        F.diff(joystick.x, F.mouse.x) ** 2 +
        F.diff(joystick.y, F.mouse.y) ** 2
      ) ** 0.5) / joystick.r);
    }
    joystick.thumb.dist = joystick.thumb.dist.setBorder(0, 1);
    
    c = F.getCoords(
      0,
      0,
      joystick.thumb.dist,
      joystick.thumb.angle - 90,
    );
    player.x += c.x * player.speed;
    player.y += c.y * player.speed;

    if (keysDown.includes("pen_down")) {
      for (x = 0; x < pixels.length; x++) {
        for (y = 0; y < pixels[x].length; y++) {
          let d = getDistance({
            x: x * (canvas.width / pixels.length),
            y: y * (canvas.height / pixels[y].length),
            w: canvas.width / pixels.length,
            h: canvas.height / pixels[y].length,
          }, {
            x: player.x,
            y: player.y,
            r: player.w,
          }, true)
          if (d < player.w) {
            pixels[x][y] = ((d)) * (255 / player.w);
            // console.log(((player.w - d) / player.w) * 255);
          }
        }
      }
    }
  }
}

function getDistance(r1, r2) {
  var testX = r2.x;
  var testY = r2.y;
  if (r2.x < r1.x) {
    testX = r1.x;
  } else if (r2.x > r1.x + r1.w) {
    testX = r1.x + r1.w;
  }
  if (r2.y < r1.y) {
    testY = r1.y;
  } else if (r2.y > r1.y + r1.h) {
    testY = r1.y + r1.h;
  }
  let distX = r2.x - testX;
  let distY = r2.y - testY;
  distance = Math.sqrt((distX * distX) + (distY * distY));
  return (distance);
}

var then = Date.now();
reset();
main();