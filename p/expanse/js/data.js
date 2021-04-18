var data = {
  ratio: 1.8,
  resolution: 1,
  // resolution: 0.3, // Don't touch this!
  pixelate: true,
  tiles: 10, // Amount of tiles on canvas
  parallax: 0.5, // How fast the background moves
  cam: { // Position of player to screen
    x: 0.35,
    y: 0.6,
  },
  player: { // Player settings
    w: 1.2,
    h: 1.2,
    ch: 0.8,
    hitX: 0.6,
    hitY: 0.95,
    color: "#354",
  },
  frame_speed: 800, // How fast animations are
  graphics: 3, // Graphics level (0-3)
  death_lines: [ // Death messages
    "Uh - Oh!",
    "Yikers!",
    "Whoops!",
    ":(",
    "Rats!",
    "AAARRRGGHH!",
    "Oh MAN!",
    "oof",
  ],
  blocks: { // Block data
    none: {
      color: "#18100A",
      images: 1,
    },
    test: {
      color: "#F0F",
      images: 1,
      outline: true,
      collide: true,
    },
    unknown: {
      color: "#0B0704",
      images: 1,
      collide: true,
    },
    block: {
      color: "#0B0704",
      images: 1,
      outline: true,
      collide: true,
    },
    cracked: {
      color: "#0B0603",
      images: 1,
      outline: true,
      collide: true,
    },
    smile: {
      color: "#0B0704",
      images: 1,
      outline: true,
      collide: true,
    },
    trap: {
      color: "#0F0704",
      images: 1,
      outline: true,
    },
    brick: {
      color: "#0B0A08",
      images: 1,
      outline: true,
      collide: true,
    },
    spike: {
      color: "#444",
      images: 1,
      death: true,
    },
    goal: {
      color: "#0F0",
      images: 2,
      goal: true,
    },
    torch: {
      color: "#FF0",
      images: 2,
      light: 1.3,
      pick: true,
    },
    lamp: {
      color: "#FF8",
      images: 3,
      light: 2,
      death: true,
    },
    sign: {
      color: "#753",
      images: 1,
      use: true,
    },
    pillar: {
      color: "#0001",
      images: 1,
    },
    scaffold: {
      color: "#751",
      images: 1,
      collide: true,
      walkInto: true,
      pick: true,
    },
  },
  enemies: { // Enemy settings
    rat: {
      color: "#644", // Color for low graphics
      w: 0.8,
      h: 0.5,
      v: {
        ma: 4,
        mt: 2,
        fa: 1,
        ft: 2,
      },
      collide: [ // Cannot walk into these bad boys
        "block",
        "unknown",
        "cracked",
        "smile",
        "brick",
        "alt",
        "test",
        "scaffold",
      ],
      death: [ // Dies from these
        "spike",
      ],
      attr: { // Attributes
        avoidLight: false,
        fall: true,
      },
      images: 2,
    },
    bat: { // Refer to rat
      color: "#413",
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
        "unknown",
        "cracked",
        "smile",
        "brick",
        "alt",
        "test",
        "torch",
      ],
      death: [
        "spike",
      ],
      attr: {
        avoidLight: true,
        fall: false,
      },
      images: 2,
    },
    skelly: { // Refer to rat
      color: "#999",
      w: 0.8,
      h: 1,
      rh: 1.9,
      v: {
        ma: 10,
        mt: 5,
        fa: 1,
        ft: 6,
      },
      collide: [ // Cannot walk into these bad boys
        "block",
        "unknown",
        "cracked",
        "smile",
        "brick",
        "alt",
        "test",
        "scaffold",
      ],
      death: [ // Dies from these
        "spike",
      ],
      attr: { // Attributes
        avoidLight: false,
        fall: true,
      },
      images: 2,
    },
  },
  SHAKY: 50,
  outlines: [ // Which blocks use outline
    "block",
    "unknown",
    "cracked",
    "trap",
    "brick",
    "smile",
  ],
  collide: [ // Player collides with these
    "block",
    "unknown",
    "cracked",
    "smile",
    "brick",
    "alt",
    "test",
    "scaffold",
  ],
  walkInto: [
    "scaffold",
  ],
  //! Add light amount
  light: [ // Give off light
    "torch",
  ],
  death: [ // Player dies from these
    "spike",
  ],
  win: [ // Player passes level from these
    "goal",
  ],
  shadow: { // Shadow settings
    p_r0: 0.5, // Small radius around player
    p_r1: 3, // Large radius around player
    torch_multiply: 2, // How much holding torch multiplies light by
    r0: 0.5, // Small radius around light blocks
    r1: 3, // Large radius around light blocks
    opacity: 210, // Opacity of full shadow (0-255)
    resolution_low: 0.03,
    resolution_high: 0.07,
  },
  floor_gap: 10, // Gap between bottom most block and floor spikes
  v: { // Player velocity settings
    // Fall (+y)
    fa: 25, // Acceleration speed
    ft: 40, // Terminal velocity
    // Jump (-y)
    jb: 8, // Base jump
    ja: 1.1, // Every millisecond key held down add this to jump
    jc: 40, // Cooldown before adding adding above amount
    jm: 80, // Maximum time to hold down key
    jt: 30, // Terminal jump velocity
    // Movement (x)
    ma: 80, // Acceleration speed
    md: 60, // Decceleration speed
    mt: 10, // Terminal velocity
    mm: 0.2, // If less than this number, reset to 0
    // Crouching
    cfa: 0.05, // Fall acceleration
    cft: 1.1, // Fall terminal
    cma: 0.2, // Movement acceleration
    cmt: 0.6, // Movement terminal
  },
  font: "dirtyroma", // Font
  hold_size: 0.8, // Size of held block
};
var controls = { // Kinda self explanatory
  keys: {
    player_up: [
      87,
      38,
      32,
    ],
    player_crouch: [
      83,
      40,
      16,
    ],
    player_left: [
      65,
      37,
    ],
    player_right: [
      68,
      39,
    ],
    player_pick: [
      69,
    ],
    player_drop: [
      81,
    ],
    game_restart: [
      84,
    ],
    game_start: [
      32,
    ],
    graphics_toggle: [
      86,
    ],
    debug: [
      90,
    ],
    debug_mode: [
      192,
    ],
    debug_skipLevel: [
      66,
    ],
  },
  buttons: {},
};