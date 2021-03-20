var F = {}
F._data = {
  jquery: true,
  canvas: true,
  event: true,
  document: true,
  node: true,
  version: null,
};

/* Checking environment */
try {
  document;
} catch (err) {
  F._data.document = false;
}
try {
  CanvasRenderingContext2D;
} catch (err) {
  F._data.canvas = false;
}
try {
  addEventListener;
} catch (err) {
  F._data.event = false;
}
if (F._data.document) {
  try {
    $;
  } catch (err) {
    F._data.jquery = false;
  }
}
try {
  require
} catch (err) {
  F._data.node = false;
}


/* String functions */
F.fillStr = function (str, amount, fill, reverse) {
  if (!amount) {
    amount = 2;
  }
  if (!fill) {
    fill = "0";
  }
  if (str || str == "") {
    if (str.length > amount) {
      amount = str.length;
    }
    str += "";
    if (reverse) {
      return (str + (fill.repeat(Math.max(0, amount - str.length))));
    }
    return ((fill.repeat(Math.max(0, amount - str.length))) + str);
  }
  return (str);
}
F.center = function (str, amount, fill, fill2, priority) {
  if (!amount) {
    amount = 20;
  }
  if (!fill) {
    fill = " ";
  }
  if (!fill2) {
    fill2 = fill;
  }
  if (str.length > amount) {
    amount = str.length;
  }
  if (str && str.length > 0) {
    let amount2 = (amount - str.length) / 2;
    fillR = amount2.round("c");
    fillL = amount2.round("c");
    ret = fill.repeat(fillL) + str + fill2.repeat(fillR);
    if (ret.length > amount) {
      if (priority) {
        fillR--;
      } else {
        fillL--;
      }
    }
    return (fill.repeat(fillL) + str + fill2.repeat(fillR));
  }
  return (str);
}
F.isJSON = function (str) {
  try {
    JSON.parse(str);
  } catch {
    return (false);
  }
  return (true);
}
F.isURL = function (str) {
  return !!(new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i')).test(str);
}
F.chars = {};
F.chars.vowels = "aeiou".split("");
F.chars.consonants = "bcdfghjklmnpqrstvwxyz".split("");
F.chars.letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
F.chars.lower = "abcdefghijklmnopqrstuvwxyz".split("");
F.chars.upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
F.chars.digits = "1234567890";
F.chars.digitsZero = "0123456789".split("");
F.chars.symbols = "!@#$%^&*() [{]}|;:\", <.>/?`~-_=+".split("");
F.chars.all = "0123456789abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQURSTUVWXYZ!@#$%^&*() [{]}|;:\", <.>/?`~-_=+".split("");
F.chars.cursive = "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩".split("");
F.chars.regional = "🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿".split("");
F.chars.emoji_digits = "0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣".split("");
F.chars.htmlEscape = {
  34: "quot", 38: "amp", 39: "apos", 60: "lt", 62: "gt", 160: "nbsp", 161: "iexcl", 162: "cent", 163: "pound", 164: "curren", 165: "yen", 166: "brvbar", 167: "sect", 168: "uml", 169: "copy", 170: "ordf", 171: "laquo", 172: "not", 173: "shy", 174: "reg", 175: "macr", 176: "deg", 177: "plusmn", 178: "sup2", 179: "sup3", 180: "acute", 181: "micro", 182: "para", 183: "middot", 184: "cedil", 185: "sup1", 186: "ordm", 187: "raquo", 188: "frac14", 189: "frac12", 190: "frac34", 191: "iquest", 192: "Agrave", 193: "Aacute", 194: "Acirc", 195: "Atilde", 196: "Auml", 197: "Aring", 198: "AElig", 199: "Ccedil", 200: "Egrave", 201: "Eacute", 202: "Ecirc", 203: "Euml", 204: "Igrave", 205: "Iacute", 206: "Icirc", 207: "Iuml", 208: "ETH", 209: "Ntilde", 210: "Ograve", 211: "Oacute", 212: "Ocirc", 213: "Otilde", 214: "Ouml", 215: "times", 216: "Oslash", 217: "Ugrave", 218: "Uacute", 219: "Ucirc", 220: "Uuml", 221: "Yacute", 222: "THORN", 223: "szlig", 224: "agrave", 225: "aacute", 226: "acirc", 227: "atilde", 228: "auml", 229: "aring", 230: "aelig", 231: "ccedil", 232: "egrave", 233: "eacute", 234: "ecirc", 235: "euml", 236: "igrave", 237: "iacute", 238: "icirc", 239: "iuml", 240: "eth", 241: "ntilde", 242: "ograve", 243: "oacute", 244: "ocirc", 245: "otilde", 246: "ouml", 247: "divide", 248: "oslash", 249: "ugrave", 250: "uacute", 251: "ucirc", 252: "uuml", 253: "yacute", 254: "thorn", 255: "yuml", 402: "fnof", 913: "Alpha", 914: "Beta", 915: "Gamma", 916: "Delta", 917: "Epsilon", 918: "Zeta", 919: "Eta", 920: "Theta", 921: "Iota", 922: "Kappa", 923: "Lambda", 924: "Mu", 925: "Nu", 926: "Xi", 927: "Omicron", 928: "Pi", 929: "Rho", 931: "Sigma", 932: "Tau", 933: "Upsilon", 934: "Phi", 935: "Chi", 936: "Psi", 937: "Omega", 945: "alpha", 946: "beta", 947: "gamma", 948: "delta", 949: "epsilon", 950: "zeta", 951: "eta", 952: "theta", 953: "iota", 954: "kappa", 955: "lambda", 956: "mu", 957: "nu", 958: "xi", 959: "omicron", 960: "pi", 961: "rho", 962: "sigmaf", 963: "sigma", 964: "tau", 965: "upsilon", 966: "phi", 967: "chi", 968: "psi", 969: "omega", 977: "thetasym", 978: "upsih", 982: "piv", 8226: "bull", 8230: "hellip", 8242: "prime", 8243: "Prime", 8254: "oline", 8260: "frasl", 8472: "weierp", 8465: "image", 8476: "real", 8482: "trade", 8501: "alefsym", 8592: "larr", 8593: "uarr", 8594: "rarr", 8595: "darr", 8596: "harr", 8629: "crarr", 8656: "lArr", 8657: "uArr", 8658: "rArr", 8659: "dArr", 8660: "hArr", 8704: "forall", 8706: "part", 8707: "exist", 8709: "empty", 8711: "nabla", 8712: "isin", 8713: "notin", 8715: "ni", 8719: "prod", 8721: "sum", 8722: "minus", 8727: "lowast", 8730: "radic", 8733: "prop", 8734: "infin", 8736: "ang", 8743: "and", 8744: "or", 8745: "cap", 8746: "cup", 8747: "int", 8756: "there4", 8764: "sim", 8773: "cong", 8776: "asymp", 8800: "ne", 8801: "equiv", 8804: "le", 8805: "ge", 8834: "sub", 8835: "sup", 8836: "nsub", 8838: "sube", 8839: "supe", 8853: "oplus", 8855: "otimes", 8869: "perp", 8901: "sdot", 8968: "lceil", 8969: "rceil", 8970: "lfloor", 8971: "rfloor", 9001: "lang", 9002: "rang", 9674: "loz", 9824: "spades", 9827: "clubs", 9829: "hearts", 9830: "diams", 338: "OElig", 339: "oelig", 352: "Scaron", 353: "scaron", 376: "Yuml", 710: "circ", 732: "tilde", 8194: "ensp", 8195: "emsp", 8201: "thinsp", 8204: "zwnj", 8205: "zwj", 8206: "lrm", 8207: "rlm", 8211: "ndash", 8212: "mdash", 8216: "lsquo", 8217: "rsquo", 8218: "sbquo", 8220: "ldquo", 8221: "rdquo", 8222: "bdquo", 8224: "dagger", 8225: "Dagger", 8240: "permil", 8249: "lsaquo", 8250: "rsaquo", 8364: "euro"
};
String.prototype.join = function () {
  return (this + "");
}
String.prototype.s = function (start, end) {
  var arr = this.split("");
  return (arr.s(start, end).join(""));
}
String.prototype.format = function () {
  var a = this.toString();
  if (![null, undefined].includes(arguments[0])) {
    if (arguments[0].constructor == Object) {
      var a = this;
      for (k in (arguments[0]).keys()) {
        a = a.replaceAll("{" + (arguments[0]).keys()[k] + "}", (arguments[0]).values()[k])
      }
      return (a);
    } else if (arguments[0].constructor == Array) {
      var a = this;
      for (k in F.range(arguments[0].length)) {
        a = a.replaceAll("{" + k + "}", (arguments[0])[k])
      }
      return (a);
    } else {
      for (k in arguments) {
        a = a.replaceAll("{" + k + "}", arguments[k])
      }
      return (a);
    }
  } else {
    return (a);
  }
}
String.prototype.replaceAll = function () {
  if (![undefined, null].includes(arguments[0])) {
    if (arguments[0].constructor == Object) {
      var otp = this;
      for (i = 0; i < arguments[0].keys().length; i++) {
        otp = otp.split(arguments[0].keys()[i]).join(arguments[0].values()[i]);
      }
      return (otp);
    }
    return (this.split(arguments[0]).join(arguments[1]));
  }
}
String.prototype.find = function () {
  var str = this;
  var sub = arguments[0];
  var amount = 1;
  if (arguments.length >= 2) {
    amount = arguments[1];
  }
  val = true;
  for (i = 0; i < amount; i++) {
    if (!str.split(sub).slice(i, str.split(sub).length).join(sub).includes(sub)) {
      val = false;
    }
  }
  return (val);
}
String.prototype.removeDuplicate = function () {
  str = this.split("");
  for (i2 = 0; i2 < str.length - 1; i2++) {
    if (str[i2 + 1] == str[i2]) {
      str[i2] = "";
      i2--;
    }
  }
  return (str.join(""));
}
String.prototype.hashCode = function () {
  var hash = 0;
  for (j = 0; j < this.length; j++) {
    var character = this.charCodeAt(j);
    hash = ((hash << 5) - hash) + character;
    hash = hash & hash;
  }
  return (hash);
}
String.prototype.toArray = function () {
  return ([this.toString()]);
}
String.prototype.truncate = function (amount, end) {
  let str = this.toString();
  if ([null, undefined, NaN].includes(parseInt(amount))) {
    amount = 20;
  }
  if ([null, undefined].includes(end)) {
    end = "";
  }
  if (str.length > amount) {
    str = str.s(0, amount) + end;
  }
  return (str);
}
String.prototype.censor = function (amount, char) {
  let str = this + "";
  amount = parseInt(amount);
  if ([null, undefined, NaN].includes(amount)) {
    amount = 0;
  }
  if ([null, undefined].includes(char)) {
    char = "*";
  }
  if (str.length > amount) {
    str = str.s(0, amount) + char.repeat(str.length - amount);
  }
  return (str);
}
String.prototype.capWords = function () {
  let str = this.split(" ");
  for (j = 0; j < str.length; j++) {
    if (str[j] && str[j][0]) {
      str[j] = str[j][0].toUpperCase() + str[j].s(1, -1);
    }
  }
  return (str.join(" "));
}
String.prototype.splitEach = function (num) {
  let str = this;
  return (str.match(new RegExp(".{1,{0}}".format(num), "g")));
}
String.prototype.replaceCase = function (text, replace, once) {
  text = text.toLowerCase();
  let str = this.toString();
  while (true) {
    index = str.toLowerCase().indexOf(text);
    if (index != -1) {
      str = str.s(0, index) + replace + str.s(index + text.length, -1);
    } else {
      break;
    }
    if (once || !str.toLowerCase().includes(text)) {
      break;
    }
  }
  return (str);
}
String.prototype.replaceMany = function (arr, replace, all, sensitive) {
  let str = this.toString();
  if (![true, false, "true", "false"].includes(all)) {
    all = true;
  }
  if (![true, false, "true", "false"].includes(sensitive)) {
    sensitive = true;
  }
  for (a = 0; a < arr.length; a++) {
    if (sensitive) {
      if (all) {
        str = str.replaceAll(arr[a], replace);
      } else {
        str = str.replace(arr[a], replace);
      }
    } else {
      if (all) {
        str = str.replaceCase(arr[a], replace);
      } else {
        str = str.replaceCase(arr[a], replace, true);
      }
    }
  }
  return (str);
}
String.prototype.stripChars = function (chars) {
  let str = this.toString().split("");
  if ([null, undefined, ""].includes(chars)) {
    chars = F.chars.letters;
  }
  for (i = 0; i < str.length; i++) {
    if (!chars.includes(str[i])) {
      str = str.remove(str[i]);
      i--;
    }
  }
  return (str.join(""));
}
String.prototype.lower = function () {
  return (this.toString().toLowerCase());
}
String.prototype.upper = function () {
  return (this.toString().toUpperCase());
}
String.prototype.fill = function (amount, fill, reverse) {
  return (F.fillStr(this.toString(), amount, fill, reverse));
}
String.prototype.center = function (amount, fill, fill2, priority) {
  return (F.center(this.toString(), amount, fill, fill2, priority));
}
String.prototype.isJSON = function () {
  return (F.isJSON(this.toString()));
}
String.prototype.splitAll = function () {
  let arr = arguments.toArray();
  if (arr && arr[0]) {
    if (arr[0].constructor == Array) {
      arr = arr[0];
    }
    let str = this.toString();
    str = str.replaceMany(arr.s(1, -1), arr[0]);
    return (str.split(arr[0]));
  }
  return (str);
}
String.prototype.strip = function (chars) {
  let str = this.toString();
  if (!chars) {
    chars = F.chars.letters;
  }
  str2 = "";
  for (i = 0; i < str.length; i++) {
    if (chars.includes(str[i])) {
      str2 += str[i];
    }
  }
  return (str2);
}
String.prototype.htmlEscape = function () {
  str = this.toString();
  return str.replace(/[\u00A0-\u2666<>\&]/g, function (c) {
    return "&" + (F.chars.htmlEscape[c.charCodeAt(0)] || "#" + c.charCodeAt(0)) + ";";
  });
}
String.prototype.isURL = function () {
  return F.isURL(this.toString());
}


/* Number functions */
F.randomInt = function (min, max) {
  if (min > max) {
    max = min;
  }
  if (max < min) {
    min = max;
  }
  min--;
  return (Math.ceil((Math.random() * (max - min)) + min));
}
F.randomChoice = function (arr) {
  if (![null, undefined].includes(arr)) {
    return (arr[F.randomInt(0, arr.length - 1)]);
  }
  return (arr);
}
F.randomSeed = function (inputSeed, lengthOfNumber) {
  var output = "";
  seed = inputSeed
  if ([null, undefined, ""].includes(seed)) {
    seed = Date.now();
  }
  var seed = seed.toString();
  var newSeed = 0;
  var characterArray = F.chars.all;
  var longNum = "";
  var counter = 0;
  var accumulator = 0;
  if ([null, undefined].includes(lengthOfNumber)) {
    lengthOfNumber = 10;
  }
  lengthOfNumber += 20;

  for (var i = 0; i < seed.length; i++) {
    var a = seed.length - (i + 1);
    for (var x = 0; x < characterArray.length; x++) {
      var tempX = x.toString();
      var lastDigit = tempX.charAt(tempX.length - 1);
      var xOutput = parseInt(lastDigit);
      addToSeed(characterArray[x], xOutput, a, i);
    }
  }

  function addToSeed(character, value, a, i) {
    if (seed.charAt(i) === character) {
      newSeed = newSeed + value * Math.pow(10, a);
    }
  }
  newSeed = newSeed.toString();

  var copy = newSeed;
  for (var i = 0; i < lengthOfNumber * 9; i++) {
    newSeed = newSeed + copy;
    var x = Math.sin(20982 + (i)) * 10000;
    var y = Math.floor((x - Math.floor(x)) * 10);
    longNum = longNum + y.toString()
  }

  for (var i = 0; i < lengthOfNumber; i++) {
    output = output + longNum.charAt(accumulator);
    counter++;
    accumulator = accumulator + parseInt(newSeed.charAt(counter));
  }
  return (output.s(20, -1));
}
F.round = function (num, dec, type) {
  return (num.round(dec, type));
}
F.range = function (min, max) {
  if ([null, undefined].includes(max)) {
    max = min;
    min = 0;
  }
  min = Math.round(min);
  max = Math.round(max);
  var otp = []
  for (i = min; i < max; i++) {
    otp.push(i);
  }
  return (otp);
}
F.diff = function (n1, n2) {
  return (Math.abs(n1 - n2));
}
F.setBorder = function (num, min, max) {
  return (num.setBorder(min, max));
}
F.wrapNum = (num, min, max, iters, fallback) => {
  if ([null, undefined, "", 0].includes(iters)) {
    iters = 1000;
  }
  if ([null, undefined, ""].includes(min)) {
    min = 0;
  }
  if ([null, undefined, ""].includes(max)) {
    max = 12;
  }
  for (i = 0; i < iters; i++) {
    if (num > max) {
      num = min + (num - max);
    }
    if (num < min) {
      num = max - (min - num);
    }
    if (num <= max && num >= min) {
      break;
    }
    if (i >= iters - 1) {
      console.error("Inbuilt error: Too many iterations - stopped to prevent crashing");
    }
  }
  if (!(num <= max && num >= min)) {
    if (fallback !== true) {
      num = max;
    } else {
      num = min;
    }
  }
  return (num);
}
F.min = function () {
  let args = arguments;
  if (args[0] && args[0].constructor == Array) {
    args = args[0];
  }
  min = Infinity;
  for (m = 0; m < args.length; m++) {
    if (args[m] < min) {
      min = args[m];
    }
  }
  return (min == Infinity ? NaN : min);
}
F.max = function () {
  let args = arguments;
  if (args[0] && args[0].constructor == Array) {
    args = args[0];
  }
  max = 0 - Infinity;
  for (m = 0; m < args.length; m++) {
    if (args[m] > max) {
      max = args[m];
    }
  }
  return (max == (0 - Infinity) ? NaN : max);
}
F.factor = function () {
  let args = arguments;
  if (args[0] && args[0].constructor == Array) {
    args = args[0];
  }
  min = F.min(Array.from(args));
  if (args.length > 1 && min && min != Infinity) {
    for (fact = (min / 2).round(0, "f"); fact > 0; fact--) {
      val = true;
      for (a = 0; a < args.length; a++) {
        if ((args[a] % fact) != 0) {
          val = false;
        }
      }
      if (val) {
        break;
      }
    }
    return (fact);
  }
  return (NaN);
}
F.toOne = function (num) {
  return (num.toOne())
}
F.sleep = function (time) {
  return (new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time * 1000);
  }));
}
F.hourFormat = function (num) {
  if (num > 12) {
    num -= 12;
  }
  return (num);
}
F.addOrdinal = (num) => {
  return (num.addOrdinal());
}
F.dec_bin = function (dec) {
  return ((dec >>> 0).toString(2));
}
F.bool_bin = function () {
  let bin = "";
  for (a = 0; a < arguments.length; a++) {
    bin += (arguments[a]) ? "1" : "0";
  }
  return (bin)
}
F.bin_bool = function () {
  let arr = [];
  for (a = 0; a < arguments.length; a++) {
    arr.push(arguments ? 1 : 0);
  }
  return (arguments);
}
F.parseBoolean = function (bool) {
  if (bool == "false" || bool == "0") {
    return (false);
  }
  return (!!bool);
}
F.operate = {};
F.operate.equal = {};
F.operate.equal.value = function (v1, v2) {
  return (v1 == v2);
}
F.operate.equal.type = function (v1, v2) {
  return (v1 === v2);
}
F.operate.equal.notValue = function (v1, v2) {
  return (v1 != v2);
}
F.operate.equal.notType = function (v1, v2) {
  return (v1 == v2);
}
F.operate.equal.great = function (v1, v2) {
  return (v1 > v2);
}
F.operate.equal.less = function (v1, v2) {
  return (v1 < v2);
}
F.operate.equal.greatEqual = function (v1, v2) {
  return (v1 >= v2);
}
F.operate.equal.lessEqual = function (v1, v2) {
  return (v1 <= v2);
}
F.operate.logic = {};
F.operate.logic.not = function (v1) {
  return (!v1);
}
F.operate.logic.and = function (v1, v2) {
  return (v1 && v2);
}
F.operate.logic.nand = function (v1, v2) {
  return (!(v1 && v2));
}
F.operate.logic.or = function (v1, v2) {
  return (v1 || v2);
}
F.operate.logic.nor = function (v1, v2) {
  return (!(v1 || v2));
}
F.operate.logic.xor = function (v1, v2) {
  return ((v1 || v2) && (!(v1 && v2)));
}
F.operate.logic.xnor = function (v1, v2) {
  return (!((v1 || v2) && (!(v1 && v2))));
}
F.operate.bit = {};
F.operate.bit.and = function (v1, v2) {
  return (v1 & v2);
}
F.operate.bit.or = function (v1, v2) {
  return (v1 | v2);
}
F.operate.bit.not = function (v1) {
  return (~v1);
}
F.operate.bit.xor = function (v1, v2) {
  return (v1 ^ v2);
}
F.operate.bit.lshift = function (v1, v2) {
  return (v1 << v2);
}
F.operate.bit.rshift = function (v1, v2) {
  return (v1 >> v2);
}
F.operate.math = {};
F.operate.math.add = function () {
  let arr = arguments.toArray();
  if (arr && arr[0] != undefined) {
    if (arr[0].constructor == Array) {
      arr = arr[0];
    }
    let num = 0;
    for (i = 0; i < arr.length; i++) {
      num += parseFloat(arr[i]);
    }
    return (num);
  }
  return (NaN);
}
F.operate.math.subtract = function () {
  let arr = arguments.toArray();
  if (arr && arr[0] != undefined) {
    if (arr[0].constructor == Array) {
      arr = arr[0];
    }
    let num = arr[0];
    for (i = 1; i < arr.length; i++) {
      num -= parseFloat(arr[i]);
    }
    return (num);
  }
  return (NaN);
}
F.operate.math.multiply = function () {
  let arr = arguments.toArray();
  if (arr && arr[0] != undefined) {
    if (arr[0].constructor == Array) {
      arr = arr[0];
    }
    let num = arr[0];
    for (i = 1; i < arr.length; i++) {
      num *= parseFloat(arr[i]);
    }
    return (num);
  }
  return (NaN);
}
F.operate.math.divide = function () {
  let arr = arguments.toArray();
  if (arr && arr[0] != undefined) {
    if (arr[0].constructor == Array) {
      arr = arr[0];
    }
    let num = arr[0];
    for (i = 1; i < arr.length; i++) {
      num /= parseFloat(arr[i]);
    }
    return (num);
  }
  return (NaN);
}
F.operate.math.power = function (v1, v2) {
  let arr = arguments.toArray();
  if (arr && arr[0] != undefined) {
    if (arr[0].constructor == Array) {
      arr = arr[0];
    }
    let num = arr[0];
    for (i = 1; i < arr.length; i++) {
      num **= parseFloat(arr[i]);
    }
    return (num);
  }
  return (NaN);
}
F.operate.math.mod = function (v1, v2) {
  return (v1 % v2);
}
F.splitDivide = function (num, amount) {
  let arr = [];
  for (i = 0; i < amount; i++) {
    arr.push((num / amount) * i);
  }
  arr.push(num);
  return (arr);
}
F.average = {};
F.average.mean = function (arr) {
  let tot = 0;
  let amount = 0;
  for (i = 0; i < arr.length; i++) {
    if (typeof arr[i] == "number") {
      tot += arr[i];
      amount++;
    }
  }
  return (tot / amount);
}

