function render() {
  ctx.fillCanvas();
  
  ctx.save();
  ctx.translate(
    (((0 - cam.x) - (canvas.width / 2)) * (cam.z / 100)) + (canvas.width / 2),
    (((0 - cam.y) - (canvas.width / 2)) * (cam.z / 100)) + (canvas.width / 2),
  )
  ctx.scale(
    cam.z / 100,
    cam.z / 100,
  );

  ctx.fillStyle = F.getColor(100);
  fl = data.shops[shop].map.floor;
  ctx.fillRect(
    fl.x,
    fl.y,
    fl.w,
    fl.h,
  );
  
  ctx.fillStyle = F.getColor(240);
  ctx.strokeStyle = F.getColor(20);
  ctx.lineWidth = 2;
  for (b = 0; b < data.shops[shop].map.types.keys().length; b++) {
    bl = data.shops[shop].map.types.values()[b];
    ctx.fillRect(
      fl.x + bl.x,
      fl.y + bl.y,
      bl.w,
      bl.h,
    );
    ctx.strokeRect(
      fl.x + bl.x,
      fl.y + bl.y,
      bl.w,
      bl.h,
    );
  }

  ctx.fillStyle = F.getColor(10);
  sl = data.shops[shop].map.in;
  ctx.fillRect(
    fl.x + sl.x,
    fl.y + sl.y,
    data.map.inOutSize,
    data.map.inOutSize,
  );
  sl = data.shops[shop].map.out;
  ctx.fillRect(
    fl.x + sl.x,
    fl.y + sl.y,
    data.map.inOutSize,
    data.map.inOutSize,
  );

  ctx.strokeStyle = "magenta";
  if (path.length > 0) {
    ctx.beginPath();
    ctx.moveTo(
      path[0].x,
      path[0].y,
    );
    for (l = 1; l < path.length; l++) {
      ctx.lineTo(
        path[l].x,
        path[l].y
      );
    }
    if (newLine) {
      ctx.lineTo(
        newLine.x,
        newLine.y
      );
    }
    ctx.stroke();
  }

  ctx.fillStyle = "red";
  for (i = 0; i < spots.length; i++) {
    ctx.beginPath();
    ctx.ellipse(
      spots[i].x,
      spots[i].y,
      spots[i].w,
      spots[i].h,
      0, 0, 2 * Math.PI
    );
    ctx.fill();
  }

  if (selectedPlace) {
    switch (selectedPlace.type) {
      case ("p"): {
        ctx.font = "30pt Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        let txt = selectedPlace.name.capWords();
        w = ctx.measureText(txt).width + 15;
        h = parseInt(ctx.font) + 15;
    
        ctx.fillStyle = F.getColor([10, 10, 10, 0.7]);
        ctx.fillRoundRect(
          selectedPlace.x - (w / 2),
          selectedPlace.y - h,
          w,
          h,
          8,
        );
    
        ctx.fillStyle = F.getColor([250, 240, 240]);
        ctx.fillText(
          txt,
          selectedPlace.x,
          selectedPlace.y,
        );
      }; break;
      case ("s"): {
        ctx.font = "25pt Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        header = "Items:";
        w = ctx.measureText(header).width;
        ctx.font = "15pt Arial";
        h = 45;
        for (i = 0; i < selectedPlace.name.length; i++) {
          let txt = selectedPlace.name[i].capWords();
          w = Math.max(w, ctx.measureText(txt).width);
          h += parseInt(ctx.font) + 8;
        }
        w += 20;

        ctx.fillStyle = F.getColor([10, 10, 10, 0.7]);
        ctx.fillRoundRect(
          selectedPlace.x - (w / 2),
          selectedPlace.y - 10,
          w,
          h,
          8,
        );
        
        ctx.font = "25pt Arial";
        ctx.fillStyle = F.getColor([250, 240, 240]);
        ctx.fillText(
          header,
          selectedPlace.x,
          selectedPlace.y + 30,
        );
        ctx.font = "15pt Arial";
        h = 55;
        for (i = 0; i < selectedPlace.name.length; i++) {
          let txt = selectedPlace.name[i].capWords();
          ctx.fillText(
            txt,
            selectedPlace.x,
            selectedPlace.y + h,
          );
          h += parseInt(ctx.font) + 8;
        }
      }; break;
    }
  }

  ctx.restore();
}