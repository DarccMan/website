/* Create canvas */
var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.style.width = 512 * 1.5 + "px";
canvas.style.height = 512 + "px";
canvas.width = parseInt(canvas.style.width) * data.resolution;
canvas.height = parseInt(canvas.style.height) * data.resolution;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
if (data.pixelate) {
  canvas.style.imageRendering = "pixelated";
}

/* Create secondary canvas (for shadow subtraction) */
canvas2 = doc.create("canvas")
canvas2.width = canvas.width;
canvas2.height = canvas.height;
ctx2 = canvas2.getContext("2d");

/* Create global variables */
var debugMode = false;
// debugMode = true;
var lvl = 0;
if (debugMode) {
  // data.graphics = 0;
  var lvl = 2;
}
var player = null;
var grid = [];
var cam = {
  x: 0,
  y: 0,
};
var images = {};
var gameState = "load";
var global = {};
var enemies = [];
var tw = (Math.min(canvas.width, canvas.height) / data.tiles);
var tw2 = (Math.min(parseInt(canvas.style.width), canvas.height) / data.tiles);
var tx = data.tiles / Math.min(canvas.width, canvas.height) * Math.max(canvas.width, canvas.height);

/* Outline settings for blocks */
cs = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
ci = [
  [[-1, -1], [-1, 0], [0, -1]],
  [[1, -1], [0, -1], [1, 0]],
  [[1, 1], [1, 0], [0, 1]],
  [[-1, 1], [0, 1], [-1, 0]],
];
co = [
  [[-1, 0], [0, -1]],
  [[0, -1], [1, 0]],
  [[1, 0], [0, 1]],
  [[0, 1], [-1, 0]],
];

/* Frame increase for animations */
var frame = {};
frame.current = 0;
frame.start = () => {
  clearInterval(frame.interval);
  if (data.graphics > 2) {
    frame.interval = setInterval(frame.increase, data.frame_speed);
  }
}
frame.increase = () => {
  if (gameState == "play") {
    frame.current++;
  }
}

/* Images */
function addImage(name, path) {
  img = new Image();
  img.src = "./image/{0}.png".format(path);
  images[name] = img;
}
for (i = 0; i < data.sprites.keys().length; i++) {
  if (data.image_amount[data.sprites.keys()[i]]) {
    for (j = 0; j < data.image_amount[data.sprites.keys()[i]]; j++) {
      addImage("{0}_{1}".format(data.sprites.keys()[i], j), "sprite/" + data.sprites.keys()[i] + "_" + j);
    }
  } else {
    addImage(data.sprites.keys()[i], "sprite/" + data.sprites.keys()[i]);
  }
}
for (i = 0; i < data.enemies.keys().length; i++) {
  if (data.image_amount[data.enemies.keys()[i]]) {
    for (j = 0; j < data.image_amount[data.enemies.keys()[i]]; j++) {
      addImage("{0}_{1}".format(data.enemies.keys()[i], j), "enemy/" + data.enemies.keys()[i] + "_" + j);
    }
  } else {
    addImage(data.enemies.keys()[i], "enemy/" + data.enemies.keys()[i]);
  }
}
playerImages = {
  idle: 2,
  run: 2,
  jump: 2,
  death: 1,
  transition: 1,
};
for (i = 0; i < playerImages.keys().length; i++) {
  for (j = 0; j < playerImages.values()[i]; j++) {
    addImage("player_{0}_{1}".format(playerImages.keys()[i], j), "player/{0}/{1}".format(playerImages.keys()[i], j));
  }
}
addImage("outer", "edge/outer");
addImage("inner", "edge/inner");
addImage("side", "edge/side");

/* Finish loading when font loads */
let gameFont = new FontFace(data.font, "url(../../source/font/dirty-roma.woff2)");
gameFont.load().then(
  (font) => {
    document.fonts.add(font);
    gameState = "start";
    if (debugMode) {
      gameState = "play";
    }
  },
  (err) => {
    console.log(err);
  }
)

/* Technical stuff I guess? Idk I just copy paste it */
function main() {
  render();
  update((Date.now() - then) / 1000);
  then = Date.now();
  requestAnimationFrame(main);
}
var then = Date.now();
reset();
main();