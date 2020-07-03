# Odds converter
[![deno version](https://img.shields.io/badge/deno-^1.0.2-informational)](https://github.com/denoland/deno)

## Install
```typescript
import { Odds } from 'https://deno.land/x/odds_converter/odds.ts';
```

## Usage
```typescript
let odds = new Odds(1.5);
console.log(odds.decimalOdds); // 1.5
console.log(odds.usOdds); // -200
console.log(odds.usOddsString); // "-200"
console.log(odds.impliedProbability); // 0.6666666666
console.log(odds.impliedProbabilityString); // 66.67%

odds = Odds.fromUS("+300");
console.log(odds.decimalOdds); // 4
console.log(odds.usOdds); // 300
console.log(odds.usOddsString); // "+300"
console.log(odds.impliedProbability); // 0.25
console.log(odds.impliedProbabilityString); // "25%"
```