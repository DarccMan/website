function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  cam.x = parseFloat(doc.id("x").value);
  cam.y = parseFloat(doc.id("y").value);
  cam.z = parseFloat(doc.id("z").value);
  F.ls("cam", JSON.stringify(cam));
  newLine = null;

  if (gameState == "play" || gameState == "plot") {
    selectedPlace = null;
    fl = data.shops[shop].map.floor;
    if (F.mouse.onCanvas) {
      names = [];
      for (b = 0; b < spots.length; b++) {
        bl = spots[b];
        p = F.getCamPos({
          x: bl.x,
          y: bl.y,
          w: bl.w,
          h: bl.h,
        }, cam);
        if (F.collide(p, {
          x: F.mouse.x,
          y: F.mouse.y,
          w: 10,
          h: 10,
        })) {
          names.push(bl.name);
          selectedPlace = {
            name: names,
            x: bl.x + fl.x + (bl.w / 2),
            y: bl.y + fl.y + (bl.h / 2),
            type: "s",
          }
        }
      }
    }
    if (!selectedPlace) {
      fl = data.shops[shop].map.floor;
      if (F.mouse.onCanvas) {
        for (b = 0; b < data.shops[shop].map.types.keys().length; b++) {
          bl = data.shops[shop].map.types.values()[b];
          p = F.getCamPos({
            x: bl.x + fl.x,
            y: bl.y + fl.y,
            w: bl.w,
            h: bl.h,
          }, cam);
          if (F.collide(p, {
            x: F.mouse.x,
            y: F.mouse.y,
            w: 1,
            h: 1,
          })) {
            selectedPlace = {
              name: data.shops[shop].map.types.keys()[b],
              x: bl.x + fl.x + (bl.w / 2),
              y: bl.y + fl.y + (bl.h / 2),
              type: "p",
            };
            break;
          }
        }
      }
    }
  }
  if (gameState == "plot") {
    if (F.mouse.onCanvas) {
      newLine = {
        x: (((F.mouse.x - (canvas.width / 2)) / (cam.z / 100)) + (canvas.width / 2)) + cam.x,
        y: (((F.mouse.y - (canvas.height / 2)) / (cam.z / 100)) + (canvas.height / 2)) - cam.y,
      };
      if (F.buttonDown(0)) {
        if (vals.path_add) {
          path.push(newLine);
          vals.path_add = false;
          p = F.getCamPos({
            x: data.shops[shop].map.out.x + fl.x,
            y: data.shops[shop].map.out.y + fl.y,
            w: data.map.inOutSize,
            h: data.map.inOutSize,
          }, cam);
          if (F.collide(p, {
            x: F.mouse.x,
            y: F.mouse.y,
            w: 1,
            h: 1,
          })) {
            plotPath();
          }
        }
      } else {
        vals.path_add = true;
      }
    }
  }
}