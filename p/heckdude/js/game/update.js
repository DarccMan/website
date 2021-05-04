function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  scene.cam.z = parseFloat(doc.id("z").value);
  thenX = player.x + (player.w / 2);
  thenY = player.y + (player.h / 2);
  old = player.vel_y;

  switch (gameState) {
    case ("play"): {
      try {
        doc.id("x").value = scene.cam.x;
        doc.id("y").value = scene.cam.y;
        doc.id("z").value = scene.cam.z;
      } catch { }

      if (scene.cam.type == "sticky") {
        if (scene.cam.x) {
          scene.cam.x = player.x - (canvas.width / 3);
        }
        if (scene.cam.y) {
          scene.cam.y = player.y - (canvas.height / 3);
        }
      }

      player.flip = false;
      mult = 0;
      switch (F.bool_bin(keysDown.player_right, keysDown.player_left)) {
        case ("10"): {
          if (player.flipped) {
            player.flip = true;
          }
          player.pose = "idle_side";
          mult = 1;
        }; break;
        case ("01"): {
          if (!player.flipped) {
            player.flip = true;
          }
          player.pose = "idle_side";
          mult = -1;
        }; break;
        default: {
          player.pose = "idle";
          player.vel_x -= (player.speed_move_decel * mod) * (0 - Math.sign(player.vel_x));
          if (F.diff(0, player.vel_x) <= 1) {
            player.vel_x = 0;
          }
        }
      }
      player.vel_x += (player.speed_move_acel * mod) * mult;

      if (keysDown.player_up) {
        if (player.jumpVal && val.pass) {
          player.jumpVal = false;
          player.vel_y -= player.speed_jump;
        }
      } else {
        val.pass = true;
        if (keysDown.player_down) {
          if (player.vel_y + (player.speed_drop_acel * mod) < player.speed_drop_max) {
            player.vel_y += player.speed_drop_acel;
          } else {
            player.vel_y = player.speed_drop_max;
          }
        }
      }
      if (player.vel_y <= -1) {
        player.pose = "jump";
      }

      if (player.vel_y + (player.speed_fall_acel * mod) < player.speed_fall_max) {
        player.vel_y += player.speed_fall_acel * mod;
      } else {
        player.vel_y = player.speed_fall_max;
      }
      player.vel_x = player.vel_x.setBorder(0 - player.speed_move_max, player.speed_move_max);

      cb = null;
      for (b = 0; b < blocks.length; b++) {
        if (!data.blocks.types[blocks[b].type].solid) {
          continue;
        }
        if (F.collide({
          x: player.x,
          y: player.y + player.vel_y,
          w: player.w,
          h: player.h,
        }, blocks[b])) {
          cb = blocks[b];
          break;
        }
      }
      if (cb === null) {
        player.y += player.vel_y;
      } else {
        player.vel_y = 0;
      }

      cb = null;

      for (b = 0; b < blocks.length; b++) {
        if (!data.blocks.types[blocks[b].type].solid) {
          continue;
        }
        if (F.collide({
          x: player.x + 1,
          y: player.y + 1,
          w: player.w - 2,
          h: player.h,
        }, blocks[b])) {
          cb = blocks[b];
          break;
        }
      }
      player.jumpVal = cb !== null;

      cb = null;
      for (b = 0; b < blocks.length; b++) {
        if (!data.blocks.types[blocks[b].type].solid) {
          continue;
        }
        if (F.collide({
          x: player.x + player.vel_x,
          y: player.y,
          w: player.w,
          h: player.h,
        }, blocks[b])) {
          cb = blocks[b];
          break;
        }
      }
      if (cb === null) {
        if (player.vel_x >= 1) {
          player.pose = "run";
        }
        player.x += player.vel_x;
      } else {
        player.vel_x = 0;
      }

      if (scene.fallDeath) {
        if (F.getCamPos(player, scene.cam).y > canvas.height) {
          death();
        }
      }

      if (keysDown.restart) {
        gameState = "restart";
        if (lvl <= 0) {
          timer.stop();
        }
        reset();
        return;
      }

      if (keysDown.pause) {
        if (val.pause) {
          gameState = "pause";
          timer.stop();
          val.pause = false;
        }
      } else {
        val.pause = true;
      }

      if (scene.cam_type == "dynamic") {
        if (scene.cam_x) {
          x = player.x + (player.w / 2);
          y = player.y + (player.h / 2);
          if (x < thenX) {
            if (F.getCamPos({
              x,
              y,
            }, scene.cam).x < canvas.width / scene.cam_edge) {
              scene.cam.x += x - thenX;
            }
          }
          if (x > thenX) {
            if (F.getCamPos({
              x,
              y,
            }, scene.cam).x > (canvas.width / scene.cam_edge) * (scene.cam_edge - 1)) {
              scene.cam.x += x - thenX;
            }
          }
        }
        if (scene.cam_y) {
          if (y > thenY) {
            if (F.getCamPos({
              x,
              y,
            }, scene.cam).y < canvas.height / scene.cam_edge) {
              scene.cam.y += y - thenY;
            }
          }
          if (y < thenY) {
            if (F.getCamPos({
              x,
              y,
            }, scene.cam).y > (canvas.height / scene.cam_edge) * (scene.cam_edge - 1)) {
              scene.cam.y += y - thenY;
            }
          }
        }
      }

      let types = {
        solid: (cb) => {
          player.y -= mod * 100;
        },
        goal,
        death,
      };
      main: for (i = 0; i < types.keys().length; i++) {
        for (b = 0; b < blocks.length; b++) {
          if (!data.blocks.types[blocks[b].type][types.keys()[i]]) {
            continue;
          }
          if (F.collide({
            x: player.x + player.vel_x,
            y: player.y,
            w: player.w,
            h: player.h,
          }, blocks[b])) {
            types.values()[i](blocks[b]);
            break main;
          }
        }
      }
    }; break;
    case ("title"): {
      if (keysDown.title_pass) {
        if (val.pass) {
          gameState = "level";
          val.pass = false;
        }
      } else {
        val.pass = true;
      }
    }; break;
    case ("level"): {
      if (keysDown.title_pass) {
        if (val.pass) {
          gameState = "play";
          val.pass = false;
          if (lvl <= 0) {
            timer.play();
            timer.reset();
          }
        }
      } else {
        val.pass = true;
      }
    }; break;
    case ("pause"): {
      if (keysDown.pause) {
        if (val.pause) {
          gameState = "play";
          timer.play();
          val.pause = false;
        }
      } else {
        val.pause = true;
      }
    }; break;
    case ("complete"): {
      if (keysDown.title_pass) {
        if (val.pass) {
          reset();
          val.pass = false;
        }
      } else {
        val.pass = true;
      }
    }; break;
    case ("edit"): {
      editor(keysDown);
    }; break;
  }

  if (keysDown.debug_main) {
    if (F.buttonDown(0)) {
      if (score.cheats) {
        score.cheats++;
      } else {
        score.cheats = 1;
      }
      player.x = (((F.mouse.x - (canvas.width / 2)) / (scene.cam.z / 100)) + (canvas.width / 2)) + scene.cam.x;
      player.y = (((F.mouse.y - (canvas.height / 2)) / (scene.cam.z / 100)) + (canvas.height / 2)) - scene.cam.y;
    }
  }
}