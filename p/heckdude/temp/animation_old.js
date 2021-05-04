function death() {
  gameState = "death";
  overlay.a = 100;
  overlay.type = "death";
  reset();
  val.pass = false;
  setTimeout(() => {
    F.interval("death_fade", (i, m) => {
      overlay.a = 100 - (i * (100 / m));
    }, 100, 1, () => {
      overlay.a = 0;
    });
  }, 200);
}

function goal() {
  gameState = "goal";
  overlay.a = 0;
  overlay.type = "goal";
  F.interval("goal_fadeOut", (i, m) => {
    overlay.a = i * (100 / m);
  }, 50, 1, () => {
    lvl++;
    val.pass = false;
    if (lvl >= lvls.length) {
      timer.stop();
      complete();
    } else {
      reset();
    }
    overlay.a = 100;
    setTimeout(() => {
      F.interval("goal_fadeIn", (i, m) => {
        overlay.a = 100 - (i * (100 / m));
      }, 30, 1, () => {
        overlay.a = 0;
      });
    }, 80);
  });
}