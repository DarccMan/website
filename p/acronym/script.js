function init() {
  doc.id("input").innerHTML = F.randomChoice([
    "acronym",
    "supercool",
    "gaming",
    "nice",
    "website",
    "poopy",
    "heckdude",
  ]).upper();
}
function gen() {
  var input = doc.id("input").value.lower();
  doc.id("output").value = ""
  for (i = 0; i < input.length; i++) {
    valWords = [];
    for (i2 = 0; i2 < words.length; i2++) {
      if (words[i2][0] == input[i]) {
        valWords.push(words[i2]);
      }
    }
    word = F.randomChoice(valWords);
    if (word) {
      word = word.capWords();
    } else {
      word = input[i];
    }
    doc.id("output").value = doc.id("output").value + word + "\n";
  }
}