Number.prototype.join = function () {
  return (this.toString());
}
Number.prototype.in = function (min, max, inclusive) {
  if (inclusive !== false) {
    if (this <= max && this >= min) {
      return (true);
    }
  } else {
    if (this < max && this > min) {
      return (true);
    }
  }
  return (false);
}
Number.prototype.commaFormat = function () {
  return (this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}
Number.prototype.squeeze = function (max_new, max_old) {
  let num = parseFloat(this);
  if ([null, undefined, "", NaN].includes(max_new)) {
    max_new = 8;
  }
  if ([null, undefined, "", NaN].includes(max_old)) {
    max_old = 10;
  }
  return (max_new * (num / max_old));
}
Number.prototype.round = function (dec, type) {
  let num = parseFloat(this);
  dec = parseInt(dec);
  if ([null, undefined, "", NaN].includes(dec)) {
    dec = 0;
  }
  switch (type) {
    case ("f"): {
      return (Math.floor(num * (10 ** dec))) / (10 ** dec);
    }
    case ("c"): {
      return (Math.ceil(num * (10 ** dec))) / (10 ** dec);
    }
  }
  return (Math.round(num * (10 ** dec))) / (10 ** dec);
}
Number.prototype.setBorder = function (min, max) {
  let num = parseFloat(this);
  if ([null, undefined, ""].includes(min)) {
    min = 0;
  }
  if ([null, undefined, ""].includes(max)) {
    max = 100;
  }
  if (num > max) {
    num = max;
  } else if (num < min) {
    num = min;
  }
  return (num);
}
Number.prototype.toOne = function () {
  let num = parseFloat(this);
  if (num > 0) {
    return (-1);
  } else if (num < 0) {
    return (1);
  }
  return (0);
}
Number.prototype.toBin = function () {
  let dec = parseFloat(this);
  return ((dec >>> 0).toString(2));
}
Number.prototype.addOrdinal = () => {
  num = parseInt(this);
  if (![NaN, null, undefined, ""].includes(num)) {
    if (typeof num == "number") {
      var ord = "th";
      switch (parseInt((num + "").s(-1))) {
        case (1): {
          ord = "st";
        }; break;
        case (2): {
          ord = "nd";
        }; break;
        case (3): {
          ord = "rd";
        }; break;
      }
      return (num + ord);
    }
  }
  return (num);
}
Number.prototype.wrap = function (min, max, inclusive) {
  let num = parseFloat(this);
  let iters = 1000;
  for (i = 0; i < iters; i++) {
    if (inclusive) {
      if (num >= max) {
        num = min + (num - max) + 1;
      } else if (num <= min) {
        num = max - (min - num) - 1;
      } else {
        break;
      }
    } else {
      if (num > max) {
        num = min + (num - max);
      } else if (num < min) {
        num = max - (min - num);
      } else {
        break;
      }
    }
    if (i + 1 >= iters) {
      console.error("Inbuilt error - Too many iterations, stopped to prevent crashing");
    }
  }
  return (num);
}
Number.prototype.snapTo = function () {
  let num = parseFloat(this);
  let arr = arguments;
  if (typeof arr[0] == "object") {
    arr = arr[0];
  }
  let min = {
    v: Infinity,
    n: null,
  };
  for (i = 0; i < arr.length; i++) {
    let diff = F.diff(parseFloat(arr[i]), num);
    if (diff < min.v) {
      min = {
        v: diff,
        n: i,
      };
    }
  }
  return (arr[min.n]);
}
Number.prototype.toTime = function () {
  return (F.toTime(parseFloat(this)));
}


/* Date / time functions */
F.toTime = function (time) {
  let units = {
    "seconds": 1000,
    "minutes": 60,
    "hours": 60,
    "days": 24,
    "weeks": 7,
    "months": 4.34524,
    "years": 12,
  };
  let unit = "milliseconds";
  for (i = 0; i < units.keys().length; i++) {
    if (time >= units.values()[i]) {
      time /= units.values()[i];
      unit = units.keys()[i];
    } else {
      break;
    }
  }
  return ([time, unit]);
}
F.toMSecs = function (time, unit) {
  let units = {
    "seconds": 1000,
    "minutes": 60,
    "hours": 60,
    "days": 24,
    "weeks": 7,
    "months": 4.34524,
    "years": 12,
  };
  for (i = units.keys().indexOf(unit); i >= 0; i--) {
    time *= units.values()[i];
  }
  return (time);
}
Date.prototype.getWeek = function () {
  d = this;
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return (weekNo);
}
Date.prototype.get24Time = function () {
  return (F.fillStr(this.getHours()) + F.fillStr(this.getMinutes()));
}
Date.prototype.getFullTime = function () {
  return ("{0}:{1}".format(this.getHours().wrap(1, 12), F.fillStr(this.getMinutes())));
}
Date.prototype.getFullDate = function () {
  return ([
    this.getDate(),
    this.getMonth() + 1,
    this.getFullYear().toString().s(-2, -1),
  ].join("/"));
}
Date.prototype.getDayOfYear = function () {
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  return (day);
}


/* Array functions */
F.joinArray = function () {
  var a = [];
  for (i = 0; i < arguments.length; i++) {
    for (i2 = 0; i2 < arguments[i].length; i2++) {
      a.push(arguments[i][i2]);
    }
  }
  return (a);
}
F.toArray = function (v) {
  if (v && v.constructor == Array) {
    return (v);
  }
  return ([v]);
}
Array.prototype.s = function (start, end) {
  var arr = this;
  for (a = 0; a < arr.length; a++) {
    if (typeof arr[a] != "string") {
      arr[a] = JSON.stringify(arr[a]);
    }
  }
  if ([null, undefined].includes(start)) {
    start = 0;
  }
  if (end == null) {
    end = start + 1;
    if (start < 0) {
      end--;
    }
  }
  if (start < 0) {
    start = arr.length + start;
  }
  if (end < 0) {
    end = arr.length + end + 1;
  }
  if (start < 0 && end >= 0) {
    start = 0;
  }
  arr = arr.slice(start, end);
  if (arr.length <= 1) {
    arr = arr[0];
    if (F.isJSON(arr) && arr != 0) {
      arr = JSON.parse(arr);
    }
    return (arr ? arr : []);
  }
  for (a = 0; a < arr.length; a++) {
    if (F.isJSON(arr[a]) && arr[a] != 0) {
      arr[a] = JSON.parse(arr[a]);
    }
  }
  return (arr ? arr : []);
}
Array.prototype.append = function (item) {
  this.push(item);
}
Array.prototype.output = function (s1) {
  if ([null, undefined, ""].includes(s1)) {
    s1 = "\n";
  }
  var otp = "";
  for (i = 0; i < this.length; i++) {
    otp = otp + this[i] + s1;
  }
  return (otp);
}
Array.prototype.remove = function (item, useIndex, onlyOne) {
  let arr = Array.from(this);
  for (i = 0; i < ((onlyOne || useIndex) ? 1 : 1000); i++) {
    if (!useIndex) {
      if (!arr.includes(item)) {
        continue;
      }
      index = arr.indexOf(item);
    } else {
      index = item;
    }
    if (index > -1) {
      arr.splice(index, 1);
    }
  }
  return (arr);
}
Array.prototype.addAll = function (num) {
  var arr = [];
  if (![null, undefined].includes(num) && num.constructor == Number) {
    for (i = 0; i < this.length; i++) {
      if (![null, undefined].includes(this[i]) && this[i].constructor == Number) {
        arr[i] = this[i] + num;
      } else {
        arr[i] = this[i];
      };
    };
  };
  return (arr);
};
Array.prototype.getFromId = function (name, id) {
  arr = this;
  if ([null, undefined, ""].includes(id)) {
    id = "id";
  }
  for (i = 0; i < arr.length; i++) {
    if (arr[i][id] == name) {
      return (arr[i]);
    }
  }
}
Array.prototype.getIndexFromId = function (name, id) {
  arr = this;
  if ([null, undefined, ""].includes(id)) {
    id = "id";
  }
  for (i = 0; i < arr.length; i++) {
    if (arr[i][id] == name) {
      return (i);
    }
  }
  return (-1);
}
Array.prototype.toArray = function () {
  return (this);
}
Array.prototype.removeEmpty = function (items) {
  let arr = this;
  if (!items) {
    items = [null, undefined, "", [], 0];
  }
  for (i = 0; i < arr.length; i++) {
    if (items.includes(arr[i])) {
      arr.removeIndex(i);
      i--;
    }
  }
  return (arr);
}
Array.prototype.shuffle = function () {
  let arr = this.toArray();
  let j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return (arr);
}
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};


