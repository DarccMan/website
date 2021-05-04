var canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.width = data.canvas.w;
canvas.height = data.canvas.h;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false

/* Define variables */
var cursor = {
  x: data.canvas.w / 2,
  y: data.canvas.h / 2,
};
var gameState = "load";

/* Define sprites */
var player = {
  x: 0,
  y: 0,
  w: data.player.w,
  h: data.player.h,
  vel: {
    x: 0,
    y: 0,
  },
  head: {
    r: 0,
  },
  img: {
    head: new Image(),
    body: new Image(),
  },
  speed: data.player.speed,
};
player.img.head.src = "image/texture/player/head.png";
player.img.body.src = "image/texture/player/body.png";
var blocks = {};
var sBlock = {
  x: 0,
  y: 0,
  val: false,
  side: 0,
};
var ray = [];

function reset() {
  /* Set unset tags to default */
  for (i = 0; i < data.blocks.types.length; i++) {
    if ([null, undefined, ""].includes(data.blocks.types[i].tags)) {
      data.blocks.types[i].tags = {};
    }
    for (i2 = 0; i2 < data.blocks.tags.keys().length; i2++) {
      if ([null, undefined, ""].includes(data.blocks.types[i].tags[data.blocks.tags.keys()[i2]])) {
        data.blocks.types[i].tags[data.blocks.tags.keys()[i2]] = data.blocks.tags.values()[i2];
      }
    }
  }

  block_reset();
  gameState = "play";
}

