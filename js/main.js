function init() {
  ls.check();
  css.set();
  showLinks();
  F.triggerOnload();
  doc.id("splash").innerHTML = rootData.splash;
  doc.body.style.visibility = "visible";
  defaults.nice();
  if (F.url.query.header) {
    doc.id("header_name").innerText = F.url.query.header;
  }
}

function showLinks(showHidden) {
  doc.id("links").innerHTML = "";
  for (t = 0; t < links.keys().length; t++) {
    content = '';
    for (i = 0; i < links.values()[t].items.length; i++) {
      if (
        !(
          links.values()[t].items[i].show === undefined
          || links.values()[t].items[i].show === 2
          || (
            links.values()[t].items[i].show === 1
            && showHidden
          )
        )
      ) {
        continue;
      }
      icon = icons[links.values()[t].items[i].icon];
      if (!icon) {
        icon = "";
      }
      let href = links.values()[t].items[i].id;
      if (links.values()[t].local) {
        href = "./p/{0}{1}".format(
          links.values()[t].items[i].id,
          (F.url.protocol[0] == "f") ? "/index.html" : ""
        );
      };
      let img = "";
      if (links.values()[t].image?.constructor == String) {
        if (links.values()[t].items[i].image) {
          img = '<img src="{0}" class="icon_img" onerror="unloadImage(this)">'.format(links.values()[t].items[i].image);
        } else {
          img = '<img src="{0}" class="icon_img" onerror="unloadImage(this)">'.format(links.values()[t].image.format(links.values()[t].items[i].id));
        }
      } else if (links.values()[t].image == 1) {
        if (links.values()[t].items[i].image) {
          img = '<img src="{0}" class="icon_img" onerror="unloadImage(this)">'.format(
            links.values()[t].items[i].image
          );
        }
      }
      content += [
        '<article class="link {noImage}">',
        '  {img}',
        '  <section>',
        '    <a href="{href}" id="{id}" title="{title}">',
        '      {name}',
        '    </a>',
        '  </section>',
        '</article>',
      ].join("").format({
        img,
        noImage: !img ? "noImage" : "",
        href: href,
        name: "{0}{1}".format(icon, links.values()[t].items[i].name ? links.values()[t].items[i].name : links.values()[t].items[i].id),
        id: "link_{0}".format(links.values()[t].items[i].id),
        title: links.values()[t].items[i].title || "Go to '{0}'".format((links.values()[t].local ? F.url.href : "") + href),
      });
    }
    doc.id("links").innerHTML += [
      '<section id="links_{id}">',
      '  <h2>{name}</h2>',
      '</section>',
      '<div class="content">',
      ' {content}',
      '</div>',
      '<hr>',
    ].join("").format({
      id: links.keys()[t],
      name: links.values()[t].name,
      content: content,
    });
  }
}
function unhide() {
  showLinks(true);
}

function changeStyle() {
  doc.html.setAttribute("lightmode", doc.id("lightmode").checked);
  ls.edit(d => {
    d.lightmode = doc.id("lightmode").checked;
  });
}

function unloadImage(el) {
  // el.style.visibility = "hidden";
  el.src = "./source/image/fallback.png";
  el.className += " unloaded";
}

function crash() {
  console.log("Look out! *crash*");
  while (true) {
    alert("You idiot!");
  }
}