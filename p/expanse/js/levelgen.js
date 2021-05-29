/* Set up game */
var levels;
var levelVars;
function loadLevels() {
  levels = [];
  levelVars = {};
  levelFunctions = {};
  for (l = 0; l < rawLevels.length; l++) {
    if (
      rawLevels[l] && (
        global.ignoreDisabled
        || !rawLevels[l].disabled
      ) && (
        global.secretUnlocked
        || !rawLevels[l].secret
      )
    ) {
      ld = readLevelData(rawLevels[l].set, l);
      levels.push({
        ...ld,
        ...rawLevels[l],
      });
    }
  }
}

function setLevel(number) {
  /* Read level file */
  grid = JSON.parse(JSON.stringify(levels[number].grid));
  enemies = JSON.parse(JSON.stringify(levels[number].enemies));
  lplayer = JSON.parse(JSON.stringify(levels[number].player));
  x = lplayer.x || 2;
  y = lplayer.y || 2;
  if (grid[x.round()]?.[(y + 0.5).round()]) {
    grid[x.round()][(y + 0.5).round()] = {
      block: "door",
    };
  }

  /* Create player */
  player = {
    x: x * tw,
    y: y * tw,
    w: tw * data.player.w,
    h: tw * data.player.h,
    vx: 0,
    vy: 0,
    hold: null,
    status: "idle",
  };
}

function readLevelData(str, l) {
  read = {
    enemies: [],
    grid: [],
  };
  for (x = 0; x < rawLevels[l].dim[0]; x++) {
    read.grid[x] = [];
    for (y = 0; y < rawLevels[l].dim[1]; y++) {
      if (!read.grid[x][y]) {
        read.grid[x][y] = {
          block: "none",
          original: true,
        };
      }
    }
  }
  fen = [];
  str = str.replace(/(\r\n|\n|\r)/gm, "").split(";");
  for (i = 0; i < str.length; i++) {
    line = str[i];
    temp = "";
    afterStart = false;
    for (j = 0; j < line.length; j++) {
      if (afterStart || line[j] != " ") {
        afterStart = true;
        if ("[]".includes(line[j])) {
          afterStart = false;
        }
        temp += line[j];
      }
    }
    line = temp;
    fen.push(line);
  }
  str = fen.s(-1);
  if (str) {
    for (j = str.length - 1; j >= 0; j--) {
      if (str[j] == " ") {
        str = str.s(0, -2);
      } else {
        break;
      }
    }
    fen[fen.length - 1] = str;
  }
  output = [];
  I: for (i = 0; i < fen.length; i++) {
    if (fen[i][0] && fen[i].s(0, 2) != "//") {
      item = readRawComp(fen[i], fen);
      if (item) {
        if (item.type == "loop") {
          for (k = 0; k < item.arr.length; k++) {
            output.push(item.arr[k]);
          }
        } else {
          output.push(item);
        }
      } else {
        output.push({
          type: "unknown",
          str: null,
        });
      }
    }
  }
  fen = output;
  x = 0;
  y = 0;
  for (i = 0; i < fen.length; i++) {
    ret = readComp(fen[i], read, x, y);
    x = ret.x ?? x;
    y = ret.y ?? y;
    x = x.setBorder(0, read.grid.length - 1);
    y = y.setBorder(0, read.grid[0].length);
  }

  return (read);
}

