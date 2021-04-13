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
  data.graphics = doc.id("graphics").checked ? 0 : 3
}