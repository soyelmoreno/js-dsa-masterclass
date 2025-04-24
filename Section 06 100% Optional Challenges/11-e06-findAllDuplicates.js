/*
Coding Exercise 6.

Frequency Counter - findAllDuplicates

Given an array of positive integers, some elements appear twice and others
appear once. Find all the elements that appear twice in this array. Note that
you can return the elements in any order.

findAllDuplicates([4,3,2,7,8,2,3,1]) // array with 2 and 3
findAllDuplicates([4, 3, 2, 1, 0]) // []
findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3]) // array with 3, 2, and 1

Time Complexity - O(n)
*/

// My solution: frequency counter
function findAllDuplicates_FREQ(arr) {
  const store = {};
  for (const i of arr) {
    store[i] = (store[i] || 0) + 1;
  }
  const output = [];
  Object.entries(store).forEach((x) => {
    if (x[1] === 2) {
      output.push(Number(x[0]));
    }
  });
  return output;
}

// DSA course solution: use a Set
function findAllDuplicates(arr) {
  const output = [];
  const store = new Set();
  for (const val of arr) {
    if (store.has(val)) {
      output.push(val);
    } else {
      store.add(val);
    }
  }
  return output;
}

findAllDuplicates([4, 3, 2, 7, 8, 2, 3, 1]); // array with 2 and 3
findAllDuplicates([4, 3, 2, 1, 0]); // []
findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3]); // array with 3, 2, and 1
