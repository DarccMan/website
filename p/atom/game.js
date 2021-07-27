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

function reset() {

  gameState = "play";
}

function render() {
  ctx.fillCanvas("white");
  r = 20;

  ctx.fillStyle = "#448";
  ctx.beginPath();
  ctx.ellipse(
    canvas.w / 2,
    canvas.h / 2,
    r,
    r,
    0, 0, 2 * Math.PI
  );
  ctx.fill();

  shells = Math.ceil(((atomic.value - 1) / 2) ** (1 / 2));
  old = 0;
  arr = [];
  other = 0;
  for (i = 1; i <= shells; i++) {
    size = (Math.min(canvas.width, canvas.height) / shells) / 2 * i * 0.8 + 10;

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#242";
    ctx.beginPath();
    ctx.ellipse(
      canvas.w / 2,
      canvas.h / 2,
      size,
      size,
      0, 0, 2 * Math.PI
    );
    ctx.stroke();

    electrons = 2 * (i ** 2);
    if (i >= shells) {
      other = 0;
      for (j = 1; j < i; j++) {
        other += (j ** 2) * 2;
      }
      electrons = atomic.value - other;
    } else {
      old += electrons;
    }
    arr.push(electrons);
    for (j = 0; j < electrons; j++) {
      ctx.fillStyle = "#A44";
      ctx.beginPath();
      ctx.ellipse(
        i * (canvas.w / r * 1.5),
        j * (canvas.h / r * 1.5) + r,
        r,
        r,
        0, 0, 2 * Math.PI
      );
      ctx.fill();
    }
  }
  sum = 0;
  arr.forEach(i => sum += i);
  // console.log(arr, sum, atomic.value, other);
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

function increase() {
  atomic.value++;
}
function decrease() {
  atomic.value--;
}

var then = Date.now();
reset();
main();