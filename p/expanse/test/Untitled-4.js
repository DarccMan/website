
blockUnder = false;
cb = null;
p = {...playerHit};
p.y += player.vy;
p2 = {...playerHit};
p2.y -= 5;
p2.h = 20;
walkInto = false;
X: for (x = tech.player_minx; x < tech.player_maxx; x++) {
  for (y = tech.player_miny; y < tech.player_maxy; y++) {
    if (data.blocks[grid[x][y].block]?.collide) {
      if (F.collide(p, {
        x: (x + 0.001) * tw,
        y: (y + 0.001) * tw,
        w: tw + 1,
        h: tw + 1,
      })) {
        cb = grid[x][y];

        /* Go into walkInto block */
        if (
          data.blocks[grid[x][y].block]?.walkInto
        ) {
          if (F.collide(p2, {
            x: (x + 0.001) * tw,
            y: (y + 0.001) * tw,
            w: tw + 1,
            h: tw + 1,
          })) {
            walkInto = true;
            cb = null;
          }
        } else {
          break X;
        }
      }
    }
  }
}
if (!cb) {
  player.vy += data.v.fa * mod * (10 / data.tiles);
} else {
  player.vy = 0;
  blockUnder = true;
}