/*
Exercise 42.

Radix Sort

Finally, you're ready to implement Radix Sort! Write a function called radixSort
which accepts an array of numbers and sorts them in ascending order.

You'll need to make use of the helper functions from the previous exercises
here. Good luck!

Examples

radixSort([8, 6, 1, 12]); // [1, 6, 8, 12]
radixSort([10, 100, 1, 1000, 10000000]); // [1, 10, 100, 1000, 10000000]
radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]); 
// [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637]

*/

function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// DSA course solution
function mostDigits(arr) {
  let maxCount = 0;
  for (const val of arr) {
    maxCount = Math.max(maxCount, digitCount(val));
  }
  return maxCount;
}

function radixSort(nums) {
  const maxDigitCount = mostDigits(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    const buckets = [...Array(10)].map((x) => []);
    for (const val of nums) {
      const digit = getDigit(val, k);
      buckets[digit].push(val);
    }
    nums = [].concat(...buckets);
  }
  return nums;
}

radixSort([23, 345, 5467, 12, 2345, 9852]); // [12, 23, 345, 2345, 5467, 9852]
radixSort([8, 6, 1, 12]); // [1, 6, 8, 12]
radixSort([10, 100, 1, 1000, 10000000]); // [1, 10, 100, 1000, 10000000]
radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]);
// [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637]
