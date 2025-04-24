/*
Exercise 40.

Radix Sort Helper - digitCount

Implement a function called digitCount which accepts a positive integer and
returns the number of digits that the integer has.

Examples

digitCount(1); // 1
digitCount(9); // 1
digitCount(25); // 2
digitCount(314); // 3
digitCount(1234); // 4
digitCount(77777); // 5

*/

// Works. Just convert it to a string, return the length.
function digitCount1(num) {
  return String(Math.abs(num)).length;
}

// Just do some math
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

digitCount(1); // 1
digitCount(9); // 1
digitCount(25); // 2
digitCount(314); // 3
digitCount(5216); // 4
digitCount(77777); // 5
