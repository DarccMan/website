function init() {
  output_gen();
}
function output_clear() {
  doc.id("output_table").innerHTML = "";
}
var un;
function output_gen() {
  for (i = 0; i < Object.keys(data).length; i++) {
    var choice = F.randomInt(1, (Object.values(data)[i].length - 1));
    var el = [
      '<tr id="output_{id}">',
      '  <th>',
      '    {name}',
      '  </th>',
      '  <td>',
      '    {value}',
      '  </td>',
      '</tr>'
    ].join("").format({
      id: Object.keys(data)[i],
      name: Object.values(data)[i][0],
      value: Object.values(data)[i][choice],
    });
    document.getElementById("output_table").innerHTML += el;
  }
  un = "";
  var noun = nouns[F.randomInt(0, nouns.length - 1)];
  var adjective = adjectives[F.randomInt(0, adjectives.length - 1)];
  un = un + adjective[0].toUpperCase() + adjective.substring(1, adjective.length);
  addChar();
  un = un + noun[0].toUpperCase() + noun.substring(1, noun.length);
  addChar();
  for (i = 0; i < F.randomInt(0, 3); i++) {
    un = un + F.randomInt(0, 9);
  }
  var el = [
    '<tr id="output_un">',
    '  <th>',
    '    Username',
    '  </th>',
    '  <td>',
    '    {value}',
    '  </td>',
    '</tr>'
  ].join("").format({
    value: un,
  });
  document.getElementById("output_table").innerHTML += el;
}
function addChar() {
  var chars = ["", "", "_", "."];
  var charNum = F.randomInt(0, chars.length - 1);
  un = un + chars[charNum];
}