
function render() {
  ctx.fillCanvas();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "Bold 32px Arial";
  for (x = 0; x < 8; x++) {
    for (y = 0; y < 8; y++) {
      ctx.fillStyle = ((x % 2) ^ (y % 2)) ? color.board_black : color.board_white;
      ctx.fillRect(
        x * (canvas.width / 8),
        y * (canvas.height / 8),
        (canvas.width / 8),
        (canvas.height / 8),
      );
    }
  }

  if (selected) {
    ctx.fillStyle = selected.clicked ? color.board_clicked : ((board[selected.x][selected.y] && board[selected.x][selected.y].c == turn) ? color.board_selected : color.board_selected_empty);
    ctx.fillRect(
      selected.x * (canvas.width / 8),
      selected.y * (canvas.height / 8),
      (canvas.width / 8),
      (canvas.height / 8),
    );
  }

  moves = availableMoves();
  if (moves && board[selected.x][selected.y] && board[selected.x][selected.y].c == turn) {
    ctx.fillStyle = color.move_available;
    for (m = 0; m < moves.length; m++) {
      ctx.fillRect(
        moves[m].x * (canvas.width / 8),
        moves[m].y * (canvas.height / 8),
        (canvas.width / 8),
        (canvas.height / 8),
      );
    }
  }

  for (x = 0; x < 8; x++) {
    for (y = 0; y < 8; y++) {
      if (board[x][y]) {
        ctx.fillStyle = board[x][y].c ? color.board_black : color.board_white;
        ctx.strokeStyle = !board[x][y].c ? color.board_black : color.board_white;
        ctx.lineWidth = board[x][y].c ? 1 : 3;

        ctx.filter = "none";
        ctx.filter = board[x][y].c ? 0 : "invert(100)";
        ctx.drawImage(
          images[data.pieces[board[x][y].p]],
          x * (canvas.width / 8),
          y * (canvas.height / 8),
          (canvas.width / 8),
          (canvas.height / 8),
        );
        ctx.filter = "none";
      }
    }
  }

  if (selected && board[selected.x][selected.y] && F.keyDown(32)) {
    ctx.font = "24px Arial";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillStyle = color.display_background;
    ctx.strokeStyle = color.display_stroke;
    ctx.lineWidth = 3;

    text = data.pieces[board[selected.x][selected.y].p].capWords();
    w = Math.max(10, ctx.measureText(text).width) + 10;
    h = parseInt(ctx.font) + 10;

    x = (selected.x + 1) * (canvas.width / 8);
    x -= (selected.x > 5) ? w + (canvas.width / 8) : 0;
    y = selected.y * (canvas.height / 8)
    r = 10;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arcTo(x + w, y, x + w, y + h, (selected.x > 5) ? 0 : r);
    ctx.arcTo(x + w, y + h, x, y + h, (selected.x > 5) ? 0 : r);
    ctx.arcTo(x, y + h, x, y, (selected.x > 5) ? r : 0);
    ctx.arcTo(x, y, x + w, y, (selected.x > 5) ? r : 0);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + ((selected.x > 5) ? r : 0), y);
    ctx.arcTo(x + w, y, x + w, y + h, (selected.x > 5) ? 0 : r);
    ctx.arcTo(x + w, y + h, x, y + h, (selected.x > 5) ? 0 : r);
    ctx.arcTo(x, y + h, x, y, (selected.x > 5) ? r : 0);
    ctx.arcTo(x, y, x + w, y, (selected.x > 5) ? r : 0);
    ctx.stroke();

    ctx.fillStyle = color.display_stroke;
    ctx.fillText(
      text,
      x + 5,
      y + 5,
    );
  }
}