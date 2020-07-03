import Denomander from "https://deno.land/x/denomander/mod.ts";
export { Odds } from "./lib/odds.ts";

const program = new Denomander(
  {
    app_name: "Odds Converter",
    app_description: "My odds converter",
    app_version: "0.0.1",
  },
);

interface Input {
  valueToConvert: any;
}

program
  .command(
    "convert [valueToConvert]",
    "Convert tool. Will guess input type unless specified",
  )
  .option("-t --type", "Input type. By default will guess.")
  .action(({ valueToConvert }: any) => {
    console.log(valueToConvert);
    console.log(program.type);
  });

program.parse(Deno.args);
