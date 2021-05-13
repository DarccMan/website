function init() {
  /* Create canvases */
  cvNames = ["main", "joystick"];
  cvs = [];
  ctxs = [];
  for (i = 0; i < cvNames.length; i++) {
    cvs[cvNames[i]] = doc.create("canvas");
    cvs[cvNames[i]].id = "cv_" + cvNames[i];
    cvs[cvNames[i]].setAttribute("oncontextmenu", "return(false);");
    (doc.id("cv-contain_" + cvNames[i]) || doc.id("content")).appendChild(cvs[cvNames[i]]);
    cvs[cvNames[i]].initialize();
    ctxs[cvNames[i]] = cvs[cvNames[i]].getContext("2d");
  }
  cvs.main.w = 512;
  cvs.main.h = 512;
  cvs.joystick.w = 160;
  cvs.joystick.h = 160;

  /* Initialize else */
  buttons.init();
  gameState = "play";
  main();
}

/* Create global variables */
var cvs = null;
var ctxs = null;
var gameState = "start";
var then = Date.now();
var global = {};

function render() {
  ctxs.main.fillCanvas();


  /* Render joystick */
  xj = ctxs.joystick;
  vj = cvs.joystick;
  xj.clearRect(
    0,
    0,
    vj.w,
    vj.h,
  );
  r = joystick.r;

  grd = xj.createRadialGradient(
    vj.w * 0.5,
    vj.h * 0.5,
    r * 0.1,
    vj.w * 0.5,
    vj.h * 0.5,
    r * 0.38,
  );
  grd.addColorStop(0, "#555");
  grd.addColorStop(1, "#888");
  xj.fillStyle = grd;
  xj.beginPath();
  xj.ellipse(
    vj.w * 0.5,
    vj.h * 0.5,
    r * 0.38,
    r * 0.38,
    0, 0, 2 * Math.PI
  );
  xj.fill();
  xj.strokeStyle = "#666";
  xj.lineWidth = 5;
  xj.beginPath();
  xj.ellipse(
    vj.w * 0.5,
    vj.h * 0.5,
    r * 0.38,
    r * 0.38,
    0, 0, 2 * Math.PI
  );
  xj.stroke();

  x = (joystick.d * r * data.joystick.d) * Math.cos(joystick.a * 2 * Math.PI);
  y = (joystick.d * r * data.joystick.d) * Math.sin(joystick.a * 2 * Math.PI);
  x = joystick.x;
  y = joystick.y;
  if ((x || x === 0) && (y || y === 0)) {
    xj.fillStyle = "#333";
    xj.save();
    xj.translate(
      vj.w * 0.5,
      vj.h * 0.5,
    );
    xj.rotate(joystick.a * 2 * Math.PI);
    xj.translate(
      - vj.w * 0.5,
      - vj.h * 0.5,
    );
    xj.fillRoundRect(
      vj.w * 0.5 - 10,
      vj.h * 0.5 - 15,
      Math.max(20, r * 0.7 * joystick.d),
      30,
      10,
    );
    xj.restore();

    xj.fillStyle = "#111";
    xj.beginPath();
    xj.ellipse(
      x + (vj.w * 0.5),
      y + (vj.h * 0.5),
      r * 0.24,
      r * 0.24,
      0, 0, 2 * Math.PI
    );
    xj.fill();

    x1 = (joystick.d * r * data.joystick.d * (data.joystick.offset)) * Math.cos(joystick.a * 2 * Math.PI);
    y1 = (joystick.d * r * data.joystick.d * (data.joystick.offset)) * Math.sin(joystick.a * 2 * Math.PI);
    grd = xj.createRadialGradient(
      x1 + (vj.w * 0.5),
      y1 + (vj.h * 0.5),
      r * 0.08,
      x + (vj.w * 0.5),
      y + (vj.h * 0.5),
      r * 0.22,
    );
    grd.addColorStop(0, "#555");
    grd.addColorStop(1, "#222");
    xj.fillStyle = grd;
    xj.beginPath();
    xj.ellipse(
      x + (vj.w * 0.5),
      y + (vj.h * 0.5),
      r * 0.22,
      r * 0.22,
      0, 0, 2 * Math.PI
    );
    xj.fill();
  }
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  /* var keysDown = F.getKeyCodes(controls); */
  doc.id("cv_joystick").style.cursor = "default";
  if (gameState == "play") {
    rect = cvs.joystick.getClientRects()[0];
    rx = F.mouse.rx;
    ry = F.mouse.ry;
    if (F.touch.down) {
      rx = F.touch.x;
      ry = F.touch.y;
    }
    x = rx - rect.x;
    y = ry - rect.y;
    if (
      F.collide({
        x,
        y,
        r: 1,
      }, {
        x: joystick.x + (cvs.joystick.w * 0.5),
        y: joystick.y + (cvs.joystick.h * 0.5),
        r: joystick.r * 0.24,
      }, true, true)
      || F.collide({
        x,
        y,
        r: 1,
      }, {
        x: joystick.x + (cvs.joystick.w * 0.5),
        y: joystick.y + (cvs.joystick.h * 0.5),
        r: joystick.r * 0.38,
      }, true, true)
    ) {
      doc.id("cv_joystick").style.cursor = "grab";
      if (F.buttonDown(0) || F.touch.down) {
        joystick.held = true;
        doc.id("cv_joystick").style.cursor = "grabbing";
      }
    }
    if (!(F.buttonDown(0) || F.touch.down)) {
      joystick.held = false;
    }

    if (joystick.held) {
      a = (Math.atan((
        (cvs.joystick.w / 2 - x) /
        (cvs.joystick.h / 2 - y)
      )) / 2 / Math.PI) + 0.25;
      if (y > cvs.joystick.h / 2) {
        a = a + 0.5;
      }
      a = 1 - a;
      if (joystick.d < 0.05) {
        joystick.a = a;
      }
      speed = data.joystick.speed * mod;
      drctn = 0;
      if (joystick.a < a - speed) {
        drctn = 1;
      } else if (joystick.a > a + speed) {
        drctn = -1;
      }
      if (Math.abs(joystick.a - a) > 0.5) {
        if (a < 0.5) {
          drctn = 1;
        }
        if (a > 0.5) {
          drctn = -1;
        }
      }
      if (drctn) {
        joystick.a += drctn * speed;
      } else {
        joystick.a = a;
      }
      joystick.a = (joystick.a + 100) % 1;

      d = (
        (cvs.joystick.w / 2 - x) ** 2 +
        (cvs.joystick.h / 2 - y) ** 2
      ) ** 0.5;
      d = d / cvs.joystick.w * 2;
      d = Math.min(data.joystick.d, d);
      speed = data.joystick.speed * mod;
      if (joystick.d < d - speed) {
        joystick.d += speed;
      } else if (joystick.d > d + speed) {
        joystick.d -= speed;
      }
      if (Math.abs(d, joystick.d) < speed) {
        joystick.d = d;
      }
    } else {
      if (joystick.d > 0) {
        joystick.d -= 0.1;
      }
    }
    if (joystick.d < 0) {
      joystick.d = 0;
    }

    joystick.r = Math.min(cvs.joystick.w, cvs.joystick.h);
    joystick.x = (joystick.d * joystick.r * data.joystick.d) * Math.cos(joystick.a * 2 * Math.PI);
    joystick.y = (joystick.d * joystick.r * data.joystick.d) * Math.sin(joystick.a * 2 * Math.PI);
  }
}

var buttons = {};
/* Create buttons */
buttons.init = function () {
  for (i = 0; i < data.buttons.length; i++) {
    el = `<article>`;
    for (j = 0; j < data.buttons[i].length; j++) {
      code = i * data.buttons.length + j;
      el += `
      <button onclick="buttons.click(this)" code="${code}">
        ${data.buttons[i][j]}
      </button>
      `;
    }
    el += `</article>`;
    doc.id("button_contain").innerHTML += el;
  }
}

/* Click buttons */
buttons.click = function (el) {
  console.log(el.getAttribute("code"));
}

var joystick = {
  a: 0,
  d: 0,
};