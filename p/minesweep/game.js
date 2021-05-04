var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

onbeforeunload = function () {
  return ("Are you sure??");
}

var gameState = "start";
var grid = [];
cs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
var vals = {};

function reset() {
  grid = [];
  for (x = 0; x < data.size.x; x++) {
    grid[x] = [];
    for (y = 0; y < data.size.y; y++) {
      grid[x][y] = {
        n: F.randomInt(0, 100) > data.bombs ? 0 : -1,
        t: 0,
      };
    }
  }
  updateNumbers();

  gameState = "play";
}

function render() {
  ctx.fillCanvas("white");

  ctx.strokeStyle = color.stroke;
  ctx.lineWidth = 3;
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (x = 0; x < data.size.x; x++) {
    for (y = 0; y < data.size.y; y++) {
      ctx.fillStyle = color.unknown;
      if (grid[x][y].t == 1) {
        ctx.fillStyle = color.open;
        if (grid[x][y].n == -1) {
          ctx.fillStyle = color.bomb;
        }
      } else if (grid[x][y].t == 2) {
        ctx.fillStyle = color.flag;
      }

      ctx.fillRect(
        x * (canvas.width / data.size.x),
        y * (canvas.height / data.size.y),
        canvas.width / data.size.x,
        canvas.height / data.size.y,
      );
      ctx.strokeRect(
        x * (canvas.width / data.size.x),
        y * (canvas.height / data.size.y),
        canvas.width / data.size.x,
        canvas.height / data.size.y,
      )

      if (
        grid[x][y].t == 1
        && grid[x][y].n > 0
        // || true
      ) {
        ctx.fillStyle = color.number[grid[x][y].n - 1];
        ctx.fillText(
          grid[x][y].n,
          (x + 0.5) * (canvas.width / data.size.x),
          (y + 0.5) * (canvas.height / data.size.y),
          canvas.width / data.size.x,
          canvas.height / data.size.y,
        );
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
  canvas.style.cursor = "default";
  if (gameState == "play") {
    if (F.mouse.x && F.mouse.y) {
      X: for (x = 0; x < grid.length; x++) {
        for (y = 0; y < grid[x].length; y++) {
          if (F.collide({
            x: (x + 1) * (canvas.width / data.size.x),
            y: (y + 1) * (canvas.height / data.size.y),
            w: canvas.width / data.size.x,
            h: canvas.height / data.size.y,
          }, {
            x: F.mouse.x + (canvas.width / data.size.x),
            y: F.mouse.y + (canvas.height / data.size.y),
            w: 1,
            h: 1,
          })) {
            if (grid[x][y].t != 1) {
              canvas.style.cursor = "pointer";
            }

            if (F.buttonDown(0)) {
              if (vals.button) {
                first = true;
                for (x2 = 0; x2 < grid.length; x2++) {
                  for (y2 = 0; y2 < grid[x].length; y2++) {
                    if (grid[x2][y2].t != 0) {
                      first = false;
                    }
                  }
                }
                if (first) {
                  grid[x][y].n = 0;
                }
                if (grid[x][y].t == 0) {
                  vals.button = false;
                  grid[x][y].t = 1;
                  c = [{v: 0, x, y}];
                  replaceAmount = 0;
                  for (i = 0; i < c.length; i++) {
                    if (grid[x][y].n == 0) {
                      for (c[i]; c[i].v < cs.length; c[i].v++) {
                        x2 = c[i].x + cs[c[i].v][0];
                        y2 = c[i].y + cs[c[i].v][1];
                        if (
                          grid[x2]
                          && grid[x2][y2]
                        ) {
                          if (grid[x2][y2].n == 0) {
                            val = true;
                            for (k = 0; k < c.length; k++) {
                              if (
                                c[k].x == x2
                                && c[k].y == y2
                              ) {
                                val = false;
                              }
                            }
                            if (val) {
                              c.push({v: 0, x: x2, y: y2});
                            }
                          }
                          if (grid[x2][y2].t != 2) {
                            grid[x2][y2].t = 1;
                          }
                          if (first) {
                            if (grid[x2][y2].n == -1) {
                              if (replaceAmount <= 8) {
                                grid[x2][y2].n = 0;
                                replaceAmount++;
                                c.push({v: 0, x: x2, y: y2});
                              }
                              grid[x2][y2].n = 1;
                            }
                            updateNumbers();
                          }
                        }
                      }
                    }
                  }

                  if (grid[x][y].n == -1) {
                    gameState = "bomb";
                    setTimeout(reset, 700);
                  }
                }
              }
            } else if (F.buttonDown(2)) {
              if (vals.button) {
                vals.button = false;
                if (grid[x][y].t == 0) {
                  grid[x][y].t = 2;
                } else if (grid[x][y].t == 2) {
                  grid[x][y].t = 0;
                }
              }
            } else {
              vals.button = true;
            }

            break X;
          }
        }
      }
    }
  }
}

function updateNumbers() {
  for (x4 = 0; x4 < grid.length; x4++) {
    for (y4 = 0; y4 < grid[x4].length; y4++) {
      if (grid[x4][y4].n == -1) {
        continue;
      }
      grid[x4][y4].n = 0;
      for (c4 = 0; c4 < cs.length; c4++) {
        if (
          grid[x4 + cs[c4][0]]
          && grid[x4 + cs[c4][0]][y4 + cs[c4][1]]
          && grid[x4 + cs[c4][0]][y4 + cs[c4][1]].n == -1
        ) {
          grid[x4][y4].n++;
        }
      }
    }
  }
}

var then = Date.now();
reset();
main();