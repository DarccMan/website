var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");
var canvas2 = doc.createElement("canvas");
canvas2.id = "canvas2";
canvas2.width = 128;
canvas2.height = 128;
canvas2.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas2);
var ctx2 = canvas2.getContext("2d");
F.triggerOnload();

var board;
var gameState = "start";
var selected = {
  x: 0,
  y: 0,
  val: false,
};
var cursor = {
  x: 0,
  y: 0,
};

doc.id("board_height").value = data.board.x;
doc.id("board_width").value = data.board.y;
doc.id("board_row").value = data.board.row;
points_reset();
function points_reset() {
  doc.id("points_0").innerHTML = 0;
  doc.id("points_1").innerHTML = 0;
  doc.id("points_2").innerHTML = 0;
}

function reset() {
  board = [];
  for (x = 0; x < doc.id("board_height").value; x++) {
    board.push([]);
    for (y = 0; y < doc.id("board_width").value; y++) {
      board[x].push(null);
    }
  }
  winTiles = [];
  
  gameState = "start";
}

function render() {
  ctx.fillCanvas("rgba(200, 200, 200)");
  if (gameState == "draw") {
    ctx.fillCanvas("rgba(200, 80, 10, 0.5)");
  }
  ctx.fillStyle = "rgba(40, 40, 40)";
  for (x = 1; x < board.length; x++) {
    ctx.fillRect(
      ((canvas.width / board.length) * x) - (data.board.lineWidth / 2),
      0,
      data.board.lineWidth,
      canvas.height,
    );
  }
  for (y = 1; y < board[0].length; y++) {
    ctx.fillRect(
      0,
      ((canvas.height / board[0].length) * y) - (data.board.lineWidth / 2),
      canvas.width,
      data.board.lineWidth,
    );
  }
  ctx.fillStyle = "rgba(20, 200, 20, 0.5)";
  for (c = 0; c < winTiles.length; c++) {
    ctx.fillRect(
      ((canvas.width / board.length) * (winTiles[c].x)),
      ((canvas.height / board[0].length) * (winTiles[c].y)),
      (canvas.height / board.length),
      (canvas.height / board[0].length),
    );
  }
  if (selected.val) {
    ctx.fillStyle = "rgba(50, 50, 50, 0.2)";
    ctx.fillRect(
      ((canvas.width / board.length) * (selected.x)),
      ((canvas.height / board[0].length) * (selected.y)),
      (canvas.height / board.length),
      (canvas.height / board[0].length),
    );
  }
  ctx.fillStyle = "rgba(20, 20, 20)";
  ctx.lineWidth = data.board.symbolWidth;
  ctx.lineCap = "round";
  for (x = 0; x < board.length; x++) {
    for (y = 0; y < board[x].length; y++) {
      switch (board[x][y]) {
        case (1): {
          ctx.beginPath();
          ctx.moveTo(
            ((canvas.width / board.length) * (x)) + ((canvas.width / board.length) / 8),
            ((canvas.height / board[0].length) * (y)) + ((canvas.height / board[0].length) / 8),
          );
          ctx.lineTo(
            ((canvas.width / board.length) * (x + 1)) - ((canvas.width / board.length) / 8),
            ((canvas.height / board[0].length) * (y + 1)) - ((canvas.height / board[0].length) / 8),
          );
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(
            ((canvas.width / board.length) * (x)) + ((canvas.width / board.length) / 8),
            ((canvas.height / board[0].length) * (y + 1)) - ((canvas.height / board[0].length) / 8),
          );
          ctx.lineTo(
            ((canvas.width / board.length) * (x + 1)) - ((canvas.width / board.length) / 8),
            ((canvas.height / board[0].length) * (y)) + ((canvas.height / board[0].length) / 8),
          );
          ctx.stroke();
        }; break;
        case (0): {
          ctx.beginPath();
          ctx.ellipse(
            ((canvas.width / board.length) * (x)) + ((canvas.width / board.length) / 2),
            ((canvas.height / board[0].length) * (y)) + ((canvas.height / board[0].length) / 2),
            ((canvas.width / board.length) / 2.5),
            ((canvas.height / board[0].length) / 2.5),
            0, 0, 2 * Math.PI);
          ctx.stroke();
        }; break;
      }
    }
  }
  if (F.mouse.onCanvas) {
    ctx.fillStyle = F.getColor(data.cursor.color);
    ctx.fillRect(
      cursor.x - (data.cursor.w / 2),
      cursor.y - data.cursor.h - (data.cursor.gap / 2),
      data.cursor.w,
      data.cursor.h,
    );
    ctx.fillRect(
      cursor.x - (data.cursor.w / 2),
      cursor.y + (data.cursor.gap / 2),
      data.cursor.w,
      data.cursor.h,
    );
    ctx.fillRect(
      cursor.x - data.cursor.h - (data.cursor.gap / 2),
      cursor.y - (data.cursor.w / 2),
      data.cursor.h,
      data.cursor.w,
    );
    ctx.fillRect(
      cursor.x + (data.cursor.gap / 2),
      cursor.y - (data.cursor.w / 2),
      data.cursor.h,
      data.cursor.w,
    );
  }
  ctx2.fillCanvas("rgba(200, 200, 200)");
  ctx2.fillStyle = "rgba(20, 20, 20)";
  ctx2.lineWidth = data.board.symbolWidth / ((canvas.height / canvas2.height) / 2);
  ctx2.lineCap = "round";
  switch (gameState) {
    case ("turn_1"): {
      ctx2.beginPath();
      ctx2.moveTo(
        ((canvas2.width / board.length) * (2)) + ((canvas2.width / board.length) / 8),
        ((canvas2.height / board[0].length) * (2)) + ((canvas2.height / board[0].length) / 8),
      );
      ctx2.lineTo(
        ((canvas2.width / board.length) * (1)) - ((canvas2.width / board.length) / 8),
        ((canvas2.height / board[0].length) * (1)) - ((canvas2.height / board[0].length) / 8),
      );
      ctx2.stroke();
      ctx2.beginPath();
      ctx2.moveTo(
        ((canvas2.width / board.length) * (2)) + ((canvas2.width / board.length) / 8),
        ((canvas2.height / board[0].length) * (1)) - ((canvas2.height / board[0].length) / 8),
      );
      ctx2.lineTo(
        ((canvas2.width / board.length) * (1)) - ((canvas2.width / board.length) / 8),
        ((canvas2.height / board[0].length) * (2)) + ((canvas2.height / board[0].length) / 8),
      );
      ctx2.stroke();
    }; break;
    case ("turn_0"): {
      ctx2.beginPath();
      ctx2.ellipse(
        ((canvas2.width / board.length) * (1)) + ((canvas2.width / board.length) / 2),
        ((canvas2.height / board[0].length) * (1)) + ((canvas2.height / board[0].length) / 2),
        ((canvas2.width / board.length) / 1.5),
        ((canvas2.height / board[0].length) / 1.5),
        0, 0, 2 * Math.PI);
      ctx2.stroke();
    }; break;
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
  canvas2.style.display = (doc.id("show_canvas2").checked) ? "block" : "none";
  keysDown = F.getKeyCodes(controls);
  if (F.mouse.onCanvas) {
    cursor.x = F.mouse.x - data.cursor.offsetX;
    cursor.y = F.mouse.y - data.cursor.offsetY;
    selected.x = F.setBorder(Math.floor(cursor.x / (canvas.width / board.length)), 0, board.length - 1);
    selected.y = F.setBorder(Math.floor(cursor.y / (canvas.height / board[0].length)), 0, board[0].length - 1);
    selected.val = true;
  }
  selected.val = false;
  if (gameState == "start") {
    if (! keysDown.includes("game_click")) {
      gameState = "turn_{0}".format((doc.id("bot_first").checked) ? 0 : 1);
    }
  } else if (gameState == "turn_1") {
    if (F.mouse.onCanvas) {
      selected.val = true;
      if (keysDown.includes("game_click")) {
        if (board[selected.x][selected.y] == null) {
          board[selected.x][selected.y] = 1;
          gameState = "turn_between";
          setTimeout(() => {
            gameState = "turn_0";
            check_win();
          }, data.board.turn_between_time);
        }
      }
    }
  } else if (gameState == "turn_0") {
      switch (doc.id("bot_type").value) {
        case ("smart"): {
          let win = null;
          let cC = null;
          combs = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1],
          ];
          xI: for (x = 0; x < board.length; x++) {
            for (y = 0; y < board[x].length; y++) {
              for (w = 0; w < 2; w++) {
                winTiles = [];
                for (c = 0; c < combs.length; c++) {
                  win = w;
                  rI: for (x2 = 0; x2 < doc.id("board_row").value - 1; x2++) {
                    if (board[x + (x2 * combs[c][0])] !== undefined && board[x + (x2 * combs[c][0])][y + (x2 * combs[c][1])] !== undefined) {
                      if (board[x + (x2 * combs[c][0])][y + (x2 * combs[c][1])] != win) {
                        win = null;
                        winTiles = [];
                        break rI;
                      } else {
                        winTiles.push({
                          x: x + (x2 * combs[c][0]),
                          y: y + (x2 * combs[c][1]),
                        });
                      }
                    } else {
                      win = null;
                      winTiles = [];
                      break rI;
                    }
                  }
                  if (win == w) {
                    a1: for (i2 = 0; i2 < winTiles.length; i2++) {
                      for (i3 = -1; i3 < 2; i3++) {
                        let cX = winTiles[i2].x + (combs[c][0] * i3);
                        let cY = winTiles[i2].y + (combs[c][1] * i3);
                        if (board[cX] !== undefined && board[cX][cY] === null) {
                          cC = {
                            x: cX,
                            y: cY,
                          };
                          break a1;
                        }
                      }
                    }
                    break xI;
                  }
                }
              }
            }
          }
          if (cC != null) {
            board[cC.x][cC.y] = 0;
          } else {
            let val = false;
            for (x = 0; x < board.length; x++) {
              for (y = 0; y < board[x].length; y++) {
                if (board[x][y] == null) {
                  val = true;
                  break;
                }
              }
            }
            if (val) {
              a: for (i = 0; i < 1000; i++) {
                let x = F.randomInt(0, board.length - 1);
                let y = F.randomInt(0, board[x].length - 1);
                if (board[x][y] == null) {
                  selected.x = x;
                  selected.y = y;
                  selected.val = true;
                  board[x][y] = 0;
                  selected.val = false;
                  gameState = "turn_between";
                  setTimeout(() => {
                    gameState = "turn_1";
                  }, data.board.turn_between_time);
                  break a;
                }
              }
            }
          }
          gameState = "turn_1";
        }; break;
        case ("predict"): {
          let b = board;
          let cC = null;
          let combs = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1],
          ];
          main: for (w = 0; w < 2; w++) {
            cC = null;
            for (oX = 0; oX < b.length; oX++) {
              for (oY = 0; oY < b[oX].length; oY++) {
                if (b[oX][oY] == null) {
                  let old = b[oX][oY];
                  b[oX][oY] = w;
                  win = null;
                  for (x = 0; x < b.length; x++) {
                    for (y = 0; y < b[x].length; y++) {
                      for (c = 0; c < combs.length; c++) {
                        win = w;
                        rI: for (x2 = 0; x2 < doc.id("board_row").value; x2++) {
                          if (b[x + (x2 * combs[c][0])] !== undefined && b[x + (x2 * combs[c][0])][y + (x2 * combs[c][1])] !== undefined) {
                            if (b[x + (x2 * combs[c][0])][y + (x2 * combs[c][1])] != win) {
                              win = null;
                              break rI;
                            }
                          } else {
                            win = null;
                            break rI;
                          }
                        }
                        if (win == w) {
                          cC = {
                            x: oX,
                            y: oY,
                          };
                          break main;
                        }
                      }
                    }
                  }
                  b[oX][oY] = old;
                }
              }
            }
          }
          if (! [null, undefined, "", {}].includes(cC)) {
            board[cC.x][cC.y] = 0;
          } else {
            let val = false;
            for (x = 0; x < board.length; x++) {
              for (y = 0; y < board[x].length; y++) {
                if (board[x][y] == null) {
                  val = true;
                  break;
                }
              }
            }
            if (val) {
              a: for (i = 0; i < 1000; i++) {
                let x = F.randomInt(0, board.length - 1);
                let y = F.randomInt(0, board[x].length - 1);
                if (board[x][y] == null) {
                  selected.x = x;
                  selected.y = y;
                  selected.val = true;
                  board[x][y] = 0;
                  selected.val = false;
                  gameState = "turn_between";
                  setTimeout(() => {
                    gameState = "turn_1";
                  }, data.board.turn_between_time);
                  break a;
                }
              }
            }
          }
          gameState = "turn_1";
        }; break;
        case ("none"): {
          gameState = "turn_1";
        }; break;
        case ("2player"): {
          if (F.mouse.onCanvas) {
            selected.x = Math.floor(cursor.x / (canvas.width / board.length));
            selected.y = Math.floor(cursor.y / (canvas.height / board[0].length));
            selected.val = true;
            if (keysDown.includes("game_click")) {
              if (board[selected.x][selected.y] == null) {
                board[selected.x][selected.y] = 0;
                gameState = "turn_between";
                setTimeout(() => {
                  gameState = "turn_1";
                  check_win();
                }, data.board.turn_between_time);
              }
            }
          }
        }; break
        default:
        case ("random"): {
          let val = false;
          for (x = 0; x < board.length; x++) {
            for (y = 0; y < board[x].length; y++) {
              if (board[x][y] == null) {
                val = true;
                break;
              }
            }
          }
          if (val) {
            a: for (i = 0; i < 1000; i++) {
              let x = F.randomInt(0, board.length - 1);
              let y = F.randomInt(0, board[x].length - 1);
              if (board[x][y] == null) {
                selected.x = x;
                selected.y = y;
                selected.val = true;
                board[x][y] = 0;
                selected.val = false;
                gameState = "turn_between";
                setTimeout(() => {
                  gameState = "turn_1";
                }, data.board.turn_between_time);
                break a;
              }
            }
          }
        }
      }
      selected.val = true;
      check_win();
  }
}

