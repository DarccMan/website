var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

function reset() {
  
}
var imageLoaded = false;

function render() {
  ctx.fillCanvas("rgba(255, 255, 255)");
  for (x = 0; x < grid.length; x++) {
    for (y = 0; y < grid[x].length; y++) {
      ctx.fillStyle = (grid[x][y] >= 1) ? "rgba(0, 0, 0)" : "rgba(255, 255, 255)";
      // ctx.fillStyle = (grid[x][y] >= 1) ? "rgba(150, 150, 150)" : "rgba(255, 255, 255)";
      if (doc.id("smooth_walls").checked) {
        if (grid[x][y] >= 1) {
          switch (types[x][y].join("")) {
            case ("1010"): {
              ctx.beginPath();
              ctx.moveTo(x * (canvas.width / data.w), y * (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w) + (canvas.width / data.w), y * (canvas.height / data.h) + (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w), y * (canvas.height / data.h) + (canvas.height / data.h));
              ctx.fill();
            }; break;
            case ("0101"): {
              ctx.beginPath();
              ctx.moveTo(x * (canvas.width / data.w), y * (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w) + (canvas.width / data.w), y * (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w) + (canvas.width / data.w), y * (canvas.height / data.h) + (canvas.height / data.h));
              ctx.fill();
            }; break;
            case ("0011"): {
              ctx.beginPath();
              ctx.moveTo(x * (canvas.width / data.w) + (canvas.width / data.w), y * (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w), y * (canvas.height / data.h) + (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w) + (canvas.width / data.w), y * (canvas.height / data.h) + (canvas.height / data.h));
              ctx.fill();
            }; break;
            case ("1100"): {
              ctx.beginPath();
              ctx.moveTo(x * (canvas.width / data.w), y * (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w) + (canvas.width / data.w), y * (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w), y * (canvas.height / data.h) + (canvas.height / data.h));
              ctx.fill();
            }; break;
            case ("1000"): {
              ctx.beginPath();
              ctx.moveTo(x * (canvas.width / data.w), y * (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w) / 3), y * (canvas.height / data.h) + ((canvas.height / data.h) / 3));
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w) / 3), y * (canvas.height / data.h) + ((canvas.height / data.h) / 1.5));
              ctx.lineTo(x * (canvas.width / data.w), y * (canvas.height / data.h) + (canvas.height / data.h));
              ctx.fill();
            }; break;
            case ("0100"): {
              ctx.beginPath();
              ctx.moveTo(x * (canvas.width / data.w), y * (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w) / 3), y * (canvas.height / data.h) + ((canvas.height / data.h) / 3));
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w) / 1.5), y * (canvas.height / data.h) + ((canvas.height / data.h) / 3));
              ctx.lineTo(x * (canvas.width / data.w) + (canvas.width / data.w), y * (canvas.height / data.h));
              ctx.fill();
            }; break;
            case ("0010"): {
              ctx.beginPath();
              ctx.moveTo(x * (canvas.width / data.w), y * (canvas.height / data.h) + (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w) / 3), y * (canvas.height / data.h) + ((canvas.height / data.h) / 1.5));
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w) / 1.5), y * (canvas.height / data.h) + ((canvas.height / data.h) / 1.5));
              ctx.lineTo(x * (canvas.width / data.w) + (canvas.width / data.w), y * (canvas.height / data.h) + (canvas.height / data.h));
              ctx.fill();
            }; break;
            case ("0001"): {
              ctx.beginPath();
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w)), y * (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w) / 1.5), y * (canvas.height / data.h) + ((canvas.height / data.h) / 3));
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w) / 1.5), y * (canvas.height / data.h) + ((canvas.height / data.h) / 1.5));
              ctx.lineTo(x * (canvas.width / data.w) + (canvas.width / data.w), y * (canvas.height / data.h) + (canvas.height / data.h));
              ctx.fill();
            }; break;
            case ("0000"): {
              ctx.beginPath();
              // ctx.fillStyle = (grid[x][y] >= 1) ? "rgba(0, 0, 0)" : "rgba(255, 255, 255)";
              ctx.lineTo(x * (canvas.width / data.w), y * (canvas.height / data.h) + ((canvas.height / data.h) / 2));
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w) / 2), y * (canvas.height / data.h));
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w)), y * (canvas.height / data.h) + ((canvas.height / data.h) / 2));
              ctx.lineTo(x * (canvas.width / data.w) + ((canvas.width / data.w) / 2), y * (canvas.height / data.h) + ((canvas.height / data.h)));
              ctx.fill();
            }; break;
            default: {
              ctx.fillRect(
                x * (canvas.width / data.w),
                y * (canvas.height / data.h),
                (canvas.width / data.w),
                (canvas.height / data.h),
              );
            };
          }
        } else {
          ctx.fillRect(
            x * (canvas.width / data.w),
            y * (canvas.height / data.h),
            (canvas.width / data.w),
            (canvas.height / data.h),
          );
        }
      } else {
        ctx.fillRect(
          x * (canvas.width / data.w),
          y * (canvas.height / data.h),
          (canvas.width / data.w),
          (canvas.height / data.h),
        );
      }
    }
  }
  if (! imageLoaded) {
    doc.id("favicon").href = canvas.toDataURL();
  }
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
}