function readRawComp(comp, whole) {
  switch (comp[0]) {
    case ("$"): {
      if (comp.split("[").length > 1) {
        arr = [];
        J: for (j = i; j < whole.length; j++) {
          if (whole[j][0] == "]") {
            break J;
          }
          arr.push(whole[j]);
        }
        loop = parseInt(comp.split("[")[0].s(1, -1));
        arr = [arr[0].s(3, -1), ...F.toArray(arr.s(1, -1))];
        retn = [];
        for (lp = 0; lp < loop; lp++) {
          for (lp1 = 0; lp1 < arr.length; lp1++) {
            item = readRawComp(arr[lp1], whole);
            if (item) {
              retn.push(item);
            }
          }
        }
        return ({
          type: "loop",
          arr: retn,
        });
      }
    }; break;
    case ("x"): {
      return ({
        name: "move",
        dir: "x",
        type: comp[1],
        amount: parseInt(comp.s(2, -1)),
      });
    }; break;
    case ("y"): {
      return ({
        name: "move",
        dir: "y",
        type: comp[1],
        amount: parseInt(comp.s(2, -1)),
      });
    }; break;
    case ("#"): {
      type = comp.split("{")[0]?.split("*")[0].s(1, -1)?.split("&")[0];
      if (type.s(0) == "%") {
        if (levelVars[type.s(1, -1)]) {
          type = levelVars[type.s(1, -1)];
        }
      }
      nbt = comp.split("{")[1]?.split("}")[0]?.s(0, -1)?.split(",");
      amount = parseInt(comp.split("*")[1]?.split("&")[0]) || 1;
      if (amount < 0) {
        amount = read.grid.length * read.grid[0].length;
      }
      random = comp.split("&")[1];
      if (random) {
        random = random.split(",");
        temp = [];
        for (j = 0; j < random.length; j++) {
          arr = random[j].split(":");
          if (arr.length == 1) {
            arr = [type, arr[0]];
          }
          if (arr.length > 1) {
            temp.push([arr[0], parseInt(arr[1]) || 1]);
          }
        }
        random = temp;
      } else {
        random = [[type, 1]];
      }
      temp = [];
      for (j = 0; j < random.length; j++) {
        for (k = 0; k < random[j][1]; k++) {
          temp.push(random[j][0]);
        }
      }
      random = temp;

      if (nbt) {
        temp = {};
        for (j = 0; j < nbt.length; j++) {
          value = nbt[j].split(":")[1];
          if (!isNaN(parseInt(value))) {
            value = parseInt(value);
          }
          if (F.nullish(value)) {
            value = true;
          }
          temp[nbt[j].split(":")[0]] = value;
        }
        nbt = temp;
      } else {
        nbt = {};
      }

      return ({
        name: "block",
        type,
        nbt,
        amount,
        random,
      });
    }; break;
    case ("@"): {
      type = comp.split("{")[0].s(1, -1);
      nbt = comp.split("{")[1]?.split("}")[0]?.s(0, -1)?.split(",");
      if (nbt) {
        temp = {};
        for (j = 0; j < nbt.length; j++) {
          value = nbt[j].split(":")[1];
          if (!isNaN(parseInt(value))) {
            value = parseInt(value);
          }
          if (F.nullish(value)) {
            value = true;
          }
          temp[nbt[j].split(":")[0]] = value;
        }
        nbt = temp;
      } else {
        nbt = {};
      }
      return ({
        name: "enemy",
        type,
        nbt,
      });
    }; break;
    case ("%"): {
      type = comp.s(1, -1)?.split("=");
      if (type) {
        levelVars[type[0]] = type[1];
      }
    }; break;
    default: {
      if (!"[]".includes(comp)) {
        return ({
          name: "unknown",
          str: comp,
        });
      }
    };
  }
}

function readComp(comp, read, x, y) {
  ret = {x, y};
  switch (fen[i]?.name) {
    case "move": {
      amount = fen[i].amount;
      if (fen[i].dir == "x") {
        switch (fen[i].type) {
          case "=": {
            x = amount;
          }; break;
          case "+": {
            x += amount;
          }; break;
          case "-": {
            x -= amount;
          }; break;
        }
      } else if (fen[i].dir == "y") {
        switch (fen[i].type) {
          case "=": {
            y = amount;
          }; break;
          case "+": {
            y += amount;
          }; break;
          case "-": {
            y -= amount;
          }; break;
        }
      }
    }; break;
    case "block": {
      for (j = 0; j < fen[i].amount; j++) {
        x1 = (x + j) % read.grid.length;
        y1 = y + Math.floor((x + j) / read.grid.length);
        if (read.grid[x1]?.[y1]) {
          choice = F.randomChoice(fen[i].random);
          read.grid[x1][y1] = {
            block: data.blocks[choice] ? choice : "unknown",
            ...fen[i].nbt,
          };
        }
      }
    }; break;
    case "enemy": {
      type = fen[i].type;
      enemy = {
        type,
        x: ((x % read.grid.length) * tw) + ((1 - data.enemies[type].w) * tw / 2),
        y: ((y + 1) * tw) - (data.enemies[type].rh ? (
          data.enemies[type].rh * tw
        ) : (
          data.enemies[type].h * tw
        )),
        w: data.enemies[type].w * tw,
        h: data.enemies[type].rh ? (
          data.enemies[type].rh * tw
        ) : (
          data.enemies[type].h * tw
        ),
        vx: 0,
        vy: 0,
        stamp: F.randomInt(0, 1000),
        ...fen[i].nbt,
      };
      if (data.enemies[type].attr.rat) {
        enemy.name = "Clive";
      }
      read.enemies.push(enemy);
    }; break;
    case "unknown": {
      console.warn("Unknown operator '{0}'".format(fen[i].str));
    }; break;
  }
  ret.x = x;
  ret.y = y;
  return ret;
}