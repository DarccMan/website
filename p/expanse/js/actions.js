/* Death function */
async function death() {
  gameState = "death";
  global.deaths++;
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
  if (F.url.query.speedrun) {
    lvl = 0;
  }
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
var loadedLevels = [];
function loadLevels() {
  for (l = 0; l < levels.length; l++) {
    if (levels[l] && !levels[l].disabled) {
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
          __grid[x % __grid.length][Math.min(__grid[0].length - 1, Math.floor(x / __grid.length))] = {
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
            x += value * __grid.length;
          } else if (fen[i].s(1) == "-") {
            x -= value * __grid.length;
          } else if (fen[i].s(1) == "=") {
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
          __enemies.push({
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
          });
        } else {
          console.error("Level Generation:\n'{0}' is not a valid enemy".format(type));
        }
      }; break;
    }
    y = Math.floor(x / __grid.length);
  }

  return ({
    grid: __grid,
    enemies: __enemies,
  });
}

/* Start game */
function startPlay() {
  gameState = "play";
  lvl = 0;
  if (!global.firstStarted) {
    if (F.url.query.lvl) {
      if (
        parseInt(F.url.query.lvl) >= 0
        && parseInt(F.url.query.lvl) < levels.length
      ) {
        lvl = parseInt(F.url.query.lvl);
        global.firstStarted = true;
      }
    }
  }
  reset();
  global.lastRestart = Date.now();
}

function decodeStats(str) {
  stats = {
    time: parseInt(str.s(20, 26)) / 100,
    dateCode: parseInt(str.s(2, 15)),
    date: new Date(parseInt(str.s(2, 15))),
    deaths: parseInt(str[28]),
    restarts: parseInt(str[29]),
    cheats: str[1] == 1,
    debug: str[16] == 1,
    egg: str[17] == 1,
    speedrun: str[18] == 1,
    key: str[19] == 1,
    graphics: parseInt(str[15]),
    levels: parseInt(str.s(26, 28)),
    valid: str.s(-1) == 1,
  };

  console.table(stats);
}

function checkStats() {
  if (global.lastStats) {
    decodeStats(global.lastStats);
  } else {
    console.log("No previous stats available :(");
  }
}