function render() {
  if (gameState != "load") {
    ctx.fillCanvas(data.sprites.none);
    ctx.save();
    if (data.graphics > 0) {
      /* Background parallax effect */
      ctx.translate(
        - cam.x * (1 - data.parallax),
        - cam.y * (1 - data.parallax),
      );

      /* Background follows player */
      ax = Math.floor((cam.x * (1 - data.parallax) * 1.5) / ((canvas.width / data.tiles)));
      ay = Math.floor((cam.y * (1 - data.parallax)) / ((canvas.height / data.tiles)));

      for (x = 0; x < tx + 1; x++) {
        for (y = 0; y < data.tiles + 1; y++) {
          if (data.graphics > 1) {
            ctx.drawImage(
              images.none,
              (ax + x) * tw,
              (ay + y) * tw,
              tw,
              tw,
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

    ctx.save();
    /* Remove parallax effect and move for camera */
    ctx.translate(
      - cam.x * (data.parallax * 2),
      - cam.y * (data.parallax * 2),
    );

    for (x = 0; x < grid.length; x++) {
      for (y = 0; y < grid[x].length; y++) {
        if (grid[x][y].block == "none") {
          continue;
        }
        /* Draw block */
        if (data.graphics > 1) {
          if (data.image_amount[grid[x][y].block]) {
            ctx.drawImage(
              images[grid[x][y].block + "_" + frame.current % data.image_amount[grid[x][y].block]],
              x * tw - 1,
              y * tw - 1,
              tw + 1,
              tw + 1,
            );
          } else {
            ctx.drawImage(
              images[grid[x][y].block],
              x * tw - 1,
              y * tw - 1,
              tw + 1,
              tw + 1,
            );
          }

          /* Draw outline of blocks (DONT ASK ME HOW IT WORKS, I blacked out and woke up to it working) */
          if (data.graphics > 2) {
            if (data.outlines.includes(grid[x][y].block)) {
              for (c = 0; c < cs.length; c++) {
                if (
                  x + cs[c][0] < 0
                  || x + cs[c][0] >= grid.length
                  || y + cs[c][1] < 0
                  || y + cs[c][1] >= grid[x].length
                  || !data.outlines.includes(grid[x + cs[c][0]][y + cs[c][1]].block)
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
                    !data.outlines.includes(grid[x + ci[c][0][0]]?.[y + ci[c][0][1]]?.block)
                    && data.outlines.includes(grid[x + ci[c][1][0]]?.[y + ci[c][1][1]]?.block)
                    && data.outlines.includes(grid[x + ci[c][2][0]]?.[y + ci[c][2][1]]?.block)
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
                    !data.outlines.includes(grid[x + co[c][0][0]]?.[y + co[c][0][1]]?.block)
                    || (
                      !grid[x + co[c][0][0]]
                      || !grid[x + co[c][0][0]][y + co[c][0][1]]
                    )
                  ) && (
                    !data.outlines.includes(grid[x + co[c][1][0]]?.[y + co[c][1][1]]?.block)
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
        } else {
          /* Low graphics blocks */
          ctx.fillStyle = data.sprites[grid[x][y].block];
          ctx.fillRect(
            x * tw - 1,
            y * tw - 1,
            tw + 1,
            tw + 1,
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
      }
      if (gameState == "win") {
        /* Draw player moving for level transition */
        ctx.save();
        ctx.translate(
          cam.x,
          cam.y,
        );
        ctx.drawImage(
          images["player_transition_" + frame.current % playerImages.transition],
          (player.animate - 0.5) * (canvas.width + (player.w / player.h) * canvas.height),
          canvas.height / 10,
          (player.w / player.h) * canvas.height,
          canvas.height,
        );
        ctx.restore();
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
          images["player_" + player.status + "_" + frame.current % playerImages[player.status]],
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
        ctx.translate(
          player.x + player.w / 2,
          player.y + player.h / 2,
        );
        ctx.rotate(30 * Math.PI / 180);
        ctx.translate(
          - (player.x + player.w / 2),
          - (player.y + player.h / 2),
        );
        if (data.image_amount[player.hold]) {
          ctx.drawImage(
            images[player.hold + "_" + frame.current % data.image_amount[player.hold]],
            player.x + 20,
            player.y,
            player.w * data.hold_size,
            player.h * data.hold_size,
          );
        } else {
          ctx.drawImage(
            images[player.hold],
            player.x,
            player.y,
            player.w * data.hold_size,
            player.h * data.hold_size,
          );
        }
        ctx.restore();
      }
    } else {
      /* Low graphics player */
      ctx.fillStyle = data.player.color;
      ctx.fillRect(
        player.x + (player.w / 2 - (player.w * (data.player.hitX) / 2)),
        player.y + (player.h - player.h * (data.player.hitY)),
        player.w * data.player.hitX,
        player.h * data.player.hitY,
      );

      if (player.hold) {
        ctx.save();
        ctx.translate(
          player.x + player.w / 2,
          player.y + player.h / 2,
        );
        ctx.rotate(30 * Math.PI / 180);
        ctx.translate(
          - (player.x + player.w / 2),
          - (player.y + player.h / 2),
        );
        ctx.fillStyle = data.sprites[player.hold];
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
      if (enemies[i].dead) {
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
      if (data.graphics > 1) {
        if (data.image_amount[enemies[i].type] > 1) {
          ctx.drawImage(
            images[enemies[i].type + "_" + frame.current % data.image_amount[enemies[i].type]],
            enemies[i].x,
            enemies[i].y - enemies[i].w + enemies[i].h,
            enemies[i].w,
            enemies[i].w,
          );
        } else {
          /* One frame */
          ctx.drawImage(
            images[enemies[i].type],
            enemies[i].x,
            enemies[i].y - enemies[i].w + enemies[i].h,
            enemies[i].w,
            enemies[i].w,
          );
        }
      } else {
        /* Low graphics enemies */
        ctx.fillStyle = data.enemies[enemies[i].type].color;
        ctx.fillRect(
          enemies[i].x,
          enemies[i].y + enemies[i].h - ((data.enemies[enemies[i].type].h) * tw),
          data.enemies[enemies[i].type].w * tw,
          data.enemies[enemies[i].type].h * tw,
        );
      }
      ctx.restore();
    }

    ctx.restore();
    if (data.graphics > 2) {
      /* Shadow Subtraction (DONT ASK ME HOW THIS WORKS EITHER) */
      ctx2.fillCanvas("#000");

      radius_0 = 50;
      radius_1 = 200;

      var grd = ctx2.createRadialGradient(
        - cam.x + player.x + (player.w / 2),
        - cam.y + player.y + (player.w / 2),
        Math.max(player.w, player.h) * data.shadow.p_r0,
        - cam.x + player.x + (player.w / 2),
        - cam.y + player.y + (player.w / 2),
        tw * data.shadow.p_r1 * (data.light.includes(player.hold) ? data.shadow.torch_multiply : 1),
      );
      grd.addColorStop(1, "#0000");
      grd.addColorStop(0, "#FFF");
      ctx2.fillStyle = grd;
      ctx2.fillRect(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      for (x = 0; x < grid.length; x++) {
        for (y = 0; y < grid[0].length; y++) {
          if (data.light.includes(grid[x][y])) {
            grd = ctx2.createRadialGradient(
              ((x + 0.5) * tw) - cam.x,
              ((y + 0.5) * tw) - cam.y,
              tw * data.shadow.r0,
              ((x + 0.5) * tw) - cam.x,
              ((y + 0.5) * tw) - cam.y,
              tw * data.shadow.r1,
            );
            grd.addColorStop(0, "#FFF");
            grd.addColorStop(1, "#0000");
            ctx2.fillStyle = grd;
            ctx2.fillRect(
              0,
              0,
              canvas2.width,
              canvas2.height,
            );
          }
        }
      }

      imgd = ctx2.getImageData(0, 0, canvas.width, canvas.height);
      pix = imgd.data;

      for (i = 0, n = pix.length; i < n; i += 4) {
        if (
          pix[i + 0] > 0 &&
          pix[i + 1] > 0 &&
          pix[i + 2] > 0
        ) {
          pix[i + 3] = data.shadow.opacity - pix[i + 0];
          pix[i + 0] = 0;
          pix[i + 1] = 0;
          pix[i + 2] = 0;
        } else {
          pix[i + 0] = 0;
          pix[i + 1] = 0;
          pix[i + 2] = 0;
          pix[i + 3] = data.shadow.opacity;
        }
      }

      ctx2.putImageData(imgd, 0, 0);
      ctx.drawImage(canvas2, 0, 0, canvas.width, canvas.height);
    }

    if (gameState == "play") {
      /* Draw level number and fade out */
      time0 = 1500;
      time1 = 1000;
      if (global.lastRestart + time0 > Date.now()) {
        ctx.font = canvas.width * 0.06 + "px " + data.font;
        h = "FF";
        if (data.graphics > 0) {
          h = Math.round((Math.min(time1, time0 - (Date.now() - global.lastRestart)) * (256 / time1)) * 0.7).toString(16);
          if (h.length > 2) {
            h = "FF";
          }
        }
        ctx.fillStyle = "#FFFFFF" + (h.length < 2 ? "0" : "") + h;
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.fillText(
          "Level {0} '{1}'".format(lvl, levels[lvl].name || "Unknown"),
          canvas.width * 0.02,
          canvas.width * 0.02,
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
          ctx.fillStyle = "#B0B0B0" + (h.length < 2 ? "0" : "") + h;
          ctx.textBaseline = "top";
          ctx.textAlign = "center";
          ctx.font = canvas.width * 0.05 + "px " + data.font;
          ctx.fillText(
            "The sign reads:",
            canvas.width * 0.5,
            canvas.height * 0.1,
          );
          ctx.fillStyle = "#FFFFFF" + (h.length < 2 ? "0" : "") + h;
          ctx.font = canvas.width * 0.08 + "px " + data.font;
          ctx.fillText(
            global.signText,
            canvas.width * 0.5,
            canvas.height * 0.2,
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
      ctx.fillCanvas("#FF0000" + (h.length < 2 ? "0" : "") + h);
      ctx.font = canvas.width * 0.12 + "px " + data.font;
      ctx.fillStyle = "#FFF";
      if (data.graphics > 0) {
        ctx.save();
        ctx.translate(
          canvas.width / 2,
          canvas.height / 2,
        );
        ctx.rotate((1 - player.animate) * Math.PI / 2);
        ctx.translate(
          - canvas.width / 2,
          - canvas.height / 2,
        );
        ctx.font = (canvas.width * 0.001) * (player.animate * 100) + "px " + data.font;
        h = Math.round(player.animate * 256 / 2).toString(16);
        ctx.fillStyle = "#FFFFFF" + (h.length < 2 ? "0" : "") + h;
      }
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(
        global.deathMessage,
        canvas.width * 0.5,
        canvas.height * 0.3,
      );
      ctx.restore();
    } else if (gameState == "start") {
      /* Title screen */
      ctx.fillCanvas("#2226");
      ctx.fillStyle = "#EEE";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.font = canvas.width * 0.12 + "px " + data.font;
      ctx.fillText(
        "Expanse of Darkness",
        canvas.width * 0.5,
        canvas.height * 0.45,
      );
      ctx.font = canvas.width * 0.05 + "px " + data.font;
      ctx.fillText(
        "Press SPACE to continue",
        canvas.width * 0.5,
        canvas.height * 0.7,
      );
      ctx.font = canvas.width * 0.05 + "px " + data.font;
      ctx.textBaseline = "bottom";
      ctx.textAlign = "right";
      ctx.fillStyle = "#CCCA";
      ctx.fillText(
        "By Darcy",
        canvas.width * 0.98,
        canvas.height * 0.98,
      );
    }
  } else {
    /* Loading screen */
    ctx.fillCanvas("#111");
    ctx.fillStyle = "#EEE";
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.font = canvas.width * 0.08 + "px Arial";
    ctx.fillText(
      "Loading Assets...",
      canvas.width * 0.5,
      canvas.height * 0.1,
    );
  }
}