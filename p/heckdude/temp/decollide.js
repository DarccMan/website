let max = 200;
          let dirs = [
            [0, -1],
            [-1, 0],
            [1, 0],
            [0, 1],
          ];
          lens = {};
          console.log(1);
          ctx.lineWidth = 5;
          Dirs: for (d = 0; d < dirs.length; d++) {
            ctx.strokeStyle = F.getColor(F.joinArray(F.hsv_rgb([
              d * 90,
              100,
              100,
            ]).values(), [0.3]));
            line = [];
            Blocks: for (v = 0; v < blocks.length; v++) {
              if (
                d == 3
                || d == 0
                || true
              ) {
                ctx.strokeRect(
                  player.x - (dirs[d][0] == -1 ? player.w : 0) - (max * dirs[d][0]),
                  player.y - (max * dirs[d][1]) - (dirs[d][1] == -1 ? player.h : 0),
                  player.w + (max * dirs[d][0]),
                  player.h + (max * (dirs[d][1] == 1 ? 0 : 1)),
                );
              }
              if (d == 3) {
                throw ("Stop");
              }
              if (F.collide({
                x: player.x - (max * dirs[d][0]),
                y: player.y - (max * dirs[d][1]),
                w: player.w + ((player.x - (player.x - max)) * dirs[d][0]),
                w: player.h + ((player.y - (player.y - max)) * dirs[d][1]),
              }, blocks[v])) {
                line.push(blocks[v]);
              }
            }
            switch (dirs[d].join("_")) {
              case ("0_-1"): {
                line = line.sort((a, b) => b.x - a.x);
              }
              case ("-1_0"): {
                line = line.sort((a, b) => b.y - a.y);
              }
              case ("1_0"): {
                line = line.sort((a, b) => b.y + a.y);
              }
              case ("0_1"): {
                line = line.sort((a, b) => b.x + a.x);
              }
            }
            p = player[dirs[d][0] == 0 ? "x" : "y"];
            Line: for (l = 0; l < line.length; l++) {
              p = line[l][dirs[d][0] == 0 ? "x" : "y"] - player[dirs[d][0] == 0 ? "w" : "h"];
            }
            lens[dirs[d].join("_")] = F.diff(player[dirs[d][0] == 0 ? "x" : "y"], p);
          }
          lens.sortValues((a, b) => b - a)
          player[lens.keys()[0] == 0 ? "x" : "y"] = lens.sort((a, b) => b - a).values()[0];