/* Create cv.maines */
var cv = {};
var ctxs = {};
cv.main = doc.id("cv-main");
size = 512;
_w = Math.round(size * data.ratio);
_h = size;
_ws = _w + "px";
_hs = _h + "px";
cv.main.initialize();
cv.main.style.width = _ws + "px";
cv.main.style.height = _hs + "px";
cv.main.w = _w * data.resolution;
cv.main.h = _h * data.resolution;
cv.main.parentNode.style.width = _ws;
cv.main.parentNode.style.height = _hs;
cv.main.setAttribute("oncontextmenu", "return(false);");
ctxs.main = cv.main.getContext("2d");
var ctx = ctxs.main;
ctx.imageSmoothingEnabled = false;
if (data.pixelate) {
  cv.main.style.imageRendering = "pixelated";
}

cv.shadow = doc.id("cv-shadow");
ctxs.shadow = cv.shadow.getContext("2d");
ctxs.shadow.imageSmoothingEnabled = false;
cv.shadow.initialize();

/* Create global variables */
var debugMode = false;
// debugMode = true;
startState = "start";
if (F.url.online) {
  debugMode = false;
}
var lvl = 0;
if (debugMode) {
  // data.graphics = 2;
  lvl = 5;
  startState = "play";
  // levels = [levels[0]];
  // levels = [levels[0], levels[1]];
  // levels[1] = null;
}
if (F.url.query.speedrun) {
  startState = "play";
}
if (F.url.query.graphics) {
  if (
    parseInt(F.url.query.graphics) == F.url.query.graphics
  ) {
    data.graphics = parseInt(F.url.query.graphics);
  }
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
var tw = (Math.min(cv.main.width, cv.main.height) / data.tiles);
var tw2 = (Math.min(parseInt(cv.main.style.width), cv.main.height) / data.tiles);
var tx = data.tiles / Math.min(cv.main.width, cv.main.height) * Math.max(cv.main.width, cv.main.height);

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
  frame.interval = setInterval(frame.increase, data.frame_speed);
  // if (data.graphics > 2) {
  // }
}
frame.increase = () => {
  if (["play", "start", "end"].includes(gameState)) {
    frame.current++;
  }
}

/* Images */
function addImage(name, path) {
  img = new Image();
  img.src = "./image/{0}.png".format(path);
  images[name] = img;
}
for (i = 0; i < data.blocks.keys().length; i++) {
  for (j = 0; j < data.blocks.values()[i].images; j++) {
    addImage("{0}_{1}".format(data.blocks.keys()[i], j), "block/" + data.blocks.keys()[i] + "_" + j);
  }
}
for (i = 0; i < data.enemies.keys().length; i++) {
  for (j = 0; j < data.enemies.values()[i].images; j++) {
    addImage("{0}_{1}".format(data.enemies.keys()[i], j), "enemy/" + data.enemies.keys()[i] + "_" + j);
  }
}
playerImages = {
  idle: 2,
  run: 2,
  jump: 2,
  crouch: 2,
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
let gameFont = new FontFace(data.font, `url(../../source/font/${data.font}.woff2)`);
gameFont.load().then(
  (font) => {
    document.fonts.add(font);
    global.lastStart = Date.now();
    gameState = startState;
  },
  (err) => {
    console.error(err);
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
console.log("Good job.\nYou opened the console.");
reset();
main();