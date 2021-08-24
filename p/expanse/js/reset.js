function reset() {
  measure = {};
  graphics = 4;

  cam = {
    x: 0,
    y: 0,
    z: 1,
  };

  blocks = [];
  for (x = 0; x < 20; x++) {
    blocks[x] = [];
    for (y = 0; y < 20; y++) {
      blocks[x][y] = {
        id: "none",
      };
    }
  }
  blocks[2][6].id = "stone";
  blocks[3][6].id = "stone";
  blocks[4][6].id = "stone";
  blocks[4][7].id = "stone";
  blocks[5][7].id = "stone";
  blocks[6][7].id = "stone";
  blocks[7][7].id = "stone";
  blocks[8][7].id = "stone";
  blocks[8][6].id = "stone";
  blocks[10][5].id = "stone";

  player = {
    x: 2,
    y: 3,
    w: data.player.w,
    h: data.player.h,
    state: "idle",
  };
  player.Hw = player.w * data.player.Hw;
  player.Hh = player.h * data.player.Hh;
  player.Hx = player.x + (player.w - player.Hw) / 2;
  player.Hy = player.y + (player.h - player.Hh);

  $("#x").val(0);
  $("#y").val(0);
  $("#z").val(100);
  changeCam();

  gameState = "play";
}