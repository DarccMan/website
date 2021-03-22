var av = {
  months: 12,
  days: 30.46,
  days2: 365,
}
var date = "2019-02-15";
function init() {
  mod_change();
  input_change();
  doc.id("i_years").value = getDateDiff(date).years;
  doc.id("i_months").value = getDateDiff(date).months;
  doc.id("i_days").value = getDateDiff(date).days;
  calc();
}
function getDateDiff(date) {
  var d = new Date();
  date = date.split("-");
  years = d.getFullYear() - parseInt(date[0]);
  months = d.getMonth() - parseInt(date[1]);
  days = d.getDate() - parseInt(date[2]);
  if (months < 0) {
    months = Math.round(av.months + months);
    years--;
  }
  if (days < 0) {
    days = Math.round(av.days + days);
  }
  return ({
    years: years,
    months: months,
    days: days,
  });
}
function calc() {
  if ([null, undefined, ""].includes(doc.id("i_years").value)) {
    doc.id("i_years").value = getDateDiff(date).years;
  }
  if ([null, undefined, ""].includes(doc.id("i_months").value)) {
    doc.id("i_months").value = getDateDiff(date).months;
  }
  if ([null, undefined, ""].includes(doc.id("i_days").value)) {
    doc.id("i_days").value = getDateDiff(date).days;
  }

  var years = parseInt(doc.id("i_years").value);
  var months = parseInt(doc.id("i_months").value);
  var days = parseInt(doc.id("i_days").value);
  if (doc.id("input_type").value == "bday") {
    var date = doc.id("i_date").value;
    years = getDateDiff(date).years;
    months = getDateDiff(date).months;
    days = getDateDiff(date).days;
  }
  if (doc.id("mod").value.split("_").s(0) == "other") {
    var mod = parseInt(doc.id("i_mod").value);
  } else {
    var mod = parseInt(doc.id("mod").value.split("_").s(0));
  }

  days += (months * av.days);
  months = 0;
  months = (years * av.months);
  years = 0;
  days += (months * av.days);
  months = 0;
  days *= mod;
  years = Math.floor(days / av.days2);
  days = days - (av.days2 * years);
  months = Math.floor(days / av.days);
  days = days - (av.days * months);
  days = Math.round(days);

  output = "Your {0} is {1} year{2}, {3} month{4}, {5} day{6}".format(
    doc.id("mod").value.split("_")[1],
    years,
    (years == 1) ? "" : "s",
    months,
    (months == 1) ? "" : "s",
    days,
    (days == 1) ? "" : "s",
  );
  doc.id("output").innerHTML = output;

  d = new Date();
  if (
    parseInt(doc.id("i_date").value.split("-")[2]) == d.getDate()
    && parseInt(doc.id("i_date").value.split("-")[1]) == (d.getMonth() + 1)
  ) {
    doc.id("bday_h").style.display = "block";
  } else {
    doc.id("bday_h").style.display = "none";
  }
  if (
    months == 0
    && days == 0
  ) {
    doc.id("bday_d").style.display = "block";
  } else {
    doc.id("bday_d").style.display = "none";
  }
}
function mod_change() {
  if (doc.id("mod").value == "other") {
    doc.id("i_mod").style.display = "block";
  } else {
    doc.id("i_mod").style.display = "none";
  }
  doc.id("animal").innerHTML = doc.id("mod").value.split("_").s(-1);
}
function input_change() {
  if (doc.id("input_type").value == "bday") {
    doc.id("input_bday").style.display = "block";
    // doc.id("input_age").style.display = "none";
  } else {
    doc.id("input_age").style.display = "block";
    // doc.id("input_bday").style.display = "none";
  }
}

function bday_change() {
  doc.id("i_years").value = getDateDiff(doc.id("i_date").value).years;
  doc.id("i_months").value = getDateDiff(doc.id("i_date").value).months;
  doc.id("i_days").value = getDateDiff(doc.id("i_date").value).days;
}
function age_change() {

}