const F = require("fnct");
const fs = require("fs");
const path = require("path");

(async () => {
  old = fs.readFileSync(path.join(__dirname, "bible.txt")).toString().split("\r\n".repeat(5));
  output = [];

  for (i = 0; i < old.length; i++) {
    chapter = old[i].split("\r\n\r\n");
    output[i] = [
      chapter[0].replace(/(\r\n|\n|\r)/gm, ""),
      {},
    ];
    for (j = 1; j < chapter.length; j++) {
      chapter[j] = chapter[j].replace(/(\r\n|\n|\r)/gm, "");
      if (!chapter[j]) {
        continue;
      }
      output[i][1][chapter[j].split(" ").sub(0)] = chapter[j].split(" ").sub(1, -1).join(" ");
    }
  }

  fs.writeFileSync(path.join(__dirname, "new.json"), JSON.stringify(output, null, 0));
})();