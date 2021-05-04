var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  w: 1,
  h: 1,
  rays: [],
  angle: 0,
};
var blocks = [];

function reset() {
  for (a = 0 - ((data.rays.angle / 2) * data.rays.density); a < ((data.rays.angle / 2) * data.rays.density); a++) {
    player.rays.push({
      x: null,
      y: null,
      a: a / data.rays.density,
      color: null,
      dist: null,
    });
  }

  for (b = 0; b < 10; b++) {
    blocks.push({
      x: F.randomInt(20, canvas.width - 60),
      y: F.randomInt(20, canvas.height - 80),
      w: F.randomInt(10, 60),
      h: F.randomInt(10, 60),
      color: F.randomHex(),
    });
  }
  
  gameState = "play";
}

function render() {
  // ctx.fillCanvas(F.getColor(180));
  ctx.fillCanvas(F.getColor(0));

  /* for (b = 0; b < blocks.length; b++) {
    ctx.fillStyle = blocks[b].color;
    ctx.fillRect(
      blocks[b].x,
      blocks[b].y,
      blocks[b].w,
      blocks[b].h,
    );
  } */

  /* ctx.strokeStyle = "magenta";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 2,
    canvas.width / 2,
    data.rays.cr,
    data.rays.cr,
    0, 0, 2 * Math.PI
  );
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 2,
    canvas.width / 2,
    2,
    2,
    0, 0, 2 * Math.PI
  );
  ctx.fill(); */
  
  // ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  for (r = 0; r < player.rays.length; r++) {
    let c = F.getCoords(
      player.x,
      player.y,
      data.rays.max_dist,
      player.rays[r].a - 90 + player.angle,
    );
    let grd = ctx.createLinearGradient(
      player.x,
      player.y,
      c.x,
      c.y,
    );
    grd.addColorStop(0, "white");
    grd.addColorStop(1, "black");
    ctx.strokeStyle = grd;
    ctx.beginPath();
    ctx.moveTo(
      player.x,
      player.y,
      1,
      1,
    );
    ctx.lineTo(
      player.rays[r].x,
      player.rays[r].y,
      1,
      1,
    );
    ctx.stroke();

    if (player.rays[r].color) {
      let color = F.hex_hsv(player.rays[r].color);
      color.v += 20;
      color = F.hsv_rgb(color);
      ctx.fillStyle = F.getColor(color);
      ctx.beginPath();
      ctx.ellipse(
        player.rays[r].x,
        player.rays[r].y,
        3,
        3,
        0, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  if (! player.display) {
    ctx.fillCanvas(F.getColor(10));
    for (r = 0; r < player.rays.length; r++) {
      let color = player.rays[r].color;
      if (color) {
        color = F.hex_hsv(color);
        color.v = 100 - (player.rays[r].dist / (data.rays.max_dist / 100));
        color.s -= ((player.rays[r].dist / (data.rays.max_dist / 100)));
        // console.log(color.s)
        color = F.hsv_rgb(color);
        ctx.fillStyle = F.getColor(color);
        ctx.fillRect(
          r * (canvas.width / player.rays.length),
          0,
          (canvas.width / player.rays.length) + 1,
          canvas.width,
        );
      }
    }
  }
}

function main() {
  var now = Date.now();
  var delta = now - then;
  render();
  update(delta / 1000);
  then = now;
  requestAnimationFrame(main);
}
function update(mod) {
  keysDown = F.getKeyCodes(controls);
  if (gameState == "play") {
    for (r = 0; r < player.rays.length; r++) {
      player.rays[r].color = null;
      player.rays[r].dist = null;
      pI: for (p = 0; p < data.rays.max_dist; p++) {
        let c = F.getCoords(
          player.x,
          player.y,
          p,
          player.rays[r].a - 90 + player.angle,
        );
        player.rays[r].x = c.x;
        player.rays[r].y = c.y;
        for (b = 0; b < blocks.length; b++) {
          if (F.collide({
            x: c.x,
            y: c.y,
            w: 1,
            h: 1,
          }, blocks[b])) {
            player.rays[r].color = blocks[b].color;
            player.rays[r].dist = p;
            break pI;
          }
        }
      }
    }

    vx = 0;
    vy = 0;
    switch (F.bool_bin(keysDown.includes("player_left"), keysDown.includes("player_right"))) {
      case ("10"): {
        vx += data.player.speed * mod;
      }; break;
      case ("01"): {
        vx -= data.player.speed * mod;
      }; break;
    }
    switch (F.bool_bin(keysDown.includes("player_up"), keysDown.includes("player_down"))) {
      case ("10"): {
        vy += data.player.speed * mod;
      }; break;
      case ("01"): {
        vy -= data.player.speed * mod;
      }; break;
    }
    vx2 = player.x;
    vy2 = player.y;
    vx2 -= ((vx * Math.cos((player.angle) * Math.PI / 180)));
    vx2 += ((vy * Math.sin((player.angle) * Math.PI / 180)));
    vy2 += ((vx * Math.sin((player.angle) * Math.PI / 180)));
    vy2 -= ((vy * Math.cos((player.angle) * Math.PI / 180)));
    cBlock = null;
    for (b = 0; b < blocks.length; b++) {
      if (F.collide({
        x: vx2,
        y: vy2,
        w: player.w,
        h: player.h,
      }, blocks[b])) {
        cBlock = b;
        break;
      }
    }
    if (! cBlock) {
      player.x = vx2;
      player.y = vy2;
    }
    switch (F.bool_bin(keysDown.includes("player_rotate_left"), keysDown.includes("player_rotate_right"))) {
      case ("10"): {
        player.angle -= data.player.speed * mod;
      }; break;
      case ("01"): {
        player.angle += data.player.speed * mod;
      }; break;
    }
    if (F.mouse.onCanvas && false) {
      player.angle += (F.mouse.x - (canvas.width / 2)) * mod * (data.player.rot_speed / 100);
    }
    player.angle = player.angle.wrap(0, 360);
    player.display = keysDown.includes("player_display");
  }
}

var then = Date.now();
reset();
main();