function render() {
  ctx.fillCanvas("rgba(60, 60, 60)");

  /* Draw sky gradient */
  if (! data.settings.useImage) {
    var grd = ctx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, F.getColor(data.canvas.bg_color.start));
    grd.addColorStop(1, F.getColor(data.canvas.bg_color.end));
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    sky_image = new Image();
    sky_image.src = "image/texture/environment/sky.png";
    ctx.drawImage(
      sky_image,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  }

  /* Draw blocks */
  for (x = 0; x < blocks.keys().length; x++) {
    for (y = 0; y < blocks[x].keys().length; y++) {
      if (! data.settings.useImage) {
        ctx.fillStyle = F.getColor(data.blocks.types.getFromId(blocks[x][y].type).color);
        ctx.strokeStyle = F.getColor(data.blocks.types.getFromId(blocks[x][y].type).color, -50);
        ctx.fillRect(
          (x * data.blocks.w) - player.x,
          (y * data.blocks.h) - player.y,
          data.blocks.w,
          data.blocks.h,
        );
        ctx.strokeRect(
          (x * data.blocks.w) - player.x,
          (y * data.blocks.h) - player.y,
          data.blocks.w,
          data.blocks.h,
        );
      } else {
        if (data.blocks.types.getFromId(blocks[x][y].type).tags["texture"]) {
          block_image = new Image();
          block_image.src = "image/texture/block/{0}.png".format(blocks[x][y].type);
          ctx.drawImage(
            block_image,
            (x * data.blocks.w) - player.x,
            (y * data.blocks.h) - player.y,
            data.blocks.w,
            data.blocks.h,
          );
        }
      }
      if (data.blocks.types.getFromId(blocks[x][y].type).tags["destroy"] >= 0) {
        destroy_stage = 8 - F.setBorder(Math.floor((blocks[x][y].dura / data.blocks.types.getFromId(blocks[x][y].type).tags["destroy"]) * 10), 0, 9);
        // console.log(destroy_stage);
        if (destroy_stage >= 0 && destroy_stage <= 9) {
          if (! data.settings.useImage) {
            ctx.fillStyle = "rgba(10, 10, 10, {0})".format((destroy_stage / 20));
            ctx.fillRect(
              (x * data.blocks.w) - player.x,
              (y * data.blocks.h) - player.y,
              data.blocks.w,
              data.blocks.h,
            );
          } else {
            destroy_img = new Image();
            destroy_img.src = "image/texture/block_destroy/{0}.png".format(destroy_stage);
            ctx.drawImage(
              destroy_img,
              (x * data.blocks.w) - player.x,
              (y * data.blocks.h) - player.y,
              data.blocks.w,
              data.blocks.h,
            );
          }
        }
      }
    }
  }
  if (sBlock.val) {
    ctx.strokeStyle = F.getColor(data.blocks.selected_color);
    ctx.lineWidth = data.blocks.selected_width;
    ctx.strokeRect(
      (getSBlock().x * data.blocks.w) - player.x,
      (getSBlock().y * data.blocks.h) - player.y,
      data.blocks.w,
      data.blocks.h,
    );
  }

  /* Draw player body */
  if (! data.settings.useImage) {
    ctx.fillStyle = F.getColor(data.player.color.body);
    ctx.strokeStyle = F.getColor(data.player.color.body, -50);
    ctx.lineWidth = 3;
    ctx.fillRect(
      (canvas.width / 2) - (player.w / 2),
      (canvas.height / 2) - (player.h / 2),
      player.w,
      player.h,
    );
    ctx.strokeRect(
      (canvas.width / 2) - (player.w / 2),
      (canvas.height / 2) - (player.h / 2),
      player.w,
      player.h,
    );
  } else  {
    ctx.drawImage(
      player.img.body,
      (canvas.width / 2) - (player.w / 2),
      (canvas.height / 2) - (player.h / 2),
      player.w,
      player.h,
    );
  }
  /* Draw player head (rotated) */
  ctx.fillStyle = F.getColor(data.player.color.head);
  ctx.strokeStyle = F.getColor(data.player.color.head, -50);
  ctx.save();
  ctx.translate(
    ((canvas.width / 2)),
    ((canvas.height / 2) - data.player.head.h),
  );
  ctx.rotate((player.head.r - 90) * Math.PI / 180);
  if (player.head.r < 0) {
    ctx.scale(1, -1);
  }
  ctx.translate(
    0 - ((canvas.width / 2)),
    0 - ((canvas.height / 2) - data.player.head.h),
  );
  if (! data.settings.useImage) {
    ctx.fillRect(
      (canvas.width / 2) - (data.player.head.w / 2),
      (canvas.height / 2) - (player.h / 2) - data.player.head.h,
      data.player.head.w,
      data.player.head.h,
    );
    ctx.strokeRect(
      (canvas.width / 2) - (data.player.head.w / 2),
      (canvas.height / 2) - (player.h / 2) - data.player.head.h,
      data.player.head.w,
      data.player.head.h,
    );
  } else {
    ctx.drawImage(
      player.img.head,
      (canvas.width / 2) - (data.player.head.w / 2),
      (canvas.height / 2) - (player.h / 2) - data.player.head.h,
      data.player.head.w,
      data.player.head.h,
    );
  }
  ctx.restore();

  /* Draw cursor */
  if (F.mouse.onCanvas) {
    ctx.fillStyle = F.getColor(data.cursor.color);
    ctx.fillRect(
      cursor.x - (data.cursor.w / 2),
      cursor.y - data.cursor.h - (data.cursor.gap / 2),
      data.cursor.w,
      data.cursor.h,
    );
    ctx.fillRect(
      cursor.x - (data.cursor.w / 2),
      cursor.y + (data.cursor.gap / 2),
      data.cursor.w,
      data.cursor.h,
    );
    ctx.fillRect(
      cursor.x - data.cursor.h - (data.cursor.gap / 2),
      cursor.y - (data.cursor.w / 2),
      data.cursor.h,
      data.cursor.w,
    );
    ctx.fillRect(
      cursor.x + (data.cursor.gap / 2),
      cursor.y - (data.cursor.w / 2),
      data.cursor.h,
      data.cursor.w,
    );
  }
}

function main() {
  /* Fancy stuff */
  var now = Date.now();
  var delta = now - then;
  render();
  update(delta / 1000);
  then = now;
  requestAnimationFrame(main);
}
addEventListener("onmousemove", () => {
  return (false);
}, false);

var placeVal = true;
var placeValReset;

