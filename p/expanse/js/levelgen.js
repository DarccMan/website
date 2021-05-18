/* Set up game */
var loadedLevels;
var levelVars;
function loadLevels() {
  loadedLevels = [];
  levelVars = {};
  for (l = 0; l < levels.length; l++) {
    if (
      levels[l] && (
        global.ignoreDisabled
        || !levels[l].disabled
      )
    ) {
      ld = readLevelData(levels[l].set);
      loadedLevels.push({
        ...ld,
        ...levels[l],
      });
    }
  }
}

function setLevel(number) {
  /* Read level file */
  grid = JSON.parse(JSON.stringify(loadedLevels[number].grid));
  enemies = JSON.parse(JSON.stringify(loadedLevels[number].enemies));

  /* Create player */
  player = {
    x: (loadedLevels[number].player?.x || 2) * tw,
    y: (loadedLevels[number].player?.y || 2) * tw,
    w: tw * data.player.w,
    h: tw * data.player.h,
    vx: 0,
    vy: 0,
    hold: null,
    status: "idle",
  };
}

function readLevelData(str) {
  __grid = [];
  for (x = 0; x < levels[l].dim[0]; x++) {
    __grid[x] = [];
    for (y = 0; y < levels[l].dim[1]; y++) {
      if (!__grid[x][y]) {
        __grid[x][y] = {
          block: "none",
        };
      }
    }
  }
  __enemies = [];
  fen = str.replace(/(\r\n|\n|\r| )/gm, "").replaceAll("_", " ").split(";");
  x = 0;
  y = 0;
  for (i = 0; i < fen.length; i++) {
    levelComponent(fen[i], i);
    y = Math.floor(x / __grid.length);
  }

  return ({
    grid: __grid,
    enemies: __enemies,
  });
}

function levelComponent(comp, line) {
  if (!comp || comp.s(0) == "/") {
    return;
  }
  switch (comp.s(0)) {
    case "#": {
      /* Add block */
      str = comp.s(1, -1).split("*");
      nbt = {};
      block = str[0];
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
      if (block[0] == "%") {
        block = levelVars[block.s(1, -1)];
      }
      amount = parseInt(str[1]) || 1;
      random = comp.s(1, -1).split("&")[1];
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
      oldX = x;
      for (j = 0; j < amount; j++) {
        __grid[(x + __grid.length) % __grid.length][Math.max(0, Math.min(__grid[0].length - 1, Math.floor(x / __grid.length)))] = {
          block: F.randomChoice(random),
          ...nbt,
        }
        x++;
      }
      // console.error("Block out of bounds");
      x = oldX;
    }; break;
    case "x": {
      /* Change X position of item placer */
      value = comp.s(2, -1);
      if (parseFloat(value) == value) {
        value = parseFloat(value);
        if (comp.s(1) == "+") {
          x += value;
        } else if (comp.s(1) == "-") {
          x -= value;
        } else if (comp.s(1) == "=") {
          x = value;
        } else {
          console.error("Level Generation:\nSet X operater must be '=', '+' or '-'")
        }
      } else {
        console.error("Level Generation ({0}): Set X number must be float or integer".format(line));
      }
    }; break;
    case "y": {
      /* Change Y position of item placer */
      value = comp.s(2, -1);
      if (parseFloat(value) == value) {
        value = parseFloat(value);
        if (comp.s(1) == "+") {
          x += value * __grid.length;
        } else if (comp.s(1) == "-") {
          x -= value * __grid.length;
        } else if (comp.s(1) == "=") {
          ox = x;
          x = value * __grid.length;
          x += ox % __grid.length;
        } else {
          console.error("Level Generation:\nSet Y operater must be '=', '+' or '-'")
        }
      } else {
        console.error("Level Generation: Set Y number must be float or integer");
      }
    }; break;
    case "@": {
      /* Spawn enemy */
      type = comp.s(1, -1).split("{");
      nbt = {};
      if (type.length > 1) {
        raw = type[1].s(0, -2).split(",");
        for (j = 0; j < raw.length; j++) {
          if (raw[j].split(":").length > 1) {
            nbt[raw[j].split(":")[0]] = raw[j].split(":")[1];
          } else {
            nbt[raw[j].split(":")[0]] = true;
          }
        }
      }
      type = type[0];
      if (data.enemies[type]) {
        enemy = {
          type,
          x: ((x % __grid.length) * tw) + ((1 - data.enemies[type].w) * tw / 2),
          y: ((Math.floor(x / __grid.length) + 1) * tw) - (data.enemies[type].rh ? (
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
          stamp: F.randomInt(0, 1000),
          ...nbt,
        };
        if (type == "rat") {
          // I cannot change this. It is their choice
          enemy.name = "Clive";
        }
        __enemies.push(enemy);
      } else {
        console.error("Level Generation:\n'{0}' is not a valid enemy".format(type));
      }
    }; break;
    case "$": {
      comps = comp.split("[")[1].s(0, -2).split(",");
      loop = parseInt(comp.split("[")[0].s(1, -1));
      if (!isNaN(loop)) {
        for (n = 0; n < loop; n++) {
          for (c = 0; c < comps.length; c++) {
            levelComponent(comps[c]);
          }
        }
      } else {
        console.error("Level Generation ({0}): Loop number must be float".format(line));
      }
    }; break;
    case "%": {
      key = comp.split("=")[0].s(1, -1);
      value = comp.split("=")[1];
      levelVars[key] = value;
    }; break;
  }
}