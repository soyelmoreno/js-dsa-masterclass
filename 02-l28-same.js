/*
Lecture 28.

Write a function called same, which accepts two arrays. The function should
return true if every value in the array has its corresponding value squared in
the second array. The frequency of values must be the same.
*/

// Naive solution
function same_NAIVE(arr1, arr2) {
  // If they are not the same length, we're done
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Iterate arr1. Square each value and check if that is in arr2. If not, we're done.
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    // Delete each found value from arr2. Sort of like checking a box, so we can
    // remember it, assuring that there is the same frequency.
    arr2.splice(correctIndex, 1);
  }

  // If we get to here, they are the same
  return true;
}

// Better solution
function same(arr1, arr2) {
  // If they are not the same length, we're done
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Create frequency counter hashamaps. Store the frequency of values in each
  // array.
  const frequencyCounter1 = {};
  const frequencyCounter2 = {};
  for (const val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (const val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }

  // Iterate keys of hashmap. Check that each squared key exists in the other
  // hashmap, and also that the value is the same. If it isn't then we're done.
  for (const key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }

  // If we get to here, they are the same
  return true;
}

same([1, 2, 3], [4, 1, 9]); // true
same([1, 2, 3, 2], [9, 1, 4, 4]); // true
same([1, 2, 3], [1, 9]); // false
same([1, 2, 1], [4, 4, 1]); // false (must be same frequency)
