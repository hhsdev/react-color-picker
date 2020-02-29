const utils = {
  toRgb: hexString => {
    hexString = hexString.trim();
    if (hexString.startsWith("#")) hexString = hexString.substr(1);

    if (hexString.length === 6) {
      const r = parseInt(hexString.substr(0, 2), 16);
      const g = parseInt(hexString.substr(2, 2), 16);
      const b = parseInt(hexString.substr(4, 2), 16);

      return { r, g, b };
    } else if (hexString.length == 3) {
      const r = parseInt(hexString.charAt(0).repeat(2), 16);
      const g = parseInt(hexString.charAt(1).repeat(2), 16);
      const b = parseInt(hexString.charAt(2).repeat(2), 16);

      return { r, g, b };
    } else {
      // TODO: ADD PROPER ERROR HANDLING
      console.trace("Error: unrecognized hex string format: " + hexString);
      return null;
    }
  },

  smartConvert: str => {
    let num = String(str);
    if (
      num.startsWith("0x") ||
      num.split("").some(ch => "abcdefABCDF".includes(ch))
    ) {
      num = parseInt(num, 16);
    } else {
      num = parseInt(num, 10);
    }
    return num;
  },

  toHexString: (r, g, b) => {
    const toHex = v => utils.smartConvert(v).toString(16).toUpperCase().padStart(2, "0");
    return ["#", toHex(r), toHex(g), toHex(b)].join("");
  },

  isValidHexString: hexString => {
    hexString = hexString.trim();
    if (hexString.startsWith("#")) hexString = hexString.substr(1);

    const isValidLength = hexString.length === 3 || hexString.length === 6;

    const hexDigits = "0123456789abcdefABCDEF";
    const areValidHexDigits = hexString
      .split("")
      .every(ch => hexDigits.includes(ch));

    return isValidLength && areValidHexDigits;
  }
};

export default utils;
