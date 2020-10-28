import AsciiTable, { AsciiAlign } from "https://deno.land/x/ascii_table/mod.ts";
import { Odds } from "./lib/odds.ts";
import { logger } from "./lib/utils.ts";

const args = Deno.args;

const displayOddsOutput = (oddsStr: string): void => {
  try {
    const odds = Odds.fromString(oddsStr);

    const reciprocalOdds = odds.reciprocalOdds();

    const table = new AsciiTable("Converted Odds");
    table
      .setHeadingAlign(AsciiAlign.CENTER)
      .setHeading("Type", "Value")
      .setAlign(1, AsciiAlign.RIGHT)
      .addRow("US", odds.usOddsString)
      .addRow("Decimal", odds.decimalOdds)
      .addRow("Fraction", odds.fractionOdds)
      .addRow("Implied probability", odds.impliedProbabilityString)
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

if (args.length != 1) {
  console.log("Enter a value to be converted");
} else {
  displayOddsOutput(args[0]);
}
