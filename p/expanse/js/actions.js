/* Death function */
async function death() {
  gameState = "death";
  global.lastDeath = Date.now();
  global.deathMessage = F.randomChoice(data.death_lines);
  player.status = "death";
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

/* Goal function */
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

/* Change graphics when checkbox toggled */
function changeGraphics() {
  data.graphics = (data.graphics + 1) % 4;
}

window.addEventListener("keydown", function (e) {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
  }
}, false);

yoMama = {
  so: (what) => "Yo mama so {0}, she DIED".format(what),
};

/* Set up game */
function setLevel(number) {
  grid = [];
  for (x = 0; x < levels[number].dim[0]; x++) {
    grid[x] = [];
    for (y = 0; y < levels[number].dim[1]; y++) {
      if (!grid[x][y]) {
        grid[x][y] = {
          block: "none",
        };
      }
    }
  }
  enemies = [];
  /* Read level file */
  readLevelData(levels[number].set, grid, enemies);

  /* Create player */
  player = {
    x: (levels[number].player?.x || 2) * tw,
    y: (levels[number].player?.y || 2) * tw,
    w: tw * data.player.w,
    h: tw * data.player.h,
    vx: 0,
    vy: 0,
    hold: null,
    status: "idle",
  };
}

function readLevelData(str, grid, enemies) {
  fen = str.replace(/(\r\n|\n|\r| )/gm, "").replaceAll("_", " ").split(";");
  x = 0;
  y = 0;
  for (i = 0; i < fen.length; i++) {
    if (!fen[i] || fen[i].s(0) == "/") {
      continue;
    }
    switch (fen[i].s(0)) {
      case "#": {
        /* Add block */
        str = fen[i].s(1, -1).split("*");
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
      case "x": {
        /* Change X position of item placer */
        value = fen[i].s(2, -1);
        if (parseFloat(value) == value) {
          value = parseFloat(value);
          if (fen[i].s(1) == "+") {
            x += value;
          } else if (fen[i].s(1) == "-") {
            x -= value;
          } else if (fen[i].s(1) == "=") {
            x = value;
          } else {
            console.error("Level Generation:\nSet X operater must be '=', '+' or '-'")
          }
        } else {
          console.error("Level Generation: Set X number must be float or integer");
        }
      }; break;
      case "y": {
        /* Change Y position of item placer */
        value = fen[i].s(2, -1);
        if (parseFloat(value) == value) {
          value = parseFloat(value);
          if (fen[i].s(1) == "+") {
            x += value * grid.length;
          } else if (fen[i].s(1) == "-") {
            x -= value * grid.length;
          } else if (fen[i].s(1) == "=") {
            ox = x;
            x = value * grid.length;
            x += ox % grid.length;
          } else {
            console.error("Level Generation:\nSet Y operater must be '=', '+' or '-'")
          }
        } else {
          console.error("Level Generation: Set Y number must be float or integer");
        }
      }; break;
      case "@": {
        /* Spawn enemy */
        type = fen[i].s(1, -1).split("{");
        nbt = {};
        if (type.length > 1) {
          raw = type[1].s(0, -2).split(",");
          type = type[0];
          for (j = 0; j < raw.length; j++) {
            if (raw[j].split(":").length > 1) {
              nbt[raw[j].split(":")[0]] = raw[j].split(":")[1];
            } else {
              nbt[raw[j].split(":")[0]] = true;
            }
          }
        }
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
            stamp: F.randomInt(0, 1000),
            ...nbt,
          });
        } else {
          console.error("Level Generation:\n'{0}' is not a valid enemy".format(type));
        }
      }; break;
    }
    y = Math.floor(x / grid.length);
  }
}