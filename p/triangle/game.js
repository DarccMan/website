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

function render() {
  ctx.fillCanvas("#DDD");

  w = parseFloat($("#w").val());
  h = (w / 2) * Math.tan(rad(60));
  d = (parseFloat($("#d").val()) / 100) * w * (Math.sin(rad(60)));
  d2 = (parseFloat($("#d2").val()) / 100) * d;
  x = parseFloat($("#offx").val());
  y = parseFloat($("#offy").val());
  x2 = perc(x);
  y2 = perc(y);

  if ($("#red").is(":checked")) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(
      perc(50) + x2,
      perc(50 - h / 2) + y2,
    );
    ctx.lineTo(
      perc(50 - w / 2) + x2,
      perc(50 + h / 2) + y2,
    );
    ctx.lineTo(
      perc(50 + w / 2) + x2,
      perc(50 + h / 2) + y2,
    );
    ctx.lineTo(
      perc(50) + x2,
      perc(50 - h / 2) + y2,
    );
    ctx.stroke();

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(
      perc(50 - w / 2 + d / Math.sin(rad(60)) / 2) + x2,
      perc(50 + h / 2 - d) + y2,
    );
    ctx.lineTo(
      perc(50 - w / 2 + d / Math.sin(rad(60))) + x2,
      perc(50 + h / 2) + y2,
    );
    ctx.moveTo(
      perc(50 + w / 2 - d / Math.sin(rad(60))) + x2,
      perc(50 + h / 2) + y2,
    );
    ctx.lineTo(
      perc(50 + w / 2 - d / Math.sin(rad(60)) / 2) + x2,
      perc(50 + h / 2 - d) + y2,
    );
    ctx.moveTo(
      perc(50 + d * Math.tan(rad(30))) + x2,
      perc(50 - h / 2 + d) + y2,
    );
    ctx.lineTo(
      perc(50 - d * Math.tan(rad(30))) + x2,
      perc(50 - h / 2 + d) + y2,
    );
    ctx.stroke();

    ctx.strokeStyle = "lime";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(
      perc(50 - w / 2 + d / Math.sin(rad(60)) / 2) + x2,
      perc(50 + h / 2 - d) + y2,
    );
    ctx.lineTo(
      perc(50 - w / 2 + d2 / Math.sin(rad(60)) / 2) + x2,
      perc(50 + h / 2 - d2) + y2,
    );
    ctx.lineTo(
      perc(50 - w / 2 + d2 / Math.sin(rad(60))) + x2,
      perc(50 + h / 2) + y2,
    );
    ctx.lineTo(
      perc(50 - w / 2 + d / Math.sin(rad(60))) + x2,
      perc(50 + h / 2) + y2,
    );

    ctx.moveTo(
      perc(50 + w / 2 - d / Math.sin(rad(60))) + x2,
      perc(50 + h / 2) + y2,
    );
    ctx.lineTo(
      perc(50 + w / 2 - d2 / Math.sin(rad(60))) + x2,
      perc(50 + h / 2) + y2,
    );
    ctx.lineTo(
      perc(50 + w / 2 - d2 / Math.sin(rad(60)) / 2) + x2,
      perc(50 + h / 2 - d2) + y2,
    );
    ctx.lineTo(
      perc(50 + w / 2 - d / Math.sin(rad(60)) / 2) + x2,
      perc(50 + h / 2 - d) + y2,
    );

    ctx.moveTo(
      perc(50 + d * Math.tan(rad(30))) + x2,
      perc(50 - h / 2 + d) + y2,
    );
    ctx.lineTo(
      perc(50 + d2 * Math.tan(rad(30))) + x2,
      perc(50 - h / 2 + d2) + y2,
    );
    ctx.lineTo(
      perc(50 - d2 * Math.tan(rad(30))) + x2,
      perc(50 - h / 2 + d2) + y2,
    );
    ctx.lineTo(
      perc(50 - d * Math.tan(rad(30))) + x2,
      perc(50 - h / 2 + d) + y2,
    );
    ctx.stroke();

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(
      perc(50 - w / 2 + d2 / Math.sin(rad(60)) / 2) + x2,
      perc(50 + h / 2 - d2) + y2,
    );
    ctx.lineTo(
      perc(50 - w / 2 + d2 / Math.sin(rad(60))) + x2,
      perc(50 + h / 2) + y2,
    );
    ctx.moveTo(
      perc(50 + w / 2 - d2 / Math.sin(rad(60))) + x2,
      perc(50 + h / 2) + y2,
    );
    ctx.lineTo(
      perc(50 + w / 2 - d2 / Math.sin(rad(60)) / 2) + x2,
      perc(50 + h / 2 - d2) + y2,
    );

    ctx.moveTo(
      perc(50 + d2 * Math.tan(rad(30))) + x2,
      perc(50 - h / 2 + d2) + y2,
    );
    ctx.lineTo(
      perc(50 - d2 * Math.tan(rad(30))) + x2,
      perc(50 - h / 2 + d2) + y2,
    );
    ctx.stroke();
  }

  paths = [
    [
      "M",
      50 - d * Math.tan(rad(30)) + x,
      50 - h / 2 + d + y,
    ], [
      "L",
      50 - w / 2 + d / Math.sin(rad(60)) / 2 + x,
      50 + h / 2 - d + y,
    ], [
      "C",
      50 - w / 2 + d2 / Math.sin(rad(60)) / 2 + x,
      50 + h / 2 - d2 + y,
      50 - w / 2 + d2 / Math.sin(rad(60)) + x,
      50 + h / 2 + y,
      50 - w / 2 + d / Math.sin(rad(60)) + x,
      50 + h / 2 + y,
    ], [
      "L",
      50 + w / 2 - d / Math.sin(rad(60)) + x,
      50 + h / 2 + y,
    ], [
      "C",
      50 + w / 2 - d2 / Math.sin(rad(60)) + x,
      50 + h / 2 + y,
      50 + w / 2 - d2 / Math.sin(rad(60)) / 2 + x,
      50 + h / 2 - d2 + y,
      50 + w / 2 - d / Math.sin(rad(60)) / 2 + x,
      50 + h / 2 - d + y,
    ], [
      "L",
      50 + d * Math.tan(rad(30)) + x,
      50 - h / 2 + d + y,
    ], [
      "C",
      50 + d2 * Math.tan(rad(30)) + x,
      50 - h / 2 + d2 + y,
      50 - d2 * Math.tan(rad(30)) + x,
      50 - h / 2 + d2 + y,
      50 - d * Math.tan(rad(30)) + x,
      50 - h / 2 + d + y,
    ]
  ];

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.beginPath();
  temp = [];
  for (i = 0; i < paths.length; i++) {
    switch (paths[i][0]) {
      case "M": {
        ctx.moveTo(
          perc(paths[i][1]),
          perc(paths[i][2]),
        );
      }; break;
      case "L": {
        ctx.lineTo(
          perc(paths[i][1]),
          perc(paths[i][2]),
        );
      }; break;
      case "C": {
        ctx.bezierCurveTo(
          perc(paths[i][1]),
          perc(paths[i][2]),
          perc(paths[i][3]),
          perc(paths[i][4]),
          perc(paths[i][5]),
          perc(paths[i][6]),
        );
      }; break;
    }

    temp.push(paths[i].map(j => {
      if (isNaN(parseFloat(j))) {
        return j;
      }
      return j * ($("#size").val() / 100);
    }).join(" "));
  }
  ctx.stroke();
  paths = temp.join(" ");
  $("#svg").attr("width", $("#size").val());
  $("#svg").attr("height", $("#size").val());
  $("#rect").attr("width", $("#size").val());
  $("#rect").attr("height", $("#size").val());
  $("#path").attr("d", paths);
  $("#output").text(paths);
}

function perc(num) {
  return num * (Math.min(canvas.width, canvas.height) / 100);
}
function rad(deg) {
  return deg * Math.PI / 180;
}