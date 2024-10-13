# Odds converter

![Latest Tag](https://img.shields.io/github/v/tag/c-m-hunt/odds-converter)
[![deno version](https://img.shields.io/badge/deno-^1.5-informational)](https://github.com/denoland/deno)
![Build](https://img.shields.io/github/workflow/status/c-m-hunt/odds-converter/Run%20Tests)
![Run Tests](https://github.com/c-m-hunt/odds-converter/workflows/Run%20Tests/badge.svg)
[![nest badge](https://nest.land/badge.svg)](https://nest.land/package/odds-converter)

A simple class and CLI tool to convert betting odds between formats.

## CLI

### Install

```sh
deno install -n odds https://deno.land/x/odds_converter/cli.ts
```

### Usage

```
odds +750
```

Outputs:

```
.------------------------------.
|        Converted Odds        |
|------------------------------|
|        Type         | Value  |
|---------------------|--------|
| US                  |   +750 |
| Decimal             |    8.5 |
| Fraction            |   15/2 |
| Implied probability | 11.76% |
'------------------------------'
```

## Odds class

### Install

```typescript
import { Odds } from "https://deno.land/x/odds_converter/odds.ts";
```

### Usage

```typescript
let odds = new Odds(1.5);
console.log(odds.decimalOdds); // 1.5
console.log(odds.usOdds); // -200
console.log(odds.usOddsString); // "-200"
console.log(odds.fractionOdds); // "1/2"
console.log(odds.impliedProbability); // 0.6666666666
console.log(odds.impliedProbabilityString); // 66.67%

odds = Odds.fromUS("+300");
console.log(odds.decimalOdds); // 4
console.log(odds.usOdds); // 300
console.log(odds.usOddsString); // "+300"
console.log(odds.fractionOdds); // "3/1"
console.log(odds.impliedProbability); // 0.25
console.log(odds.impliedProbabilityString); // "25%"

odds = Odds.fromFraction("5/4");
console.log(odds.decimalOdds); // 2.25
console.log(odds.usOdds); // 125
console.log(odds.usOddsString); // "+125"
console.log(odds.fractionOdds); // "5/4"
console.log(odds.impliedProbability); // 0.4444444444444
console.log(odds.impliedProbabilityString); // "44.44%"
```
