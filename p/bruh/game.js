var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var button = {
  dw: data.button.w,
  dh: data.button.h,
  pressed: false,
  img1: new Image(),
  img2: new Image(),
  glow: new Image(),
  val: false,
  sound: new F.Sound("audio/bruh.mp3", "audio_contain"),
};
button.img1.src = "image/button1.png";
button.img2.src = "image/button2.png";
button.glow.src = "image/glow.png";
var bg = [];
var text = {
  color: [],
  flash: true,
};

function reset() {
  bg = [
    F.randomInt(0, 360),
    100,
    60,
  ];
  text.color = [
    F.wrapNum(bg[0] + 180, 0, 360),
    80,
    80,
  ];
  text.strobe = true;
  setTimeout(() => {
    text.strobe = false;
  }, data.text.stopStrobe);

  gameState = "play";
}

function render() {
  doc.id("favicon").href = `image/button${button.held ? "1" : "2"}.png`;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let rgb = F.hsv_rgb(bg);
  F.fillCanvas(ctx, F.getColor(rgb));
  w = Math.min(F.setBorder(canvas.width, 300, 3000), F.setBorder(canvas.height, 100, 3000));

  ctx.drawImage(
    button.glow,
    (canvas.width / 2) - ((w * data.button.size * data.button.glow) / 2),
    (canvas.height / data.button.offsetY) - ((w * data.button.size * data.button.glow) / 2),
    w * data.button.size * data.button.glow,
    w * data.button.size * data.button.glow,
  );

  let fontSize = data.text.size;
  ctx.font = `${fontSize}px Impact`;
  ctx.textAlign = "center";
  ctx.fillStyle = F.getColor(F.hsv_rgb([
    text.color[0],
    text.color[1] - 20,
    text.color[2] - 50,
  ]));
  for (i = 0; i < data.text.shadow; i++) {
    ctx.fillText(
      data.text.msg,
      (canvas.width / 2) + i,
      F.setBorder((canvas.height / 10, fontSize, canvas.height) * data.text.offsetY) + i,
    );
  }
  ctx.shadowColor = "black";
  ctx.strokeStyle = F.getColor([240, 240, 240, 0.6]);
  ctx.shadowBlur = 7;
  ctx.lineWidth = 3;
  ctx.strokeText(
    data.text.msg,
    canvas.width / 2,
    F.setBorder(canvas.height / 10, fontSize, canvas.height) * data.text.offsetY,
  );
  ctx.shadowBlur = 0;
  ctx.fillStyle = F.getColor(F.hsv_rgb(text.color));
  ctx.fillText(
    data.text.msg,
    canvas.width / 2,
    F.setBorder(canvas.height / 10, fontSize, canvas.height) * data.text.offsetY,
  );

  ctx.drawImage(
    button.pressed || button.held ? button.img1 : button.img2,
    (canvas.width / 2) - ((w * data.button.size) / 2),
    (canvas.height / data.button.offsetY) - ((w * data.button.size) / 2),
    w * data.button.size,
    w * data.button.size,
  );

  color = F.getColor(F.hsv_rgb([
    F.wrapNum(bg[0] + 180, 0, 360),
    50,
    100,
  ]));
  doc.id("footer").style.color = color;
  doc.id("footer").childNodes[1].style.color = color;
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  doc.body.style.cursor = "default";
  button.w = button.dw * (canvas.width / 512);
  button.h = button.dh * (canvas.width / 512);
  w = Math.min(F.setBorder(canvas.width, 300, 3000), F.setBorder(canvas.height, 100, 3000));

  if (gameState == "play") {
    bg[0] += data.bg.speed / 100;
      bg[0] = F.wrapNum(bg[0], 0, 360);
    if (bg[1] < 100) {
      bg[1] += data.bg.flashFade / 100;
    }
    bg[1] = F.setBorder(bg[1], 0, 100);

    text.color[0] += text.strobe ? (data.text.strobeSpeed / 100) : (data.text.speed / 100);
    text.color[0] = F.wrapNum(text.color[0], 0, 360);

    if (
      !text.strobe
      && F.diff(text.color[0], bg[0]) < data.text.colorDiff
    ) {
      text.color[0] += data.text.colorDiff;
    }
    if (
      F.collide({
        x: F.mouse.x,
        y: F.mouse.y,
        r: 1,
      }, {
        x: (canvas.width / 2),
        y: (canvas.height / data.button.offsetY),
        r: (w * data.button.size) / 2,
      }, true, true)
      || F.collide({
        x: F.touch.x,
        y: F.touch.y,
        r: 1,
      }, {
        x: (canvas.width / 2),
        y: (canvas.height / data.button.offsetY),
        r: (w * data.button.size) / 2,
      }, true, true)
    ) {
      doc.body.style.cursor = "pointer";
    }

    let held = (
      (
        F.buttonDown(0)
        && F.mouse.onCanvas
        && (
          !data.button.collide
          || F.collide({
            x: F.mouse.x,
            y: F.mouse.y,
            r: 1,
          }, {
            x: (canvas.width / 2),
            y: (canvas.height / data.button.offsetY),
            r: (w * data.button.size) / 2,
          }, true, true)
        )
      )
      || F.keyDown(32)
      || (
        F.touch.down
        && (
          !data.button.collide
          || F.collide({
            x: F.touch.x,
            y: F.touch.y,
            r: 1,
          }, {
            x: (canvas.width / 2),
            y: (canvas.height / data.button.offsetY),
            r: (w * data.button.size) / 2,
          }, true, true)
        )
      )
    );

    if (
      held
    ) {
      button.held = true;
      if (
        !button.pressed
        && (
          button.val ||
          !data.button.lift
        )
      ) {
        button.val = false;
        play();
      }
    } else {
      button.held = false;
      button.val = true;
    }
  }
}

async function play() {
  if (button.pressed) {
    button.sound = new F.Sound("audio/bruh.mp3", "audio_contain");
  }
  button.pressed = true;
  button.sound.play();
  bg[1] = F.setBorder(bg[1] - data.bg.flash, 0, 100);
  text.color[0] += data.text.flash;
  await F.sleep(data.button.cooldown / 1000);
  button.sound = new F.Sound("audio/bruh.mp3", "audio_contain");
  stop();
}
function stop() {
  button.pressed = false;
}
function delete_sound(el) {
  el.remove();
}

var then = Date.now();
reset();
main();