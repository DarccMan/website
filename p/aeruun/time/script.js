change();

function change() {
  hn = parseInt(doc.id("hour").value) || 0;
  mn = parseInt(doc.id("minute").value) || 0;
  sn = parseInt(doc.id("second").value) || 0;
  ln = 0;

  if (hn > 23) {
    hn = 24 - hn;
  }
  if (mn > 59) {
    mn = 60 - mn;
  }
  if (sn > 59) {
    sn = 60 - sn;
  }

  if (hn < 0) {
    hn = 22 - hn;
  }
  if (mn < 0) {
    mn = 58 - mn;
  }
  if (sn < 0) {
    sn = 58 - sn;
  }

  doc.id("hour").value = hn;
  doc.id("minute").value = mn;
  doc.id("second").value = sn;


  h = hn * (16 / 24);
  ho = h - Math.floor(h);
  h -= ho;

  m = mn + ho;
  m *= (64 / 60);
  mo = m - Math.floor(m);
  m -= mo;

  s = sn + mo * 60;
  s *= (64 / 60);
  so = s - Math.floor(s);
  s -= so;

  l = so * 1000;

  doc.id("output_h").value = "{0} : {1} : {2} . {3}".format(h, m, s, Math.round(l / 10));


  h = hn * (16 / 24);
  ho = h - Math.floor(h);
  h -= ho;

  m = mn + ho;
  m *= (64 / 60);
  mo = m - Math.floor(m);
  m -= mo;

  s = sn + mo * 60;
  s *= (64 / 60);
  so = s - Math.floor(s);
  s -= so;

  l = so * 1000;

  h = h.toString(16).upper();
  m = m.toString(16).upper();
  s = s.toString(16).upper();
  m = m.toString(16).upper();

  doc.id("output_h2").value = "{0} : {1} : {2} . {3}".format(h, m, s, Math.round(l / 10));


  h = hn * (10 / 24);
  ho = h - Math.floor(h);
  h -= ho;

  m = mn + ho;
  m *= (100 / 60);
  mo = m - Math.floor(m);
  m -= mo;

  s = sn + mo * 60;
  s *= (100 / 60);
  so = s - Math.floor(s);
  s -= so;

  l = so * 1000;

  doc.id("output_d").value = "{0} : {1} : {2} . {3}".format(h, m, s, Math.round(l / 10));
}

live_change();
var live_interval = null;
function live_update() {
  if (doc.id("live").checked) {
    d = new Date();
    doc.id("hour").value = d.getHours();
    doc.id("minute").value = d.getMinutes();
    doc.id("second").value = d.getSeconds();
    change();
    live_interval = setTimeout(live_update, 100);
  }
}
function live_change() {
  if (doc.id("live").checked) {
    els = doc.class("input");
    for (i = 0; i < els.length; i++) {
      els[i].disabled = true;
    }
    live_update();
  } else {
    els = doc.class("input");
    for (i = 0; i < els.length; i++) {
      els[i].disabled = false;
    }
  }
}