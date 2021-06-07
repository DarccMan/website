var data = {
  ratio: 1.8,
  resolution: 1,
  tiles: 9, // Amount of tiles on canvas
  // Do not touch the above values!!!
  pixelate: true,
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
  floor_gap: Infinity, //? Testing
  v: { // Player velocity settings
    // Fall (+y)
    fa: 25, // Acceleration speed
    fa: 0, //? Testing
    ft: 40, // Terminal velocity
    // Down in scaffold (+y)
    da: 200, // Acceleration speed
    dt: 40, // Terminal velocity
    // Jump (-y)
    jb: 10.5, // Base jump
    ja: 0, // Add this to jump height for how long key held (Within reason)
    jc: 40, // Cooldown before adding adding above amount
    jm: 80, // Maximum time to hold down key
    jt: 30, // Terminal jump velocity
    // Movement (x)
    ma: 80, // Acceleration speed
    md: 60, // Decceleration speed
    mt: 10, // Terminal velocity
    mm: 0.2, // If less than this number, reset to 0
    // Crouching
    cfa: 0.03, // Fall acceleration
    cft: 1.05, // Fall terminal
    cma: 0.2, // Movement acceleration
    cmt: 0.6, // Movement terminal
    // Get out of block
    g: 1,
    g: 0, //? Testing
  },
  font: {
    main: "samdan", // Font
    alt: "tsyiral", // Second Font
    show_0: 500, // How long to wait to show second font
    show_1: 800, // How long to take in translation animation
    show_important_0: 10, // For important text
    show_important_1: 500,
    alt_size: 1,
    alt_x: 0,
    alt_y: -0.1,
    alt_w: 0.9,
  },
  hold_size: 0.8, // Size of held block
  particles: { // Particles effects (Graphics > 3)
    amount: 12,
    // (For following) Min and max values
    p: [1.5, 1.7], // Parallax effect (See data.parallax)
    r: [0.6, 0.9], // Radius
    x: [0, 1], // X offset
    y: [0, 1.5], // Y offset
    sx: [5, 10], // X speed
    sy: [10, 40], // Y speed
    a: [80, 150], // Alpha (opacity)
  },
};