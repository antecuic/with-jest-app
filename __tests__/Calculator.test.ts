import { calculator } from "../utils/Calculator";

describe("Calculator", () => {
  const errorMessage = "ERROR: INVALID RANGE";

  it("converts integer to roman correctly with number in correct range", () => {
    const number = 785;
    const result = calculator.integerToRoman(number);

    expect(result).toBe("DCCLXXXV");
  });

  it("gives error message if number is not in range of [1, 1000]", () => {
    expect(calculator.integerToRoman(7085)).toBe(errorMessage);
    expect(calculator.integerToRoman(-12)).toBe(errorMessage);
    expect(calculator.integerToRoman(78)).not.toBe(errorMessage);
  });
});
