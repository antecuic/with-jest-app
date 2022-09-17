interface INumbersMap {
  [key: string]: number;
}

class Calculator {
  private numbersMap: INumbersMap = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  public integerToRoman(integer: number): string {
    if (integer < 1 || integer > 1000) {
      return "ERROR: INVALID RANGE";
    }
    let result = "";

    for (let key in this.numbersMap) {
      const repeatCounter = Math.floor(integer / this.numbersMap[key]);

      if (repeatCounter !== 0) {
        result += key.repeat(repeatCounter);
      }

      integer %= this.numbersMap[key];

      if (integer === 0) {
        return result;
      }
    }

    return result;
  }
}

export const calculator = new Calculator();
