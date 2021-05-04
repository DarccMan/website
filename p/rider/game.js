var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var collide = false;
var blocks = [
  {
    x: 140,
    y: 250,
    w: 100,
    h: 180,
  },
  {
    x: 0,
    y: 0,
    w: 220,
    h: 130,
    r: 0,
  },
];

function reset() {
  
  gameState = "play";
}

function render() {
  ctx.fillCanvas();
  
  ctx.fillStyle = "red";
  ctx.fillRect(
    blocks[0].x,
    blocks[0].y,
    blocks[0].w,
    blocks[0].h,
  );

  ctx.save();
  ctx.translate(
    blocks[1].x + (blocks[1].w / 2),
    blocks[1].y + (blocks[1].h / 2),
    );
    ctx.rotate(blocks[1].r * Math.PI / 180);
  ctx.fillStyle = collide ? "lime" : "blue";
  ctx.fillRect(
    0 - (blocks[1].w / 2),
    0 - (blocks[1].h / 2),
    blocks[1].w,
    blocks[1].h,
  );
  ctx.restore();
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  blocks[1].r = parseFloat(doc.id("r").value);
  if ((doc.id("r").value) >= 360) {
    doc.id("r").value = 0;
  }
  /* var keysDown = F.getKeyCodes(controls); */
  if (gameState == "play") {
    if (F.mouse.onCanvas) {
      blocks[1].x = F.mouse.x - (blocks[1].w / 2);
      blocks[1].y = F.mouse.y - (blocks[1].h / 2);
    }

    // collide = F.collide(blocks[0], blocks[1]);
    collide = doPolygonsIntersect([
      blocks[0].x,
      blocks[0].y,
      blocks[0].x + blocks[0].w,
      blocks[0].y + blocks[0].h,
    ], [
      blocks[1].x,
      blocks[1].y,
      blocks[1].x + blocks[1].w,
      blocks[1].y + blocks[1].h,
    ]);
  }
}

/**
 * Helper function to determine whether there is an intersection between the two polygons described
 * by the lists of vertices. Uses the Separating Axis Theorem
 *
 * @param a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @param b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @return true if there is any intersection between the 2 polygons, false otherwise
 */
function isUndefined(v) {
  return (v == undefined);
}
function doPolygonsIntersect(a, b) {
  var polygons = [a, b];
  var minA, maxA, projected, i, i1, j, minB, maxB;

  for (i = 0; i < polygons.length; i++) {

    // for each polygon, look at each edge of the polygon, and determine if it separates
    // the two shapes
    var polygon = polygons[i];
    for (i1 = 0; i1 < polygon.length; i1++) {
      
      // grab 2 vertices to create an edge
      var i2 = (i1 + 1) % polygon.length;
      var p1 = polygon[i1];
      var p2 = polygon[i2];
      
      // find the line perpendicular to this edge
      var normal = {x: p2.y - p1.y, y: p1.x - p2.x};

      minA = maxA = undefined;
      // for each vertex in the first shape, project it onto the line perpendicular to the edge
      // and keep track of the min and max of these values
      for (j = 0; j < a.length; j++) {
        projected = normal.x * a[j].x + normal.y * a[j].y;
        if (isUndefined(minA) || projected < minA) {
          minA = projected;
        }
        if (isUndefined(maxA) || projected > maxA) {
          maxA = projected;
        }
      }

      // for each vertex in the second shape, project it onto the line perpendicular to the edge
      // and keep track of the min and max of these values
      minB = maxB = undefined;
      for (j = 0; j < b.length; j++) {
        projected = normal.x * b[j].x + normal.y * b[j].y;
        if (isUndefined(minB) || projected < minB) {
          minB = projected;
        }
        if (isUndefined(maxB) || projected > maxB) {
          maxB = projected;
        }
      }

      // if there is no overlap between the projects, the edge we are looking at separates the two
      // polygons, and we know there is no overlap
      if (maxA < minB || maxB < minA) {
        return false;
      }
    }
  }
  return true;
};

var then = Date.now();
reset();
main();