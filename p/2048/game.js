var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var grid = null;
var vals = {};

function reset() {
  grid = [];
  for (x = 0; x < data.size.x; x++) {
    grid[x] = [];
    for (y = 0; y < data.size.y; y++) {
      grid[x][y] = 0;
    }
  }
  for (i = 0; i < 2; i++) {
    spawn();
  }

  gameState = "play";
}

function render() {
  ctx.fillCanvas();

  ctx.lineWidth = 10;
  ctx.strokeStyle = color.stroke;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (x = 0; x < grid.length; x++) {
    for (y = 0; y < grid[x].length; y++) {
      ctx.fillStyle = color.empty;
      if (grid[x][y]) {
        ctx.fillStyle = color.value[grid[x][y] - 1];
      }
      ctx.fillRect(
        x * (canvas.width / grid[x].length),
        y * (canvas.height / grid[y].length),
        canvas.width / grid[x].length,
        canvas.height / grid[y].length,
      );

      ctx.strokeRect(
        x * (canvas.width / grid[x].length),
        y * (canvas.height / grid[y].length),
        canvas.width / grid[x].length,
        canvas.height / grid[y].length,
      );

      if (grid[x][y]) {
        ctx.font = "bold {0}px Arial".format(grid[x][y] < 7 ? 80 : grid[x][y] < 10 ? 70 : 50);
        ctx.fillStyle = color.text;
        ctx.fillText(
          2 ** grid[x][y],
          (x + 0.5) * (canvas.width / grid[x].length),
          (y + 0.5) * (canvas.height / grid[y].length),
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
  var keysDown = F.getKeyCodes(controls);
  if (gameState == "play") {
    bin = F.bool_bin(keysDown.includes("move_up"), keysDown.includes("move_right"), keysDown.includes("move_down"), keysDown.includes("move_left"));
    if (bin.replaceAll("0", "")) {
      if (vals.move) {
        vals.move = false;
        createNew = true;

        switch (bin) {
          case "1000": {
            for (x = 0; x < grid.length; x++) {
              for (y = 1; y < grid[0].length; y++) {
                if (grid[x][y]) {
                  Y2: for (y2 = 0; y2 < Math.min(y, grid[0].length); y2++) {
                    if (y == y2) {
                      continue;
                    }
                    if (!grid[x][y2]) {
                      grid[x][y2] = grid[x][y];
                      grid[x][y] = 0;
                      break Y2;
                    } else if (grid[x][y2] === grid[x][y]) {
                      grid[x][y2]++;
                      grid[x][y] = 0;
                      break Y2;
                    }
                  }
                }
              }
            }
          }; break;
          case "0100": {
            for (y = 0; y < grid[0].length; y++) {
              for (x = grid.length - 2; x >= 0; x--) {
                if (grid[x][y]) {
                  X2: for (x2 = Math.max(x, grid[0].length) - 1; x2 >= 0; x2--) {
                    if (x == x2) {
                      continue;
                    }
                    if (!grid[x2][y]) {
                      grid[x2][y] = grid[x][y];
                      grid[x][y] = 0;
                      break X2;
                    } else if (grid[x2][y] === grid[x][y]) {
                      grid[x2][y]++;
                      grid[x][y] = 0;
                      break X2;
                    }
                  }
                }
              }
            }
          }; break;
          case "0010": {
            for (x = 0; x < grid.length; x++) {
              for (y = grid[0].length - 2; y >= 0; y--) {
                if (grid[x][y]) {
                  Y2: for (y2 = Math.max(y, grid[0].length) - 1; y2 >= 0; y2--) {
                    if (y == y2) {
                      continue;
                    }
                    if (!grid[x][y2]) {
                      grid[x][y2] = grid[x][y];
                      grid[x][y] = 0;
                      break Y2;
                    } else if (grid[x][y2] === grid[x][y]) {
                      grid[x][y2]++;
                      grid[x][y] = 0;
                      break Y2;
                    }
                  }
                }
              }
            }
          }; break;
          case "0001": {
            for (y = 0; y < grid[0].length; y++) {
              for (x = 1; x < grid.length; x++) {
                if (grid[x][y]) {
                  X2: for (x2 = 0; x2 < Math.min(x, grid[0].length); x2++) {
                    if (x == x2) {
                      continue;
                    }
                    if (!grid[x2][y]) {
                      grid[x2][y] = grid[x][y];
                      grid[x][y] = 0;
                      break X2;
                    } else if (grid[x2][y] === grid[x][y]) {
                      grid[x2][y]++;
                      grid[x][y] = 0;
                      break X2;
                    }
                  }
                }
              }
            }
          }; break;
          default: {
            createNew = false;
          }
        }

        if (createNew) {
          spawn();
        }
      }
    } else {
      vals.move = true;
    }
  }
}

var then = Date.now();
reset();
main();

function spawn() {
  val = false;
  for (x = 0; x < grid.length; x++) {
    for (y = 0; y < grid[x].length; y++) {
      if (!grid[x][y]) {
        val = true;
      }
    }
  }
  if (!val) {
    return (false);
  }
  for (j = 0; j < 1000; j++) {
    x = F.randomInt(0, grid.length - 1);
    y = F.randomInt(0, grid[x].length - 1);
    if (grid[x][y] == 0) {
      grid[x][y] = 1;
      return (true);
    }
  }
}