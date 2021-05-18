function init() {
  changeInverse();
  changeUnit();
  changeFunction();
}

var unit = [];
function changeUnit() {
  value = null;
  for (i = 1; i < doc.id("units").childNodes.length; i += 2) {
    if (doc.id("units").childNodes[i].childNodes[1].checked) {
      value = doc.id("units").childNodes[i].childNodes[1].value;
    }
  }
  unit = {
    name: value,
    value: data.units[value]
  };

  calc();
}

var func = null;
function changeFunction() {
  value = null;
  for (i = 1; i < doc.id("functions").childNodes.length; i += 2) {
    if (doc.id("functions").childNodes[i].childNodes[1].checked) {
      value = doc.id("functions").childNodes[i].childNodes[1].value;
    }
  }
  func = value;

  calc();
}

var inverse = false;
function changeInverse() {
  doc.id("inverse_0").style.display = "none";
  doc.id("inverse_1").style.display = "none";
  if (doc.id("inverse").checked) {
    doc.id("inverse_1").style.display = "block";
  } else {
    doc.id("inverse_0").style.display = "block";
  }
}

function calc() {
  angle = parseFloat(doc.id("angle").value);
  if (angle) {
    if (Math[func]) {
      output = Math[func](angle * unit.value);
      console.log(output);
    }
  }
}