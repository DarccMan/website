// Do not edit
var progress = [
  "Locating CPU...",
  "CPU Located...",
  "Accessing cores...",
  "Delivering ram.exe",
  "Splitting code",
  "Optimizing...",
  "Activating cur.br...",
  "Testing drive...",
  "Running valve decompression...",
  "Changing CPU construct...",
  "Updating pylons...",
  "Finalising tests..."
]
// Do not edit
async function test() {
  doc.id("text").innerHTML = progress[0];
  doc.id("button").disabled = true;
  for (i = 0; i < progress.length; i++) {
    await F.sleep(F.randomInt(5, 20) / 10);
    doc.id("text").innerHTML = progress[i];
  }
  displayResults();
}
// Do not edit
values = [
  [-100, "It is a wonder your computer actually works"],
  [0, "That is terrible"],
  [4, "That is below average"],
  [8, "That is not great"],
  [16, "That is decent"],
  [32, "That is pretty good"],
  [100, "That is great"]
]
// Do not edit
async function displayResults() {
  var result = F.randomInt(20, 120) / 10;
  doc.id("text").innerHTML = "Ram: {0}GB".format(result);
  var ret = null;
  for (i = 0; i < values.length; i++) {
    if (ret == null) {
      if (result >= values[i][0]) {
        if ((i + 1) < values.length) {
          if (result < values[i + 1][0]) {
            ret = values[i][1];
          }
        } else {
          ret = values[i][1];
        }
      }
    }
  }
  doc.id("text2").innerHTML = ret != null ? ret : "I don't know";
  await F.sleep(0.5);
  doc.id("download").style.visibility = "visible";
  doc.id("button").disabled = false;
}