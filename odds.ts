import AsciiTable, { AsciiAlign } from "https://deno.land/x/ascii_table/mod.ts";
import { Odds } from "./lib/odds.ts";
export { Odds } from "./lib/odds.ts";

let args = Deno.args;

const displayOddsOutput = (oddsStr: string): void => {
  const odds = Odds.fromString(oddsStr);

  const table = new AsciiTable("Converted Odds");
  table
    .setHeadingAlign(AsciiAlign.CENTER)
    .setHeading("Type", "Value")
    .setAlign(1, AsciiAlign.RIGHT)
    .addRow("US", odds.usOddsString)
    .addRow("Decimal", odds.decimalOdds)
    .addRow("Fraction", "To be implemented")
    .addRow("Implied probability", odds.impliedProbabilityString);
  console.log(table.toString());
};

if (args.length != 1) {
  console.log("Enter a value to be converted")
} else {
  displayOddsOutput(args[0]);
}
