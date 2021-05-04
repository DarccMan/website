const data = {
  player: {
    w: 18,
    h: 63,
    default: {
      x: 80,
      y: 300,
      size: 1.5,
      flipped: false,
      speed_jump: 6,
      speed_fall_acel: 13,
      speed_fall_max: 7,
      speed_drop_acel: 5,
      speed_drop_max: 70,
      speed_move_acel: 47,
      speed_move_decel: 47,
      speed_move_max: 5,
      vel_y: 0,
      vel_x: 0,
    },
  },
  scene: {
    default: {
      bg_type: "static",
      bg_img: "sky",
      fallDeath: true,
      cam_x: true,
      cam_y: false,
      cam_z: false,
      cam_type: "dynamic",
      cam_edge: 3.5,
    },
  },
  blocks: {
    lineWidth: 2,
    types: {
      solid: {
        fill: F.getColor([
          30,
          30,
          35,
        ]),
        solid: true,
        visible: true,
        death: false,
        goal: false,
      },
      display: {
        fill: F.getColor([
          200,
          200,
          200,
          0.5,
        ]),
        solid: false,
        visible: true,
        death: false,
        goal: false,
      },
      barrier: {
        fill: F.getColor([
          0,
          0,
          0,
          0,
        ]),
        solid: true,
        visible: false,
        death: false,
        goal: false,
      },
      death: {
        fill: F.getColor([
          160,
          40,
          30,
        ]),
        solid: false,
        visible: true,
        death: true,
        goal: false,
      },
      goal: {
        fill: F.getColor([
          40,
          220,
          20,
        ]),
        solid: false,
        visible: true,
        death: false,
        goal: true,
      },
    },
  },
  timer: {
    unfocused: false,
  },
};