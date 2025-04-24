/*
Coding Exercise 3.

### Same thing but with an integer

Frequency Counter - sameFrequency

Write a function called sameFrequency. Given two positive integers, find out if
the two numbers have the same frequency of digits.

Your solution MUST have the following complexities:

Time: O(N)

Sample Input:

sameFrequency(182,281) // true
sameFrequency(34,14) // false
sameFrequency(3589578, 5879385) // true
sameFrequency(22,222) // false
*/

function sameFrequency(m, n) {
  const mStr = m.toString();
  const nStr = n.toString();
  if (mStr.length !== nStr.length) return false;

  const mFrequencyCounter = {}; // number: count of that number
  const nFrequencyCounter = {};

  // Store the frequencies
  for (const num of mStr) {
    mFrequencyCounter[num] = (mFrequencyCounter[num] || 0) + 1;
  }
  for (const num of nStr) {
    nFrequencyCounter[num] = (nFrequencyCounter[num] || 0) + 1;
  }

  // Compare each number
  for (const key in mFrequencyCounter) {
    if (mFrequencyCounter[key] !== nFrequencyCounter[key]) {
      return false;
    }
  }
  return true;
}
sameFrequency(182, 281); // true
sameFrequency(34, 14); // false
sameFrequency(3589578, 5879385); // true
sameFrequency(22, 222); // false
