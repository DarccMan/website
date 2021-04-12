var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512 * 1.5;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

canvas2 = doc.create("canvas")
canvas2.width = canvas.width;
canvas2.height = canvas.height;
ctx2 = canvas2.getContext("2d");

var player = null;
var grid = [];
var cam = {
  x: 0,
  y: 0,
};
var images = {};
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
};
for (i = 0; i < playerImages.keys().length; i++) {
  for (j = 0; j < playerImages.values()[i]; j++) {
    addImage("player_{0}_{1}".format(playerImages.keys()[i], j), "player/{0}/{1}".format(playerImages.keys()[i], j));
  }
}
// addImage("player_idle_0", "player/idle/small");
addImage("outer", "edge/outer");
addImage("inner", "edge/inner");
addImage("side", "edge/side");
var gameState = "start";
// var gameState = "play";
var lvl = 0;
// var lvl = 2;
var tw = (Math.min(canvas.width, canvas.height) / data.tiles);
var tx = data.tiles / Math.min(canvas.width, canvas.height) * Math.max(canvas.width, canvas.height);
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
var global = {};
var enemies = [];

function main() {
  render();
  update((Date.now() - then) / 1000);
  then = Date.now();
  requestAnimationFrame(main);
}

var then = Date.now();
reset();
main();

async function death() {
  gameState = "death";
  global.lastDeath = Date.now();
  global.deathMessage = F.randomChoice(data.death_lines);
  player.animate = 0;
  for (j = 0; j < 100; j += 4) {
    player.animate = j / 100;
    await F.sleep(0.001);
  }
  player.animate = 1;
  await F.sleep(0.4);
  player.animate = 0;
  reset();
}

async function goal() {
  gameState = "win";
  player.animate = 0;
  for (j = 0; j < 100; j += 4) {
    player.animate = j / 100;
    await F.sleep(0.001);
  }
  lvl++;
  reset();
  player.animate = 0;
}