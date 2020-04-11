import Color from './color';

/**
 * @typedef {Object} Color
 */
const utils = {
  /**
   * Converts RGB values into a hexstring.
   * @param {(number|string)} r - Red component of the color
   * @param {(number|string)} g - Green component of the color
   * @param {(number|string)} b - Blue component of the color
   * @return {string} Corresponding CSS Hexcode
   */
  toHexString: (r, g, b) => {
    const toHex = v => utils.baseAwareConvert(v).toString(16).toUpperCase().padStart(2, "0");
    return ["#", toHex(r), toHex(g), toHex(b)].join("");
  },

  /**
   * Converts a CSS hexcode into {@link Color}
   * @param {string} hexString - CSS hexcode
   * @return {Color} - A color object
   */
  toColorObject: hexString => {
    hexString = hexString.trim();
    if (hexString.startsWith("#")) hexString = hexString.substr(1);

    if (hexString.length === 6) {
      const r = parseInt(hexString.substr(0, 2), 16);
      const g = parseInt(hexString.substr(2, 2), 16);
      const b = parseInt(hexString.substr(4, 2), 16);

      return new Color({r, g, b});
    } else if (hexString.length == 3) {
      const r = parseInt(hexString.charAt(0).repeat(2), 16);
      const g = parseInt(hexString.charAt(1).repeat(2), 16);
      const b = parseInt(hexString.charAt(2).repeat(2), 16);

      return new Color({r, g, b});
    } else {
      // TODO: ADD PROPER ERROR HANDLING
      console.trace("Error: unrecognized hex string format: " + hexString);
      return null;
    }
  },

  toRgb: hexString => {
    const { r, g, b } = utils.toColorObject(hexString);
    return { r, g, b };
  },
  /**
   * Converts a value string into a number. If the value starts with 0x, it will be
   * converted to base-16. Otherwise, base-10.
   *
   * @param {(number|string)} value - Value of a number
   * @return {number} Value converted to number
   */
  baseAwareConvert: value => {
    if (typeof value === 'number') return value;
    const str = value;
    if (
      str.startsWith("0x") ||
      str.split("").some(ch => "abcdefABCDF".includes(ch))
    ) {
      return parseInt(str, 16);
    } else {
      return parseInt(str, 10);
    }
  },

  /**
   * Checks whether a given string is a valid CSS Hexcode.
   * @param {string} hexString - given string
   * @return {boolean} `true` if string is a valid CSS Hexcode, `false` otherwise
   */
  isValidHexString: hexString => {
    hexString = hexString.trim();
    if (hexString.startsWith("#")) hexString = hexString.substr(1);

    const isValidLength = hexString.length === 3 || hexString.length === 6;

    const hexDigits = "0123456789abcdefABCDEF";
    const areValidHexDigits = hexString
      .split("")
      .every(ch => hexDigits.includes(ch));

    return isValidLength && areValidHexDigits;
  },

  /**
   * Determines the format the color is passed in.
   * Currently supported formats:
   * --------------------    ------   --------------------------                 ------------------
   *  Description            type      Examples                                   Returned string
   * --------------------    ------   --------------------------                 ------------------
   *  CSS Keywords           string    'red', 'black', white'                     'keyword'
   *
   *  CSS Hexcodes           string    '#FFFFFF', '#333'                          'hexcode'
   *
   *  CSS color functions    string    'rgb(10, 20, 30)',                         'rgb'
   *                                   'rgba(10, 20, 30, 0.1)                    'rgba'
   *
   *  Color objects          Color     { r: 10, g: 20, b: 30 },                   'color'
   *                                   { r: 10, g: 20, b: 30, a: 0.1 }
   *
   *  Other                  N/A       N/A                                       'invalid'
   *
   * @param {(string|Color)} color - Color information
   * @return {string} Format of @param color
   */
  determineColorFormat: (color) => {

  }
};

export default utils;
