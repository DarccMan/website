function init() {
  convert();
}
init();

function randomChar() {
  type = [];
  if (doc.id("type_top").checked) {
    type.push("top");
  }
  if (doc.id("type_middle").checked) {
    for (k = 0; k < 2; k++) {
      type.push("middle");
    }
  }
  if (doc.id("type_bottom").checked) {
    type.push("bottom");
  }
  if (type.length > 0) {
    return String.fromCharCode("0x" + F.randomChoice(chars[F.randomChoice(type)]));
    // return F.randomChoice(chars[F.randomChoice(type)]);
  }
  return "";
}

function convert() {
  output = "";
  input = doc.id("input").value;
  for (i = 0; i < input.length; i++) {
    output += input[i];
    if (doc.id("include").checked || !blacklist.includes(input[i])) {
      for (j = 0; j < parseInt(doc.id("amount").value); j++) {
        output += randomChar();
      }
    }
  }
  doc.id("output").value = output;
}

function copy() {
  F.copy(doc.id("output").value);
}

function tube() {
  doc.id("input").value = doc.id("output").value;
}