function render() {
  cv.overlay.w = _w;
  cv.overlay.h = _h;
  cv.overlay.style.width = _ws;
  cv.overlay.style.height = _hs;
  ctxs.overlay.clearRect(
    0,
    0,
    cv.overlay.w,
    cv.overlay.h,
  );

  cv.shadow.style.display = "none";
  if (!["load", "start", "end"].includes(gameState)) {
    cv.shadow.style.display = "block";
    /* Align camera to player position */
    if (data.graphics >= data.cam.graphics) {
      minx = cv.main.w * data.cam.minx;
      maxx = cv.main.w * data.cam.maxx;
      miny = cv.main.h * data.cam.miny;
      maxy = cv.main.h * data.cam.maxy;
      posx = player.x + player.w / 2 - cam.x
      posy = player.y + player.h / 2 - cam.y
      if (posx < minx) {
        cam.x -= minx - posx;
      }
      if (posx > maxx) {
        cam.x += posx - maxx;
      }
      if (posy < miny) {
        cam.y -= miny - posy;
      }
      if (posy > maxy) {
        cam.y += posy - maxy;
      }
    } else {
      cam.x = player.x + (player.w / 2) - (cv.main.width * data.cam.x);
      cam.y = player.y + (player.h / 2) - (cv.main.height * data.cam.y);
    }

    ctx.fillCanvas(data.blocks.none.color);
    if (data.graphics > 0) {
      /* Background parallax effect */
      ctx.save();
      ctx.translate(
        - cam.x * data.parallax,
        - cam.y * data.parallax,
      );

      /* Background follows player */
      ax = Math.floor(cam.x * data.parallax / tw);
      ay = Math.floor(cam.y * data.parallax / tw);

      for (x = 0; x < tx + 1; x++) {
        for (y = 0; y < data.tiles + 1; y++) {
          if (data.graphics > 1) {
            ctx.drawImage(
              images.none_0,
              Math.floor((ax + x) * tw),
              Math.floor((ay + y) * tw),
              Math.ceil(tw),
              Math.ceil(tw),
            );
          } else {
            ctx.strokeStyle = "black";
            ctx.strokeRect(
              (ax + x) * tw,
              (ay + y) * tw,
              tw,
              tw,
            );
          }
        }
      }
      ctx.restore();
    }

    /* Remove parallax effect and move for camera */
    ctx.save();
    ctx.translate(
      - cam.x,
      - cam.y,
    );

    for (x = 0; x < grid.length; x++) {
      for (y = 0; y < grid[x].length; y++) {
        if (grid[x][y].block == "none") {
          continue;
        }
        /* Draw block */
        if (data.graphics > 1) {
          ctx.save();
          if (grid[x][y].rotate) {
            ctx.translate(
              (x * tw) + (tw / 2),
              (y * tw) + (tw / 2),
            );
            ctx.rotate(grid[x][y].rotate * Math.PI / 2);
            ctx.translate(
              - ((x * tw) + (tw / 2)),
              - ((y * tw) + (tw / 2)),
            );
          }
          ctx.drawImage(
            images[grid[x][y].block + "_" + (data.graphics < 3 ? 0 : (frame.current % data.blocks[grid[x][y].block]?.images))] || images.unknown_0,
            Math.floor(x * tw),
            Math.floor(y * tw),
            Math.ceil(tw),
            Math.ceil(tw),
          );
          ctx.restore();

          /* Draw outline of blocks (DONT ASK ME HOW IT WORKS, I blacked out and woke up to it working) */
          if (data.graphics > 2) {
            if (data.blocks[grid[x][y].block]) {
              if (data.blocks[grid[x][y].block].outline) {
                for (c = 0; c < cs.length; c++) {
                  if (
                    x + cs[c][0] < 0
                    || x + cs[c][0] >= grid.length
                    || y + cs[c][1] < 0
                    || y + cs[c][1] >= grid[x].length
                    || !data.blocks[grid[x + cs[c][0]][y + cs[c][1]].block]?.outline
                  ) {
                    ctx.save();
                    ctx.translate(
                      (x * tw - 1) + ((tw + 1) / 2),
                      (y * tw - 1) + ((tw + 1) / 2),
                    );
                    ctx.rotate(
                      ((c - 1) * 90) * Math.PI / 180,
                    );
                    ctx.translate(
                      - ((x * tw - 1) + ((tw + 1) / 2)),
                      - ((y * tw - 1) + ((tw + 1) / 2)),
                    );
                    ctx.drawImage(
                      images.side,
                      x * tw - 1,
                      y * tw - 1,
                      tw + 1,
                      tw + 1,
                    );
                    ctx.restore();
                  }
                }

                for (c = 0; c < ci.length; c++) {
                  if (
                    (
                      !data.blocks[grid[x + ci[c][0][0]]?.[y + ci[c][0][1]]?.block]?.outline
                      && data.blocks[grid[x + ci[c][1][0]]?.[y + ci[c][1][1]]?.block]?.outline
                      && data.blocks[grid[x + ci[c][2][0]]?.[y + ci[c][2][1]]?.block]?.outline
                    )
                  ) {
                    ctx.save();
                    ctx.translate(
                      (x * tw - 1) + ((tw + 1) / 2),
                      (y * tw - 1) + ((tw + 1) / 2),
                    );
                    ctx.rotate(
                      ((c - 0) * 90) * Math.PI / 180,
                    );
                    ctx.translate(
                      - ((x * tw - 1) + ((tw + 1) / 2)),
                      - ((y * tw - 1) + ((tw + 1) / 2)),
                    );
                    ctx.drawImage(
                      images.inner,
                      x * tw - 1,
                      y * tw - 1,
                      tw + 1,
                      tw + 1,
                    );
                    ctx.restore();
                  }
                }

                for (c = 0; c < co.length; c++) {
                  if (
                    (
                      !data.blocks[grid[x + co[c][0][0]]?.[y + co[c][0][1]]?.block]?.outline
                      || (
                        !grid[x + co[c][0][0]]
                        || !grid[x + co[c][0][0]][y + co[c][0][1]]
                      )
                    ) && (
                      !data.blocks[grid[x + co[c][1][0]]?.[y + co[c][1][1]]?.block]?.outline
                      || (
                        !grid[x + co[c][1][0]]
                        || !grid[x + co[c][1][0]][y + co[c][1][1]]
                      )
                    )
                  ) {
                    ctx.save();
                    ctx.translate(
                      (x * tw - 1) + ((tw + 1) / 2),
                      (y * tw - 1) + ((tw + 1) / 2),
                    );
                    ctx.rotate(
                      ((c - 0) * 90) * Math.PI / 180,
                    );
                    ctx.translate(
                      - ((x * tw - 1) + ((tw + 1) / 2)),
                      - ((y * tw - 1) + ((tw + 1) / 2)),
                    );
                    ctx.drawImage(
                      images.outer,
                      x * tw - 1,
                      y * tw - 1,
                      tw + 1,
                      tw + 1,
                    );
                    ctx.restore();
                  }
                }
              }
            }
          }
        } else {
          /* Low graphics blocks */
          ctx.fillStyle = data.blocks[grid[x][y].block]?.color;
          ctx.fillRect(
            x * tw - 1,
            y * tw - 1,
            tw + 1,
            tw + 1,
          );
        }
      }
    }

    /* Draw virtual floor spikes */
    ax = Math.floor(cam.x / tw);
    for (x = 0; x < grid.length; x++) {
      if (data.graphics > 1) {
        ctx.drawImage(
          images["spike_" + (data.graphics < 3 ? 0 : (frame.current % data.blocks.spike.images))],
          (x + ax) * tw,
          (data.floor_gap + grid[0].length) * tw,
          tw,
          tw,
        );
        for (y = 0; y < 5; y++) {
          ctx.drawImage(
            images["block_" + (data.graphics < 3 ? 0 : (frame.current % data.blocks.block.images))],
            (x + ax) * tw,
            (data.floor_gap + grid[0].length + 1 + y) * tw,
            tw,
            tw,
          );
        }
      } else {
        /* Low graphics blocks */
        ctx.fillStyle = data.blocks.spike.color;
        ctx.fillRect(
          (x + ax) * tw,
          (data.floor_gap + grid[0].length) * tw,
          tw,
          tw,
        );
        for (y = 0; y < 5; y++) {
          ctx.fillStyle = data.blocks.block.color;
          ctx.fillRect(
            (x + ax) * tw,
            (data.floor_gap + grid[0].length + 1 + y) * tw,
            tw,
            tw,
          );
        }
      }
    }

    /* Draw player */
    if (data.graphics > 1) {
      ctx.save();
      /* Rotate player if dead */
      if (gameState == "death") {
        x = player.x + (player.w / 2);
        y = player.y + (player.h / 2);
        ctx.translate(
          x,
          y,
        );
        ctx.rotate(player.animate * Math.PI / 2);
        ctx.translate(
          - x,
          - y,
        );
        if (data.graphics > 2) {
          // ctx.globalAlpha = 1 - player.animate + 0.5;
        }
      }
      if (gameState == "win") {
        /* Draw player moving for level transition */
        ctx.save();
        ctx.translate(
          cam.x,
          cam.y,
        );
        ctx.drawImage(
          images["player_transition_" + (data.graphics < 3 ? 0 : (frame.current % playerImages.transition))],
          (player.animate - 0.5) * (cv.main.width + (player.w / player.h) * cv.main.height),
          cv.main.height / 10,
          (player.w / player.h) * cv.main.height,
          cv.main.height,
        );
        ctx.restore();
        ctx.globalAlpha = 1;
      } else {
        /* Flip player for direction */
        if (player.flip < 0) {
          ctx.translate(
            player.x + (player.w / 2),
            player.y + (player.h / 2),
          );
          ctx.scale(-1, 1);
          ctx.translate(
            - (player.x + (player.w / 2)),
            - (player.y + (player.h / 2)),
          );
        }
        ctx.drawImage(
          images["player_" + player.status + "_" + (data.graphics < 3 ? 0 : (frame.current % playerImages[player.status]))],
          player.x,
          player.y,
          player.w,
          player.h,
        );
      }
      ctx.restore();

      /* Draw player holding block */
      if (player.hold) {
        ctx.save();
        if (player.flip < 0) {
          ctx.translate(
            player.x + (player.w / 2),
            player.y + (player.h / 2),
          );
          ctx.scale(-1, 1);
          ctx.translate(
            - (player.x + (player.w / 2)),
            - (player.y + (player.h / 2)),
          );
        }
        ctx.translate(
          player.x + player.w / 2,
          player.y + player.h / 2,
        );
        ctx.rotate(30 * Math.PI / 180);
        ctx.translate(
          - (player.x + player.w / 2),
          - (player.y + player.h / 2),
        );
        ctx.drawImage(
          images[player.hold + "_" + (data.graphics < 3 ? 0 : (frame.current % data.blocks[player.hold].images))],
          player.x + 20,
          player.y,
          player.w * data.hold_size,
          player.h * data.hold_size,
        );
        ctx.restore();
      }
    } else {
      /* Low graphics player */
      ctx.fillStyle = data.player.color;
      ctx.fillRect(
        player.x + (player.w / 2 - (player.w * (data.player.hitX) / 2)),
        player.y + (player.crouch ? (
          player.h - data.player.ch * tw
        ) : (
          player.h - player.h * data.player.hitY
        )),
        player.w * data.player.hitX,
        player.crouch ? (
          data.player.ch * tw
        ) : (
          player.h * data.player.hitY
        ),
      );

      if (player.hold) {
        ctx.save();
        if (data.graphics > 0) {
          ctx.translate(
            player.x + player.w / 2,
            player.y + player.h / 2,
          );
          ctx.rotate(30 * Math.PI / 180);
          ctx.translate(
            - (player.x + player.w / 2),
            - (player.y + player.h / 2),
          );
        }
        ctx.fillStyle = data.blocks[player.hold].color;
        ctx.fillRect(
          player.x + 20,
          player.y,
          player.w * data.hold_size * 0.6,
          player.h * data.hold_size * 0.6,
        );
        ctx.restore();
      }
    }

    /* Draw enemies */
    for (i = 0; i < enemies.length; i++) {
      time0 = 300;
      time1 = 100;
      if (data.graphics < 1) {
        time0 = 100;
        time1 = 0;
      }
      if (enemies[i].dead + time0 + time1 < Date.now()) {
        continue;
      }
      ctx.save();
      /* Flip for direction */
      if (enemies[i].flip < 0) {
        ctx.translate(
          enemies[i].x + (enemies[i].w / 2),
          enemies[i].y + (enemies[i].h / 2),
        );
        ctx.scale(-1, 1);
        ctx.translate(
          - (enemies[i].x + (enemies[i].w / 2)),
          - (enemies[i].y + (enemies[i].h / 2)),
        );
      }
      y = enemies[i].y + (data.enemies[enemies[i].type].rh ? (
        0
      ) : (
        enemies[i].h - (enemies[i].w)
      ));
      h = data.enemies[enemies[i].type].rh ? (
        data.enemies[enemies[i].type].rh * tw
      ) : (
        enemies[i].w
      );
      /* Rotate enemy for death */
      if (data.graphics > 0) {
        ctx.translate(
          (enemies[i].x + (enemies[i].w / 2)),
          (y + h / 2),
        );
        ctx.rotate(
          Math.min(90, (Date.now() - enemies[i].dead) / time0 * 90) * Math.PI / 180,
        );
        ctx.translate(
          - (enemies[i].x + (enemies[i].w / 2)),
          - (y + h / 2),
        );
      }
      if (data.graphics > 2) {
        ctx.globalAlpha = 1 - (Date.now() - enemies[i].dead) / (time0 + time1);
      }
      if (data.graphics > 1) {
        ctx.drawImage(
          images[enemies[i].type + "_" + (data.graphics < 3 ? 0 : (frame.current % data.enemies[enemies[i].type].images))],
          enemies[i].x,
          y,
          enemies[i].w,
          h,
        );
      } else {
        /* Low graphics enemies */
        ctx.fillStyle = data.enemies[enemies[i].type].color;
        ctx.fillRect(
          enemies[i].x,
          y,
          enemies[i].w,
          h,
        );
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    ctx.restore();
    if (
      !["start", "end"].includes(gameState)
      && data.graphics > 3 || data.graphics == 1
    ) {
      /* Shadow Subtraction */
      cv.shadow.style.display = "block";
      /* Resize cv.main to resolution */
      res = data.graphics > 2 ? data.shadow.resolution_high : data.shadow.resolution_low;
      // res = 0.1;
      cv.shadow.w = _w * res;
      cv.shadow.h = _h * res;
      cv.shadow.style.width = _ws;
      cv.shadow.style.height = _hs;
      ctxs.shadow.fillCanvas("#0008");

      /* Create inverted opacity shadow around player */
      var grd = ctxs.shadow.createRadialGradient(
        (- cam.x + player.x + (player.w / 2)) * res,
        (- cam.y + player.y + (player.w / 2)) * res,
        Math.max(player.w, player.h) * data.shadow.p_r0 * res,
        (- cam.x + player.x + (player.w / 2)) * res,
        (- cam.y + player.y + (player.w / 2)) * res,
        tw * data.shadow.p_r1 * (player.hold && data.blocks[player.hold].light ? data.shadow.torch_multiply : 1) * res,
      );
      grd.addColorStop(0, "#FFF");
      grd.addColorStop(1, "#0000");
      ctxs.shadow.fillCanvas(grd);

      /* Create inverted opacity shadow around all blocks */
      /* for (x = Math.max(0, Math.floor(cam.x / tw)); x < Math.min(grid.length, Math.floor((cam.x + cv.main.w) / tw)); x++) {
        for (y = Math.max(0, Math.floor(cam.y / tw)); y < Math.min(grid[0].length, Math.floor((cam.y + cv.main.h) / tw)); y++) { */
      res1 = res;
      for (x = 0; x < grid.length; x++) {
        for (y = 0; y < grid[x].length; y++) {
          if (data.blocks[grid[x][y]?.block]?.light) {
            grd = ctxs.shadow.createRadialGradient(
              - cam.x * res + (x + 0.5) * tw * res,
              - cam.y * res + (y + 0.5) * tw * res,
              tw * data.shadow.r0 * res1 * data.blocks[grid[x][y]?.block].light,
              - cam.x * res + (x + 0.5) * tw * res,
              - cam.y * res + (y + 0.5) * tw * res,
              tw * data.shadow.r1 * res1 * data.blocks[grid[x][y]?.block].light,
            );
            grd.addColorStop(0, "#FFF");
            grd.addColorStop(1, "#0000");
            ctxs.shadow.fillCanvas(grd);
          }
        }
      }

      /* Invert opacity of all shadows */
      imgd = ctxs.shadow.getImageData(0, 0, cv.main.width, cv.main.height);
      pix = imgd.data;
      for (i = 0, n = pix.length; i < n; i += 4) {
        if (
          pix[i + 1] > 0
        ) {
          pix[i + 3] = data.shadow.opacity - pix[i + 0];
          pix[i + 0] = 0;
          pix[i + 1] = 0;
          pix[i + 2] = 0;
        } else {
          pix[i + 3] = data.shadow.opacity;
        }
      }
      ctxs.shadow.putImageData(imgd, 0, 0);
    } else {
      cv.shadow.style.display = "none";
    }

    if (gameState == "play") {
      /* Draw level number and fade out */
      time0 = 1500;
      time1 = 1000;
      if (global.lastRestart + time0 > Date.now()) {
        ctxs.overlay.font = cv.overlay.width * 0.05 + "px " + data.font;
        h = "FF";
        if (data.graphics > 0) {
          h = Math.round((Math.min(time1, time0 - (Date.now() - global.lastRestart)) * (256 / time1)) * 0.7).toString(16);
          if (h.length > 2) {
            h = "FF";
          }
        }
        ctxs.overlay.fillStyle = "#FFFFFF" + (h.length < 2 ? "0" : "") + h;
        ctxs.overlay.textBaseline = "top";
        ctxs.overlay.textAlign = "left";
        ctxs.overlay.fillText(
          lang.level.format({
            number: lvl,
            name: levels[lvl].name || "Unknown",
          }),
          cv.overlay.width * 0.02,
          cv.overlay.width * 0.02,
        );
      }

      /* Draw sign text */
      if (global.signText) {
        time0 = 1500;
        time1 = 1000;
        if (global.lastReadSign + time0 > Date.now()) {
          h = "FF";
          if (data.graphics > 0) {
            h = Math.round((Math.min(time1, time0 - (Date.now() - global.lastReadSign)) * (256 / time1)) * 0.7).toString(16);
            if (h.length > 2) {
              h = "FF";
            }
          }
          ctxs.overlay.fillStyle = "#B0B0B0" + (h.length < 2 ? "0" : "") + h;
          ctxs.overlay.textBaseline = "top";
          ctxs.overlay.textAlign = "center";
          ctxs.overlay.font = cv.overlay.width * 0.05 + "px " + data.font;
          ctxs.overlay.fillText(
            lang.sign,
            cv.overlay.width * 0.5,
            cv.overlay.height * 0.1,
          );
          ctxs.overlay.fillStyle = "#FFFFFF" + (h.length < 2 ? "0" : "") + h;
          ctxs.overlay.font = cv.overlay.width * 0.08 + "px " + data.font;
          ctxs.overlay.fillText(
            global.signText,
            cv.overlay.width * 0.5,
            cv.overlay.height * 0.2,
          );
        }
      }
    }

    if (gameState == "death") {
      /* Fade into death screen */
      h = "1A";
      if (data.graphics > 0) {
        h = Math.round(player.animate * 256 / 10).toString(16);
      }
      ctxs.overlay.fillCanvas("#FF0000" + (h.length < 2 ? "0" : "") + h);
      ctxs.overlay.font = cv.overlay.width * 0.12 + "px " + data.font;
      ctxs.overlay.fillStyle = "#FFF";
      if (data.graphics > 0) {
        ctxs.overlay.save();
        ctxs.overlay.translate(
          cv.overlay.width / 2,
          cv.overlay.height / 2,
        );
        ctxs.overlay.rotate((1 - player.animate) * Math.PI / 2);
        ctxs.overlay.translate(
          - cv.overlay.width / 2,
          - cv.overlay.height / 2,
        );
        ctxs.overlay.font = (cv.overlay.width * 0.001) * (player.animate * 100) + "px " + data.font;
        h = Math.round(player.animate * 256 / 2).toString(16);
        ctxs.overlay.fillStyle = "#FFFFFF" + (h.length < 2 ? "0" : "") + h;
      }
      ctxs.overlay.textBaseline = "middle";
      ctxs.overlay.textAlign = "center";
      ctxs.overlay.fillText(
        global.deathMessage,
        cv.overlay.width * 0.5,
        cv.overlay.height * 0.3,
      );
      ctxs.overlay.restore();
    } else if (gameState == "debug") {
      ctxs.overlay.font = cv.overlay.width * 0.04 + "px " + data.font;
      ctxs.overlay.textBaseline = "top";
      ctxs.overlay.textAlign = "left";
      ctxs.overlay.fillStyle = "#EEEE";
      ctxs.overlay.fillText(
        lang.debug,
        cv.overlay.width * 0.02,
        cv.overlay.width * 0.02,
      );
    }

    /* Timer */
    ctxs.overlay.font = cv.overlay.width * 0.04 + "px " + data.font;
    ctxs.overlay.textBaseline = "top";
    ctxs.overlay.textAlign = "left";
    ctxs.overlay.fillStyle = "#EEE5";
    ctxs.overlay.lineWidth = 4;
    time = ((Date.now() - global.timeStart) / 1000).toFixed(2).toString();
    ctxs.overlay.fillText(
      lang.time_game.format(time),
      cv.overlay.width * 0.87 - cv.overlay.width * 0.01 * time.length,
      cv.overlay.height * 0.02,
    );
  } else if (gameState == "start") {
    /* Title screen */
    ctx.fillCanvas("#222");

    if (data.graphics > 1) {
      /* Draw background */
      for (i = 0; i < Math.ceil(cv.main.width / cv.main.height) + 1; i++) {
        ctx.drawImage(
          images.none_0,
          ((i - 1) * cv.main.height) + ((Date.now() / 10)) % cv.main.height,
          0,
          cv.main.height + 1,
          cv.main.height,
        );
      }

      /* Draw player */
      m = (Math.sin(Date.now() / 800) / 4) + 0.5;

      if (data.graphics > 2) {
        /* Draw shadow */
        var grd = ctxs.shadow.createRadialGradient(
          cv.main.width * m,
          cv.main.height * 0.6,
          0,
          cv.main.width * m,
          cv.main.height * 0.6,
          cv.main.height * 0.6,
        );
        grd.addColorStop(0, "#000");
        grd.addColorStop(1, "#0000");
        ctx.fillStyle = grd;
        ctx.fillCanvas(grd);
      }

      ctx.save();
      ctx.translate(
        cv.main.width * m,
        cv.main.height / 2,
      );
      ctx.scale(
        2 * Math.floor(Math.sin((Date.now() / 800) + Math.PI / 2)) + 1,
        1,
      );
      ctx.translate(
        - (cv.main.width * m),
        - (cv.main.height / 2),
      );
      ctx.drawImage(
        images["player_idle_" + (data.graphics < 3 ? 0 : (frame.current % playerImages.idle))],
        cv.main.width * m - cv.main.height / 2,
        0,
        cv.main.height,
        cv.main.height,
      );
      ctx.restore();
    } else {
      ctx.fillCanvas(data.blocks.none.color);

      if (data.graphics > 0) {
        ctx.strokeStyle = "#140C06";
        ctx.lineWidth = 50;
        for (i = 0; i < Math.ceil(cv.main.width / cv.main.height) + 1; i++) {
          ctx.strokeRect(
            ((i - 1) * cv.main.height) + ((Date.now() / 10)) % cv.main.height,
            0,
            cv.main.height + 1,
            cv.main.height,
          );
        }
      }
    }

    /* Draw text */
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = cv.main.width * 0.1 + "px " + data.font;
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 3;
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#1116";
    ctx.fillStyle = "#DDE";
    if (data.graphics > 2) {
      ctx.strokeText(
        lang.title,
        cv.main.width * 0.5,
        cv.main.height * 0.45,
      );
    }
    ctx.fillText(
      lang.title,
      cv.main.width * 0.5,
      cv.main.height * 0.45,
    );
    ctx.font = cv.main.width * 0.04 + "px " + data.font;
    ctx.lineWidth = 5;
    if (data.graphics > 2) {
      ctx.strokeText(
        lang.continue,
        cv.main.width * 0.5,
        cv.main.height * 0.7,
      );
    }
    ctx.fillText(
      lang.continue,
      cv.main.width * 0.5,
      cv.main.height * 0.7,
    );

    if (data.graphics > 3) {
      /* Draw vignette */
      var grd = ctxs.shadow.createRadialGradient(
        cv.main.width * 0.5,
        cv.main.height * 0.5,
        0,
        cv.main.width * 0.5,
        cv.main.height * 0.5,
        cv.main.width,
      );
      grd.addColorStop(0, "#0000");
      grd.addColorStop(1, "#0006");
      ctx.fillStyle = grd;
      ctx.fillCanvas(grd);
    }

    ctx.font = cv.main.width * 0.04 + "px " + data.font;
    ctx.textBaseline = "bottom";
    ctx.textAlign = "right";
    ctx.fillStyle = "#CCCA";
    ctx.lineWidth = 4;
    if (data.graphics > 2) {
      ctx.strokeText(
        lang.name,
        cv.main.width * 0.98,
        cv.main.height * 0.98,
      );
    }
    ctx.fillText(
      lang.name,
      cv.main.width * 0.98,
      cv.main.height * 0.98,
    );
    ctx.shadowColor = "#0000";
    ctx.shadowBlur = 0;
  } else if (gameState == "end") {
    /* Title screen */
    ctx.fillCanvas("#222");

    if (data.graphics > 1) {
      /* Draw background */
      for (i = 0; i < Math.ceil(cv.main.width / cv.main.height) + 1; i++) {
        ctx.drawImage(
          images.brick_0,
          (i * cv.main.height) + (-(Date.now() / 10)) % cv.main.height,
          0,
          cv.main.height + 1,
          cv.main.height,
        );
      }
      ctx.fillCanvas("#1116");

      /* Draw player */
      if (data.graphics > 2) {
        /* Draw shadow */
        var grd = ctxs.shadow.createRadialGradient(
          cv.main.width * 0.26,
          cv.main.height * 0.21,
          0,
          cv.main.width * 0.26,
          cv.main.height * 0.21,
          cv.main.height * 0.2,
        );
        grd.addColorStop(0, "#FFF2");
        grd.addColorStop(1, "#0000");
        ctx.fillStyle = grd;
        ctx.fillCanvas(grd);
      }

      ctx.drawImage(
        images["player_idle_" + (data.graphics < 3 ? 0 : (frame.current % playerImages.idle))],
        cv.main.width * 0.2,
        cv.main.height * 0.1,
        cv.main.height * 0.2,
        cv.main.height * 0.2,
      );

      /* Draw bats */
      for (i = 0; i < 3; i++) {
        if (data.graphics > 2) {
          /* Draw shadow */
          var grd = ctxs.shadow.createRadialGradient(
            cv.main.width * 0.51 + (i * cv.main.width * 0.12),
            cv.main.height * 0.19,
            0,
            cv.main.width * 0.51 + (i * cv.main.width * 0.12),
            cv.main.height * 0.19,
            cv.main.height * 0.15,
          );
          grd.addColorStop(0, "#0004");
          grd.addColorStop(1, "#0000");
          ctx.fillStyle = grd;
          ctx.fillCanvas(grd);
        }

        ctx.drawImage(
          images["bat_" + (data.graphics < 3 ? 0 : (frame.current % data.enemies.bat.images))],
          cv.main.width * 0.48 + (i * cv.main.width * 0.12),
          cv.main.height * 0.15,
          cv.main.height * 0.1,
          cv.main.height * 0.1,
        );
      }

      /* Draw skelly's */
      time = 1500;
      if (global.drawSkelly + time > Date.now()) {
        ctx.globalAlpha = ((global.drawSkelly + time) - Date.now()) / time;
        ctx.drawImage(
          images["skelly_" + (data.graphics < 3 ? 0 : (frame.current % data.enemies.skelly.images))],
          cv.main.width * 0.2,
          cv.main.height * 0.48,
          cv.main.height * 0.2,
          cv.main.height * 0.5,
        );
        ctx.drawImage(
          images["skelly_" + (data.graphics < 3 ? 0 : (frame.current % data.enemies.skelly.images))],
          cv.main.width * 0.8 - cv.main.height * 0.2,
          cv.main.height * 0.48,
          cv.main.height * 0.2,
          cv.main.height * 0.5,
        );
        ctx.globalAlpha = "1";
      }
    } else {
      ctx.fillCanvas(data.blocks.none.color);

      if (data.graphics > 0) {
        ctx.strokeStyle = "#140C06";
        ctx.lineWidth = 50;
        for (i = 0; i < Math.ceil(cv.main.width / cv.main.height) + 1; i++) {
          ctx.strokeRect(
            (i * cv.main.height) + (-(Date.now() / 10)) % cv.main.height,
            0,
            cv.main.height + 1,
            cv.main.height,
          );
        }
      }
    }

    /* Draw text */
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = cv.main.width * 0.1 + "px " + data.font;
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 3;
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#1116";
    ctx.fillStyle = "#DDE";
    if (data.graphics > 2) {
      ctx.strokeText(
        lang.thank,
        cv.main.width * 0.5,
        cv.main.height * 0.45,
      );
    }
    ctx.fillText(
      lang.thank,
      cv.main.width * 0.5,
      cv.main.height * 0.45,
    );
    ctx.font = cv.main.width * 0.04 + "px " + data.font;
    ctx.lineWidth = 5;
    if (data.graphics > 2) {
      ctx.strokeText(
        lang.time_end.format({
          time: global.timerEnd
        }),
        cv.main.width * 0.5,
        cv.main.height * 0.65,
      );
    }
    ctx.fillText(
      lang.time_end.format({
        time: global.timerEnd
      }),
      cv.main.width * 0.5,
      cv.main.height * 0.65,
    );
    if (data.graphics > 2) {
      ctx.strokeText(
        lang.continue,
        cv.main.width * 0.5,
        cv.main.height * 0.8,
      );
    }
    ctx.fillText(
      lang.continue,
      cv.main.width * 0.5,
      cv.main.height * 0.8,
    );

    /* Draw vignette */
    if (data.graphics > 3) {
      var grd = ctxs.shadow.createRadialGradient(
        cv.main.width * 0.5,
        cv.main.height * 0.5,
        0,
        cv.main.width * 0.5,
        cv.main.height * 0.5,
        cv.main.width,
      );
      grd.addColorStop(0, "#0000");
      grd.addColorStop(1, "#0006");
      ctx.fillStyle = grd;
      ctx.fillCanvas(grd);
    }

    ctx.font = cv.main.width * 0.04 + "px " + data.font;
    ctx.textBaseline = "bottom";
    ctx.textAlign = "right";
    ctx.fillStyle = "#CCCA";
    ctx.lineWidth = 4;
    if (data.graphics > 2) {
      ctx.strokeText(
        lang.name,
        cv.main.width * 0.98,
        cv.main.height * 0.98,
      );
    }
    ctx.fillText(
      lang.name,
      cv.main.width * 0.98,
      cv.main.height * 0.98,
    );
    ctx.shadowColor = "#0000";
    ctx.shadowBlur = 0;

    /* Draw torches */
    if (data.graphics > 1) {
      x = cv.main.width * 0.07;
      y = cv.main.height * 0.42;
      w = cv.main.height * 0.2;
      h = cv.main.height * 0.2;
      for (i = 0; i < 2; i++) {
        if (i) {
          x = cv.main.width - x - w;
        }

        ctx.save();
        ctx.translate(
          x + w / 2,
          y + h,
        );
        ctx.rotate((i ? 30 : 330) * Math.PI / 180);
        ctx.translate(
          - (x + w / 2),
          - (y + h),
        );

        ctx.fillStyle = "#433";
        ctx.fillRect(
          x + w / 2 - 10,
          y + h - 15,
          20,
          20,
        );
        ctx.drawImage(
          images["torch_" + (data.graphics < 3 ? 0 : frame.current % data.blocks.torch.images)],
          x,
          y,
          w,
          h,
        );

        if (data.graphics > 2) {
          /* Draw light */
          var grd = ctxs.shadow.createRadialGradient(
            x + w * 0.5,
            y + h * 0.4,
            0,
            x + w * 0.5,
            y + h * 0.4,
            w * 1.3,
          );
          grd.addColorStop(0, "#FF82");
          grd.addColorStop(1, "#0000");
          ctx.fillStyle = grd;
          ctx.fillCanvas(grd);
        }
        ctx.restore();
      }
    }
  }
  if (
    gameState == "load"
    || (
      gameState == "start"
    )
  ) {
    /* Loading screen */
    h = Math.max(0, Math.round(256 - ((Date.now() - global.lastStart) * 0.4))).toString(16);
    if (h.length > 2) {
      h = "FF";
    }
    if (h.length == 1) {
      h = "0" + h;
    }
    ctx.fillCanvas("#101010" + h);
    ctx.fillStyle = "#E0E0E0" + h;
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.font = cv.main.width * 0.08 + "px Arial";
    ctx.fillText(
      lang.loading,
      cv.main.width * 0.5,
      cv.main.height * 0.1,
    );
  }

  time0 = 1000;
  if (global.lastGraphics + time0 > Date.now()) {
    ctxs.overlay.font = cv.overlay.width * 0.03 + "px " + data.font;
    ctxs.overlay.textBaseline = "bottom";
    ctxs.overlay.textAlign = "left";
    h = "FF";
    if (data.graphics > 0) {
      h = (((global.lastGraphics + time0 - Date.now()) / time0) * 256).round().toString(16).fill(2);
    }
    ctxs.overlay.fillStyle = "#888888" + h;
    ctxs.overlay.fillText(
      lang.graphics.format(data.graphics),
      cv.overlay.h * 0.02,
      cv.overlay.h * 0.99,
    );
  }
}