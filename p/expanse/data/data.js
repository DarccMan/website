var data = {
  canvas: {
    h: 512, //* Height of canvas (pixels)
    ratio: 1.5, //* Aspect ratio of canvas based on height
  },
  player: {
    w: 1, //* Width and height for model
    h: 1,
    Hw: 0.6, //* Width and height for hitbox (Relative to model)
    Hh: 0.8,
    color: "#18112F",
  },
  velocity: { //* Velocity settings for player
    fall_accel: 2, //* Acceleration while falling
    fall_term: 10, //* Terminal velocity for falling
    run_accel: 2, //* Acceleration while running
    run_term: 10, //* Maximum speed for running
    run_slow: 4, //* Decceleration when stopping
    run_min: 0.1, //* Minimum speed before completely stopping
    crouch_accel: 0.5, //* Multiplier of acceleration while crouching
    crouch_term: 0.5, //* Multiplier of maximum speed while crouching
    crouch_slow: 0.5, //* Multiplier of decceleration speed while crouching
    jump: 10, //* Jump height
  },
  cam: {
    blockSize: 50, //* The size of blocks on normal zoom
    parallax: 0.5, //* The speed of the background relative to camera
    minZoomImage: { //* The most zoomed out camera can be before it renders solid colour instead of image
      blocks: 0.5,
      bg: 0.7,
      player: 0.3,
    }
  },
};