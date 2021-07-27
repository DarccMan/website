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
canvas = cv.main;
ctx = ct.main;

var gameState = "start";
var global = {};
var grid, updater;

function reset() {
  grid = [];
  for (x = 0; x < data.grid.x; x++) {
    grid[x] = [];
    for (y = 0; y < data.grid.x; y++) {
      grid[x][y] = {
        type: "none",
      };
    }
  }
  grid[2][4] = {type: "move", dir: 0};
  grid[4][4] = {type: "move", dir: 1};
  grid[2][6] = {type: "move", dir: 2};
  grid[4][6] = {type: "move", dir: 3};
  grid[2][4] = {type: "move", dir: 2};
  
  gameState = "play";
  clearInterval(updater);
  updater = setInterval(frame, data.speed);
}

function render() {
  ctx.fillCanvas(color.none[0]);
  
  for (x = 0; x < grid.length; x++) {
    for (y = 0; y < grid[x].length; y++) {
      if (!grid[x][y] || grid[x][y].type == "none") {
        // continue;
        ctx.fillStyle = color.none[1];
        ctx.fillRoundRect(
          (x + 0.5 - data.grid.stroke / 2) * (canvas.w / grid.length),
          (y + 0.5 - data.grid.stroke / 2) * (canvas.w / grid.length),
          canvas.w / grid.length * data.grid.stroke,
          canvas.w / grid.length * data.grid.stroke,
          data.grid.r_stroke * canvas.w / grid.length,
        );
      } else {
        ctx.fillStyle = color[grid[x][y].type][0];
        ctx.fillRoundRect(
          x * (canvas.w / grid.length),
          y * (canvas.w / grid.length),
          canvas.w / grid.length,
          canvas.w / grid.length,
          data.grid.r_fill * canvas.w / grid.length,
        );
        ctx.fillStyle = color[grid[x][y].type][1];
        ctx.fillRoundRect(
          (x + 0.5 - data.grid.stroke / 2) * (canvas.w / grid.length),
          (y + 0.5 - data.grid.stroke / 2) * (canvas.w / grid.length),
          canvas.w / grid.length * data.grid.stroke,
          canvas.w / grid.length * data.grid.stroke,
          data.grid.r_stroke * canvas.w / grid.length,
        );

        dir = grid[x][y].dir;
        if (dir != undefined) {
          ctx.fillStyle = color.dir;
          ctx.fillRoundRect(
            (x + (dir === 1 ? ((data.grid.stroke + 1) / 2 - (data.grid.dir * data.grid.stroke)) : (0.5 - data.grid.stroke / 2))) * (canvas.w / grid.length),
            (y + (dir === 2 ? ((data.grid.stroke + 1) / 2 - (data.grid.dir * data.grid.stroke)) : (0.5 - data.grid.stroke / 2))) * (canvas.w / grid.length),
            ((dir % 2) ? data.grid.dir : 1) * canvas.w / grid.length * data.grid.stroke,
            (((dir + 1) % 2) ? data.grid.dir : 1) * canvas.w / grid.length * data.grid.stroke,
            data.grid.r_stroke * canvas.w / grid.length,
          );
        }
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
  if (gameState == "play") {
    
  }
}

function frame() {
  newGrid = [];
  for (x = 0; x < grid.length; x++) {
    newGrid[x] = [];
    for (y = 0; y < grid[x].length; y++) {
      newGrid[x][y] = grid[x][y];
    }
  }

  for (x = 0; x < grid.length; x++) {
    for (y = 0; y < grid[x].length; y++) {
      cell = grid[x][y];
      if (!cell) {
        continue;
      }
      switch (cell.type) {
        case "move": {
          ax = 0;
          ay = 0;
          switch (cell.dir) {
            case 0: ay = -1; break;
            case 1: ax = 1; break;
            case 2: ay = 1; break;
            case 3: ax = -1; break;
          }
          if (grid[x + ax]?.[y + ay]) {
            newGrid[x + ax][y + ay] = cell;
            newGrid[x][y] = {
              type: "none",
            };
          }
        }; break;
      }
    }
  }
  grid = newGrid;
}

var then = Date.now();
reset();
main();