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
      return Color.fromHexcode(color);
    case "keyword":
      return Color.fromKeyword(color);
    case "rgb":
      return Color.fromRgbFunction(color);
    case "rgba":
      return Color.fromRgbaFunction(color);
    case "color":
      return color;
    case "invalid":
      console.trace("Error: invalid format"); return null;
    default:
      console.trace("Error: unknown format: " + format);
      return null;
    }
  };

  static fromKeyword = (keyword) => {
    return Color.fromHexcode(cssColorKeywords[keyword]);
  }

  static fromHexcode = (hexcode) => {
    hexcode = hexString.trim();
    if (hexcode.startsWith("#")) hexString = hexString.substr(1);

    if (hexcode.length === 6) {
      const r = parseInt(hexcode.substr(0, 2), 16);
      const g = parseInt(hexcode.substr(2, 2), 16);
      const b = parseInt(hexcode.substr(4, 2), 16);

      return Color({ r, g, b });
    } else if (hexcode.length == 3) {
      const r = parseInt(hexcode.charAt(0).repeat(2), 16);
      const g = parseInt(hexcode.charAt(1).repeat(2), 16);
      const b = parseInt(hexcode.charAt(2).repeat(2), 16);

      return Color({ r, g, b });
    } else {
      // TODO: ADD PROPER ERROR HANDLING
      console.trace("Error: unrecognized hex string format: " + hexcode);
      return null;
    }
  }

  static fromRgbFunction = (str) => {
    const rgbMatcher = /\s*rgb\s*\(\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*\)\s*/;
    const matches = str.match(rgbMatcher);
    if (matches.length === 3) {
      const [ r, g, b ] = matches.map(v => utils.baseAwareConvert(v));
      return new Color(r, g, b, 1);
    }
  }

  static fromRgbaFunciton = (keyword) => {
    const rgbaMatcher = /\s*rgb\s*\(\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*\)\s*/;
    const matches = str.match(rgbMatcher);
    if (matches.length === 4) {
      const [ r, g, b ] = matches.map(v => utils.baseAwareConvert(v));
      const a = parseFloat(matches[3]);
      return new Color(r, g, b, a);
    }

  }
}
