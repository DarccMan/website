var calc = (t) => t.setBorder(1, Infinity);
var minTime = 1000;
var maxTime = 3000;
var lastAmount = 5;
var cooldown = 200;
var stopper = null;
var then = null;
var avs = [];
var earlies = 0;
var hs = Infinity;
var hack = false;
var lastClick = 0;
var vals = {};

var audio = {
  names: {
    early: ["fart"],
    next: ["ding"],
  },
  files: {},
};

audio.init = function () {
  for (i = 0; i < audio.names.keys().length; i++) {
    for (j = 0; j < audio.names.values()[i].length; j++) {
      new F.Sound("audio/{0}.mp3".format(audio.names.values()[i][j]), "audio_contain");
    }
  }
}
audio.init();

var els = {
  start: [
    '<h1>Test your Reaction Time</h1>',
    '<h2>Click or press space to continue...</h2>',
  ],
  wait: [
    '<h1>Wait...</h1>',
    '<h2>Click when it turns Green</h2>',
  ],
  early: [
    '<h1>Too early!</h1>',
    '<h2>Click or press space to continue...</h2>',
  ],
  go: [
    '<h1>CLICK NOW</h1>',
    '<h2>Hurry up!</h2>',
  ],
  success: [
    '<h1>{time}ms</h1>',
    '<h2>Click or press space to continue...</h2>',
    '<h3>',
    '  Total Average: {total}ms{comment}',
    '  <p></p>',
    '  Last 5 Average: {last}ms',
    '  <p></p>',
    '  High Score: {score}ms{new}',
    '  <p></p>',
    '  Amount of Earlies: {earlies}',
    '</h3>',
  ],
};

doc.id("click").innerHTML = els.start.join("").format();

function start() {
  stopper = setTimeout(stop, F.randomInt(minTime, maxTime));

  doc.id("click").setAttribute("color", "wait");
  doc.id("click").innerHTML = els.wait.join("").format();
}

async function stop() {
  if (doc.id("click").getAttribute("color") == "wait") {
    doc.id("click").setAttribute("color", "go");
    doc.id("click").innerHTML = els.go.join("").format();
    then = Date.now();
  }
}

function early() {
  doc.id("click").setAttribute("color", "early");
  doc.id("click").innerHTML = els.early.join("").format();
  clearInterval(stopper);
  earlies++;
}

function success() {
  doc.id("click").getAttribute("color");
  time = hack ? F.randomInt(8, 35) : calc(Date.now() - then);
  avs.push(time);
  total = 0;
  for (i = 0; i < avs.length; i++) {
    total += avs[i];
  }
  last = 0;
  for (i = 0; i < Math.min(lastAmount, avs.length); i++) {
    last += avs[avs.length - i - 1];
  }
  newHs = false;
  if (time < hs) {
    newHs = true;
    hs = time;
  }
  doc.id("click").setAttribute("color", "next");
  doc.id("click").innerHTML = els.success.join("").format({
    time,
    comment: time > 1000 ? " <a href=\"https://www.epicgames.com/store/en-US/product/fortnite/home\">(cringe)</a>" : "",
    total: (total / avs.length).round(2),
    last: (last / Math.min(lastAmount, avs.length)).round(2),
    earlies,
    score: hs,
    new: newHs ? " NEW!" : "",
  });
}

function clicked() {
  color = doc.id("click").getAttribute("color");
  if (vals.button == false || vals.key == false) {
    return;
  }
  if (
    color != "go"
    && Date.now() < lastClick + cooldown
  ) {
    return;
  }
  lastClick = Date.now();

  switch (color) {
    case ("wait"): {
      early();
    }; break;
    case ("go"): {
      success();
    }; break;
    case ("early"): {
      start();
    }; break;
    default: {
      start();
    };
  }

  color = doc.id("click").getAttribute("color");
  if (audio.names[color]) {
    (new F.Sound("audio/{0}.mp3".format(F.randomChoice(audio.names[color]))))?.play();
  }
}

onkeydown = function (e) {
  if (e.code == "Space") {
    clicked();
    vals.key = false;
  }
};
onkeyup = function (e) {
  if (e.code == "Space") {
    vals.key = true;
  }
};
onmousedown = function (e) {
  if (e.button == 0) {
    vals.button = false;
  }
};
onmouseup = function (e) {
  if (e.button == 0) {
    vals.button = true;
  }
};

function resize() {
  doc.id("click").width = window.innerWidth;
  doc.id("click").height = window.innerHeight;
}
onresize = resize;
resize();