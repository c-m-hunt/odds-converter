export class Odds {
  fractionOddsDivider: string = "/";
  decimalOdds: number;

  constructor(decimalOdds: number) {
    this.decimalOdds = decimalOdds;
  }

  get usOdds() {
    return this.decimalOdds > 2
      ? (this.decimalOdds - 1) * 100
      : -100 / (this.decimalOdds - 1);
  }

  get usOddsString() {
    return this.usOdds > 0 ? `+${this.usOdds}` : `${this.usOdds}`;
  }

  get impliedProbability() {
    return 1 / this.decimalOdds;
  }

  get impliedProbabilityString() {
    return `${((1 / this.impliedProbability) * 100).toFixed(2)}%`;
  }

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
}
