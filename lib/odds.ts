export enum OddsType {
  US = "us",
  FRACTION = "frac",
  DECIMAL = "dec",
}

export enum FractionOddsDivider {
  SLASH = "/",
  HYPHEN = "-",
}

/**
 * Class for converting betting odds
 *
 * @export
 * @class Odds
 */
export class Odds {
  fractionOddsDivider: string = FractionOddsDivider.SLASH;
  stringDecimalPlaces: number = 2;
  decimalOdds: number;

  /**
   * Create an Odds object
   * 
   * @param decimalOdds Decimal odds to instantiate the class
   */
  constructor(decimalOdds: number) {
    this.decimalOdds = decimalOdds;
  }

  /**
   * Get the US odds
   *
   * @readonly
   * @memberof Odds
   */
  get usOdds() {
    return this.decimalOdds > 2
      ? (this.decimalOdds - 1) * 100
      : -100 / (this.decimalOdds - 1);
  }

  /**
   * Get the US odds as a formatted string
   *
   * @readonly
   * @memberof Odds
   */
  get usOddsString() {
    return this.usOdds > 0 ? `+${this.usOdds}` : `${this.usOdds}`;
  }

  /**
   * Gets the implied probability
   *
   * @readonly
   * @memberof Odds
   */
  get impliedProbability() {
    return 1 / this.decimalOdds;
  }

  /**
   * Gets the implied probability as a formatted string
   *
   * @readonly
   * @memberof Odds
   */
  get impliedProbabilityString() {
    return `${
      parseFloat(
        (this.impliedProbability * 100).toFixed(this.stringDecimalPlaces),
      )
    }%`;
  }

  /**
   * Create an Odds object from a US odds number or string
   *
   * @static
   * @param {(number | string)} usOdds
   * @returns {Odds}
   * @memberof Odds
   */
  static fromUS(usOdds: number | string): Odds {
    const usOddsNumeric = typeof usOdds === "string"
      ? parseFloat(usOdds)
      : usOdds;
    let decimalOdds: number | null = null;
    if (usOddsNumeric > 0) {
      decimalOdds = 1 + usOddsNumeric / 100;
    } else if (usOddsNumeric < 0) {
      decimalOdds = 1 - 100 / usOddsNumeric;
    } else {
      throw new RangeError(`US Odds value of ${usOdds} is invalid`);
    }
    return new Odds(decimalOdds);
  }

  /**
   * Has a guess at the type of odds given input from a string
   *
   * @static
   * @param {string} odds
   * @returns {OddsType}
   * @memberof Odds
   */
  static guessType(odds: string): OddsType {
    if (odds.startsWith("+") || odds.startsWith("-")) {
      return OddsType.US;
    }
    for (let fractionDivider of Object.values(FractionOddsDivider)) {
      if (odds.includes(fractionDivider)) {
        return OddsType.FRACTION;
      }
    }
    if (parseFloat(odds)) {
      return OddsType.DECIMAL;
    }
    throw new Error(`${odds} does not seem to be a valid odds string`);
  }
}
