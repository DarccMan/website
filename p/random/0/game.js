var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var angle = 0;
var distance = 50;
var selected, r, d;
var r = canvas.width * data.r / 2;
var d = canvas.width * data.r * data.r2 / 2;
var points = [];
var def = [
  [
    [
      canvas.width / 2,
      canvas.height / 2,
    ], [
      (r - d) * Math.sin(300 * Math.PI / 180) + canvas.width / 2,
      (r - d) * Math.cos(300 * Math.PI / 180) + canvas.height / 2,
    ],
  ],
  [
    [
      (r - d) * Math.sin(60 * Math.PI / 180) + canvas.width / 2,
      (r - d) * Math.cos(60 * Math.PI / 180) + canvas.height / 2,
    ], [
      canvas.width / 2,
      canvas.height / 2,
    ],
  ],
];
var change = [];
for (i = 0; i < def.length; i++) {
  change[i] = [];
  for (j = 0; j < def.length; j++) {
    change[i][j] = [0, 0];
  }
}

function reset() {

  gameState = "play";
}

function render() {
  ctx.fillCanvas();
  x = Math.max(0.001, Math.min(distance, r - d)) * Math.sin(angle * Math.PI / 180);
  y = Math.max(0.001, Math.min(distance, r - d)) * Math.cos(angle * Math.PI / 180);

  for (i = 0; i < def.length; i++) {
    points[i] = [];
    for (j = 0; j < def[i].length; j++) {
      points[i][j] = [];
      for (k = 0; k < 2; k++) {
        points[i][j][k] = change[i][j][k] + def[i][j][k];
      }
    }
  }

  ctx.fillStyle = "#FFF";
  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 2,
    canvas.height / 2,
    r,
    r,
    0, 0, 2 * Math.PI
  );
  ctx.fill();

  ctx.strokeStyle = "#00F";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(points[0][0][0], points[0][0][1]);
  for (i = 1; i < points[0].length; i++) {
    ctx.lineTo(points[0][i][0], points[0][i][1]);
  }
  ctx.lineTo(
    x + canvas.width / 2,
    y + canvas.height / 2,
  );
  for (i = 0; i < points[1].length - 1; i++) {
    ctx.lineTo(points[1][i][0], points[1][i][1]);
  }
  ctx.lineTo(points[0][0][0], points[0][0][1]);
  ctx.stroke();

  ctx.fillStyle = "#0F0";
  for (i = 0; i < points.length; i++) {
    for (j = 0; j < points[i].length - i; j++) {
      ctx.beginPath();
      ctx.ellipse(
        points[i][j][0],
        points[i][j][1],
        d,
        d,
        0, 0, 2 * Math.PI,
      );
      ctx.fill();
    }
  }
  ctx.beginPath();
  ctx.ellipse(
    x + canvas.width / 2,
    y + canvas.height / 2,
    d,
    d,
    0, 0, 2 * Math.PI,
  );
  ctx.fill();
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  /* var keysDown = F.getKeyCodes(controls); */
  if (gameState == "play") {
    if (F.mouse.onCanvas) {
      if (F.buttonDown(0)) {
        if (selected == 0) {
          angle = Math.atan(
            (canvas.width / 2 - F.mouse.x) /
            (canvas.height / 2 - F.mouse.y)
          ) * (180 / Math.PI);
          if (F.mouse.y < canvas.height / 2) {
            angle = angle + 180;
          }
          distance = (
            Math.abs(canvas.width / 2 - F.mouse.x) ** 2 +
            Math.abs(canvas.height / 2 - F.mouse.y) ** 2
          ) ** 0.5;
        } else if (selected) {
          if (true || F.collide(F.mouse, {
            x: canvas.width / 2,
            y: canvas.height / 2,
            r: r - d,
          }, true, true)) {
            for (k = 0; k < 2; k++) {
              change[selected[0]][selected[1]][k] = F.mouse[k ? "y" : "x"] - def[selected[0]][selected[1]][k];
            }
          }
        }
      } else {
        selected = null;
        if (F.collide(F.mouse, {
          x: x + canvas.width / 2,
          y: y + canvas.height / 2,
          r: d,
        }, true, true)) {
          selected = 0;
        } else {
          I: for (i = 0; i < points.length; i++) {
            for (j = 0; j < points[i].length; j++) {
              if (F.collide(F.mouse, {
                x: points[i][j][0],
                y: points[i][j][1],
                r: d,
              }, true, true)) {
                selected = [i, j];
                break I;
              }
            }
          }
        }
      }
    } else {
      angle += mod * 100;
      angle = angle % 360;
      distance += mod * 30;
    }
  }
}

var then = Date.now();
reset();
main();