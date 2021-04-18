function reset() {
  /* Reset game if completed all levels */
  if (!levels[lvl]) {
    console.log("You finished the game!\nIf you are seeing this message then Hello :)");
    lvl = 0;
  }

  /* Set up game */
  grid = [];
  for (x = 0; x < levels[lvl].dim[0]; x++) {
    grid[x] = [];
    for (y = 0; y < levels[lvl].dim[1]; y++) {
      if (!grid[x][y]) {
        grid[x][y] = {
          block: "none",
        };
      }
    }
  }
  enemies = [];
  /* Read level file */
  fen = levels[lvl].set.replace(/(\r\n|\n|\r| )/gm, "").replaceAll("_", " ").split(";");
  x = 0;
  y = 0;
  for (i = 0; i < fen.length; i++) {
    if (!fen[i] || fen[i].s(0) == "/") {
      continue;
    }
    switch (fen[i].s(0)) {
      case "#": {
        str = fen[i].s(1, -1).split("*");
        nbt = {};
        block = str[0];
        //! Add comments
        if (block.split("{").length > 1) {
          raw = block.split("{")[1].s(0, -2).split(",");
          for (j = 0; j < raw.length; j++) {
            if (raw[j].split(":").length > 1) {
              nbt[raw[j].split(":")[0]] = raw[j].split(":")[1];
            } else {
              nbt[raw[j].split(":")[0]] = true;
            }
          }
          block = block.split("{")[0];
        }
        amount = parseInt(str[1]) || 1;
        random = fen[i].s(1, -1).split("&")[1];
        if (random) {
          random = random.split(",");
          if (random[0].split(":").length < 2) {
            random = [block + ":" + random[0].split(":"), ...F.toArray(random.s(1, -1))];
          } else {
            random = [block + ":1", ...random];
          }
        } else {
          random = [block];
        }
        arr = [];
        for (j = 0; j < random.length; j++) {
          block = random[j].split(":");
          if (data.blocks[block[0]]) {
            arr.push(block);
          } else {
            console.error("Level Generation:\n'{0}' is not a valid block".format(block[0]));
          }
        }
        random = arr;
        if (random.length < 1) {
          random = [["unknown", 1]];
        }
        arr = [];
        for (j = 0; j < random.length; j++) {
          for (k = 0; k < (parseInt(random[j][1]) || 1); k++) {
            arr.push(random[j][0]);
          }
        }
        random = arr;
        for (j = 0; j < amount; j++) {
          grid[x % grid.length][Math.min(grid[0].length - 1, Math.floor(x / grid.length))] = {
            block: F.randomChoice(random),
            ...nbt,
          };
          x++;
        }
      }; break;
      case "+": {
        x += parseInt(fen[i].s(1, -1));
      }; break;
      case "=": {
        num = parseInt(fen[i].s(1, -1)) || 0;
        if (num < 0) {
          num = grid[0].length - num;
        }
        x = num;
      }; break;
      case ">": {
        x += (parseInt(fen[i].s(1, -1)) || 1) * grid.length;
      }; break;
      case "@": {
        type = fen[i].s(1, -1);
        if (data.enemies[type]) {
          enemies.push({
            type,
            x: ((x % grid.length) * tw) + ((1 - data.enemies[type].w) * tw / 2),
            y: ((Math.floor(x / grid.length) + 1) * tw) - (data.enemies[type].rh ? (
              data.enemies[type].rh * tw
            ) : (
              data.enemies[type].h * tw
            )),
            w: data.enemies[type].w * tw,
            h: data.enemies[type].rh ? (
              data.enemies[type].rh * tw
            ) : (
              data.enemies[type].h * tw
            ),
            vx: 0,
            vy: 0,
          });
        } else {
          console.error("Level Generation:\n'{0}' is not a valid enemy".format(type));
        }
      }; break;
    }
    y = Math.floor(x / grid.length);
  }

  /* Create player */
  player = {
    x: (levels[lvl].player?.x || 2) * tw,
    y: (levels[lvl].player?.y || 2) * tw,
    w: tw * data.player.w,
    h: tw * data.player.h,
    vx: 0,
    vy: 0,
    hold: null,
    // hold: "torch",
    status: "idle",
  };

  /* Start level */
  if (gameState != "load" && gameState != "start") {
    gameState = "play";
  }
  frame.start();
  global.lastRestart = Date.now();
  // setTimeout(goal, 1000);
}