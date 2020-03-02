import utils from "./utils";
import cssColorKeywords from "./cssColors";

export default class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  static from = (color, format) => {
    switch (format) {
      case "hexcode":
        return fromHexcode(color);
      case "keyword":
        return fromKeyword(color);
      case "rgb":
        return fromRgbFunction(color);
      case "rgba":
        return fromRgbaFunction(color);
      case "color":
        return color;
      case "invalid":
        console.trace("Error: invalid format");
        return null;
      default:
        console.trace("Error: unknown format: " + format);
        return null;
    }
  };
}

const fromKeyword = keyword => {
  return fromHexcode(cssColorKeywords[keyword]);
};

const fromHexcode = hexcode => {
  hexcode = hexcode.trim();
  if (hexcode.startsWith("#")) hexcode = hexcode.substr(1);

  if (hexcode.length === 6) {
    const r = parseInt(hexcode.substr(0, 2), 16);
    const g = parseInt(hexcode.substr(2, 2), 16);
    const b = parseInt(hexcode.substr(4, 2), 16);

    return new Color(r, g, b, 1);
  } else if (hexcode.length == 3) {
    const r = parseInt(hexcode.charAt(0).repeat(2), 16);
    const g = parseInt(hexcode.charAt(1).repeat(2), 16);
    const b = parseInt(hexcode.charAt(2).repeat(2), 16);

    return new Color(r, g, b, 1);
  } else {
    // TODO: ADD PROPER ERROR HANDLING
    console.trace("Error: unrecognized hex string format: " + hexcode);
    return null;
  }
};

const fromRgbFunction = str => {
  const rgbMatcher = /\s*rgb\s*\(\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*\)\s*/;
  const matches = str.match(rgbMatcher);
  if (matches) {
    const [_, r, g, b] = matches.map(v => utils.baseAwareConvert(v));
    return new Color(r, g, b, 1);
  }
  console.trace("Error: given string not a valid css rgb() function: " + str);
  return null;
};

const fromRgbaFunction = str => {
  const rgbaMatcher = /\s*rgba\s*\(\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*,\s*([0-9.]+)\s*\)\s*/;
  const matches = str.match(rgbaMatcher);
  if (matches) {
    const [_, r, g, b] = matches.map(v => utils.baseAwareConvert(v));
    const a = parseFloat(matches[4]);
    return new Color(r, g, b, a);
  }
  console.trace("Error: given string not a valid css rgba() function: " + str);
  return null;
};
