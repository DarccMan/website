var levels = [
  {
    name: "First",
    dim: [25, 10],
    set: `
      >4;
      #block*100&3,cracked:1;
      =6;
      >3;
      #block*2&3,cracked:1;
      // @rat;
      =7;
      >2;
      #block*2&3,cracked:1;
      =8;
      >1;
      #block*4&3,cracked:1;
      =10;
      #spike;
      =15;
      >3;
      #spike;
      +1;
      #spike*2;
      +4;
      #goal;
    `,
    player: {
      x: 11,
      y: 2.5,
    },
  },
  {
    name: "Torch",
    dim: [25, 10],
    set: `
      >4;
      #block*100&3,cracked:1;
      =8;
      >3;
      #torch;
      =15;
      >3;
      #torch;
      =24;
      >3;
      #goal;
    `,
    player: {
      x: 2,
      y: 2,
    },
  },
  {
    name: "Enemies",
    dim: [25, 10],
    set: `
      >6;
      #block*100&3,cracked:1;
      =5;
      >6;
      #none*3;
      // >-1;
      // @rat;
      // +1;
      // @rat;
      // +1;
      // @rat;
      // +1;
      // @rat;
      // +1;
      // @rat;
      // +1;
      // @rat;
      =12;
      >4;
      #brick;
      +-3;
      >-2;
      #brick;
      +1;
      >-2;
      #brick*6;
      >1;
      +-1;
      #brick;
      >1;
      +-1;
      #brick;
      >1;
      +-1;
      #brick;
      >1;
      +-1;
      #brick;
      >1;
      +-1;
      #brick;
      >1;
      +2;
      #none*2;
      >1;
      +-2;
      #none*2;
      >1;
      +-2;
      #none*2;
      >-1;
      +-4;
      #none*2;
      >1;
      +-2;
      #none*2;
      +-2;
      #goal;
    `,
    player: {
      x: 11,
      y: 2,
    },
  },
];