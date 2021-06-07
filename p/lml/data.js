var data = {
  image: true,
  canvas: {
    h: 500,
    ratio: 2,
  },
  blocks: {
    w: 32,
    h: 8,
    obstacle: 4,
    ground: 6,
    respawn: 2,
  },
  lord: {
    y: 4,
    w: 0.6,
    rw: 1,
    h: 2,
    color: "111",
  },
  v: {
    xa: 0.2,
    xm: 150,
    ya: 0.5,
    j: 30,
    ym: 15,
    xr: 0.185,
    yr: 0.3,
  },
  speed: 2.5,
  jump: {
    duration: [
      0.05,
      0.1,
      0.3,
    ],
  },
};
var controls = {
  keys: {
    up: [
      32,
      38,
      13,
    ],
    fast: [
      80,
    ],
    image: [
      79,
    ],
    reset: [
      82,
    ],
    debug: [
      90,
    ],
  },
  buttons: {
    up_b: [
      0,
    ],
  },
};