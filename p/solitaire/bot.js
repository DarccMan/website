var doBot = false;
// doBot = true;

function showBot() {
  doc.id("botBtn").style.display = "block";
}

function step() {
  if (!doBot) {
    return;
  }
  I: for (x1 = 0; x1 < cards.table.length; x1++) {
    for (x2 = 0; x2 < cards.table.length; x2++) {
      if (x1 == x2) {
        continue;
      }
      c1 = cards.table[x1].up.s(0);
      if (!c1 || !c1.split) {
        continue;
      }
      c1 = c1.split("-");
      c2 = cards.table[x2].up.s(-1);
      if (!c2 || !c2.split) {
        continue;
      }
      c2 = c2.split("-");

      if (
        (
          c2
          && F.operate.logic.xor(
            "DH".split("").includes(c1[1]),
            "DH".split("").includes(c2[1]),
          )
          && parseInt(c2[0]) - 1 == c1[0]
        )
      ) {

        cards.table[x2].up = F.joinArray(cards.table[x2].up, F.toArray(cards.table[x1].up.s(-1), -1));
        cards.table[x1].up = F.toArray(cards.table[x1].up.s(0, cards.table[x1].up.length - 1));
        if (cards.table[x1].up == undefined) {
          cards.table[x1].up = [];
        }
        gameUpdate();

        break I;
      }
    }
  }
}

step();