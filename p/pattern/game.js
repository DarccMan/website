var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";

function reset() {
  doc.id("lineWidth").value = data.lineWidth;
  doc.id("x").value = data.x;
  doc.id("y").value = data.y;
  let colors = ["odd_stroke", "odd_fill", "even_stroke", "even_fill"];
  for (i = 0; i < colors.length; i++) {
    doc.id(colors[i]).value = F.randomHex();
  }
  
  gameState = "play";
}

function render() {
  ctx.fillCanvas(F.getColor(40));
  
  let amountX = doc.id("x").value;
  let amountY = doc.id("y").value;
  for (x = -1; x < amountX; x++) {
    for (y = -1; y < amountY; y++) {
      let odd = Math.abs(x + y) % 2 == 1;
      ctx.strokeStyle = odd ? doc.id("odd_stroke").value : doc.id("even_stroke").value;
      ctx.fillStyle = odd ? doc.id("odd_fill").value : doc.id("even_fill").value;
      ctx.lineWidth = doc.id("lineWidth").value;

      ctx.beginPath();
      ctx.moveTo(
        (x + (odd ? 0 : 1)) * (canvas.width / amountX),
        y * (canvas.height / amountY),
      );
      ctx.lineTo(
        (x + 2) * (canvas.width / amountX),
        (y + (odd ? 0 : 1)) * (canvas.height / amountY),
      );
      ctx.lineTo(
        (x + (odd ? 1 : 0)) * (canvas.width / amountX),
        (y + 1) * (canvas.height / amountY),
      );
      ctx.fill();
      
      if (doc.id("lineWidth").value > 0) {
        for (i = 0; i < 10; i++) {
          if (odd) {
            ctx.beginPath();
            ctx.moveTo(
              (x + ((i * 2) / 10)) * (canvas.width / amountX),
              y * (canvas.height / amountY),
            );
            ctx.lineTo(
              (x + 1 + (i / 10)) * (canvas.width / amountX),
              (y + ((10 - i) / 10)) * (canvas.height / amountY),
            );
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.moveTo(
              ((x + (i / 10)) + (!odd ? 1 : 0)) * (canvas.width / amountX),
              (y + (i / 10)) * (canvas.height / amountY),
            );
            ctx.lineTo(
              ((x + ((i * 2) / 10)) + (odd ? 1 : 0)) * (canvas.width / amountX),
              (y + 1) * (canvas.height / amountY),
            );
            ctx.stroke();
          }
        }
      }
    }
  }
}

function main() {
  render();
  update((Date.now() - then) / 1000);
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  if (gameState == "play") {
    
  }
}

var then = Date.now();
reset();
main();