var winTiles = [];
function check_win() {
  // return;
  win = null;
  combs = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  xI: for (x = 0; x < board.length; x++) {
    for (y = 0; y < board[x].length; y++) {
      for (w = 0; w < 2; w++) {
        winTiles = [];
        for (c = 0; c < combs.length; c++) {
          win = w;
          rI: for (x2 = 0; x2 < doc.id("board_row").value; x2++) {
            if (board[x + (x2 * combs[c][0])] !== undefined && board[x + (x2 * combs[c][0])][y + (x2 * combs[c][1])] !== undefined) {
              if (board[x + (x2 * combs[c][0])][y + (x2 * combs[c][1])] != win) {
                win = null;
                winTiles = [];
                break rI;
              } else {
                winTiles.push({
                  x: x + (x2 * combs[c][0]),
                  y: y + (x2 * combs[c][1]),
                });
              }
            } else {
              win = null;
              winTiles = [];
              break rI;
            }
          }
          if (win == w) {
            console.log(w);
            doc.id("points_{0}".format(w)).innerHTML = parseInt(doc.id("points_{0}".format(w)).innerHTML) + 1;
            gameState = "end";
            setTimeout(() => {
              reset();
            }, 500);
            break xI;
          }
        }
      }
    }
  }
  if (win == null) {
    val = true;
    for (x = 0; x < board.length; x++) {
      for (y = 0; y < board[x].length; y++) {
        if (board[x][y] === null) {
          val = false;
        }
      }
    }
    if (val) {
      gameState = "draw";
      doc.id("points_2").innerHTML = parseInt(doc.id("points_2").innerHTML) + 1;
      setTimeout(() => {
        reset();
      }, 800);
    }
  }
}

