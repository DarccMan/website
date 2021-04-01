pos = [0, 0];
function show() {
  doc.id("header").innerText = bible[pos[0]][0];
  doc.id("number").innerText = bible[pos[0]][1].keys()[pos[1]];
  doc.id("text").innerText = bible[pos[0]][1].values()[pos[1]];
  doc.id("input").placeholder = bible[pos[0]][1].values()[pos[1]].truncate(30, "...");
}
show();

output = [];
function set() {
  output
}