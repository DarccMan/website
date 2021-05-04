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
      ctx.lineWidth = F.getCamPos({
        w: blocks[b].lineWidth ? blocks[b].lineWidth : data.blocks.lineWidth,
      }, scene.cam).w;
      ctx.strokeRect(
        p.x,
        p.y,
        p.w,
        p.h,
      );
    }
  }

  if (inEditor) {
    if (newBlock) {
      p = {
        x: (((F.mouse.x - (canvas.width / 2)) / (scene.cam.z / 100)) + (canvas.width / 2)) + scene.cam.x,
        y: (((F.mouse.y - (canvas.height / 2)) / (scene.cam.z / 100)) + (canvas.height / 2)) - scene.cam.y,
      };
      block = {
        x: Math.min(p.x, newBlock.x),
        y: Math.min(p.y, newBlock.y),
        w: F.diff(p.x, newBlock.x),
        h: F.diff(p.y, newBlock.y),
      };
      p = F.getCamPos(block, scene.cam);
      ctx.fillStyle = doc.id("block_defaultColor").checked ? data.blocks.types[doc.id("block_type").value].fill : doc.id("block_fill").value,
        ctx.fillRect(
          p.x,
          p.y,
          p.w,
          p.h,
        );
      if (doc.id("block_doStroke").checked) {
        ctx.strokeStyle = doc.id("block_stroke").value;
        ctx.lineWidth = doc.id("block_line").value;
        ctx.strokeRect(
          p.x,
          p.y,
          p.w,
          p.h,
        );
      }
    }
    if (selectedBlock != undefined) {
      ctx.strokeStyle = F.getColor(selectedBlock.down ? 250 : 200);
      ctx.lineWidth = 2;
      p = F.getCamPos(blocks[selectedBlock.num], scene.cam);
      ctx.strokeRect(
        p.x,
        p.y,
        p.w,
        p.h,
      );
    }
  }

  p = F.getCamPos(player, scene.cam);
  ctx.drawImage(
    images["player/{0}.png".format(player.pose)],
    p.x,
    p.y,
    p.w,
    p.h,
  );

  ctx.drawImage(
    images["game/overlay.png"],
    0,
    0,
    canvas.width,
    canvas.height,
  );
}