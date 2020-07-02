# Odds converter
## Usage
```javascript
let odds = new Odds(1.5)
console.log(odds.decimalOdds) // 1.5
console.log(odds.usOdds) // -200
console.log(odds.usOddsString) // "-200"
console.log(odds.impliedProbability) // 0.6666666666
console.log(odds.impliedProbabilityString) // 66.67%

odds = Odds.fromUS("+300")
console.log(odds.decimalOdds) // 4
console.log(odds.usOdds) // 300
console.log(odds.usOddsString) // "+300"
console.log(odds.impliedProbability) // 0.25
console.log(odds.impliedProbabilityString) // "25%"
```