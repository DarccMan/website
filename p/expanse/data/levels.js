var levels = [
  {
    name: "Spiky :(",
    dim: [25, 10],
    set: `
      y=4;
      #block*125&3,cracked:1;
      x=0;
      y=3;
      #sign{text:Watch_out_for_rats!};
      x=6;
      y=3;
      #brick*2;
      x+2;
      @rat{test:123,abc};
      x=7;
      y=2;
      #brick*3;
      x=8;
      y=1;
      #block*4&3,cracked:1;
      x=10;
      #spike;
      y=2;
      x+1;
      #pillar;
      y+1;
      #pillar;
      x=15;
      y=3;
      #spike;
      x+3;
      #spike*2;
      x+5;
      #brick*2;
      y-1;
      #brick;
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
      #sign{text:Rats_get_funky};
      x=5;
      y=6;
      #trap*3;
      x+6;
      y-1;
      #torch;
      x-2;
      $6[@rat,x+1];
      x=16;
      y=4;
      @bat;
      x=12;
      y=4;
      #brick;
      x-2;
      y=2;
      #brick;
      x+2;
      y=0;
      #brick*6;
      x+5;
      y+1;
      #brick;
      y+1;
      #brick;
      y+1;
      #brick;
      y+1;
      #brick;
      y+1;
      #brick;
      y+1;
      x+3;
      #none*2;
      y+1;
      #none*2;
      y+1;
      #none*2;
      y+1;
      x-2;
      #none*4;
      y+1;
      #none*4;
      #goal;
      x+1;
      y+1;
      #trap*3;
      x=0;
      y=13;
      #none*3;
      y=14;
      #none*3;
      x+2;
      #sign{text:What's_the_secret_code?};
    `,
    player: {
      x: 2,
      // x: 18,
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
      #sign{text:Press_E_to_pick_up...};
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
    dim: [25, 12],
    set: `
      y=7;
      #block*150&3,cracked:1;
      x=1;
      y=6;
      #sign{text:Press_SHIFT_to_crouch,lol:y_u_lookin_here};
      x+4;
      #brick;
      x=9;
      y=5;
      @rat;
      x+3;
      y-2;
      @skelly;
      x=17;
      y=3;
      @bat;
      x=24;
      y=6;
      @bat;
      x=24;
      x-2;
      y=6;
      #pillar;
      x-3;
      y-1;
      #glass*4;
      y+1;
      #pillar;
      y-2;
      #glass;
      x+3;
      #pillar;
      y-1;
      #glass;
      x-7;
      y-2;
      #glass;
      y-1;
      #goal;
      y+1;
      $5[y+1,#pillar];
    `,
    player: {
      x: 2,
      y: 5,
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
      x+2;
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
      x-1;
      y-1;
      @rat;
      x=14;
      y=7;
      #goal;
      x+5;
      @rat;
    `,
    player: {
      x: 3.9,
      y: 6.8,
    },
  },
  {
    name: "Uhm... no name?",
    // disabled: true,
    dim: [35, 20],
    set: `
      %tunnel=trap;
      y=10;
      #block*1000&3,cracked:1;
      x=0;
      y=10;
      x+3;
      #%tunnel*2;
      y+1;
      #%tunnel*2;
      x+1;
      y+1;
      #%tunnel*4;
      x+2;
      y-1;
      #%tunnel*2;
      x+1;
      y+2;
      #%tunnel;
      y+1;
      #%tunnel;
      x-6;
      y+1;
      #%tunnel*7;
      $3[
        y-1,
        #%tunnel,
        y-1,
        #scaffold,
      ];
      $4[
        x-1,
        #block,
        x+1,
        #scaffold,
        x+1,
        #block,
        x-1,
        y-1,
      ];
      x-1;
      #pillar;
      y-1;
      #fire;
      x+3;
      y+2;
      #brick*8;
      x+7;
      $3[
        y+1,
        #force,
      ];
      x-2;
      #sign{text:Take_the_long_way};
      x+5;
      #goal;
      x-2;
      y-3;
      #glass*6;
      y-1;
      #fire*5;
      y+1;
      x+6;
      #brick;
      x+8;
      y-2;
      #brick;
      x-8;
      y+3;
      #block*9;
      x+7;
      y-1;
      #spike;
      x+1;
      $2[
        #block,
        y-1,
      ];
      y-3;
      x+2;
      $9[
        #glass,
        y+1,
      ];
      x-1;
      #spike;
      x-3;
      #spike;
      x-2;
      #spike;
      x-2;
      #spike;
    `,
    player: {
      x: 5.9,
      y: 8,
    },
  },
  {
    name: "<Debug Level!>",
    disabled: true,
    dim: [40, 30],
    set: `
      y=20;
      #block*400&3,cracked:1;
      x=0;
      y=19;
      #fire;
      x+2;
      y-1;
      #block;
      y-1;
      #block*3;
      x+2;
      #scaffold*2;
      x+3;
      y+2;
      #scaffold*3;
      y-1;
      #scaffold*2;
      y-1;
      #scaffold;
      x+7;
      y=20;
      #none*4;
      $4[@rat,x+1];
      x-6;
      y-4;
    `,
    player: {
      x: 10,
      // x: 20,
      y: 18.5,
      // y: 17,
    },
  },
];