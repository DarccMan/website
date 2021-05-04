var canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.width = data.canvas.w;
canvas.height = data.canvas.h;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

window.onerror = function () {
  if (false) {
    alert("Uh oh! There is an error I think!");
  }
}

var blocks = {};
var player = {
  x: 0,
  y: 0,
  w: data.player.w,
  h: data.player.h,
  speed: data.player.speed,
  dir: null,
};
var cursor = {};
var godMode = false;
var entities = []
var cWorld = null;

function reset() {
  godMode = false;
  world_gen();
  player_spawn();
  player_hotbar_reset();
  player.reach = data.reach;
}
function world_reset() {
  if (true || confirm("Create new world?\nThe current one will not be saved!")) {
    reset();
  }
}
function world_load() {
  world = doc.id("world_select").value;
  if (![null, undefined, "", "current"].includes(world)) {
    if (F.getSelectedOption("world_select").getAttribute("demo") == "false") {
      if (confirm("Load '{name}'?\nThe current one will not be saved!".format({
        name: ls().worlds.getFromId(world).name,
      }))) {
        world_import(ls().worlds.getFromId(world).data);
      }
    } else {
      if (confirm("Load demo world '{name}'?\nThe current one will not be saved!".format({
        name: worlds_demo.getFromId(world).name,
      }))) {
        world_import(worlds_demo.getFromId(world).data);
      }
    }
    cWorld = world;
  } else {
    alert("No saved world selected!");
  }
}
function world_saveAs() {
  name = prompt("Name?", "New World");
  id = name.toLowerCase().replaceAll(" ", "_");
  if (![null, undefined, "", "null"].includes(name)) {
    if (id.length > 50) {
      id = id.s(0, 20);
    }
    id = [
      id,
      0,
    ];
    for (i2 = 0; i2 < ls().worlds.length; i2++) {
      if (ls().worlds[i2].id.split("_").s(-2) == id[0]) {
        id[1]++;
      }
    }
    if (id[1] > 0) {
      name = "{0} {1}".format(name, (id[1] + 1));
    }
    id = id.join("_");
    ls_edit((d) => {
      d.worlds.push({
        id: id,
        name: name,
        data: world_getData(),
      });
    });
    init();
  }
}
function world_save() {
  if ([null, undefined, "", "null"].includes(cWorld)) {
    world_saveAs();
  }
  if (![null, undefined, "", "null"].includes(cWorld)) {
    if (confirm("Are you sure you want to override saved data for '{world}'?".format({
      world: ls().worlds.getFromId(cWorld).name,
    }))) {
      ls_edit((d) => {
        d.worlds.getFromId(cWorld).data = world_getData();
      });
      init();
    }
  }
}
function world_delete() {
  if (F.getSelectedOption("world_select").getAttribute("demo") == "false") {
    if (ls().worlds.getIndexFromId(cWorld) >= 0) {
      if (confirm("Are you sure you want to delete '{name}'?\nThis action cannot be undone!".format({
        name: ls().worlds.getFromId(cWorld).name,
      }))) {
        console.log(ls().worlds.getIndexFromId(cWorld));
        ls_edit((d) => {
          d.worlds.remove(ls().worlds.getFromId(cWorld));
        });
        cWorld = null;
        init();
      }
    } else {
      alert("No saved world selected!");
    }
  } else {
    alert("Cannot delete demo world!");
  }
}
function ls_edit(func) {
  var d = ls();
  func(d);
  F.ls("minecraft.all", JSON.stringify(d));
};
function ls() {
  return (JSON.parse(F.ls("minecraft.all")));
};
function ls_reset() {
  F.ls("minecraft.all", JSON.stringify(
    {
      worlds: [],
    }
  ));
}
function init() {
  world = doc.id("world_select").value;
  doc.id("world_select").removeChildren();
  el = [
    '<option value="current" demo="false">Current</option>'
  ].join("");
  $("#world_select").append(el);
  if ([null, undefined, "", {}].includes(ls())) {
    ls_reset();
  }
  worlds = ls().worlds;
  for (i = 0; i < worlds.length; i++) {
    selected = "";
    if (world == worlds[i].id) {
      selected = "selected";
    }
    el = [
      '<option value="{id}" {selected} demo="false">{name}</option>'
    ].join("").format({
      id: worlds[i].id,
      name: worlds[i].name,
      selected: selected,
    });
    $("#world_select").append(el);
  }
  for (i = 0; i < worlds_demo.length; i++) {
    selected = "";
    el = [
      '<option value="{id}" demo="true">[Demo]: {name}</option>'
    ].join("").format({
      id: worlds_demo[i].id,
      name: worlds_demo[i].name,
    });
    $("#world_select").append(el);
  }
}
function world_gen() {
  for (i = 0; i < data.canvas.x; i++) {
    blocks[i] = {};
    for (i2 = 0; i2 < data.canvas.y; i2++) {
      types = [];
      for (i3 = 0; i3 < data.blocks.types.length; i3++) {
        for (i4 = 0; i4 < data.blocks.types[i3].weight; i4++) {
          types.push(data.blocks.types[i3].id);
        }
      }
      switch (doc.id("world_type").value) {
        case ("grass"): {
          type = "grass";
        }; break;
        case ("stripe"): {
          type = "grass";
          if (i % 3 == 1) {
            type = "dirt";
          }
          if ((i + 1) % 3 == 0) {
            type = "wood";
          }
        }; break;
        case ("checker_b"): {
          type = "dirt";
          if (((i) % 2 == 0) && ((i2 + 1) % 2 == 0)) {
            type = "wood";
          }
          if (((i + 1) % 2 == 0) && ((i2) % 2 == 0)) {
            type = "wood";
          }
        }; break;
        case ("checker_w"): {
          type = "black_concrete";
          if (((i) % 2 == 0) && ((i2 + 1) % 2 == 0)) {
            type = "white_concrete";
          }
          if (((i + 1) % 2 == 0) && ((i2) % 2 == 0)) {
            type = "white_concrete";
          }
        }; break;
        case ("white"): {
          type = "white_concrete";
        }; break;
        case ("black"): {
          type = "black_concrete";
        }; break;
        case ("gray"): {
          type = "black_concrete";
          if (((i) % 3 == 0) && ((i2 + 1) % 3 == 0)) {
            type = "white_concrete";
          }
          if (((i + 1) % 3 == 0) && ((i2) % 3 == 0)) {
            type = "white_concrete";
          }
          if (((i + 2) % 3 == 0) && ((i2 - 1) % 3 == 0)) {
            type = "white_concrete";
          }
          if (((i) % 3 == 0) && ((i2 + 2) % 3 == 0)) {
            type = "stone";
          }
          if (((i + 1) % 3 == 0) && ((i2 + 4) % 3 == 0)) {
            type = "stone";
          }
          if (((i + 2) % 3 == 0) && ((i2 + 6) % 3 == 0)) {
            type = "stone";
          }
        }; break;
        default: {
          type = F.randomChoice(types);
        }
      }
      blocks[i][i2] = {
        type: type,
      };
    }
  }
  for (i = 0; i < data.blocks.types.length; i++) {
    if ([null, undefined, ""].includes(data.blocks.types[i].attr)) {
      data.blocks.types[i].attr = {};
    }
    for (i2 = 0; i2 < data.blocks.attributes.keys().length; i2++) {
      if ([null, undefined, ""].includes(data.blocks.types[i].attr[data.blocks.attributes.keys()[i2]])) {
        data.blocks.types[i].attr[data.blocks.attributes.keys()[i2]] = data.blocks.attributes.values()[i2];
      }
    }
  }
  for (i = 0; i < data.entities.types.length; i++) {
    if ([null, undefined, ""].includes(data.entities.types[i].attr)) {
      data.entities.types[i].attr = {};
    }
    for (i2 = 0; i2 < data.entities.attributes.keys().length; i2++) {
      if ([null, undefined, ""].includes(data.entities.types[i].attr[data.entities.attributes.keys()[i2]])) {
        data.entities.types[i].attr[data.entities.attributes.keys()[i2]] = data.entities.attributes.values()[i2];
      }
    }
  }
  setTimeout(() => {
    var entitySpawn = setInterval(entity_spawn, data.entities.spawn_interval);
  }, data.entities.spawn_timeout);
  player.hotbar_timeout = data.player.hotbar.timeout;
}
function player_spawn() {
  loop1: for (i2 = 0; i2 < blocks.keys().length; i2++) {
    for (i3 = 0; i3 < blocks[i2].keys().length; i3++) {
      if (
        data.blocks.types.getFromId(blocks[i2][i3].type).attr["spawnable"] &&
        data.blocks.types.getFromId(blocks[i2][i3].type).attr["walkable"] &&
        !data.blocks.types.getFromId(blocks[i2][i3].type).attr["death"]
      ) {
        player.x = i2;
        player.y = i3;
        break loop1;
      }
    }
  }
  player.dir = "up";
}
function player_hotbar_reset() {
  player.hotbar = {
    items: [],
  };
  for (i = 0; i < data.player.hotbar.slot_amount; i++) {
    if (![null, undefined, ""].includes(data.blocks.types[i])) {
      player.hotbar.items.push({
        type: data.blocks.types[i].id,
        amount: data.blocks.types[i].attr["stack_size"],
        selected: false,
      });
    } else {
      player.hotbar.items.push({
        type: "air",
        selected: false,
      });
    }
  }
  player.hotbar.items[0].selected = true;
  cursor = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    down: false,
  }
}

