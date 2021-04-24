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
  for (i = 0; i < levels.length; i++) {
    if (!levels[lvl] || levels[lvl].disabled) {
      lvl++;
    }
  }
  /* Reset game if completed all levels */
  if (!levels[lvl]) {
    gameState = "end";
    global.timerEnd = ((Date.now() - global.timeStart) / 1000).toFixed(2).toString();

    finalTime = (parseFloat(global.timerEnd) * 100).toString().fill(6)
    stats = [
      1,
      global.stats.cheats ? 1 : 0,
      global.stats.date,
      data.graphics,
      global.stats.debug ? 1 : 0,
      global.stats.egg ? 1 : 0,
      F.url.query.speedrun ? 1 : 0,
      global.stats.key ? 1 : 0,
      finalTime.length > 6 ? "9".repeat(6) : finalTime,
      levels.length.toString().fill(2),
      global.deaths,
      global.restartCount,
    ];
    stat = stats.join("");
    stat += stat.length == 29 ? 1 : 0;
    global.lastStats = stat;

    console.log("You finished the game!\nHello :)\nYour personal completion key is:\n{0}".format(stat));
    return;
  }

  /* Load all levels */
  if (gameState == "load") {
    loadLevels();
  }
  setLevel(lvl);
  global.playerMoveAmount = 0;

  /* Start level */
  if (gameState != "load" && gameState != "start") {
    gameState = "play";
  }
  frame.start();
  global.lastRestart = Date.now();
  global.stats = {
    debug: false,
    cheats: false,
    egg: false,
    key: false,
    time: null,
    date: Date.now(),
  };

  if (lvl == 0) {
    global.timeStart = Date.now();
    global.deaths = 0;
    global.restartCount = 0;
  }
}