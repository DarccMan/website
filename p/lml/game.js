var cv = [];
var ct = [];
let cvs = ["bg", "fg", "lord"];
for (i = 0; i < cvs.length; i++) {
  cv[cvs[i]] = doc.create("canvas");
  cv[cvs[i]].id = "cv-" + cvs[i];
  cv[cvs[i]].initialize();
  cv[cvs[i]].w = data.canvas.h * data.canvas.ratio;
  cv[cvs[i]].h = data.canvas.h;
  cv[cvs[i]].setAttribute("oncontextmenu", "return(false);");
  doc.id("wrap").appendChild(cv[cvs[i]]);
  ct[cvs[i]] = cv[cvs[i]].getContext("2d");
  ct[cvs[i]].imageSmoothingEnabled = false;
}
doc.id("wrap").style.width = data.canvas.h * data.canvas.ratio + "px";
doc.id("wrap").style.height = data.canvas.h + "px";

var lord = {};
var global = {};
var offset = 0;
var images = {};

for (i = 0; i < blocks.keys().length; i++) {
  if (blocks.values()[i].noImage) {
    continue;
  }
  img = new Image();
  img.src = "./image/{0}.png".format(blocks.values()[i].id);
  images[blocks.values()[i].id] = img;
}
img = new Image();
img.src = "./image/lord.png";
images.lord = img;

function reset() {
  lord = {
    x: (cv.bg.w / (cv.bg.h / data.blocks.h) - data.lord.w) / 2,
    y: data.lord.y,
    w: data.lord.w,
    h: data.lord.h,
    vx: 0,
    vy: 0,
  };

  if (!global.start) {
    global.start = 0;
  }
}

