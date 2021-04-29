function init() {
  setTable();
  if (F.url.query.search) {
    doc.id("search").value = F.url.query.search;
    search();
  }
  doc.id("image").src = "image/favicon.png";
}

function setTable() {
  el = '<tr>';
  for (v = 0; v < food.length; v++) {
    el += '<th>{0}</th>'.format(
      food[v].name,
    );
  }
  doc.id("table").innerHTML = el + '</tr>';

  length = 0;
  for (i = 0; i < food.length; i++) {
    food[i].items.sort((a, b) => {
      if (b.name.lower() < a.name.lower()) {
        return (1);
      }
      if (b.name.lower() > a.name.lower()) {
        return (-1);
      }
      return (0);
    });
    if (food[0]) {
      length = Math.max(length, food[0].items.length);
    }
  }

  for (i = 0; i < length; i++) {
    el = '<tr>';
    for (v = 0; v < food.length; v++) {
      el += [
        '<td title="{title}" id="{id}">',
        '  <button {onclick} class="tableButton {empty}">',
        '    {name}',
        '    <br>',
        '    <span class="subtitle">',
        '      {subtitle}',
        '    </span>',
        '  </button>',
        '</td>'
      ].join("").format({
        id: "t_" + v + "_" + i,
        onclick: food[v].items[i] ? 'onclick="clickItem(this);"' : "",
        empty: food[v].items[i] ? "" : "empty",
        title: food[v].items[i]?.tags?.[0] ? "Search Terms: " + food[v].items[i].tags.join(", ").capWords() : "",
        subtitle: food[v].items[i]?.subtitle || "",
        name: food[v].items[i]?.name || "",
      });
    }
    doc.id("table").innerHTML += el + '</tr>';
  }
}

function search() {
  var text = doc.id("search").value;
  if (text.replaceAll(" ", "").length > 0) {
    doc.id("link").style.display = "block";
    doc.id("link").href = "https://www.google.com/search?q=can%20dog%20eat%20{0}".format(text.replaceAll(" ", "%20"));
    doc.id("link_text").innerText = text.capWords().truncate(40, "...");
  } else {
    doc.id("link").style.display = "none";
  }

  if (!text) {
    doc.id("output").innerHTML = "";
    return;
  }
  text = text.lower();

  results = {};
  for (v = 0; v < food.length; v++) {
    for (i = 0; i < food[v].items.length; i++) {
      key = "{0}_{1}".format(v, i);
      num = 0;
      for (l = 0; l < food[v].items[i].name.split(" ").length; l++) {
        for (j = 0; j < text.split(" ").length; j++) {
          if (!text.split(" ")[j]) {
            continue;
          }
          if (food[v].items[i].name.lower().split(" ")[l].includes(text.split(" ")[j])) {
            num += 10;
          }
        }
      }
      for (t = 0; t < food[v].items[i].tags.length; t++) {
        if (!food[v].items[i].tags[t]) {
          continue;
        }
        for (l = 0; l < food[v].items[i].tags[t].lower().split(" ").length; l++) {
          for (j = 0; j < text.split(" ").length; j++) {
            if (!text.split(" ")[j]) {
              continue;
            }
            if (food[v].items[i].tags[t].lower().split(" ")[l].includes(text.split(" ")[j])) {
              num += 1;
            }
          }
        }
        if (text.includes(food[v].items[i].tags[t].lower())) {
          num += 7;
        }
      }
      if (num) {
        if (!results[key]) {
          results[key] = {
            name: food[v].items[i].name,
            subtitle: food[v].items[i].subtitle,
            group: food[v].name,
            tags: food[v].items[i].tags,
            num: 0,
            v,
            i,
          };
        }
        results[key].num = num;
      }
    }
  }
  results.sort((a, b) => {
    return (a.num > b.num);
  });

  el = '<tr>';
  done = [];
  for (v = 0; v < results.keys().length; v++) {
    if (!done.includes(results.values()[v].group)) {
      el += '<th>{0}</th>'.format(
        results.values()[v].group,
      );
      done.push(results.values()[v].group);
    }
  }
  doc.id("output").innerHTML = el + '</tr>';

  groups = [];
  for (i = 0; i < results.keys().length; i++) {
    if (!groups[done.indexOf(results.values()[i].group)]) {
      groups[done.indexOf(results.values()[i].group)] = [];
    }
    groups[done.indexOf(results.values()[i].group)].push(results.values()[i]);
  }

  length = 0;
  for (i = 0; i < groups.length; i++) {
    length = Math.max(length, groups[i].length);
  }
  max = 7;

  for (i = 0; i < Math.min(max, length); i++) {
    el = '<tr>';
    for (v = 0; v < groups.length; v++) {
      el += [
        '<td title="{title}" id="{id}">',
        '  <button {onclick} class="tableButton {empty}">',
        '   {name}',
        '   <br>',
        '   <span class="subtitle">',
        '     {subtitle}',
        '   </span>',
        '  </button>',
        '</td>'
      ].join("").format({
        id: groups[v][i] && "search_" + groups[v][i].v + "_" + groups[v][i].i,
        onclick: groups[v][i] && 'onclick="clickItem(this);"',
        empty: groups[v][i] ? "" : "empty",
        title: groups[v][i]?.tags?.[0] ? "Search Terms: " + groups[v][i].tags.join(", ").capWords() : "",
        subtitle: groups[v][i]?.subtitle || "",
        name: groups[v][i]?.name || "",
      });
    }
    doc.id("output").innerHTML += el + '</tr>';
    if (i == max - 1 && length > max) {
      el = '<tr>';
      for (v = 0; v < groups.length; v++) {
        if (groups[v].length > max) {
          el += [
            '<td>',
            '  <button class="tableButton ect">',
            '    Ect...',
            '  </button>',
            '</td>',
          ].join("");
        } else {
          el += [
            '<td>',
            '</td>',
          ].join("");
        }
      }
      doc.id("output").innerHTML += el + '</tr>';
    }
  }
  doc.id("noResults").style.display = (length < 1 && text.replaceAll(" ", "").length > 0) ? "block" : "none";
}

