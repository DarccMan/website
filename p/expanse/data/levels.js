var rawLevels = [
  {
    name: "Spiky :(",
    dim: [25, 10],
    set: `
      y=4;
      #block*125&3,cracked:1;
      x=0;
      y=3;
      #sign{text:Watch out for rats!};
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
      y-2;
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
      y: 2.5,
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
      #sign{text:Rats get funky};
      x=5;
      y=6;
      #trap*3;
      x+6;
      y-1;
      #torch;
      x-2;
      $6[
        @rat;
        x+1;
      ];
      x=16;
      y=4;
      @bat;
      x=12;
      #brick;
      x-2;
      y-2;
      #brick;
      x+2;
      y-2;
      #brick*6;
      x+5;
      y+1;
      $5[
        #brick;
        y+1;
      ];
      y-2;
      x+3;
      $5[
        y+1;
        #none*2;
      ];
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
      #sign{text:What's the secret code?};
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
      #sign{text:Press E to pick up...};
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
      y: 4.5,
    },
  },
  {
    name: "Skelly Wag and the Gang",
    dim: [30, 12],
    set: `
      y=7;
      #block*-1&3,cracked:1;
      x=1;
      y=6;
      #sign{text:Press SHIFT to crouch,lol:y u lookin here};
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
      x+3;
      @mouse;
      x+1;
      @mouse;
      x-4;
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
      $5[
        y+1;
        #pillar;
      ];
    `,
    player: {
      x: 2,
      y: 5.5,
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
      #sign{text:Go into the block};
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
      y: 6.5,
    },
  },
  {
    name: "Difficult Juice",
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
        y-1;
        #%tunnel;
        y-1;
        #scaffold;
      ];
      y+1;
      $3[
        x-1;
        #block;
        x+1;
        #scaffold;
        x+1;
        #block;
        y-1;
        x-2;
      ];
      x-2;
      #pillar;
      y-1;
      #fire;
      x+3;
      y+2;
      #brick*8;
      x+7;
      $3[
        y+1;
        #force;
      ];
      x-2;
      #sign{text:Take the long way};
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
      x+2;
      #sign{text:Set Checkpoint with E!};
      x+1;
      #check;
      x-3;
      x+8;
      y-2;
      x-1;
      #brick*2;
      x+1;
      x-8;
      y+3;
      #block*9;
      x+5;
      y-1;
      #spike*3;
      x+3;
      $2[
        #block;
        y-1;
      ];
      y-2;
      x+2;
      $9[
        #glass;
        y+1;
      ];
      x-1;
      y-1;
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
      // x: 17,
      y: 8.5,
      // y: 4,
    },
  },
  {
    name: "Secret Level! :)",
    secret: true,
    dim: [40, 30],
    set: `
      y=20;
      #block*400&3,cracked:1;
      x=16;
      y=11;
      #block;
      x=1;
      y=19;
      $6[
        #scaffold*6;
        y-1;
      ];
      y=19;
      x+8;
      #check;
      x+5;
      #brick*4;
      y-1;
      x+1;
      #brick*3;
      y-1;
      x+1;
      #brick*2;
      y-1;
      x+1;
      #brick;
      x-9;
      y+4;
      #scaffold;
      $3[
        y+1;
        #trap;
      ];
      y-3;
      x+1;
      y+3;
      #trap*8;
      x+8;
      $3[
        #none*4;
        y-1;
      ];
      #none;
      $8[
        y-1;
        #goup;
      ];
      x+1;
      y-10;
      $2[
        #goup*20;
        y-1;
      ];
    `,
    player: {
      x: 16,
      y: 9.5,
      x: 13,
      y: 18.5,
    },
  },
  {
    name: "Spy Rats",
    disabled: true,
    dim: [40, 30],
    set: `
      y=20;
      x=19;
      y=19;
      #glass;
      y+1;
      #glass*4;
      x+4;
      #climb;
      x-4;
      y-2;
      #glass;
      y-1;
      #glass*8;
      x+7;
      $6[
        y+1;
        #glass;
      ];
      x+3;
      y-5;
      @jetrat;
      y+5;
      x-13;
      #glass*10;
      $4[
        y-1;
        #glass;
        x+1;
        #climb;
        x-1;
        y-1;
        #glass;
      ];
      y+2;
      x-6;
      @jetrat;
      x+10;
      y-4;
      #climb;
      x+9;
      #climb;
      $8[
        y-1;
        #goup;
      ];
      x-2;
      #spike{rotate:2}*5;
      y-1;
      #brick*5;
      y+13;
      #glass*8;
      x+7;
      y-1;
      #fire;
      x+1;
      y+1;
      $4[
        #glass;
        y-1;
      ];
      x-5;
      #glass*8;
    `,
    player: {
      x: 20.4,
      y: 18.2,
      // x: 28,
      // y: 13,
    },
  },
  {
    name: "<Debug Level!>",
    disabled: true,
    debug: true,
    dim: [40, 30],
    set: `
      y=10;
      #block*-1;
      x+6;
      $3[
        y-1;
        #scaffold*3;
      ];
      y+2;
      x+4;
      #block*3;
      x+1;
      y-1;
      #block*2;
      x+1;
      y-1;
      #block;
      x+4;
      y-1;
      $3[
        #block;
        x+1;
        y+1;
      ];
      x+1;
      y-3;
      #scaffold;
    `,
    player: {
      x: 4,
      y: 8,
      // x: 17,
    },
  },
];