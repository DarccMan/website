var codes = {
  "48": "0 )",
  "49": "1 !",
  "50": "2 @",
  "51": "3 #",
  "52": "4 $",
  "53": "5 %",
  "54": "6 ^",
  "55": "7 &",
  "56": "8 *",
  "57": "9 (",
  "8": "Backspace",
  "9": "Tab",
  "13": "Enter",
  "16": "Shift",
  "17": "Control / Ctrl",
  "18": "Alt",
  "19": "Pause / Break",
  "20": "Caps Lock / CapsLK",
  "27": "Escape / Esc",
  "33": "Page Up",
  "32": "Space",
  "34": "Page Down",
  "35": "End",
  "36": "Home",
  "37": "Arrow Left 🠔",
  "38": "Arrow Up 🠕",
  "39": "Arrow Right 🠖",
  "40": "Arrow Down 🠗",
  "44": "Print Screen / PrtSc",
  "45": "Insert",
  "46": "Delete",
  "59": "Semicolon ; :",
  "61": "Equal Sign = +",
  "65": "a A",
  "66": "b B",
  "67": "c C",
  "68": "d D",
  "69": "e E",
  "70": "f F",
  "71": "g G",
  "72": "h H",
  "73": "i I",
  "74": "j J",
  "75": "k K",
  "76": "l L",
  "77": "m M",
  "78": "n N",
  "79": "o O",
  "80": "p P",
  "81": "q Q",
  "82": "r R",
  "83": "s S",
  "84": "t T",
  "85": "u U",
  "86": "v V",
  "87": "w W",
  "88": "x X",
  "89": "y Y",
  "90": "z Z",
  "91": "Left Window / Meta Key ",
  "92": "Right Window / Meta Key",
  "93": "Select Key",
  "96": "Numpad 0",
  "97": "Numpad 1",
  "98": "Numpad 2",
  "99": "Numpad 3",
  "100": "Numpad 4",
  "101": "Numpad 5",
  "102": "Numpad 6",
  "103": "Numpad 7",
  "104": "Numpad 8",
  "105": "Numpad 9",
  "106": "Multiply ✕",
  "107": "Add +",
  "109": "Subtract -",
  "110": "Decimal Point .",
  "111": "Divide ÷",
  "112": "F1",
  "113": "F2",
  "114": "F3",
  "115": "F4",
  "116": "F5",
  "117": "F6",
  "118": "F7",
  "119": "F8",
  "120": "F9",
  "121": "F10",
  "122": "F11",
  "123": "F12",
  "144": "Num Lock",
  "145": "Scroll Lock",
  "173": "Dash -",
  "182": "My Computer (multimedia keyboard)",
  "183": "My Calculator (multimedia keyboard)",
  "186": "Semicolon ; :",
  "187": "Equal Sign = +",
  "188": "Comma , <",
  "189": "Dash - _",
  "190": "Period / Full Stop . >",
  "191": "Forward Slash / ?",
  "192": "Backtick ` ~",
  "219": "Open Bracket [ {",
  "220": "Back Slash \\ |",
  "221": "Close Bracket ] }",
  "222": "Single Quote ' \"",
}

var keysDown = {};
addEventListener("keydown", function (e) {
  e.preventDefault();
  keysDown[e.keyCode] = true;
  changeDisplay();
}, false);

addEventListener("keyup", function (e) {
  e.preventDefault();
  delete keysDown[e.keyCode];
  changeDisplay();
}, false);

function changeDisplay() {
  var str = "";
  for (i in keysDown) {
    str += `${i} - ${codes[i] || `
      <span class="unknown">
        Unknown
      </span>
    `}<br>`;
  }
  $("#display").html(str || `
    <span class="none">
      Press any key to begin
    </span>
  `);
}
changeDisplay();

function blur() {
  keysDown = {};
  changeDisplay();
}