/* Object functions */
F.valuesToKey = function (value, obj, key) {
  if (key) {
    for (c = 0; c < obj.keys().length; c++) {
      if (![null, undefined, [], {}].includes(obj.values()[c][key])) {
        if (obj.values()[c][key].includes(value)) {
          value = obj.keys()[c];
          break;
        }
      }
    }
  } else {
    for (c = 0; c < obj.keys().length; c++) {
      if (![null, undefined, [], {}].includes(obj.values()[c])) {
        if (obj.values()[c].includes(value)) {
          value = obj.keys()[c];
          break;
        }
      }
    }
  }
  return (value);
}
Object.prototype.keys = function () {
  return (Object.keys(this));
}
Object.prototype.values = function () {
  return (Object.values(this));
}
Object.prototype.sort = function (func) {
  var dict = this;
  var sorted = dict.keys();
  if (func && func.constructor == Function) {
    sorted.sort(func);
  } else {
    sorted.sort((a, b) => {
      return (a - b);
    });
  }
  var tempDict = {};
  for (var i = 0; i < sorted.length; i++) {
    tempDict[sorted[i]] = dict[sorted[i]];
  }
  return (tempDict);
}
Object.prototype.output = function (s1, s2) {
  if (s1 == null) {
    s1 = ": ";
  }
  if (s2 == null) {
    s2 = "\n";
  }
  var obj = this;
  var otp = "";
  for (i = 0; i < obj.keys().length; i++) {
    s2_ = s2;
    if (i <= 0) {
      s2_ = "";
    }
    otp += s2_ + obj.keys()[i] + s1 + obj.values()[i];
  }
  return (otp);
}
Object.prototype.switchValues = function () {
  var otp = {}
  for (i = 0; i < this.keys().length; i++) {
    otp[this.values()[i]] = this.keys()[i];
  }
  return (otp);
}
Object.prototype.ifTrue = function () {
  var otp = []
  for (key = 0; key < this.keys().length; key++) {
    if (this.values()[key]) {
      otp.push(this.keys()[key]);
    }
  }
  return (otp);
}
Object.prototype.indexOf = function (item) {
  for (i = 0; i < this.keys().length; i++) {
    if (this[this.keys()[i]] == item) {
      return (this.keys()[i]);
    }
  }
}
Object.prototype.getFromValue = function (value) {
  obj = this;
  for (i = 0; i < obj.keys().length; i++) {
    if (obj.values()[i] == value) {
      return (obj.keys()[i]);
    }
  }
}
Object.prototype.capKeys = function () {
  obj = {};
  for (i2 = 0; i2 < this.keys().length; i2++) {
    obj[this.keys()[i2][0].toUpperCase() + this.keys()[i2].s(1, -1).toLowerCase()] = this.values()[i2];
  }
  return (obj);
}
Object.prototype.sortValues = function () {
  var obj = this;
  var sortable = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      sortable.push([key, obj[key]]);
    }
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  obj2 = {};
  for (s = 0; s < sortable.length; s++) {
    obj2[sortable[s][0]] = sortable[s][1];
  }
  return (obj2);
}
Object.prototype.add = function (key, amount, min) {
  let obj = this;
  if (!amount || amount < 0) {
    amount = 1;
  }
  if (!min || min < 0) {
    min = 1;
  }
  if (![undefined, null, ""].includes(obj[key])) {
    obj[key]++;
  } else {
    obj[key] = min;
  }
  return (obj);
}
Object.prototype.removeEmpty = function (items) {
  let obj = this;
  if (!items) {
    items = [null, undefined, "", [], 0];
  }
  for (i = 0; i < obj.keys().length; i++) {
    if (items.includes(obj.values()[i])) {
      delete obj[obj.keys()[i]];
      i--;
    }
  }
  return (obj);
}

