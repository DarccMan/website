function init() {
  ls.check();

  doc.id("link").href = "https://epicwebsite.github.io".format(
    F.url.online ? "" : "/index.html"
  );

  path = F.url.filepath;
  redirected = false;

  for (o = 0; o < links.keys().length; o++) {
    for (l = 0; l < links.values()[o].items.length; l++) {
      if (
        path.split("/")[0] == links.values()[o].items[l].id
        || (
          links.values()[o].items[l].alias
          && (
            links.values()[o].items[l].alias.includes(path.split("/")[0])
            || links.values()[o].items[l].alias.includes(path.split("/p/")[0])
          )
        )
      ) {
        link = "https://epicwebsite.github.io/p/{0}{1}".format(
          links.values()[o].items[l].id,
          F.url.queryRaw.length > 0 ? "?" + F.url.queryRaw : ""
        );
        doc.id("header").innerText = "Redirecting...";
        doc.id("text").innerHTML = "If that doesn't work, go to <a href='{0}'><em>this link</em></a>".format(link);
        location.href = link;
        redirected = true;
        break;
      }
    }
  }

  if (!redirected) {
    doc.id("text").innerHTML = 'Try typing in the URL properly instead of <em>{0}</em>'.format(path ? decodeURI(path).htmlEscape() : "whatever that is");
    doc.id("header").innerText = "404 - The funny not found";
  }

  defaults.nice();
}