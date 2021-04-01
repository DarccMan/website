function gen() {
  output = F.randomChoice(templates.base);
  amount = output.split("<").length;
  for (i = 1; i < output.split("<").length; i++) {
    value = output.split("<")[i]?.split(">")[0];
    output = output.replace("<" + value + ">", F.randomChoice(templates[value]));
    i--;
  }

  doc.id("output").innerText = output.capWords();
}
gen();