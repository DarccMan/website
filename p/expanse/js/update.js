
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  if (keysDown.game_restart) {
    if (!["start", "end", "load"].includes(gameState)) {
      if (global.keyOnce_restart) {
        if (keysDown.game_restart_all) {
          restartAll();
        } else {
          restart();
        }
        global.keyOnce_restart = false;
      }
    }
  } else {
    global.keyOnce_restart = true;
  }

  /* Create player hitbox */
  playerHit = {...player};
  if (!["load", "start", "end"].includes(gameState)) {
    playerHit.w *= data.player.hitX;
    playerHit.h *= data.player.hitY;
    playerHit.x += player.w / 2 - playerHit.w / 2;
    playerHit.y += player.h - playerHit.h;
    playerHitNC = {...playerHit}; // No crouch
    if (player.crouch) {
      playerHit.y += player.h - (data.player.ch * tw);
      playerHit.y -= 3;
      playerHit.h = data.player.ch * tw;
    }
  }
  if (gameState == "pause") {
    if (keysDown.game_pause) {
      if (global.keyOnce_pause) {
        gameState = "play";
        global.keyOnce_pause = false;
        if (global.lastPause) {
          global.timeStart += Date.now() - global.lastPause;
        }
        global.lastTime = null;
      }
    } else {
      global.keyOnce_pause = true;
    }
  } else if (gameState == "play") {
    if (keysDown.game_pause) {
      if (global.keyOnce_pause) {
        gameState = "pause";
        global.keyOnce_pause = false;
        global.lastPause = Date.now();
        global.lastTime = Date.now() - global.timeStart;
      }
    } else {
      global.keyOnce_pause = true;
    }

    if (!global.stats) {
      global.stats = {};
    }
    /* Find closest block to player to not loop over every block */
    px = ((player.x + (player.w / 2 - (player.w * (data.player.hitX) / 2))) + (player.w * data.player.hitX)) / tw;
    py = ((player.y + (player.h - player.h * (data.player.hitY))) + (player.h * data.player.hitY)) / tw;
    reach = 2;
    tech.player_minx = Math.max(Math.floor(px - reach), 0);
    tech.player_maxx = Math.min(Math.floor(px + reach), grid.length);
    tech.player_miny = Math.max(Math.floor(py - reach), 0);
    tech.player_maxy = Math.min(Math.floor(py + reach), grid[0].length);

    /* Get collisions */
    playerBlockCollision("in", (p) => { });
    playerBlockCollision("invx", (p) => {
      p.x += player.vx;
      s = 1;
      p.x += s;
      p.w -= s * 2;
      p.y += p.h;
      p.h = 5;
      p.y -= p.h;
    });
    playerBlockCollision("un", (p) => {
      p.y += player.vy;
      p.y += p.h;
      p.h = 5;
      p.y -= p.h;
    });
    playerBlockCollision("ab", (p) => {
      p.h = 5;
      p.y -= p.h + 6;
    }, true);

    /* Crouch */
    moved = false;
    playerSpeed = 1;
    if (keysDown.player_crouch) {
      moved = true;
      player.crouch = true;
      player.status = "crouch";
      player.vy += data.v.cfa * data.v.fa;
      playerSpeed = data.v.cma;
    } else {
      /* Dont uncrouch if block above */
      if (!collideAttr(tech.bs_ab, i => (
        data.blocks[i.block].collide
        && !data.blocks[i.block].walkInto
      ))) {
        player.crouch = false;
      }
    }

    /* Fall */
    if (!collideAttr(tech.bs_un, i => data.blocks[i.block].collide)) {
      player.vy += data.v.fa * mod * (10 / data.tiles);
    } else {
      player.vy = 0;
    }

    /* Hit block above */
    if (collideAttr(tech.bs_ab, i => (
      data.blocks[i.block].collide
      && !data.blocks[i.block].walkInto
    ))) {
      player.vy = player.vy.setBorder(0, Infinity);
    }

    /* Crouch in scaffold -> Go down */
    playerBlockCollision("unvy", (p) => {
      p.y += player.vy;
      p.y += p.h;
      p.h = 5;
      p.y -= p.h;
      p.vy += data.v.da * mod;
      p.vy = p.vy.setBorder(- Infinity, data.v.dt);
    });
    if (
      player.crouch
      && collideAttr(tech.bs_un, i => data.blocks[i.block].walkInto)
    ) {
      if (!collideAttr(tech.bs_unvy, i => (
        data.blocks[i.block].collide
        && !data.blocks[i.block].walkInto
      ))) {
        player.vy += data.v.da * mod;
        player.vy = player.vy.setBorder(- Infinity, data.v.dt);
      }
    }

    /* Jump */
    if (keysDown.player_up) {
      moved = true;
      if (!player.crouch) {
        if (global.keyOnce_start) {
          if (collideAttr(tech.bs_un, i => data.blocks[i.block].collide)) {
            val = true;
            player.jumpTime = Date.now();
            player.vy -= data.v.jb * (10 / data.tiles);
          }
        }
      }
    } else {
      global.keyOnce_start = true;
    }

    /* Go up in up block */
    if (collideAttr(tech.bs_un, i => data.blocks[i.block].up)) {
      player.vy -= getCollideAttr(tech.bs_un, i => data.blocks[i.block].up);
    }

    /* Player X movement */
    switch (F.bool_bin(keysDown.player_left, keysDown.player_right)) {
      case "10": {
        speed = playerSpeed;
        if (collideAttr(tech.bs_un, i => data.blocks[i.block].slip)) {
          speed *= getCollideAttr(tech.bs_un, i => data.blocks[i.block].slip);
        }
        player.vx -= data.v.ma * mod * speed;
        player.flip = -1;
        if (!player.crouch) {
          player.status = "run";
        }
        moved = true;
      }; break;
      case "01": {
        speed = playerSpeed;
        if (collideAttr(tech.bs_un, i => data.blocks[i.block].slip)) {
          speed *= getCollideAttr(tech.bs_un, i => data.blocks[i.block].slip);
        }
        player.vx += data.v.ma * mod * speed;
        player.flip = 1;
        if (!player.crouch) {
          player.status = "run";
        }
        moved = true;
      }; break;
      default: {
        speed = data.v.md;
        if (collideAttr(tech.bs_un, i => data.blocks[i.block].slip)) {
          speed *= getCollideAttr(tech.bs_un, i => data.blocks[i.block].slip);
        }
        player.vx = Math.sign(player.vx) * (Math.abs(player.vx) - speed * mod);
        if (Math.abs(player.vx - 0) < data.v.mm) {
          player.vx = 0;
        }
        if (!player.crouch) {
          player.status = "idle";
        }
      };
    }

    if (moved) {
      if (
        F.url.query.speedrun
        && global.speedrunOnce
        && lvl == 0
      ) {
        global.speedrunOnce = false;
        global.timeStart = Date.now();
      }
    }

    /* Player hit wall */
    playerBlockCollision("inv", (p) => {
      p.x += player.vx;
      p.y += player.vy;
      p.y -= 1;
    });
    if (!tech.in_block) {
      if (collideAttr(tech.bs_inv, i => (
        data.blocks[i.block].collide
        && !data.blocks[i.block].walkInto
      ))) {
        player.vx = 0;
      }
    }

    /* Crouching don't fall off */
    if (
      player.crouch
      && collideAttr(tech.bs_un, i => data.blocks[i.block].collide)
    ) {
      if (
        !collideAttr(tech.bs_invx, i => (
          data.blocks[i.block].collide
        ))
      ) {
        player.vx = 0;
      }
    }

    /* Minimum and maximum velocity */
    player.vx = Math.min(Math.max(player.vx, - data.v.mt), data.v.mt);
    player.vy = Math.min(Math.max(player.vy, - data.v.jt), data.v.ft);

    if (!player.crouch) {
      if (F.diff(player.vy, 0) > 4) {
        player.status = "jump";
      }
    } else {
      player.vx = Math.min(Math.max(player.vx, - (data.v.mt * data.v.cmt)), (data.v.mt * data.v.cmt));
      player.vy = Math.min(Math.max(player.vy, - (data.v.jt * data.v.cft)), data.v.ft * data.v.cft);
    }

    /* Add velocity to player position */
    old = {...player};
    player.x += player.vx;
    player.y += player.vy;

    /* Check for change in movement */
    if (
      old.x != player.x
      || old.y != player.y
    ) {
      if (!global.playerMoveAmount) {
        global.playerMoveAmount = 0;
      }
      global.playerMoveAmount++;
    }

    /* Stop player getting stuck in block */
    cb = null;
    p = {...playerHit};
    p.y -= 1;
    cx = null;
    cy = null;
    X: for (x = tech.player_minx; x < tech.player_maxx; x++) {
      for (y = tech.player_miny; y < tech.player_maxy; y++) {
        if (grid[x][y].block != "none") {
          if (F.collide(p, {
            x: (x + 0.001) * tw,
            y: (y + 0.001) * tw,
            w: tw + 1,
            h: tw + 1,
          })) {
            if (
              data.blocks[grid[x][y].block]?.walkInto
            ) {
              if (keysDown.player_up) {
                player.y -= tw * 0.1;
              }
            } else if (
              data.blocks[grid[x][y].block]?.collide
              && !data.blocks[grid[x][y].block]?.walkInto
            ) {
              cx = x;
              cy = y;
              cb = grid[x][y];
              break X;
            } else if (data.blocks[grid[x][y].block]?.goal) {
              goal();
              break X;
            } else if (data.blocks[grid[x][y].block]?.death) {
              death();
              break X;
            }
          }
        }
      }
    }
    if (cb && (!global.debug_move || global.debug_move + 50 < Date.now())) {
      /* Move player to nearest empty block */
      /* Jee wizz how does this work??? */
      distance = Math.max(grid.length, grid[0].length);
      dirs = [
        [0, 1], // Down
        [0, -1], // Up
        [-1, 0], // Right
        [1, 0], // Left
      ];
      D: for (d = 1; d < distance; d++) {
        mins = [];
        for (r = 0; r < dirs.length; r++) {
          bx = cx + dirs[r][0] * d;
          by = cy + dirs[r][1] * d;
          if (!grid[bx]?.[by] || grid[bx]?.[by]?.block == "none") {
            mins[r] = ({
              d,
              dx: dirs[r][0],
              dy: dirs[r][1],
            });
          }
        }
        if (mins.length > 0) {
          min = {
            m: null,
            d: Infinity,
          };
          for (m = 0; m < mins.length; m++) {
            if (mins[m]) {
              if (Math.abs(mins[m].d) < Math.abs(min.d)) {
                min = {
                  m,
                  ...mins[m],
                };
              }
            }
          }

          if (min.m !== null) {
            player.x += min.dx * Math.max(min.d, 0) * tw * 0.05;
            player.y += min.dy * Math.max(min.d, 0) * tw * 0.05;
            if (min.dy > 0) {
              player.crouch = true;
              player.status = "crouch";
            }
          }
          break D;
        }
      }
      ctx.globalAlpha = 1;

      tech.in_block = true;
    } else {
      tech.in_block = false;
    }

    if (player.y / tw > grid[0].length + data.floor_gap - 0.7) {
      death();
    }

    /* Enemies */
    p = {...playerHit};
    for (i = 0; i < enemies.length; i++) {
      if (enemies[i].dead) {
        continue;
      }
      /* Player death from enemy */
      if (
        !data.enemies[enemies[i].type].attr.avoidLight
        || !data.blocks[player?.hold?.block]?.light
      ) {
        if (F.collide(p, enemies[i])) {
          if (data.enemies[enemies[i].type].attr.weak) {
            enemies[i].dead = Date.now();
          } else {
            death();
          }
          break;
        }
      }

      /* Get enemy hitbox */
      ex = (enemies[i].x + (enemies[i].w / 2)) / tw;
      ey = (enemies[i].y + (enemies[i].h / 2)) / tw;
      reach = 2;
      minex = Math.max(Math.floor(ex - reach), 0);
      maxex = Math.min(Math.floor(ex + reach), grid.length);
      miney = Math.max(Math.floor(ey - reach), 0);
      maxey = Math.min(Math.floor(ey + reach), grid[0].length);

      /* Move enemy towards / away from player */
      dir = 1;
      if (
        data.enemies[enemies[i].type].attr.avoidLight
        && data.blocks[player?.hold?.block]?.light
      ) {
        dir = -1;
      }
      fast = 1;
      if (enemies[i].type == "skelly") {
        fast = Math.max(1, (500 - Math.abs(player.x - enemies[i].x)) * 0.01);
      }
      enemies[i].vx += dir * Math.sign(player.x - enemies[i].x) * data.enemies[enemies[i].type].v.ma * mod * fast;
      enemies[i].flip = dir * - Math.sign(player.x - enemies[i].x);

      if (data.enemies[enemies[i].type].attr.fly) {
        dir = 1;
        if (
          data.enemies[enemies[i].type].attr.avoidLight
          && data.blocks[player?.hold?.block]?.light
        ) {
          dir = -1;
        }
        enemies[i].vy += dir * Math.sign(player.y - enemies[i].y) * data.enemies[enemies[i].type].v.ma * mod;
        enemies[i].flip = dir * - Math.sign(player.y - enemies[i].y);
      }

      /* Enemy stop X collision */
      cb = null;
      e = {...enemies[i]};
      e.x += e.vx;
      e.y -= 1;
      X: for (x = minex; x < maxex; x++) {
        for (y = miney; y < maxey; y++) {
          if (data.enemies[enemies[i].type]?.collide.includes(grid[x][y].block)) {
            if (F.collide(e, {
              x: (x + 0.001) * tw,
              y: (y + 0.001) * tw,
              w: tw + 1,
              h: tw + 1,
            })) {
              cb = grid[x][y];
              break X;
            }
          }
        }
      }
      X: for (j = 0; j < enemies.length; j++) {
        if (i == j) {
          continue;
        }
        if (enemies[j].dead) {
          continue;
        }
        if (F.collide(e, enemies[j])) {
          cb = enemies[j];
          break X;
        }
      }
      if (cb) {
        enemies[i].vx = 0;
      }

      /* Enemy fall */
      if (data.enemies[enemies[i].type].attr.fall) {
        cb = null;
        e = {...enemies[i]};
        e.x += e.vx;
        e.y += e.vy;
        X: for (x = minex; x < maxex; x++) {
          for (y = miney; y < maxey; y++) {
            if (data.enemies[enemies[i].type]?.collide.includes(grid[x][y].block)) {
              if (F.collide(e, {
                x: (x + 0.001) * tw,
                y: (y + 0.001) * tw,
                w: tw + 1,
                h: tw + 1,
              })) {
                cb = grid[x][y];
                break X;
              }
            }
          }
        }
        X: for (j = 0; j < enemies.length; j++) {
          if (i == j) {
            continue;
          }
          if (F.collide(e, enemies[j])) {
            cb = enemies[j];
            break X;
          }
        }
        if (!cb) {
        }
        enemies[i].vy += data.enemies[enemies[i].type].v.fa;
      }

      /* Enemy stop falling */
      cb = null;
      e = {...enemies[i]};
      e.x += e.vx;
      e.y += e.vy;
      X: for (x = minex; x < maxex; x++) {
        for (y = miney; y < maxey; y++) {
          if (data.enemies[enemies[i].type]?.collide.includes(grid[x][y].block)) {
            if (F.collide(e, {
              x: (x + 0.001) * tw,
              y: (y + 0.001) * tw,
              w: tw + 1,
              h: tw + 1,
            })) {
              cb = grid[x][y];
              break X;
            }
          }
        }
      }
      X: for (j = 0; j < enemies.length; j++) {
        if (i == j) {
          continue;
        }
        if (F.collide(e, enemies[j])) {
          cb = enemies[j];
          break X;
        }
      }
      if (cb) {
        enemies[i].vy = 0;
      }

      /* Min and max enemy velocity */
      enemies[i].vx = Math.min(Math.max(enemies[i].vx, - data.enemies[enemies[i].type].v.mt), data.enemies[enemies[i].type].v.mt);
      enemies[i].vy = Math.min(Math.max(enemies[i].vy), data.enemies[enemies[i].type].v.ft);

      /* Add velocity to enemy position */
      enemies[i].x += enemies[i].vx;
      enemies[i].y += enemies[i].vy;

      /* Shaky rats */
      dist = 2;
      if (data.enemies[enemies[i].type].attr.rat) {
        amount = 0;
        X: for (j = 0; j < enemies.length; j++) {
          if (i == j) {
            continue;
          }
          if (
            Math.abs(enemies[i].x - enemies[j].x) < tw * dist
            && Math.abs(enemies[i].y - enemies[j].y) < tw * dist
          ) {
            amount++;
            if (amount >= 5) {
              enemies[i].y += (((Date.now() + enemies[i].stamp / 100).round() % 2) * 2 - 1) * mod * data.SHAKY;
              break X;
            }
          }
        }
      }

      /* Stop enemy getting stuck in block */
      cb = null;
      e = {...enemies[i]};
      e.y += 1;
      X: for (x = minex; x < maxex; x++) {
        for (y = miney; y < maxey; y++) {
          if (F.collide(e, {
            x: (x + 0.001) * tw,
            y: (y + 0.001) * tw,
            w: tw + 1,
            h: tw + 1,
          })) {
            if (data.enemies[enemies[i].type]?.collide.includes(grid[x][y].block)) {
              cb = grid[x][y].block;
              break X;
            } else if (data.enemies[enemies[i].type].death.includes(grid[x][y].block)) {
              enemies[i].dead = Date.now();
            }
          }
        }
      }
      X: for (j = 0; j < enemies.length; j++) {
        if (i <= j) {
          continue;
        }
        if (F.collide(e, enemies[j])) {
          cb = enemies[j];
          break X;
        }
      }
      if (cb) {
        enemies[i].y--;
      }
    }

    if (keysDown.player_use) {
      if (global.keyOnce_use) {
        global.keyOnce_use = false;
        x = Math.floor((playerHit.x + playerHit.w / 2) / tw);
        y = Math.floor((playerHit.y + playerHit.h / 2) / tw);
        if (grid[x]?.[y]) {
          other = true;
          if (player?.hold) {
            if (grid[x][y].block == "none") {
              grid[x][y] = player.hold;
              player.hold = null;
              other = false;
            }
          } else {
            if (data.blocks[grid[x][y].block].pick) {
              player.hold = grid[x][y];
              grid[x][y] = {
                block: "none",
              };
              other = false;
            }
          }
          if (data.blocks[grid[x][y].block].check) {
            checkpoint = {
              x: (x + 0.5) * tw - player.w / 2,
              y: player.y - player.h * 0.4,
              bx: x,
              by: y,
              lvl,
            };
            for (x1 = 0; x1 < grid.length; x1++) {
              for (y1 = 0; y1 < grid[x1].length; y1++) {
                grid[x1][y1].down = false;
              }
            }
            grid[x][y].down = true;
            other = false;
          }
          if (other) {
            canHold = false;
            if (data.blocks[grid[x][y].block].use) {
              switch (grid[x][y].block) {
                case "sign": {
                  global.signText = grid[x][y].text || lang.no_text;
                  global.lastReadSign = Date.now();
                  canHold = true;
                }; break;
              };
            }
            if (canHold) {
              global.keyOnce_use = true;
            }
          }
        }
      }
    } else {
      global.keyOnce_use = true;
    }
  } else if (gameState == "start") {
    if (keysDown.game_start) {
      if (global.keyOnce_start) {
        global.keyOnce_start = false;
        startPlay();
      }
    } else {
      global.keyOnce_start = true;
    }
  } else if (gameState == "end") {
    if (keysDown.game_start) {
      if (!F.url.query.speedrun) {
        gameState = "start";
        global.keyOnce_start = false;
        global.lastStart = Date.now();
      } else {
        startPlay();
      }
    }
  }

  if (keysDown.graphics_increase) {
    if (global.keyOnce_graphicsI + 300 < Date.now()) {
      graphicsUp();
      global.keyOnce_graphicsI = Date.now();
    }
  } else {
    global.keyOnce_graphicsI = null;
  }

  if (keysDown.graphics_decrease) {
    if (global.keyOnce_graphicsD + 300 < Date.now()) {
      graphicsDown();
      global.keyOnce_graphicsD = Date.now();
    }
  } else {
    global.keyOnce_graphicsD = null;
  }

  global.debug_shadow = false;
  global.debug_show = false;
  if (gameState != "load") {
    /* Debug mode */
    if (keysDown.debug) {
      global.stats.debug = true;
      global.debug_show = true;

      /* Move player */
      if (F.mouse.onCanvas) {
        if (F.buttonDown(0)) {
          player.x += - ((- cam.x + player.x + player.w / 2) - F.mouse.x) * mod * 5;
          player.y += - ((- cam.y + player.y + player.h / 2) - F.mouse.y) * mod * 5;
          player.vx = 0;
          player.vy = 0;
          global.stats.cheats = true;
          global.debug_move = Date.now();
        }
      }

      /* Show shadows */
      if (keysDown.debug_shadow) {
        global.debug_shadow = true;
      }

      /* Skip level */
      val = true;
      switch (F.bool_bin(keysDown.level_decrease, keysDown.level_increase)) {
        case "10": {
          val = false;
          if (global.keyOnce_level) {
            global.stats.cheats = true;
            global.keyOnce_level = false;
            if (lvl == 0) {
              lvl = levels.length - 1;
            } else {
              lvl = (lvl - 1 + levels.length) % levels.length;
            }
            reset();
          }
        }; break;
        case "01": {
          val = false;
          if (global.keyOnce_level) {
            global.stats.cheats = true;
            global.keyOnce_level = false;
            if (lvl + 1 >= levels.length) {
              lvl++;
            } else {
              lvl = (lvl + 1 + levels.length) % levels.length;
            }
            if (gameState == "end") {
              lvl = 0;
            }
            reset();
          }
        }; break;
      }
      if (val) {
        global.keyOnce_level = true;
      }

      /* Toggle debug freeze */
      if (keysDown.debug_kill) {
        killEnemies();
        global.disableEnemies = true;
      }
      if (keysDown.debug_freeze) {
        if (gameState != "freeze") {
          global.lastGameState_debug = gameState;
          global.stats.debug = true;
          gameState = "freeze";
        }
      } else {
        if (gameState == "freeze") {
          gameState = global.lastGameState_debug || "play";
        }
      }
    }
  }
}


