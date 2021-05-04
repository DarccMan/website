function reset() {
  scene = new Game.Scene();
  scene.cam = {
    x: 0,
    y: 0,
    z: 100,
  };

  player = new Game.Player();
  playerDef.x = player.x;
  playerDef.y = player.y;

  blocks = [];

  gameState = "edit";
  resetPlayer();
}

function resetPlayer() {
  player.x = playerDef.x;
  player.y = playerDef.y;
  player.pose = "idle";
  doc.id("player_x").value = player.x;
  doc.id("player_y").value = player.y;
}

function resetCam() {
  doc.id("x").value = 0;
  doc.id("y").value = 0;
  doc.id("z").value = 100;
  scene.cam.x = 0;
  scene.cam.y = 0;
  scene.cam.z = 100;
}