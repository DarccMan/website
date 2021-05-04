var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "regame.turn(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var grid = [];
var game = {
  selected: null,
  turn: 0,
};

function reset() {
  for (x = 0; x < data.grid.x; x++) {
    grid[x] = [];
    for (y = 0; y < data.grid.y; y++) {
      grid[x][y] = null;
    }
  }
  
  game.turn = 1;
  gameState = "play";
  // check_win();
}

function render() {
  ctx.fillCanvas(F.getColor(data.colors.grid_bg));
  
  for (x = 0; x < grid.length; x++) {
    for (y = 0; y < grid[x].length; y++) {
      ctx.fillStyle = F.getColor(data.colors[grid[x][y] !== null ? "piece_" + grid[x][y] : "grid_hole"]);
      ctx.beginPath();
      ctx.ellipse(
        (x + 0.5) * (canvas.width / grid.length),
        (y + 0.5) * (canvas.height / grid[x].length),
        (canvas.width / grid.length) * data.grid.hole_size,
        (canvas.height / grid[x].length) * data.grid.hole_size,
        0, 0, 2 * Math.PI
      );
      ctx.fill();
    }
  }

  ctx.fillStyle = F.getColor(data.colors.column_selected);
  ctx.fillRect(
    game.selected * (canvas.width / grid.length),
    0,
    canvas.width / grid.length,
    canvas.height,
  );

  ctx.fillStyle = F.getColor(F.joinArray(data.colors["piece_" + game.turn], [0.3]));
  ctx.beginPath();
  ctx.ellipse(
    (game.selected + 0.5) * (canvas.width / grid.length),
    (game.display + 0.5) * (canvas.height / grid[0].length),
    (canvas.width / grid.length) * data.grid.hole_size,
    (canvas.height / grid[0].length) * data.grid.hole_size,
    0, 0, 2 * Math.PI
  );
  ctx.fill();

  if (game.animated) {
    // ctx.fillStyle = F.getColor(data.colors["piece_" + game.animated.turn]);
    ctx.fillStyle = "lime";
    ctx.beginPath();
    ctx.ellipse(
      (game.animated.x + 0.5) * (canvas.width / grid.length),
      (game.animated.y + 0.5) * (canvas.height / grid[0].length),
      (canvas.width / grid.length) * data.grid.hole_size,
      (canvas.height / grid[0].length) * data.grid.hole_size,
      0, 0, 2 * Math.PI
    );
    ctx.fill();
  }
}

function main() {
  render();
  update((Date.now() - then) / 1000);
  then = Date.now();
  requestAnimationFrame(main);
}
var clickVal = false;
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  if (gameState == "play") {
    if (game.turn !== null && F.mouse.onCanvas) {
      game.selected = (F.mouse.x / (canvas.width / grid.length)).round(0, "f");
      
      for (y = grid[game.selected].length - 1; y >= 0; y--) {
        if (grid[game.selected][y] === null) {
          game.display = y;
          break;
        }
      }
      if (keysDown.includes("piece_place") || F.touch.down) {
        if (game.selected != undefined && game.selected.in(0, grid.length)) {
          if (clickVal) {
            for (y = grid[game.selected].length - 1; y >= 0; y--) {
              if (grid[game.selected][y] === null) {
                grid[game.selected][y] = game.turn;
                game.turn = game.turn == 0 ? 1 : 0;
                game.display = -1;
                break;
              }
            }
            clickVal = false;
          }
        }
        check_win();
      } else {
        clickVal = true;
      }
    }
  }
}

function check_win() {
  let win = null;
  let combs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  xI: for (x = 0; x < grid.length; x++) {
    for (y = 0; y < grid[x].length; y++) {
      for (w = 0; w < 2; w++) {
        winTiles = [];
        for (c = 0; c < combs.length; c++) {
          win = w;
          rI: for (x2 = 0; x2 < data.grid.connect; x2++) {
            if (grid[x + (x2 * combs[c][0])] !== undefined && grid[x + (x2 * combs[c][0])][y + (x2 * combs[c][1])] !== undefined) {
              if (grid[x + (x2 * combs[c][0])][y + (x2 * combs[c][1])] != win) {
                win = null;
                winTiles = [];
                break rI;
              } else {
                winTiles.push({
                  x: x + (x2 * combs[c][0]),
                  y: y + (x2 * combs[c][1]),
                });
              }
            } else {
              win = null;
              winTiles = [];
              break rI;
            }
          }
          if (win == w) {
            console.log("Winner: " + (w == 0 ? "red" : "yellow"));
            // doc.id("points_{0}".format(w)).innerHTML = parseInt(doc.id("points_{0}".format(w)).innerHTML) + 1;
            gameState = "end";
            setTimeout(() => {
              reset();
            }, 500);
            break xI;
          }
        }
      }
    }
  }
  if (win == null) {
    val = true;
    for (x = 0; x < grid.length; x++) {
      for (y = 0; y < grid[x].length; y++) {
        if (grid[x][y] === null) {
          val = false;
        }
      }
    }
    if (val) {
      console.log("Draw");
      gameState = "draw";
      // doc.id("points_2").innerHTML = parseInt(doc.id("points_2").innerHTML) + 1;
      setTimeout(() => {
        reset();
      }, 800);
    }
  }
}

var then = Date.now();
reset();
main();