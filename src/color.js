import utils from "./utils";
import cssColorKeywords from "./cssColors.json";

let keywords = null;

export default class Color {
  constructor({ r, g, b, a }) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  /**
   * @param {string} color
   */
  static determineFormat = (color) => {
    if (color.startsWith("#")) return "hexcode";
    if (color.startsWith("rgba")) return "rgba";
    if (color.startsWith("rgb")) return "rgb";
    if (cssColorKeywords[color] !== undefined) return "keyword";
    return "invalid";
  };

  static from = (color, format) => {
    if (format === undefined) {
      format = Color.determineFormat(color);
    }
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
        //console.trace("Error: invalid format");
        return null;
      default:
        console.trace("Error: unknown format: " + format);
        return null;
    }
  };

  to(format) {
    switch (format) {
      case "hexcode":
        return toHexcode(this);
      case "keyword":
        return toKeyword(this);
      case "rgb":
        return toRgbFunction(this);
      case "rgba":
        return toRgbaFunction(this);
      case "color":
        return this;
      case "invalid":
        console.trace("Error: invalid format");
        return null;
      default:
        console.trace("Error: unknown format: " + format);
        return null;
    }
  }
}

const fromKeyword = (keyword) => {
  return fromHexcode(cssColorKeywords[keyword]);
};

const fromHexcode = (hexcode) => {
  hexcode = hexcode.trim();
  if (hexcode.startsWith("#")) hexcode = hexcode.substr(1);
  let ret = null;
  if (hexcode.length === 6) {
    const r = parseInt(hexcode.substr(0, 2), 16);
    const g = parseInt(hexcode.substr(2, 2), 16);
    const b = parseInt(hexcode.substr(4, 2), 16);

    ret = new Color({r, g, b, a: 255});
  } else if (hexcode.length == 3) {
    const r = parseInt(hexcode.charAt(0).repeat(2), 16);
    const g = parseInt(hexcode.charAt(1).repeat(2), 16);
    const b = parseInt(hexcode.charAt(2).repeat(2), 16);

    ret = new Color({r, g, b, a: 255});
  } else {
    // TODO: ADD PROPER ERROR HANDLING
    return null;
  }
  return ret;
};

const fromRgbFunction = (str) => {
  const rgbMatcher = /\s*rgb\s*\(\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*\)\s*/;
  const matches = str.match(rgbMatcher);
  if (matches) {
    const [_, r, g, b] = matches.map((v) => utils.baseAwareConvert(v));
    return new Color({r, g, b, a: 1});
  }
  console.trace("Error: given string not a valid css rgb() function: " + str);
  return null;
};

const fromRgbaFunction = (str) => {
  const rgbaMatcher = /\s*rgba\s*\(\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*,\s*([0-9.]+)\s*\)\s*/;
  const matches = str.match(rgbaMatcher);
  if (matches) {
    const [_, r, g, b] = matches.map((v) => utils.baseAwareConvert(v));
    const a = parseFloat(matches[4]);
    return new Color({r, g, b, a});
  }
  console.trace("Error: given string not a valid css rgba() function: " + str);
  return null;
};

const toHexcode = (color) => {
  const { r, b, g } = color;
  const toHex = (v) =>
    utils.baseAwareConvert(v).toString(16).toUpperCase().padStart(2, "0");
  return ["#", toHex(r), toHex(g), toHex(b)].join("");
};

const toKeyword = (color) => {
  const hexcode = toHexcode(color).toLowerCase();
  if (!keywords) keywords = Object.keys(cssColorKeywords);
  return keywords.find((key) => cssColorKeywords[key] === hexcode);
};

const toRgbFunction = (color) => {
  const { r, g, b } = color;
  const convert = (v) => utils.baseAwareConvert(v);

  return `rgb(${convert(r)}, ${convert(g)}, ${convert(b)})`;
};
const toRgbaFunction = (color) => {
  const { r, g, b, a } = color;
  const convert = (v) => utils.baseAwareConvert(v);

  return `rgba(${convert(r)}, ${convert(g)}, ${convert(b)}, ${parseFloat(a)})`;
};
