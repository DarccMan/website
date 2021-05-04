function reset() {
  player = new Game.Player(lvls[lvl].player);

  scene = new Game.Scene(lvls[lvl].scene);
  scene.cam = {
    x: 0,
    y: 0,
    z: 100,
  };

  if (gameState != "title") {
    gameState = "level";
  }

  blocks = lvls[lvl].blocks;
  if (!blocks) {
    blocks = [];
  }
  for (b = 0; b < blocks.length; b++) {
    if (!blocks[b].type) {
      blocks[b].type = "solid";
    }
    if (!blocks[b].fill) {
      blocks[b].fill = data.blocks.types[blocks[b].type].fill;
    }
    if (!blocks[b].w && blocks[b].w != 0) {
      blocks[b].w = 100;
    }
    if (!blocks[b].h && blocks[b].h != 0) {
      blocks[b].h = 100;
    }
    if (!data.blocks.types[blocks[b].type]) {
      blocks[b].type = "solid";
    }
  }
  score = {
    deaths: 0,
    levels: 0,
    time: null,
    date: null,
    cheats: false,
  };
}