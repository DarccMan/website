var date = new Date();
var day = date.getDay() - 1;

function init() {
  doc.id("type").value = F.ls("type") && days[F.ls("type")] ? F.ls("type") : "classic";
  changeText();
}
function changeText() {
  text = days[doc.id("type").value][day];
  text = text ? text : "???";
  doc.id("day").innerHTML = "Today is {0}".format(text);
  doc.id("title").innerHTML = "It's {0}".format(text);
}
function setLocal() {
  F.ls("type", doc.id("type").value);
}
function changeDay(d) {
  day = d;
  changeText();
  setLocal();
}
function addDay() {
  day++;
  changeText();
  setLocal();
}