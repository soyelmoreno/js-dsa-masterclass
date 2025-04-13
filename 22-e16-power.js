/*
Coding Exercise 16.

Power

Write a function called power which accepts a base and an exponent. The function
should return the power of the base to the exponent. This function should mimic
the functionality of Math.pow()  - do not worry about negative bases and
exponents.
*/

function power(base, expo) {
  if (expo === 0) return 1;
  // 2^4 = 2 x 2^3
  // 2^3 = 2 x 2^2
  // 2^2 = 2 x 2^1
  // 2^1 = 2 x 2^0
  // 2^0 = 1
  return base * power(base, expo - 1);
}

power(2, 0); // 1
power(2, 2); // 4
power(2, 4); // 16
