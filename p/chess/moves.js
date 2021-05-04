var pieceMoves = [
  [
    {
      x: 0,
      y: () => (a.c == 1) ? 1 : -1,
      n: 0,
    },
    {
      x: 0,
      y: () => (a.c == 1) ? 2 : -2,
      n: 0,
      e: (x, y, x2, y2, c) => (
        (y < 2 || y > 5)
        && !board[x][y - ((a.c == 1) ? -1 : 1)]
      )
    },
    {
      x: -1,
      y: () => (a.c == 1) ? 1 : -1,
      n: 1,
    },
    {
      x: 1,
      y: () => (a.c == 1) ? 1 : -1,
      n: 1,
    },
  ],
  [
    {
      x: -1,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -2,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -3,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -4,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -5,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -6,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -7,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 1,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 2,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 3,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 4,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 5,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 6,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 7,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -1,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 1,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
  ],
  [
    {
      x: -2,
      y: -1,
      n: 2,
    },
    {
      x: -1,
      y: -2,
      n: 2,
    },
    {
      x: 1,
      y: -2,
      n: 2,
    },
    {
      x: 2,
      y: -1,
      n: 2,
    },
    {
      x: -2,
      y: 1,
      n: 2,
    },
    {
      x: -1,
      y: 2,
      n: 2,
    },
    {
      x: 1,
      y: 2,
      n: 2,
    },
    {
      x: 2,
      y: 1,
      n: 2,
    },
  ],
  [
    {
      x: -1,
      y: -1,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -2,
      y: -2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -3,
      y: -3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -4,
      y: -4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -5,
      y: -5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -6,
      y: -6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -7,
      y: -7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 1,
      y: 1,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 2,
      y: 2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 3,
      y: 3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 4,
      y: 4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 5,
      y: 5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 6,
      y: 6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 7,
      y: 7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -1,
      y: 1  ,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -2,
      y: 2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -3,
      y: 3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -4,
      y: 4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -5,
      y: 5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -6,
      y: 6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -7,
      y: 7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 1,
      y: -1,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 2,
      y: -2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 3,
      y: -3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 4,
      y: -4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 5,
      y: -5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 6,
      y: -6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 7,
      y: -7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
  ],
  [
    {
      x: -1,
      y: -1,
      n: 2,
    },
    {
      x: 0,
      y: -1,
      n: 2,
    },
    {
      x: 1,
      y: -1,
      n: 2,
    },
    {
      x: 1,
      y: 0,
      n: 2,
    },
    {
      x: 1,
      y: 1,
      n: 2,
    },
    {
      x: 0,
      y: 1,
      n: 2,
    },
    {
      x: -1,
      y: 1,
      n: 2,
    },
    {
      x: -1,
      y: 0,
      n: 2,
    },
  ],
  [
    {
      x: -1,
      y: -1,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -2,
      y: -2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -3,
      y: -3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -4,
      y: -4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -5,
      y: -5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -6,
      y: -6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -7,
      y: -7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x - i]) {
            if (board[x - i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 1,
      y: 1,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 2,
      y: 2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 3,
      y: 3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 4,
      y: 4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 5,
      y: 5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 6,
      y: 6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 7,
      y: 7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x + i]) {
            if (board[x + i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -1,
      y: 1  ,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -2,
      y: 2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -3,
      y: 3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -4,
      y: 4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -5,
      y: 5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -6,
      y: 6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -7,
      y: 7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x - i]) {
            if (board[x - i][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 1,
      y: -1,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 2,
      y: -2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 3,
      y: -3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 4,
      y: -4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 5,
      y: -5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 6,
      y: -6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 7,
      y: -7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x + i]) {
            if (board[x + i][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -1,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -2,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -3,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -4,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -5,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -6,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: -7,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x - i]) {
            if (board[x - i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 1,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 2,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 3,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 4,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 5,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 6,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 7,
      y: 0,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x + i]) {
            if (board[x + i][y]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -1,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: -7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x]) {
            if (board[x][y - i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 1,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 1; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 2,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 2; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 3,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 3; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 4,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 4; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 5,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 5; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 6,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 6; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
    {
      x: 0,
      y: 7,
      n: 2,
      e: (x, y, x2, y2, c) => {
        val = true;
        for (i = 1; i < 7; i++) {
          if (board[x]) {
            if (board[x][y + i]) {
              val = false;
              break;
            }
          }
        }
        return (val);
      }
    },
  ],
];