/*
Exercise 39.

Radix Sort Helper - getDigit

Implement a function called getDigit  which accepts a positive integer and a
position, and returns the digit in that number at the given position. The
position reads from right to left, so the 0th position corresponds to the
rightmost digit.

Examples

getDigit(12345, 0); // 5
getDigit(12345, 1); // 4
getDigit(12345, 2); // 3
getDigit(12345, 3); // 2
getDigit(12345, 4); // 1
getDigit(12345, 5); // 0
 
getDigit(8987, 0); // 7
getDigit(8987, 1); // 8
getDigit(8987, 2); // 9
getDigit(8987, 3); // 8
getDigit(8987, 4); // 0

*/

function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

getDigit(12345, 0); // 5
getDigit(12345, 1); // 4
getDigit(12345, 2); // 3
getDigit(12345, 3); // 2
getDigit(12345, 4); // 1
getDigit(12345, 5); // 0

getDigit(8987, 0); // 7
getDigit(8987, 1); // 8
getDigit(8987, 2); // 9
getDigit(8987, 3); // 8
getDigit(8987, 4); // 0
