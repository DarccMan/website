/* Pick up block */
if (!player.hold) {
  x = Math.floor((playerHit.x + playerHit.w / 2) / tw);
  y = Math.floor((playerHit.y + playerHit.h / 2) / tw);
  if (
    grid[x]
    && grid[x][y]
  ) {
    val = false;
    if (data.blocks[grid[x][y].block].check) {
      if (global.keyOnce_use) {
        global.keyOnce_use = false;
        checkpoint = {
          x: (x + 0.5) * tw - player.w / 2,
          y: player.y - player.h * 0.4,
          bx: x,
          by: y,
          lvl,
        };
        for (x1 = 0; x1 < grid.length; x1++) {
          for (y1 = 0; y1 < grid[x1].length; y1++) {
            grid[x1][y1].down = false;
          }
        }
        grid[x][y].down = true;
      }
    } else if (data.blocks[grid[x][y].block].use) {
      switch (grid[x][y].block) {
        case "sign": {
          global.signText = grid[x][y].text || "No text";
          global.lastReadSign = Date.now();
        }; break;
      }
    } else if (data.blocks[grid[x][y].block].pick) {
      global.keyOnceVal_moveBlock = false;
      if (global.keyOnce_moveBlock) {
        global.keyOnce_moveBlock = false;
        player.hold = grid[x][y].block;
        grid[x][y] = {
          block: "none"
        };
      }
    }
  }
} else if (player.hold) {
  /* Drop block */
  x = Math.floor((playerHit.x + playerHit.w / 2) / tw);
  y = Math.floor((playerHit.y + playerHit.h / 2) / tw);
  if (
    grid[x]
    && grid[y]
  ) {
    if (grid[x][y].block == "none") {
      if (data.blocks[player.hold].pick) {
        global.keyOnceVal_moveBlock = false;
        if (global.keyOnce_moveBlock) {
          global.keyOnce_moveBlock = false;
          grid[x][y] = {
            block: player.hold,
          };
          player.hold = null;
        }
      }
    }
  }
}
if (global.keyOnceVal_moveBlock) {
  global.keyOnce_moveBlock = true;
}