var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var graph = [];
var max = 2;
var graph_updater;

function reset() {
  graph = [
    data.start,
  ];
  graph_update();
  graph_reset();

  gameState = "play";
}

function render() {
  ctx.fillCanvas(F.getColor(200));

  ctx.fillStyle = F.getColor(180);
  for (i = 0; i < data.graph.lines; i++) {
    ctx.fillRect(
      i * (canvas.width / data.graph.lines),
      0,
      data.graph.lineWidth,
      canvas.height,
    );
  }

  let g = F.toArray((graph.s(-1 - data.graph.lines, -1)));
  if (g.length > 1) {
    ctx.strokeStyle = F.getColor(50);
    ctx.lineWidth = data.graph.graphWidth;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(
      0,
      (1 - g[0]) * canvas.height,
    );
    ctx.font = "18px Arial";
    ctx.fillStyle = F.getColor([0, 150, 150]);
    for (i = 1; i < g.length; i++) {
      ctx.lineTo(
        (i) * (canvas.width / data.graph.lines),
        (1 - g[i]) * canvas.height,
      );
      if (doc.id("text").checked) {
        ctx.fillText(
          g[i],
          i * (canvas.width / data.graph.lines) + 10,
          (1 - g[i]) * canvas.height - 5,
        );
      }
      ctx.stroke();
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
  if (gameState == "play") {
    data.constant = doc.id("constant").value;
    data.graph.lines = doc.id("lines").value;
  }
  doc.id("respawn").disabled = graph.s(-1) != 0;
  doc.id("extinguish").disabled = graph.s(-1) == 0;
}
function graph_update() {
  let No = graph.s(-1);
  let l = data.constant;

  let Nn = l * No * (1 - No);

  graph.push(Nn.round(4).setBorder(0, Infinity));
}
function graph_reset() {
  data.graph.interval = 1000 - doc.id("speed").value;
  clearInterval(graph_updater);
  graph_updater = setInterval(() => {
    graph_update();
  }, data.graph.interval);
}
function graph_respawn() {
  if (graph.s(-1) == 0) {
    graph = graph.s(0, -2);
    graph.push(0.1);
  }
}
function graph_kill() {
  if (graph.s(-1) != 0) {
    graph = graph.s(0, -2);
    graph.push(0);
  }
}

var then = Date.now();
reset();
main();