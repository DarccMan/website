var data = {
  columns: 7,
  card_amount: 12,
  card_ratio: 1.5,
  card_border: 6,
  card_outline: 3,
  card_move_speed: 5,
  suits: {
    "D": "\u2666",
    "H": "\u2665",
    "C": "\u2663",
    "S": "\u2660",
  },
  values: {
    1: "A",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "J",
    12: "Q",
    13: "K",
  },
};
var color = {
  background: F.getColor([
    10,
    100,
    40,
  ]),
  card: F.getColor([
    240,
    230,
    230,
  ]),
  card_outline: F.getColor([
    220,
    210,
    210,
  ]),
  card_back: F.getColor([
    50,
    120,
    200,
  ]),
  suit_red: F.getColor([
    255,
    0,
    0,
  ]),
  suit_black: F.getColor([
    0,
    0,
    0,
  ]),
  card_empty: F.getColor([
    20,
    20,
    20,
    0.5,
  ]),
  card_hover: F.getColor([
    250,
    250,
    0,
  ]),
  card_drop: F.getColor([
    240,
    240,
    240,
    0.5,
  ]),
  button_background: F.getColor([
    40,
    50,
    80,
  ]),
  button_text: F.getColor([
    240,
    240,
    240,
  ]),
};