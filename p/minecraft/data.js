var data = {
  canvas: {
    w: 512,
    h: 512,
    bg_color: {
      start: [
        10,
        150,
        240,
      ],
      end: [
        10,
        220,
        240,
      ],
    },
  },
  player: {
    w: 32,
    h: 64,
    color: {
      head: [
        180,
        100,
        30,
      ],
      body: [
        10,
        150,
        240,
      ],
    },
    head: {
      w: 44,
      h: 44,
      r_max: 120,
      r_min: 0,
    },
    vel: {
      terminal: 10,
      increase: 10,
      move_max: 6,
      move_increase: 15,
      move_slow: 20,
      min: 0.05,
    },
    speed: 1,
    crouch_speed: 0.4,
    crouch_height: 0.7,
    reach: 300,
    ray: {
      point_frequency: 5,
    },
    place_timeout: 100,
  },
  cursor: {
    w: 3,
    h: 20,
    gap: 0,
    color: [
      10,
      10,
      10,
      0.5,
    ],
    offsetX: 11,
    offsetY: 11,
  },
  blocks: {
    w: 64,
    h: 64,
    init_amount: 16,
    selected_color: [
      30,
      30,
      30,
      1,
    ],
    selected_width: 3,
    types: [
      {
        id: "air",
        color: [
          0,
          0,
          0,
          0,
        ],
        tags: {
          unobstructive: true,
          hitbox: false,
          destroy: -1,
          texture: false,
          placeable: true,
        },
      },
      {
        id: "dirt",
        color: [
          140,
          40,
          10,
        ],
        tags: {
          destroy: 1000,
        },
      },
      {
        id: "stone",
        color: [
          80,
          80,
          80,
        ],
        tags: {
          destroy: 2000,
        },
      },
    ],
    tags: {
      unobstructive: false,
      hitbox: true,
      destroy: 1000,
      texture: true,
      placeable: false,
    },
  },
  settings: {
    useImage: false,
    useImage: true,
  },
}
var controls = {
  keys: {
    "player_up": [
      32,
    ],
    "player_left": [
      65,
      37,
    ],
    "player_right": [
      68,
      39,
    ],
    "player_crouch": [
      16,
    ],
    "debug_main": [
      18,
    ],
  },
  buttons: {
    "block_destroy": [
      0,
    ],
    "block_place": [
      2,
    ],
  },
}