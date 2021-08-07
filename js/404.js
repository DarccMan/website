function init() {
  ls.check();

  doc.id("link").href = "https://epicwebsite.bruh.international/" + (F.url.online ? "" : "/index.html");

  if (F.url.filepath == "p/") {
    location.href = "https://epicwebsite.bruh.international";
  }

  path = F.url.filepath;
  redirected = false;

  for (o = 0; o < Object.keys(links).length; o++) {
    for (l = 0; l < Object.values(links)[o].items.length; l++) {
      if (
        path.split("/")[0] == Object.values(links)[o].items[l].id
        || (
          Object.values(links)[o].items[l].alias
          && (
            Object.values(links)[o].items[l].alias.includes(path.split("/")[0])
            || Object.values(links)[o].items[l].alias.includes(path.split("/p/")[0])
          )
        )
      ) {
        link = `https://epicwebsite.bruh.international/p/${Object.values(links)[o].items[l].id}${F.url.queryRaw.length > 0 ? " ? " + F.url.queryRaw : ""}`;
        doc.id("header").innerText = "Redirecting...";
        doc.id("text").innerHTML = `If that doesn't work, go to <a href='${link}'><em>this link</em></a>`;
        location.href = link;
        redirected = true;
        break;
      }
    }
  }

  if (!redirected) {
    doc.id("text").innerHTML = `Try typing in the URL properly instead of <em>${path ? F.htmlEscape(decodeURI(path)) : "whatever"}</em>`;
    doc.id("header").innerText = "404 - The funny not found";
  }

  defaults.nice();
}
