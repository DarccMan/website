var doFullscreen = true;
// doFullscreen = false;
function goFullscreen() {
  if (doFullscreen) {
    mf = doc.body;
    mf.webkitRequestFullscreen();
  }
}
doc.documentElement.onclick = goFullscreen;

char = 0;
var type = 1;
changeType(1);
function changeType(value) {
  if (value == 0) {
    type = value;
    doc.id("type").innerHTML = "?";
  } else {
    if (text[text.keys()[value]]) {
      type = value;
      doc.id("type").innerHTML = text.keys()[type][0].upper();
    } else {
      console.error("Does not exist");
    }
  }
}
function clear() {
  doc.id("content").innerHTML = "";
  char = 0;
}

val = true;
addEventListener("keydown", (e) => {
  if (!e.ctrlKey) {
    if (
      !e.altKey
      && e.code
      && (
        e.code.s(0) != "F"
        && e.code != "Escape"
      )
    ) {
      goFullscreen();
      if (text.keys()[type] == "_") {
        key = e.shiftKey ? e.key.upper() : e.key;
        if (key.lower() == "spacekey") {
          key = " ";
        }
        if (key.lower() == "enter") {
          key = "<br>";
        }
        if (key.lower() != "shift") {
          if (key.lower() == "backspace") {
            doc.id("content").innerHTML = doc.id("content").innerHTML.s(0, -2);
          } else {
            doc.id("content").innerHTML += key;
          }
        }
      } else {
        if (val) {
          val = false;
          addText();
        }
      }
    }
  } else {
    switch (e.key) {
      case ("c"): {
        clear();
      }; break;
      case ("h"): {
        alert("You are idiot");
      }; break;
      case ("d"): {
        changeType((type + 1).wrap(-1, text.keys().length - 1));
        if (doc.id("content").innerHTML) {
          doc.id("content").innerHTML += "<br>";
        }
        char = 0;
      }; break;
      case ("n"): {
        if (doAuto === true) {
          stop();
        } else {
          start();
        }
      }; break;
    }
  }
  e.preventDefault();
});
addEventListener("keyup", () => {
  val = true;
});

function addText() {
  if (type != 0) {
    for (i = 0; i < F.randomInt(1, 4); i++) {
      setTimeout(() => {
        doc.id("content").innerHTML += text[text.keys()[type]][char] == "\n" ? '<br>' : text[text.keys()[type]][char].replace(" ", "&nbsp;");
        char++;
        if (char >= text[text.keys()[type]].length) {
          doc.id("content").innerHTML += '<br>';
          char = 0;
        }
      }, i * (50 * (F.randomInt(5, 20) / 10)));
    }
    doc.id("content").innerHTML = doc.id("content").innerHTML.split("<br>").s((7 - (((window.innerHeight - 30) / 20)).round()).setBorder(-Infinity, 0), -1).join("<br>");
  }
}

doAuto = 1;
async function start() {
  doAuto = true;
  while (true) {
    if (doAuto) {
      await F.sleep(F.randomInt(8, 20) / 100);
      addText();
    } else {
      break;
    }
  }
}
function stop() {
  doAuto = false;
}