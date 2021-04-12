function reset() {
  if (!levels[lvl]) {
    console.log("You finished the game!\nIf you are seeing this message then Hello :)");
    lvl = 0;
  }
  grid = [];
  for (x = 0; x < levels[lvl].dim[0]; x++) {
    grid[x] = [];
    for (y = 0; y < levels[lvl].dim[1]; y++) {
      if (!grid[x][y]) {
        grid[x][y] = "none";
      }
    }
  }
  enemies = [];
  fen = levels[lvl].set.replace(/(\r\n|\n|\r| )/gm, "").split(";");
  x = 0;
  y = 0;
  for (i = 0; i < fen.length; i++) {
    if (!fen[i] || fen[i].s(0) == "/") {
      continue;
    }
    switch (fen[i].s(0)) {
      case "#": {
        str = fen[i].s(1, -1).split("*");
        amount = parseInt(str[1]) || 1;
        random = fen[i].s(1, -1).split("&")[1];
        if (random) {
          random = random.split(",");
          if (random[0].split(":").length < 2) {
            random = [str[0] + ":" + random[0].split(":"), ...F.toArray(random.s(1, -1))];
          } else {
            random = [str[0] + ":1", ...random];
          }
        } else {
          random = [str[0]];
        }
        arr = [];
        for (j = 0; j < random.length; j++) {
          for (k = 0; k < (parseInt(random[j].split(":")[1]) || 1); k++) {
            arr.push(random[j].split(":")[0]);
          }
        }
        random = arr;
        for (j = 0; j < amount; j++) {
          grid[x % grid.length][Math.min(grid[0].length - 1, Math.floor(x / grid.length))] = F.randomChoice(random);
          x++;
        }
        // x = x % grid.length;
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
        enemies.push({
          type,
          x: ((x % grid.length) * tw) + ((1 - data.enemies[type].w) * tw / 2),
          y: ((Math.floor(x / grid.length) + 1) * tw) - (data.enemies[type].h * tw),
          w: data.enemies[type].w * tw,
          h: data.enemies[type].h * tw,
          vx: 0,
          vy: 0,
        });
      }; break;
    }
    y = Math.floor(x / grid.length);
  }

  player = {
    x: (levels[lvl].player?.x || 2) * tw,
    y: (levels[lvl].player?.y || 2) * tw,
    w: tw * data.player.w,
    h: tw * data.player.h,
    vx: 0,
    vy: 0,
    hold: null,
    // hold: "torch",
  };

  if (gameState != "start") {
    gameState = "play";
  }
  frame.start();
  global.lastRestart = Date.now();
}