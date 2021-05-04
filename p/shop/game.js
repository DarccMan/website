var canvas = doc.createElement("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var cam = {};
var items = [];
var spots = [];
var shop = "test";
var selectedPlace = null;
var newLine = null;
var path = [];
var vals = {};

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}

function addItem(item) {
  if (!item) {
    item = doc.id("item").value;
  }
  item = item.lower();
  if (!data.items.keys().includes(item)) {
    createItem();
  } else {
    if (item.replaceAll(" ", "")) {
      if (!items.includes(item)) {
        items.push(item);
      }
    }
  }
  updateItems();
  changeAvailable();
}
function updateItems() {
  doc.id("items").innerHTML = "";
  spots = [];
  for (i = 0; i < items.length; i++) {
    place = "unknown";
    if (data.items[items[i]] && data.items[items[i]].place) {
      place = data.items[items[i]].place;
    }
    el = [
      '<li value="{id}"><button onclick="removeItem(this)" class="fa fa-trash"></button> {name} <i>{place}</i></li>'
    ].join("").format({
      id: items[i].lower(),
      name: items[i].capWords(),
      place: place.capWords(),
    });
    doc.id("items").innerHTML += el;
    doc.id("item").value = "";
    if (place && place != "unknown") {
      bl = data.shops[shop].map.types[data.items[items[i]].place];
      if (bl) {
        spots.push({
          name: items[i],
          x: fl.x + (bl.x + (bl.w / 2)),
          y: fl.y + (bl.y + (bl.h / 2)),
          w: 10,
          h: 10,
        });
      }
    }
  }
}
function changeAvailable() {
  doc.id("available_items").innerHTML = "";
  let item = doc.id("item").value.lower();
  if (!(item && item.replaceAll(" ", ""))) {
    item = null;
  }
  let els = [];
  for (e = 0; e < data.items.keys().length; e++) {
    if (item && !data.items.keys()[e].replaceAll(" ", "").startsWith(item.replaceAll(" ", ""))) {
      continue;
    }
    if (items.includes(data.items.keys()[e])) {
      continue;
    }
    els.push([
      '<li><button onclick="addItem(\'{name}\')" class="fa fa-cart-plus"></button>{name}</li>',
    ].join("").format({
      name: data.items.keys()[e].capWords(),
    }));
  }
  if (item) {
    if (!data.items.keys().includes(item)) {
      els.push([
        '<li><button onclick="createItem()" class="fa fa-plus-square"></button>{name}</li>',
      ].join("").format({
        name: item.capWords(),
      }));
    }
  }
  doc.id("available_items").innerHTML = els.join("");
}
function addItemFromInput() {
  let item = doc.id("item").value;
  addItem(item);
}
function createItem() {
  let item = doc.id("item").value.lower();
  if (item && item.replaceAll(" ", "")) {
    if (!data.items.keys().includes(item)) {
      data.items[item] = {
        place: undefined,
      };
      addItem(item);
    }
  }
  changeAvailable();
}
function removeItem(el) {
  item = el.parentNode.getAttribute("value");
  items.remove(item);
  updateItems();
  changeAvailable();
}
function itemInit() {
  for (i = 0; i < data.items.keys().length; i++) {
    addItem(data.items.keys()[i].capWords());
  }
}

function resetCam() {
  cam = {
    x: 0,
    y: 0,
    z: 100,
  };
  doc.id("x").value = cam.x;
  doc.id("y").value = cam.y;
  doc.id("z").value = cam.z;
}

function plotPath() {
  if (gameState == "play") {
    fl = data.shops[shop].map.floor;
    path = [
      {
        x: data.shops[shop].map.in.x + fl.x + (data.map.inOutSize / 2),
        y: data.shops[shop].map.in.y + fl.y + (data.map.inOutSize / 2),
      }
    ];
  }
  gameState = (gameState == "plot" ? "play" : "plot");
  doc.id("plot_button").innerHTML = (gameState == "plot" ? "Stop Plotting" : "Plot Path");
  return;

  path = [];
  fl = data.shops[shop].map.floor;
  cp = {
    x: data.shops[shop].map.in.x + fl.x,
    y: data.shops[shop].map.in.y + fl.y,
  };
  places = [
    cp,
  ];
  for (i = 0; i < spots.length; i++) {
    val = true;
    for (k = 0; k < places.length; k++) {
      if (places[k].name == data.items[spots[i].name].place) {
        val = false;
      }
    }
    if (val) {
      places.push({
        name: data.items[spots[i].name].place,
        x: spots[i].x,
        y: spots[i].y,
      });
    }
  }
  left = Array.from(places);
  for (l = 0; l < places.length; l++) {
    closest = {
      v: Infinity,
      n: null,
    };
    for (i = 0; i < left.length; i++) {
      d = (
        (F.diff(cp.x, left[i].x) ** 2) +
        (F.diff(cp.y, left[i].y) ** 2)
      ) ** 0.5;
      if (d < closest.v) {
        closest = {
          v: d,
          n: left[i],
        };
      }
    }
    // console.log(closest.n);
    // console.log(left[closest.n]);
    path.push({
      x: closest.n.x,
      y: closest.n.y,
    });

    console.log(left);
    for (i = 0; i < left.length; i++) {
      if (left[i] == closest.n) {
        left.splice(i, 1);
      }
    }
    console.log(left);
    // left.remove(left[closest.n]);
  }
}

var then = Date.now();
reset();
main();
F.triggerOnload();