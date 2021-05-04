var now = new Date();
var updater;
function init() {
  for (i = 0; i < bars.length; i++) {
    var el = [
      '<section>',
      '<progress class="progress" id="progress_{id}" value="{value}" max="{max}"></progress>',
      '<h1>{text}</h1>',
      '<h2>{value} / {max}</h2>',
      '<h2>{perc}%</h2>',
      '</section>',
    ].join("").format({
      id: bars[i].id,
      value: bars[i].value(),
      max: bars[i].max,
      text: bars[i].text,
      perc: (Math.round((bars[i].value() / bars[i].max) * 10000) / 100),
    });
    $("#content").append(el);
  }
  updater = setInterval(() => {
    now = new Date();
    doc.id("content").removeChildren();
    for (i = 0; i < bars.length; i++) {
      var el = [
        '<section>',
        '<progress class="progress" id="progress_{id}" value="{value}" max="{max}"></progress>',
        '<h1>{text}</h1>',
        '<h2>{value} / {max}</h2>',
        '<h2>{perc}%</h2>',
        '</section>',
      ].join("").format({
        id: bars[i].id,
        value: bars[i].value(),
        max: bars[i].max,
        text: bars[i].text,
        perc: (Math.round((bars[i].value() / bars[i].max) * 10000) / 100),
      });
      $("#content").append(el);
    }
    doc.id("time").innerHTML = now.toString().split("(").s(0, -2);
    doc.id("date").innerHTML = now.getTime();
    doc.id("bin").innerHTML = F.dec_bin(now.getTime());
  }, 10);
}