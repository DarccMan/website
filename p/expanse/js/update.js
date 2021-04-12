
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  if (keysDown.game_restart) {
    // location.reload();
    reset();
  }
  playerHit = {...player};
  playerHit.w *= data.player.hitX;
  playerHit.h *= data.player.hitY;
  playerHit.x += player.w / 2 - playerHit.w / 2;
  playerHit.y += player.h - playerHit.h;
  if (gameState == "play") {
    px = ((player.x + (player.w / 2 - (player.w * (data.player.hitX) / 2))) + (player.w * data.player.hitX)) / tw;
    py = ((player.y + (player.h - player.h * (data.player.hitY))) + (player.h * data.player.hitY)) / tw;
    reach = 2;
    minx = Math.max(Math.floor(px - reach), 0);
    maxx = Math.min(Math.floor(px + reach), grid.length);
    miny = Math.max(Math.floor(py - reach), 0);
    maxy = Math.min(Math.floor(py + reach), grid[0].length);

    cb = null;
    p = {...playerHit};
    // p.x += p.vx;
    p.y += p.vy;
    // p.h += 5;
    X: for (x = minx; x < maxx; x++) {
      for (y = miny; y < maxy; y++) {
        if (data.collide.includes(grid[x][y])) {
          if (F.collide(p, {
            x: (x + 0.001) * tw,
            y: (y + 0.001) * tw,
            w: tw + 1,
            h: tw + 1,
          })) {
            cb = grid[x][y];
            // break X;
          }
        }
      }
    }
    if (!cb) {
      player.vy += data.v.fa * mod * (10 / data.tiles);
    } else {
      player.vy = 0;
    }

    if (keysDown.player_up) {
      if (
        player.jumpTime > Date.now() - data.v.jm
        && player.jumpTime < Date.now() - data.v.jc
      ) {
        player.vy -= data.v.ja;
      }
      cb = null;
      p = {...playerHit};
      // p.x += p.vx * (12 / data.tiles);
      p.y += p.vy + p.h - 1;
      p.h = 1;
      X: for (x = minx; x < maxx; x++) {
        for (y = miny; y < maxy; y++) {
          if (data.collide.includes(grid[x][y])) {
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

    switch (F.bool_bin(keysDown.player_left, keysDown.player_right)) {
      case "10": {
        player.vx -= data.v.ma * mod;
      }; break;
      case "01": {
        player.vx += data.v.ma * mod;
      }; break;
      default: {
        player.vx = Math.sign(player.vx) * (Math.abs(player.vx) - data.v.ma * mod);
        if (Math.abs(player.vx - 0) < data.v.mm) {
          player.vx = 0;
        }
      };
    }

    cb = null;
    p = {...playerHit};
    p.x += player.vx;
    p.y += p.vy - 1;
    X: for (x = minx; x < maxx; x++) {
      for (y = miny; y < maxy; y++) {
        if (data.collide.includes(grid[x][y])) {
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

    player.vx = Math.min(Math.max(player.vx, - data.v.mt), data.v.mt);
    player.vy = Math.min(Math.max(player.vy, - data.v.jt), data.v.ft);

    player.x += player.vx;
    player.y += player.vy;

    cb = null;
    p = {...playerHit};
    p.y -= 1;
    X: for (x = minx; x < maxx; x++) {
      for (y = miny; y < maxy; y++) {
        if (grid[x][y] != "none") {
          if (F.collide(p, {
            x: (x + 0.001) * tw,
            y: (y + 0.001) * tw,
            w: tw + 1,
            h: tw + 1,
          })) {
            if (data.collide.includes(grid[x][y])) {
              cb = grid[x][y];
              break X;
            } else if (data.win.includes(grid[x][y])) {
              goal();
              break X;
            } else if (data.death.includes(grid[x][y])) {
              death();
              break X;
            }
          }
        }
      }
    }
    if (cb) {
      player.y++;
    }

    p = {...playerHit};
    for (i = 0; i < enemies.length; i++) {
      if (enemies[i].dead) {
        continue;
      }
      if (
        !data.enemies[enemies[i].type].attr.avoidLight
        || !data.light.includes(player.hold)
      ) {
        if (F.collide(p, enemies[i])) {
          death();
          break;
        }
      }
      dir = 1;
      if (data.enemies[enemies[i].type].attr.avoidLight && data.light.includes(player.hold)) {
        dir = -1;
      }
      enemies[i].vx += dir * Math.sign(player.x - enemies[i].x) * data.enemies[enemies[i].type].v.ma * mod;
      enemies[i].flip = dir * - Math.sign(player.x - enemies[i].x);

      cb = null;
      e = {...enemies[i]};
      e.x += e.vx;
      e.y -= 1;
      // todo: Optimise this
      X: for (x = 0; x < grid.length; x++) {
        for (y = 0; y < grid[x].length; y++) {
          if (data.enemies[enemies[i].type].collide.includes(grid[x][y])) {
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

      cb = null;
      e = {...enemies[i]};
      e.x += e.vx;
      // todo: Optimise this
      X: for (x = 0; x < grid.length; x++) {
        for (y = 0; y < grid[x].length; y++) {
          if (data.enemies[enemies[i].type].collide.includes(grid[x][y])) {
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

      if (data.enemies[enemies[i].type].attr.fall) {
        cb = null;
        e = {...enemies[i]};
        e.x += e.vx;
        e.y += e.vy;
        // todo: Optimise this
        X: for (x = 0; x < grid.length; x++) {
          for (y = 0; y < grid[x].length; y++) {
            if (data.enemies[enemies[i].type].collide.includes(grid[x][y])) {
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

      enemies[i].vx = Math.min(Math.max(enemies[i].vx, - data.enemies[enemies[i].type].v.mt), data.enemies[enemies[i].type].v.mt);
      enemies[i].vy = Math.min(Math.max(enemies[i].vy), data.enemies[enemies[i].type].v.ft);

      enemies[i].x += enemies[i].vx;
      enemies[i].y += enemies[i].vy;

      cb = null;
      e = {...enemies[i]};
      e.y += 1;
      // todo: Optimise this
      X: for (x = 0; x < grid.length; x++) {
        for (y = 0; y < grid[x].length; y++) {
          if (F.collide(e, {
            x: (x + 0.001) * tw,
            y: (y + 0.001) * tw,
            w: tw + 1,
            h: tw + 1,
          })) {
            if (data.enemies[enemies[i].type].collide.includes(grid[x][y])) {
              cb = grid[x][y];
              break X;
            } else if (data.enemies[enemies[i].type].death.includes(grid[x][y])) {
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
      if (!player.hold) {
        x = Math.floor((playerHit.x + playerHit.w / 2) / tw);
        y = Math.floor((playerHit.y + playerHit.h / 2) / tw);
        if (
          grid[x]
          && grid[y]
        ) {
          switch (grid[x][y]) {
            case "torch": {
              player.hold = "torch";
              grid[x][y] = "none";
            }; break;
          }
        }
      }
    } else if (keysDown.player_drop) {
      if (player.hold) {
        x = Math.floor((playerHit.x + playerHit.w / 2) / tw);
        y = Math.floor((playerHit.y + playerHit.h / 2) / tw);
        if (
          grid[x]
          && grid[y]
        ) {
          if (grid[x][y] == "none") {
            switch (player.hold) {
              case "torch": {
                player.hold = null;
                grid[x][y] = "torch";
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

  if (keysDown.debug) {
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

    if (F.mouse.onCanvas) {
      if (F.buttonDown(0)) {
        player.x += - ((- cam.x + player.x) - F.mouse.x) * mod * 5;
        player.y += - ((- cam.y + player.y) - F.mouse.y) * mod * 5;
        player.vx = 0;
        player.vy = 0;
      }
    }
  }
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

  cam.x = player.x + (player.w / 2) - (canvas.width * data.cam.x);
  cam.y = player.y + (player.h / 2) - (canvas.height * data.cam.y);
}