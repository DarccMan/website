function reset() {
  /* Skip level if marked as disabled */
  for (i = 0; i < levels.length; i++) {
    if (!levels[lvl] || levels[lvl].disabled) {
      lvl++;
    }
  }
  /* Reset game if completed all levels */
  if (!levels[lvl]) {
    console.log("You finished the game!\nHello :)");
    gameState = "end";
    global.timerEnd = ((Date.now() - global.timeStart) / 1000).toFixed(2).toString();
    return;
  }
  setLevel(lvl);

  /* Start level */
  if (gameState != "load" && gameState != "start") {
    gameState = "play";
  }
  frame.start();
  global.lastRestart = Date.now();

  if (lvl == 0) {
    global.timeStart = Date.now();
  }
}