function update(mod) {
  keysDown = F.getKeyCodes(controls);
  /* Setting cursor pos */
  if (F.mouse.onCanvas) {
    cursor.x = (F.mouse.x - data.cursor.offsetX);
    cursor.y = (F.mouse.y - data.cursor.offsetY);
  }

  if (gameState == "play") {
    /* Rotating head towards cursor */
    angle = F.getAngle(cursor.x, cursor.y, (canvas.width / 2), ((canvas.height / 2) - data.player.head.h), true);
    if (angle <= data.player.head.r_max) {
      if (angle > 0 - data.player.head.r_max) {
        if (angle < 0 - data.player.head.r_min || angle > data.player.head.r_min) {
          player.head.r = angle;
        } else if (angle <= data.player.head.r_min) {
          angle = data.player.head.r_min;
        } else {
          angle = 0 - data.player.head.r_min;
        }
      } else {
        player.head.r = 0 - data.player.head.r_max;
      }
    } else {
      player.head.r = data.player.head.r_max;
    }

    /* Moving left and right */
    if (! (keysDown.includes("player_left") || keysDown.includes("player_right"))) {
      if (player.vel.x > 0) {
        player.vel.x -= (mod * data.player.vel.move_slow);
      } else if (player.vel.x < 0) {
        player.vel.x += (mod * data.player.vel.move_slow);
      }
      if (player.vel.x < data.player.vel.min && player.vel.x > 0 - data.player.vel.min) {
        player.vel.x = 0;
      }
    } else if (keysDown.includes("player_left")) {
      if (player.vel.x - (mod * data.player.vel.move_increase) >= 0 - data.player.vel.move_max) {
        player.vel.x -= (mod * data.player.vel.move_increase);
      } else {
        player.vel.x = 0 - data.player.vel.move_max;
      }
    } else if (keysDown.includes("player_right")) {
      if (player.vel.x + (mod * data.player.vel.move_increase) <= data.player.vel.move_max) {
        player.vel.x += (mod * data.player.vel.move_increase);
      } else {
        player.vel.x = data.player.vel.move_max;
      }
    }

    /* Jumping */
    F.val("player_jump", (
      keysDown.includes("player_up") &&
      ! [null].includes(cBlock)
    ), () => {
      for (i = 0; i < 7; i++) {
        if (player.vel.y - 1 <= 5) {
          player.vel.y -= 1;
        }
      }
    });

    /* Moving down */
    cBlock = null;
    xI: for (x = 0; x < blocks.keys().length; x++) {
      for (y = 0; y < blocks[x].keys().length; y++) {
        if (F.collide({
          x: (canvas.width / 2) - (player.w / 2),
          y: (canvas.height / 2) - (player.h / 2),
          w: player.w,
          h: player.h,
        }, {
          x: (x * data.blocks.w) - player.x - player.vel.x,
          y: (y * data.blocks.h) - player.y - player.vel.y - 1,
          w: data.blocks.w,
          h: data.blocks.h,
        })) {
          if (! data.blocks.types.getFromId(blocks[x][y].type).tags["unobstructive"]) {
            cBlock = {
              x: x,
              y: y,
              type: blocks[x][y].type,
            };
            break xI;
          }
        }
      }
    }
    if ([null].includes(cBlock)) {
      if ((player.vel.y + (mod * data.player.vel.increase)) <= data.player.vel.terminal) {
        player.vel.y += (mod * data.player.vel.increase);
      } else {
        player.vel.y = data.player.vel.terminal;
      }
    } else {
      /* If stuck in block, move up */
      player.vel.y = 0;
      cBlock = null;
      xI: for (x = 0; x < blocks.keys().length; x++) {
        for (y = 0; y < blocks[x].keys().length; y++) {
          if (F.collide({
            x: (canvas.width / 2) - (player.w / 2),
            y: (canvas.height / 2) - (player.h / 2),
            w: player.w,
            h: player.h,
          }, {
            x: (x * data.blocks.w) - player.x,
            y: (y * data.blocks.h) - player.y,
            w: data.blocks.w,
            h: data.blocks.h,
          })) {
            if (! data.blocks.types.getFromId(blocks[x][y].type).tags["unobstructive"]) {
              cBlock = {
                x: x,
                y: y,
                type: blocks[x][y].type,
              };
              break xI;
            }
          }
        }
      }
      if (! [null].includes(cBlock)) {
        player.y -= 1;
      }
    }

    cBlock = null;
    xI: for (x = 0; x < blocks.keys().length; x++) {
      for (y = 0; y < blocks[x].keys().length; y++) {
        if (F.collide({
          x: (canvas.width / 2) - (player.w / 2),
          y: (canvas.height / 2) - (player.h / 2),
          w: player.w,
          h: player.h,
        }, {
          x: (x * data.blocks.w) - player.x,
          y: (y * data.blocks.h) - player.y - 1,
          w: data.blocks.w,
          h: data.blocks.h,
        })) {
          if (! data.blocks.types.getFromId(blocks[x][y].type).tags["unobstructive"]) {
            cBlock = {
              x: x,
              y: y,
              type: blocks[x][y].type,
            };
            break xI;
          }
        }
      }
    }

    /* Changing coords to match velocity */
    player.y += player.vel.y;
    player.x += player.vel.x * player.speed;
    /* Maybe would be good to use if able to stop mouse moving off screen */
    /* cursor.x -= player.vel.x; */
    
    /* Ray trace! */
    faceC = {
      x: (canvas.width / 2),
      y: (canvas.height / 2) - data.player.head.h,
    }
    ray2 = F.trace({
      x: cursor.x,
      y: cursor.y,
    }, {
      x: (canvas.width / 2),
      y: (canvas.height / 2) - (data.player.h / 2) - (data.player.head.h / 2),
    }, 5);
    len = 0;
    if (ray2.length > 0) {
      last = {
        x: ray[0].x,
        y: ray[0].y,
      };
      for (p = 0; p < ray2.length; p++) {
        /* ctx.beginPath();
        ctx.ellipse(ray2[p].x, ray2[p].y, 2, 2, 0, 0, 2 * Math.PI);
        ctx.fill() */
        if (len > (data.player.head.w / 2) - 5) {
          faceC.x = ray2[p].x;
          faceC.y = ray2[p].y;
          break;
        }
        len += ((F.diff(ray2[p].x, last.x) ** 2) + (F.diff(ray2[p].y, last.y) ** 2)) ** 0.5;
        last.x = ray[p].x;
        last.y = ray[p].y;
      }
    }

    ray = F.trace({
      x: faceC.x,
      y: faceC.y,
    }, {
      x: cursor.x,
      y: cursor.y,
    }, data.player.ray.point_frequency);
    pI: for (p = ray.length - 1; p > 0; p--) {
      /* Draw ray */
      /* ctx.fillStyle = "rgba(0, 0, 255)";
      ctx.beginPath();
      ctx.ellipse(ray[p].x, ray[p].y, 2, 2, 0, 0, 2 * Math.PI);
      ctx.fill() */
      for (x = 0; x < blocks.keys().length; x++) {
        for (y = 0; y < blocks[x].keys().length; y++) {
          if (F.collide({
            x: ray[p].x - 0.5,
            y: ray[p].y - 0.5,
            w: 1,
            h: 1,
          }, {
            x: (x * data.blocks.w) - player.x,
            y: (y * data.blocks.h) - player.y - 1,
            w: data.blocks.w,
            h: data.blocks.h,
          })) {
            sBlock.x = ray[p].x;
            sBlock.y = ray[p].y;
            sBlock.val = true;
            if (
              ((F.diff(((canvas.width / 2) - (player.w / 2)), sBlock.x) + F.diff(((canvas.height / 2) - (player.h / 2)), sBlock.y)) > data.player.reach) ||
              ([null, undefined].includes(blocks[getSBlock().x])) ||
              ([null, undefined].includes(blocks[getSBlock().x][getSBlock().y])) ||
              (! data.blocks.types.getFromId(blocks[getSBlock().x][(Math.ceil((sBlock.y + player.y) / data.blocks.h) - 1)].type).tags["hitbox"])
            ) {
              sBlock.val = false;
            } else {
              sides = [
                (ray[p].x - ((x * data.blocks.w) + (data.blocks.w / 2) - player.x)),
                (((x * data.blocks.w) + (data.blocks.w / 2) - player.x) - ray[p].x),
                (ray[p].y - ((y * data.blocks.h) + (data.blocks.w / 2) - player.y)),
                (((y * data.blocks.h) + (data.blocks.w / 2) - player.y) - ray[p].y),
              ];
              sMax = {
                v: 0,
                i: 0,
              };
              for (s = 0; s < sides.length; s++) {
                if (sides[s] < sMax.v) {
                  sMax.v = sides[s];
                  sMax.i = s;
                }
              }
              // console.log(sides);
              sBlock.side = sMax.i;
              break pI;
            }
          }
        }
      }
    }

    // console.log(placeVal);
    if (keysDown.includes("block_destroy")) {
      if (sBlock.val) {
        blocks[getSBlock().x][getSBlock().y].dura -= Math.floor(mod * 1000);
        block_update(getSBlock().x, getSBlock().y);
      }
    } else if (keysDown.includes("block_place")) {
      /* Place block */
      if (sBlock.val) {
        if (placeVal) {
          placeVal = false;
          a = {
            x: 0,
            y: 0,
          };
          switch (sBlock.side) {
            case (0): {
              a.x = -1
            }; break; 
            case (1): {
              a.x = 1;
            }; break; 
            case (2): {
              a.y = -1;
            }; break;
            case (3): {
              a.y = 1;
            }; break; 
          }
          if (data.blocks.types.getFromId(blocks[getSBlock().x + a.x][getSBlock().y + a.y].type).tags["placeable"]) {
            blocks[getSBlock().x + a.x][getSBlock().y + a.y] = {
              type: "stone",
            };
            block_update(getSBlock().x + a.x, getSBlock().y + a.y);
            clearTimeout(placeValReset);
            placeValReset = setTimeout(() => {
              placeVal = true;
            }, data.player.place_timeout);
          }
        }
      }
    }

    F.val("player_crouch", (keysDown.includes("player_crouch")), () => {
      player.y += data.player.h * (data.player.crouch_height / 4);
    });
    F.val("player_crouch2", (! keysDown.includes("player_crouch")), () => {
      player.y -= data.player.h * (data.player.crouch_height / 4);
    });
    if (keysDown.includes("player_crouch")) {
      player.h = data.player.h * data.player.crouch_height;
      player.speed = data.player.speed * data.player.crouch_speed;
    } else {
      player.h = data.player.h;
      player.speed = data.player.speed;
    }
  }

  /* Move player towards cursor if CTRL and left mouse is down */
  if (keysDown.includes("debug_main")) {
    if (F.buttonDown(0)) {
      player.x += (F.mouse.x - (canvas.width / 2)) / 20;
      player.y += (F.mouse.y - (canvas.height / 2)) / 20;
      player.vel.x = 0;
      player.vel.y = 0;
    } else if (F.keyDown(77)) {
      cursor.x = F.randInt(0, canvas.width);
      cursor.y = F.randInt(0, canvas.height);
    } else if (F.keyDown(78)) {
      cursor.x += data.blocks.w;
      if (cursor.x >= canvas.width) {
        cursor.x = 0;
        cursor.y += data.blocks.h;
      }
      if (cursor.y >= canvas.height) {
        cursor.y = 0;
      }
    }
  }
}

