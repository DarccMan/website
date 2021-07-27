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

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(
      perc(50 - w / 2 + d / Math.sin(rad(60)) / 2),
      perc(50 + h / 2 - d),
    );
    ctx.lineTo(
      perc(50 - w / 2 + d / Math.sin(rad(60))),
      perc(50 + h / 2),
    );
    ctx.moveTo(
      perc(50 + w / 2 - d / Math.sin(rad(60))),
      perc(50 + h / 2),
    );
    ctx.lineTo(
      perc(50 + w / 2 - d / Math.sin(rad(60)) / 2),
      perc(50 + h / 2 - d),
    );
    ctx.moveTo(
      perc(50 + d * Math.tan(rad(30))),
      perc(50 - h / 2 + d),
    );
    ctx.lineTo(
      perc(50 - d * Math.tan(rad(30))),
      perc(50 - h / 2 + d),
    );
    ctx.stroke();

    ctx.strokeStyle = "lime";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(
      perc(50 - w / 2 + d / Math.sin(rad(60)) / 2),
      perc(50 + h / 2 - d),
    );
    ctx.lineTo(
      perc(50 - w / 2 + d2 / Math.sin(rad(60)) / 2),
      perc(50 + h / 2 - d2),
    );
    ctx.lineTo(
      perc(50 - w / 2 + d2 / Math.sin(rad(60))),
      perc(50 + h / 2),
    );
    ctx.lineTo(
      perc(50 - w / 2 + d / Math.sin(rad(60))),
      perc(50 + h / 2),
    );

    ctx.moveTo(
      perc(50 + w / 2 - d / Math.sin(rad(60))),
      perc(50 + h / 2),
    );
    ctx.lineTo(
      perc(50 + w / 2 - d2 / Math.sin(rad(60))),
      perc(50 + h / 2),
    );
    ctx.lineTo(
      perc(50 + w / 2 - d2 / Math.sin(rad(60)) / 2),
      perc(50 + h / 2 - d2),
    );
    ctx.lineTo(
      perc(50 + w / 2 - d / Math.sin(rad(60)) / 2),
      perc(50 + h / 2 - d),
    );

    ctx.moveTo(
      perc(50 + d * Math.tan(rad(30))),
      perc(50 - h / 2 + d),
    );
    ctx.lineTo(
      perc(50 + d2 * Math.tan(rad(30))),
      perc(50 - h / 2 + d2),
    );
    ctx.lineTo(
      perc(50 - d2 * Math.tan(rad(30))),
      perc(50 - h / 2 + d2),
    );
    ctx.lineTo(
      perc(50 - d * Math.tan(rad(30))),
      perc(50 - h / 2 + d),
    );
    ctx.stroke();

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(
      perc(50 - w / 2 + d2 / Math.sin(rad(60)) / 2),
      perc(50 + h / 2 - d2),
    );
    ctx.lineTo(
      perc(50 - w / 2 + d2 / Math.sin(rad(60))),
      perc(50 + h / 2),
    );
    ctx.moveTo(
      perc(50 + w / 2 - d2 / Math.sin(rad(60))),
      perc(50 + h / 2),
    );
    ctx.lineTo(
      perc(50 + w / 2 - d2 / Math.sin(rad(60)) / 2),
      perc(50 + h / 2 - d2),
    );

    ctx.moveTo(
      perc(50 + d2 * Math.tan(rad(30))),
      perc(50 - h / 2 + d2),
    );
    ctx.lineTo(
      perc(50 - d2 * Math.tan(rad(30))),
      perc(50 - h / 2 + d2),
    );
    ctx.stroke();
  }

  path = [
    [
      "M",
      50 - d * Math.tan(rad(30)),
      50 - h / 2 + d,
    ], [
      "L",
      50 - w / 2 + d / Math.sin(rad(60)) / 2,
      50 + h / 2 - d,
    ], [
      "C",
      50 - w / 2 + d2 / Math.sin(rad(60)) / 2,
      50 + h / 2 - d2,
      50 - w / 2 + d2 / Math.sin(rad(60)),
      50 + h / 2,
      50 - w / 2 + d / Math.sin(rad(60)),
      50 + h / 2,
    ], [
      "L",
      50 + w / 2 - d / Math.sin(rad(60)),
      50 + h / 2,
    ], [
      "C",
      50 + w / 2 - d2 / Math.sin(rad(60)),
      50 + h / 2,
      50 + w / 2 - d2 / Math.sin(rad(60)) / 2,
      50 + h / 2 - d2,
      50 + w / 2 - d / Math.sin(rad(60)) / 2,
      50 + h / 2 - d,
    ], [
      "L",
      50 + d * Math.tan(rad(30)),
      50 - h / 2 + d,
    ], [
      "C",
      50 + d2 * Math.tan(rad(30)),
      50 - h / 2 + d2,
      50 - d2 * Math.tan(rad(30)),
      50 - h / 2 + d2,
      50 - d * Math.tan(rad(30)),
      50 - h / 2 + d,
    ]
  ];

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.beginPath();
  temp = [];
  for (i = 0; i < path.length; i++) {
    switch (path[i][0]) {
      case "M": {
        ctx.moveTo(
          perc(path[i][1]),
          perc(path[i][2]),
        );
      }; break;
      case "L": {
        ctx.lineTo(
          perc(path[i][1]),
          perc(path[i][2]),
        );
      }; break;
      case "C": {
        ctx.bezierCurveTo(
          perc(path[i][1]),
          perc(path[i][2]),
          perc(path[i][3]),
          perc(path[i][4]),
          perc(path[i][5]),
          perc(path[i][6]),
        );
      }; break;
    }

    temp.push(path[i].map(j => {
      if (isNaN(parseFloat(j))) {
        return j;
      }
      return j * ($("#size").val() / 100);
    }).join(" "));
  }
  ctx.stroke();
  path = temp.join(" ");
  $("#svg").attr("width", $("#size").val());
  $("#svg").attr("height", $("#size").val());
  $("#rect").attr("width", $("#size").val());
  $("#rect").attr("height", $("#size").val());
  $("#path").attr("d", path);
  $("#output").text(path);
}

function perc(num) {
  return num * (Math.min(canvas.width, canvas.height) / 100);
}
function rad(deg) {
  return deg * Math.PI / 180;
}