Object.prototype.keyPath = function (path) {
  let obj = this;
  if (path) {
    for (i = 0; i < path.length; i++) {
      obj = obj[path[i]];
      if (obj == undefined) {
        break;
      }
    }
  }
  return (obj);
}
Object.prototype.toArray = function () {
  return (this.values());
}


/* Canvas / game functions */
F.collide = function (r1, r2, ellipse1, ellipse2) {
  if (
    !(
      r1
      && r1.x
      && r1.y
      && r2
      && r2.x
      && r2.y
    )
  ) {
    return (false);
  }
  switch (F.bool_bin(ellipse1, ellipse2)) {
    case ("00"): {
      return (
        r1.x + r1.w > r2.x &&
        r1.x < r2.x + r2.w &&
        r2.y + r2.h > r1.y &&
        r2.y < r1.y + r1.h
      );
    };
    case ("10"): {
      var testX = r2.x;
      var testY = r2.y;
      if (r2.x < r1.x) {
        testX = r1.x;
      } else if (r2.x > r1.x + r1.w) {
        testX = r1.x + r1.w;
      }
      if (r2.y < r1.y) {
        testY = r1.y;
      } else if (r2.y > r1.y + r1.h) {
        testY = r1.y + r1.h;
      }
      let distX = r2.x - testX;
      let distY = r2.y - testY;
      distance = Math.sqrt((distX * distX) + (distY * distY));
      return (distance <= r2.r);
    };
    case ("11"): {
      var dx = r1.x - r2.x;
      var dy = r1.y - r2.y;
      var distance = Math.sqrt((dx ** 2) + (dy ** 2));
      return (distance < r1.r + r2.r);
    };
  }
  return (null);
}
F.collide3d = function (r1, r2) {
  return (
    r1.x + r1.w > r2.x &&
    r1.x < r2.x + r2.w &&
    r2.y + r2.h > r1.y &&
    r2.y < r1.y + r1.h &&
    r2.z + r2.d > r1.z &&
    r2.z < r1.z + r1.d
  );
}
F.getAngle = function (x1, y1, x2, y2, angle) {
  if (angle) {
    return ((Math.atan2((x1 - x2), (y2 - y1))) / Math.PI * 180);
  }
  return (Math.atan2((x1 - x2), (y2 - y1)));
}
F.getCoords = function (x, y, d, a) {
  return ({
    x: Math.cos(a * Math.PI / 180) * d + x,
    y: Math.sin(a * Math.PI / 180) * d + y,
  });
}
F.angleAmount = function (angle) {
  return (F.diff((Math.floor(angle / 90) * 90), angle));
}
F.getCamPos = function (r, camera, center) {
  if (!center) {
    if (F._data.document) {
      center = doc.tag("canvas")[0];
    }
  }
  if (!center.w && center.width) {
    center.w = center.width;
  }
  if (!center.h && center.height) {
    center.h = center.height;
  }
  return ({
    x: (((r.x - camera.x) - (center.w / 2)) * (camera.z / 100)) + (center.w / 2),
    y: (((r.y + camera.y) - (center.h / 2)) * (camera.z / 100)) + (center.h / 2),
    w: r.w * (camera.z / 100),
    h: r.h * (camera.z / 100),
  });
}
F.vals = {}
F.val = function (name, condition, func1, func2, start) {
  if (F.vals[name]) {
    if (start) {
      start = false;
    }
    F.vals[name] = start;
  }
  if (condition) {
    if (F.vals[name]) {
      if (func1 && typeof func1 == "function") {
        func1();
      } else {
        return (true);
      }
    } else {
      if (func2 && typeof func2 == "function") {
        func2();
      } else {
        return (false);
      }
    }
    F.vals[name] = false;
  } else {
    F.vals[name] = true;
    return (false);
  }
}
F.trace = function (p1, p2, pd) {
  if ([null, undefined, "", 0].includes(pd)) {
    pd = 10;
  }
  dst = Math.round(Math.max(F.diff(p1.x, p2.x), F.diff(p1.y, p2.y)));
  amount = dst / pd;
  ray = [];
  for (p = amount; p > 0; p--) {
    ray.push({
      x: p1.x + ((p2.x - p1.x) * ((p / amount) / 1.001)),
      y: p1.y + ((p2.y - p1.y) * ((p / amount) / 1.001)),
    });
    if (ray[amount - p].x == p2.x && ray[amount - p].y == p2.y) {
      break;
    }
  }
  return (ray);
}
F.trace3d = function (p1, p2, pd) {
  if ([null, undefined, "", 0].includes(pd)) {
    pd = 10;
  }
  dst = Math.round(Math.max(F.diff(p1.x, p2.x), F.diff(p1.y, p2.y), F.diff(p1.z, p2.z)));
  amount = dst / pd;
  ray = [];
  for (p = amount; p > 0; p--) {
    ray.push({
      x: p1.x + ((p2.x - p1.x) * ((p / amount) / 1.001)),
      y: p1.y + ((p2.y - p1.y) * ((p / amount) / 1.001)),
      z: p1.z + ((p2.z - p1.z) * ((p / amount) / 1.001)),
    });
    if (ray[amount - p].x == p2.x && ray[amount - p].y == p2.y && ray[amount - p].z == p2.z) {
      break;
    }
  }
  return (ray);
}
if (F._data.canvas) {
  F.getCtx = function () {
    for (i in self) {
      if (![null, undefined].includes(self[i])) {
        if (self[i].constructor == CanvasRenderingContext2D) {
          return (self[i]);
        }
      }
    }
  }
  F.getCanvas = function () {
    for (i in self) {
      if (![null, undefined].includes(self[i])) {
        if (self[i].constructor == HTMLCanvasElement) {
          return (self[i]);
        }
      }
    }
  }
  HTMLCanvasElement.prototype.changeRes = function (amount) {
    this.style.width = this.width + "px";
    this.style.height = this.height + "px";
    this.width = parseFloat(this.style.width) * amount;
    this.height = parseFloat(this.style.height) * amount;
  }
  HTMLCanvasElement.prototype.initialize = function () {
    this.__defineGetter__("w", () => {
      return (this.width);
    });
    this.__defineGetter__("h", () => {
      return (this.height);
    });
  }
  CanvasRenderingContext2D.prototype.fillCanvas = function (color) {
    prevColor = this.fillStyle;
    if ([null, undefined, ""].includes(color)) {
      color = "rgba(60, 60, 60)";
    }
    this.fillStyle = color;
    this.fillRect(0, 0, canvas.width, canvas.height);
    this.fillStyle = prevColor;
  }
  CanvasRenderingContext2D.prototype.getPixelColor = function (x, y) {
    return (this.getImageData(x, y, 1, 1,).data);
  }
  CanvasRenderingContext2D.prototype.scanCanvas = function () {
    output = []
    for (x = 0; x < canvas.width; x++) {
      output.push([]);
      for (y = 0; y < canvas.height; y++) {
        output[x].push(F.rgb_hex(ctx.getPixelColor(x, y)[0], ctx.getPixelColor(x, y)[1], ctx.getPixelColor(x, y)[2]));
      }
    }
    return (output);
  }
  CanvasRenderingContext2D.prototype.fillRoundRect = function (x, y, w, h, r) {
    if (w < 2 * r) {
      r = w / 2;
    }
    if (h < 2 * r) {
      r = h / 2;
    }
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.fill();
  }
  CanvasRenderingContext2D.prototype.strokeRoundRect = function (x, y, w, h, r) {
    if (w < 2 * r) {
      r = w / 2;
    }
    if (h < 2 * r) {
      r = h / 2;
    }
    if (r == undefined) {
      r = 4;
    }
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.stroke();
  }
}