function render() {
  /* Background */
  ct.bg.fillCanvas(blocks.S.color);
  for (i = 0; i < bg.length; i++) {
    if (data.image && !blocks[bg[i]].noImage) {
      ct.bg.drawImage(
        images[blocks[bg[i]].id],
        ((i - offset) % data.blocks.w + data.blocks.w - 1) * (cv.bg.h / data.blocks.h),
        Math.floor(i / data.blocks.w) * (cv.bg.h / data.blocks.h),
        cv.bg.h / data.blocks.h + 1,
        cv.bg.h / data.blocks.h + 1,
      );
    } else {
      ct.bg.fillStyle = blocks[bg[i]].color;
      ct.bg.fillRect(
        ((i - offset) % data.blocks.w + data.blocks.w - 1) * (cv.bg.h / data.blocks.h),
        Math.floor(i / data.blocks.w) * (cv.bg.h / data.blocks.h),
        cv.bg.h / data.blocks.h + 1,
        cv.bg.h / data.blocks.h + 1,
      );
    }
  }

  /* Obstacles */
  ct.fg.clearRect(
    0,
    0,
    cv.fg.w,
    cv.fg.h,
  );
  ct.fg.fillStyle = blocks.M.color;
  for (i = 0; i < fg.length; i++) {
    name = "M";
    if (fg[i] != "#") {
      name = "K";
    }
    if (data.image && !blocks[name].noImage) {
      ct.fg.drawImage(
        images[blocks[name].id],
        ((i - offset) % data.blocks.w + data.blocks.w - 1) * (cv.fg.h / data.blocks.h),
        data.blocks.obstacle * (cv.fg.h / data.blocks.h),
        cv.fg.h / data.blocks.h + 1,
        cv.fg.h / data.blocks.h + 1,
      );
    } else {
      ct.fg.fillStyle = blocks[name].color;
      ct.fg.fillRect(
        ((i - offset) % data.blocks.w + data.blocks.w - 1) * (cv.fg.h / data.blocks.h),
        data.blocks.obstacle * (cv.fg.h / data.blocks.h),
        cv.fg.h / data.blocks.h + 1,
        cv.fg.h / data.blocks.h + 1,
      );
    }
  }

  /* Lord */
  ct.lord.clearRect(
    0,
    0,
    cv.lord.w,
    cv.lord.h,
  );
  if (data.image) {
    ct.lord.drawImage(
      images.lord,
      lord.x * (cv.bg.h / data.blocks.h),
      lord.y * (cv.bg.h / data.blocks.h),
      data.lord.rw * (cv.bg.h / data.blocks.h),
      lord.h * (cv.bg.h / data.blocks.h),
    );
  } else {
    ct.lord.fillStyle = data.lord.color;
    ct.lord.fillRect(
      lord.x * (cv.bg.h / data.blocks.h),
      lord.y * (cv.bg.h / data.blocks.h),
      lord.w * (cv.bg.h / data.blocks.h),
      lord.h * (cv.bg.h / data.blocks.h),
    );
  }

  /* Jump piston */
  d0 = data.jump.duration[0] * 1000;
  d1 = data.jump.duration[1] * 1000;
  d2 = data.jump.duration[2] * 1000;
  d1 += d0;
  d2 += d1;
  d3 = d2 - d1;
  time = global.lastJump || 0;
  h = ((time + d2) - Date.now()) / d3;
  if (time + d1 > Date.now()) {
    h = 1 - (((time + d0) - Date.now()) / d0);
  }
  if (
    time + d0 < Date.now()
    && time + d1 > Date.now()
  ) {
    h = 1;
  }
  if (time + d2 < Date.now()) {
    h = 0;
  }
  arm = 0.3;
  head = 0.3

  if (data.image && !blocks.A.noImage) {
    ct.fg.drawImage(
      images[blocks.A.id],
      ((cv.bg.w / (cv.fg.h / data.blocks.h) - data.lord.w) / 2) * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h - h + 1) * (cv.fg.h / data.blocks.h),
      (cv.fg.h / data.blocks.h) + 1,
      (cv.fg.h / data.blocks.h) * 1.2 + 1,
    );
  } else {
    ct.fg.fillStyle = blocks.A.color;
    ct.fg.fillRect(
      ((cv.bg.w / (cv.bg.h / data.blocks.h) - data.lord.w + 1 - arm) / 2) * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h) * (cv.fg.h / data.blocks.h),
      (cv.fg.h / data.blocks.h) * arm + 1,
      cv.fg.h / data.blocks.h + 1,
    );
  }

  if (data.image && !blocks.P.noImage) {
    ct.fg.drawImage(
      images[blocks.P.id],
      ((cv.fg.w / (cv.fg.h / data.blocks.h) - data.lord.w) / 2) * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h + 1) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      cv.fg.h / data.blocks.h + 1,
    );
  } else {
    ct.fg.fillStyle = blocks.P.color;
    ct.fg.fillRect(
      ((cv.fg.w / (cv.fg.h / data.blocks.h) - data.lord.w) / 2) * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h + 1) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      cv.fg.h / data.blocks.h + 1,
    );
  }

  if (data.image && !blocks.H.noImage) {
    ct.fg.drawImage(
      images[blocks.H.id],
      ((cv.fg.w / (cv.fg.h / data.blocks.h) - data.lord.w) / 2) * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h - h + 1) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      (cv.fg.h / data.blocks.h) + 1,
    );
  } else {
    ct.fg.fillStyle = blocks.H.color;
    ct.fg.fillRect(
      ((cv.fg.w / (cv.fg.h / data.blocks.h) - data.lord.w) / 2) * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h - h + 1) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      (cv.fg.h / data.blocks.h) * head + 1,
    );
  }

  if (data.image && !blocks.J.noImage) {
    ct.fg.drawImage(
      images[blocks.J.id],
      ((cv.fg.w / (cv.fg.h / data.blocks.h) - data.lord.w) / 2) * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h - h) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      cv.fg.h / data.blocks.h + 1,
    );
  } else {
    ct.fg.fillStyle = blocks.J.color;
    ct.fg.fillRect(
      ((cv.fg.w / (cv.fg.h / data.blocks.h) - data.lord.w) / 2) * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h - h) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      cv.fg.h / data.blocks.h + 1,
    );
  }

  /* Respawn piston */
  time = global.lastRespawn || 0;
  h = ((time + d2) - Date.now()) / d3;
  if (time + d1 > Date.now()) {
    h = 1 - (((time + d0) - Date.now()) / d0);
  }
  if (
    time + d0 < Date.now()
    && time + d1 > Date.now()
  ) {
    h = 1;
  }
  if (time + d2 < Date.now()) {
    h = 0;
  }

  if (data.image && !blocks.A.noImage) {
    ct.fg.drawImage(
      images[blocks.A.id],
      (data.blocks.respawn) * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h - h + 1) * (cv.fg.h / data.blocks.h),
      (cv.fg.h / data.blocks.h) + 1,
      (cv.fg.h / data.blocks.h) * 1.2 + 1,
    );
  } else {
    ct.fg.fillStyle = blocks.A.color;
    ct.fg.fillRect(
      (data.blocks.respawn) * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h) * (cv.fg.h / data.blocks.h),
      (cv.fg.h / data.blocks.h) * arm + 1,
      cv.fg.h / data.blocks.h + 1,
    );
  }

  if (data.image && !blocks.P.noImage) {
    ct.fg.drawImage(
      images[blocks.P.id],
      data.blocks.respawn * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h + 1) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      cv.fg.h / data.blocks.h + 1,
    );
  } else {
    ct.fg.fillStyle = blocks.P.color;
    ct.fg.fillRect(
      data.blocks.respawn * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h + 1) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      cv.fg.h / data.blocks.h + 1,
    );
  }

  if (data.image && !blocks.H.noImage) {
    ct.fg.drawImage(
      images[blocks.H.id],
      data.blocks.respawn * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h - h + 1) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      (cv.fg.h / data.blocks.h) + 1,
    );
  } else {
    ct.fg.fillStyle = blocks.H.color;
    ct.fg.fillRect(
      data.blocks.respawn * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h - h + 1) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      (cv.fg.h / data.blocks.h) * head + 1,
    );
  }

  if (data.image && !blocks.J.noImage) {
    ct.fg.drawImage(
      images[blocks.J.id],
      data.blocks.respawn * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h - h) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      cv.fg.h / data.blocks.h + 1,
    );
  } else {
    ct.fg.fillStyle = blocks.J.color;
    ct.fg.fillRect(
      data.blocks.respawn * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h - h) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      cv.fg.h / data.blocks.h + 1,
    );
  }

  /* Debug things */
  if (global.debug) {
    ct.lord.fillStyle = "#FF04";
    ct.lord.fillRect(
      lord.x * (cv.bg.h / data.blocks.h),
      lord.y * (cv.bg.h / data.blocks.h),
      lord.w * (cv.bg.h / data.blocks.h),
      lord.h * (cv.bg.h / data.blocks.h),
    );

    min = lord.x + (offset % data.blocks.w) + 1;
    max = min + 1;
    for (i = Math.floor(min); i < max; i++) {
      ct.fg.fillStyle = "#F004";
      ct.fg.fillRect(
        ((i - offset) % data.blocks.w + data.blocks.w - 1) * (cv.fg.h / data.blocks.h),
        data.blocks.obstacle * (cv.fg.h / data.blocks.h),
        cv.fg.h / data.blocks.h + 1,
        cv.fg.h / data.blocks.h + 1,
      );
      if (fg[i % data.blocks.w] == "#") {
        ct.fg.fillStyle = "#0F04";
        ct.fg.fillRect(
          ((i - offset) % data.blocks.w + data.blocks.w - 1) * (cv.fg.h / data.blocks.h),
          data.blocks.obstacle * (cv.fg.h / data.blocks.h),
          cv.fg.h / data.blocks.h + 1,
          cv.fg.h / data.blocks.h + 1,
        );
      }
    }

    ct.fg.fillStyle = "#00F8";
    ct.fg.fillRect(
      ((cv.bg.w / (cv.bg.h / data.blocks.h) - data.lord.w) / 2) * (cv.fg.h / data.blocks.h),
      (data.lord.y + lord.h) * (cv.fg.h / data.blocks.h),
      cv.fg.h / data.blocks.h + 1,
      cv.fg.h / data.blocks.h + 1,
    );
  }

  grd = ct.lord.createRadialGradient(
    cv.lord.w / 2,
    cv.lord.h / 2,
    0,
    cv.lord.w / 2,
    cv.lord.h / 2,
    cv.lord.h,
  );
  grd.addColorStop(0, "#0000");
  grd.addColorStop(1, "#0004");
  // ct.lord.fillStyle = grd;
  ct.lord.fillCanvas(grd);
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  offset = Date.now() / 1000 * data.speed + global.start;

  if (
    keysDown.up
    || keysDown.up_b
    || F.touch.down
    && (global.lastJump || 0) + (data.jump.duration[0] + data.jump.duration[1] + data.jump.duration[2]) * 1000 < Date.now()
  ) {
    if (
      lord.y + data.blocks.h * 0.05 > data.blocks.ground - lord.h
      && lord.x + lord.w > (cv.bg.w / (cv.bg.h / data.blocks.h) - data.lord.w) / 2
    ) {
      if (!global.respawning) {
        lord.vy -= data.v.j * 0.01;
        global.lastJump = Date.now();
      }
    } else if (!(
      lord.y + lord.vy + lord.h > data.blocks.ground - lord.h
    ) || !(
      lord.x + lord.w > (cv.bg.w / (cv.bg.h / data.blocks.h) - data.lord.w) / 2
    )) {
      global.lastJump = Date.now();
    }
  }

  if (lord.y + lord.vy < data.blocks.ground - lord.h) {
    lord.vy += data.v.ya * mod;
  } else {
    lord.vy = 0;
  }
  if (lord.vx > 0) {
    lord.vx -= data.v.xa * mod;
  } else if (lord.vx < 0) {
    lord.vx += data.v.xa * mod;
  }
  if (Math.abs(0 - lord.vx) < 0.01) {
    lord.vx = 0;
    global.respawning = false;
  }

  if (!global.respawning) {
    collide = false;
    if (
      lord.y + lord.vy < data.blocks.obstacle + (cv.fg.h / data.blocks.h)
      && lord.y + lord.vy + lord.h - 0.5 > data.blocks.obstacle
    ) {
      min = lord.x + (offset % data.blocks.w) + 1;
      max = min + 1;
      for (i = Math.floor(min); i < max; i++) {
        if (fg[i % data.blocks.w] == "#") {
          lord.x = i - (offset % data.blocks.w) - 1.9;
          collide = true;
          break;
        }
      }
    }

    if (
      lord.y + lord.vy < data.blocks.obstacle + (cv.fg.h / data.blocks.h)
      && lord.y + lord.vy + lord.h > data.blocks.obstacle
    ) {
      min = lord.x + (offset % data.blocks.w) + 1;
      max = min + 1;
      for (i = Math.floor(min); i < max; i++) {
        if (fg[i % data.blocks.w] == "#") {
          if (!collide) {
            lord.vy = 0;
          } else {
            lord.vy = lord.vy.setBorder(0, Infinity);
          }
          break;
        }
      }
    }
  }

  lord.vy = lord.vy.setBorder(- data.v.ym * mod, data.v.ym * mod);
  lord.vx = lord.vx.setBorder(- data.v.xm * mod, data.v.xm * mod);
  lord.y += lord.vy;
  lord.x += lord.vx;

  if (
    lord.x < data.blocks.respawn
  ) {
    global.lastRespawn = Date.now();
    lord.vy = - data.v.yr;
    lord.vx = data.v.xr;
    global.respawning = true;
  }

  if (keysDown.fast) {
    global.start += 10 * mod;
  }
  if (keysDown.image) {
    if (global.once_image) {
      global.once_image = false;
      data.image = !data.image;
    }
  } else {
    global.once_image = true;
  }
  global.debug = false;
  if (keysDown.debug) {
    global.debug = true;
  }
}

var then = Date.now();
reset();
main();