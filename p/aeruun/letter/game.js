var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");
if (F.url.query.str) {
  doc.id("input").value = decodeURI(F.url.query.str);
}

var codes = {
  i: "400",
  ee: "401",
  u: "402",
  uu: "403",
  e: "404",
  er: "405",
  oh: "406",
  or: "407",
  a: "408",
  uh: "409",
  o: "40A",
  ar: "40B",
  ae: "40F",
  ay: "40C",
  iy: "40E",
  oy: "40D",
  ir: "410",
  ua: "411",
  oa: "412",
  ou: "413",
  p: "414",
  b: "415",
  f: "416",
  v: "417",
  th: "418",
  dh: "419",
  t: "41A",
  d: "41B",
  s: "41C",
  z: "41D",
  sh: "41E",
  zh: "41F",
  q: "420",
  j: "421",
  k: "422",
  g: "423",
  m: "424",
  n: "425",
  ng: "426",
  h: "427",
  w: "428",
  l: "429",
  r: "42A",
  y: "42B",
  0: "42C",
  1: "42D",
  2: "42E",
  3: "42F",
  4: "430",
  5: "431",
  6: "432",
  7: "433",
  8: "434",
  9: "435",
  10: "436",
  11: "437",
  12: "438",
  13: "439",
  14: "43A",
  15: "43B",
  " ": "43C",
  ".": "43D",
  ",": "43E",
  "!": "43F",
  "?": "440",
  "!?": "441",
  ":": "442",
  "(": "443",
  ")": "444",
  "\"(": "445",
  "\")": "446",
  "-": "447",
  "...": "448",
};
var gameState = "start";

function reset() {

  gameState = "play";
}

function render() {
  ctx.fillCanvas(F.getColor(210));

  letters = doc.id("input").value.lower();
  letters = letters.replaceAll("\n", " ");
  if (letters.s(0) == " ") {
    letters = letters.s(1, -1);
  }
  w = 50;
  margin = 5;
  padding = 5;
  lineMax = 10;
  if (letters && letters.length > 0) {
    letters = letters.split(" ");

    for (i = 0; i < letters.length; i++) {
      letters[i] = letters[i].replaceAll("_", " ");
    }
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    for (d = 0; d < letters.length; d++) {
      letter = letters[d];
      if (!letter && letter != 0) {
        continue;
      }
      x = d.wrap(-1, lineMax, true);
      y = Math.floor(d / lineMax);
      if (y >= lineMax) {
        continue;
      }

      if (doc.id("bounding").checked) {
        ctx.strokeStyle = "grey";
        ctx.strokeRect(
          margin + x * w,
          margin + y * w,
          w,
          w,
        );
        ctx.strokeStyle = "black";
      }

      drawLetter(letter);
    }
  }
}

function main() {
  render();
  then = Date.now();
  requestAnimationFrame(main);
}

var then = Date.now();
reset();
main();

function copy() {
  F.copy(doc.id("output").innerHTML);
}

function change() {
  letters = doc.id("input").value.lower();
  letters = letters.replaceAll("\n", " ");
  if (letters.s(0) == " ") {
    letters = letters.s(1, -1);
  }
  doc.id("output").innerHTML = "";
  doc.id("num-alert").style.display = "none";
  if (letters && letters.length > 0) {
    letters = letters.split(" ");

    for (i = 0; i < letters.length; i++) {
      letters[i] = letters[i].replaceAll("_", " ");

      if (parseInt(letters[i])) {
        doc.id("num-alert").style.display = "block";
      }
    }

    trls = [];
    for (i = 0; i < letters.length; i++) {
      if (letters[i]) {
        trls.push(codes[letters[i]] ? "&#x" + codes[letters[i]] + ";" : "?");
      }
    }
    doc.id("output").innerHTML = trls.join("");
  }
}
change();

keyboard = {};
keyboard.init = function () {
  row = 8;
  keys = codes.keys();
  for (y = 0; y < keys.length / 8; y++) {
    el = [
      '<div class="row">',
    ].join("");
    for (x = 0; x < 8; x++) {
      name = keys[y * 8 + x];
      symbol = codes[keys[y * 8 + x]];
      if (!name || name == "undefined") {
        continue;
      }
      name = name == " " ? "_" : name;
      el += [
        '<button class="key" name="{name}" onclick="keyboard.click(this)" title="Insert \'{name}\'">',
        '  <h1 class="font">&#x{symbol}</h1>',
        '  <h2>{name}</h2>',
        '</button>',
      ].join("").format({
        symbol,
        name,
      });
    }
    doc.id("keyboard").innerHTML += el + '</div>';
  }
}
keyboard.init();

keyboard.click = function (el) {
  doc.id("input").innerHTML += " " + el.name;
  change();
}
keyboard.backspace = function () {
  doc.id("input").innerHTML = doc.id("input").innerHTML.split(" ").s(0, -2).join(" ");
  change();
}
keyboard.clear = function () {
  doc.id("input").innerHTML = "";
  change();
}