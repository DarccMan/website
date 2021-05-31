/* Death function */
async function death() {
  gameState = "death";
  if (!global.deaths) {
    global.deaths = 0;
  }
  global.deaths++;
  global.lastDeath = Date.now();
  choice = F.randomChoice(lang.death);
  global.deathMessage = choice[0];
  global.deathMessage_ = choice[1];
  player.status = "death";
  player.animate = 0;
  player.deathFlip = F.randomChoice([1, -1]);
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
  if (!global.deathReset) {
    reset();
  }
  global.deathReset = false;
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
  global.check = null;
  resetParticles();
  reset();
  player.animate = 0;
}

/* Restart (NOT reset) */
function restart() {
  if (F.url.query.speedrun) {
    lvl = 0;
  }
  if (gameState == "death") {
    global.deathReset = true;
  }
  reset();
  if (!global.restartCount) {
    global.restartCount = 0;
  }
  global.restartCount++;
}
function restartAll() {
  checkpoint = null;
  restart();
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
  str = atob(str);
  stats = {
    pntr_dist: str.s(0, 2), // Polynomial time radix
    cheats: str[2] == 1,
    dateCode: parseInt(str.s(3, 16)),
    date: new Date(parseInt(str.s(3, 16))).toString(),
    debug: str[17] == 1,
    egg: str[18] == 1,
    speedrun: str[19] == 1,
    key: str[20] == 1,
    time: parseInt(str.s(21, 27)) / 100,
    deaths: parseInt(str[29]),
    restarts: parseInt(str[30]),
    graphics: parseInt(str[16]),
    levels: parseInt(str.s(27, 29)),
    disabledLevels: str[31] == 1,
    secretLevels: str[32] == 1,
    valid: str.s(-1) == 1,
    decoded: str,
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

/* Stop keys being pressed on tab / window change */
window.onblur = function () {
  F.keysDown = {};
}

function randomDecimal() {
  return (F.randomInt(0, 1000) / 1000)
}

/* Create particles */
function resetParticles() {
  particles = [];
  for (i = 0; i < data.particles.amount; i++) {
    particles.push({
      x: randomDecimal(),
      y: randomDecimal(),
      sx: randomDecimal(),
      sy: randomDecimal(),
      a: randomDecimal(),
      r: randomDecimal(),
      p: randomDecimal(),
    });
  }
}

/* Load disabled levels */
function enableLevels() {
  global.ignoreDisabled = true;
  loadLevels();
}
function unlockSecret() {
  global.secretUnlocked = true;
  loadLevels();
  console.log("What??");
}

/* Kill all enemies */
function killEnemies() {
  enemies.forEach((i) => {
    i.dead = Date.now();
  })
}

/* Collision checks */
function playerBlockCollision(name, func, noCrouch) {
  tech["bs_" + name] = [];
  cb = null;
  p = noCrouch ? {...playerHitNC} : {...playerHit};
  func(p);
  X: for (x = tech.player_minx; x < tech.player_maxx; x++) {
    for (y = tech.player_miny; y < tech.player_maxy; y++) {
      if (F.collide(p, {
        x: (x + 0.001) * tw,
        y: (y + 0.001) * tw,
        w: tw + 1,
        h: tw + 1,
      })) {
        tech["bs_" + name].push(grid[x][y]);
      }
    }
  }
  return tech["bs_" + name];
}
function collideAttr(arr, func) {
  val = false;
  for (i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      val = true;
      break;
    }
  }
  return val;
}
function getCollideAttr(arr, func) {
  for (i = 0; i < arr.length; i++) {
    output = func(arr[i]);
    if (output) {
      return output;
    }
  }
}

/* Functions for rendering transalted text */
function translateText(lang1, lang2, start, important) {
  if (data.graphics < 1 || data.graphics == 2) {
    return lang1;
  }
  output = lang1.split("");

  for (i = 0; i < output.length; i++) {
    output[i] = [0, output[i]];
    time0 = data.font.show_0;
    time1 = data.font.show_0 + data.font.show_1;
    if (important) {
      time0 = data.font.show_important_0;
      time1 = data.font.show_important_0 + data.font.show_important_1;
    }
    end = start + time1;

    if (end > Date.now()) {
      amount = 1 - (end - Date.now()) / (time1 - time0);
      a = 5;
      b = 4;
      if (b * (Math.sin(2 * Math.PI * i / a) + 1) >= output.length * amount) {
        char = lang2[i];
        output[i] = [1, ""];
        if (char) {
          output[i] = [1, char];
        }
      }
    }
  }
  return output;
}

function drawTranslated(ctx_, size, text, x, y, stroke) {
  if (data.graphics < 1 || data.graphics == 2) {
    ctx_.font = size + "px " + data.font.main;
    ctx_[(stroke ? "stroke" : "fill") + "Text"](
      text,
      x,
      y,
    );
    return;
  }
  oldSize = size;
  for (i = 0; i < output.length; i++) {
    font = output[i][0] ? data.font.alt : data.font.main;
    size = (output[i][0] ? data.font.alt_size : 1) * oldSize;
    ctx_.font = size + "px " + font;
    width = 0;
    wholeWidth = 0;
    for (k = 0; k < output.length; k++) {
      if (k < i) {
        width += ctx_.measureText(output[k][1]).width;
      }
      wholeWidth += ctx_.measureText(output[k][1]).width;
    }
    d = x;
    if (ctx_.textAlign == "center") {
      d = x - wholeWidth / 2;
    }
    if (ctx_.textAlign == "right") {
      d = x - wholeWidth;
    }
    ctx_[(stroke ? "stroke" : "fill") + "Text"](
      output[i][1],
      d + width + (output[i][0] ? data.font.alt_x * size : 0),
      y + (output[i][0] ? data.font.alt_y * size : 0),
    );
  }
}