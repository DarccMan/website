var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

onbeforeunload = function () {
  return ("Are you sure??");
}

var gameState = "start";
var board = [];
var selected = null;
var images = {};
var vals = {};
var turn = null;

function reset() {
  board = [];
  for (x = 0; x < 8; x++) {
    board[x] = [];
    for (y = 0; y < 8; y++) {
      board[x][y] = null;
      if (y < 2 || y > 5) {
        board[x][y] = {
          c: (y < 4) ? 1 : 0,
          p: (
            y == 1 || y == 6
          ) ? 0 : (
            x == 0 || x == 7
          ) ? 1 : (
            x == 1 || x == 6
          ) ? 2 : (
            x == 2 || x == 5
          ) ? 3 : (
            x == 3
          ) ? 5 : (
            x == 4
          ) ? 4 : -1
        };
      }
    }
  }

  for (p = 0; p < data.pieces.length; p++) {
    img = new Image();
    img.src = "./image/icon/{0}.png".format(data.pieces[p]);
    images[data.pieces[p]] = img;
  }

  gameState = "play";
  turn = 0;
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}

function update(mod) {
  if (gameState == "play") {
    if (F.mouse.onCanvas) {
      if (!selected || !selected.clicked) {
        selected = null;
        x = (F.mouse.x / 64).round(0, "f").setBorder(0, 8);
        y = (F.mouse.y / 64).round(0, "f").setBorder(0, 8);
        p = null;
        c = null;
        if (board[x] && board[x][y]) {
          p = board[x][y].p;
          c = board[x][y].c;
        }
        selected = {
          x,
          y,
          p,
          c,
        };
      }

      if (selected && selected.clicked) {
        canvas.style.cursor = "default";
        moves = availableMoves();
        for (m = 0; m < moves.length; m++) {
          if (
            (F.mouse.x / 64).round(0, "f").setBorder(0, 8) == moves[m].x
            && (F.mouse.y / 64).round(0, "f").setBorder(0, 8) == moves[m].y
          ) {
            canvas.style.cursor = "pointer";
            break;
          }
        }

        if (F.buttonDown(0)) {
          if (vals.click) {
            vals.click = false;
            selected.clicked = false;

            moves = availableMoves();
            for (m = 0; m < moves.length; m++) {
              if (
                (F.mouse.x / 64).round(0, "f").setBorder(0, 8) == moves[m].x
                && (F.mouse.y / 64).round(0, "f").setBorder(0, 8) == moves[m].y
              ) {
                board[moves[m].x][moves[m].y] = board[selected.x][selected.y];
                board[selected.x][selected.y] = null;
                turn = (turn + 1) % 2

                break;
              }
            }
          }
        } else {
          vals.click = true;
        }
      } else {
        canvas.style.cursor = "pointer";
        if (F.buttonDown(0)) {
          if (vals.click) {
            vals.click = false;
            if (board[selected.x][selected.y] && board[selected.x][selected.y].c == turn) {
              selected.clicked = true;
            }
          }
        } else {
          vals.click = true;
        }
      }
    } else {
      if (selected && !selected.clicked) {
        selected = null;
      }
    }

    kings = [0, 0];
    for (x = 0; x < 8; x++) {
      for (y = 0; y < 8; y++) {
        if (board[x][y] && board[x][y].p == 4) {
          kings[board[x][y].c] = 1;
        }
      }
    }
    if (kings[0] ^ kings[1]) {
      gameState = "win";
      console.log(
        "{0} Won!".format(
          kings.join("") == "10" ?
            "White" :
            "Black"
        )
      );
      setTimeout(reset, 500);
    } else if (kings.join("") == "00") {
      gameState = "draw";
      console.log("Draw!");
      setTimeout(reset, 500);
    }
  }
}

function availableMoves() {
  a = selected;
  if (a) {
    moves = [];

    if (pieceMoves[a.p]) {
      for (m = 0; m < pieceMoves[a.p].length; m++) {
        x = pieceMoves[a.p][m].x;
        if (typeof x == "function") {
          x = x();
        }
        y = pieceMoves[a.p][m].y;
        if (typeof y == "function") {
          y = y();
        }

        if (
          board[a.x + x] !== undefined
          && board[a.x + x][a.y + y] !== undefined
          && (
            (
              pieceMoves[a.p][m].n == 2
              && (
                !board[a.x + x][a.y + y]
                || board[a.x + x][a.y + y].c != a.c
              )
            ) || (
              pieceMoves[a.p][m].n && !(
                !board[a.x + x][a.y + y]
                || board[a.x + x][a.y + y].c == a.c
              )
            ) || (
              !pieceMoves[a.p][m].n && (
                !board[a.x + x][a.y + y]
              )
            )
          ) && (
            !pieceMoves[a.p][m].e
            || pieceMoves[a.p][m].e(
              a.x,
              a.y,
              a.x + x,
              a.y + y,
              board[a.x + x][a.y + y],
            )
          )
        ) {
          moves.push({
            x: a.x + x,
            y: a.y + y,
          });
        }
      }
    }

    return (moves);
  }
}

var then = Date.now();
reset();
main();