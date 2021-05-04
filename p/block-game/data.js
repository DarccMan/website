var data = {
  game: {
    version: "1.4",
  },
  canvas: {
    w: 512,
    h: 512,
    x: 16,
    y: 16,
  },
  blocks: {
    types: [
      {
        id: "wood",
        color: [
          133,
          120,
          73,
          1,
        ],
        weight: 0,
        attr: {
        },
      },
      {
        id: "dirt",
        color: [
          100,
          50,
          10,
          1,
        ],
        weight: 100,
        attr: {
        },
      },
      {
        id: "water",
        color: [
          70,
          70,
          170,
          1,
        ],
        weight: 10,
        attr: {
          walkable: false,
          spawnable: false,
        },
      },
      {
        id: "grass",
        color: [
          30,
          150,
          30,
          1,
        ],
        weight: 200,
        attr: {
        },
      },
      {
        id: "stone",
        color: [
          100,
          100,
          100,
          1,
        ],
        weight: 100,
        attr: {
          walkable: false,
          spawnable: false,
        },
      },
      {
        id: "obsidian",
        color: [
          50,
          20,
          50,
          1,
        ],
        weight: 5,
        attr: {
          walkable: false,
          spawnable: false,
        },
      },
      {
        id: "lava",
        color: [
          190,
          98,
          0,
          1,
        ],
        weight: 2,
        attr: {
          death: true,
        },
      },
      {
        id: "white_concrete",
        color: [
          200,
          200,
          200,
          1,
        ],
        weight: 0,
        attr: {
        },
      },
      {
        id: "black_concrete",
        color: [
          20,
          20,
          20,
          1,
        ],
        weight: 0,
        attr: {
        },
      },
    ],
    attributes: {
      walkable: true,
      spawnable: true,
      stack_size: 64,
      death: false,
    },
  },
  player: {
    w: 16,
    h: 16,
    color: [
      200,
      200,
      50,
    ],
    speed: 200,
    reach: 4,
    coll_rec_try: 100,
    hotbar: {
      slot_amount: 9,
      slot_w: 48,
      bg_color: [
        30,
        30,
        30,
        0.7,
      ],
      slot_color: [
        80,
        80,
        80,
        1,
      ],
      selected_color: [
        130,
        130,
        130,
        1,
      ],
      slot_thickness: 2,
      selected_thickness: 4,
      bottom: 30,
      block_w: 60, 
      timeout: 2000,
    },
  },
  cursor: {
    h: 20,
    w: 4,
    gap: 10,
    color: [
      10,
      10,
      10,
      0.5,
    ],
    offsetX: 11,
    offsetY: 11,
  },
  entities: {
    types: [
      {
        id: "zombie",
        color: [
          29,
          98,
          22,
          1,
        ],
        attr: {
          hostile: true,
        },
        w: 16,
        h: 16,
      },
    ],
    attributes: {
      hostile: false,
    },
    spawn_interval: 0,
    spawn_timeout: 000,
    w: 16,
    h: 16,
    cap: 10,
  },
}
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
    "player_random": [
      78,
    ],
    "player_drop": [
      81,
    ],
    "debug_mainKey": [
      17,
    ],
    "cheat_speed": [
      77,
    ],
  },
  buttons: {
    "block_place": [
      0,
      2,
    ],
    "block_destroy": [
      0,
    ],
    "block_pick": [
      1,
    ],
  },
}