function btn_update() {
  if (doc.id("bot_first").checked) {
    val = true;
    for (x = 0; x < board.length; x++) {
      for (y = 0; y < board[x].length; y++) {
        if (board[x][y] !== null) {
          val = false;
        }
      }
    }
    if (val) {
      gameState = "turn_0";
    }
  }
}

var timer = {};
timer.time = 0;
timer.updater;
timer.play = false;
timer.toggle = function() {
  if (timer.play) {
    clearInterval(timer.updater);
    timer.play = false;
    timer.display_update();
  } else {
    timer.play = true;
    timer.updater = setInterval(() => {
      timer.time++;
      timer.display_update();
    }, 10);
  }
  timer.btn_update();
}
timer.btn_update = function () {
  if (timer.play) {
    doc.id("timer_toggle").innerHTML = "Pause Timer";
  } else {
    doc.id("timer_toggle").innerHTML = "Start Timer";
  }
}
timer.reset = function() {
  timer.time = 0;
  timer.play = true;
  timer.toggle();
  timer.btn_update();
  timer.display_update();
}
timer.display_update = function () {
  num = F.toTime(timer.time * 10)[0].round(2);
  num = num.toString().split(".");
  num[0] = num[0].padStart(3, " ");
  if (num[1] != undefined) {
    num[1] = num[1].padEnd(2, "0");
  } else {
    num[1] = "0";
  }
  doc.id("timer_display").innerHTML = [num.join("."), F.toTime(timer.time * 10)[1]].join(" ");
}
timer.init = function () {
  timer.reset();
  timer.toggle();
}

var then = Date.now();
reset();
main();