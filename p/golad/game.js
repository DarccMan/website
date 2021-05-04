var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var vals = {};
var mover = null;
var grid = null;

function reset(full) {
  grid = [];
  for (x = 0; x < data.size.x; x++) {
    grid[x] = [];
    for (y = 0; y < data.size.y; y++) {
      grid[x][y] = 0;
    }
  }

  if (!full) {
    qs = [
      // Circle
      [3, 5],
      [4, 4],
      [5, 3],
      [6, 4],
      [7, 5],
      [4, 6],
      [5, 7],
      [6, 6],
      // Glider
      [4, 12],
      [5, 13],
      [5, 14],
      [4, 14],
      [3, 14],
      // Spaceship
      [15, 7],
      [16, 7],
      [19, 7],
      [20, 7],
      [17, 8],
      [18, 8],
      [17, 9],
      [18, 9],
      [16, 10],
      [19, 10],
      [14, 10],
      [21, 10],
      [14, 11],
      [21, 11],
      [14, 13],
      [21, 13],
      [15, 14],
      [20, 14],
      [16, 14],
      [19, 14],
      [16, 15],
      [19, 15],
      [17, 15],
      [18, 15],
      [17, 17],
      [18, 17],
      [17, 18],
      [18, 18],
    ];
    for (i = 0; i < qs.length; i++) {
      grid[qs[i][0]][qs[i][1]] = 1;
    }
  }

  gameState = "edit";
  doc.id("button").innerText = "Start";
}

function render() {
  ctx.fillCanvas();

  ctx.strokeStyle = color.stroke;
  ctx.font = "16px Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (x = 0; x < grid.length; x++) {
    for (y = 0; y < grid[x].length; y++) {
      ctx.fillStyle = color[grid[x][y] ? "live" : "dead"];

      ctx.fillRect(
        x * (canvas.width / grid.length),
        y * (canvas.height / grid[x].length),
        canvas.width / grid.length,
        canvas.height / grid[x].length,
      );

      ctx.strokeRect(
        x * (canvas.width / grid.length),
        y * (canvas.height / grid[x].length),
        canvas.width / grid.length,
        canvas.height / grid[x].length,
      );

      if (doc.id("amount").checked) {
        ctx.fillStyle = "red";
        amount = 0;
        for (c = 0; c < cs.length; c++) {
          if (
            grid[x + cs[c][0]]
            && grid[x + cs[c][0]][y + cs[c][1]]
          ) {
            amount++;
          }
        }
        ctx.fillText(
          amount,
          (x + 0.5) * (canvas.width / grid.length),
          (y + 0.5) * (canvas.height / grid[x].length),
          canvas.width / grid.length,
          canvas.height / grid[x].length,
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
  if (gameState == "edit") {
    canvas.style.cursor = "pointer";
    if (F.mouse.onCanvas) {
      if (F.buttonDown(0)) {
        if (vals.click) {
          vals.click = false;
          x = (F.mouse.x / (canvas.width / grid.length)).round(null, "f");
          y = (F.mouse.y / (canvas.height / grid[0].length)).round(null, "f");
          if (
            grid[x]
          ) {
            grid[x][y] = !grid[x][y] ? 1 : 0;
          }
        }
      } else {
        vals.click = true;
      }
    }
  }
}

cs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  // [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
function move() {
  if (gameState == "play") {
    arr = [];
    for (x = 0; x < grid.length; x++) {
      arr[x] = [];
      for (y = 0; y < grid[x].length; y++) {
        amount = 0;
        for (c = 0; c < cs.length; c++) {
          if (
            grid[x + cs[c][0]]
            && grid[x + cs[c][0]][y + cs[c][1]]
          ) {
            amount++;
          }
        }
        val = 0;
        if (amount == 3) {
          val = 1;
        } else if (
          amount == 2
          && grid[x][y]
        ) {
          val = 1;
        }
        arr[x][y] = val;
      }
    }
    grid = arr;

    mover = setTimeout(move, data.speed - parseInt(doc.id("speed").value));
  }
}

function toggle() {
  doc.id("button").innerText = gameState == "edit" ? "Edit" : "Start";
  gameState = gameState == "play" ? "edit" : "play";
  if (gameState == "play") {
    mover = setTimeout(move, data.speed - parseInt(doc.id("speed").value));
  }
}

var then = Date.now();
reset();
main();