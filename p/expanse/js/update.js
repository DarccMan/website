
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  if (keysDown.game_restart) {
    // location.reload();
    reset();
  }
  /* Create player hitbox */
  playerHit = {...player};
  playerHit.w *= data.player.hitX;
  playerHit.h *= data.player.hitY;
  playerHit.x += player.w / 2 - playerHit.w / 2;
  playerHit.y += player.h - playerHit.h;
  if (gameState == "play") {
    /* Find closest block to player to not loop over every block */
    px = ((player.x + (player.w / 2 - (player.w * (data.player.hitX) / 2))) + (player.w * data.player.hitX)) / tw;
    py = ((player.y + (player.h - player.h * (data.player.hitY))) + (player.h * data.player.hitY)) / tw;
    reach = 2;
    minx = Math.max(Math.floor(px - reach), 0);
    maxx = Math.min(Math.floor(px + reach), grid.length);
    miny = Math.max(Math.floor(py - reach), 0);
    maxy = Math.min(Math.floor(py + reach), grid[0].length);

    /* Player fall */
    cb = null;
    p = {...playerHit};
    p.y += p.vy;
    X: for (x = minx; x < maxx; x++) {
      for (y = miny; y < maxy; y++) {
        if (data.collide.includes(grid[x][y].block)) {
          if (F.collide(p, {
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
    if (!cb) {
      player.vy += data.v.fa * mod * (10 / data.tiles);
    } else {
      player.vy = 0;
    }

    /* Player jump */
    if (keysDown.player_up) {
      if (
        player.jumpTime > Date.now() - data.v.jm
        && player.jumpTime < Date.now() - data.v.jc
      ) {
        player.vy -= data.v.ja;
      }
      cb = null;
      p = {...playerHit};
      p.y += p.vy + p.h - 1;
      p.h = 1;
      X: for (x = minx; x < maxx; x++) {
        for (y = miny; y < maxy; y++) {
          if (data.collide.includes(grid[x][y].block)) {
            if (F.collide(p, {
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
      if (cb) {
        val = true;
        player.jumpTime = Date.now();
        player.vy -= data.v.jb * (10 / data.tiles);
      }
    }

    /* Player X movement */
    switch (F.bool_bin(keysDown.player_left, keysDown.player_right)) {
      case "10": {
        player.vx -= data.v.ma * mod;
        player.flip = -1;
        player.status = "run";
      }; break;
      case "01": {
        player.vx += data.v.ma * mod;
        player.flip = 1;
        player.status = "run";
      }; break;
      default: {
        player.vx = Math.sign(player.vx) * (Math.abs(player.vx) - data.v.ma * mod);
        if (Math.abs(player.vx - 0) < data.v.mm) {
          player.vx = 0;
        }
        player.status = "idle";
      };
    }

    /* Player hit wall */
    cb = null;
    p = {...playerHit};
    p.x += player.vx;
    p.y += p.vy - 1;
    X: for (x = minx; x < maxx; x++) {
      for (y = miny; y < maxy; y++) {
        if (data.collide.includes(grid[x][y].block)) {
          if (F.collide(p, {
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
    if (cb) {
      player.vx = 0;
    }

    /* Minimum and maximum velocity */
    player.vx = Math.min(Math.max(player.vx, - data.v.mt), data.v.mt);
    player.vy = Math.min(Math.max(player.vy, - data.v.jt), data.v.ft);

    if (F.diff(player.vy, 0) > 2) {
      player.status = "jump";
    }

    /* Add velocity to player position */
    player.x += player.vx;
    player.y += player.vy;

    /* Stop player getting stuck in block */
    cb = null;
    p = {...playerHit};
    p.y -= 1;
    X: for (x = minx; x < maxx; x++) {
      for (y = miny; y < maxy; y++) {
        if (grid[x][y].block != "none") {
          if (F.collide(p, {
            x: (x + 0.001) * tw,
            y: (y + 0.001) * tw,
            w: tw + 1,
            h: tw + 1,
          })) {
            if (data.collide.includes(grid[x][y].block)) {
              cb = grid[x][y];
              break X;
            } else if (data.win.includes(grid[x][y].block)) {
              goal();
              break X;
            } else if (data.death.includes(grid[x][y].block)) {
              death();
              break X;
            }
          }
        }
      }
    }
    if (cb) {
      player.y--;
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
        || !data.light.includes(player.hold)
      ) {
        if (F.collide(p, enemies[i])) {
          death();
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
      if (data.enemies[enemies[i].type].attr.avoidLight && data.light.includes(player.hold)) {
        dir = -1;
      }
      enemies[i].vx += dir * Math.sign(player.x - enemies[i].x) * data.enemies[enemies[i].type].v.ma * mod;
      enemies[i].flip = dir * - Math.sign(player.x - enemies[i].x);

      /* Enemy stop X collision */
      cb = null;
      e = {...enemies[i]};
      e.x += e.vx;
      e.y -= 1;
      X: for (x = minex; x < maxex; x++) {
        for (y = miney; y < maxey; y++) {
          if (data.enemies[enemies[i].type].collide.includes(grid[x][y].block)) {
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
        enemies[i].vx = 0;
      }

      /* Enemy stop falling */
      cb = null;
      e = {...enemies[i]};
      e.x += e.vx;
      X: for (x = minex; x < maxex; x++) {
        for (y = miney; y < maxey; y++) {
          if (data.enemies[enemies[i].type].collide.includes(grid[x][y].block)) {
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

      /* Enemy fall */
      if (data.enemies[enemies[i].type].attr.fall) {
        cb = null;
        e = {...enemies[i]};
        e.x += e.vx;
        e.y += e.vy;
        X: for (x = minex; x < maxex; x++) {
          for (y = miney; y < maxey; y++) {
            if (data.enemies[enemies[i].type].collide.includes(grid[x][y].block)) {
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
          enemies[i].vy += data.enemies[enemies[i].type].v.fa;
        }
      }

      /* Min and max enemy velocity */
      enemies[i].vx = Math.min(Math.max(enemies[i].vx, - data.enemies[enemies[i].type].v.mt), data.enemies[enemies[i].type].v.mt);
      enemies[i].vy = Math.min(Math.max(enemies[i].vy), data.enemies[enemies[i].type].v.ft);

      /* Add velocity to enemy position */
      enemies[i].x += enemies[i].vx;
      enemies[i].y += enemies[i].vy;

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
            if (data.enemies[enemies[i].type].collide.includes(grid[x][y].block)) {
              cb = grid[x][y].block;
              break X;
            } else if (data.enemies[enemies[i].type].death.includes(grid[x][y].block)) {
              enemies[i].dead = Date.now();
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
        enemies[i].y--;
      }
    }

    if (keysDown.player_pick) {
      /* Pick up block */
      if (!player.hold) {
        x = Math.floor((playerHit.x + playerHit.w / 2) / tw);
        y = Math.floor((playerHit.y + playerHit.h / 2) / tw);
        if (
          grid[x]
          && grid[y]
        ) {
          switch (grid[x][y].block) {
            case "torch": {
              player.hold = "torch";
              grid[x][y] = {
                block: "none"
              };
            }; break;
          }
        }
      }
    } else if (keysDown.player_drop) {
      /* Drop block */
      if (player.hold) {
        x = Math.floor((playerHit.x + playerHit.w / 2) / tw);
        y = Math.floor((playerHit.y + playerHit.h / 2) / tw);
        if (
          grid[x]
          && grid[y]
        ) {
          if (grid[x][y].block == "none") {
            switch (player.hold) {
              case "torch": {
                player.hold = null;
                grid[x][y] = {
                  block: "torch"
                };
              }; break;
            }
          }
        }
      }
    }
  } else if (gameState == "start") {
    if (keysDown.game_start) {
      gameState = "play";
      global.lastRestart = Date.now();
    }
  }

  /* Debug mode */
  if (keysDown.debug) {
    /* Show hitboxes */
    p = {...playerHit};
    ctx.fillStyle = "#0F08";
    ctx.fillRect(
      - cam.x + p.x + player.vx,
      - cam.y + p.y + player.vy + 1,
      p.w,
      p.h,
    );

    for (i = 0; i < enemies.length; i++) {
      ctx.fillStyle = "#F0F8";
      ctx.fillRect(
        - cam.x + enemies[i].x + enemies[i].vx,
        - cam.y + enemies[i].y + enemies[i].vy,
        enemies[i].w,
        enemies[i].h,
      );
    }

    /* Move player */
    if (F.mouse.onCanvas) {
      if (F.buttonDown(0)) {
        player.x += - ((- cam.x + player.x) - F.mouse.x) * mod * 5;
        player.y += - ((- cam.y + player.y) - F.mouse.y) * mod * 5;
        player.vx = 0;
        player.vy = 0;
      }
    }

    /* Skip level */
    if (keysDown.debug_skipLevel) {
      if (global.keyOnce_skipLevel) {
        goal();
        global.keyOnce_skipLevel = false;
      }
    } else {
      global.keyOnce_skipLevel = true;
    }
  }
  /* Toggle debug mode */
  if (keysDown.debug_all) {
    if (gameState != "debug") {
      global.lastGameState = gameState;
      gameState = "debug";
    }
  } else {
    if (gameState == "debug") {
      gameState = global.lastGameState || "play";
    }
  }

  /* Align camera to player position */
  cam.x = player.x + (player.w / 2) - (canvas.width * data.cam.x);
  cam.y = player.y + (player.h / 2) - (canvas.height * data.cam.y);
}


/* Nothing to see here :) */
fancy = [68, 65, 66, 65, 66, 89];
onkeydown = function (e) {
  if (!global.prevKeys) {
    global.prevKeys = [];
  }
  global.prevKeys.push(e.keyCode);

  if (global.prevKeys.s(-fancy.length, -1).join(",") == fancy.join(",")) {
    alert("LETS GO!!");
  }
}