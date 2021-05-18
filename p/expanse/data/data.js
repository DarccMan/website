var data = {
  ratio: 1.8,
  resolution: 1,
  // resolution: 0.3, // Don't touch this!
  pixelate: true,
  tiles: 9, // Amount of tiles on canvas
  parallax: 0.5, // How fast the background moves
  cam: { // Position of player to screen
    // Non-fancy graphics
    x: 0.35, // X position of player on canvas
    y: 0.6, // Y position of player on canvas
    // Fancy graphics
    graphics: 3, // Graphics level needed for fancy camera positioning. Set to 4 to never use it
    minx: 0.4, // Minimum amount of canvas for camera X not to change
    maxx: 0.6, // Maximum amount of canvas for camera X not to change
    miny: 0.4, // Minimum amount of canvas for camera Y not to change
    maxy: 0.6, // Maximum amount of canvas for camera Y not to change
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
  graphics: 4, // Graphics level (0-4)
  blocks: {}, // Refer to blocks.js
  enemies: {}, // Some idiot forgot to edit this comment
  SHAKY: 50,
  shadow: { // Shadow settings
    p_r0: 0.5, // Small radius around player
    p_r1: 3, // Large radius around player
    r0: 0.5, // Small radius around light blocks
    r1: 3, // Large radius around light blocks
    torch_multiply: 2, // How much holding torch multiplies light by
    opacity: 190, // Opacity of full shadow (0-255)
    block_opacity: 210, // Opacity of shadow-type blocks (0-255)
    resolution_low: 0.03,
    resolution_high: 0.1,
  },
  floor_gap: 8, // Gap between bottom most block and floor spikes
  v: { // Player velocity settings
    // Fall (+y)
    fa: 25, // Acceleration speed
    ft: 40, // Terminal velocity
    // Jump (-y)
    jb: 8, // Base jump
    ja: 80, // Add this to jump height for how long key held (Within reason)
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
  // font: "skull-void", // Font
  font: "samdan", // Font
  hold_size: 0.8, // Size of held block
  particles: { // Particles effects (Graphics > 3)
    amount: 7,
    parallax: 1.5, // Parallax effect (See data.parallax)
    r: 1, // Radius
    minx: 0, // (For following) Min and max values
    maxx: 1, // X offset
    miny: 0, // Y offset
    maxy: 1,
    minsx: 5, // X speed
    maxsx: 10,
    minsy: 10, // Y speed
    maxsy: 30,
    mina: 80, // Alpha (Opacity)
    maxa: 150,
  },
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
      82,
    ],
    game_start: [
      32,
    ],
    graphics_decrease: [
      67,
    ],
    graphics_increase: [
      86,
    ],
    debug: [
      90,
    ],
    debug_mode: [
      76,
    ],
    level_decrease: [
      79,
    ],
    level_increase: [
      80,
    ],
  },
  buttons: {},
};