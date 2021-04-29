data.enemies = { // Enemy settings
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
      "glass",
    ],
    death: [ // Dies from these
      "spike",
      "fire",
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
      "glass",
      "fire",
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
};