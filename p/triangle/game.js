var cv = [];
var ct = [];
let cvs = ["main"];
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
canvas = cv.main;
ctx = ct.main;

var gameState = "start";

function reset() {

  gameState = "play";
}

function render() {
  ctx.fillCanvas("#CCC");

  w = parseFloat($("#w").val());
  h = (w / 2) * Math.tan(rad(60));
  d = (parseFloat($("#d").val()) / 100) * w * (Math.sin(rad(60)));
  d2 = (parseFloat($("#d2").val()) / 100) * d;

  if ($("#red").is(":checked")) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(
      perc(50),
      perc(50 - h / 2),
    );
    ctx.lineTo(
      perc(50 - w / 2),
      perc(50 + h / 2),
    );
    ctx.lineTo(
      perc(50 + w / 2),
      perc(50 + h / 2),
    );
    ctx.lineTo(
      perc(50),
      perc(50 - h / 2),
    );
    ctx.stroke();
  }

  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(
    perc(50 - d * Math.tan(rad(30))),
    perc(50 - h / 2 + d),
  );
  ctx.lineTo(
    perc(50 - w / 2 + d / Math.sin(rad(60)) / 2),
    perc(50 + h / 2 - d),
  );
  ctx.bezierCurveTo(
    perc(50 - w / 2 + d2 / Math.sin(rad(60)) / 2),
    perc(50 + h / 2 - d2),
    perc(50 - w / 2 + d2 / Math.sin(rad(60))),
    perc(50 + h / 2),
    perc(50 - w / 2 + d / Math.sin(rad(60))),
    perc(50 + h / 2),
  );
  ctx.lineTo(
    perc(50 + w / 2 - d / Math.sin(rad(60))),
    perc(50 + h / 2),
  );
  ctx.bezierCurveTo(
    perc(50 + w / 2 - d2 / Math.sin(rad(60))),
    perc(50 + h / 2),
    perc(50 + w / 2 - d2 / Math.sin(rad(60)) / 2),
    perc(50 + h / 2 - d2),
    perc(50 + w / 2 - d / Math.sin(rad(60)) / 2),
    perc(50 + h / 2 - d),
  );
  ctx.lineTo(
    perc(50 + d * Math.tan(rad(30))),
    perc(50 - h / 2 + d),
  );

  ctx.bezierCurveTo(
    perc(50 + d2 * Math.tan(rad(30))),
    perc(50 - h / 2 + d2),
    perc(50 - d2 * Math.tan(rad(30))),
    perc(50 - h / 2 + d2),
    perc(50 - d * Math.tan(rad(30))),
    perc(50 - h / 2 + d),
  );
  ctx.stroke();
}

function perc(num) {
  return num * (Math.min(canvas.width, canvas.height) / 100);
}
function rad(deg) {
  return deg * Math.PI / 180;
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  /* var keysDown = F.getKeyCodes(controls); */
  if (gameState == "play") {

  }
}

var then = Date.now();
reset();
main();