function block_reset() {
  /* Set all blocks in a certain radius around spawn */
  for (x = 0; x < data.blocks.init_amount; x++) {
    blocks[x] = {};
    for (y = 0; y < data.blocks.init_amount; y++) {
      type = "air";
      if (y > 5 || y == 2) {
        type = "dirt";
      }
      blocks[x][y] = {
        type: type,
        dura: data.blocks.types.getFromId(type).tags["destroy"],
      };
      block_update(x, y);
    }
  }
}
function getSBlock() {
  return ({
    x: (Math.ceil((sBlock.x + player.x) / data.blocks.w) - 1),
    y: (Math.ceil((sBlock.y + player.y) / data.blocks.h) - 1),
  });
}
function block_update(x, y) {
  if ((! [null, undefined, {}].includes(blocks[x])) && (! [null, undefined, {}].includes(blocks[x][y]))) {
    if ([null, undefined].includes(blocks[x][y].type)) {
      blocks[x][y].type = "air";
    }
    if ([null, undefined].includes(blocks[x][y].dura)) {
      blocks[x][y].dura = data.blocks.types.getFromId(blocks[x][y].type).tags["destroy"];
    }
    if (blocks[x][y].dura <= 0) {
      blocks[x][y].type = "air";
    }
  }
}

/* More fancy stuff */
var then = Date.now();
reset();
main();