/* Global variables */
var then = Date.now();
var cv = [];
var ct = [];
let cvs = ["bg", "main", "player", "overlay"];
var global = {};
var gameState = "start";
var player, blocks, mobs, cam, measure, images, graphics;

/* Start game */
function init() {
  /* Create canvases */
  for (i = 0; i < cvs.length; i++) {
    cv[cvs[i]] = doc.create("canvas");
    cv[cvs[i]].id = "cv-" + cvs[i];
    cv[cvs[i]].width = data.canvas.h * data.canvas.ratio;
    cv[cvs[i]].height = data.canvas.h;
    cv[cvs[i]].setAttribute("oncontextmenu", "return(false);");
    $("#wrap")[0].appendChild(cv[cvs[i]]);
    ct[cvs[i]] = cv[cvs[i]].getContext("2d");
    ct[cvs[i]].imageSmoothingEnabled = false;
  }
  $("#wrap").css("width", data.canvas.h * data.canvas.ratio + "px");
  $("#wrap").css("height", data.canvas.h + "px");

  /* Start cycle */
  reset();
  main();
}

/* Refresh cycle */
function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}

/* Load images */
function loadImages() {
  images = {};
  for (i in data.blocks) {
    img = new Image();
    img.src = `./image/block/${i}/0.png`;
    images[`block_${i}_0`] = img;
  }
  playerStates = {
    idle: 2,
    run: 2,
    jump: 2,
    crouch: 2,
    death: 1,
    transition: 1,
  };
  for (i in playerStates) {
    for (j = 0; j < playerStates[i]; j++) {
      img = new Image();
      img.src = `./image/player/${i}/${j}.png`;
      images[`player_${i}_${j}`] = img;
    }
  }
}
loadImages();

/* Other functions */
function changeCam() {
  cam = {
    x: parseFloat($("#x").val()),
    y: parseFloat($("#y").val()),
    z: parseFloat($("#z").val()) / 100,
  };
}