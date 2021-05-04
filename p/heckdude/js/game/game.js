var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 768;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

window.addEventListener('keydown', function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

var gameState = "title";
var lvl = 0;
var blocks = [];
var player = {};
var egg = {
  title: F.randomInt(0, 10) != 0,
};
var scene = {};
var timer = {
  value: 0,
};
var overlay = {
  a: 0,
  type: null,
  stop: false,
};
var images = {};
var score = {};
var playerDef = {};
try {
  inEditor;
} catch {
  inEditor = false;
}
var isLocal = F.url.protocol == "file:";
if (inEditor) {
  var editHistory = {
    timeline: [],
    place: -1,
  };
  historyUpdate();
  var newBlock = null;
  var selectedBlock = null;
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}

var val = {
  pass: false,
  pause: false,
};

async function goal() {
  gameState = "goal";
  overlay.a = 0;
  overlay.type = "goal";
  val.pass = false;
  max = 80;
  for (j = 0; j < max; j++) {
    overlay.a += (j * (100 / max));
    if (overlay.a >= max) {
      break;
    }
    await F.sleep(0.02);
  }

  await F.sleep(0.08);
  lvl++;

  if (inEditor) {
    resetPlayer();
    resetCam();
    togglePlay();
  } else {
    reset();
    if (lvl >= lvls.length) {
      timer.stop();
      complete();
    } else {
      reset();
    }
    score.levels++;
  }

  max = 50;
  for (j = 0; j < max; j++) {
    overlay.a -= (j * (100 / max));
    if (overlay.a <= 0) {
      break;
    }
    await F.sleep(0.01);
  }
  overlay.a = 0;
}

async function death() {
  gameState = "death";
  overlay.a = 100;
  overlay.type = "death";
  val.pass = false;
  score.deaths++;
  
  if (inEditor) {
    resetPlayer();
    resetCam();
    togglePlay();
  } else {
    reset();
  }
  await F.sleep(0.2);
  max = 100;
  for (j = 0; j < max; j++) {
    overlay.a -= (j * (100 / max));
    if (overlay.a <= 0) {
      break;
    }
    await F.sleep(0.01);
  }
  overlay.a = 0;
}

function complete() {
  gameState = "complete";
  lvl = 0;
  score.time = timer.value;
  score.date = Date.now();
  console.log("Completed in {0}s".format((timer.value / 100).round(2)));
  console.log(score);
}

timer.play = function () {
  timer.stop();
  timer.updater = setInterval(timer.update, 10);
  timer.setLast();
}
timer.update = function () {
  timer.value += data.timer.unfocused ? (Date.now() - timer.last) / 10 : 1;
  timer.setLast();
}
timer.stop = function () {
  clearInterval(timer.updater);
  timer.setLast();
}
timer.reset = function () {
  timer.value = 0;
  timer.setLast();
}
timer.last = 0;
timer.setLast = function () {
  timer.last = Date.now();
}

async function load() {
  h = 1.6;
  h2 = 2.2;
  canvas.style.visibility = "visible";
  ctx.fillCanvas(F.getColor(20));
  ctx.fillStyle = F.getColor(220);
  ctx.textAlign = "center";
  ctx.font = "64px Arial";
  ctx.fillText(
    "Loading...",
    canvas.width / 2,
    canvas.height / h2,
  );
  ctx.fillRect(
    canvas.width / 6,
    (canvas.height / h) - 20,
    canvas.width / 1.5,
    40,
  );
  ctx.fillStyle = F.getColor(20);
  ctx.fillRect(
    (canvas.width / 6) + 5,
    (canvas.height / h) - 15,
    (canvas.width / 1.5) - 10,
    30,
  );
  ctx.fillStyle = F.getColor(220);
  for (i = 0; i < assets.image.length; i++) {
    img = new Image();
    img.src = ".{0}/image/".format(inEditor ? "." : "") + assets.image[i];
    images[assets.image[i]] = img;
    ctx.fillRect(
      canvas.width / 6,
      (canvas.height / h) - 20,
      i * ((canvas.width / 1.5) / assets.image.length),
      40,
    );
  }
  ctx.fillRect(
    canvas.width / 6,
    (canvas.height / h) - 20,
    canvas.width / 1.5,
    40,
  );
  await F.sleep(0.1);
  reset();
  main();
}

F.triggerOnload();
var then = Date.now();