/* Event listener functions */
if (F._data.event) {
  F.event = {};
  F.keysDown = {};
  F.keySeq = [];
  F.event.keydown = addEventListener("keydown", (e) => {
    F.keysDown[e.keyCode] = true;
    F.keySeq.push(e.keyCode);
    if (F.keySeq.length >= 100) {
      F.keySeq.shift(0);
    }
  }, false);
  F.event.keyup = addEventListener("keyup", (e) => {
    delete F.keysDown[e.keyCode];
  }, false);
  F.keyDown = function (keys = []) {
    if (Object.keys(F.keysDown).includes(keys + "")) {
      return (true);
    }
    for (i4 = 0; i4 < keys.length; i4++) {
      if (Object.keys(F.keysDown).includes(keys[i4] + "")) {
        return (true);
      }
    }
    return (false);
  }
  F.getKeyCodes = function (data) {
    var keys = [];
    if (data.keys) {
      for (k = 0; k < data.keys.keys().length; k++) {
        var val = false;
        for (v = 0; v < data.keys.values()[k].length; v++) {
          if (F.keyDown(data.keys.values()[k][v])) {
            val = true;
          }
        }
        if (val && !(keys.includes(data.keys.keys()[k]))) {
          keys.push(data.keys.keys()[k]);
        } else {
          keys = keys.remove(data.keys.keys()[k]);
        }
      }
    }
    if (data.buttons) {
      for (i = 0; i < data.buttons.keys().length; i++) {
        var val = false;
        for (i2 = 0; i2 < data.buttons.values()[i].length; i2++) {
          if (F.buttonDown(data.buttons.values()[i][i2])) {
            val = true;
          }
        }
        if (val && !(keys.includes(data.buttons.keys()[i]))) {
          keys.push(data.buttons.keys()[i]);
        } else {
          keys = keys.remove(data.buttons.keys()[i]);
        }
      }
    }
    return (keys);
  }
  F.buttonsDown = {};
  F.event.mousedown = addEventListener("mousedown", (e) => {
    F.buttonsDown[e.button] = true;
  }, false)
  F.event.mouseup = addEventListener("mouseup", (e) => {
    delete F.buttonsDown[e.button];
  }, false)
  F.buttonDown = function (buttons = []) {
    if (Object.keys(F.buttonsDown).includes(buttons + "")) {
      return (true);
    }
    for (i4 = 0; i4 < buttons.length; i4++) {
      if (Object.keys(F.buttonsDown).includes(buttons[i4] + "")) {
        return (true);
      }
    }
    return (false);
  }
  F.mouse = {
    x: null,
    y: null,
    w: 1,
    h: 1,
    r: 1,
    onCanvas: false,
    unknown: true,
  };
  F.getMousePos = function (e, offsetX, offsetY) {
    offsetX = parseInt(offsetX);
    offsetY = parseInt(offsetY);
    if (!offsetX) {
      offsetX = 11;
    }
    if (!offsetY) {
      offsetY = 11;
    }
    return {
      x: e.clientX - 11,
      y: e.clientY - 11,
      w: 1,
      h: 1,
      r: 1,
    };
  }
  F.onCanvas = function (e) {
    if (doc.tag("canvas").length >= 1) {
      F.rect = doc.tag("canvas")[0].getBoundingClientRect();
      if (
        e.clientX > F.rect.left
        && e.clientY > F.rect.top
        && e.clientX < (doc.tag("canvas")[0].width + (F.rect.left))
        && e.clientY < (doc.tag("canvas")[0].height + (F.rect.top))
      ) {
        return (true);
      }
    }
    return (false);
  }
  F.event.mousemove = addEventListener("mousemove", (e) => {
    F.mouse = F.getMousePos(e);
    F.mouse.onCanvas = F.onCanvas(e);
  })

  F.touch = {
    down: false,
    x: null,
    y: null,
    onCanvas: false,
    unknown: true,
  };
  F.event.touchstart = addEventListener("touchstart", (e) => {
    F.touch.unknown = false;
    F.touch.down = true;
    F.touch.x = e.touches[0].clientX;
    F.touch.y = e.touches[0].clientY;
    F.touch.onCanvas = F.onCanvas(e.touches[0]);
    F.buttonsDown[0] = true;
  }, false);
  F.event.touchend = addEventListener("touchend", (e) => {
    F.touch.unknown = false;
    F.touch.down = false;
    F.buttonsDown[0] = false;
  }, false);
  F.event.touchmove = addEventListener("touchmove", (e) => {
    F.touch.unknown = false;
    F.touch.x = e.touches[0].clientX;
    F.touch.y = e.touches[0].clientY;
    F.touch.onCanvas = F.onCanvas(e.touches[0]);
    F.mouse.x = e.touches[0].clientX;
    F.mouse.y = e.touches[0].clientY;
  }, false);
}

