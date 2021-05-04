var lvls = [
  {
    name: "The first level",
    player: {
      x: 90,
      y: 87,
      size: 1,
    },
    blocks: [
      {
        x: -1200,
        y: -1000,
        w: 1000,
        h: 2000,
        type: "barrier",
      },
      {
        x: 800,
        y: -1000,
        w: 1000,
        h: 2000,
        type: "barrier",
      },
      {
        x: 45,
        y: 70,
        w: 5,
        h: 80,
        fill: "rgba(180, 180, 180)",
        type: "display",
      },
      {
        x: 42,
        y: 145,
        w: 11,
        h: 5,
        fill: "rgba(180, 180, 180)",
        type: "display",
      },
      {
        x: 5,
        y: 70,
        w: 40,
        h: 28,
        fill: "rgba(180, 80, 80)",
        type: "display",
      },
      {
        x: -500,
        y: 150,
        w: 650,
        h: 60,
      },
      {
        x: 200,
        y: 300,
        w: 100,
        h: 50,
      },
      {
        x: 283,
        y: 60,
        w: 17,
        h: 250,
      },
      {
        x: 90,
        y: 210,
        w: 60,
        h: 150,
      },
      {
        x: 204,
        y: 450,
        w: 260,
        h: 30,
      },
      {
        x: 400,
        y: 420,
        w: 31,
        h: 30,
        type: "death"
      },
      {
        x: 430,
        y: 390,
        w: 30,
        h: 60,
        type: "death"
      },
      {
        x: 459,
        y: 390,
        w: 1000,
        h: 90,
      },
      {
        x: 299,
        y: 330,
        w: 61,
        h: 20,
      },
      {
        x: 300,
        y: 270,
        w: 60,
        h: 60,
        fill: "rgba(150, 150, 30)",
        type: "goal"
      }
    ]
  },
  {
    name: "Large Dessert",
    player: {
      size: 1,
      jump: 10,
    },
    blocks: [
      {
        x: -1200,
        y: -1000,
        w: 1000,
        h: 2000,
        type: "barrier",
      },
      {
        x: 1500,
        y: -1000,
        w: 1000,
        h: 2000,
        type: "barrier",
      },
      {
        x: -500,
        y: 400,
        w: 730,
        h: 200,
        fill: "rgba(240, 240, 120)",
      },
      {
        x: 229,
        y: 400,
        w: 34,
        h: 200,
        fill: "rgba(240, 240, 120)",
        type: "display"
      },
      {
        x: 230,
        y: 500,
        w: 30,
        h: 200,
        fill: "rgba(200, 250, 170)",
        type: "goal"
      },
      {
        x: 260,
        y: 400,
        w: 2000,
        h: 200,
        fill: "rgba(240, 240, 120)",
      },
      {
        x: 210,
        y: 330,
        w: 20,
        h: 70,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 195,
        y: 340,
        w: 10,
        h: 30,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 195,
        y: 365,
        w: 20,
        h: 10,
        fill: "rgba(40, 150, 30)",
        type: "display"
      },
      {
        x: 240,
        y: 355,
        w: 10,
        h: 30,
        fill: "rgba(40, 150, 30)",
        type: "display"
      },
      {
        x: 220,
        y: 375,
        w: 30,
        h: 10,
        fill: "rgba(40, 150, 30)",
        type: "display"
      },
      {
        x: 510,
        y: 330,
        w: 20,
        h: 70,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 495,
        y: 340,
        w: 10,
        h: 30,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 495,
        y: 365,
        w: 20,
        h: 10,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 540,
        y: 355,
        w: 10,
        h: 30,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 520,
        y: 375,
        w: 30,
        h: 10,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 810,
        y: 330,
        w: 20,
        h: 70,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 795,
        y: 340,
        w: 10,
        h: 30,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 795,
        y: 365,
        w: 20,
        h: 10,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 840,
        y: 355,
        w: 10,
        h: 30,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 820,
        y: 375,
        w: 30,
        h: 10,
        fill: "rgba(40, 150, 30)",
        type: "death"
      },
      {
        x: 1200,
        y: 360,
        w: 30,
        h: 30,
        fill: "rgba(150, 150, 50)",
      }
    ]
  },
  {"name": "Editor test", "player": {"setValues": {}, "x": 80, "y": 300, "size": 1.5, "flipped": false, "speed_jump": 6, "speed_fall_acel": 13, "speed_fall_max": 7, "speed_drop_acel": 5, "speed_drop_max": 70, "speed_move_acel": 47, "speed_move_decel": 47, "speed_move_max": 5, "vel_y": 0, "vel_x": 0, "w": 27, "h": 94.5, "img": {}, "pose": "idle"}, "scene": {"setValues": {}, "bg_type": "static", "bg_img": "sky", "fallDeath": true, "cam_x": true, "cam_y": false, "cam_z": false, "cam_type": "dynamic", "cam_edge": 3.5, "cam": {"x": 0, "y": 0, "z": 100}}, "blocks": [{"x": 36, "y": 395, "w": 100, "h": 61, "fill": "#ff0000", "stroke": "#0000ff", "lineWidth": "2", "type": "solid"}, {"x": 231, "y": 385, "w": 47, "h": 35, "fill": "#ff0000", "stroke": "#0000ff", "lineWidth": "2", "type": "solid"}, {"x": 313, "y": 348, "w": 35, "h": 16, "fill": "#ff0000", "stroke": "#0000ff", "lineWidth": "2", "type": "solid"}, {"x": 442, "y": 325, "w": 9, "h": 2, "fill": "#ff0000", "stroke": "#0000ff", "lineWidth": "2", "type": "solid"}, {"x": 493, "y": 305, "w": 4, "h": 6, "fill": "#ff0000", "stroke": "#0000ff", "lineWidth": "2", "type": "solid"}, {"x": 505, "y": 378, "w": 42, "h": 35, "fill": "#ff0000", "stroke": "#0000ff", "lineWidth": "2", "type": "solid"}]}
];