/* Nothing to see here :) */
fancy = {
  a: [68, 65, 66, 65, 66, 89],
  b: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
  c: [83, 75, 69, 76, 76, 89],
  d: [45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45],
};
onkeydown = function (e) {
  if (!global.prevKeys) {
    global.prevKeys = [];
  }
  global.prevKeys.push(e.keyCode);

  for (i = 0; i < fancy.keys().length; i++) {
    if (global.prevKeys.s(-fancy.values()[i].length, -1).join(",") == fancy.values()[i].join(",")) {
      switch (fancy.keys()[i]) {
        case "a": {
          alert("LETS GO!!");
          global.stats.key = true;
        }; break;
        case "b": {
          if (lvl == 1) {
            console.log("Cool.");
            player.x = 21 * tw;
            player.y = 6.5 * tw;
            player.vx = 0;
            player.vy = 0;
            player.flip = -1;
          }
          global.stats.cheats = true;
          global.stats.key = true;
        }; break;
        case "c": {
          if (gameState == "end") {
            if (!global.drawSkelly || global.drawSkelly + 1500 < Date.now()) {
              global.drawSkelly = Date.now();
            }
          }
          global.stats.key = true;
        }; break;
        case "d": {
          unlockSecret();
          global.prevKeys.push("buffer");
        }; break;
      }
    }
  }
}