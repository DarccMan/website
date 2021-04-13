var levels = [
  {
    name: "Spikes",
    dim: [25, 10],
    set: `
      >4;
      #block*125&3,cracked:1;
      =0;
      >3;
      // #sign[text:THIS IS A TEST,abc:123];
      =6;
      >3;
      #block*2&3,cracked:1;
      @rat;
      =7;
      >2;
      #block*2&3,cracked:1;
      =8;
      >1;
      #block*4&3,cracked:1;
      =10;
      #spike;
      >2;
      #pillar;
      >1;
      +-1;
      #pillar;
      =15;
      >3;
      #spike;
      +2;
      #spike*2;
      +3;
      #goal;
      =0;
      >10;
      #smile*25;
    `,
    player: {
      x: 3,
      y: 2.5,
    },
  },
  {
    name: "Rats...",
    dim: [25, 10],
    set: `
      >6;
      #block*100&3,cracked:1;
      =5;
      >6;
      #none*3;
      +3;
      >-1;
      #torch;
      +-1;
      @rat;
      +1;
      @rat;
      +1;
      @rat;
      +1;
      @rat;
      +1;
      @rat;
      +1;
      @rat;
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
      x: 2,
      y: 2,
    },
  },
  {
    name: "...Bats",
    dim: [25, 10],
    set: `
      >6;
      #block*100&3,cracked:1;
      =7;
      >5;
      @bat;
      =9;
      >5;
      #torch;
      +9;
      @bat;
      +1;
      @bat;
      +1;
      @bat;
      +1;
      @bat;
      >-2;
      +-1;
      @bat;
      =23;
      >5;
      #goal
    `,
    player: {
      x: 2,
      y: 2,
    },
  },
];