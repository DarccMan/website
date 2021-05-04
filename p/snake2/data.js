var data = {
  grid: {
    x: 16,
    y: 16,
  },
  snake: {
    speed: 100,
  },
  colors: {
    snake_fill: F.getColor([
      10,
      240,
      30,
    ]),
    snake_stroke: F.getColor([
      5,
      150,
      10,
    ]),
    food_fill: F.getColor([
      250,
      30,
      5,
    ]),
    food_stroke: F.getColor([
      170,
      20,
      5,
    ]),
    grid_bg: F.getColor([
      60,
      60,
      60,
    ]),
    grid_stroke: F.getColor([
      55,
      55,
      55,
    ]),
  },
};
var controls = {
  keys: {
    "player_up": [
      87,
      38,
    ],
    "player_down": [
      83,
      40,
    ],
    "player_left": [
      65,
      37,
    ],
    "player_right": [
      68,
      39,
    ],
    "debug_main": [
      16,
    ],
  },
  buttons: {},
};