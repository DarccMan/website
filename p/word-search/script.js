function init() {
  gen();
  answer_hide();
}
function gen() {
  var then = Date.now();
  // Get the letters ect.
  var words = doc.id("words").value;
  var fillLetters = doc.id("fillLetters").value;
  if (fillLetters == "") {
    fillLetters = " ";
  }
  if (doc.id("upper").checked) {
    words = words.toUpperCase();
    fillLetters = fillLetters.toUpperCase();
  }
  words = words.split(" ");
  fillLetters = fillLetters.split("");
  var width = doc.id("width").value;
  var height = doc.id("height").value;
  if (width < Math.max(words)) {
    width = Math.max(words);
  }
  if (height < Math.max(height)) {
    height = Math.max(height);
  }
  var output = [];
  for (i = 0; i < width; i++) {
    var a = [];
    for (i2 = 0; i2 < height; i2++) {
      a.push("");
    }
    output.push(a);
  }
  // Fill in where the letters will go
  var max_tests = 1000;
  for (i = 0; i < words.length; i++) {
    var dir = F.randomChoice({
      l: doc.id("dir_l").checked,
      r: doc.id("dir_r").checked,
      u: doc.id("dir_u").checked,
      d: doc.id("dir_d").checked,
    }.ifTrue());
    // var dir = F.randomChoice(["l"]);
    var val2 = false;
    if (dir == "l") {
      for (i3 = 0; i3 < max_tests; i3++) {
        val = true;
        var c = {
          x: F.randomInt(-1, (output[0].length - words[i].length)),
          y: F.randomInt(-1, (output.length - words[i].length))
        }
        for (i2 = c.x; i2 < (c.x + words[i].length); i2++) {
          if (output[c.y] && ! ["", words[i][i2 - c.x]].includes(output[c.y][i2])) {
            val = false;
          }
        }
        if (val) {
          val2 = true;
          break;
        }
      }
      if (val2) {
        for (i2 = c.x; i2 < (c.x + words[i].length); i2++) {
          if (output[c.y]) {
            output[c.y][i2] = words[i][i2 - c.x];
          }
        }  
      } else {
        console.log("Unable to insert word! Not enough room")
      }
    } else if (dir == "r") {
      for (i3 = 0; i3 < max_tests; i3++) {
        val = true;
        var c = {
          x: F.randomInt(0, (output[0].length - words[i].length)),
          y: F.randomInt(0, (output.length - words[i].length))
        }
        for (i2 = c.x; i2 < (c.x + words[i].length); i2++) {
          if (! ["", words[i][i2 - c.x]].includes(output[c.y][(words[i].length)])) {
            val = false;
          }
        }
        if (val) {
          val2 = true;
          break;
        }
      }
      if (val2) {
        for (i2 = c.x; i2 < (c.x + words[i].length); i2++) {
          output[c.y][(words[i].length) - (i2 - c.x)] = words[i][i2 - c.x];
        }
      } else {
        console.log("Unable to insert word! Not enough room")
      }
    } else if (dir == "u") {
      for (i3 = 0; i3 < max_tests; i3++) {
        val = true;
        var c = {
          x: F.randomInt(0, (output[0].length - words[i].length)),
          y: F.randomInt(0, (output.length - words[i].length))
        }
        for (i2 = c.y; i2 < (c.y + words[i].length); i2++) {
          if (! ["", words[i][i2 - c.y]].includes(output[i2][c.x])) {
            val = false;
          }
        }
        if (val) {
          val2 = true;
          break;
        }
      }
      if (val2) {
        for (i2 = c.y; i2 < (c.y + words[i].length); i2++) {
          output[i2][c.x] = words[i][i2 - c.y];
        }
      } else {
        console.log("Unable to insert word! Not enough room")
      }
    } else if (dir == "d") {
      for (i3 = 0; i3 < max_tests; i3++) {
        val = true;
        var c = {
          x: F.randomInt(0, (output[0].length - words[i].length)),
          y: F.randomInt(0, (output.length - words[i].length))
        }
        for (i2 = c.y; i2 < (c.y + words[i].length); i2++) {
          if (! ["", words[i][i2 - c.y]].includes(output[(words[i].length) - (i2 - c.y)][c.x])) {
            val = false;
          }
        }
        if (val) {
          val2 = true;
          break;
        }
      }
      if (val2) {
        for (i2 = c.y; i2 < (c.y + words[i].length); i2++) {
          output[(words[i].length) - (i2 - c.y)][c.x] = words[i][i2 - c.y];
        }
      } else {
        console.log("Unable to insert word! Not enough room")
      }
    }
  }
  // Fill in the rest of the table with letters
  F.send(JSON.stringify(output), "output_raw");
  for (i = 0; i < output.length; i++) {
    for (i2 = 0; i2 < output[i].length; i2++) {
      if (output[i][i2] == "") {
        output[i][i2] = F.randomChoice(fillLetters);
      }
    }
  }
  // Delete cells from the table to reset it
  for (i = 0; i < doc.id("output").childNodes.length; i++) {
    doc.id("output").removeChild(doc.id("output").childNodes[i]);
  }
  for (i = 0; i < doc.id("output2").childNodes.length; i++) {
    doc.id("output2").removeChild(doc.id("output2").childNodes[i]);
  }
  // Output the table
  for (i = 0; i < output.length; i++) {
    var a = "<tr>";
    for (i2 = 0; i2 < output[i].length; i2++) {
      a = a + "<td>{0}</td>".format(output[i][i2]);
    }
    a = a + "</tr>";
    $("#output").append(a);
  }
  // Output table without fill letters
  output_raw = JSON.parse(F.reach("output_raw"));
  for (i = 0; i < output_raw.length; i++) {
    var a = "<tr>";
    for (i2 = 0; i2 < output_raw[i].length; i2++) {
      a = a + '<td {0}>{1}</td>'.format(output_raw[i][i2] == "" ? 'style="filter:brightness(80%);"' : "", output_raw[i][i2]);
    }
    a = a + "</tr>";
    $("#output2").append(a);
  }
  console.log("Complete in {0}s".format((Date.now() - then) / 1000));
}
function copy() {
  var table = doc.id("output");
  output = "";
  for (i = 0; i < table.firstChild.childNodes.length; i++) {
    for (i2 = 0; i2 < table.firstChild.childNodes[i].childNodes.length; i2++) {
      output = output + (table.firstChild.childNodes[i].childNodes[i2].innerHTML) + "\t";
    }
    output = output + "\n"
  }
  F.copy(output);
}
function answer_show() {
  doc.id("output").style.display = "none";
  doc.id("output2").style.display = "block";
}
function answer_hide() {
  doc.id("output").style.display = "block";
  doc.id("output2").style.display = "none";
}