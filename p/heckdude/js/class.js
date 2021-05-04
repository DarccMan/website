Game = {};
Game.Player = class {
  constructor (vals) {
    if (!vals || vals.constructor != Object || vals.keys().length <= 0) {
      vals = {};
    }
    this.setValues = vals;
    let def = data.player.default;
    for (let v = 0; v < def.keys().length; v++) {
      if (vals[def.keys()[v]] == undefined) {
        this[def.keys()[v]] = def.values()[v];
      } else {
        this[def.keys()[v]] = vals[def.keys()[v]];
      }
    }
    this.w = data.player.w * this.size;
    this.h = data.player.h * this.size;
    this.img = new Image();
    this.pose = "idle";
  }
}
Game.Scene = class {
  constructor (vals) {
    if (!vals || vals.constructor != Object || vals.keys().length <= 0) {
      vals = {};
    }
    this.setValues = vals;
    let def = data.scene.default;
    for (let v = 0; v < def.keys().length; v++) {
      if (vals[def.keys()[v]] == undefined) {
        this[def.keys()[v]] = def.values()[v];
      } else {
        this[def.keys()[v]] = vals[def.keys()[v]];
      }
    }
  }
}