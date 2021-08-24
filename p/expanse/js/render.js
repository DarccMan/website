function render() {
  /* Create proper units of measurement */
  measure.cvw = cv.main.width;
  measure.cvh = cv.main.height;
  // measure.unit = measure.cvw / blocks.length;
  measure.unit = data.cam.blockSize;

  /* Clear all canvases */
  //TODO Change this later for optimization
  for (i in cvs) {
    F.clearCanvas(ct[cvs[i]]);
    ct[cvs[i]].save();
  }

  /* Canvases that move with camera (Not background) */
  moveCvs = ["main", "player"];
  for (i in moveCvs) {
    ct[moveCvs[i]].translate(
      measure.cvw / 2,
      measure.cvh / 2,
    );
    ct[moveCvs[i]].scale(
      cam.z,
      cam.z,
    );
    ct[moveCvs[i]].translate(
      - measure.cvw / 2,
      - measure.cvh / 2,
    );
    ct[moveCvs[i]].translate(
      - cam.x * cam.z * measure.unit,
      - cam.y * cam.z * measure.unit,
    );
  }

  /* Draw background */
  if (cam.z < data.cam.minZoomImage.bg) {
    ct.bg.fillStyle = data.blocks.none.color;
    F.fillCanvas(
      ct.bg,
      data.blocks.none.color,
    );
  } else {

    /* Move background with camera */
    x = Math.floor((measure.cvw / 2) / measure.unit) * measure.unit;
    y = Math.floor((measure.cvh / 2) / measure.unit) * measure.unit;
    x = 0;
    y = 0;
    ct.bg.translate(
      x,
      y,
    );
    ct.bg.scale(
      cam.z,
      cam.z,
    );
    ct.bg.translate(
      - x,
      - y,
    );
    ct.bg.translate(
      - cam.x * cam.z * measure.unit * data.cam.parallax,
      - cam.y * cam.z * measure.unit * data.cam.parallax,
    );

    /* Draw background blocks */
    ax = Math.floor(cam.x * cam.z * data.cam.parallax);
    ay = Math.floor(cam.y * cam.z * data.cam.parallax);
    for (x = 0; x < (measure.cvw / measure.unit) / cam.z + 1; x++) {
      for (y = 0; y < (measure.cvh / measure.unit) / cam.z + 1; y++) {
        ct.bg.drawImage(
          images[`block_none_0`],
          Math.floor((ax + x) * measure.unit) - 1,
          Math.floor((ay + y) * measure.unit) - 1,
          Math.ceil(measure.unit) + 1,
          Math.ceil(measure.unit) + 1,
        );
      }
    }
  }

  /* Draw blocks */
  for (x = 0; x < blocks.length; x++) {
    for (y = 0; y < blocks[x].length; y++) {
      if (!data.blocks[blocks?.[x]?.[y]?.id]) {
        continue;
      }

      if (!data.blocks[blocks[x][y].id].hidden) {
        if (cam.z < data.cam.minZoomImage.blocks) {
          ct.main.fillStyle = data.blocks[blocks[x][y].id].color;
          ct.main.fillRect(
            Math.floor(x * measure.unit),
            Math.floor(y * measure.unit),
            Math.ceil(measure.unit) + 1,
            Math.ceil(measure.unit) + 1,
          );
        } else {
          ct.main.drawImage(
            images[`block_${blocks[x][y].id}_0`],
            Math.floor(x * measure.unit),
            Math.floor(y * measure.unit),
            Math.ceil(measure.unit) + 1,
            Math.ceil(measure.unit) + 1,
          );
        }
      }
    }
  }

  /* Draw player */
  //* Add images
  //TODO Optimize
  if (cam.z < data.cam.minZoomImage.player) {
    ct.player.fillStyle = data.player.color;
    ct.player.fillRect(
      Math.floor(player.x * measure.unit),
      Math.floor(player.y * measure.unit),
      Math.ceil(player.w * measure.unit),
      Math.ceil(player.h * measure.unit),
    );
  } else {
    ct.player.drawImage(
      images[`player_${player.state}_0`],
      Math.floor(player.x * measure.unit),
      Math.floor(player.y * measure.unit),
      Math.ceil(player.w * measure.unit),
      Math.ceil(player.h * measure.unit),
    );
  }

  ct.lineWidth = 2;
  ct.player.strokeStyle = "#00F8";
  ct.player.strokeRect(
    Math.floor(player.x * measure.unit),
    Math.floor(player.y * measure.unit),
    Math.ceil(player.w * measure.unit),
    Math.ceil(player.h * measure.unit),
  );

  ct.player.strokeStyle = "#0F08";
  ct.player.strokeRect(
    Math.floor(player.Hx * measure.unit),
    Math.floor(player.Hy * measure.unit),
    Math.ceil(player.Hw * measure.unit),
    Math.ceil(player.Hh * measure.unit),
  );

  /* Restore all canvases */
  for (i in cvs) {
    ct[cvs[i]].restore();
  }
}