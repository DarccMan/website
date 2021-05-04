var page = F.url.filename;
var cLang = "en";
var debugTimer;
window.onerror = function (msg, line) {
  if (ls().settings.general_error) {
    debugTimer = setTimeout(() => {
      console.warn(lang_format("console_error").format({
        time: (data.bug_timeout / 1000),
        msg: msg,
        line: line
      }));
      alert(lang_format("console_unloaded").format({
        time: (data.bug_timeout / 1000)
      }));
    }, data.bug_timeout);
  }
  doc.id("content").style.opacity = "1.1";
}
function init() {
  if ([undefined, null, "", "undefined", "null", true, false, "true", "false"].includes(F.ls(data.lsName))) {
    ls_reset();
  }
  console.log(lang_format("console_init").format({page: page}));
  if ([null, undefined, ""].includes(ls().lang)) {
    ls_edit((d) => {
      d.lang = data.def_lang;
    });
  }
  cLang = ls().lang;
  if (!lang.keys().includes(cLang)) {
    var o = cLang;
    cLang = data.def_lang;
    console.warn(lang_format("lang_unknown").format({lang: o, default: lang_format("lang_name")}));
  }
  F.triggerOnload();
  var then = Date.now();
  if ([true, null, undefined].includes(ls().firstTime)) {
    if (ls().settings.general_newMessage) {
      console.log(lang_format("console_new"))
      if (F.browser() != "Chrome") {
        alert(lang_format("console_browser").format({browser: F.browser()}));
      }
      ls_edit((d) => {
        d.firstTime = false;
      });
    }
  }
  online();
  header_init();
  sc_init();
  notes_init();
  clock_init();
  wip_init();
  if (["about"].includes(page)) {
    doc.id("about_version").innerHTML = data.version;
  } else if (["index"].includes(page)) {
    if (!ls().settings.search_barChangesSize) {
      doc.id("search").style.width = "40%";
    }
    if (ls().settings.search_autofocus) {
      doc.id("search").focus();
    }
    if (ls().settings.search_clearOnLoad) {
      doc.id("search").value = "";
    }
  } else if (["settings"].includes(page)) {
    settings_init();
  }
  // Uncomment_to_cause_error;
  doc.id("content").style.opacity = "1.1";
  clearTimeout(debugTimer);
  console.log(lang_format("console_loaded").format({time: (Date.now() - then) / 1000}));
}
function ls_reset() {
  F.ls(data.lsName, null);
  var d = data.default;
  F.ls(data.lsName, JSON.stringify(d));
  sc_reset();
  notes_reset();
  header_init();
}
function ls_import() {
  var n = prompt(lang_format("ls_import"), lang_format("ls_example").format({settings: F.ls(data.lsName)}));
  if (n.s(0) == "\"") {
    n = n.s(1, -1);
  }
  if (n.s(-1) == "\"") {
    n = n.s(0, -2);
  }
  var confirm = window.confirm(lang_format("ls_confirmChange"));
  if (confirm) {
    F.ls(data.lsName, n);
    init();
  }
}
function ls_export() {
  console.log(F.ls(data.lsName));
  F.copy(F.ls(data.lsName));
}
function ls_edit(func) {
  var d = ls();
  func(d);
  F.ls(data.lsName, JSON.stringify(d));
}
function ls() {
  return (JSON.parse(F.ls(data.lsName)));
}
/* Fill in language */
function lang_fill(text, el) {
  el.innerHTML = lang_format("lang_missing");
  el.placeholder = lang_format("lang_missing");
  if (![undefined, null].includes(text)) {
    var a = lang[cLang][text];
    if (a.constructor == Object) {
      if (![undefined, null].includes(a.text)) {
        el.innerHTML = lang[cLang][text].text;
      }
      if (![undefined, null].includes(a.title)) {
        el.title = lang[cLang][text].title;
      }
      if (![undefined, null].includes(a.placeholder)) {
        el.placeholder = lang[cLang][text].placeholder;
      }
    } else {
      el.innerHTML = lang[cLang][text];
    }
  }
}
function lang_format(text, l, keepCon) {
  if ([undefined, null, ""].includes(l) || [undefined, null, ""].includes(lang[l])) {
    l = cLang;
  }
  if (![undefined, null].includes(text)) {
    var a = lang[l][text];
    if (![undefined, null].includes(a)) {
      if (a.constructor == Object && !keepCon) {
        a = a.text;
      }
      return (a);
    }
  }
  if (![undefined, null].includes(lang[l].lang_missing)) {
    return (lang[l].lang_missing);
  }
  return (lang[data.def_lang].lang_missing);
}
function lang_change(name) {
  if (![null, undefined, ""].includes(name)) {
    if (![null, undefined, ""].includes(lang[name])) {
      if (confirm("{0}\n\n{1}".format(
        lang_format("lang_confirmChange").format({
          name: lang_format("lang_name", name)
        }),
        lang_format("lang_confirmChange", name).format({
          name: lang_format("lang_name", name)
        })
      ))) {
        ls_edit((d) => {
          d.lang = name;
        });
        cLang = name;
        console.log(lang_format("lang_changed").format({name: lang_format("lang_name")}));
        setTimeout(init(), 100);
        return (true);
      }
    }
  }
  return (false);
}
function corrPage(type) {
  if (![null, undefined, ""].includes(data.pages[type])) {
    if ((data.pages[type]).includes(page)) {
      return (true);
    }
  }
  return (false);
}
function sc_init() {
  if (corrPage("sc")) {
    var sc_debugTimer = setTimeout(() => {
      sc_reset();
    }, data.sc.bug_timeout);
    /* Deletes any shortcuts that are there */
    for (i3 = 0; i3 < (data.sc.amount / data.sc.row_amount); i3++) {
      doc.id("sc").removeChildren();
    }
    for (i3 = 0; i3 < (data.sc.amount / data.sc.row_amount); i3++) {
      if (i3 == 0) {
        doc.id("sc").removeChildren();
      }
      var el = '<div id="sc_column_n{num}"></div>'.format({num: i3});
      $("#sc").append(el);
      for (i2 = 0; i2 < data.sc.row_amount; i2++) {
        var elId = ((i3 * data.sc.row_amount) + i2);
        /* Create elements */
        var href = ls().sc[elId].href;
        if ([null, undefined, ""].includes(href)) {
          href = data.sc.default_href;
        }
        var target = "";
        if (ls().settings.sc_newTab) {
          target = 'target="_blank"';
        }
        var el = [
          '<section>',
          '<a href="{href}" id="sc_link_n{num}" {target}>',
          /* '<img src="image/error.png" id="sc_favicon_n{num}">', */
          '<span id="sc_text_n{num}" onload="lang_fill(\'sc_button\', this)"></span>',
          '</a>',
          '<button id="sc_edit_n{num}" onclick="sc_edit(this.id)">',
          '<i class="fa fa-edit" id="sc_edit_icon_n{num}" onload="lang_fill(\'sc_edit\', this)"></i>',
          '</button>',
          '<section>'
        ].join("").format({
          num: elId,
          href: href,
          title: href,
          target: target
        });
        /* Add elements to group */
        $("#sc_column_n{0}".format(i3)).append(el);
        $("#sc_text_n{0}".format(elId)).trigger("onload");
        $("#sc_edit_icon_n{0}".format(elId)).trigger("onload");
        /* Set link and text */
        var href = ls().sc[elId].href;
        if (![null, undefined, ""].includes(href)) {
          doc.id("sc_text_n{0}".format(elId)).title = href;
        }
        var text = ls().sc[elId].title;
        if ([null, undefined, ""].includes(text)) {
          text = lang_format("sc_button");
        }
        /* Set the title */
        if (ls().settings.sc_title) {
          doc.id("sc_text_n{0}".format(elId)).innerHTML = text;
        } else {
          var href = ls().sc[elId].href;
          if ([null, undefined, ""].includes(href)) {
            href = lang_format("sc_button");
          } else {
            href = hreF.split(".").s(1);
          }
          doc.id("sc_text_n{0}".format(elId)).innerHTML = href;
        }
        /* Cosmetic stuff */
        if (doc.id("sc_text_n{0}".format(elId)).innerHTML.length >= data.sc.maxTextLength) {
          doc.id("sc_text_n{0}".format(elId)).innerHTML = doc.id("sc_text_n{0}".format(elId)).innerHTML.s(0, 15) + "...";
        }
        if (ls().settings.sc_dynamicFontSize) {
          doc.id("sc_text_n{0}".format(elId)).style.fontSize = "{0}px".format(data.sc.maxFontSize - (doc.id("sc_text_n{0}".format(elId)).innerHTML.length));
        }
        if ([data.sc.default_href, null, undefined, ""].includes(ls().sc[elId].href) || [null, undefined, ""].includes(ls().sc[elId].title)) {
          doc.id("sc_text_n{0}".format(elId)).style.color = data.sc.undefined_color;
        }
      }
      $("#sc").append("<br>");
    }
    F.addStyle("#sc div section a {width: {0}%;".format((100 / data.sc.row_amount) * 0.847));
    clearInterval(sc_debugTimer);
  }
}
function sc_edit(elId) {
  if (corrPage("sc")) {
    elId = parseInt(elId.split("n").s(-1).join(""));
    var o = doc.id("sc_link_n{0}".format(elId)).href;
    var n = window.prompt(lang_format("sc_editPrompt_href").format({num: elId + 1, title: doc.id("sc_text_n{0}".format(elId)).innerHTML}), o);
    if (![""].includes(n)) {
      if (![null].includes(n)) {
        if (n != o) {
          if (ls().settings.sc_completeUrl) {
            if (n.s(0) == "*") {
              n = n.s(1, -1);
            } else {
              if (ls().settings.sc_completeUrl) {
                n = formatUrl(n);
              }
            }
          }
          ls_edit((data) => {
            data.sc[elId].href = n;
          });
        }
        if (!["", undefined, null, "undefined", "undefined"].includes(n)) {
          if (ls().settings.sc_title) {
            var o = doc.id("sc_text_n{0}".format(elId)).innerHTML;
            var n = window.prompt(lang_format("sc_editPrompt_text").format({num: elId + 1, title: doc.id("sc_text_n{0}".format(elId)).innerHTML}), o);
            if (![null].includes(n)) {
              if (o != n) {
                ls_edit((data) => {
                  data.sc[elId].title = n;
                });
              }
            }
          } else {
            ls_edit((data) => {
              data.sc[elId].title = n.split(".").s(1);
            });
          }
        }
      }
    } else {
      ls_edit((d) => {
        d.sc[elId].href = data.sc.default_href;
        d.sc[elId].title = null;
      });
    }
    sc_init();
  }
}
function sc_reset() {
  ls_edit((d) => {
    for (i = 0; i < data.sc.amount; i++) {
      d.sc[i] = {
        href: null,
        title: null
      }
    }
  });
  sc_init();
}
function formatUrl(n) {
  if (![null, undefined, ""].includes(n)) {
    n = n.toLowerCase();
    if (data.sc.extensions.end_file.includes(n.split(".").s(-1))) {
      if (!data.sc.extensions.start_file.includes(n.split("/").s(0))) {
        n = "file:///" + n;
      }
    } else {
      if (!data.sc.extensions.start_file.includes(n.split("/").s(0)) && !data.sc.extensions.end_link.includes(n.split(".").s(-1)) && !["/"].includes(n.s(-1))) {
        n = n + ".com";
      }
      if (!data.sc.extensions.start_file.includes(n.split("/").s(0)) && !data.sc.extensions.start_link.includes(n.split("/").s(0)) && !data.sc.extensions.start_www.includes(n.split(".").s(0))) {
        n = "www." + n;
      }
      if (!data.sc.extensions.start_file.includes(n.split("/").s(0)) && !data.sc.extensions.start_link.includes(n.split("/").s(0))) {
        n = "https://" + n;
      }
      if (n.s(-1) != "/") {
        n = n + "/";
      }
    }
  }
  return (n);
}

