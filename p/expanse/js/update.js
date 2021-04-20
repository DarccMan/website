
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  if (keysDown.game_restart) {
    if (global.keyOnce_restart) {
      reset();
      // location.reload();
      global.keyOnce_restart = false;
    }
  } else {
    global.keyOnce_restart = true;
  }

  /* Create player hitbox */
  playerHit = {...player};
  playerHit.w *= data.player.hitX;
  playerHit.h *= data.player.hitY;
  playerHit.x += player.w / 2 - playerHit.w / 2;
  playerHit.y += player.h - playerHit.h;
  playerHitNC = {...playerHit};
  if (player.crouch) {
    playerHit.y += player.h - (data.player.ch * tw);
    playerHit.y -= 3;
    playerHit.h = data.player.ch * tw;
  }
  if (gameState == "play") {
    /* Find closest block to player to not loop over every block */
    px = ((player.x + (player.w / 2 - (player.w * (data.player.hitX) / 2))) + (player.w * data.player.hitX)) / tw;
    py = ((player.y + (player.h - player.h * (data.player.hitY))) + (player.h * data.player.hitY)) / tw;
    reach = 2;
    minx = Math.max(Math.floor(px - reach), 0);
    maxx = Math.min(Math.floor(px + reach), grid.length);
    miny = Math.max(Math.floor(py - reach), 0);
    maxy = Math.min(Math.floor(py + reach), grid[0].length);

    /* Crouch */
    playerSpeed = 1;
    if (keysDown.player_crouch) {
      player.crouch = true;
      player.status = "crouch";
      player.vy += data.v.cfa * data.v.fa;
      playerSpeed = data.v.cma;
    } else {
      /* Dont uncrouch unless no block above */
      if (player.crouch) {
        cb = null;
        p = {...playerHitNC};
        p.h = 10;
        X: for (x = minx; x < maxx; x++) {
          for (y = miny; y < maxy; y++) {
            if (data.blocks[grid[x][y].block]?.collide) {
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
          player.crouch = false;
        }
      }
    }

    /* Player fall */
    blockUnder = false;
    cb = null;
    p = {...playerHit};
    p.y += player.vy;
    p2 = {...playerHit};
    p2.y -= 5;
    p2.h = 20;
    walkInto = false;
    X: for (x = minx; x < maxx; x++) {
      for (y = miny; y < maxy; y++) {
        if (data.blocks[grid[x][y].block]?.collide) {
          if (F.collide(p, {
            x: (x + 0.001) * tw,
            y: (y + 0.001) * tw,
            w: tw + 1,
            h: tw + 1,
          })) {
            cb = grid[x][y];

            /* Go into walkInto block */
            if (
              data.blocks[grid[x][y].block]?.walkInto
            ) {
              if (F.collide(p2, {
                x: (x + 0.001) * tw,
                y: (y + 0.001) * tw,
                w: tw + 1,
                h: tw + 1,
              })) {
                walkInto = true;
                cb = null;
              }
            } else {
              break X;
            }
          }
        }
      }
    }
    if (!cb) {
      player.vy += data.v.fa * mod * (10 / data.tiles);
    } else {
      player.vy = 0;
      blockUnder = true;
    }

    /* Player jump */
    if (!player.crouch && keysDown.player_up) {
      /* Extra jump */
      //! Fix. Not working
      X: for (x = minx; x < maxx; x++) {
        for (y = miny; y < maxy; y++) {
          if (
            data.blocks[grid[x][y].block]?.walkInto
          ) {
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
        if (
          player.jumpTime > Date.now() - data.v.jm
          && player.jumpTime < Date.now() - data.v.jc
        ) {
          player.vy -= data.v.ja;
        }
      }

      //! Fix. Add collision for walkInto
      cb = null;
      p = {...playerHit};
      p.y += player.vy + p.h - 1;
      p.h = 1;
      X: for (x = minx; x < maxx; x++) {
        for (y = miny; y < maxy; y++) {
          if (
            data.blocks[grid[x][y].block]?.collide
            // && !data.blocks[grid[x][y].block]?.walkInto
          ) {
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
        player.vx -= data.v.ma * mod * playerSpeed;
        player.flip = -1;
        if (!player.crouch) {
          player.status = "run";
        }
      }; break;
      case "01": {
        player.vx += data.v.ma * mod * playerSpeed;
        player.flip = 1;
        if (!player.crouch) {
          player.status = "run";
        }
      }; break;
      default: {
        player.vx = Math.sign(player.vx) * (Math.abs(player.vx) - data.v.md * mod);
        if (Math.abs(player.vx - 0) < data.v.mm) {
          player.vx = 0;
        }
        if (!player.crouch) {
          player.status = "idle";
        }
      };
    }

    /* Player hit wall */
    if (!global.playerInBlock) {
      cb = null;
      p = {...playerHit};
      p.x += player.vx;
      p.y += player.vy - 1;
      X: for (x = minx; x < maxx; x++) {
        for (y = miny; y < maxy; y++) {
          if (
            data.blocks[grid[x][y].block]?.collide
            && !data.blocks[grid[x][y].block]?.walkInto
          ) {
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
    }

    /* Player crouching don't fall off */
    if (player.crouch && blockUnder) {
      cb = null;
      p = {...playerHit};
      p.x += player.vx * 4;
      X: for (x = minx; x < maxx; x++) {
        for (y = miny; y < maxy; y++) {
          if (
            data.blocks[grid[x][y].block]?.collide
            && !data.blocks[grid[x][y].block]?.walkInto
          ) {
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
    if (cb) {
      player.y -= tw * 0.03;
      global.playerInBlock = true;
    } else {
      global.playerInBlock = false;
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
        || !data.blocks[player.hold]?.light
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
      if (data.enemies[enemies[i].type].attr.avoidLight && data.blocks[player.hold]?.light) {
        dir = -1;
      }
      fast = 1;
      if (enemies[i].type == "skelly") {
        fast = Math.max(1, (500 - Math.abs(player.x - enemies[i].x)) * 0.01);
      }
      enemies[i].vx += dir * Math.sign(player.x - enemies[i].x) * data.enemies[enemies[i].type].v.ma * mod * fast;
      enemies[i].flip = dir * - Math.sign(player.x - enemies[i].x);

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
      if (enemies[i].type == "rat") {
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

    if (keysDown.player_pick) {
      /* Pick up block */
      if (!player.hold) {
        x = Math.floor((playerHit.x + playerHit.w / 2) / tw);
        y = Math.floor((playerHit.y + playerHit.h / 2) / tw);
        if (
          grid[x]
          && grid[x][y]
        ) {
          if (data.blocks[grid[x][y].block].use) {
            switch (grid[x][y].block) {
              case "sign": {
                global.signText = grid[x][y].text || "No text";
                global.lastReadSign = Date.now();
              }; break;
            }
          } else if (data.blocks[grid[x][y].block].pick) {
            player.hold = grid[x][y].block;
            grid[x][y] = {
              block: "none"
            };
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
            if (data.blocks[player.hold].pick) {
              grid[x][y] = {
                block: player.hold,
              };
              player.hold = null;
            }
          }
        }
      }
    }
  } else if (gameState == "start") {
    if (keysDown.game_start) {
      if (global.keyOnce_start) {
        gameState = "play";
        lvl = 0;
        reset();
        global.lastRestart = Date.now();
      }
    } else {
      global.keyOnce_start = true;
    }
  } else if (gameState == "end") {
    if (keysDown.game_start) {
      gameState = "start";
      global.keyOnce_start = false;
    }
  }

  if (keysDown.graphics_toggle) {
    if (global.keyOnce_graphics) {
      // doc.id("graphics").checked = !doc.id("graphics").checked;
      changeGraphics();
      global.keyOnce_graphics = false;
    }
  } else {
    global.keyOnce_graphics = true;
  }

  if (gameState != "load") {
    /* Debug mode */
    if (keysDown.debug) {
      /* Show hitboxes */
      p = {...playerHit};
      ctx.fillStyle = "#0F02";
      ctx.fillRect(
        - cam.x + p.x + player.vx,
        - cam.y + p.y + player.vy + 1 + (player.crouch ? p.h - (data.player.ch * tw) : 0),
        p.w,
        player.crouch ? data.player.ch * tw : p.h,
      );

      for (i = 0; i < enemies.length; i++) {
        ctx.fillStyle = "#F0F2";
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
    if (keysDown.debug_mode) {
      if (gameState != "debug") {
        global.lastGameState_debug = gameState;
        gameState = "debug";
      }
    } else {
      if (gameState == "debug") {
        gameState = global.lastGameState_debug || "play";
      }
    }
  }
}


/* Nothing to see here :) */
fancy = {
  a: [68, 65, 66, 65, 66, 89],
  b: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
  c: [83, 75, 69, 76, 76, 89],
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
        }; break;
        case "c": {
          if (gameState == "end") {
            if (!global.drawSkelly || global.drawSkelly + 1500 < Date.now()) {
              global.drawSkelly = Date.now();
            }
          }
        }; break;
      }
    }
  }
}