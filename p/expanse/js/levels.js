var levels = [
  {
    name: "Spiky :(",
    dim: [25, 10],
    set: `
      y=4;
      #block*125&3,cracked:1;
      x=0;
      y=3;
      #sign{text:Watch_out_for_rats!,abc:123,itstrue};
      x=6;
      y=3;
      #brick*2;
      @rat;
      x=7;
      y=2;
      #brick*3;
      x=8;
      y=1;
      #block*4&3,cracked:1;
      x=10;
      #spike;
      y=2;
      #pillar;
      y+1;
      x-1;
      #pillar;
      x=15;
      y=3;
      #spike;
      x+2;
      #spike*2;
      x+3;
      #brick*2;
      x-2;
      y-1;
      #brick;
      x-1;
      y-1;
      #goal;
      x=0;
      y=10;
      #smile*25;
    `,
    player: {
      x: 3,
      y: 2.8,
    },
  },
  {
    name: "Da Rats...",
    dim: [25, 16],
    set: `
      y=6;
      #block*400&3,cracked:1;
      x=1;
      y=5;
      #sign{text:Rats_get_funky,abc:123,itstrue};
      x=5;
      y=6;
      #trap*3;
      x+3;
      y-1;
      #torch;
      x-3;
      @rat;
      x+1;
      @rat;
      x+1;
      @rat;
      x+1;
      @rat;
      x+1;
      @rat;
      x+1;
      @rat;
      x=16;
      y=4;
      @bat;
      x=12;
      y=4;
      #brick;
      x-3;
      y=2;
      #brick;
      x+1;
      y=0;
      #brick*6;
      y+1;
      x-1;
      #brick;
      y+1;
      x-1;
      #brick;
      y+1;
      x-1;
      #brick;
      y+1;
      x-1;
      #brick;
      y+1;
      x-1;
      #brick;
      y+1;
      x+2;
      #none*2;
      y+1;
      x-2;
      #none*2;
      y+1;
      x-2;
      #none*2;
      y+1;
      x-4;
      #none*4;
      y+1;
      x-2;
      #none*2;
      x-4;
      #goal;
      #none*3;
      x-3;
      y+1;
      #trap*3;
      x=0;
      y=13;
      #none*3;
      x=0;
      y=14;
      #none*3;
      x-1;
      #sign{text:What's_the_secret_code?};
    `,
    player: {
      x: 2,
      y: 4.5,
    },
  },
  {
    name: "...Da Bats",
    dim: [25, 10],
    set: `
      y=6;
      #block*100&30,cracked:1,brick:2;
      x=0;
      y=5;
      #sign{text:Press_E_to_pick_up...,abc:123,itstrue};
      x=7;
      y=5;
      @bat;
      x=9;
      y=5;
      #torch;
      x+9;
      @bat;
      x+1;
      @bat;
      x+1;
      @bat;
      x+1;
      @bat;
      y-2;
      x-1;
      @bat;
      x+1;
      @rat;
      x=23;
      y=5;
      #goal
    `,
    player: {
      x: 2,
      y: 2,
    },
  },
  {
    name: "Skelly Wag and the Gang",
    dim: [25, 10],
    set: `
      y=6;
      #block*100&3,cracked:1;
      x=1;
      y=5;
      #sign{text:Press_SHIFT_to_crouch};
      x+3;
      #brick;
      x=9;
      y=4;
      @rat;
      x+3;
      y-2;
      @skelly;
      x=17;
      y=2;
      @bat;
      x=24;
      y=5;
      @bat;
      x=23;
      y=5;
      x-3;
      y-2;
      #glass;
      y+2;
      x-1;
      #pillar;
      y-1;
      x-1;
      #glass*4;
      x-1;
      y+1;
      #pillar;
      x-1;
      y-3;
      #glass;
      x-8;
      y-1;
      #glass;
      x-1;
      y-1;
      #goal;
      x-1;
      y+2;
      #pillar;
      x-1;
      y+1;
      #pillar;
      x-1;
      y+1;
      #pillar;
      x-1;
      y+1;
      #pillar;
    `,
    player: {
      x: 2,
      y: 3,
    },
  },
  {
    name: "Go up, idiot",
    dim: [25, 12],
    set: `
      y=8;
      #block*100&3,cracked:1;
      x=1;
      y=7;
      #scaffold;
      x=6;
      y=8;
      #brick;
      x=11;
      y=3;
      #brick*3;
      y-1;
      x-1;
      #goal;
      x-1;
      @rat;
      y=7;
      x-5;
      #sign{text:Go_into_the_blocks};
      x+7;
      @skelly;
      y-2;
      @rat;
      y-2;
      @rat;
      y-1;
      @rat;
      y-1;
      @rat;
      y-1;
      @rat;
    `,
    player: {
      x: 5.9,
      y: 6.8,
    },
  },
  {
    name: "Change level name!",
    // disabled: true,
    dim: [25, 10],
    set: `
      y=6;
      #block*100&3,cracked:1;
      x=0;
      y=5;
      #lamp;
      x+2;
      y-1;
      #block;
      y-1;
      #block;
      #block;
      #scaffold;
      #scaffold;
      x+1;
      y+2;
      #scaffold;
      x+1;
      #scaffold;
      x-1;
      y-1;
      #scaffold;
      x-1;
      y-1;
      #scaffold;
    `,
    player: {
      x: 4,
      y: 5,
    },
  },
];