function init() {
  ls.check();
  css.set();
  showSettings();
  defaults.nice();
  doc.body.style.visibility = "visible";
}

function showSettings() {
  for (i = 0; i < settings.length; i++) {
    obj = {
      id: settings[i].id,
      display: settings[i].display,
      checked: ls.get()[settings[i].id] ? "checked" : "",
    };
    el = '';
    switch (settings[i].type) {
      default: {
        el += [
          '<label class="label">',
          '  {display}',
          '</label>',
          '<label class="ew switch" title="Toggle \'{display}\'">',
          '  <input type="checkbox" id="input {id}" onchange="settingsChange(this)" {checked}>',
          '  <span class="slider round"></span>',
          '</label>',
        ].join("").format(obj);
      }
    }
    doc.id("contain").innerHTML += '<div>{0}</div>'.format(el);
  }
}

function settingsChange(el) {
  ls.edit(d => {
    d[el.id.split(" ").sub(1, -1).join(" ")] = el.checked;
  });
}