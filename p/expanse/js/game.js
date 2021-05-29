/* Create cv.maines */
var cv = {};
var ctxs = {};

cvs = ["bg", "main", "shadow", "overlay", "debug"];
for (i = 0; i < cvs.length; i++) {
  cv[cvs[i]] = doc.create("canvas");
  cv[cvs[i]].id = "cv-" + cvs[i];
  doc.id("wrap").appendChild(cv[cvs[i]]);
  ctxs[cvs[i]] = cv[cvs[i]].getContext("2d");
  cv[cvs[i]].initialize();
}

size = 512;
_w = Math.round(size * data.ratio);
_h = size;
_ws = _w + "px";
_hs = _h + "px";
cv.main.style.width = _ws + "px";
cv.main.style.height = _hs + "px";
cv.main.w = _w * data.resolution;
cv.main.h = _h * data.resolution;
cv.main.parentNode.style.width = _ws;
cv.main.parentNode.style.height = _hs;
cv.main.setAttribute("oncontextmenu", "return(false);");
var ctx = ctxs.main;
ctx.imageSmoothingEnabled = false;
if (data.pixelate) {
  cv.main.style.imageRendering = "pixelated";
}

/* Create global variables */
var global = {};
/* Debug stuff */
global.startDebug = false;
global.startDebug = true;
startState = "start";
global.extraWait = 0.3;
if (F.url.online) {
  global.startDebug = false;
}
var lvl = 0;
if (global.startDebug) {
  data.graphics = 3;
  lvl = 7;
  startState = "play";
  // startState = "pause";
  global.extraWait = 0;
  global.ignoreDisabled = true;
  // global.secretUnlocked = true;
  // global.disableEnemies = true;
}
if (F.url.query.speedrun) {
  startState = "play";
}
if (F.url.query.debug) {
  global.ignoreDisabled = true;
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
var enemies = [];
var tw = (Math.min(cv.main.width, cv.main.height) / data.tiles);
var tw2 = (Math.min(parseInt(cv.main.style.width), cv.main.height) / data.tiles);
var tx = data.tiles / Math.min(cv.main.width, cv.main.height) * Math.max(cv.main.width, cv.main.height);
var checkpoint = null;
var tech = {};

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
    addImage("{0}_{1}".format(data.blocks.keys()[i], j), "block/" + data.blocks.keys()[i] + "/" + j);
  }
  if (data.blocks.values()[i].alt) {
    for (l = 0; l < data.blocks.values()[i].alt.keys().length; l++) {
      for (j = 0; j < data.blocks.values()[i].alt.values()[l]; j++) {
        addImage(
          "{0}_{1}_{2}".format(data.blocks.keys()[i], data.blocks.values()[i].alt.keys()[l], j),
          "block/{0}_{1}/{2}".format(data.blocks.keys()[i], data.blocks.values()[i].alt.keys()[l], j),
        );
      }
    }
  }
}
for (i = 0; i < data.enemies.keys().length; i++) {
  for (j = 0; j < data.enemies.values()[i].images; j++) {
    addImage("{0}_{1}".format(data.enemies.keys()[i], j), "enemy/" + data.enemies.keys()[i] + "/" + j);
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
addImage("edge_outer", "edge/outer");
addImage("edge_inner", "edge/inner");
addImage("edge_side", "edge/side");

/* Finish loading when font loads */
let gameFont = new FontFace(data.font, `url(../../source/font/${data.font}.woff2)`);
gameFont.load().then(
  async (font) => {
    document.fonts.add(font);
    await F.sleep(global.extraWait);
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

/* Check for mobile / incompatible device */
//! Move to FnctJS
window.isMobile = function () {
  let check = false;
  (function (a) {if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;})(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
if (window.isMobile()) {
  alert(lang.mobile);
}