var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 750;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var vals = {};
var player = {
  w: 40,
  h: 40,
  v: {
    ma: 60,
    md: 100,
    mt: 8,
    j: 7,
    ft: 15,
    fa: 20,
  },
};
var blocks = [];

function reset() {
  player.x = canvas.width / 1.3;
  player.y = canvas.height / 6;
  player.f = 0;
  player.v.x = 0;
  player.v.y = 0;
  player.axe = null;

  blocks = [
    {
      x: 50,
      y: 300,
      w: 100,
      h: 50,
    },
    {
      x: 170,
      y: 350,
      w: 200,
      h: 50,
    },
    {
      x: 500,
      y: 300,
      w: 200,
      h: 50,
    },
  ];

  gameState = "play";
}

function render() {
  ctx.fillCanvas();

  ctx.fillStyle = "black";
  for (b = 0; b < blocks.length; b++) {
    ctx.fillRect(
      blocks[b].x,
      blocks[b].y,
      blocks[b].w,
      blocks[b].h,
    );
  }

  if (false) {
    ctx.fillStyle = "magenta";
    ctx.fillRect(
      player.x + player.v.x,
      player.y + player.v.y,
      player.w,
      player.h,
    );
  }
  // ctx.fillStyle = player.f ? "blue" : "lime";
  ctx.fillStyle = "lime";
  ctx.fillRect(
    player.x,
    player.y,
    player.w,
    player.h,
  );

  ctx.fillStyle = "grey";
  if (!player.axe) {
    ctx.fillRect(
      player.x + ((20) * !player.f),
      player.y,
      player.w / 2,
      player.h / 2,
    );
  } else {
    ctx.fillRect(
      player.axe.x,
      player.axe.y,
      player.w / 2,
      player.h / 2,
    );
  }
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  var keysDown = F.getKeyCodes(controls);
  if (keysDown.includes("debug_main")) {
    if (F.buttonDown(0)) {
      player.x = F.mouse.x;
      player.y = F.mouse.y;
      player.v.x = 0;
      player.v.y = 0;
    }
  }
  if (keysDown.includes("game_reset")) {
    reset();
  }
  if (gameState == "play") {
    if (keysDown.includes("player_axe")) {
      if (vals.axe) {
        vals.axe = false;
        if (player.axe) {
          player.axe = null;
        } else {
          player.axe = {
            x: player.x,
            y: player.y,
          };
        }
      }
    } else {
      vals.axe = true;
    }


    x = 0;
    switch (F.bool_bin(keysDown.includes("player_left"), keysDown.includes("player_right"))) {
      case ("10"): {
        player.f = 1;
        x = -1;
      }; break;
      case ("01"): {
        player.f = 0;
        x = 1;
      }; break;
      default: {
        player.v.x -= (player.v.md * mod) * (0 - F.toOne(player.v.x));
        if (F.diff(0, player.v.x) <= 1) {
          player.v.x = 0;
        }
      }
    }
    player.v.x += (player.v.ma * mod) * x;

    cb = null;
    p = {...player};
    p.x++;
    p.y++;
    p.w -= 2;
    for (b = 0; b < blocks.length; b++) {
      if (F.collide(blocks[b], p)) {
        cb = blocks[b];
        break;
      }
    }
    vals.jump = cb !== null;

    jump = false;
    if (!vals.jump && player.axe) {
      if (F.collide({
        x: player.axe.x,
        y: player.axe.y,
        w: player.w / 2,
        h: player.h / 2,
      }, p)) {
        vals.jump = true;
      }
    }

    if (jump || keysDown.includes("player_up")) {
      if (vals.jump) {
        vals.jump = false;
        player.v.y -= player.v.j;
      }
    }
    player.v.y += player.v.fa * mod;

    cb = null;
    p = {...player};
    p.y += player.v.y;
    for (b = 0; b < blocks.length; b++) {
      if (F.collide(blocks[b], p)) {
        cb = blocks[b];
        break;
      }
    }
    if (cb) {
      player.v.y = 0;
    } else {
      player.y += player.v.y;
    }

    cb = null;
    p = {...player};
    p.x += player.v.x;
    for (b = 0; b < blocks.length; b++) {
      if (F.collide(blocks[b], p)) {
        cb = blocks[b];
        break;
      }
    }
    if (cb) {
      player.v.x = 0;
    }

    player.v.y = player.v.y.setBorder(- Infinity, player.v.ft);
    player.v.x = player.v.x.setBorder(0 - player.v.mt, player.v.mt);
    player.x += player.v.x;

    p = {...player};
    for (b = 0; b < blocks.length; b++) {
      if (F.collide(blocks[b], p)) {
        player.y -= 1;
        break;
      }
    }
  }
}

var then = Date.now();
reset();
main();