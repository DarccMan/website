function init() {
  randomGen();
  submit();
}
function order (str) {
  if (str[0].lower() == str[0]) {
    return (str[1] + str[0]);
  }
  return (str);
}

class Punnet {
  constructor(male, female) {
    let alChar = F.randomChoice(F.chars.lower);
    if (!male || male.length != 2) {
      if (female && female.length == 2) {
        alChar = female[0].lower();
      }
      let al = F.randomChoice([alChar, alChar.upper()]) + F.randomChoice([alChar, alChar.upper()]);
      male = al;
      doc.id("male").value = al;
    }
    if (!female || female.length != 2) {
      if (male && male.length == 2) {
        alChar = male[0].lower();
      }
      let al = F.randomChoice([alChar, alChar.upper()]) + F.randomChoice([alChar, alChar.upper()]);
      female = al;
      doc.id("female").value = al;
    }

    male = order(male);
    female = order(female);
    this.male = male;
    this.female = female;

    let raw = [
      order(female[0] + male[0]),
      order(female[0] + male[1]),
      order(female[1] + male[0]),
      order(female[1] + male[1]),
    ];

    this.showPunnet = "  {mA0}  {mA1}\n{fA0} {p0} {p1}\n{fA1} {p2} {p3}".format({
      mA0: male[0],
      mA1: male[1],
      fA0: female[0],
      fA1: female[1],
      p0: raw[0],
      p1: raw[1],
      p2: raw[2],
      p3: raw[3],
    });
    this.elPunnet = [
      '<tr>',
      '  <th></th>',
      '  <th>{mA0}</th>',
      '  <th>{mA1}</th>',
      '</tr>',
      '<tr>',
      '  <th>{fA0}</th>',
      '  <td>{p0}</td>',
      '  <td>{p1}</td>',
      '</tr>',
      '<tr>',
      '  <th>{fA1}</th>',
      '  <td>{p2}</td>',
      '  <td>{p3}</td>',
      '</tr>',
    ].join("").format({
      mA0: male[0],
      mA1: male[1],
      fA0: female[0],
      fA1: female[1],
      p0: raw[0],
      p1: raw[1],
      p2: raw[2],
      p3: raw[3],
    });
    this.raw = raw;

    let dom = [];
    let rec = [];
    for (let i = 0; i < raw.length; i++) {
      if (raw[i].lower() != raw[i]) {
        dom.push(raw[i]);
      } else {
        rec.push(raw[i]);
      }
    }

    this.chance = {
      dominant: (dom.length / (dom.length + rec.length)) * 100,
      recessive: (rec.length / (dom.length + rec.length)) * 100,
    };
  }
  makeChild() {
    return (F.randomChoice(this.raw));
  }
}

var punnet;
var children;

async function submit() {
  m = doc.id("male").value;
  f = doc.id("female").value;
  punnet = new Punnet(m, f);
  children = [];

  doc.id("chance_p").value = punnet.chance.dominant;
  doc.id("chance_p_perc").innerHTML = punnet.chance.dominant + "%";
  doc.id("punnet").innerHTML = punnet.elPunnet;
}

function makeChild() {
  if (punnet) {
    child = punnet.makeChild();
    let name = F.randomChoice(names);
    let el = [
      '<tr>',
      '  <th>#{num}</th>',
      '  <td>{gen}</td>',
      '  <td>{trait}</td>',
      '  <td>{name}</td>',
      '</tr>',
    ].join("").format({
      num: children.length + 1,
      gen: child,
      trait: (child.lower() != child) ? "Dominant" : "Recessive",
      name: name,
    });
    $("#children").append(el);
    children.push(child);

    let dom = [];
    let rec = [];
    for (let i = 0; i < children.length; i++) {
      if (children[i].lower() != children[i]) {
        dom.push(children[i]);
      } else {
        rec.push(children[i]);
      }
    }
    doc.id("chance_r").value = (dom.length / (dom.length + rec.length)) * 100;
    doc.id("chance_r_perc").innerHTML = ((dom.length / (dom.length + rec.length)) * 100).round() + "%";
  }
}
function randomGen() {
  let alChar = F.randomChoice(F.chars.lower);
  doc.id("male").value = order(F.randomChoice([alChar, alChar.upper()]) + F.randomChoice([alChar, alChar.upper()]));
  doc.id("female").value = order(F.randomChoice([alChar, alChar.upper()]) + F.randomChoice([alChar, alChar.upper()]));
  submit();
}
var deleting = false;
var running = false;
async function makeChildren() {
  let amount = doc.id("children_amount").value;
  running = true;
  for (i = 0; i < amount; i++) {
    if (deleting) {
      deleting = false;
      break;
    }
    await F.sleep(0.05);
    makeChild();
  }
  deleting = false;
  running = false;
}
async function deleteChildren() {
  if (running) {
    deleting = true;
  }
  await F.sleep(0.1);
  doc.id("children").innerHTML = [
    '<tr>',
    '  <th>Child</th>',
    '  <th>Genotypes</th>',
    '  <th>Trait</th>',
    '  <th>Name</th>',
    '</tr>',
  ].join("");
  children = [];
}