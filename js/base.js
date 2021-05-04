console.log("%c._. Hello", ({
  "color": "white",
  "font-size": "25px",
}).output(":", ";"));

defaults = {};
defaults.nice = function () {
  if (F.url.query.nice) {
    els = doc.query("*");
    for (i = 0; i < els.length; i++) {
      if (els[i].childNodes.length == 1) {
        els[i].innerText = "Nice";
      }
    }
  }
}

var ls = {};
ls.check = function () {
  if (!F.ls("settings")) {
    ls.reset();
  }
}
ls.get = function () {
  return (JSON.parse(F.ls("settings")));
}
ls.reset = function () {
  F.ls("settings", JSON.stringify({
    lightmode: false,
    css: [],
  }));
}
ls.edit = function (func) {
  let d = ls.get();
  func(d);
  F.ls("settings", JSON.stringify(d));
}

css = {};
css.set = function () {
  if (ls.get().css) {
    for (i = 0; i < ls.get().css.length; i++) {
      css.add(ls.get().css[i], false);
    }
  }
}
css.add = function (name, add) {
  if (name) {
    attr = doc.html.getAttribute("css");
    if (attr == null) {
      attr = "";
    }
    attr = attr.split(" ");
    if (!attr.includes(name)) {
      attr.push(name);
      doc.html.setAttribute("css", attr.join(" "));
      if (add !== false) {
        ls.edit(d => {
          d.css = attr;
        });
      }
    }
  }
}
css.remove = function (name, add) {
  if (name) {
    attr = doc.html.getAttribute("css");
    if (attr == null) {
      attr = "";
    }
    attr = attr.split(" ");
    if (attr.includes(name)) {
      attr = attr.remove(name);
      doc.html.setAttribute("css", attr.join(" "));
      if (add !== false) {
        ls.edit(d => {
          d.css = attr;
        });
      }
    }
  }
}
css.change = function (name, value) {
  if (value == true) {
    css.add(name);
  } else if (value == false) {
    css.remove(name);
  }
}
css.toggle = function (name) {
  value = ls.get().css.includes(name);
  css.change(name, !value);
}
css.reset = function () {
  attr = [];
  doc.html.setAttribute("css", attr.join(" "));
  if (add !== false) {
    ls.edit(d => {
      d.css = attr;
    });
  }
}