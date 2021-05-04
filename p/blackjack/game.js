var canvas = doc.create("canvas");
canvas.id = "canvas";
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("oncontextmenu", "return(false);");
doc.id("canvas_contain").appendChild(canvas);
var ctx = canvas.getContext("2d");

var gameState = "start";
var cards = null;

class Card {
  constructor(value, suit) {
    this.vn = value;
    this.sn = suit;
    this.vc = data.values[value];
    this.sc = "DHCS"[suit];
    this.si = data.suits[this.sc];
    this.b = suit > 1;
  }
}

function reset() {
  cards = {};
  deck = [];
  for (v = 1; v < 14; v++) {
    for (s = 0; s < 4; s++) {
      deck.push(new Card(v, s));
    }
  }
  deck.shuffle();
  cards.p1 = deck.sub(0, 2);
  cards.p2 = deck.sub(0, 2);
  cards.p1[0] = new Card(1, 1);
  cards.deck = deck.sub(0, -5);
  
  gameState = "play";
}

function render() {
  ctx.fillCanvas(color.background);
  w = (canvas.width / (data.card_size + 1) - 2) * 0.8;
  h = w * data.card_ratio;
  
  if (cards.deck.length > 0) {
    drawCard(
      (canvas.width - w) / 2,
      (canvas.height - h) / 2,
      null,
      1,
    );
  } else {
    drawCard(
      (canvas.width - w) / 2,
      (canvas.height - h) / 2,
      null,
      2,
    );
  }

  total = 0;
  ace = false;
  for (i = 0; i < cards.p1.length; i++) {
    if (i < 21) {
      x = i;
      y = 1.25;
      if (i >= 7) {
        x = i - 6.9;
        y = 0.75;
        if (i >= 14) {
          x = i - 13.8;
          y = 0.25;
        }
      }
      drawCard(
        30 + ((w + 15) * x),
        (canvas.height / 1.25) + 20 - (h * y),
        cards.p1[i],
      );
    }
    total += cards.p1[i].vn.setBorder(1, 10);
    
    if (cards.p1[i].vn == 1) {
      if (!ace) {
        ace = true;
      }
    }
  }

  if (doc.id("showTotal").checked) {
    ctx.font = "32px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "black";
    ctx.fillText(
      "Total: {0}".format(total),
      40,
      (canvas.height / 1.5) - (h / 2),
    );

    if (ace && total + 10 <= 21) {
      ctx.font = "32px Arial";
      ctx.textAlign = "left";
      ctx.fillStyle = "black";
      ctx.fillText(
        "Ace Total: {0}".format(total + 10),
        300,
        (canvas.height / 1.5) - (h / 2),
      );
    }
  }

  for (i = 0; i < Math.min(9, cards.p2.length); i++) {
    drawCard(
      30 + (w * i),
      (canvas.height / 4) - (h / 2),
      null,
      1,
    );
  }
}

function main() {
  update((Date.now() - then) / 1000);
  render();
  then = Date.now();
  requestAnimationFrame(main);
}
function update(mod) {
  if (gameState == "play") {
    
  }
}

var then = Date.now();
reset();
main();

function drawCard(x, y, card, style) {
  if (style == 1) {
    // Upside down card
    ctx.fillStyle = color.card;
    ctx.fillRoundRect(
      x,
      y,
      w,
      h,
      4,
    );
    ctx.fillStyle = color.card_back;
    ctx.fillRoundRect(
      x + data.card_border,
      y + data.card_border,
      w - (data.card_border * 2),
      h - (data.card_border * 2),
      4,
    );
  } else if (style == 2) {
    // Empty card slot
    ctx.fillStyle = color.card_empty;
    ctx.fillRoundRect(
      x,
      y,
      w,
      h,
      4,
    );
  } else if (style == 3) {
    // Predicted card drop
    ctx.fillStyle = color.card_drop;
    ctx.fillRoundRect(
      x,
      y,
      w,
      h,
      4,
    );
  } else {
    // Normal card
    ctx.fillStyle = color.card_outline;
    ctx.fillRoundRect(
      x,
      y,
      w,
      h,
      4,
    );
    ctx.fillStyle = color.card;
    ctx.fillRoundRect(
      x + data.card_outline,
      y + data.card_outline,
      w - (data.card_outline * 2),
      h - (data.card_outline * 2),
      4,
    );

    suit = card.si;
    value = card.vc;
    ctx.fillStyle = card.b ? color.suit_black : color.suit_red;
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(
      value,
      x + 3,
      y + 3,
    );

    ctx.font = "bold 18px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(
      suit,
      x + w - 13,
      y,
    );

    ctx.font = "bold 32px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      suit,
      x + (w / 2),
      y + (h / 2),
    );
  }
}

function sit() {
  
}

function draw() {
  if (cards.deck.length > 0) {
    cards.p1.push(cards.deck.sub(0));
    cards.deck = F.toArray(cards.deck.sub(1, -1));
  }
}

function restart() {
  if (confirm("Are you sure?")) {
    reset();
  }
}