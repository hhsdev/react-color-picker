import { equal } from "assert";
import Color from "../src/color";

describe("Color", () => {
  describe("#from()", () => {
    it("should return a color object with correct values for hexcode formats", () => {
      test_from({
        format: "hexcode",
        color: "#ffffff",
        expected: new Color(0xff, 0xff, 0xff, 1)
      });
      test_from({
        format: "hexcode",
        color: "#000",
        expected: new Color(0, 0, 0, 1)
      });
    });

    it("should return a color object with correct values for keyword formats", () => {
      test_from({
        format: "keyword",
        color: "white",
        expected: new Color(0xff, 0xff, 0xff, 1)
      });
      test_from({
        format: "keyword",
        color: "black",
        expected: new Color(0, 0, 0, 1)
      });
    });

    it("should return a color object with correct values for rgb function formats", () => {
      test_from({
        format: "rgb",
        color: "rgb(0xff, 255, 255)",
        expected: new Color(0xff, 0xff, 0xff, 1)
      });
      test_from({
        format: "rgb",
        color: "rgb(0,0,0)",
        expected: new Color(0, 0, 0, 1)
      });
    });

    it("should return a color object with correct values for rgba function formats", () => {
      test_from({
        format: "rgba",
        color: "rgba(0xff, 255, 255, 0.5)",
        expected: new Color(0xff, 0xff, 0xff, 0.5)
      });
      test_from({
        format: "rgba",
        color: "rgba(0,0,0,0)",
        expected: new Color(0, 0, 0, 0)
      });
    });

  });
});

const color_equal = (color1, color2) => {
  equal(color1.r, color2.r);
  equal(color1.g, color2.g);
  equal(color1.b, color2.b);
  equal(color1.a, color2.a);
};

const test_from = test_case => {
  const { color, format, expected } = test_case;
  const actual = Color.from(color, format);
  color_equal(expected, actual);
};