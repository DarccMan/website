function init() {
  random();
  // calc();
}

function calc() {
  checked = F.radioChecked("type");
  doc.id("input_a").disabled = false;
  doc.id("input_b").disabled = false;
  doc.id("input_c").disabled = false;
  if (checked) {
    doc.id("input_" + checked).disabled = true;
    switch (checked) {
      case "a": {
        if (
          !isNaN(parseFloat(doc.id("input_b").value))
          && !isNaN(parseFloat(doc.id("input_c").value))
        ) {
          doc.id("input_a").value = (
            parseFloat(doc.id("input_c").value) ** 2 -
            parseFloat(doc.id("input_b").value) ** 2
          ) ** 0.5;
        }
      }; break;
      case "b": {
        if (
          !isNaN(parseFloat(doc.id("input_a").value))
          && !isNaN(parseFloat(doc.id("input_c").value))
        ) {
          doc.id("input_b").value = (
            parseFloat(doc.id("input_c").value) ** 2 -
            parseFloat(doc.id("input_a").value) ** 2
          ) ** 0.5;
        }
      }; break;
      case "c": {
        if (
          !isNaN(parseFloat(doc.id("input_a").value))
          && !isNaN(parseFloat(doc.id("input_b").value))
        ) {
          doc.id("input_c").value = (
            parseFloat(doc.id("input_a").value) ** 2 +
            parseFloat(doc.id("input_b").value) ** 2
          ) ** 0.5;
        }
      }; break;
    }
  }

  render();
}

function reset() {
  doc.id("input_a").value = 3;
  doc.id("input_b").value = 4;
  doc.id("input_c").value = 5;

  render();
}

function random() {
  doc.id("input_a").value = F.randomInt(1, 80) / 10;
  doc.id("input_b").value = F.randomInt(1, 80) / 10;
  doc.getElementsByName("type")[2].checked = true;
  calc();
}

var canvas = doc.create("canvas");
canvas.initialize();
canvas.id = "canvas";
size = 300;
canvas.w = size;
canvas.h = size;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

function render() {
  ctx.clearRect(
    0,
    0,
    canvas.w,
    canvas.h,
  );
  ctx.save();
  ctx.translate(
    canvas.w * 0.09,
    canvas.h * -0.18,
  );

  if (
    !isNaN(parseFloat(doc.id("input_a").value))
    && !isNaN(parseFloat(doc.id("input_b").value))
    && !isNaN(parseFloat(doc.id("input_c").value))
  ) {
    oa = parseFloat(doc.id("input_a").value);
    ob = parseFloat(doc.id("input_b").value);
    oc = parseFloat(doc.id("input_c").value);
    total = oa + ob + oc;
    total /= 1.2;

    a = (oa / total) * canvas.h;
    b = (ob / total) * canvas.h;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = canvas.w * 0.06;
    x = (canvas.w - b) / 2;
    y = (canvas.h + a) / 2;
    arr = [
      [
        x,
        y,
      ],
      [
        x,
        y - a,
      ],
      [
        x + b,
        y,
      ],
    ];
    color = [
      "#F88",
      "#8F8",
      "#88F",
      "#FFF",
      "#000",
      "#0008",
    ];

    ctx.strokeStyle = color[4];
    ctx.beginPath();
    ctx.moveTo(
      arr[0][0],
      arr[0][1],
    );
    ctx.lineTo(
      arr[1][0],
      arr[1][1],
    );
    ctx.lineTo(
      arr[2][0],
      arr[2][1],
    );
    ctx.lineTo(
      arr[0][0],
      arr[0][1],
    );
    ctx.stroke();

    ctx.fillStyle = color[3];
    ctx.beginPath();
    ctx.moveTo(
      arr[0][0],
      arr[0][1],
    );
    ctx.lineTo(
      arr[1][0],
      arr[1][1],
    );
    ctx.lineTo(
      arr[2][0],
      arr[2][1],
    );
    ctx.lineTo(
      arr[0][0],
      arr[0][1],
    );
    ctx.fill();

    ctx.lineWidth = canvas.w * 0.02;
    ctx.strokeStyle = color[0];
    ctx.beginPath();
    ctx.moveTo(
      arr[0][0],
      arr[0][1],
    );
    ctx.lineTo(
      arr[1][0],
      arr[1][1],
    );
    ctx.stroke();

    ctx.strokeStyle = color[1];
    ctx.beginPath();
    ctx.moveTo(
      arr[1][0],
      arr[1][1],
    );
    ctx.lineTo(
      arr[2][0],
      arr[2][1],
    );
    ctx.stroke();

    ctx.strokeStyle = color[2];
    ctx.beginPath();
    ctx.moveTo(
      arr[2][0],
      arr[2][1],
    );
    ctx.lineTo(
      arr[0][0],
      arr[0][1],
    );
    ctx.stroke();

    h = canvas.w * 0.07;
    round = canvas.w * 0.02;
    paddingX = canvas.w * 0.02;
    paddingY = canvas.w * 0.005;
    marginX = canvas.w * 0.08;
    marginY = canvas.w * 0.12;
    marginH = canvas.w * 0.05;
    ctx.font = h + "px Arial";
    text = "a: " + oa.round(2);
    ctx.fillStyle = color[5];
    ctx.fillRoundRect(
      x - marginX - ctx.measureText(text).width - paddingX,
      (canvas.h - h) / 2 - paddingY,
      ctx.measureText(text).width + paddingX * 2,
      h + paddingY * 2,
      round,
    );
    ctx.fillStyle = color[0];
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillText(
      text,
      x - marginX,
      canvas.h / 2,
    );
    text = "c: " + oc.round(2);
    ctx.fillStyle = color[5];
    ctx.fillRoundRect(
      canvas.w / 2 + marginH - paddingX,
      canvas.h / 2 - marginH - h - paddingY,
      ctx.measureText(text).width + paddingX * 2,
      h + paddingY * 2,
      round,
    );
    ctx.fillStyle = color[1];
    ctx.textBaseline = "bottom";
    ctx.textAlign = "left";
    ctx.fillText(
      text,
      canvas.w / 2 + marginH,
      canvas.h / 2 - marginH,
    );
    text = "b: " + ob.round(2);
    ctx.fillStyle = color[5];
    ctx.fillRoundRect(
      canvas.w / 2 - paddingX - ctx.measureText(text).width / 2,
      y + marginY / 2 - paddingY,
      ctx.measureText(text).width + paddingX * 2,
      h + paddingY * 2,
      round,
    );
    ctx.fillStyle = color[2];
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(
      text,
      canvas.w / 2,
      y + marginY / 2,
    );
  }
  ctx.restore();
}