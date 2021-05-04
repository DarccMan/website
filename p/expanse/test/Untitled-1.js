
mxp = player.x;
myp = player.y;
mx0 = player.x + player.w / 2;
my0 = player.y + player.h / 2;
mxn = player.x + player.w;
myn = player.y + player.h;
pdirs = [
  [mx0, myn],
  [mxp, my0],
  [mx0, myp],
  [mxn, my0],
];
I: for (i = 0; i < dirs.length; i++) {
  mins.push(null);
  B: for (b = 0; b < distance; b++) {
    block = grid
    [cx + dirs[i][0] * b]?.
    [cy + dirs[i][1] * b];
    if (!block || block.block == "none") {
      ctx.fillStyle = "yellow";
      ctx.fillRect(
        - cam.x + (cx + dirs[i][0] * b + 0.5) * tw - 10,
        - cam.y + (cy + dirs[i][1] * b + 0.5) * tw - 10,
        20,
        20,
      );
      /* if (i % 2) {
        mins[i] = Math.floor(Math.abs(
          pdirs[i][0] -
          (cx + dirs[i][0] * b) * tw
        ) / tw);
      } else {
        mins[i] = Math.floor(Math.abs(
          pdirs[i][1] -
          (cx + dirs[i][1] * b) * tw
        ) / tw);
      } */
      ctx.fillStyle = "white";
      ctx.fillRect(
        - cam.x + pdirs[i][0] - 5,
        - cam.y + pdirs[i][0] - 5,
        10,
        10,
      );
      mins[i] = [
        (
          pdirs[i][0] / tw -
          (cx + dirs[i][0] * b)
        ),
        b,
      ];
      // mins[i] = b;
      break B;
    }
  }
}
min = [Infinity, null];
// min = [0, 0];
for (i = 0; i < mins.length; i++) {
  if (mins[i]) {
    if (Math.abs(mins[i][0]) < Math.abs(min[0])) {
      min = [mins[i][0], i];
    }
  }
}
dir = min[1];
value = Math.floor(mins[dir][1]);
if (!global.once_0) {
  console.log(value);
  console.log(amount);
  global.once_0 = true;
}
// console.log(value, amount);
if (min[1] !== null) {
  ctx.fillStyle = "blue";
  ctx.fillRect(
    - cam.x + (dirs[dir][0] * value + cx + 0.5) * tw - 5,
    - cam.y + (dirs[dir][1] * value + cy + 0.5) * tw - 5,
    10,
    10,
  );
  // player[min[1] % 2 ? "x" : "y"] += (min[1] % 3 ? 1 : -1) * tw * 0.03;
}