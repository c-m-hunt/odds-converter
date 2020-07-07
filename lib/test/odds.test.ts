import { Odds, OddsType } from "./../odds.ts";
import {
  assert,
  assertEquals,
  assertNotEquals,
  assertThrowsAsync,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test({
  name: "it creates an Odds object",
  fn: (): void => {
    const odds = new Odds(1.5);
    assert(odds);
  },
});

Deno.test({
  name: "it outputs decimal odds",
  fn: (): void => {
    const odds = new Odds(1.5);
    assertEquals(odds.decimalOdds, 1.5);
  },
});

Deno.test({
  name: "it creates an object from US odds",
  fn: (): void => {
    let odds = Odds.fromUS("+137.5");
    assertEquals(odds.decimalOdds, 2.375);
    odds = Odds.fromUS(137.5);
    assertEquals(odds.decimalOdds, 2.375);
    odds = Odds.fromUS(-450);
    assertEquals(parseFloat(odds.decimalOdds.toFixed(2)), 1.22);
    odds = Odds.fromUS("-450");
    assertEquals(parseFloat(odds.decimalOdds.toFixed(2)), 1.22);
  },
});

Deno.test({
  name: "it converts to US odds",
  fn: (): void => {
    const expectations = [
      [2.25, 125],
      [1.25, -400],
      [1001, 100000],
      [10, 900],
    ];
    for (let e of expectations) {
      let odds = new Odds(e[0]);
      assertEquals(odds.usOdds, e[1]);
    }
  },
});

Deno.test({
  name: "it converts to US odds string",
  fn: (): void => {
    const expectations: Array<[number, string]> = [
      [2.25, "+125"],
      [1.25, "-400"],
      [1001, "+100000"],
      [10, "+900"],
    ];
    for (let e of expectations) {
      let odds = new Odds(e[0]);
      assertEquals(odds.usOddsString, e[1]);
    }
  },
});

Deno.test({
  name: "it converts to implied probability",
  fn: (): void => {
    const expectations: Array<[number, number]> = [
      [2.25, 0.4444],
      [1.25, 0.8],
      [1001, 0.001],
      [10, 0.1],
    ];
    for (let e of expectations) {
      let odds = new Odds(e[0]);
      assertEquals(parseFloat(odds.impliedProbability.toFixed(4)), e[1]);
    }
  },
});

Deno.test({
  name: "it converts to implied probability string",
  fn: (): void => {
    const expectations: Array<[number, string]> = [
      [2.25, "44.44%"],
      [1.25, "80%"],
      [1001, "0.1%"],
      [10, "10%"],
    ];
    for (let e of expectations) {
      let odds = new Odds(e[0]);
      assertEquals(odds.impliedProbabilityString, e[1]);
    }
  },
});

Deno.test({
  name: "it makes a sensible guess at an odds string",
  fn: (): void => {
    const expectations: Array<[string, string]> = [
      ["+150", OddsType.US],
      ["4-1", OddsType.FRACTION],
      ["4/1", OddsType.FRACTION],
      ["2.25", OddsType.DECIMAL],
      ["1.25", OddsType.DECIMAL],
    ];
    for (let e of expectations) {
      let type = Odds.guessType(e[0]);
      assertEquals(type, e[1]);
    }
  },
});

Deno.test({
  name: "it throws an exception when odds string is invalid",
  fn: (): void => {
    assertThrows((): void => {
      Odds.guessType("badodds");
    });
    assertThrows((): void => {
      Odds.guessType("100x");
    });
  },
});

Deno.test({
  name: "it converts to fractional odds",
  fn: (): void => {
    const expectations: Array<[number, string]> = [
      [2.25, "5/4"],
      [1.25, "1/4"],
      [1001, "1000/1"],
      [10, "9/1"],
    ];
    for (let e of expectations) {
      let odds = new Odds(e[0]);
      assertEquals(odds.fractionOdds, e[1]);
    }
  },
});
