function init() {
  loadAll();
  doc.id("hex").value = F.randomHex();
  calculate();
  // roll();
  setInterval(() => {
    changeEllipse();
  }, 300);
}

var images = {};
var old = {};

function changeEllipse() {
  text = doc.id("ellipse").innerText;
  text += ".";
  if (text.length > 3) {
    text = "";
  }
  doc.id("ellipse").innerText = text;
}

function loadAll() {
  for (i = 0; i < averages.keys().length; i++) {
    images[averages.keys()[i]] = new Image();
    images[averages.keys()[i]].src = "./blocks/{0}".format(averages.keys()[i]);
    if (i + 1 >= averages.keys().length) {
      images[averages.keys()[i]].onload = () => {
        doc.id("loading").style.display = "none";
        clearInterval(changeEllipse);
        doc.id("content").style.visibility = "visible";
      }
    }
  }
}

function calculate() {
  hex = doc.id("hex").value;
  doc.id("label").style.backgroundColor = hex;
  if (old[hex]) {
    doc.id("img").src = old[hex];
    return;
  }

  color = F.hex_rgb(hex).values();
  diff = {v: Infinity, n: null};
  for (k = 0; k < averages.keys().length; k++) {
    a = averages.values()[k];
    d =
      F.diff(a[0], color[0]) +
      F.diff(a[1], color[1]) +
      F.diff(a[2], color[2]);
    if (d < diff.v) {
      diff = {v: d, n: averages.keys()[k]};
    }
  }

  old[hex] = "./blocks/{0}".format(diff.n);
  doc.id("img").src = old[hex];
}

async function roll() {
  hex = doc.id("hex").value;
  hsv = F.hex_hsv(hex);
  start = hsv.h;
  for (h = start; h < (start + 360); h++) {
    hex = doc.id("hex").value;
    hsv = F.hex_hsv(hex);
    hsv.h = (h).wrap(0, 360);
    if (h < start && h > start - 5) {
      break;
    }
    hex = F.hsv_hex(hsv);
    doc.id("hex").value = hex;
    calculate();
    await (F.sleep(0.01));
  }
}