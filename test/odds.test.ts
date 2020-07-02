import { Odds } from "./../odds.ts";
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