function redirect(e) {
  if (e.code == "Enter" && e.ctrlKey) {
    url = F.url.queryRaw ? F.url.href.s(0, -2 - F.url.queryRaw.length) : F.url.href;
    q = F.url.query;
    if (q.length < 1) {
      q = {};
    }
    q.search = doc.id("search").value;
    location.href = url + (q.keys().length > 0 && q.search ? "?" + q.output("=", "&") : "");
  }
}

function clickItem(el) {
  el = el.parentNode;
  item = el.id.split("_");
  answer = "NO!";
  switch (food[item[1]].can) {
    case (0): {
      answer = "YES";
    }; break;
    case (1): {
      answer = "YES, But be careful";
    }; break;
  }
  item = food[item[1]].items[item[2]];
  el = [
    '<hr>',
    '<h1>',
    '  Can dog eat ',
    '  <em>{name}</em>? - <code>{answer}</code>',
    '</h1>',
    '<h2>',
    '  {subtitle}',
    '</h2>',
    '<p title="Sourced directly from Google">',
    '  {desc}',
    '</p>',
    '<br>',
    '<p title="NOT SCIENTIFIC INFORMATION - What my dog likes">',
    '  {critic}',
    '</p>',
    '<a href="https://www.google.com/search?q=can dog eat {link}" target="_blank">',
    '  Search google for \'{name}\'',
    '</a>',
  ].join("").format({
    name: item.name,
    answer,
    link: item.name.lower(),
    subtitle: item.subtitle || "",
    desc: item.desc || "No information",
    critic: answer[0].lower() == "n" ? "Do not feed." : (item.critic ? "Critic's verdict: " + item.critic : "No critic information"),
  });
  doc.id("desc").innerHTML = el;
}

function random() {
  item = F.randomChoice(F.randomChoice(food).items);
  doc.id("search").value = item.name;
  search();
  el = doc.id("output")?.childNodes[1]?.childNodes[0]?.childNodes[0]?.childNodes[1];
  if (el) {
    clickItem(el);
  }
}