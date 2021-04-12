var data = {
  // tiles: 12,
  tiles: 12,
  // tiles: 30,
  parallax: 0.5,
  cam: {
    x: 0.35,
    y: 0.6,
  },
  player: {
    w: 1.2,
    h: 1.2,
    hitX: 0.6,
    hitY: 0.95,
    color: "#354",
  },
  frame_speed: 800,
  graphics: 2,
  // graphics: 0,
  sprites: {
    none: "#18100A",
    block: "#0B0704",
    cracked: "#0B0603",
    brick: "#0B0A08",
    alt: "#1B1704",
    test: "#F0F",
    torch: "#FF0",
    goal: "#0F0",
    spike: "#444",
  },
  enemies: {
    rat: {
      color: "#644",
      w: 0.8,
      h: 0.5,
      v: {
        ma: 4,
        mt: 2,
        fa: 1,
        ft: 2,
      },
    },
  },
  image_amount: {
    torch: 3,
    spike: 2,
    goal: 2,
  },
  outlines: [
    "block",
    "cracked",
    "brick",
  ],
  collide: [
    "block",
    "cracked",
    "brick",
    "alt",
    "test",
  ],
  light: [
    "torch",
  ],
  death: [
    "spike",
  ],
  win: [
    "goal",
  ],
  shadow: {
    p_r0: 0.5,
    p_r1: 3,
    torch_multiply: 2,
    r0: 0.5,
    r1: 3,
    opacity: 200,
  },
  v: {
    fa: 25,
    ft: 40,
    // jb: 5,
    jb: 7,
    ja: 1.1,
    ji: 70,
    jt: 30,
    ma: 40,
    md: 5,
    mt: 9,
    mm: 0.2,
  },
  font: "dirtyroma",
  hold_size: 0.8,
};
var controls = {
  keys: {
    "player_up": [
      87,
      38,
      32,
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
    "player_pick": [
      69,
    ],
    "player_drop": [
      81,
    ],
    "game_restart": [
      82,
    ],
    "game_start": [
      32,
    ],
    "debug": [
      17,
    ],
  },
  buttons: {},
};