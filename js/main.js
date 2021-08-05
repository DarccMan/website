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
  for (t = 0; t < Object.keys(links).length; t++) {
    content = '';
    for (i = 0; i < Object.values(links)[t].items.length; i++) {
      if (
        !(
          Object.values(links)[t].items[i].show === undefined
          || Object.values(links)[t].items[i].show === 2
          || (
            Object.values(links)[t].items[i].show === 1
            && showHidden
          )
        )
      ) {
        continue;
      }
      icon = icons[Object.values(links)[t].items[i].icon];
      if (!icon) {
        icon = "";
      }
      let href = Object.values(links)[t].items[i].id;
      if (Object.values(links)[t].local) {
        href = `./p/${Object.values(links)[t].items[i].id}${(F.url.protocol[0] == "f") ? "/index.html" : ""}`;
      };
      let img = "";
      if (Object.values(links)[t].image?.constructor == String) {
        if (Object.values(links)[t].items[i].image) {
          img = `<img src="${Object.values(links)[t].items[i].image}" class="icon_img" onerror="unloadImage(this)">`;
        } else {
          img = `<img src="${F.format(Object.values(links)[t].image, Object.values(links)[t].items[i].id)}" class="icon_img" onerror="unloadImage(this)">`;
        }
      } else if (Object.values(links)[t].image == 1) {
        if (Object.values(links)[t].items[i].image) {
          img = `<img src="${Object.values(links)[t].items[i].image}" class="icon_img" onerror="unloadImage(this)">`;
        }
      }
      content += `
        <article class="link ${!img ? "noImage" : ""}">
          ${img}
          <section>
            <a href="${href}" id="link_${Object.values(links)[t].items[i].id}" title="${Object.values(links)[t].items[i].id}">
              ${icon}${Object.values(links)[t].items[i].name ? Object.values(links)[t].items[i].name : Object.values(links)[t].items[i].id}
            </a>
          </section>
        </article>  
      `;
    }
    doc.id("links").innerHTML += `
      <section id="links_${Object.keys(links)[t]}">
        <h2>${Object.values(links)[t].name}</h2>
      </section>
      <div class="content">
       ${content}
      </div>
      <hr>
    `;
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