/* Colour functions */
F.getColor = function (arr, add, type) {
  if ([null, undefined, ""].includes(add)) {
    add = 0;
  }
  add = parseFloat(add);
  if ([null, undefined, ""].includes(arr) || arr.length <= 0) {
    return ("rgba({0}, {1}, {2})".format(F.randomInt(0, 255), F.randomInt(0, 255), F.randomInt(0, 255)));
  }
  if (arr.constructor == Object) {
    arr = arr.values();
  }
  if (typeof arr == "number") {
    arr = [arr];
  }
  switch (type) {
    default: {
      if (arr.length >= 4) {
        return ("rgba({0}, {1}, {2}, {3})".format(arr));
      } else if (arr.length == 1) {
        return ("rgb({0}, {0}, {0})".format(arr.addAll(add)));
      } else {
        return ("rgb({0}, {1}, {2})".format(arr.addAll(add)));
      }
    }
  }
}
F.hex_rgb = function (hex) {
  var c;
  if (!/^#/.test(hex)) {
    hex = "#" + hex;
  }
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return ({
      r: (c >> 16) & 255,
      g: (c >> 8) & 255,
      b: c & 255,
    });
  }
  if (/^#([A-Fa-f0-9]{4}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return ({
      r: (c >> 24) & 255,
      g: (c >> 16) & 255,
      b: (c >> 8) & 255,
      a: c & 255,
    });
  }
  console.error("Inbuilt error: invalid hex code: {0}".format(hex));
}
F.hex_hsv = function (hex) {
  return (F.rgb_hsv(F.hex_rgb(hex)));
}
F.toHex = function (c) {
  if (c || c == 0) {
    let hex = c.toString(16);
    if (hex) {
      return (hex.length == 1 ? "0" + hex : hex);
    }
  }
  return ("ff");
}
F.rgb_hex = function (r, g, b, a) {
  if (arguments.length === 1) {
    if (r || r == 0) {
      if (r.constructor == Object) {
        g = r.g, b = r.b;
        if (r.a) {
          a = r.a;
        }
        r = r.r;
      } else {
        g = r[1], b = r[2];
        if (r[3]) {
          a = r[3];
        }
        r = r[0];
      }
    } else {
      r = 0, g = 0, b = 0;
    }
  }
  if (a != undefined) {
    return ("#" + F.toHex(r) + F.toHex(g) + F.toHex(b) + F.toHex(a));
  }
  return ("#" + F.toHex(r) + F.toHex(g) + F.toHex(b));
}
F.rgb_hsv = function (r, g, b) {
  if (arguments.length === 1) {
    if (r != undefined && r.constructor == Object) {
      g = r.g, b = r.b, r = r.r;
    } else {
      g = r[1], b = r[2], r = r[0];
    }
  }
  var max = Math.max(r, g, b), min = Math.min(r, g, b),
    d = max - min,
    h,
    s = (max === 0 ? 0 : d / max),
    v = max / 255;
  switch (max) {
    case min: h = 0; break;
    case r: h = (g - b) + d * (g < b ? 6 : 0); h /= 6 * d; break;
    case g: h = (b - r) + d * 2; h /= 6 * d; break;
    case b: h = (r - g) + d * 4; h /= 6 * d; break;
  }
  return {
    h: Math.round(h * 100),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}
F.hsv_rgb = function (h, s, v) {
  if (arguments.length === 1) {
    if (h != undefined && h.constructor == Object) {
      s = h.s, v = h.v, h = h.h;
    } else {
      s = h[1], v = h[2], h = h[0];
    }
  }
  var r, g, b, i, f, p, q, t;
  h /= 100;
  s /= 100;
  v /= 100;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
F.hsv_hex = function (h, s, v) {
  if (arguments.length === 1) {
    if (h != undefined && h.constructor == Object) {
      s = h.s, v = h.v, h = h.h;
    } else {
      s = h[1], v = h[2], h = h[0];
    }
  }
  return (F.rgb_hex(F.hsv_rgb(h, s, v)));
}
F.randomHex = function () {
  return (F.rgb_hex(
    F.randomInt(0, 255),
    F.randomInt(0, 255),
    F.randomInt(0, 255),
  ));
}
F.randomRgb = function () {
  return ({
    r: F.randomInt(0, 255),
    g: F.randomInt(0, 255),
    b: F.randomInt(0, 255),
  });
}
F.Color = class {
  constructor(color, name, priority) {
    this.priority = priority;
    if (!this.priority) {
      this.priority = [];
    }
    if (typeof this.priority == "string") {
      this.priority = this.priority.split("");
    }
    let plist = ["r", "h", "x"];
    for (let i = 0; i < plist.length; i++) {
      if (!this.priority[i] || !plist.includes(this.priority[i])) {
        jLoop: for (let j = 0; j < plist.length; j++) {
          if (!this.priority.includes(plist[j])) {
            this.priority[i] = plist[j];
            break jLoop;
          }
        }
      }
    }
    this.priority = this.priority.s(0, 3);
    this.color = color;
    if (!this.color) {
      this.color = F.randomRgb();
    }
    this.hsv = {};
    this.rgb = {};
    if (
      this.color.l &&
      !this.color.v
    ) {
      this.color.v = this.color.l;
    }
    if (
      this.color.r &&
      this.color.g &&
      this.color.b
    ) {
      this.rgb = {
        r: this.color.r,
        g: this.color.g,
        b: this.color.b,
      };
    }
    if (
      this.color.h &&
      this.color.s &&
      this.color.v
    ) {
      this.hsv = {
        h: this.color.h,
        s: this.color.s,
        v: this.color.v,
      };
    }
    if (
      this.color.hex &&
      !this.color.x
    ) {
      this.color.x = this.color.hex;
    }
    if (
      this.color.x
    ) {
      this.x = this.color.x;
    }
    delete this.color;
    this.sync();
    if (typeof name == "string" && name.length > 0) {
      this.name = name;
      F.Color.presets[name] = this;
    }
  }
  sync(type) {
    if (!type) {
      type = this.priority[0];
    }
    let types = {};
    this.r = this.rgb.r;
    this.g = this.rgb.g;
    this.b = this.rgb.b;
    this.h = this.hsv.h;
    this.s = this.hsv.s;
    this.v = this.hsv.v;
    types.r = () => {
      let hsv = F.rgb_hsv(this.r, this.g, this.b);
      this.h = hsv.h;
      this.s = hsv.s;
      this.v = hsv.v;
      this.x = F.rgb_hex(this.r, this.g, this.b);
    }
    types.h = () => {
      let rgb = F.hsv_rgb(this.h, this.s, this.v);
      this.r = rgb.r;
      this.g = rgb.g;
      this.b = rgb.b;
      this.x = F.hsv_hex(this.h, this.s, this.v);
    }
    types.x = () => {
      let rgb = F.hex_rgb(this.x);
      this.r = rgb.r;
      this.g = rgb.g;
      this.b = rgb.b;
      let hsv = F.hex_hsv(this.x);
      this.h = hsv.h;
      this.s = hsv.s;
      this.v = hsv.v;
    }
    types[type]();
    this.rgb.r = this.r;
    this.rgb.g = this.g;
    this.rgb.b = this.b;
    this.hsv.h = this.h;
    this.hsv.s = this.s;
    this.hsv.v = this.v;
    this.hex = this.x;
  }
  set(type, value) {
    if (["r", "g", "b"].includes(type)) {
      this.rgb[type] = value;
      this.sync("r");
    } else if (["h", "s", "v"].includes(type)) {
      this.hsv[type] = value;
      this.sync("h");
    } else if (["hex", "x"].includes(type)) {
      this.hex = value;
      this.sync("x");
    } else if (["rgb"].includes(type)) {
      type = type.keys();
      this.rgb = type;
      this.sync("r");
    } else if (["hsv"].includes(type)) {
      type = type.keys();
      this.hsv = type;
      this.sync("h");
    } else {
      return (false);
    }
    return (true);
  }
  get(type) {
    if (["r", "g", "b", "a", "rgb", "rgba", "h", "s", "v", "hsv", "hsl", "hex", "x"].includes(type)) {
      return (this[type]);
    }
    return (undefined);
  }
}
F.Color.presets = {};
F.Color.css = {"IndianRed": "205,92,92", "LightCoral": "240,128,128", "Salmon": "250,128,114", "DarkSalmon": "233,150,122", "LightSalmon": "255,160,122", "Crimson": "220,20,60", "Red": "255,0,0", "FireBrick": "178,34,34", "DarkRed": "139,0,0", "Pink": "255,192,203", "LightPink": "255,182,193", "HotPink": "255,105,180", "DeepPink": "255,20,147", "MediumVioletRed": "199,21,133", "PaleVioletRed": "219,112,147", "Coral": "255,127,80", "Tomato": "255,99,71", "OrangeRed": "255,69,0", "DarkOrange": "255,140,0", "Orange": "255,165,0", "Gold": "255,215,0", "Yellow": "255,255,0", "LightYellow": "255,255,224", "LemonChiffon": "255,250,205", "LightGoldenrodYellow": "250,250,210", "PapayaWhip": "255,239,213", "Moccasin": "255,228,181", "PeachPuff": "255,218,185", "PaleGoldenrod": "238,232,170", "Khaki": "240,230,140", "DarkKhaki": "189,183,107", "Lavender": "230,230,250", "Thistle": "216,191,216", "Plum": "221,160,221", "Violet": "238,130,238", "Orchid": "218,112,214", "Fuchsia": "255,0,255", "Magenta": "255,0,255", "MediumOrchid": "186,85,211", "MediumPurple": "147,112,219", "BlueViolet": "138,43,226", "DarkViolet": "148,0,211", "DarkOrchid": "153,50,204", "DarkMagenta": "139,0,139", "Purple": "128,0,128", "RebeccaPurple": "102,51,153", "Indigo": "75,0,130", "MediumSlateBlue": "123,104,238", "SlateBlue": "106,90,205", "DarkSlateBlue": "72,61,139", "GreenYellow": "173,255,47", "Chartreuse": "127,255,0", "LawnGreen": "124,252,0", "Lime": "0,255,0", "LimeGreen": "50,205,50", "PaleGreen": "152,251,152", "LightGreen": "144,238,144", "MediumSpringGreen": "0,250,154", "SpringGreen": "0,255,127", "MediumSeaGreen": "60,179,113", "SeaGreen": "46,139,87", "ForestGreen": "34,139,34", "Green": "0,128,0", "DarkGreen": "0,100,0", "YellowGreen": "154,205,50", "OliveDrab": "107,142,35", "Olive": "128,128,0", "DarkOliveGreen": "85,107,47", "MediumAquamarine": "102,205,170", "DarkSeaGreen": "143,188,143", "LightSeaGreen": "32,178,170", "DarkCyan": "0,139,139", "Teal": "0,128,128", "Aqua": "0,255,255", "Cyan": "0,255,255", "LightCyan": "224,255,255", "PaleTurquoise": "175,238,238", "Aquamarine": "127,255,212", "Turquoise": "64,224,208", "MediumTurquoise": "72,209,204", "DarkTurquoise": "0,206,209", "CadetBlue": "95,158,160", "SteelBlue": "70,130,180", "LightSteelBlue": "176,196,222", "PowderBlue": "176,224,230", "LightBlue": "173,216,230", "SkyBlue": "135,206,235", "LightSkyBlue": "135,206,250", "DeepSkyBlue": "0,191,255", "DodgerBlue": "30,144,255", "CornflowerBlue": "100,149,237", "RoyalBlue": "65,105,225", "Blue": "0,0,255", "MediumBlue": "0,0,205", "DarkBlue": "0,0,139", "Navy": "0,0,128", "MidnightBlue": "25,25,112", "Cornsilk": "255,248,220", "BlanchedAlmond": "255,235,205", "Bisque": "255,228,196", "NavajoWhite": "255,222,173", "Wheat": "245,222,179", "BurlyWood": "222,184,135", "Tan": "210,180,140", "RosyBrown": "188,143,143", "SandyBrown": "244,164,96", "Goldenrod": "218,165,32", "DarkGoldenrod": "184,134,11", "Peru": "205,133,63", "Chocolate": "210,105,30", "SaddleBrown": "139,69,19", "Sienna": "160,82,45", "Brown": "165,42,42", "Maroon": "128,0,0", "White": "255,255,255", "Snow": "255,250,250", "Honeydew": "240,255,240", "MintCream": "245,255,250", "Azure": "240,255,255", "AliceBlue": "240,248,255", "GhostWhite": "248,248,255", "WhiteSmoke": "245,245,245", "Seashell": "255,245,238", "Beige": "245,245,220", "OldLace": "253,245,230", "FloralWhite": "255,250,240", "Ivory": "255,255,240", "AntiqueWhite": "250,235,215", "Linen": "250,240,230", "LavenderBlush": "255,240,245", "MistyRose": "255,228,225", "Gainsboro": "220,220,220", "LightGray": "211,211,211", "LightGrey": "211,211,211", "Silver": "192,192,192", "DarkGray": "169,169,169", "DarkGrey": "169,169,169", "Gray": "128,128,128", "Grey": "128,128,128", "DimGray": "105,105,105", "DimGrey": "105,105,105", "LightSlateGray": "119,136,153", "LightSlateGrey": "119,136,153", "SlateGray": "112,128,144", "SlateGrey": "112,128,144", "DarkSlateGray": "47,79,79", "DarkSlateGrey": "47,79,79", "Black": "0,0,0"};
for (let j = 0; j < F.Color.css.keys().length; j++) {
  let rgb = F.Color.css.values()[j].split(",");
  new F.Color({r: rgb[0], g: rgb[1], b: rgb[2]}, F.Color.css.keys()[j]);
}


/* HTML DOM functions */
if (F._data.document) {
  doc = document;
  doc.id = function () {
    return (doc.getElementById(arguments[0]));
  }
  doc.tag = function () {
    return (doc.getElementsByTagName(arguments[0]));
  }
  doc.class = function () {
    return (doc.getElementsByClassName(arguments[0]));
  }
  doc.create = function () {
    return (doc.createElement(arguments[0]));
  }
  doc.query = function () {
    return (doc.querySelectorAll(arguments[0]));
  }
  doc.head = doc.tag("head")[0];
  doc.doc = doc.documentElement;
  doc.html = doc.tag("html")[0];
  F.loadScript = function (src, id, head, type) {
    if (id == null) {
      id = src.split("/");
      id = id[id.length - 1];
      id = id.split(".");
      id = id.slice(0, id.length - 1);
      id = id.join(".");
    }
    if (document.getElementById("script_" + id)) {
      document.body.removeChild(document.getElementById("script_" + id));
    }
    var script = document.createElement('script');
    if ([null, undefined, ""].includes(type)) {
      script.type = 'text/javascript';
    }
    script.id = "script_" + id
    script.src = src;
    if (head) {
      document.body.append(script);
    } else {
      document.getElementsByTagName("head")[0].append(script);
    }
  }
  F.addStyle = (css, inBody) => {
    if (inBody) {
      if (doc.id("styleinsert_body") == null) {
        var style = document.createElement('style');
        style.id = "styleinsert_body";
      } else {
        var style = doc.id(F._data.addStyle.bodyId);
      }
    } else {
      if (doc.id("styleinsert_head") == null) {
        var style = document.createElement('style');
        style.id = "styleinsert_head";
      } else {
        var style = doc.id("styleinsert_head");
      }
    }
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    if (inBody) {
      document.getElementsByTagName('body')[0].appendChild(style);
    } else {
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }
  F.newElement = (v = {tag, id, parent, content}) => {
    element = doc.createElement(v.tag);
    element.id = v.id;
    if (["b", "body", null, undefined, ""].includes(v.parent)) {
      v.parent = doc.body;
    }
    if (["h", "head"].includes(v.parent)) {
      v.parent = doc.head;
    }
    if (v.content != null) {
      element.innerHTML = v.content;
    }
    v.parent.appendChild(element);
  }
  F.ls = function (get, set) {
    if ([null, undefined].includes(set)) {
      return (localStorage.getItem(get));
    } else {
      if (![null, undefined, ""].includes(get)) {
        localStorage.setItem(get, set);
        return (true);
      } else {
        return (false);
      }
    }
  }
  F.send = function (data, name) {
    F.ls(name, data);
  }
  F.reach = function (name) {
    var data = F.ls(name);
    F.ls(name, "");
    return (data);
  }
  F.getUrl = function () {
    full = location.href;
    file = full.split("?").s(0).split("/").s(-1);
    online = location.protocol[0].lower() !== "f";
    domain = null;
    if (online) {
      domain = full.split("/").s(2)
    }
    queryRaw = full.split("?").s(1, -1);
    query = [];
    if (queryRaw) {
      queryRaw = queryRaw.join("?");
      temp = queryRaw.split("&");
      for (i = 0; i < temp.length; i++) {
        if (temp[i] != null && temp[i].split("=")[0] != "") {
          if (temp[i].includes("=")) {
            if (temp[i].split("=").s(1) == "") {
              query[temp[i].split("=")[0]] = "";
            } else {
              if (typeof temp[i].split("=").s(1) == "number") {
                query[temp[i].split("=")[0]] = temp[i].split("=").s(1);
              } else if (typeof temp[i].split("=").s(1) == "object") {
                query[temp[i].split("=")[0]] = temp[i].split("=").s(1);
              } else {
                query[temp[i].split("=")[0]] = temp[i].split("=").s(1).toString();
              }
            }
          } else {
            query[temp[i]] = true;
          }
        }
      }
      delete temp;
    } else {
      queryRaw = "";
    }
    return ({
      href: full,
      protocol: location.protocol,
      online,
      file,
      filename: file && file.split ? file.split(".").s(0, -2).join(".") : "",
      extension: file && file.split ? file.split(".").s(-1) : "",
      domain,
      subdomain: domain ? (
        domain.split(".").s(0)
      ) : null,
      suffix: domain ? (
        domain.split(":").s(0).split(".").s(2, -1).join(".")
      ) : null,
      port: domain ? (
        (domain.split(":").length > 1) ? (
          domain.split(":").s(-1)
        ) : null
      ) : null,
      secure: online ? (
        location.protocol.s(-2) == "s"
      ) : null,
      path: full.split("?").s(0).split("/").s(3, -2).join("/"),
      filepath: full.split("?").s(0).split("/").s(3, -1).join("/"),
      queryRaw,
      query,
    });
  }
  F.url = F.getUrl();
  F.openFile = function (file, func) {
    var input = file.target;
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      if (![null, undefined].includes(func) && typeof func == "function") {
        func(dataURL);
      }
    };
    reader.readAsDataURL(input.files[0]);
  };
  F.setCaretPos = function (ctrl, pos) {
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }
  F.counters = {};
  F.copy = (text) => {
    if (!navigator.clipboard) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        var successful = document.execCommand('copy');
      } catch (err) {
      }
      document.body.removeChild(textArea);
      return;
    }
    navigator.clipboard.writeText(text).then(function () {
    }, function (err) {
      console.error("Unknown error: {0}".format(err));
    });
  }
  F.triggerOnload = function (type) {
    if ([null, undefined].includes(type)) {
      type = "";
    };
    if (F._data.jquery) {
      $(function () {
        $("{0}[onload]".format(type)).not($("body")).trigger("onload");
      });
    } else {
      console.error("Unable to execute function. jQuery is not active");
    }
  }
  F.download = function (base64, fileName) {
    if ([null, undefined, ""].includes(fileName)) {
      fileName = "{0}_{1}.png".format(doc.tag("title")[0].innerHTML, Date.now());
    }
    F.downloader = doc.createElement("a");
    F.downloader.download = fileName;
    F.downloader.href = "data:image/" + base64;
    F.downloader.click();
  }
  F.downloadCanvas = function (canv, fileName) {
    if ([null, undefined, ""].includes(fileName)) {
      fileName = "{0}_{1}.png".format(doc.tag("title")[0].innerHTML.toLowerCase().replaceAll(" ", ""), Date.now());
    }
    if ([null, undefined, ""].includes(canv)) {
      canv = doc.tag("canvas")[0];
    }
    F.download(canv.toDataURL(), fileName);
  }
  F.Sound = class {
    constructor(src, parent) {
      this.sound = doc.create("audio");
      this.id = "sound_src";
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      if (parent) {
        if (parent.constructor == String) {
          doc.id(parent).appendChild(this.sound);
        } else {
          parent.appendChild(this.sound);
        }
      } else {
        doc.head.appendChild(this.sound);
      }
    }
    play = function () {
      this.sound.play();
    }
    stop = function () {
      this.sound.pause();
    }
  }
  HTMLElement.prototype.removeChildren = function () {
    while (this.firstChild) {
      this.firstChild.remove();
    }
  }
  HTMLElement.prototype.hasFocus = function () {
    if (doc.activeElement === this) {
      return (true);
    }
  }
}
F.counters = {};
F.interval = (name, func, max, time, overflow) => {
  F.counters[name] = null;
  function stop() {
    clearInterval(F.counters[name]);
  }
  var count = 0;
  F.counters[name] = setInterval(() => {
    if (func.constructor == Function) {
      func(count, max);
    }
    count++;
    if ((max >= 0) && (count >= max)) {
      stop();
      if (![null, undefined].includes(overflow) && overflow.constructor == Function) {
        overflow(max);
      }
    }
  }, time);
}