var clockRefresh;
var date = new Date();
function clock_init() {
  clearInterval(clockRefresh);
  if (corrPage("dateTime")) {
    clockRefresh = setInterval(() => {
      // console.log(1);
      clock_refresh();
    }, data.clock.refresh);
  }
}
function clock_refresh() {
  if (corrPage("dateTime")) {
    h = date.getHours();
    if (!ls().settings.dateTime_24Hour) {
      if (h > 12) {
        h -= 12;
      }
    }
    m = F.fillStr(date.getMinutes());
    doc.id("date_time").innerHTML = "{h}:{m}".format({
      h: h,
      m: m,
    });
  }
}

function search() {
  var input = doc.id("search").value;
  if (input != "") {
    if ((input.includes(" ")) || ((input.split("/").length == 1) && (input.split(".").length == 1))) {
      input = "https://google.com/search?q={0}".format(input);
    } else {
      if (ls().settings.search_completeUrl) {
        input = formatUrl(input);
      }
    }
    location.href = input;
  }
}
function search_key(e) {
  if (e.keyCode == 13) {
    search();
  }
  setTimeout(() => {
    doc.id("search_icon_close").style.opacity = "0.0";
    if (!["", null, undefined].includes(doc.id("search").value)) {
      doc.id("search_icon_close").style.opacity = "1.0";
    }
  }, 10);
}
function search_clear() {
  doc.id("search").value = "";
}
function header_init() {
  var t = ls().header;
  if (t == null) {
    t = lang_format("header_default");
  }
  if (["index"].includes(page)) {
    doc.id("header").innerHTML = t;
  }
  doc.tag("title")[0].innerHTML = lang_format("header_title_{0}".format(page)).format({title: t});
}
function header_change() {
  var o = doc.id("header").innerHTML;
  var n = prompt(lang_format("header_set"), o);
  if (![null, undefined, o].includes(n)) {
    if (n.length > data.header.max_length) {
      n = n.s(0, data.header.max_length);
    }
    if (n == "") {
      n = null;
    }
    ls_edit((d) => {
      d.header = n;
    });
  }
  header_init();
}
function notes_init() {
  if (corrPage("notes")) {
    doc.id("notes_contain").removeChildren();
    for (i3 = 0; i3 < data.notes.notes.length; i3++) {
      if ([null, undefined].includes(ls().notes[i3])) {
        ls_edit((d) => {
          d.notes[i3] = "";
        });
      }
      var b = ls().notes[i3];
      var style = [
        "background-color: {0}".format(data.notes.notes[i3].color)
      ];
      style[1] = data.notes.notes[i3].color;
      style[1] = style[1].split(",");
      style[1][0] = style[1][0].split("(").s(-1).join("");
      for (i2 = 0; i2 < style[1].length; i2++) {
        style[1][i2] = F.setBorder((parseInt(style[1][i2]) - data.notes.border_colorChange), 0, 255);
      }
      style[1] = "border-color: rgba({0}, {1}, {2});".format(style[1][0], style[1][1], style[1][2]);
      style[2] = data.notes.notes[i3].style;
      style = style.join("");
      var text = data.notes.notes[i3].text;
      if ([undefined, null].includes(text)) {
        text = lang_format("notes_default");
      }
      var el = [
        '<textarea id="notes_n{num}" placeholder="{ph}" onchange="notes_change(this)" onkeydown="notes_change(this)" style="{style}">{text}</textarea>',
        /* '<button>',
          '<i class="fa fa-arrows"></i>',
        '</button>', */
      ].join("").format({num: i3, ph: text, text: b, style: style});
      $("#notes_contain").append(el);
    }
  }
}
function notes_change(elId) {
  elId = elId.id.split("n").s(-1).join("");
  ls_edit((d) => {
    d.notes[elId] = doc.id("notes_n{0}".format(elId)).value;
  });
}
function notes_reset() {
  ls_edit((d) => {
    for (i = 0; i < data.notes.notes.length; i++) {
      d.notes[i] = "";
    }
  });
  notes_init();
}
function back() {
  history.back();
  setTimeout(() => {
    location.href = "index.html";
  }, 10);
}
function settings_init() {
  for (i = 0; i < data.settings.groups.length; i++) {
    var elGroup = [
      '<div class="group" id="settings_group_{id}">',
      '<h1>{header}</h1>',
      '</div>'
    ].join("").format({id: data.settings.groups[i].id, header: lang_format("settings_header_{0}".format(data.settings.groups[i].id))});
    $("#settings_content").append(elGroup);
    for (i2 = 0; i2 < data.settings.groups[i].items.length; i2++) {
      var el;
      var elId = "{0}_{1}".format(data.settings.groups[i].id, data.settings.groups[i].items[i2].id);
      var text = lang_format("settings_{0}_{1}".format(data.settings.groups[i].id, data.settings.groups[i].items[i2].id));
      if (data.settings.groups[i].items[i2].type == "checkbox") {
        var checked = JSON.parse(F.ls("customtab.all")).settings[elId];
        if (checked) {
          checked = "checked";
        } else {
          checked = "";
        }
        if (data.settings.groups[i].items[i2].checked) {
          checked = "checked";
        } else if (data.settings.groups[i].items[i2].checked == false) {
          checked = "";
        }
        var disabled = data.settings.groups[i].items[i2].disabled;
        if (disabled) {
          disabled = "disabled";
        } else {
          disabled = "";
        }
        if (data.settings.groups[i].items[i2].wip) {
          text = '{text} <span style="color:{color}" title="{title}">[{wip}]</span>'.format({
            text: text,
            color: data.settings.wip_color,
            wip: lang_format("wip", null, true).text,
            title: lang_format("wip", null, true).title
          });
        }
        el = [
          '<div id="settings_{id}">',
          '<label class="switch">',
          '<input type="checkbox" {checked} onclick="settings_save()" id="settings_checkbox_{id}" {disabled}>',
          '<span class="slider"></span>',
          '</label>',
          '<p><span>{text}</span><i class="fa fa-question-circle icon_help" onclick="settings_help(this)" title="{icon_title}"></i></p>',
          '</div>',
        ].join("").format({
          id: elId,
          text: text,
          icon_title: lang_format("settings_icon", null, true).title,
          checked: checked,
          disabled: disabled,
        });
        $("#settings_group_{0}".format(data.settings.groups[i].id)).append(el);
      } else if (data.settings.groups[i].items[i2].type == "select") {
        el = [
          '<div id="settings_{id}">',
          '<p><span>{text}</span><i class="fa fa-question-circle icon_help" onclick="settings_help(this)" title="{icon_title}"></i></p>',
          '<select id="settings_select_{id}">',
          '</select>',
          '</div>',
        ].join("").format({
          id: elId,
          text: text,
          icon_title: lang_format("settings_icon", null, true).title,
        });
        $("#settings_group_{0}".format(data.settings.groups[i].id)).append(el);
        for (i3 = 0; i3 < data.settings.groups[i].items[i2].options.length; i3++) {
          var selected = "";
          if (data.settings.groups[i].items[i2].options[i3].selected) {
            selected = "selected";
          }
          var text = lang_format("settings_{0}_{1}_{2}".format(data.settings.groups[i].id, data.settings.groups[i].items[i2].id, data.settings.groups[i].items[i2].options[i3].value));
          el = [
            '<option {selected}>{text}</option>',
          ].join("").format({
            selected: selected,
            text: text,
          });
          $("#settings_select_{0}".format(elId)).append(el);
        }
      }
      wip_init();
    }
  }
}
function settings_save() {
  for (i = 0; i < data.settings.groups.length; i++) {
    for (i2 = 0; i2 < data.settings.groups[i].items.length; i2++) {
      var elId = "{0}_{1}".format(data.settings.groups[i].id, data.settings.groups[i].items[i2].id);
      if (data.settings.groups[i].items[i2].type == "checkbox") {
        ls_edit((d) => {
          d.settings[elId] = doc.id("settings_checkbox_{0}".format(elId)).checked;
        });
      }
    }
  }
}
function settings_help(el) {
  el = el.parentNode.parentNode.id.split("settings_").s(-1);
  doc.id("settings_help_header").innerHTML = lang_format("settings_help_missing");
  if (!([lang_format("lang_missing"), null, undefined].includes((lang_format("settings_{0}".format(el), null, true))) || [null, undefined, ""].includes((lang_format("settings_{0}".format(el), null, true)).text))) {
    doc.id("settings_help_header").innerHTML = (lang_format("settings_{0}".format(el), null, true).text);
  }
  doc.id("settings_help_body").innerHTML = lang_format("settings_help_missing");
  if (!([lang_format("lang_missing"), null, undefined].includes((lang_format("settings_{0}".format(el), null, true))) || [null, undefined, ""].includes((lang_format("settings_{0}".format(el), null, true)).desc))) {
    doc.id("settings_help_body").innerHTML = (lang_format("settings_{0}".format(el), null, true).desc);
  }
}
function wip_init() {
  $("[wip], wip").each(function (index) {
    $(this).html(lang_format("wip", null, true).text);
    $(this).attr("title", lang_format("wip", null, true).title);
  });
}
// console.log(F.online());
function online() {
  if (corrPage("online")) {
  }
}