var grid = [];

seed = "";
function gen() {
  imageLoaded = false;
  seed = Date.now();
  if (! doc.id("seed_random").checked) {
    seed = doc.id("seed").value;
  } else {
    doc.id("seed").value = seed;
  }
  random = (F.randomSeed(seed, (data.w * data.h)));
  random = random.split("");
  for (i = 0; i < random.length; i++) {
    random[i] = (parseInt(random[i] + random[i + 1]) > doc.id("fill_perc").value) ? 1 : 0;
  }

  grid = [];
  for (x = 0; x < data.w; x++) {
    grid.push([]);
    for (y = 0; y < data.h; y++) {
      grid[x].push(random[(x * data.w) + y]);
    }
  }
  if (doc.id("smooth").checked) {
    for (i = 0; i < 3; i++) {
      smooth();
    }
  }
  getTypes();
}
function smooth() {
  c = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  for (x = 0; x < data.w; x++) {
    for (y = 0; y < data.h; y++) {
      if (x > 0 && x < grid.length - 1 && y > 0 && y < grid[x].length - 1) {
        walls = 0;
        for (i = 0; i < c.length; i++) {
          if (grid[x + (c[i][0])][y + (c[i][1])] >= 1) {
            walls++;
          }
        }
        if (walls > 4) {
          grid[x][y] = 1;
        } else if (walls < 3) {
          grid[x][y] = 0;
        }
      } else {
        grid[x][y] = 1;
      }
    }
  }
  c = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  for (x = 0; x < data.w; x++) {
    for (y = 0; y < data.h; y++) {
      if (x > 0 && x < grid.length - 1 && y > 0 && y < grid[x].length - 1) {
        walls = 0;
        for (i = 0; i < c.length; i++) {
          if (grid[x + (c[i][0])][y + (c[i][1])] >= 1) {
            walls++;
          }
        }
        if (walls < 1) {
          grid[x][y] = 0;
        }
      } else {
        grid[x][y] = 1;
      }
    }
  }
}
types = [];
function getTypes() {
  c = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  types = [];
  for (x = 0; x < grid.length; x++) {
    types.push([]);
    for (y = 0; y < grid[0].length; y++) {
      if (x > 0 && x < grid.length - 1 && y > 0 && y < grid[x].length - 1) {
        types[x].push([]);
        for (i = 0; i < c.length; i++) {
          types[x][y].push(grid[x + (c[i][0])][y + (c[i][1])]);
        }
      } else {
        types[x].push([-1]);
      }
    }
  }
}

function download() {
  F.downloadCanvas(canvas, "cavegen_{0}_{0}.png".format(Date.now(), seed));
}

F.triggerOnload();
function seed_change() {
  doc.id("seed").disabled = doc.id("seed_random").checked;
}

var then = Date.now();
reset();
main();