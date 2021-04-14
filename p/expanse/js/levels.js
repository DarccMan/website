var levels = [
  {
    name: "Spikes",
    dim: [25, 10],
    set: `
      >4;
      #block*125&3,cracked:1;
      =0;
      >3;
      #sign{text:Watch_out_for_rats!,abc:123,itstrue};
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
    dim: [25, 16],
    set: `
      >6;
      #block*400&3,cracked:1;
      =0;
      >5;
      #sign{text:Hold_on...,abc:123,itstrue};
      =5;
      >6;
      #trap*3;
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
      =0;
      >13;
      #none*4;
      +-4;
      >1;
      #none*3;
      #sign{text:What's_the_secret_code?};
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
      =0;
      >5;
      #sign{text:Press_E_to_pick_up...,abc:123,itstrue};
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
      +1;
      @rat;
      =23;
      >5;
      #goal
    `,
    player: {
      x: 2,
      y: 2,
    },
  },
  {
    name: "Skelly Wag",
    dim: [25, 10],
    set: `
      >6;
      #block*100&3,cracked:1;
      =1;
      >5;
      #sign{text:Skelly_is_deceiving};
      +3;
      #brick;
      =9;
      >4;
      @rat;
      +2;
      >-2;
      @skelly;
      =23;
      >5;
      #goal;
    `,
    player: {
      x: 2,
      y: 3,
    },
  },
  {
    name: "Pick Block",
    dim: [25, 12],
    set: `
      >8;
      #block*100&3,cracked:1;
      =1;
      >7;
      #scaffold*3;
      >-1;
      +-3;
      #scaffold*3;
      >-1;
      +-1;
      #scaffold;
      =6;
      >8;
      #brick;
      =12;
      >2;
      #brick*3;
      >-1;
      +-1;
      #goal;
      >6;
      +-5;
      #sign{text:Go_into_the_blocks};
      +13;
      @skelly;
      >-2;
      @rat;
      >-2;
      @rat;
      >-2;
      @rat;
    `,
    player: {
      x: 5.9,
      y: 6.8,
    },
  },
];