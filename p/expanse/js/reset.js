function reset() {
  if (F.url.query.speedrun) {
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
  }

  /* Skip level if marked as disabled */
  if (!global.ignoreDisabled) {
    for (i = 0; i < levels.length; i++) {
      if (!levels[lvl] || levels[lvl].disabled) {
        lvl++;
      }
    }
  }
  /* Reset game if completed all levels */
  if (!levels[lvl]) {
    gameState = "end";
    global.timerEnd = ((Date.now() - global.timeStart) / 1000).toFixed(2).toString();

    finalTime = (parseFloat(global.timerEnd) * 100).toString().fill(6)
    stats = [
      global.stats.date ? (global.stats.date.toString().s(-1) + global.stats.date.toString().s(-3)) : "00",
      global.stats.cheats ? 1 : 0,
      global.stats.date,
      data.graphics,
      global.stats.debug ? 1 : 0,
      global.stats.egg ? 1 : 0,
      F.url.query.speedrun ? 1 : 0,
      global.stats.key ? 1 : 0,
      finalTime.length > 6 ? "9".repeat(6) : (isNaN(finalTime) ? "9".repeat(6) : finalTime),
      loadedLevels.length.toString().fill(2),
      global.deaths,
      global.restartCount || 0,
      ((global.pntr - global.delta_pntr) + global.stats.dist__ * (finalTime % 10)) / ((Date.now() - 1000) / 10) // Polynomial time radix
    ];
    stat = stats.splice(0, stats.length - 1).join("");
    stat += stat.length == 31 ? 1 : 0;
    global.lastStats = stat;

    console.log("You finished the game!\nHello :)\nYour personal completion key is:\n{0}".format(stat));
    return;
  }

  /* Load all levels */
  check = null;
  if (player && global.wasDeath) {
    check = player.check;
  }
  if (gameState == "load") {
    loadLevels();
    resetParticles();
  }
  setLevel(lvl);
  global.playerMoveAmount = 0;
  if (check) {
    player.x = check.x;
    player.y = check.y;
    player.check = check;
  }

  /* Start level */
  if (gameState != "load" && gameState != "start") {
    gameState = "play";
  }
  frame.start();
  global.lastRestart = Date.now();

  if (lvl == 0) {
    global.stats = {
      debug: false,
      cheats: false,
      egg: false,
      key: false,
      time: null,
      date: Date.now(),
    };
    global.timeStart = Date.now();
    global.deaths = 0;
    global.restartCount = 0;
  }
}