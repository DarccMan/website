function render() {
  ctx.fillCanvas();
  ctx.drawImage(
    images["bg/{0}.png".format(scene.bg_img)],
    0,
    0,
    canvas.width,
    canvas.height,
  );

  for (b = 0; b < blocks.length; b++) {
    p = F.getCamPos(blocks[b], scene.cam);
    if (blocks[b].fill) {
      ctx.fillStyle = blocks[b].fill;
    } else {
      ctx.fillStyle = F.getColor(data.blocks.fill);
    }
    ctx.fillRect(
      p.x,
      p.y,
      p.w,
      p.h,
    );
    if (blocks[b].stroke) {
      ctx.strokeStyle = blocks[b].stroke;
      ctx.lineWidth = blocks[b].lineWidth ? blocks[b].lineWidth : data.blocks.lineWidth;
      ctx.strokeRect(
        p.x,
        p.y,
        p.w,
        p.h,
      );
    }
  }

  p = F.getCamPos(player, scene.cam);
  if (F.operate.logic.xor(player.flip, player.flipped)) {
    ctx.save();
    ctx.translate(
      p.x,
      p.y,
    );
    ctx.scale(-1, 1);
    ctx.drawImage(
      images["player/{0}.png".format(player.pose)],
      0 - p.w,
      0,
      p.w,
      p.h,
    );
    ctx.restore();
  } else {
    ctx.drawImage(
      images["player/{0}.png".format(player.pose)],
      p.x,
      p.y,
      p.w,
      p.h,
    );
  }

  if (gameState != "complete") {
    ctx.fillStyle = F.getColor(250);
    ctx.font = "24px Cubic";
    ctx.textAlign = "right";
    ctx.fillText(
      (lvl + 1).toString().fill(),
      canvas.width - 10,
      40,
    );
    ctx.fillStyle = F.getColor(250);
    ctx.font = "24px Cubic";
    ctx.textAlign = "left";
    ctx.fillText(
      (timer.value / 100).round(2),
      10,
      40,
    );
  }

  switch (gameState) {
    case ("title"): {
      ctx.fillCanvas(F.getColor([20, 20, 20, 0.5]));

      ctx.fillStyle = F.getColor(250);
      ctx.font = "48px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        egg.title ? "Heckdude v2" : "Deckhude v2",
        canvas.width / 2,
        canvas.height / 2,
      );

      ctx.fillStyle = F.getColor(170);
      ctx.font = "16px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        "By Darcy",
        canvas.width / 2,
        canvas.height - 30,
      );
    }; break;
    case ("level"): {
      ctx.fillCanvas(F.getColor([20, 20, 20, 0.5]));

      ctx.fillStyle = F.getColor(250);
      ctx.font = "48px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        "Level {0}".format(lvl + 1),
        canvas.width / 2,
        canvas.height / 2.3,
      );

      ctx.font = "32px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        (lvls[lvl].name ? lvls[lvl].name : "Unknown").truncate(22, "..."),
        canvas.width / 2,
        canvas.height / 1.5,
      );
    }; break;
    case ("pause"): {
      ctx.fillCanvas(F.getColor([20, 20, 20, 0.5]));

      ctx.fillStyle = F.getColor(250);
      ctx.font = "48px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        "Paused",
        canvas.width / 2,
        canvas.height / 2.3,
      );

      ctx.fillStyle = F.getColor(220);
      ctx.font = "24px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press ESC to continue",
        canvas.width / 2,
        canvas.height / 1.5,
      );
    }; break;
    case ("complete"): {
      ctx.fillCanvas(F.getColor([20, 20, 20, 0.5]));

      ctx.fillStyle = F.getColor(250);
      ctx.font = "48px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        "Completed",
        canvas.width / 2,
        canvas.height / 2.3,
      );

      ctx.fillStyle = F.getColor(220);
      ctx.font = "24px Cubic";
      ctx.textAlign = "center";
      ctx.fillText(
        "Time: {0}".format((timer.value / 100).round(2)),
        canvas.width / 2,
        canvas.height / 1.5,
      );
    }; break;
  }

  if (overlay.type && overlay.a > 0) {
    ctx.globalAlpha = overlay.a / 100;
    ctx.drawImage(
      images["game/{0}-overlay.png".format(overlay.type)],
      0,
      0,
      canvas.width,
      canvas.height,
    );
    ctx.globalAlpha = 1.0;
  }

  ctx.drawImage(
    images["game/overlay.png"],
    0,
    0,
    canvas.width,
    canvas.height,
  );
}