function render() {
  for (i = 0; i < ctxs.keys().length; i++) {
    ctxs.values()[i].clearRect(
      0,
      0,
      ctxs.values()[i].canvas.w,
      ctxs.values()[i].canvas.h,
    );
  }

  if (!["load", "start", "end"].includes(gameState)) {
    if (data.graphics >= data.cam.graphics) {
      minx = cvw * data.cam.minx;
      maxx = cvw * data.cam.maxx;
      miny = cvh * data.cam.miny;
      maxy = cvh * data.cam.maxy;
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
      // cam.x = player.x + (player.w / 2) - (cvw * data.cam.x);
      // cam.y = player.y + (player.h / 2) - (cvh * data.cam.y);
    }

    ctx.save();
    ctx.translate(
      - cam.x,
      - cam.y,
    );

    for (x = tech.w_minx; x < tech.w_maxx; x++) {
      for (y = tech.w_miny; y < tech.w_maxy; y++) {
        block = grid[x]?.[y];
        if (block) {
          name = block.block;

          ctx.drawImage(
            images["none_" + (data.graphics < 3 ? 0 : (frame.current % amount))] || images.none,
            Math.floor(tw * x),
            Math.floor(tw * y),
            Math.ceil(tw + 1),
            Math.ceil(tw + 1),
          );
        }
      }
    }

    tech.w_minx = (Math.floor(cam.x / tw)).setBorder(0, grid.length - 1);
    tech.w_maxx = (Math.floor((cam.x + cvw) / tw) + 1).setBorder(0, grid.length);
    tech.w_miny = (Math.floor(cam.y / tw)).setBorder(0, grid[0].length - 1);
    tech.w_maxy = (Math.floor((cam.y + cvh) / tw) + 1).setBorder(0, grid[0].length);

    for (x = tech.w_minx; x < tech.w_maxx; x++) {
      for (y = tech.w_miny; y < tech.w_maxy; y++) {
        block = grid[x]?.[y];
        if (block) {
          name = block.block;
          if (!data.blocks[name].ignoreDraw) {

            ctx.drawImage(
              images[name + "_" + (data.graphics < 3 ? 0 : (frame.current % amount))] || images.unknown_0,
              Math.floor(tw * x),
              Math.floor(tw * y),
              Math.ceil(tw + 1),
              Math.ceil(tw + 1),
            );
          }
        }
      }
    }

    ctx.scale(
      tw / 100,
      tw / 100,
    );
    ctx.drawImage(
      images.player_idle_0,
      player.x,
      player.y,
      player.w,
      player.h,
    );

    ctx.restore();
  }
}