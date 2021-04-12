var data = {
  // tiles: 12,
  tiles: 10,
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
  graphics: 3,
  // graphics: 0,
  death_lines: [
    "Uh - Oh!",
    "Yikers!",
    "Whoops!",
    ":(",
    "Rats!",
    "AAARRRGGHH!",
    "Oh MAN!",
    "oof",
  ],
  sprites: {
    none: "#18100A",
    block: "#0B0704",
    cracked: "#0B0603",
    smile: "#0B0704",
    brick: "#0B0A08",
    alt: "#1B1704",
    test: "#F0F",
    torch: "#FF0",
    goal: "#0F0",
    spike: "#444",
    pillar: "#0000",
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
      collide: [
        "block",
        "cracked",
        "smile",
        "brick",
        "alt",
        "test",
      ],
      death: [
        "spike",
      ],
      attr: {
        avoidLight: false,
        fall: true,
      },
    },
    bat: {
      color: "#622",
      w: 0.8,
      h: 0.8,
      v: {
        ma: 3,
        mt: 4,
        fa: 1,
        ft: 2,
      },
      collide: [
        "block",
        "cracked",
        "smile",
        "brick",
        "alt",
        "test",
      ],
      death: [
        "spike",
      ],
      attr: {
        avoidLight: true,
        fall: false,
      },
    },
  },
  image_amount: {
    torch: 3,
    spike: 2,
    goal: 2,
    rat: 2,
    bat: 2,
  },
  outlines: [
    "block",
    "cracked",
    "brick",
    "smile",
  ],
  collide: [
    "block",
    "cracked",
    "smile",
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
    // Fall (+y)
    fa: 25, // Acceleration speed
    ft: 40, // Terminal velocity
    // Jump (-y)
    jb: 8, // Base jump
    ja: 1.2, // Every millisecond key held down add this to jump
    jc: 50, // Cooldown before adding adding above amount
    jm: 80, // Maximum time to hold down key
    jt: 30, // Terminal jump velocity
    // Movement (x)
    ma: 40, // Acceleration speed
    md: 5, // Decceleration speed
    mt: 9, // Terminal velocity
    mm: 0.2, // If less than this number, reset to 0
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
      84,
    ],
    "game_start": [
      32,
    ],
    "debug": [
      17,
    ],
    "debug_all": [
      16,
    ],
  },
  buttons: {},
};