/* Experimental functions (try at own risk) */
F.getHTML = (url) => {
  fetch(url)
    .then(function (response) {
      switch (response.status) {
        case 200: {
          return (response.text());
        };
        case 404: {
          throw (response);
        };
      }
    })
    .then(function (template) {
      F.send(template, "urlData_{0}".format(url));
    })
    .catch(function (response) {
      F.send(response.statusText, "urlData_{0}".format(url));
    });
  return (F.reach("urlData_{0}".format(url)));
}
F.Timer = class {
  constructor(start) {
    this.start = start;
    if ([null, undefined, "", 0].includes(this.start)) {
      this.start = Date.now();
    }
    this.laps = [];
    this.play = true;
  }
  lap(time) {
    if ([null, undefined, "", 0].includes(time)) {
      time = Date.now();
    }
    this.laps.push({
      time: time,
      duration: time - this.start,
    });
  }
  pause() {
    this.play = false;
  }
  play() {
    this.play = true;
  }
}
F.frequency = {"C0": 16.35, "C#0": 17.32, "D0": 18.35, "D#0": 19.45, "E0": 20.6, "F0": 21.83, "F#0": 23.12, "G0": 24.5, "G#0": 25.96, "A0": 27.5, "A#0": 29.14, "B0": 30.87, "C1": 32.7, "C#1": 34.65, "D1": 36.71, "D#1": 38.89, "E1": 41.2, "F1": 43.65, "F#1": 46.25, "G1": 49, "G#1": 51.91, "A1": 55, "A#1": 58.27, "B1": 61.74, "C2": 65.41, "C#2": 69.3, "D2": 73.42, "D#2": 77.78, "E2": 82.41, "F2": 87.31, "F#2": 92.5, "G2": 98, "G#2": 103.8, "A2": 110, "A#2": 116.5, "B2": 123.5, "C3": 130.8, "C#3": 138.6, "D3": 146.8, "D#3": 155.6, "E3": 164.8, "F3": 174.6, "F#3": 185, "G3": 196, "G#3": 207.7, "A3": 220, "A#3": 233.1, "B3": 246.9, "C4": 261.6, "C#4": 277.2, "D4": 293.7, "D#4": 311.1, "E4": 329.6, "F4": 349.2, "F#4": 370, "G4": 392, "G#4": 415.3, "A4": 440, "A#4": 466.2, "B4": 493.9, "C5": 523.3, "C#5": 554.4, "D5": 587.3, "D#5": 622.3, "E5": 659.3, "F5": 698.5, "F#5": 740, "G5": 784, "G#5": 830.6, "A5": 880, "A#5": 932.3, "B5": 987.8, "C6": 1047, "C#6": 1109, "D6": 1175, "D#6": 1245, "E6": 1319, "F6": 1397, "F#6": 1480, "G6": 1568, "G#6": 1661, "A6": 1760, "A#6": 1865, "B6": 1976, "C7": 2093, "C#7": 2217, "D7": 2349, "D#7": 2489, "E7": 2637, "F7": 2794, "F#7": 2960, "G7": 3136, "G#7": 3322, "A7": 3520, "A#7": 3729, "B7": 3951, "C8": 4186, "C#8": 4435, "D8": 4699, "D#8": 4978, "E8": 5274, "F8": 5588, "F#8": 5920, "G8": 6272, "G#8": 6645, "A8": 7040, "A#8": 7459, "B8": 7902};


/* NodeJS functions */
if (F._data.node) {
  try {
    F._data.version = JSON.parse(require("fs").readFileSync("package.json")).version;
  } catch { }
  F.input = function (prompt) {
    if (!prompt) {
      prompt = "";
    }
    return (new Promise((resolve) => {
      let rl = require("readline").createInterface(process.stdin, process.stdout);
      rl.question(prompt, (res) => {
        resolve(res);
        rl.close();
      });
    }));
  }
  F.getIP = function () {
    return (new Promise((resolve) => {
      require("dns").lookup(require("os").hostname(), function (err, add, fam) {
        resolve(add);
      });
    }));
  }
  module.exports = F;
}