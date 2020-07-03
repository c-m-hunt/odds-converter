# Odds converter
[![deno version](https://img.shields.io/badge/deno-^1.0.2-informational)](https://github.com/denoland/deno)

## CLI
### Install
```sh
deno install -n odds https://deno.land/x/odds_converter/odds.ts
```

### Usage
```
odds +750
```
Outputs:
```
.-----------------------------------------.
|             Converted Odds              |
|-----------------------------------------|
|        Type         |       Value       |
|---------------------|-------------------|
| US                  |              +750 |
| Decimal             |               8.5 |
| Fraction            | To be implemented |
| Implied probability |            11.76% |
'-----------------------------------------'
```


## Odds class
### Install
```typescript
import { Odds } from 'https://deno.land/x/odds_converter/odds.ts';
```

### Usage
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