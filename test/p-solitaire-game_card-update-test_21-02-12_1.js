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
    this.scs = data.suits[this.sc];
    this.si = data.suits[this.sc];
    this.b = suit > 1;
  }
}

function reset() {
  cards = {
    table: [],
    deck: {
      down: [],
      up: [],
    },
    aces: [],
    selected: null,
  };
  deck = [];
  for (v = 1; v < 14; v++) {
    for (s = 0; s < 4; s++) {
      deck.push(new Card(v, s));
    }
  }
  deck = deck.shuffle();
  for (c = 0; c < data.columns; c++) {
    down = [];
    for (j = 0; j < c; j++) {
      down.push(deck[0]);
      deck = deck.s(1, -1);
    }
    up = [deck[0]];
    // Reset
    if (c == 3) {
      up = [new Card(4, 1)];
    }
    if (c == 2) {
      up = [new Card(3, 2)];
    }
    deck = deck.s(1, -1);
    cards.table.push({
      down,
      up,
    });
  }
  for (i = 0; i < 4; i++) {
    cards.aces[i] = [];
  }
  cards.deck.down = deck;

  gameUpdate();
  gameState = "play";
}

function render() {
  ctx.fillCanvas(color.background);

  width = canvas.width / (data.columns + 1) - 2;
  for (c = 0; c < cards.table.length; c++) {
    drawCard(
      (c * width) + 7,
      10,
      null,
      2,
    );
    if (!(cards.table[c].down.length < 1 && cards.table[c].up.length < 1)) {
      for (i = 0; i < cards.table[c].down.length; i++) {
        drawCard(
          (c * width) + 7,
          i * ((canvas.height / 2) / data.card_amount) + 10,
          cards.table[c].down[i],
          1,
        );
      }
      for (i = 0; i < cards.table[c].up.length; i++) {
        if (
          F.buttonDown(0)
          && cards.selected
          && cards.selected.stack
          && cards.selected.stack.split("-")[0] == "t"
          && parseInt(cards.selected.stack.split("-")[1]) == c
          && cards.table[c].up.length - parseInt(cards.selected.stack.split("-")[2]) <= i
        ) {
          continue;
        }

        drawCard(
          (c * width) + 7,
          (cards.table[c].down.length + i) * ((canvas.height / 2) / data.card_amount) + 10,
          cards.table[c].up[i],
        );
      }
    }
  }

  for (c = 0; c < cards.aces.length; c++) {
    drawCard(
      (data.columns + 0.2) * width,
      (c * 100) + 10,
      null,
      2,
    );
    if (cards.aces[c].length > 0) {
      t = -1;
      if (
        F.buttonDown(0)
        && cards.selected
        && cards.selected.stack
        && cards.selected.stack.split("-")[0] == "a"
        && c == parseInt(cards.selected.stack.split("-")[1])
      ) {
        t--;
        if (cards.aces[c].length <= 1) {
          continue;
        }
      }
      drawCard(
        (data.columns + 0.2) * width,
        (c * 100) + 10,
        cards.aces[c].s(t),
      );
    }
  }

  drawCard(
    (4 * width) + 7,
    canvas.height - (width * 0.8 * data.card_ratio) - 30,
    null,
    2,
  );
  if (cards.deck.down.length > 0) {
    drawCard(
      (4 * width) + 7,
      canvas.height - (width * 0.8 * data.card_ratio) - 30,
      null,
      1,
    );
  }
  if (cards.deck.up.length > 0) {
    for (c = Math.max(0, cards.deck.up.length - 3); c < cards.deck.up.length; c++) {
      if (
        F.buttonDown(0)
        && cards.selected
        && cards.selected.stack
        && cards.selected.stack.split("-")[0] == "d"
        && c == cards.deck.up.length - 1
      ) {
        continue;
      }
      drawCard(
        ((((c - cards.deck.up.length + 1) / 2) + 2.5) * width) + 7,
        canvas.height - (width * 0.8 * data.card_ratio) - 30,
        cards.deck.up[c],
      );
    }
  }

  ctx.fillStyle = color.button_background;
  ctx.fillRoundRect(
    canvas.width - 110,
    canvas.height - 60,
    90,
    40,
    6,
  );
  ctx.fillStyle = color.button_text;
  ctx.font = "20px Arial"
  ctx.fillText(
    "Give Up",
    canvas.width - 65,
    canvas.height - 40,
  );

  if (cards.selected) {
    if (!F.buttonDown(0)) {
      ctx.strokeStyle = color.card_hover;
      ctx.lineWidth = 4;
      ctx.strokeRoundRect(
        cards.selected.x,
        cards.selected.y,
        cards.selected.w,
        cards.selected.h,
        4,
      );
    } else {
      if (cards.selected.stack) {
        if (cards.selected.stack.split("-")[0] == "t") {
          w = canvas.width / (data.columns + 1) - 2;
          c = parseInt(cards.selected.stack.split("-")[1]);

          if (F.mouse.x < w * data.columns) {
            ctx.fillStyle = color.card_drop;
            x = ((F.mouse.x - cards.selected.rx) / (canvas.width / (data.columns + 1) - 2)).round().setBorder(0, data.columns - 1);
            ctx.fillRoundRect(
              x * (canvas.width / (data.columns + 1) - 2) + 7,
              (cards.table[x].down.length + (cards.table[x].up.length - ((x == cards.selected.stack.split("-")[1]) ? parseInt(cards.selected.stack.split("-")[2]) : 0))) * ((canvas.height / 2) / data.card_amount) + 10,
              w * 0.8,
              ((w * 0.8) * data.card_ratio) + (parseInt(cards.selected.stack.split("-")[2] - 1) * ((canvas.height / 2) / data.card_amount)),
              4,
            );
          } else {
            drawCard(
              (data.columns + 0.2) * w,
              (
                (
                  F.mouse.y - 50 - (
                    cards.selected.ry
                  ) + (
                    (
                      canvas.width / (
                        data.columns + 1
                      ) - 2
                    ) * 0.4 * data.card_ratio
                  ) + (
                    (
                      (
                        cards.table[
                          cards.selected.stack.split("-")[1]
                        ].up.length - (
                          parseInt(cards.selected.stack.split("-")[2])
                        )
                      ) * (
                        (canvas.height / 2) / data.card_amount
                      )
                    )
                  )
                ) / 100
              ).round().setBorder(0, 3) * 100 + 10,
              null,
              3,
            );
          }

          for (i = cards.table[c].up.length - parseInt(cards.selected.stack.split("-")[2]); i < cards.table[c].up.length; i++) {
            drawCard(
              (F.mouse.x - cards.selected.rx).setBorder(0, canvas.width - ((canvas.width / (data.columns + 1) - 2) * 0.8)),
              ((F.mouse.y - cards.selected.ry) + (i * ((canvas.height / 2) / data.card_amount) - 10)).setBorder(0, canvas.width - (((canvas.width / (data.columns + 1) - 2) * 0.8) * data.card_ratio)),
              cards.table[c].up[i],
            );
          }
        } else if (cards.selected.stack.split("-")[0] == "d") {
          w = canvas.width / (data.columns + 1) - 2;
          c = parseInt(cards.selected.stack.split("-")[1]);

          if (F.mouse.x < w * data.columns) {
            if (F.mouse.y < canvas.height - (width * 0.8 * data.card_ratio) - 30) {
              ctx.fillStyle = color.card_drop;
              x = ((F.mouse.x - cards.selected.rx) / (canvas.width / (data.columns + 1) - 2)).round().setBorder(0, data.columns - 1);
              ctx.fillRoundRect(
                x * (canvas.width / (data.columns + 1) - 2) + 7,
                (cards.table[x].down.length + cards.table[x].up.length) * ((canvas.height / 2) / data.card_amount) + 10,
                w * 0.8,
                (w * 0.8) * data.card_ratio,
                4,
              );
            }
          } else {
            drawCard(
              (data.columns + 0.2) * w,
              (
                (
                  F.mouse.y - 50 - (
                    cards.selected.ry
                  ) + (
                    (
                      canvas.width / (
                        data.columns + 1
                      ) - 2
                    ) * 0.4 * data.card_ratio
                  ) + (
                    (canvas.height / 2) / data.card_amount
                  )
                ) / 100
              ).round().setBorder(0, 3) * 100 + 10,
              null,
              3,
            );
          }

          drawCard(
            (F.mouse.x - cards.selected.rx).setBorder(0, canvas.width - ((canvas.width / (data.columns + 1) - 2) * 0.8)),
            (F.mouse.y - cards.selected.ry - 10).setBorder(0, canvas.width - (((canvas.width / (data.columns + 1) - 2) * 0.8) * data.card_ratio)),
            cards.deck.up.s(-1),
          );
        } else if (cards.selected.stack.split("-")[0] == "a") {
          w = canvas.width / (data.columns + 1) - 2;
          c = parseInt(cards.selected.stack.split("-")[1]);

          if (F.mouse.x < w * data.columns) {
            if (F.mouse.y < canvas.height - (width * 0.8 * data.card_ratio) - 30) {
              ctx.fillStyle = color.card_drop;
              x = ((F.mouse.x - cards.selected.rx) / (canvas.width / (data.columns + 1) - 2)).round().setBorder(0, data.columns - 1);
              ctx.fillRoundRect(
                x * (canvas.width / (data.columns + 1) - 2) + 7,
                (cards.table[x].down.length + cards.table[x].up.length) * ((canvas.height / 2) / data.card_amount) + 10,
                w * 0.8,
                (w * 0.8) * data.card_ratio,
                4,
              );
            }
          } else {
            drawCard(
              (data.columns + 0.2) * w,
              (
                (
                  F.mouse.y - 50 - (
                    cards.selected.ry
                  ) + (
                    (
                      canvas.width / (
                        data.columns + 1
                      ) - 2
                    ) * 0.4 * data.card_ratio
                  ) + (
                    (canvas.height / 2) / data.card_amount
                  )
                ) / 100
              ).round().setBorder(0, 3) * 100 + 10,
              null,
              3,
            );
          }

          drawCard(
            (F.mouse.x - cards.selected.rx).setBorder(0, canvas.width - ((canvas.width / (data.columns + 1) - 2) * 0.8)),
            (F.mouse.y - cards.selected.ry - 10).setBorder(0, canvas.width - (((canvas.width / (data.columns + 1) - 2) * 0.8) * data.card_ratio)),
            cards.aces[c].s(-1),
          );
        }
      }
    }
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
    if (F.mouse.onCanvas) {
      if (cards.selected && cards.selected.stack) {
        if (cards.selected.stack.split("-")[0] == "t") {
          if (!F.buttonDown(0)) {
            if (cards.drop) {
              cards.drop = false;

              x1 = parseInt(cards.selected.stack.split("-")[1]);
              c1 = cards.table[x1].up[cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2])];

              if (
                F.mouse.x < 20
                && F.mouse.y > canvas.height - 20
                && F.keyDown(32)
              ) {
                cards.table[x1].up = F.toArray(cards.table[x1].up.s(0, cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2])));
                if (cards.table[x1].up == undefined) {
                  cards.table[x1].up = [];
                }
              }

              // Drop
              if (F.mouse.x < (canvas.width / (data.columns + 1) - 2) * data.columns) {
                x2 = ((F.mouse.x - cards.selected.rx) / (canvas.width / (data.columns + 1) - 2)).round().setBorder(0, data.columns - 1);
                c2 = cards.table[x2].up.s(-1);
                /* if (c2 && c2.length > 0) {
                  c2 = c2.split("-");
                } */
                /* console.log(c2);
                console.log(c1);
                console.log(c2.vn - 1, c1.vn);
                console.log(
                  cards.table[x2].up.length == 0
                  , cards.table[x2].down.length == 0
                  , c1.vn == 13
                  ,
                  c2
                  , F.operate.logic.xor(
                    "DH".split("").includes(c1.sc),
                    "DH".split("").includes(c2.sc),
                  )
                  , parseInt(c2.vn) - 1 == c1.vn
                ); */

                if (
                  (
                    cards.table[x2].up.length == 0
                    && cards.table[x2].down.length == 0
                    && c1.vn == 13
                  )
                  || (
                    c2
                    && F.operate.logic.xor(
                      "DH".split("").includes(c1.sc),
                      "DH".split("").includes(c2.sc),
                    )
                    && c2.vn - 1 == c1.vn
                  )
                ) {
                  cards.table[x2].up = F.joinArray([JSON.parse(cards.table[x2].up)], F.toArray(cards.table[x1].up.s(cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2]), -1)));
                  cards.table[x1].up = F.toArray(cards.table[x1].up.s(0, cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2])));
                  if (cards.table[x1].up == undefined) {
                    cards.table[x1].up = [];
                  }
                  gameUpdate();
                }
              } else {
                x2 = (
                  (
                    F.mouse.y - 50 - (
                      cards.selected.ry
                    ) + (
                      (
                        canvas.width / (
                          data.columns + 1
                        ) - 2
                      ) * 0.4 * data.card_ratio
                    ) + (
                      (
                        (
                          cards.table[
                            cards.selected.stack.split("-")[1]
                          ].up.length - (
                            parseInt(cards.selected.stack.split("-")[2])
                          )
                        ) * (
                          (canvas.height / 2) / data.card_amount
                        )
                      )
                    )
                  ) / 100
                ).round().setBorder(0, 3);
                c2 = cards.aces[x2].s(-1);
                /* if (c2 && c2.length > 0) {
                  c2 = c2.split("-");
                } */

                if (
                  F.toArray(cards.table[x1].up.s(cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2]), -1)).length == 1 && (
                    (
                      cards.aces[x2].length == 0
                      && c1[0] == 1
                    )
                    || (
                      c2
                      && c1.s == c2.s
                      && parseInt(c2.vn) + 1 == c1.vn
                    )
                  )
                ) {
                  cards.aces[x2] = F.joinArray(cards.aces[x2], F.toArray(cards.table[x1].up.s(cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2]), -1)));
                  cards.table[x1].up = F.toArray(cards.table[x1].up.s(0, cards.table[x1].up.length - parseInt(cards.selected.stack.split("-")[2])));
                  if (cards.table[x1].up == undefined) {
                    cards.table[x1].up = [];
                  }
                  gameUpdate();
                }
              }
            }
          } else {
            cards.drop = true;
          }
        } else if (cards.selected.stack.split("-")[0] == "d") {
          if (!F.buttonDown(0)) {
            if (cards.drop) {
              cards.drop = false;

              c1 = cards.deck.up.s(-1).split("-");

              if (
                F.mouse.x < 20
                && F.mouse.y > canvas.height - 20
                && F.keyDown(32)
              ) {
                cards.deck.up = F.toArray(cards.deck.up.s(0, -2));
                if (cards.deck.up == undefined || cards.deck.up[0] == undefined) {
                  cards.deck.up = [];
                }
              }

              if (F.mouse.x < (canvas.width / (data.columns + 1) - 2) * data.columns) {
                if (F.mouse.y < canvas.height - (width * 0.8 * data.card_ratio) - 30) {
                  x2 = ((F.mouse.x - cards.selected.rx) / (canvas.width / (data.columns + 1) - 2)).round().setBorder(0, data.columns - 1);
                  c2 = cards.table[x2].up.s(-1);
                  /* if (c2 && c2.length > 0) {
                    c2 = c2.split("-");
                  } */

                  if (
                    (
                      cards.table[x2].up.length == 0
                      && cards.table[x2].down.length == 0
                      && c1.vn == 13
                    )
                    || (
                      c2
                      && F.operate.logic.xor(
                        "DH".split("").includes(c1.sc),
                        "DH".split("").includes(c2.sc),
                      )
                      && parseInt(c2.vn) - 1 == c1.vn
                    )
                  ) {
                    cards.table[x2].up = F.joinArray(cards.table[x2].up, F.toArray(cards.deck.up.s(-1)));
                    cards.deck.up = F.toArray(cards.deck.up.s(0, -2));
                    if (cards.deck.up == undefined || cards.deck.up[0] == undefined) {
                      cards.deck.up = [];
                    }
                    gameUpdate();
                  }
                }
              } else {
                x2 = (
                  (
                    F.mouse.y - 50 - (
                      cards.selected.ry
                    ) + (
                      (
                        canvas.width / (
                          data.columns + 1
                        ) - 2
                      ) * 0.4 * data.card_ratio
                    ) + (
                      (
                        (
                          1
                        ) * (
                          (canvas.height / 2) / data.card_amount
                        )
                      )
                    )
                  ) / 100
                ).round().setBorder(0, 3);
                c2 = cards.aces[x2].s(-1);
                /* if (c2 && c2.length > 0) {
                  c2 = c2.split("-");
                } */

                if (
                  (
                    cards.aces[x2].length == 0
                    && c1.vn == 1
                  )
                  || (
                    c2
                    && c1.s == c2.s
                    && parseInt(c2.vn) + 1 == c1.vn
                  )
                ) {
                  cards.aces[x2] = F.joinArray(cards.aces[x2], F.toArray(cards.deck.up.s(-1)));
                  cards.deck.up = F.toArray(cards.deck.up.s(0, -2));
                  if (cards.deck.up == undefined || cards.deck.up[0] == undefined) {
                    cards.deck.up = [];
                  }
                  gameUpdate();
                }
              }
            }
          } else {
            cards.drop = true;
          }
        } else if (cards.selected.stack.split("-")[0] == "a") {
          if (!F.buttonDown(0)) {
            if (cards.drop) {
              cards.drop = false;

              x1 = parseInt(cards.selected.stack.split("-")[1]);
              c1 = cards.aces[x1].s(-1);

              if (
                F.mouse.x < 20
                && F.mouse.y > canvas.height - 20
                && F.keyDown(32)
              ) {
                cards.aces[x1] = F.toArray(cards.aces[x1].s(0, -2));
                if (cards.aces[x1] == undefined) {
                  cards.aces[x1] = [];
                }
              }

              x2 = ((F.mouse.x - cards.selected.rx) / (canvas.width / (data.columns + 1) - 2)).round().setBorder(0, data.columns - 1);
              c2 = cards.table[x2].up.s(-1);
              /* if (c2 && c2.length > 0) {
                c2 = c2.split("-");
              } */

              if (
                (
                  cards.table[x2].up.length == 0
                  && cards.table[x2].down.length == 0
                  && c1.vn == 13
                )
                || (
                  c2
                  && F.operate.logic.xor(
                    "DH".split("").includes(c1.sc),
                    "DH".split("").includes(c2.sc),
                  )
                  && parseInt(c2[0]) - 1 == c1[0]
                )
              ) {
                cards.table[x2].up = F.joinArray(cards.table[x2].up, F.toArray(cards.aces[x1].s(-1)));
                cards.aces[x1] = F.toArray(cards.aces[x1].s(0, -2));
                if (cards.aces[x1] == undefined) {
                  cards.aces[x1] = [];
                }
                gameUpdate();
              }
            }
          } else {
            cards.drop = true;
          }
        } else if (cards.selected.stack.split("-")[0] == "f") {
          if (F.buttonDown(0)) {
            if (cards.drop) {
              cards.drop = false;

              c = parseInt(cards.selected.stack.split("-")[1]);
              cards.table[c].up.push(cards.table[c].down.s(-1));
              cards.table[c].down = cards.table[c].down.length > 1 ? F.toArray(cards.table[c].down.s(0, -2)) : [];
              gameUpdate();
            }
          } else {
            cards.drop = true;
          }
        } else if (cards.selected.stack.split("-")[0] == "s") {
          if (F.buttonDown(0)) {
            if (cards.drop) {
              cards.drop = false;

              if (cards.deck.down.length > 0) {
                cards.deck.up.push(cards.deck.down.s(-1));
                cards.deck.down = cards.deck.down.length > 1 ? F.toArray(cards.deck.down.s(0, -2)) : [];
              } else {
                cards.deck.down = cards.deck.up.reverse();
                cards.deck.up = [];
              }
              gameUpdate();
            }
          } else {
            cards.drop = true;
          }
        } else if (cards.selected.stack.split("-")[0] == "b") {
          if (F.buttonDown(0)) {
            if (cards.drop) {
              cards.drop = false;

              giveUp();
            }
          } else {
            cards.drop = true;
          }
        }
      }

      Check: for (check = 0; check < 1; check++) {
        if (!F.buttonDown(0)) {
          cards.selected = null;
          w = canvas.width / (data.columns + 1) - 2;

          p = {
            x: (4 * width) + 7,
            y: canvas.height - (width * 0.8 * data.card_ratio) - 30,
            w: w * 0.8,
            h: w * 0.8 * data.card_ratio,
            stack: "s",
          };
          if (F.collide(F.mouse, p)) {
            cards.selected = p;
            break Check;
          }

          if (cards.deck.up.length > 0) {
            p = {
              x: (2.5 * width) + 7,
              y: canvas.height - (width * 0.8 * data.card_ratio) - 30,
              w: w * 0.8,
              h: w * 0.8 * data.card_ratio,
              rx: F.diff((2.5 * width) + 7, F.mouse.x),
              ry: F.diff(canvas.height - (width * 0.8 * data.card_ratio) - 30, F.mouse.y),
              stack: "d",
            };
            if (F.collide(F.mouse, p)) {
              cards.selected = p;
              break Check;
            }
          }

          for (c = 0; c < cards.table.length; c++) {
            if (cards.table[c].up.length > 0) {
              for (i = cards.table[c].up.length - 1; i >= 0; i--) {
                p = {
                  x: (c * w) + 7,
                  y: (cards.table[c].down.length + i) * ((canvas.height / 2) / data.card_amount) + 10,
                  w: w * 0.8,
                  h: (((cards.table[c].up.length - i) - 1) * ((canvas.height / 2) / data.card_amount)) + ((w * 0.8) * data.card_ratio),
                  stack: "t-{0}-{1}".format(c, (cards.table[c].up.length - i)),
                  rx: F.diff((c * w) + 7, F.mouse.x),
                  ry: F.diff(cards.table[c].down.length * ((canvas.height / 2) / data.card_amount), F.mouse.y) - 10,
                };
                if (F.collide(F.mouse, p)) {
                  cards.selected = p;
                  break Check;
                }
              }
            } else if (cards.table[c].down.length > 0) {
              p = {
                x: (c * w) + 7,
                y: (cards.table[c].down.length - 1) * ((canvas.height / 2) / data.card_amount) + 10,
                w: w * 0.8,
                h: (w * 0.8) * data.card_ratio,
                stack: "f-{0}".format(c),
                rx: F.diff((c * w) + 7, F.mouse.x),
                ry: F.diff(cards.table[c].down.length * ((canvas.height / 2) / data.card_amount), F.mouse.y) - 10,
              };
              if (F.collide(F.mouse, p)) {
                cards.selected = p;
                break Check;
              }
            }
          }

          for (c = 0; c < cards.aces.length; c++) {
            if (cards.aces[c].length > 0) {
              p = {
                x: (data.columns + 0.2) * w,
                y: (c * 100) + 10,
                w: w * 0.8,
                h: (w * 0.8) * data.card_ratio,
                stack: "a-{0}".format(c),
                rx: F.diff((data.columns + 0.2) * w, F.mouse.x),
                ry: F.diff((c * 100) + 10, F.mouse.y),
              };
              if (F.collide(F.mouse, p)) {
                cards.selected = p;
                break Check;
              }
            }
          }

          p = {
            x: canvas.width - 110,
            y: canvas.height - 60,
            w: 90,
            h: 40,
            stack: "b",
          };
          if (F.collide(F.mouse, p)) {
            cards.selected = p;
            break Check;
          }
        }
      }
    } else {
      if (!F.buttonDown(0)) {
        cards.selected = null;
      }
    }
    canvas.style.cursor = cards.selected ? "pointer" : "default";
  }
}

var then = Date.now();
reset();
main();

function drawCard(x, y, card, style) {
  w = (canvas.width / (data.columns + 1) - 2) * 0.8;
  h = w * data.card_ratio;
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

    suit = card.scs;
    value = card.vc;
    ctx.fillStyle = "DH".includes(card.sc) ? color.suit_red : color.suit_black;
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

function gameUpdate() {
  val = true;
  for (c = 0; c < cards.table.length; c++) {
    if (!(cards.table[c].up.length < 1 && cards.table[c].down.length < 1)) {
      val = false;
    }
  }
  if (!(cards.deck.down.length < 1 && cards.deck.up.length < 1)) {
    val = false;
  }

  if (val) {
    console.log("WIN!");
    setTimeout(reset, 200);
  }
}

function giveUp() {
  if (window.confirm("Are you sure you want to give up?")) {
    setTimeout(reset, 200);
  }
}