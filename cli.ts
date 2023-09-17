import { AsciiTable3, AlignmentEnum } from 'ascii-table3';
import { Odds } from "./lib/odds.ts";
import { logger } from "./lib/utils.ts";

const args = Bun.argv;

const displayOddsOutput = (oddsStr: string): void => {
  try {
    const odds = Odds.fromString(oddsStr);

    const {reciprocalOdds} = odds;
    const table = new AsciiTable3("Converted Odds")
      .setHeadingAlign(AlignmentEnum.CENTER)
      .setHeading("Type", "Value")
      .setAlign(1, AlignmentEnum.RIGHT)
      .addRow("US", odds.usOddsString)
      .addRow("Decimal", odds.decimalOdds)
      .addRow("Fraction", odds.fractionOdds)
      .addRow("Implied probability", odds.impliedProbabilityString)
      .addRow("", "")
      .addRow("Reciprocal US", reciprocalOdds.usOddsString)
      .addRow("Reciprocal Decimal", reciprocalOdds.decimalOdds)
      .addRow("Reciprocal Fraction", reciprocalOdds.fractionOdds)
      .addRow(
        "Reciprocal implied probability",
        reciprocalOdds.impliedProbabilityString,
      );
    console.log(table.toString());
  } catch (ex) {
    logger.error(ex);
  }
};

if (args.length != 3) {
  console.log("Enter a value to be converted");
} else {
  displayOddsOutput(args[2]);
}
