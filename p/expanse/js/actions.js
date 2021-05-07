/* Death function */
async function death() {
  gameState = "death";
  global.deaths++;
  global.lastDeath = Date.now();
  global.deathMessage = F.randomChoice(lang.death);
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
function graphicsUp() {
  data.graphics = (data.graphics + 1) % 5;
  global.lastGraphics = Date.now();
}
function graphicsDown() {
  data.graphics = (data.graphics + 10 - 1) % 5;
  global.lastGraphics = Date.now();
}

window.addEventListener("keydown", function (e) {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
  }
}, false);

yoMama = {
  so: (what) => "Yo mama so {0}, she DIED".format(what),
};

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
    time: parseInt(str.s(21, 27)) / 100,
    dateCode: parseInt(str.s(3, 16)),
    date: new Date(parseInt(str.s(3, 16))),
    deaths: parseInt(str[29]),
    restarts: parseInt(str[30]),
    cheats: str[2] == 1,
    debug: str[17] == 1,
    egg: str[18] == 1,
    pntr_dist: str.s(0, 2), // Polynomial time radix
    speedrun: str[19] == 1,
    key: str[20] == 1,
    graphics: parseInt(str[16]),
    levels: parseInt(str.s(27, 29)),
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