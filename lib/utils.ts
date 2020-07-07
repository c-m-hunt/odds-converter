const gcd = (a: number, b: number): number => {
  if (b < 0.001) return a;

  return gcd(b, Math.floor(a % b));
};

export const round = (value: number, decimals: number): number => {
  return Number(
    Math.round(parseFloat(value + "e" + decimals)) + "e-" + decimals,
  );
};

export const getFraction = (
  decNumber: number,
  fractionDivider: string = "/",
): string => {
  let reciprocal = false;
  if (decNumber < 1) {
    decNumber = 1 / decNumber;
    reciprocal = true;
  }

  decNumber = round(decNumber, 3);
  const len = decNumber.toString().length - 2;

  let denominator = Math.pow(10, len);
  let numerator = decNumber * denominator;

  let divisor = gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;

  if (reciprocal) {
    return (Math.floor(denominator) + fractionDivider + Math.floor(numerator));
  }
  return (Math.floor(numerator) + fractionDivider + Math.floor(denominator));
};