function entity_spawn() {
  if (settings.mobSpawn) {
    if (entities.length < data.entities.cap) {
      type = F.randomChoice(data.entities.types).id;
      x = F.randInt(0, data.canvas.x);
      y = F.randInt(0, data.canvas.y);
      entities.push({
        type: type,
        x: x,
        y: y,
      });
    }
  }
}

F.triggerOnload();
var settings = {};
function settings_toggle() {
  if (doc.id("settings").style.display == "none") {
    doc.id("settings").style.display = "block";
    doc.id("settings_btn_text").innerHTML = "Hide Settings";
  } else {
    doc.id("settings").style.display = "none";
    doc.id("settings_btn_text").innerHTML = "Show Settings";
  }
}
function settings_change() {
  for (i = 0; i < doc.id("settings").childNodes.length; i++) {
    if (doc.id("settings").childNodes[i].className == "input") {
      settings[doc.id("settings").childNodes[i].id.split("settings_")[1]] = (doc.id("settings").childNodes[i].checked);
    }
  }
  console.log(settings);
}

function render() {
  ctx.fillCanvas("rgba(60, 60, 60)");
  for (i3 = 0; i3 < data.canvas.x; i3++) {
    for (i2 = 0; i2 < data.canvas.y; i2++) {
      if (![null, undefined, "", {}].includes(blocks[i3][i2])) {
        ctx.fillStyle = "rgba({0}, {1}, {2})".format(data.blocks.types.getFromId(blocks[i3][i2].type).color.addAll(0));
        ctx.strokeStyle = "rgba({0}, {1}, {2})".format(data.blocks.types.getFromId(blocks[i3][i2].type).color.addAll(-20));
        ctx.lineWidth = "2";
        ctx.fillRect(
          i3 * (canvas.width / data.canvas.x),
          i2 * (canvas.height / data.canvas.y),
          (canvas.width / data.canvas.x),
          (canvas.height / data.canvas.y),
        );
        ctx.strokeRect(
          (i3 * (canvas.width / data.canvas.x)),
          (i2 * (canvas.height / data.canvas.y)),
          (canvas.width / data.canvas.x) - ctx.lineWidth,
          (canvas.height / data.canvas.y) - ctx.lineWidth,
        );
      }
    }
  }
  for (i3 = 0; i3 < entities.length; i3++) {
    if (![null, undefined, "", {}].includes(entities[i3])) {
      ctx.fillStyle = "rgba({0}, {1}, {2})".format(data.entities.types.getFromId(entities[i3].type).color.addAll(0));
      ctx.strokeStyle = "rgba({0}, {1}, {2})".format(data.entities.types.getFromId(entities[i3].type).color.addAll(-20));
      ctx.lineWidth = "2";
      ctx.fillRect(
        entities[i3].x * (canvas.width / data.canvas.x) + (((canvas.width / data.canvas.x) - data.entities.w) / 2),
        entities[i3].y * (canvas.height / data.canvas.y) + (((canvas.height / data.canvas.y) - data.entities.h) / 2),
        data.entities.w,
        data.entities.h,
      );
      /* ctx.strokeRect(
        (i3 * (canvas.width / data.canvas.x)),
        (i2 * (canvas.height / data.canvas.y)),
        (canvas.width / data.canvas.x) - ctx.lineWidth,
        (canvas.height / data.canvas.y) - ctx.lineWidth,
      ); */
    }
  }
  ctx.fillStyle = "rgba({0}, {1}, {2})".format(data.player.color);
  ctx.fillRect(
    (player.x * (canvas.width / data.canvas.x)) + (((canvas.width / data.canvas.x) - player.w) / 2),
    (player.y * (canvas.height / data.canvas.y)) + (((canvas.height / data.canvas.y) - player.h) / 2),
    player.w,
    player.h,
  );
  ctx.fillStyle = "rgba({0}, {1}, {2})".format(data.player.color.addAll(-100));
  c = {
    x: 0,
    y: 0,
  };
  switch (player.dir) {
    case ("up"): {
      c = {
        x: (player.w / 2) - ((player.w / 2) / 2),
        y: 0,
      }
    }; break;
    case ("down"): {
      c = {
        x: (player.w / 2) - ((player.w / 2) / 2),
        y: player.h - ((player.w / 2)),
      }
    }; break;
    case ("left"): {
      c = {
        x: 0,
        y: (player.h / 2) - ((player.h / 2) / 2),
      }
    }; break;
    case ("right"): {
      c = {
        x: player.w - ((player.w / 2)),
        y: (player.h / 2) - ((player.h / 2) / 2),
      }
    }; break;
  }
  ctx.fillRect(
    (player.x * (canvas.width / data.canvas.x)) + (((canvas.width / data.canvas.x) - player.w) / 2) + c.x,
    (player.y * (canvas.height / data.canvas.y)) + (((canvas.height / data.canvas.y) - player.h) / 2) + c.y,
    player.w / 2,
    player.h / 2,
  );


  ctx.fillStyle = "rgba({0}, {1}, {2}, {3})".format(data.player.hotbar.bg_color);
  ctx.fillRect(
    (canvas.width / 2) - ((data.player.hotbar.slot_amount * data.player.hotbar.slot_w) / 2),
    (canvas.width - data.player.hotbar.bottom) - data.player.hotbar.slot_w,
    (data.player.hotbar.slot_amount * data.player.hotbar.slot_w),
    data.player.hotbar.slot_w,
  );
  ctx.strokeStyle = "rgba({0}, {1}, {2}, {3})".format(data.player.hotbar.slot_color);
  ctx.lineWidth = data.player.hotbar.slot_thickness;
  for (i = 0; i < data.player.hotbar.slot_amount; i++) {
    ctx.strokeRect(
      (canvas.width / 2) - ((data.player.hotbar.slot_amount * data.player.hotbar.slot_w) / 2) + (i * (data.player.hotbar.slot_w)),
      (canvas.width - data.player.hotbar.bottom) - data.player.hotbar.slot_w,
      data.player.hotbar.slot_w,
      data.player.hotbar.slot_w,
    );
  }

  ctx.strokeStyle = "rgba({0}, {1}, {2}, {3})".format(data.player.hotbar.selected_color);
  ctx.lineWidth = data.player.hotbar.selected_thickness;
  ctx.strokeRect(
    (canvas.width / 2) - ((data.player.hotbar.slot_amount * data.player.hotbar.slot_w) / 2) + (player.hotbar.items.indexOf(player.hotbar.items.getFromId(true, "selected")) * (data.player.hotbar.slot_w)),
    (canvas.width - data.player.hotbar.bottom) - data.player.hotbar.slot_w,
    data.player.hotbar.slot_w,
    data.player.hotbar.slot_w,
  );
  for (i2 = 0; i2 < player.hotbar.items.length; i2++) {
    type = (player.hotbar.items[i2].type);
    if (![null, undefined, "", "air"].includes(type)) {
      ctx.fillStyle = "rgba({0}, {1}, {2}, {3})".format(data.blocks.types.getFromId(type).color);
      ctx.fillRect(
        (canvas.width / 2) - ((data.player.hotbar.slot_amount * data.player.hotbar.slot_w) / 2) + (i2 * (data.player.hotbar.slot_w)) + ((data.player.hotbar.slot_w * (data.player.hotbar.block_w / 100)) / 3),
        (canvas.width - data.player.hotbar.bottom) - data.player.hotbar.slot_w + ((data.player.hotbar.slot_w * (data.player.hotbar.block_w / 100)) / 3),
        data.player.hotbar.slot_w * (data.player.hotbar.block_w / 100),
        data.player.hotbar.slot_w * (data.player.hotbar.block_w / 100),
      );
      ctx.strokeStyle = "rgba({0}, {1}, {2})".format(data.blocks.types.getFromId(type).color.addAll(-20));
      ctx.lineWidth = "2"
      ctx.strokeRect(
        (canvas.width / 2) - ((data.player.hotbar.slot_amount * data.player.hotbar.slot_w) / 2) + (i2 * (data.player.hotbar.slot_w)) + ((data.player.hotbar.slot_w * (data.player.hotbar.block_w / 100)) / 3),
        (canvas.width - data.player.hotbar.bottom) - data.player.hotbar.slot_w + ((data.player.hotbar.slot_w * (data.player.hotbar.block_w / 100)) / 3),
        data.player.hotbar.slot_w * (data.player.hotbar.block_w / 100),
        data.player.hotbar.slot_w * (data.player.hotbar.block_w / 100),
      );
    }
  }


  if (F.mouse.onCanvas) {
    ctx.fillStyle = "rgba({0}, {1}, {2}, {3})".format(data.cursor.color);
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
}

function main() {
  var now = Date.now();
  var delta = now - then;
  render();
  update(delta / 1000);
  then = now;
  requestAnimationFrame(main);
}

var move = {};
move.val = true;
konVal = false;
function update(mod) {
  if (F.mouse.onCanvas) {
    cursor.x = (F.mouse.x - data.cursor.offsetX)/*  - cursor.x */;
    cursor.y = (F.mouse.y - data.cursor.offsetY)/*  - cursor.y */;
  }
  keysDown = F.getKeyCodes(controls);
  move.ifVal = function (func) {
    if (move.val) {
      func();
      move.val = false;
      setTimeout(() => {
        move.val = true;
      }, player.speed);
    }
  }
  move.up = function () {
    player.dir = "up";
    move.ifVal(() => {
      a = player.y - 1;
      if ((a) < 0) {
        a = blocks[player.x].keys().length - 1;
      }
      if (data.blocks.types.getFromId(blocks[player.x][a].type).attr["walkable"]) {
        player.y--;
      }
    });
  }
  move.down = function () {
    player.dir = "down";
    move.ifVal(() => {
      a = player.y + 1;
      if ((a) >= blocks[player.x].keys().length) {
        a = 0;
      }
      if (data.blocks.types.getFromId(blocks[player.x][a].type).attr["walkable"]) {
        player.y++;
      }
    });
  }
  move.left = function () {
    player.dir = "left";
    move.ifVal(() => {
      a = player.x - 1;
      if ((a) < 0) {
        a = blocks.keys().length - 1;
      }
      if (data.blocks.types.getFromId(blocks[a][player.y].type).attr["walkable"]) {
        player.x--;
      }
    });
  }
  move.right = function () {
    player.dir = "right";
    move.ifVal(() => {
      a = player.x + 1;
      if ((a) >= blocks.keys().length) {
        a = 0;
      }
      if (data.blocks.types.getFromId(blocks[a][player.y].type).attr["walkable"]) {
        player.x++;
      }
      // cursor.x += (canvas.width / data.canvas.x);
    });
  }
  if (!(keysDown.includes("player_up") && keysDown.includes("player_down"))) {
    if (keysDown.includes("player_up")) {
      move.up();
    } else if (keysDown.includes("player_down")) {
      move.down();
    }
  }
  if (!(keysDown.includes("player_left") && keysDown.includes("player_right"))) {
    if (keysDown.includes("player_left")) {
      move.left();
    } else if (keysDown.includes("player_right")) {
      move.right();
    }
  }
  if (keysDown.includes("player_random")) {
    player_random();
  }

  player_loop();
  player_checkBlock();
  if (keysDown.includes("debug_mainKey")) {
    if (F.buttonDown(0)) {
      // if (F.mouse.onCanvas) {
      player.x = Math.round(cursor.x / (canvas.width / data.canvas.x) - 0.5);
      player.y = Math.round(cursor.y / (canvas.height / data.canvas.y) - 0.5);
      // }
    }
  }
  player_loop();

  for (i = 0; i < data.player.hotbar.slot_amount; i++) {
    if (i <= 9) {
      F.val("scroll_change_n{0}".format(i), (F.keyDown(49 + i)), () => {
        player_select(i);
      });
    }
  }

  if (!keysDown.includes("debug_mainKey")) {
    if (keysDown.includes("block_place")) {
      point = {
        x: (Math.abs(F.setBorder(Math.round((cursor.x / (canvas.width / data.canvas.x)) - 0.5), 0, 15))),
        y: (Math.abs(F.setBorder(Math.round((cursor.y / (canvas.height / data.canvas.y)) - 0.5), 0, 15))),
      };
      // console.log(player_inReach(point.x, point.y));
      if (player_inReach(point.x, point.y)) {
        player_block_place(point.x, point.y);
      }
    }
  }
  if (keysDown.includes("player_drop")) {
    player.hotbar.items.getFromId(true, "selected").type = "air";
  }
  if (keysDown.includes("block_pick")) {
    point = {
      x: (Math.abs(F.setBorder(Math.round((cursor.x / (canvas.width / data.canvas.x)) - 0.5), 0, 15))),
      y: (Math.abs(F.setBorder(Math.round((cursor.y / (canvas.height / data.canvas.y)) - 0.5), 0, 15))),
    };
    if (player_inReach(point.x, point.y)) {
      player_block_pick(point.x, point.y);
    }
  }
  if (data.blocks.types.getFromId(blocks[player.x][player.y].type).attr["death"]) {
    player_death();
  }
  if (F.keySeq.slice(Math.max(F.keySeq.length - 10, 1)).join(",") == "38,38,40,40,37,39,37,39,66,65") {
    if (konVal == true) {
      konVal = false;
      console.log(F.keySeq.slice(Math.max(F.keySeq.length - 10, 1)).join(""));
      godMode = true;
    }
  } else {
    konVal = true;
  }
  if (godMode) {
    player.reach = Infinity;
    if (keysDown.includes("cheat_speed")) {
      player.speed = data.player.speed / 5;
    } else {
      player.speed = data.player.speed;
    }
  } else {
    player.reach = data.player.reach;
  }
}
addEventListener("mousewheel", function (e) {
  selected = 0;
  for (i2 = 0; i2 < player.hotbar.items.length; i2++) {
    if (player.hotbar.items[i2].selected) {
      selected = i2
    }
    player.hotbar.items[i2].selected = false;
  }
  if (e.deltaY > 0) {
    selected++;
  } else if (e.deltaY < 0) {
    selected--;
  }
  if (selected < 0) {
    selected += player.hotbar.items.length;
  } else if (selected >= player.hotbar.items.length) {
    selected -= player.hotbar.items.length;
  }
  player_select(selected);
}, false);

function player_loop() {
  while (player.x >= blocks.keys().length) {
    player.x -= blocks.keys().length;
  }
  while (player.x < 0) {
    player.x += blocks.keys().length;
  }
  while (player.y >= blocks[0].keys().length) {
    player.y -= blocks[0].keys().length;
  }
  while (player.y < 0) {
    player.y += blocks[0].keys().length;
  }
}
function player_checkBlock() {
  if (![null, undefined, ""].includes(blocks[player.x][player.y])) {
    // Prone to crashing - in future switch to smarter method
    while (!data.blocks.types.getFromId(blocks[player.x][player.y].type).attr["walkable"]) {
      player.y--;
      player_loop();
    }
  }
}
function player_block_place(x, y) {
  if (settings.placeBlockUnder || (!(x == player.x && y == player.y))) {
    if (![null, undefined, "", "air"].includes(player_hotbar_selected())) {
      blocks[x][y].type = player_hotbar_selected();
    }
  }
}
function player_block_pick(x, y) {
  b = blocks[x][y].type;
  val = true
  for (i = 0; i < player.hotbar.items.length; i++) {
    if (player.hotbar.items[i].type == b) {
      val = false;
    }
  }
  if (val) {
    slot = null;
    for (i = 0; i < player.hotbar.items.length; i++) {
      if ([null, undefined, "", "air"].includes(player.hotbar.items[i].type)) {
        slot = i;
        break;
      }
    }
    if (![null, undefined, ""].includes(slot)) {
      player.hotbar.items[slot].type = b;
    } else {
      player_hotbar_selected().type = b;
    }
  }
}
function player_inReach(x, y) {
  return (
    F.diff(player.x, x) + F.diff(player.y, y) < player.reach ||
    F.diff(player.x, (data.canvas.x - x)) + F.diff(player.y, y) < player.reach ||
    F.diff(player.x, x) + F.diff(player.y, (data.canvas.y - y)) < player.reach ||
    F.diff(player.x, (data.canvas.x - x)) + F.diff(player.y, (data.canvas.y - y)) < player.reach
  );
}
function player_hotbar_selected() {
  return (player.hotbar.items.getFromId(true, "selected").type);
}
function player_select(num) {
  for (i2 = 0; i2 < player.hotbar.items.length; i2++) {
    player.hotbar.items[i2].selected = false;
  }
  player.hotbar.items[num].selected = true;
}
function player_random() {
  player_select(F.randInt(-1, player.hotbar.items.length - 1));
  player_block_place(
    Math.abs(F.setBorder(
      F.randInt(
        (player.x - player.reach),
        (player.x + player.reach),
      ), 0, data.canvas.x - 1,
    )),
    Math.abs(F.setBorder(
      F.randInt(
        (player.y - player.reach),
        (player.y + player.reach),
      ), 0, data.canvas.y - 1,
    )),
  );
  for (i = 0; i < F.randInt(1, 3); i++) {
    move[F.randomChoice(["up", "down", "left", "right"])]();
  }
}
function player_death() {
  player_spawn();
}


function world_getData() {
  dt = {};
  dt.blocks = blocks;
  dt.player = player;
  return (dt);
}
function world_export() {
  dt = world_getData();
  console.log(dt);
  F.copy(JSON.stringify(dt));
}
function world_import(dt) {
  if ([null, undefined, ""].includes(dt)) {
    dt = prompt("Paste world data here", "Example: {0}...".format(JSON.stringify(world_getData()).s(0, 50)))
  }
  if (dt.constructor == String) {
    dt = JSON.parse(dt);
  }
  blocks = dt.blocks;
  player = dt.player;
}

var then = Date.now();
reset();
main();